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

  // //If direction hasn't changed since last message...
  // if (lastMessage.mainComponent.name.includes(directionIsOutbound? "Direction=Outbound" : "Direction=Inbound")) {
  //   //TODO: Change varient to N+1 messages, and set message text.
  //   let newKey
  //   switch (lastMessage.mainComponent.key){
  //     case "4c1a3d695cfe125e9f2c957a1fb83e7c748de0d7":
  //       newKey = "22af29dc7cc1e8ac0fa8a5a112ce3f13a7daa616"
  //       break
  //     case "22af29dc7cc1e8ac0fa8a5a112ce3f13a7daa616":
  //       newKey = "32bdaa3914802e1a5b918df13dabcc432cc66898"
  //       break
  //     case "356952b15a1188c0bb1fdb33754966059bdcbc4c":
  //       newKey = "b2266d9ffd4bb85b37a5ca731aafbfa7ea5c227b"
  //       break
  //     case "b2266d9ffd4bb85b37a5ca731aafbfa7ea5c227b":
  //       newKey = "c4be4d8f99520f6a150a002f85a2debceeb3e9f9"
  //       break
  //     default:
  //       newKey = lastMessage.mainComponent.key
  //       break
  //   }

  //   await figma.importComponentByKeyAsync(newKey).then(component => {
  //     let persistMessageGroup = lastMessage
  //     let persistName = lastMessage.name
  //     let persistMessage1 = ((lastMessage.findOne(node => node.name == "Message 1") as InstanceNode).findOne(node => node.name == "✏️Text") as TextNode).characters

  //     lastMessage.mainComponent = component
  //     lastMessage.name = persistName
  //     var nextMessage = lastMessage
  //   })
  // } else {
    //Create a new message...
    let messageGroupComponent: ComponentNode
    await figma.importComponentSetByKeyAsync("98e8f2af5cef20537dfbfb1dc294f6fc1f60d466").then( messageGroupComponentSet => {
      messageGroupComponent = directionIsOutbound ? messageGroupComponentSet.findChild(component => component.name === "Direction=Outbound, Messages=1") as ComponentNode : messageGroupComponentSet.findChild(component => component.name === "Direction=Inbound, Messages=1") as ComponentNode
    })
    var nextMessage = messageGroupComponent?.createInstance()
    nextMessage.name = (++messageCount).toString();

    //TODO: If the message is long, make it a multiline message.
    // if(messageText.length < 15){
    //   let message1 = nextMessage.findOne(node => node.type === "INSTANCE" && node.name == "Message 1") as InstanceNode
    //   let messageComponent: ComponentNode
    //   await figma.importComponentSetByKeyAsync(message1.mainComponent.key).then( messageComponentSet => {
    //     debugger
    //     messageComponent = messageComponentSet.findChild(component => component.name === "Type=Text, Multiline=False, State=Sent") as ComponentNode
    //   })
    //   // // let bub = message1.mainComponent
    //   // // bub.name = "Type=Text, Multiline=False, State=Sent"
    //   message1 = messageComponent.createInstance()
    // }

    //Turn off receipts on previous message, if there is one
    let receipt = lastMessage.findOne(node => node.name == ".Receipt/Inbound" || node.name == ".Receipt/Outbound")
    if (receipt) receipt.visible = false

    //Insert the new message.
    conversation.insertChild(messageCount, nextMessage);
    const nodes: SceneNode[] = [];
    nodes.push(conversation.children[conversation.children.length - 1]);
    // figma.viewport.scrollAndZoomIntoView(nodes);
  // }

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
