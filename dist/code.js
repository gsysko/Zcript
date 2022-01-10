/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/code.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/code.ts":
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var messageCount = 0;
var log;
// This plugin will open a window to prompt the user to enter a message, and
// it will then create a message symbol with that text on screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__);
figma.ui.resize(360, 72);
//Secret bootstrap point setter -- commment out when not in use.
// let launcher = figma.currentPage.selection.find(node => (node.type == "COMPONENT" || node.type == "INSTANCE") && node.parent.name == "Launcher")
// if (launcher){
//   launcher.setRelaunchData({start: ""})
//   figma.closePlugin()
// }
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
    //Look for a "Widget" or a "Messenger" in the current selection
    let widget = figma.currentPage.selection.find(node => node.type === "FRAME" && node.name == "Widget");
    let messenger = figma.currentPage.selection.find(node => node.type === "FRAME" && node.name == "Messenger");
    // Then look for a child 'Log' frame...
    if (widget) {
        log = widget.findOne(node => node.type === "FRAME" && node.name == "Log");
    }
    else if (messenger) {
        log = messenger.findOne(node => node.type === "FRAME" && node.name == "Log");
    }
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this...
    if (msg.type === 'send-message') {
        yield sendMessage(msg.message);
    }
    else if (msg.type === 'receive-message') {
        yield receiveResponse(msg.message.choices[0].text);
    }
    else if (msg.type === 'setup') {
        //If there is not a conversation...
        yield setUp();
    }
});
//~~Function to set up a new conversation~~//
function setUp() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!log) {
            //Find last widget...
            let otherWidgets = figma.currentPage.findAll(node => node.name == "Widget");
            //Make the container
            let widget = figma.createFrame();
            widget.setRelaunchData({ open: "" });
            widget.name = "Widget";
            // If there are other containers, offset it to the right of the last one.
            if (otherWidgets.length > 0) {
                widget.x = otherWidgets[otherWidgets.length - 1].x + 480;
                widget.y = otherWidgets[otherWidgets.length - 1].y;
            }
            else {
                widget.x = figma.viewport.center.x - 190;
                widget.y = figma.viewport.center.y - 390;
            }
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
            let backgroundStyle = yield figma.importStyleByKeyAsync("e94370ef7b3a645e93bd29da94dc67ad6b6ec52e").catch(() => {
                figma.notify("Zcripter requires the 'Zendesk Theme (Default)' library.");
                figma.closePlugin();
            });
            messenger.fillStyleId = backgroundStyle.id;
            let backgroundEffect = yield figma.importStyleByKeyAsync("20b0405ad7024a20ad878b90b3b75bd5bb26443a").catch(() => {
                figma.notify("Zcripter requires the 'Garden' library.");
                figma.closePlugin();
            });
            messenger.effectStyleId = backgroundEffect.id;
            widget.appendChild(messenger);
            //Make the launcher
            let launcher;
            if (figma.command == "start") {
                launcher = figma.currentPage.selection.find(node => node.type == "INSTANCE" && node.name == "Launcher");
                widget.x = launcher.x - 308;
                widget.y = launcher.y - 708;
                launcher.swapComponent(yield figma.importComponentByKeyAsync("c5f2c7b8417b86629a8e52aa37ebe2c065a2c6de"));
                launcher.parent.appendChild(widget);
            }
            else {
                launcher = (yield figma.importComponentByKeyAsync("c5f2c7b8417b86629a8e52aa37ebe2c065a2c6de")).createInstance();
            }
            launcher.setRelaunchData({});
            widget.appendChild(launcher);
            //Make the header
            let header = (yield figma.importComponentByKeyAsync("da85778fa3e3f54485fcedfe1bf2476f851f2f41")).createInstance();
            messenger.appendChild(header);
            let title = header.findChild(node => node.name == "Title");
            yield figma.loadFontAsync(title.fontName).then();
            title.characters = "Zendesk";
            header.layoutAlign = "STRETCH";
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
            let composer = (yield figma.importComponentByKeyAsync("0cdeaec0c5baf216b6c74d1a939a9c94e025f1df")).createInstance();
            composer.layoutAlign = "STRETCH";
            messenger.appendChild(composer);
            const nodes = [];
            nodes.push(widget);
            figma.currentPage.selection = nodes;
            figma.viewport.scrollAndZoomIntoView(nodes);
        }
        //Now that we are sure there is a conversation, check if there is any messages.
        var firstMessage = log.findChild(node => node.name == "0" && node.type === "INSTANCE");
        //If there is no first message...
        if (!firstMessage) {
            //Create a first timestamp messsage...
            yield figma.importComponentByKeyAsync("663b06bfe927cf5574dc82c60e084da2ee5e99d9").then(timestampComponent => {
                firstMessage = timestampComponent.createInstance();
            });
            firstMessage.name = "0";
            messageCount = 0;
            firstMessage.layoutAlign = "STRETCH";
            let timestamp = firstMessage.findChild(node => node.type == "TEXT" && node.name.includes("Timestamp"));
            let d = new Date(Date.now());
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            let locDate = months[d.getMonth()] + " " + d.getDate() + ", " + (d.getHours() > 12 ? d.getHours() % 12 : d.getHours()) + ":" + ("0" + d.getMinutes()).slice(-2) + " " + (d.getHours() / 12 < 1 ? "AM" : "PM");
            setText(timestamp, locDate);
            log.insertChild(0, firstMessage);
        }
    });
}
//~~Function to send a message~~//
function sendMessage(messageText) {
    return __awaiter(this, void 0, void 0, function* () {
        let positionInGroup;
        //Find the last message in the conversation frame...
        let lastMessage = log.children[log.children.length - 1];
        //..and Set the messageCount to the numbered name of this message
        messageCount = parseInt(lastMessage.name);
        //If participant hasn't changed since last message...
        if (lastMessage.mainComponent.name.startsWith("Direction=Outbound")) {
            //Add to the existing group
            positionInGroup = lastMessage.findAll(node => node.name.startsWith("Message ")).length;
            if (positionInGroup < 3) {
                //TODO Investigate making this scalable beyond 3 messages by appending an new message, vs swapping component.
                var nextMessage = lastMessage;
                nextMessage.swapComponent(nextMessage.mainComponent.parent.findChild(node => node.name == nextMessage.mainComponent.name.substr(0, nextMessage.mainComponent.name.length - 1) + (positionInGroup + 1)));
            }
            else {
                positionInGroup = 2;
                var nextMessage = lastMessage;
                figma.notify("Conversation Kit currently only supports 3 consecutive messages.");
            }
        }
        else {
            positionInGroup = 0;
            //Create a new message...
            let messageGroupComponent;
            yield figma.importComponentSetByKeyAsync("98e8f2af5cef20537dfbfb1dc294f6fc1f60d466").then(messageGroupComponentSet => {
                messageGroupComponent = messageGroupComponentSet.findChild(component => component.name === "Direction=Outbound, Messages=1");
            });
            var nextMessage = messageGroupComponent === null || messageGroupComponent === void 0 ? void 0 : messageGroupComponent.createInstance();
            nextMessage.layoutAlign = "STRETCH";
            nextMessage.name = (++messageCount).toString();
            //Turn off receipts on previous message, if there is one
            let receipt = lastMessage.findOne(node => node.name == "Receipt");
            if (receipt)
                receipt.visible = false;
            //Insert the new message.
            log.insertChild(messageCount, nextMessage);
        }
        //Set the message text
        let message = nextMessage.findAll(node => node.type === "TEXT" && node.name == "Text")[positionInGroup];
        yield figma.loadFontAsync(message.fontName).then(() => {
            message.characters = messageText;
        });
        //Checkt that the message should not be multi-line
        //TODO compare size of log width, so this would still work no matter the device width
        if (message.width > 260) {
            let messageComponent = nextMessage.findAll(node => node.name.startsWith("Message "))[positionInGroup];
            let messageComponentSet = messageComponent.mainComponent.parent;
            messageComponent.swapComponent(messageComponentSet.children[0]);
        }
        //Check that the log has not become filled
        if (nextMessage.y + nextMessage.height > log.height) {
            log.primaryAxisAlignItems = "MAX";
        }
        requestResponse(messageText);
    });
}
//~~Function to receive a message~~//
function receiveResponse(messageText) {
    return __awaiter(this, void 0, void 0, function* () {
        let positionInGroup;
        //Find the last message in the conversation frame...
        let lastMessage = log.children[log.children.length - 1];
        //..and Set the messageCount to the numbered name of this message
        messageCount = parseInt(lastMessage.name);
        //If participant hasn't changed since last message...
        positionInGroup = 0;
        //Create a new message...
        let messageGroupComponent;
        yield figma.importComponentSetByKeyAsync("98e8f2af5cef20537dfbfb1dc294f6fc1f60d466").then(messageGroupComponentSet => {
            messageGroupComponent = messageGroupComponentSet.findChild(component => component.name === "Direction=Inbound, Messages=1");
        });
        var nextMessage = messageGroupComponent === null || messageGroupComponent === void 0 ? void 0 : messageGroupComponent.createInstance();
        nextMessage.layoutAlign = "STRETCH";
        nextMessage.name = (++messageCount).toString();
        //Turn off receipts on previous message, if there is one
        let receipt = lastMessage.findOne(node => node.name == "Receipt");
        if (receipt)
            receipt.visible = false;
        //Insert the new message.
        log.insertChild(messageCount, nextMessage);
        //Set the author label
        let label = nextMessage.findOne(node => node.type === "TEXT" && node.name == "Label");
        yield figma.loadFontAsync(label.fontName).then(() => {
            label.characters = "Answer Bot";
        });
        //Set the avatar
        let avatar = nextMessage.findOne(node => node.name == "Avatar");
        avatar.setProperties({
            Size: "Small",
            Shape: "Square",
            Type: "Image",
            State: "Default"
        });
        let avatarImage = avatar.findChild(node => node.name == "Images");
        avatarImage.setProperties({ Participant: "Bot" });
        //Set the message text
        let message = nextMessage.findAll(node => node.type === "TEXT" && node.name == "Text")[positionInGroup];
        yield figma.loadFontAsync(message.fontName).then(() => {
            message.characters = messageText;
        });
        //Checkt that the message should not be multi-line
        //TODO compare size of log width, so this would still work no matter the device width
        if (message.width > 240) {
            let messageComponent = nextMessage.findAll(node => node.name.startsWith("Message "))[positionInGroup];
            let messageComponentSet = messageComponent.mainComponent.parent;
            messageComponent.swapComponent(messageComponentSet.children[0]);
        }
        //Check that the log has not become filled
        if (nextMessage.y + nextMessage.height > log.height) {
            log.primaryAxisAlignItems = "MAX";
        }
    });
}
//~~~UTILITIES~~~//
//~~Function to safely chance text on TextNodes.~~//
function setText(node, text) {
    return __awaiter(this, void 0, void 0, function* () {
        yield figma.loadFontAsync(node.fontName);
        node.characters = text;
    });
}
//~~Function to clone fills, etc. so they can be set.~~//
function clone(val) {
    const type = typeof val;
    if (val === null) {
        return null;
    }
    else if (type === 'undefined' || type === 'number' ||
        type === 'string' || type === 'boolean') {
        return val;
    }
    else if (type === 'object') {
        if (val instanceof Array) {
            return val.map(x => clone(x));
        }
        else if (val instanceof Uint8Array) {
            return new Uint8Array(val);
        }
        else {
            let o = {};
            for (const key in val) {
                o[key] = clone(val[key]);
            }
            return o;
        }
    }
    throw 'unknown';
}
function requestResponse(messageText) {
    figma.ui.postMessage({ type: 'networkRequest', message: messageText });
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0EsMkJBQTJCLCtEQUErRCxnQkFBZ0IsRUFBRSxFQUFFO0FBQzlHO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLHFGQUFxRjtBQUNwSDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLFVBQVU7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxXQUFXO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFdBQVc7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsbUNBQW1DLHFCQUFxQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsK0NBQStDO0FBQ3pFIiwiZmlsZSI6ImNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9jb2RlLnRzXCIpO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgbWVzc2FnZUNvdW50ID0gMDtcbnZhciBsb2c7XG4vLyBUaGlzIHBsdWdpbiB3aWxsIG9wZW4gYSB3aW5kb3cgdG8gcHJvbXB0IHRoZSB1c2VyIHRvIGVudGVyIGEgbWVzc2FnZSwgYW5kXG4vLyBpdCB3aWxsIHRoZW4gY3JlYXRlIGEgbWVzc2FnZSBzeW1ib2wgd2l0aCB0aGF0IHRleHQgb24gc2NyZWVuLlxuLy8gVGhpcyBmaWxlIGhvbGRzIHRoZSBtYWluIGNvZGUgZm9yIHRoZSBwbHVnaW5zLiBJdCBoYXMgYWNjZXNzIHRvIHRoZSAqZG9jdW1lbnQqLlxuLy8gWW91IGNhbiBhY2Nlc3MgYnJvd3NlciBBUElzIGluIHRoZSA8c2NyaXB0PiB0YWcgaW5zaWRlIFwidWkuaHRtbFwiIHdoaWNoIGhhcyBhXG4vLyBmdWxsIGJyb3dzZXIgZW52aXJvbm1lbnQgKHNlZSBkb2N1bWVudGF0aW9uKS5cbi8vIFRoaXMgc2hvd3MgdGhlIEhUTUwgcGFnZSBpbiBcInVpLmh0bWxcIi5cbmZpZ21hLnNob3dVSShfX2h0bWxfXyk7XG5maWdtYS51aS5yZXNpemUoMzYwLCA3Mik7XG4vL1NlY3JldCBib290c3RyYXAgcG9pbnQgc2V0dGVyIC0tIGNvbW1tZW50IG91dCB3aGVuIG5vdCBpbiB1c2UuXG4vLyBsZXQgbGF1bmNoZXIgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24uZmluZChub2RlID0+IChub2RlLnR5cGUgPT0gXCJDT01QT05FTlRcIiB8fCBub2RlLnR5cGUgPT0gXCJJTlNUQU5DRVwiKSAmJiBub2RlLnBhcmVudC5uYW1lID09IFwiTGF1bmNoZXJcIilcbi8vIGlmIChsYXVuY2hlcil7XG4vLyAgIGxhdW5jaGVyLnNldFJlbGF1bmNoRGF0YSh7c3RhcnQ6IFwiXCJ9KVxuLy8gICBmaWdtYS5jbG9zZVBsdWdpbigpXG4vLyB9XG4vLyBDYWxscyB0byBcInBhcmVudC5wb3N0TWVzc2FnZVwiIGZyb20gd2l0aGluIHRoZSBIVE1MIHBhZ2Ugd2lsbCB0cmlnZ2VyIHRoaXNcbi8vIGNhbGxiYWNrLiBUaGUgY2FsbGJhY2sgd2lsbCBiZSBwYXNzZWQgdGhlIFwicGx1Z2luTWVzc2FnZVwiIHByb3BlcnR5IG9mIHRoZVxuLy8gcG9zdGVkIG1lc3NhZ2UuXG5maWdtYS51aS5vbm1lc3NhZ2UgPSAobXNnKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgLy9Mb29rIGZvciBhIFwiV2lkZ2V0XCIgb3IgYSBcIk1lc3NlbmdlclwiIGluIHRoZSBjdXJyZW50IHNlbGVjdGlvblxuICAgIGxldCB3aWRnZXQgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24uZmluZChub2RlID0+IG5vZGUudHlwZSA9PT0gXCJGUkFNRVwiICYmIG5vZGUubmFtZSA9PSBcIldpZGdldFwiKTtcbiAgICBsZXQgbWVzc2VuZ2VyID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uLmZpbmQobm9kZSA9PiBub2RlLnR5cGUgPT09IFwiRlJBTUVcIiAmJiBub2RlLm5hbWUgPT0gXCJNZXNzZW5nZXJcIik7XG4gICAgLy8gVGhlbiBsb29rIGZvciBhIGNoaWxkICdMb2cnIGZyYW1lLi4uXG4gICAgaWYgKHdpZGdldCkge1xuICAgICAgICBsb2cgPSB3aWRnZXQuZmluZE9uZShub2RlID0+IG5vZGUudHlwZSA9PT0gXCJGUkFNRVwiICYmIG5vZGUubmFtZSA9PSBcIkxvZ1wiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAobWVzc2VuZ2VyKSB7XG4gICAgICAgIGxvZyA9IG1lc3Nlbmdlci5maW5kT25lKG5vZGUgPT4gbm9kZS50eXBlID09PSBcIkZSQU1FXCIgJiYgbm9kZS5uYW1lID09IFwiTG9nXCIpO1xuICAgIH1cbiAgICAvLyBPbmUgd2F5IG9mIGRpc3Rpbmd1aXNoaW5nIGJldHdlZW4gZGlmZmVyZW50IHR5cGVzIG9mIG1lc3NhZ2VzIHNlbnQgZnJvbVxuICAgIC8vIHlvdXIgSFRNTCBwYWdlIGlzIHRvIHVzZSBhbiBvYmplY3Qgd2l0aCBhIFwidHlwZVwiIHByb3BlcnR5IGxpa2UgdGhpcy4uLlxuICAgIGlmIChtc2cudHlwZSA9PT0gJ3NlbmQtbWVzc2FnZScpIHtcbiAgICAgICAgeWllbGQgc2VuZE1lc3NhZ2UobXNnLm1lc3NhZ2UpO1xuICAgIH1cbiAgICBlbHNlIGlmIChtc2cudHlwZSA9PT0gJ3JlY2VpdmUtbWVzc2FnZScpIHtcbiAgICAgICAgeWllbGQgcmVjZWl2ZVJlc3BvbnNlKG1zZy5tZXNzYWdlLmNob2ljZXNbMF0udGV4dCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG1zZy50eXBlID09PSAnc2V0dXAnKSB7XG4gICAgICAgIC8vSWYgdGhlcmUgaXMgbm90IGEgY29udmVyc2F0aW9uLi4uXG4gICAgICAgIHlpZWxkIHNldFVwKCk7XG4gICAgfVxufSk7XG4vL35+RnVuY3Rpb24gdG8gc2V0IHVwIGEgbmV3IGNvbnZlcnNhdGlvbn5+Ly9cbmZ1bmN0aW9uIHNldFVwKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGlmICghbG9nKSB7XG4gICAgICAgICAgICAvL0ZpbmQgbGFzdCB3aWRnZXQuLi5cbiAgICAgICAgICAgIGxldCBvdGhlcldpZGdldHMgPSBmaWdtYS5jdXJyZW50UGFnZS5maW5kQWxsKG5vZGUgPT4gbm9kZS5uYW1lID09IFwiV2lkZ2V0XCIpO1xuICAgICAgICAgICAgLy9NYWtlIHRoZSBjb250YWluZXJcbiAgICAgICAgICAgIGxldCB3aWRnZXQgPSBmaWdtYS5jcmVhdGVGcmFtZSgpO1xuICAgICAgICAgICAgd2lkZ2V0LnNldFJlbGF1bmNoRGF0YSh7IG9wZW46IFwiXCIgfSk7XG4gICAgICAgICAgICB3aWRnZXQubmFtZSA9IFwiV2lkZ2V0XCI7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBhcmUgb3RoZXIgY29udGFpbmVycywgb2Zmc2V0IGl0IHRvIHRoZSByaWdodCBvZiB0aGUgbGFzdCBvbmUuXG4gICAgICAgICAgICBpZiAob3RoZXJXaWRnZXRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB3aWRnZXQueCA9IG90aGVyV2lkZ2V0c1tvdGhlcldpZGdldHMubGVuZ3RoIC0gMV0ueCArIDQ4MDtcbiAgICAgICAgICAgICAgICB3aWRnZXQueSA9IG90aGVyV2lkZ2V0c1tvdGhlcldpZGdldHMubGVuZ3RoIC0gMV0ueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHdpZGdldC54ID0gZmlnbWEudmlld3BvcnQuY2VudGVyLnggLSAxOTA7XG4gICAgICAgICAgICAgICAgd2lkZ2V0LnkgPSBmaWdtYS52aWV3cG9ydC5jZW50ZXIueSAtIDM5MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdpZGdldC5yZXNpemUoMzgwLCA3ODApO1xuICAgICAgICAgICAgd2lkZ2V0LmNsaXBzQ29udGVudCA9IGZhbHNlO1xuICAgICAgICAgICAgd2lkZ2V0LmZpbGxzID0gW107XG4gICAgICAgICAgICB3aWRnZXQubGF5b3V0TW9kZSA9IFwiVkVSVElDQUxcIjtcbiAgICAgICAgICAgIHdpZGdldC5wcmltYXJ5QXhpc1NpemluZ01vZGUgPSBcIkFVVE9cIjtcbiAgICAgICAgICAgIHdpZGdldC5jb3VudGVyQXhpc0FsaWduSXRlbXMgPSBcIk1BWFwiO1xuICAgICAgICAgICAgd2lkZ2V0Lml0ZW1TcGFjaW5nID0gODtcbiAgICAgICAgICAgIC8vTWFrZSB0aGUgbWVzc2VuZ2VyXG4gICAgICAgICAgICBsZXQgbWVzc2VuZ2VyID0gZmlnbWEuY3JlYXRlRnJhbWUoKTtcbiAgICAgICAgICAgIG1lc3Nlbmdlci5zZXRSZWxhdW5jaERhdGEoeyBvcGVuOiBcIlwiIH0pO1xuICAgICAgICAgICAgbWVzc2VuZ2VyLm5hbWUgPSBcIk1lc3NlbmdlclwiO1xuICAgICAgICAgICAgbWVzc2VuZ2VyLnJlc2l6ZSgzODAsIDcwMCk7XG4gICAgICAgICAgICBtZXNzZW5nZXIubGF5b3V0TW9kZSA9IFwiVkVSVElDQUxcIjtcbiAgICAgICAgICAgIG1lc3Nlbmdlci5wcmltYXJ5QXhpc1NpemluZ01vZGUgPSBcIkZJWEVEXCI7XG4gICAgICAgICAgICBsZXQgYmFja2dyb3VuZFN0eWxlID0geWllbGQgZmlnbWEuaW1wb3J0U3R5bGVCeUtleUFzeW5jKFwiZTk0MzcwZWY3YjNhNjQ1ZTkzYmQyOWRhOTRkYzY3YWQ2YjZlYzUyZVwiKS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZmlnbWEubm90aWZ5KFwiWmNyaXB0ZXIgcmVxdWlyZXMgdGhlICdaZW5kZXNrIFRoZW1lIChEZWZhdWx0KScgbGlicmFyeS5cIik7XG4gICAgICAgICAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbWVzc2VuZ2VyLmZpbGxTdHlsZUlkID0gYmFja2dyb3VuZFN0eWxlLmlkO1xuICAgICAgICAgICAgbGV0IGJhY2tncm91bmRFZmZlY3QgPSB5aWVsZCBmaWdtYS5pbXBvcnRTdHlsZUJ5S2V5QXN5bmMoXCIyMGIwNDA1YWQ3MDI0YTIwYWQ4NzhiOTBiM2I3NWJkNWJiMjY0NDNhXCIpLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICBmaWdtYS5ub3RpZnkoXCJaY3JpcHRlciByZXF1aXJlcyB0aGUgJ0dhcmRlbicgbGlicmFyeS5cIik7XG4gICAgICAgICAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbWVzc2VuZ2VyLmVmZmVjdFN0eWxlSWQgPSBiYWNrZ3JvdW5kRWZmZWN0LmlkO1xuICAgICAgICAgICAgd2lkZ2V0LmFwcGVuZENoaWxkKG1lc3Nlbmdlcik7XG4gICAgICAgICAgICAvL01ha2UgdGhlIGxhdW5jaGVyXG4gICAgICAgICAgICBsZXQgbGF1bmNoZXI7XG4gICAgICAgICAgICBpZiAoZmlnbWEuY29tbWFuZCA9PSBcInN0YXJ0XCIpIHtcbiAgICAgICAgICAgICAgICBsYXVuY2hlciA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbi5maW5kKG5vZGUgPT4gbm9kZS50eXBlID09IFwiSU5TVEFOQ0VcIiAmJiBub2RlLm5hbWUgPT0gXCJMYXVuY2hlclwiKTtcbiAgICAgICAgICAgICAgICB3aWRnZXQueCA9IGxhdW5jaGVyLnggLSAzMDg7XG4gICAgICAgICAgICAgICAgd2lkZ2V0LnkgPSBsYXVuY2hlci55IC0gNzA4O1xuICAgICAgICAgICAgICAgIGxhdW5jaGVyLnN3YXBDb21wb25lbnQoeWllbGQgZmlnbWEuaW1wb3J0Q29tcG9uZW50QnlLZXlBc3luYyhcImM1ZjJjN2I4NDE3Yjg2NjI5YThlNTJhYTM3ZWJlMmMwNjVhMmM2ZGVcIikpO1xuICAgICAgICAgICAgICAgIGxhdW5jaGVyLnBhcmVudC5hcHBlbmRDaGlsZCh3aWRnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGF1bmNoZXIgPSAoeWllbGQgZmlnbWEuaW1wb3J0Q29tcG9uZW50QnlLZXlBc3luYyhcImM1ZjJjN2I4NDE3Yjg2NjI5YThlNTJhYTM3ZWJlMmMwNjVhMmM2ZGVcIikpLmNyZWF0ZUluc3RhbmNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXVuY2hlci5zZXRSZWxhdW5jaERhdGEoe30pO1xuICAgICAgICAgICAgd2lkZ2V0LmFwcGVuZENoaWxkKGxhdW5jaGVyKTtcbiAgICAgICAgICAgIC8vTWFrZSB0aGUgaGVhZGVyXG4gICAgICAgICAgICBsZXQgaGVhZGVyID0gKHlpZWxkIGZpZ21hLmltcG9ydENvbXBvbmVudEJ5S2V5QXN5bmMoXCJkYTg1Nzc4ZmEzZTNmNTQ0ODVmY2VkZmUxYmYyNDc2Zjg1MWYyZjQxXCIpKS5jcmVhdGVJbnN0YW5jZSgpO1xuICAgICAgICAgICAgbWVzc2VuZ2VyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgICAgICAgICBsZXQgdGl0bGUgPSBoZWFkZXIuZmluZENoaWxkKG5vZGUgPT4gbm9kZS5uYW1lID09IFwiVGl0bGVcIik7XG4gICAgICAgICAgICB5aWVsZCBmaWdtYS5sb2FkRm9udEFzeW5jKHRpdGxlLmZvbnROYW1lKS50aGVuKCk7XG4gICAgICAgICAgICB0aXRsZS5jaGFyYWN0ZXJzID0gXCJaZW5kZXNrXCI7XG4gICAgICAgICAgICBoZWFkZXIubGF5b3V0QWxpZ24gPSBcIlNUUkVUQ0hcIjtcbiAgICAgICAgICAgIC8vTWFrZSBhIGxvZyBmcmFtZVxuICAgICAgICAgICAgbG9nID0gZmlnbWEuY3JlYXRlRnJhbWUoKTtcbiAgICAgICAgICAgIGxvZy5uYW1lID0gXCJMb2dcIjtcbiAgICAgICAgICAgIGxvZy5yZXNpemUoMzgwLCAxKTtcbiAgICAgICAgICAgIGxvZy5sYXlvdXRNb2RlID0gXCJWRVJUSUNBTFwiO1xuICAgICAgICAgICAgbG9nLmxheW91dEdyb3cgPSAxO1xuICAgICAgICAgICAgbG9nLmxheW91dEFsaWduID0gXCJTVFJFVENIXCI7XG4gICAgICAgICAgICBsb2cub3ZlcmZsb3dEaXJlY3Rpb24gPSBcIlZFUlRJQ0FMXCI7XG4gICAgICAgICAgICBsb2cuZmlsbHMgPSBbXTtcbiAgICAgICAgICAgIG1lc3Nlbmdlci5hcHBlbmRDaGlsZChsb2cpO1xuICAgICAgICAgICAgLy9NYWtlIHRoZSBjb21wb3NlclxuICAgICAgICAgICAgbGV0IGNvbXBvc2VyID0gKHlpZWxkIGZpZ21hLmltcG9ydENvbXBvbmVudEJ5S2V5QXN5bmMoXCIwY2RlYWVjMGM1YmFmMjE2YjZjNzRkMWE5MzlhOWM5NGUwMjVmMWRmXCIpKS5jcmVhdGVJbnN0YW5jZSgpO1xuICAgICAgICAgICAgY29tcG9zZXIubGF5b3V0QWxpZ24gPSBcIlNUUkVUQ0hcIjtcbiAgICAgICAgICAgIG1lc3Nlbmdlci5hcHBlbmRDaGlsZChjb21wb3Nlcik7XG4gICAgICAgICAgICBjb25zdCBub2RlcyA9IFtdO1xuICAgICAgICAgICAgbm9kZXMucHVzaCh3aWRnZXQpO1xuICAgICAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gbm9kZXM7XG4gICAgICAgICAgICBmaWdtYS52aWV3cG9ydC5zY3JvbGxBbmRab29tSW50b1ZpZXcobm9kZXMpO1xuICAgICAgICB9XG4gICAgICAgIC8vTm93IHRoYXQgd2UgYXJlIHN1cmUgdGhlcmUgaXMgYSBjb252ZXJzYXRpb24sIGNoZWNrIGlmIHRoZXJlIGlzIGFueSBtZXNzYWdlcy5cbiAgICAgICAgdmFyIGZpcnN0TWVzc2FnZSA9IGxvZy5maW5kQ2hpbGQobm9kZSA9PiBub2RlLm5hbWUgPT0gXCIwXCIgJiYgbm9kZS50eXBlID09PSBcIklOU1RBTkNFXCIpO1xuICAgICAgICAvL0lmIHRoZXJlIGlzIG5vIGZpcnN0IG1lc3NhZ2UuLi5cbiAgICAgICAgaWYgKCFmaXJzdE1lc3NhZ2UpIHtcbiAgICAgICAgICAgIC8vQ3JlYXRlIGEgZmlyc3QgdGltZXN0YW1wIG1lc3NzYWdlLi4uXG4gICAgICAgICAgICB5aWVsZCBmaWdtYS5pbXBvcnRDb21wb25lbnRCeUtleUFzeW5jKFwiNjYzYjA2YmZlOTI3Y2Y1NTc0ZGM4MmM2MGUwODRkYTJlZTVlOTlkOVwiKS50aGVuKHRpbWVzdGFtcENvbXBvbmVudCA9PiB7XG4gICAgICAgICAgICAgICAgZmlyc3RNZXNzYWdlID0gdGltZXN0YW1wQ29tcG9uZW50LmNyZWF0ZUluc3RhbmNlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZpcnN0TWVzc2FnZS5uYW1lID0gXCIwXCI7XG4gICAgICAgICAgICBtZXNzYWdlQ291bnQgPSAwO1xuICAgICAgICAgICAgZmlyc3RNZXNzYWdlLmxheW91dEFsaWduID0gXCJTVFJFVENIXCI7XG4gICAgICAgICAgICBsZXQgdGltZXN0YW1wID0gZmlyc3RNZXNzYWdlLmZpbmRDaGlsZChub2RlID0+IG5vZGUudHlwZSA9PSBcIlRFWFRcIiAmJiBub2RlLm5hbWUuaW5jbHVkZXMoXCJUaW1lc3RhbXBcIikpO1xuICAgICAgICAgICAgbGV0IGQgPSBuZXcgRGF0ZShEYXRlLm5vdygpKTtcbiAgICAgICAgICAgIGNvbnN0IG1vbnRocyA9IFsnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddO1xuICAgICAgICAgICAgbGV0IGxvY0RhdGUgPSBtb250aHNbZC5nZXRNb250aCgpXSArIFwiIFwiICsgZC5nZXREYXRlKCkgKyBcIiwgXCIgKyAoZC5nZXRIb3VycygpID4gMTIgPyBkLmdldEhvdXJzKCkgJSAxMiA6IGQuZ2V0SG91cnMoKSkgKyBcIjpcIiArIChcIjBcIiArIGQuZ2V0TWludXRlcygpKS5zbGljZSgtMikgKyBcIiBcIiArIChkLmdldEhvdXJzKCkgLyAxMiA8IDEgPyBcIkFNXCIgOiBcIlBNXCIpO1xuICAgICAgICAgICAgc2V0VGV4dCh0aW1lc3RhbXAsIGxvY0RhdGUpO1xuICAgICAgICAgICAgbG9nLmluc2VydENoaWxkKDAsIGZpcnN0TWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vfn5GdW5jdGlvbiB0byBzZW5kIGEgbWVzc2FnZX5+Ly9cbmZ1bmN0aW9uIHNlbmRNZXNzYWdlKG1lc3NhZ2VUZXh0KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgbGV0IHBvc2l0aW9uSW5Hcm91cDtcbiAgICAgICAgLy9GaW5kIHRoZSBsYXN0IG1lc3NhZ2UgaW4gdGhlIGNvbnZlcnNhdGlvbiBmcmFtZS4uLlxuICAgICAgICBsZXQgbGFzdE1lc3NhZ2UgPSBsb2cuY2hpbGRyZW5bbG9nLmNoaWxkcmVuLmxlbmd0aCAtIDFdO1xuICAgICAgICAvLy4uYW5kIFNldCB0aGUgbWVzc2FnZUNvdW50IHRvIHRoZSBudW1iZXJlZCBuYW1lIG9mIHRoaXMgbWVzc2FnZVxuICAgICAgICBtZXNzYWdlQ291bnQgPSBwYXJzZUludChsYXN0TWVzc2FnZS5uYW1lKTtcbiAgICAgICAgLy9JZiBwYXJ0aWNpcGFudCBoYXNuJ3QgY2hhbmdlZCBzaW5jZSBsYXN0IG1lc3NhZ2UuLi5cbiAgICAgICAgaWYgKGxhc3RNZXNzYWdlLm1haW5Db21wb25lbnQubmFtZS5zdGFydHNXaXRoKFwiRGlyZWN0aW9uPU91dGJvdW5kXCIpKSB7XG4gICAgICAgICAgICAvL0FkZCB0byB0aGUgZXhpc3RpbmcgZ3JvdXBcbiAgICAgICAgICAgIHBvc2l0aW9uSW5Hcm91cCA9IGxhc3RNZXNzYWdlLmZpbmRBbGwobm9kZSA9PiBub2RlLm5hbWUuc3RhcnRzV2l0aChcIk1lc3NhZ2UgXCIpKS5sZW5ndGg7XG4gICAgICAgICAgICBpZiAocG9zaXRpb25Jbkdyb3VwIDwgMykge1xuICAgICAgICAgICAgICAgIC8vVE9ETyBJbnZlc3RpZ2F0ZSBtYWtpbmcgdGhpcyBzY2FsYWJsZSBiZXlvbmQgMyBtZXNzYWdlcyBieSBhcHBlbmRpbmcgYW4gbmV3IG1lc3NhZ2UsIHZzIHN3YXBwaW5nIGNvbXBvbmVudC5cbiAgICAgICAgICAgICAgICB2YXIgbmV4dE1lc3NhZ2UgPSBsYXN0TWVzc2FnZTtcbiAgICAgICAgICAgICAgICBuZXh0TWVzc2FnZS5zd2FwQ29tcG9uZW50KG5leHRNZXNzYWdlLm1haW5Db21wb25lbnQucGFyZW50LmZpbmRDaGlsZChub2RlID0+IG5vZGUubmFtZSA9PSBuZXh0TWVzc2FnZS5tYWluQ29tcG9uZW50Lm5hbWUuc3Vic3RyKDAsIG5leHRNZXNzYWdlLm1haW5Db21wb25lbnQubmFtZS5sZW5ndGggLSAxKSArIChwb3NpdGlvbkluR3JvdXAgKyAxKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb25Jbkdyb3VwID0gMjtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dE1lc3NhZ2UgPSBsYXN0TWVzc2FnZTtcbiAgICAgICAgICAgICAgICBmaWdtYS5ub3RpZnkoXCJDb252ZXJzYXRpb24gS2l0IGN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIDMgY29uc2VjdXRpdmUgbWVzc2FnZXMuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcG9zaXRpb25Jbkdyb3VwID0gMDtcbiAgICAgICAgICAgIC8vQ3JlYXRlIGEgbmV3IG1lc3NhZ2UuLi5cbiAgICAgICAgICAgIGxldCBtZXNzYWdlR3JvdXBDb21wb25lbnQ7XG4gICAgICAgICAgICB5aWVsZCBmaWdtYS5pbXBvcnRDb21wb25lbnRTZXRCeUtleUFzeW5jKFwiOThlOGYyYWY1Y2VmMjA1MzdkZmJmYjFkYzI5NGY2ZmMxZjYwZDQ2NlwiKS50aGVuKG1lc3NhZ2VHcm91cENvbXBvbmVudFNldCA9PiB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZUdyb3VwQ29tcG9uZW50ID0gbWVzc2FnZUdyb3VwQ29tcG9uZW50U2V0LmZpbmRDaGlsZChjb21wb25lbnQgPT4gY29tcG9uZW50Lm5hbWUgPT09IFwiRGlyZWN0aW9uPU91dGJvdW5kLCBNZXNzYWdlcz0xXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgbmV4dE1lc3NhZ2UgPSBtZXNzYWdlR3JvdXBDb21wb25lbnQgPT09IG51bGwgfHwgbWVzc2FnZUdyb3VwQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtZXNzYWdlR3JvdXBDb21wb25lbnQuY3JlYXRlSW5zdGFuY2UoKTtcbiAgICAgICAgICAgIG5leHRNZXNzYWdlLmxheW91dEFsaWduID0gXCJTVFJFVENIXCI7XG4gICAgICAgICAgICBuZXh0TWVzc2FnZS5uYW1lID0gKCsrbWVzc2FnZUNvdW50KS50b1N0cmluZygpO1xuICAgICAgICAgICAgLy9UdXJuIG9mZiByZWNlaXB0cyBvbiBwcmV2aW91cyBtZXNzYWdlLCBpZiB0aGVyZSBpcyBvbmVcbiAgICAgICAgICAgIGxldCByZWNlaXB0ID0gbGFzdE1lc3NhZ2UuZmluZE9uZShub2RlID0+IG5vZGUubmFtZSA9PSBcIlJlY2VpcHRcIik7XG4gICAgICAgICAgICBpZiAocmVjZWlwdClcbiAgICAgICAgICAgICAgICByZWNlaXB0LnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vSW5zZXJ0IHRoZSBuZXcgbWVzc2FnZS5cbiAgICAgICAgICAgIGxvZy5pbnNlcnRDaGlsZChtZXNzYWdlQ291bnQsIG5leHRNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICAvL1NldCB0aGUgbWVzc2FnZSB0ZXh0XG4gICAgICAgIGxldCBtZXNzYWdlID0gbmV4dE1lc3NhZ2UuZmluZEFsbChub2RlID0+IG5vZGUudHlwZSA9PT0gXCJURVhUXCIgJiYgbm9kZS5uYW1lID09IFwiVGV4dFwiKVtwb3NpdGlvbkluR3JvdXBdO1xuICAgICAgICB5aWVsZCBmaWdtYS5sb2FkRm9udEFzeW5jKG1lc3NhZ2UuZm9udE5hbWUpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgbWVzc2FnZS5jaGFyYWN0ZXJzID0gbWVzc2FnZVRleHQ7XG4gICAgICAgIH0pO1xuICAgICAgICAvL0NoZWNrdCB0aGF0IHRoZSBtZXNzYWdlIHNob3VsZCBub3QgYmUgbXVsdGktbGluZVxuICAgICAgICAvL1RPRE8gY29tcGFyZSBzaXplIG9mIGxvZyB3aWR0aCwgc28gdGhpcyB3b3VsZCBzdGlsbCB3b3JrIG5vIG1hdHRlciB0aGUgZGV2aWNlIHdpZHRoXG4gICAgICAgIGlmIChtZXNzYWdlLndpZHRoID4gMjYwKSB7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZUNvbXBvbmVudCA9IG5leHRNZXNzYWdlLmZpbmRBbGwobm9kZSA9PiBub2RlLm5hbWUuc3RhcnRzV2l0aChcIk1lc3NhZ2UgXCIpKVtwb3NpdGlvbkluR3JvdXBdO1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2VDb21wb25lbnRTZXQgPSBtZXNzYWdlQ29tcG9uZW50Lm1haW5Db21wb25lbnQucGFyZW50O1xuICAgICAgICAgICAgbWVzc2FnZUNvbXBvbmVudC5zd2FwQ29tcG9uZW50KG1lc3NhZ2VDb21wb25lbnRTZXQuY2hpbGRyZW5bMF0pO1xuICAgICAgICB9XG4gICAgICAgIC8vQ2hlY2sgdGhhdCB0aGUgbG9nIGhhcyBub3QgYmVjb21lIGZpbGxlZFxuICAgICAgICBpZiAobmV4dE1lc3NhZ2UueSArIG5leHRNZXNzYWdlLmhlaWdodCA+IGxvZy5oZWlnaHQpIHtcbiAgICAgICAgICAgIGxvZy5wcmltYXJ5QXhpc0FsaWduSXRlbXMgPSBcIk1BWFwiO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RSZXNwb25zZShtZXNzYWdlVGV4dCk7XG4gICAgfSk7XG59XG4vL35+RnVuY3Rpb24gdG8gcmVjZWl2ZSBhIG1lc3NhZ2V+fi8vXG5mdW5jdGlvbiByZWNlaXZlUmVzcG9uc2UobWVzc2FnZVRleHQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBsZXQgcG9zaXRpb25Jbkdyb3VwO1xuICAgICAgICAvL0ZpbmQgdGhlIGxhc3QgbWVzc2FnZSBpbiB0aGUgY29udmVyc2F0aW9uIGZyYW1lLi4uXG4gICAgICAgIGxldCBsYXN0TWVzc2FnZSA9IGxvZy5jaGlsZHJlbltsb2cuY2hpbGRyZW4ubGVuZ3RoIC0gMV07XG4gICAgICAgIC8vLi5hbmQgU2V0IHRoZSBtZXNzYWdlQ291bnQgdG8gdGhlIG51bWJlcmVkIG5hbWUgb2YgdGhpcyBtZXNzYWdlXG4gICAgICAgIG1lc3NhZ2VDb3VudCA9IHBhcnNlSW50KGxhc3RNZXNzYWdlLm5hbWUpO1xuICAgICAgICAvL0lmIHBhcnRpY2lwYW50IGhhc24ndCBjaGFuZ2VkIHNpbmNlIGxhc3QgbWVzc2FnZS4uLlxuICAgICAgICBwb3NpdGlvbkluR3JvdXAgPSAwO1xuICAgICAgICAvL0NyZWF0ZSBhIG5ldyBtZXNzYWdlLi4uXG4gICAgICAgIGxldCBtZXNzYWdlR3JvdXBDb21wb25lbnQ7XG4gICAgICAgIHlpZWxkIGZpZ21hLmltcG9ydENvbXBvbmVudFNldEJ5S2V5QXN5bmMoXCI5OGU4ZjJhZjVjZWYyMDUzN2RmYmZiMWRjMjk0ZjZmYzFmNjBkNDY2XCIpLnRoZW4obWVzc2FnZUdyb3VwQ29tcG9uZW50U2V0ID0+IHtcbiAgICAgICAgICAgIG1lc3NhZ2VHcm91cENvbXBvbmVudCA9IG1lc3NhZ2VHcm91cENvbXBvbmVudFNldC5maW5kQ2hpbGQoY29tcG9uZW50ID0+IGNvbXBvbmVudC5uYW1lID09PSBcIkRpcmVjdGlvbj1JbmJvdW5kLCBNZXNzYWdlcz0xXCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIG5leHRNZXNzYWdlID0gbWVzc2FnZUdyb3VwQ29tcG9uZW50ID09PSBudWxsIHx8IG1lc3NhZ2VHcm91cENvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbWVzc2FnZUdyb3VwQ29tcG9uZW50LmNyZWF0ZUluc3RhbmNlKCk7XG4gICAgICAgIG5leHRNZXNzYWdlLmxheW91dEFsaWduID0gXCJTVFJFVENIXCI7XG4gICAgICAgIG5leHRNZXNzYWdlLm5hbWUgPSAoKyttZXNzYWdlQ291bnQpLnRvU3RyaW5nKCk7XG4gICAgICAgIC8vVHVybiBvZmYgcmVjZWlwdHMgb24gcHJldmlvdXMgbWVzc2FnZSwgaWYgdGhlcmUgaXMgb25lXG4gICAgICAgIGxldCByZWNlaXB0ID0gbGFzdE1lc3NhZ2UuZmluZE9uZShub2RlID0+IG5vZGUubmFtZSA9PSBcIlJlY2VpcHRcIik7XG4gICAgICAgIGlmIChyZWNlaXB0KVxuICAgICAgICAgICAgcmVjZWlwdC52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIC8vSW5zZXJ0IHRoZSBuZXcgbWVzc2FnZS5cbiAgICAgICAgbG9nLmluc2VydENoaWxkKG1lc3NhZ2VDb3VudCwgbmV4dE1lc3NhZ2UpO1xuICAgICAgICAvL1NldCB0aGUgYXV0aG9yIGxhYmVsXG4gICAgICAgIGxldCBsYWJlbCA9IG5leHRNZXNzYWdlLmZpbmRPbmUobm9kZSA9PiBub2RlLnR5cGUgPT09IFwiVEVYVFwiICYmIG5vZGUubmFtZSA9PSBcIkxhYmVsXCIpO1xuICAgICAgICB5aWVsZCBmaWdtYS5sb2FkRm9udEFzeW5jKGxhYmVsLmZvbnROYW1lKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGxhYmVsLmNoYXJhY3RlcnMgPSBcIkFuc3dlciBCb3RcIjtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vU2V0IHRoZSBhdmF0YXJcbiAgICAgICAgbGV0IGF2YXRhciA9IG5leHRNZXNzYWdlLmZpbmRPbmUobm9kZSA9PiBub2RlLm5hbWUgPT0gXCJBdmF0YXJcIik7XG4gICAgICAgIGF2YXRhci5zZXRQcm9wZXJ0aWVzKHtcbiAgICAgICAgICAgIFNpemU6IFwiU21hbGxcIixcbiAgICAgICAgICAgIFNoYXBlOiBcIlNxdWFyZVwiLFxuICAgICAgICAgICAgVHlwZTogXCJJbWFnZVwiLFxuICAgICAgICAgICAgU3RhdGU6IFwiRGVmYXVsdFwiXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgYXZhdGFySW1hZ2UgPSBhdmF0YXIuZmluZENoaWxkKG5vZGUgPT4gbm9kZS5uYW1lID09IFwiSW1hZ2VzXCIpO1xuICAgICAgICBhdmF0YXJJbWFnZS5zZXRQcm9wZXJ0aWVzKHsgUGFydGljaXBhbnQ6IFwiQm90XCIgfSk7XG4gICAgICAgIC8vU2V0IHRoZSBtZXNzYWdlIHRleHRcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBuZXh0TWVzc2FnZS5maW5kQWxsKG5vZGUgPT4gbm9kZS50eXBlID09PSBcIlRFWFRcIiAmJiBub2RlLm5hbWUgPT0gXCJUZXh0XCIpW3Bvc2l0aW9uSW5Hcm91cF07XG4gICAgICAgIHlpZWxkIGZpZ21hLmxvYWRGb250QXN5bmMobWVzc2FnZS5mb250TmFtZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBtZXNzYWdlLmNoYXJhY3RlcnMgPSBtZXNzYWdlVGV4dDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vQ2hlY2t0IHRoYXQgdGhlIG1lc3NhZ2Ugc2hvdWxkIG5vdCBiZSBtdWx0aS1saW5lXG4gICAgICAgIC8vVE9ETyBjb21wYXJlIHNpemUgb2YgbG9nIHdpZHRoLCBzbyB0aGlzIHdvdWxkIHN0aWxsIHdvcmsgbm8gbWF0dGVyIHRoZSBkZXZpY2Ugd2lkdGhcbiAgICAgICAgaWYgKG1lc3NhZ2Uud2lkdGggPiAyNDApIHtcbiAgICAgICAgICAgIGxldCBtZXNzYWdlQ29tcG9uZW50ID0gbmV4dE1lc3NhZ2UuZmluZEFsbChub2RlID0+IG5vZGUubmFtZS5zdGFydHNXaXRoKFwiTWVzc2FnZSBcIikpW3Bvc2l0aW9uSW5Hcm91cF07XG4gICAgICAgICAgICBsZXQgbWVzc2FnZUNvbXBvbmVudFNldCA9IG1lc3NhZ2VDb21wb25lbnQubWFpbkNvbXBvbmVudC5wYXJlbnQ7XG4gICAgICAgICAgICBtZXNzYWdlQ29tcG9uZW50LnN3YXBDb21wb25lbnQobWVzc2FnZUNvbXBvbmVudFNldC5jaGlsZHJlblswXSk7XG4gICAgICAgIH1cbiAgICAgICAgLy9DaGVjayB0aGF0IHRoZSBsb2cgaGFzIG5vdCBiZWNvbWUgZmlsbGVkXG4gICAgICAgIGlmIChuZXh0TWVzc2FnZS55ICsgbmV4dE1lc3NhZ2UuaGVpZ2h0ID4gbG9nLmhlaWdodCkge1xuICAgICAgICAgICAgbG9nLnByaW1hcnlBeGlzQWxpZ25JdGVtcyA9IFwiTUFYXCI7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vfn5+VVRJTElUSUVTfn5+Ly9cbi8vfn5GdW5jdGlvbiB0byBzYWZlbHkgY2hhbmNlIHRleHQgb24gVGV4dE5vZGVzLn5+Ly9cbmZ1bmN0aW9uIHNldFRleHQobm9kZSwgdGV4dCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHlpZWxkIGZpZ21hLmxvYWRGb250QXN5bmMobm9kZS5mb250TmFtZSk7XG4gICAgICAgIG5vZGUuY2hhcmFjdGVycyA9IHRleHQ7XG4gICAgfSk7XG59XG4vL35+RnVuY3Rpb24gdG8gY2xvbmUgZmlsbHMsIGV0Yy4gc28gdGhleSBjYW4gYmUgc2V0Ln5+Ly9cbmZ1bmN0aW9uIGNsb25lKHZhbCkge1xuICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgPT09ICd1bmRlZmluZWQnIHx8IHR5cGUgPT09ICdudW1iZXInIHx8XG4gICAgICAgIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGUgPT09ICdib29sZWFuJykge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAodmFsIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWwubWFwKHggPT4gY2xvbmUoeCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheSh2YWwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IG8gPSB7fTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHZhbCkge1xuICAgICAgICAgICAgICAgIG9ba2V5XSA9IGNsb25lKHZhbFtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRocm93ICd1bmtub3duJztcbn1cbmZ1bmN0aW9uIHJlcXVlc3RSZXNwb25zZShtZXNzYWdlVGV4dCkge1xuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogJ25ldHdvcmtSZXF1ZXN0JywgbWVzc2FnZTogbWVzc2FnZVRleHQgfSk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9