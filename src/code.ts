var messageCount: number = 0
var conversation: FrameNode

// This plugin will open a window to prompt the user to enter a message, and
// it will then create a message symbol with that text on screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__)
figma.ui.resize(400, 48)

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = async msg => {
  // Look for a 'Conversation' frame...
  // debugger;
  conversation = figma.currentPage.findOne(node => node.type === "FRAME" && node.name == "Conversation") as FrameNode;
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this...
  if (msg.type === 'create-message') {
    // debugger
    await sendMessage(msg.message, msg.direction);
    doTherapy(msg.message)

  } else if (msg.type === 'setup') {
    //If there is not a conversation...
    if (!conversation) {
      //Make a conversation frame
      conversation = figma.createFrame()
      conversation.name = "Conversation"
      conversation.resize(480, 1800)
      let bgPaint = figma.getLocalPaintStyles().find(paintStyle => paintStyle.name == "BG").paints[0] as SolidPaint
      let fills = clone(conversation.fills)
      fills[0].color = bgPaint.color
      conversation.fills = fills
      figma.currentPage.appendChild(conversation)
      const nodes: SceneNode[] = []
      nodes.push(conversation)
      figma.currentPage.selection = nodes
      figma.viewport.scrollAndZoomIntoView(nodes)
    }
    //Now that we are sure there is a conversation...
    //Check if there is any messages...
    var firstMessage = conversation.findChild(node => node.name == "0" && node.type === "INSTANCE")
    //If there is no first message...
    if (!firstMessage){
      //Create a first welcome messsage...
      let inboundMessageComponent: ComponentNode =  figma.root.findOne(node => node.name == "message/inbound" && node.type === "COMPONENT") as ComponentNode
      let firstMessage = inboundMessageComponent?.createInstance()
      //TODO Look into adding constraints
      firstMessage.name = "0"
      messageCount = 0
      conversation.insertChild(0,firstMessage)
      const nodes: SceneNode[] = []
      nodes.push(conversation.children[0])
      conversation.layoutMode = "VERTICAL"
      figma.currentPage.selection = nodes
      figma.viewport.scrollAndZoomIntoView(nodes)
    }
  }
};

async function sendMessage(messageText: string, messageDirection: boolean) {
  //Find the last message in the conversation frame...
  let lastMessage = conversation.children[conversation.children.length-1]
  //TODO make sure this is truely the last message (i.e. they did not get shuffled)
  //Set the messageCount to the numbered name of this message
  messageCount = parseInt(lastMessage.name)
  //Create a new outbound message and set the text to the msg...
  let outboundMessageComponent: ComponentNode = figma.root.findOne(node => node.name == "message/outbound" && node.type === "COMPONENT") as ComponentNode;
  let inboundMessageComponent: ComponentNode = figma.root.findOne(node => node.name == "message/inbound" && node.type === "COMPONENT") as ComponentNode;
  let nextMessage = messageDirection ? outboundMessageComponent?.createInstance() : inboundMessageComponent?.createInstance();
  nextMessage.name = (++messageCount).toString();
  let message = nextMessage.findOne(node => node.type === "TEXT" && node.name == "message") as TextNode;
  await figma.loadFontAsync(message.fontName as FontName).then(() => {
    // debugger;
    message.characters = messageText;
    nextMessage.y = lastMessage.y + lastMessage.height;
    conversation.insertChild(messageCount, nextMessage);
    const nodes: SceneNode[] = [];
    nodes.push(conversation.children[conversation.children.length - 1]);
    figma.viewport.scrollAndZoomIntoView(nodes);
  });
}

function doTherapy(textIn: string) {
  let canTreat = false
  let textOut = textIn
  if (textIn.startsWith("I feel")){
    canTreat = true
    textOut= "Do you enjoy feeling" + textIn.substring(6, textIn.length) + "?"
    sendMessage(textOut, false)
  } else if (textIn.startsWith("Maybe")) {
    canTreat = true
    textOut= "WHY THE UNCERTAIN TONE ?"
    sendMessage(textOut, false)
  }
  figma.ui.postMessage(canTreat)
}

//Used to clone fills, etc. so they can be set.
function clone(val) {
  const type = typeof val
  if (val === null) {
    return null
  } else if (type === 'undefined' || type === 'number' ||
             type === 'string' || type === 'boolean') {
    return val
  } else if (type === 'object') {
    if (val instanceof Array) {
      return val.map(x => clone(x))
    } else if (val instanceof Uint8Array) {
      return new Uint8Array(val)
    } else {
      let o = {}
      for (const key in val) {
        o[key] = clone(val[key])
      }
      return o
    }
  }
  throw 'unknown'
}
