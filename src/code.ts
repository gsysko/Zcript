var messageCount: number = 0
var log: FrameNode

// This plugin will open a window to prompt the user to enter a message, and
// it will then create a message symbol with that text on screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__)
figma.ui.resize(400, 48)

//Secret bootstrap point setter -- commment out when not in use.
// let launcher = figma.currentPage.selection.find(node => (node.type == "COMPONENT" || node.type == "INSTANCE") && node.parent.name == "Launcher")
// if (launcher){
//   launcher.setRelaunchData({start: ""})
//   figma.closePlugin()
// }

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = async msg => {
  //Look for a "Widget" or a "Messenger" in the current selection
  let widget = figma.currentPage.selection.find(node => node.type === "FRAME" && node.name == "Widget") as FrameNode
  let messenger = figma.currentPage.selection.find(node => node.type === "FRAME" && node.name == "Messenger") as FrameNode
  // Then look for a child 'Log' frame...
  if (widget) {
    log = widget.findOne(node => node.type === "FRAME" && node.name == "Log") as FrameNode;
  } else if (messenger) {
    log = messenger.findOne(node => node.type === "FRAME" && node.name == "Log") as FrameNode;
  }
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this...
  if (msg.type === 'create-message') {
    await sendMessage(msg.message, msg.direction);
  } else if (msg.type === 'setup') {
    //If there is not a conversation...
    await setUp();
  }
};

//~~Function to set up a new conversation~~//
async function setUp() {
  if (!log) {
    //Find last widget...
    let otherWidgets = figma.currentPage.findAll(node => node.name == "Widget")

    //Make the container
    let widget = figma.createFrame();
    widget.setRelaunchData({ open: "" });
    widget.name = "Widget";
    // If there are other containers, offset it to the right of the last one.
    if (otherWidgets.length > 0) widget.x = otherWidgets[otherWidgets.length-1].x + 480
    widget.resize(380, 780);
    widget.clipsContent = false;
    widget.fills = [];
    widget.layoutMode = "VERTICAL";
    widget.primaryAxisSizingMode = "AUTO";
    widget.counterAxisAlignItems = "MAX";
    widget.itemSpacing = 8;

    //Make the messenger
    let messenger = figma.createFrame();
    messenger.setRelaunchData({ open: "" });
    messenger.name = "Messenger";
    messenger.resize(380, 700);
    messenger.layoutMode = "VERTICAL";
    messenger.primaryAxisSizingMode = "FIXED";
    let backgroundStyle = await figma.importStyleByKeyAsync("8a51f0a179f0ad6d5af3e3329681bcd33e0f748c").catch(() => {
      figma.notify("Zcripter requires the '00 Zendesk Theme - Light (Default)' library.");
      figma.closePlugin();
    }) as BaseStyle;
    messenger.fillStyleId = backgroundStyle.id;
    let backgroundEffect = await figma.importStyleByKeyAsync("20b0405ad7024a20ad878b90b3b75bd5bb26443a").catch(() => {
      figma.notify("Zcripter requires the 'Garden' library.");
      figma.closePlugin();
    }) as BaseStyle;
    messenger.effectStyleId = backgroundEffect.id;
    widget.appendChild(messenger);

    //Make the launcher
    let launcher
    if(figma.command == "start"){
      launcher = figma.currentPage.selection.find(node => node.type == "INSTANCE" && node.name == "Launcher") as InstanceNode
      widget.x = launcher.x - 308
      widget.y = launcher.y - 708
      launcher.swapComponent(await figma.importComponentByKeyAsync("c5f2c7b8417b86629a8e52aa37ebe2c065a2c6de"))
    } else {
      launcher = (await figma.importComponentByKeyAsync("c5f2c7b8417b86629a8e52aa37ebe2c065a2c6de")).createInstance()
    }
    launcher.setRelaunchData({})
    widget.appendChild(launcher);

    //Make the header
    let header = (await figma.importComponentByKeyAsync("da85778fa3e3f54485fcedfe1bf2476f851f2f41")).createInstance();
    let title = header.findChild(node => node.name == "Title") as TextNode;
    await figma.loadFontAsync(title.fontName as FontName);
    title.characters = "Zendesk";
    header.layoutAlign = "STRETCH";
    messenger.appendChild(header);

    //Make a log frame
    log = figma.createFrame();
    log.name = "Log";
    log.resize(380, 1);
    log.layoutMode = "VERTICAL";
    log.layoutGrow = 1;
    log.layoutAlign = "STRETCH";
    log.overflowDirection = "VERTICAL";
    log.fills = [];
    messenger.appendChild(log);

    //Make the composer
    let composer = (await figma.importComponentByKeyAsync("0cdeaec0c5baf216b6c74d1a939a9c94e025f1df")).createInstance();
    composer.layoutAlign = "STRETCH";
    messenger.appendChild(composer);

    figma.currentPage.appendChild(widget);
    const nodes: SceneNode[] = [];
    nodes.push(widget);
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }
  //Now that we are sure there is a conversation, check if there is any messages.
  var firstMessage = log.findChild(node => node.name == "0" && node.type === "INSTANCE");
  //If there is no first message...
  if (!firstMessage) {
    //Create a first welcome messsage...
    await figma.importComponentByKeyAsync("663b06bfe927cf5574dc82c60e084da2ee5e99d9").then(timestampComponent => {
      firstMessage = timestampComponent.createInstance();
    });
    firstMessage.name = "0";
    messageCount = 0;
    firstMessage.layoutAlign = "STRETCH";
    //TODO set text to todays date
    log.insertChild(0, firstMessage);
  }
}

