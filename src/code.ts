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
  conversation = figma.currentPage.findOne(node => node.type === "FRAME" && node.name == "Log") as FrameNode;
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this...
  if (msg.type === 'create-message') {
    await sendMessage(msg.message, msg.direction);
  } else if (msg.type === 'setup') {
    //If there is not a conversation...
    if (!conversation) {
      //Make a conversation frame
      conversation = figma.createFrame()
      conversation.name = "Log"
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
    //Now that we are sure there is a conversation, check if there is any messages.
    var firstMessage = conversation.findChild(node => node.name == "0" && node.type === "INSTANCE")
    //If there is no first message...
    if (!firstMessage){
      //Create a first welcome messsage...
      await figma.importComponentByKeyAsync("663b06bfe927cf5574dc82c60e084da2ee5e99d9").then(timestampComponent => {
        firstMessage = timestampComponent.createInstance()
      })
      firstMessage.name = "0"
      messageCount = 0
      conversation.insertChild(0,firstMessage)
      const nodes: SceneNode[] = []
      nodes.push(conversation)
      conversation.layoutMode = "VERTICAL"
      figma.viewport.scrollAndZoomIntoView(nodes)
    }
  }
};

async function sendMessage(messageText: string, directionIsOutbound: boolean) {
  //Find the last message in the conversation frame...
  let lastMessage = conversation.children[conversation.children.length-1] as InstanceNode
  //..and Set the messageCount to the numbered name of this message
  messageCount = parseInt(lastMessage.name)
  
  //Create a new message...
  let messageGroupComponent: ComponentNode
  await figma.importComponentSetByKeyAsync("98e8f2af5cef20537dfbfb1dc294f6fc1f60d466").then( messageGroupComponentSet => {
    messageGroupComponent = directionIsOutbound ? messageGroupComponentSet.findChild(component => component.name === "Direction=Outbound, Messages=1") as ComponentNode : messageGroupComponentSet.findChild(component => component.name === "Direction=Inbound, Messages=1") as ComponentNode
  })
  var nextMessage = messageGroupComponent?.createInstance()
  nextMessage.name = (++messageCount).toString();

  //Turn off receipts on previous message, if there is one
  let receipt = lastMessage.findOne(node => node.name == ".Receipt/Inbound" || node.name == ".Receipt/Outbound")
  if (receipt) receipt.visible = false

  //Insert the new message.
  conversation.insertChild(messageCount, nextMessage);
  const nodes: SceneNode[] = [];
  nodes.push(conversation.children[conversation.children.length - 1]);

  //Set the author label, if it is an inbound message
  if (!directionIsOutbound) {
    let label = nextMessage.findOne(node => node.type === "TEXT" && node.name == "✏️Label") as TextNode;
    await figma.loadFontAsync(label.fontName as FontName).then(() => {
      label.characters = "Marilyn Collins";
    });
  }

  //Set the message text
  let message = nextMessage.findOne(node => node.type === "TEXT" && node.name == "✏️Text") as TextNode;
  await figma.loadFontAsync(message.fontName as FontName).then(() => {
    message.characters = messageText;
  });
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