//~~Function to send a message~~//
async function sendMessage(messageText: string, directionIsOutbound: boolean) {
  let positionInGroup: number;
  //Find the last message in the conversation frame...
  let lastMessage = log.children[log.children.length-1] as InstanceNode
  //..and Set the messageCount to the numbered name of this message
  messageCount = parseInt(lastMessage.name)

  //If participant hasn't changed since last message...
  if ((directionIsOutbound && lastMessage.mainComponent.name.startsWith("Direction=Outbound")) ||
  (!directionIsOutbound && lastMessage.mainComponent.name.startsWith("Direction=Inbound"))) {
    //Add to the existing group
    positionInGroup = lastMessage.findAll(node => node.name.startsWith("Message ")).length
    if (positionInGroup < 3) {
      //TODO Investigate making this scalable beyond 3 messages by appending an new message, vs swapping component.
      var nextMessage = lastMessage
      nextMessage.swapComponent(nextMessage.mainComponent.parent.findChild(node => node.name == nextMessage.mainComponent.name.substr(0, nextMessage.mainComponent.name.length-1) + (positionInGroup + 1)) as ComponentNode)
    } else {
      positionInGroup = 2
      var nextMessage = lastMessage
      figma.notify("Conversation Kit currently only supports 3 consecutive messages.")
    }
  } else {
    positionInGroup = 0
    //Create a new message...
    let messageGroupComponent: ComponentNode
    await figma.importComponentSetByKeyAsync("98e8f2af5cef20537dfbfb1dc294f6fc1f60d466").then( messageGroupComponentSet => {
      messageGroupComponent = directionIsOutbound ? messageGroupComponentSet.findChild(component => component.name === "Direction=Outbound, Messages=1") as ComponentNode : messageGroupComponentSet.findChild(component => component.name === "Direction=Inbound, Messages=1") as ComponentNode
    })
    var nextMessage = messageGroupComponent?.createInstance()
    nextMessage.layoutAlign = "STRETCH"
    nextMessage.name = (++messageCount).toString();

    //Turn off receipts on previous message, if there is one
    let receipt = lastMessage.findOne(node => node.name == "Receipt")
    if (receipt) receipt.visible = false

    //Insert the new message.
    log.insertChild(messageCount, nextMessage);

    //Set the author label, if it is an inbound message
    if (!directionIsOutbound) {
      let label = nextMessage.findOne(node => node.type === "TEXT" && node.name == "Label") as TextNode;
      await figma.loadFontAsync(label.fontName as FontName).then(() => {
        label.characters = "Marilyn Collins";
      });
    }
  }

  //Set the message text
  let message = nextMessage.findAll(node => node.type === "TEXT" && node.name == "Text")[positionInGroup] as TextNode;
  await figma.loadFontAsync(message.fontName as FontName).then(() => {
    message.characters = messageText;
  });

  //Checkt that the message should not be multi-line
  if(nextMessage.mainComponent.name.startsWith("Direction=Outbound") ? message.width > 324 : message.width > 288){
    let messageComponent = (nextMessage.findAll(node => node.name.startsWith("Message "))[positionInGroup] as InstanceNode)
    let messageComponentSet = messageComponent.mainComponent.parent as ComponentSetNode
    messageComponent.swapComponent((messageComponentSet.children[0] as ComponentNode))
  }

  //Check that the log has not become filled
  if (nextMessage.y + nextMessage.height > log.height) {
    log.primaryAxisAlignItems = "MAX"
  }
}

//~~Function to clone fills, etc. so they can be set.~~//
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
