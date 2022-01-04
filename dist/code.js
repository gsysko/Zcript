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
        //Set the author label, if it is an inbound message
        let label = nextMessage.findOne(node => node.type === "TEXT" && node.name == "Label");
        yield figma.loadFontAsync(label.fontName).then(() => {
            label.characters = "Marilyn Collins";
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0EsMkJBQTJCLCtEQUErRCxnQkFBZ0IsRUFBRSxFQUFFO0FBQzlHO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLHFGQUFxRjtBQUNwSDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLFVBQVU7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxXQUFXO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFdBQVc7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiwrQ0FBK0M7QUFDekUiLCJmaWxlIjoiY29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2NvZGUudHNcIik7XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBtZXNzYWdlQ291bnQgPSAwO1xudmFyIGxvZztcbi8vIFRoaXMgcGx1Z2luIHdpbGwgb3BlbiBhIHdpbmRvdyB0byBwcm9tcHQgdGhlIHVzZXIgdG8gZW50ZXIgYSBtZXNzYWdlLCBhbmRcbi8vIGl0IHdpbGwgdGhlbiBjcmVhdGUgYSBtZXNzYWdlIHN5bWJvbCB3aXRoIHRoYXQgdGV4dCBvbiBzY3JlZW4uXG4vLyBUaGlzIGZpbGUgaG9sZHMgdGhlIG1haW4gY29kZSBmb3IgdGhlIHBsdWdpbnMuIEl0IGhhcyBhY2Nlc3MgdG8gdGhlICpkb2N1bWVudCouXG4vLyBZb3UgY2FuIGFjY2VzcyBicm93c2VyIEFQSXMgaW4gdGhlIDxzY3JpcHQ+IHRhZyBpbnNpZGUgXCJ1aS5odG1sXCIgd2hpY2ggaGFzIGFcbi8vIGZ1bGwgYnJvd3NlciBlbnZpcm9ubWVudCAoc2VlIGRvY3VtZW50YXRpb24pLlxuLy8gVGhpcyBzaG93cyB0aGUgSFRNTCBwYWdlIGluIFwidWkuaHRtbFwiLlxuZmlnbWEuc2hvd1VJKF9faHRtbF9fKTtcbmZpZ21hLnVpLnJlc2l6ZSgzNjAsIDcyKTtcbi8vU2VjcmV0IGJvb3RzdHJhcCBwb2ludCBzZXR0ZXIgLS0gY29tbW1lbnQgb3V0IHdoZW4gbm90IGluIHVzZS5cbi8vIGxldCBsYXVuY2hlciA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbi5maW5kKG5vZGUgPT4gKG5vZGUudHlwZSA9PSBcIkNPTVBPTkVOVFwiIHx8IG5vZGUudHlwZSA9PSBcIklOU1RBTkNFXCIpICYmIG5vZGUucGFyZW50Lm5hbWUgPT0gXCJMYXVuY2hlclwiKVxuLy8gaWYgKGxhdW5jaGVyKXtcbi8vICAgbGF1bmNoZXIuc2V0UmVsYXVuY2hEYXRhKHtzdGFydDogXCJcIn0pXG4vLyAgIGZpZ21hLmNsb3NlUGx1Z2luKClcbi8vIH1cbi8vIENhbGxzIHRvIFwicGFyZW50LnBvc3RNZXNzYWdlXCIgZnJvbSB3aXRoaW4gdGhlIEhUTUwgcGFnZSB3aWxsIHRyaWdnZXIgdGhpc1xuLy8gY2FsbGJhY2suIFRoZSBjYWxsYmFjayB3aWxsIGJlIHBhc3NlZCB0aGUgXCJwbHVnaW5NZXNzYWdlXCIgcHJvcGVydHkgb2YgdGhlXG4vLyBwb3N0ZWQgbWVzc2FnZS5cbmZpZ21hLnVpLm9ubWVzc2FnZSA9IChtc2cpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAvL0xvb2sgZm9yIGEgXCJXaWRnZXRcIiBvciBhIFwiTWVzc2VuZ2VyXCIgaW4gdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG4gICAgbGV0IHdpZGdldCA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbi5maW5kKG5vZGUgPT4gbm9kZS50eXBlID09PSBcIkZSQU1FXCIgJiYgbm9kZS5uYW1lID09IFwiV2lkZ2V0XCIpO1xuICAgIGxldCBtZXNzZW5nZXIgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24uZmluZChub2RlID0+IG5vZGUudHlwZSA9PT0gXCJGUkFNRVwiICYmIG5vZGUubmFtZSA9PSBcIk1lc3NlbmdlclwiKTtcbiAgICAvLyBUaGVuIGxvb2sgZm9yIGEgY2hpbGQgJ0xvZycgZnJhbWUuLi5cbiAgICBpZiAod2lkZ2V0KSB7XG4gICAgICAgIGxvZyA9IHdpZGdldC5maW5kT25lKG5vZGUgPT4gbm9kZS50eXBlID09PSBcIkZSQU1FXCIgJiYgbm9kZS5uYW1lID09IFwiTG9nXCIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChtZXNzZW5nZXIpIHtcbiAgICAgICAgbG9nID0gbWVzc2VuZ2VyLmZpbmRPbmUobm9kZSA9PiBub2RlLnR5cGUgPT09IFwiRlJBTUVcIiAmJiBub2RlLm5hbWUgPT0gXCJMb2dcIik7XG4gICAgfVxuICAgIC8vIE9uZSB3YXkgb2YgZGlzdGluZ3Vpc2hpbmcgYmV0d2VlbiBkaWZmZXJlbnQgdHlwZXMgb2YgbWVzc2FnZXMgc2VudCBmcm9tXG4gICAgLy8geW91ciBIVE1MIHBhZ2UgaXMgdG8gdXNlIGFuIG9iamVjdCB3aXRoIGEgXCJ0eXBlXCIgcHJvcGVydHkgbGlrZSB0aGlzLi4uXG4gICAgaWYgKG1zZy50eXBlID09PSAnc2VuZC1tZXNzYWdlJykge1xuICAgICAgICB5aWVsZCBzZW5kTWVzc2FnZShtc2cubWVzc2FnZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG1zZy50eXBlID09PSAncmVjZWl2ZS1tZXNzYWdlJykge1xuICAgICAgICB5aWVsZCByZWNlaXZlUmVzcG9uc2UobXNnLm1lc3NhZ2UuY2hvaWNlc1swXS50ZXh0KTtcbiAgICB9XG4gICAgZWxzZSBpZiAobXNnLnR5cGUgPT09ICdzZXR1cCcpIHtcbiAgICAgICAgLy9JZiB0aGVyZSBpcyBub3QgYSBjb252ZXJzYXRpb24uLi5cbiAgICAgICAgeWllbGQgc2V0VXAoKTtcbiAgICB9XG59KTtcbi8vfn5GdW5jdGlvbiB0byBzZXQgdXAgYSBuZXcgY29udmVyc2F0aW9ufn4vL1xuZnVuY3Rpb24gc2V0VXAoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgaWYgKCFsb2cpIHtcbiAgICAgICAgICAgIC8vRmluZCBsYXN0IHdpZGdldC4uLlxuICAgICAgICAgICAgbGV0IG90aGVyV2lkZ2V0cyA9IGZpZ21hLmN1cnJlbnRQYWdlLmZpbmRBbGwobm9kZSA9PiBub2RlLm5hbWUgPT0gXCJXaWRnZXRcIik7XG4gICAgICAgICAgICAvL01ha2UgdGhlIGNvbnRhaW5lclxuICAgICAgICAgICAgbGV0IHdpZGdldCA9IGZpZ21hLmNyZWF0ZUZyYW1lKCk7XG4gICAgICAgICAgICB3aWRnZXQuc2V0UmVsYXVuY2hEYXRhKHsgb3BlbjogXCJcIiB9KTtcbiAgICAgICAgICAgIHdpZGdldC5uYW1lID0gXCJXaWRnZXRcIjtcbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGFyZSBvdGhlciBjb250YWluZXJzLCBvZmZzZXQgaXQgdG8gdGhlIHJpZ2h0IG9mIHRoZSBsYXN0IG9uZS5cbiAgICAgICAgICAgIGlmIChvdGhlcldpZGdldHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHdpZGdldC54ID0gb3RoZXJXaWRnZXRzW290aGVyV2lkZ2V0cy5sZW5ndGggLSAxXS54ICsgNDgwO1xuICAgICAgICAgICAgICAgIHdpZGdldC55ID0gb3RoZXJXaWRnZXRzW290aGVyV2lkZ2V0cy5sZW5ndGggLSAxXS55O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgd2lkZ2V0LnggPSBmaWdtYS52aWV3cG9ydC5jZW50ZXIueCAtIDE5MDtcbiAgICAgICAgICAgICAgICB3aWRnZXQueSA9IGZpZ21hLnZpZXdwb3J0LmNlbnRlci55IC0gMzkwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2lkZ2V0LnJlc2l6ZSgzODAsIDc4MCk7XG4gICAgICAgICAgICB3aWRnZXQuY2xpcHNDb250ZW50ID0gZmFsc2U7XG4gICAgICAgICAgICB3aWRnZXQuZmlsbHMgPSBbXTtcbiAgICAgICAgICAgIHdpZGdldC5sYXlvdXRNb2RlID0gXCJWRVJUSUNBTFwiO1xuICAgICAgICAgICAgd2lkZ2V0LnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9IFwiQVVUT1wiO1xuICAgICAgICAgICAgd2lkZ2V0LmNvdW50ZXJBeGlzQWxpZ25JdGVtcyA9IFwiTUFYXCI7XG4gICAgICAgICAgICB3aWRnZXQuaXRlbVNwYWNpbmcgPSA4O1xuICAgICAgICAgICAgLy9NYWtlIHRoZSBtZXNzZW5nZXJcbiAgICAgICAgICAgIGxldCBtZXNzZW5nZXIgPSBmaWdtYS5jcmVhdGVGcmFtZSgpO1xuICAgICAgICAgICAgbWVzc2VuZ2VyLnNldFJlbGF1bmNoRGF0YSh7IG9wZW46IFwiXCIgfSk7XG4gICAgICAgICAgICBtZXNzZW5nZXIubmFtZSA9IFwiTWVzc2VuZ2VyXCI7XG4gICAgICAgICAgICBtZXNzZW5nZXIucmVzaXplKDM4MCwgNzAwKTtcbiAgICAgICAgICAgIG1lc3Nlbmdlci5sYXlvdXRNb2RlID0gXCJWRVJUSUNBTFwiO1xuICAgICAgICAgICAgbWVzc2VuZ2VyLnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9IFwiRklYRURcIjtcbiAgICAgICAgICAgIGxldCBiYWNrZ3JvdW5kU3R5bGUgPSB5aWVsZCBmaWdtYS5pbXBvcnRTdHlsZUJ5S2V5QXN5bmMoXCJlOTQzNzBlZjdiM2E2NDVlOTNiZDI5ZGE5NGRjNjdhZDZiNmVjNTJlXCIpLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICBmaWdtYS5ub3RpZnkoXCJaY3JpcHRlciByZXF1aXJlcyB0aGUgJ1plbmRlc2sgVGhlbWUgKERlZmF1bHQpJyBsaWJyYXJ5LlwiKTtcbiAgICAgICAgICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtZXNzZW5nZXIuZmlsbFN0eWxlSWQgPSBiYWNrZ3JvdW5kU3R5bGUuaWQ7XG4gICAgICAgICAgICBsZXQgYmFja2dyb3VuZEVmZmVjdCA9IHlpZWxkIGZpZ21hLmltcG9ydFN0eWxlQnlLZXlBc3luYyhcIjIwYjA0MDVhZDcwMjRhMjBhZDg3OGI5MGIzYjc1YmQ1YmIyNjQ0M2FcIikuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgIGZpZ21hLm5vdGlmeShcIlpjcmlwdGVyIHJlcXVpcmVzIHRoZSAnR2FyZGVuJyBsaWJyYXJ5LlwiKTtcbiAgICAgICAgICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtZXNzZW5nZXIuZWZmZWN0U3R5bGVJZCA9IGJhY2tncm91bmRFZmZlY3QuaWQ7XG4gICAgICAgICAgICB3aWRnZXQuYXBwZW5kQ2hpbGQobWVzc2VuZ2VyKTtcbiAgICAgICAgICAgIC8vTWFrZSB0aGUgbGF1bmNoZXJcbiAgICAgICAgICAgIGxldCBsYXVuY2hlcjtcbiAgICAgICAgICAgIGlmIChmaWdtYS5jb21tYW5kID09IFwic3RhcnRcIikge1xuICAgICAgICAgICAgICAgIGxhdW5jaGVyID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uLmZpbmQobm9kZSA9PiBub2RlLnR5cGUgPT0gXCJJTlNUQU5DRVwiICYmIG5vZGUubmFtZSA9PSBcIkxhdW5jaGVyXCIpO1xuICAgICAgICAgICAgICAgIHdpZGdldC54ID0gbGF1bmNoZXIueCAtIDMwODtcbiAgICAgICAgICAgICAgICB3aWRnZXQueSA9IGxhdW5jaGVyLnkgLSA3MDg7XG4gICAgICAgICAgICAgICAgbGF1bmNoZXIuc3dhcENvbXBvbmVudCh5aWVsZCBmaWdtYS5pbXBvcnRDb21wb25lbnRCeUtleUFzeW5jKFwiYzVmMmM3Yjg0MTdiODY2MjlhOGU1MmFhMzdlYmUyYzA2NWEyYzZkZVwiKSk7XG4gICAgICAgICAgICAgICAgbGF1bmNoZXIucGFyZW50LmFwcGVuZENoaWxkKHdpZGdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsYXVuY2hlciA9ICh5aWVsZCBmaWdtYS5pbXBvcnRDb21wb25lbnRCeUtleUFzeW5jKFwiYzVmMmM3Yjg0MTdiODY2MjlhOGU1MmFhMzdlYmUyYzA2NWEyYzZkZVwiKSkuY3JlYXRlSW5zdGFuY2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhdW5jaGVyLnNldFJlbGF1bmNoRGF0YSh7fSk7XG4gICAgICAgICAgICB3aWRnZXQuYXBwZW5kQ2hpbGQobGF1bmNoZXIpO1xuICAgICAgICAgICAgLy9NYWtlIHRoZSBoZWFkZXJcbiAgICAgICAgICAgIGxldCBoZWFkZXIgPSAoeWllbGQgZmlnbWEuaW1wb3J0Q29tcG9uZW50QnlLZXlBc3luYyhcImRhODU3NzhmYTNlM2Y1NDQ4NWZjZWRmZTFiZjI0NzZmODUxZjJmNDFcIikpLmNyZWF0ZUluc3RhbmNlKCk7XG4gICAgICAgICAgICBtZXNzZW5nZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICAgICAgICAgIGxldCB0aXRsZSA9IGhlYWRlci5maW5kQ2hpbGQobm9kZSA9PiBub2RlLm5hbWUgPT0gXCJUaXRsZVwiKTtcbiAgICAgICAgICAgIHlpZWxkIGZpZ21hLmxvYWRGb250QXN5bmModGl0bGUuZm9udE5hbWUpLnRoZW4oKTtcbiAgICAgICAgICAgIHRpdGxlLmNoYXJhY3RlcnMgPSBcIlplbmRlc2tcIjtcbiAgICAgICAgICAgIGhlYWRlci5sYXlvdXRBbGlnbiA9IFwiU1RSRVRDSFwiO1xuICAgICAgICAgICAgLy9NYWtlIGEgbG9nIGZyYW1lXG4gICAgICAgICAgICBsb2cgPSBmaWdtYS5jcmVhdGVGcmFtZSgpO1xuICAgICAgICAgICAgbG9nLm5hbWUgPSBcIkxvZ1wiO1xuICAgICAgICAgICAgbG9nLnJlc2l6ZSgzODAsIDEpO1xuICAgICAgICAgICAgbG9nLmxheW91dE1vZGUgPSBcIlZFUlRJQ0FMXCI7XG4gICAgICAgICAgICBsb2cubGF5b3V0R3JvdyA9IDE7XG4gICAgICAgICAgICBsb2cubGF5b3V0QWxpZ24gPSBcIlNUUkVUQ0hcIjtcbiAgICAgICAgICAgIGxvZy5vdmVyZmxvd0RpcmVjdGlvbiA9IFwiVkVSVElDQUxcIjtcbiAgICAgICAgICAgIGxvZy5maWxscyA9IFtdO1xuICAgICAgICAgICAgbWVzc2VuZ2VyLmFwcGVuZENoaWxkKGxvZyk7XG4gICAgICAgICAgICAvL01ha2UgdGhlIGNvbXBvc2VyXG4gICAgICAgICAgICBsZXQgY29tcG9zZXIgPSAoeWllbGQgZmlnbWEuaW1wb3J0Q29tcG9uZW50QnlLZXlBc3luYyhcIjBjZGVhZWMwYzViYWYyMTZiNmM3NGQxYTkzOWE5Yzk0ZTAyNWYxZGZcIikpLmNyZWF0ZUluc3RhbmNlKCk7XG4gICAgICAgICAgICBjb21wb3Nlci5sYXlvdXRBbGlnbiA9IFwiU1RSRVRDSFwiO1xuICAgICAgICAgICAgbWVzc2VuZ2VyLmFwcGVuZENoaWxkKGNvbXBvc2VyKTtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVzID0gW107XG4gICAgICAgICAgICBub2Rlcy5wdXNoKHdpZGdldCk7XG4gICAgICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBub2RlcztcbiAgICAgICAgICAgIGZpZ21hLnZpZXdwb3J0LnNjcm9sbEFuZFpvb21JbnRvVmlldyhub2Rlcyk7XG4gICAgICAgIH1cbiAgICAgICAgLy9Ob3cgdGhhdCB3ZSBhcmUgc3VyZSB0aGVyZSBpcyBhIGNvbnZlcnNhdGlvbiwgY2hlY2sgaWYgdGhlcmUgaXMgYW55IG1lc3NhZ2VzLlxuICAgICAgICB2YXIgZmlyc3RNZXNzYWdlID0gbG9nLmZpbmRDaGlsZChub2RlID0+IG5vZGUubmFtZSA9PSBcIjBcIiAmJiBub2RlLnR5cGUgPT09IFwiSU5TVEFOQ0VcIik7XG4gICAgICAgIC8vSWYgdGhlcmUgaXMgbm8gZmlyc3QgbWVzc2FnZS4uLlxuICAgICAgICBpZiAoIWZpcnN0TWVzc2FnZSkge1xuICAgICAgICAgICAgLy9DcmVhdGUgYSBmaXJzdCB0aW1lc3RhbXAgbWVzc3NhZ2UuLi5cbiAgICAgICAgICAgIHlpZWxkIGZpZ21hLmltcG9ydENvbXBvbmVudEJ5S2V5QXN5bmMoXCI2NjNiMDZiZmU5MjdjZjU1NzRkYzgyYzYwZTA4NGRhMmVlNWU5OWQ5XCIpLnRoZW4odGltZXN0YW1wQ29tcG9uZW50ID0+IHtcbiAgICAgICAgICAgICAgICBmaXJzdE1lc3NhZ2UgPSB0aW1lc3RhbXBDb21wb25lbnQuY3JlYXRlSW5zdGFuY2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZmlyc3RNZXNzYWdlLm5hbWUgPSBcIjBcIjtcbiAgICAgICAgICAgIG1lc3NhZ2VDb3VudCA9IDA7XG4gICAgICAgICAgICBmaXJzdE1lc3NhZ2UubGF5b3V0QWxpZ24gPSBcIlNUUkVUQ0hcIjtcbiAgICAgICAgICAgIGxldCB0aW1lc3RhbXAgPSBmaXJzdE1lc3NhZ2UuZmluZENoaWxkKG5vZGUgPT4gbm9kZS50eXBlID09IFwiVEVYVFwiICYmIG5vZGUubmFtZS5pbmNsdWRlcyhcIlRpbWVzdGFtcFwiKSk7XG4gICAgICAgICAgICBsZXQgZCA9IG5ldyBEYXRlKERhdGUubm93KCkpO1xuICAgICAgICAgICAgY29uc3QgbW9udGhzID0gWydKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ107XG4gICAgICAgICAgICBsZXQgbG9jRGF0ZSA9IG1vbnRoc1tkLmdldE1vbnRoKCldICsgXCIgXCIgKyBkLmdldERhdGUoKSArIFwiLCBcIiArIChkLmdldEhvdXJzKCkgPiAxMiA/IGQuZ2V0SG91cnMoKSAlIDEyIDogZC5nZXRIb3VycygpKSArIFwiOlwiICsgKFwiMFwiICsgZC5nZXRNaW51dGVzKCkpLnNsaWNlKC0yKSArIFwiIFwiICsgKGQuZ2V0SG91cnMoKSAvIDEyIDwgMSA/IFwiQU1cIiA6IFwiUE1cIik7XG4gICAgICAgICAgICBzZXRUZXh0KHRpbWVzdGFtcCwgbG9jRGF0ZSk7XG4gICAgICAgICAgICBsb2cuaW5zZXJ0Q2hpbGQoMCwgZmlyc3RNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy9+fkZ1bmN0aW9uIHRvIHNlbmQgYSBtZXNzYWdlfn4vL1xuZnVuY3Rpb24gc2VuZE1lc3NhZ2UobWVzc2FnZVRleHQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBsZXQgcG9zaXRpb25Jbkdyb3VwO1xuICAgICAgICAvL0ZpbmQgdGhlIGxhc3QgbWVzc2FnZSBpbiB0aGUgY29udmVyc2F0aW9uIGZyYW1lLi4uXG4gICAgICAgIGxldCBsYXN0TWVzc2FnZSA9IGxvZy5jaGlsZHJlbltsb2cuY2hpbGRyZW4ubGVuZ3RoIC0gMV07XG4gICAgICAgIC8vLi5hbmQgU2V0IHRoZSBtZXNzYWdlQ291bnQgdG8gdGhlIG51bWJlcmVkIG5hbWUgb2YgdGhpcyBtZXNzYWdlXG4gICAgICAgIG1lc3NhZ2VDb3VudCA9IHBhcnNlSW50KGxhc3RNZXNzYWdlLm5hbWUpO1xuICAgICAgICAvL0lmIHBhcnRpY2lwYW50IGhhc24ndCBjaGFuZ2VkIHNpbmNlIGxhc3QgbWVzc2FnZS4uLlxuICAgICAgICBpZiAobGFzdE1lc3NhZ2UubWFpbkNvbXBvbmVudC5uYW1lLnN0YXJ0c1dpdGgoXCJEaXJlY3Rpb249T3V0Ym91bmRcIikpIHtcbiAgICAgICAgICAgIC8vQWRkIHRvIHRoZSBleGlzdGluZyBncm91cFxuICAgICAgICAgICAgcG9zaXRpb25Jbkdyb3VwID0gbGFzdE1lc3NhZ2UuZmluZEFsbChub2RlID0+IG5vZGUubmFtZS5zdGFydHNXaXRoKFwiTWVzc2FnZSBcIikpLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChwb3NpdGlvbkluR3JvdXAgPCAzKSB7XG4gICAgICAgICAgICAgICAgLy9UT0RPIEludmVzdGlnYXRlIG1ha2luZyB0aGlzIHNjYWxhYmxlIGJleW9uZCAzIG1lc3NhZ2VzIGJ5IGFwcGVuZGluZyBhbiBuZXcgbWVzc2FnZSwgdnMgc3dhcHBpbmcgY29tcG9uZW50LlxuICAgICAgICAgICAgICAgIHZhciBuZXh0TWVzc2FnZSA9IGxhc3RNZXNzYWdlO1xuICAgICAgICAgICAgICAgIG5leHRNZXNzYWdlLnN3YXBDb21wb25lbnQobmV4dE1lc3NhZ2UubWFpbkNvbXBvbmVudC5wYXJlbnQuZmluZENoaWxkKG5vZGUgPT4gbm9kZS5uYW1lID09IG5leHRNZXNzYWdlLm1haW5Db21wb25lbnQubmFtZS5zdWJzdHIoMCwgbmV4dE1lc3NhZ2UubWFpbkNvbXBvbmVudC5uYW1lLmxlbmd0aCAtIDEpICsgKHBvc2l0aW9uSW5Hcm91cCArIDEpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbkluR3JvdXAgPSAyO1xuICAgICAgICAgICAgICAgIHZhciBuZXh0TWVzc2FnZSA9IGxhc3RNZXNzYWdlO1xuICAgICAgICAgICAgICAgIGZpZ21hLm5vdGlmeShcIkNvbnZlcnNhdGlvbiBLaXQgY3VycmVudGx5IG9ubHkgc3VwcG9ydHMgMyBjb25zZWN1dGl2ZSBtZXNzYWdlcy5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwb3NpdGlvbkluR3JvdXAgPSAwO1xuICAgICAgICAgICAgLy9DcmVhdGUgYSBuZXcgbWVzc2FnZS4uLlxuICAgICAgICAgICAgbGV0IG1lc3NhZ2VHcm91cENvbXBvbmVudDtcbiAgICAgICAgICAgIHlpZWxkIGZpZ21hLmltcG9ydENvbXBvbmVudFNldEJ5S2V5QXN5bmMoXCI5OGU4ZjJhZjVjZWYyMDUzN2RmYmZiMWRjMjk0ZjZmYzFmNjBkNDY2XCIpLnRoZW4obWVzc2FnZUdyb3VwQ29tcG9uZW50U2V0ID0+IHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlR3JvdXBDb21wb25lbnQgPSBtZXNzYWdlR3JvdXBDb21wb25lbnRTZXQuZmluZENoaWxkKGNvbXBvbmVudCA9PiBjb21wb25lbnQubmFtZSA9PT0gXCJEaXJlY3Rpb249T3V0Ym91bmQsIE1lc3NhZ2VzPTFcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBuZXh0TWVzc2FnZSA9IG1lc3NhZ2VHcm91cENvbXBvbmVudCA9PT0gbnVsbCB8fCBtZXNzYWdlR3JvdXBDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1lc3NhZ2VHcm91cENvbXBvbmVudC5jcmVhdGVJbnN0YW5jZSgpO1xuICAgICAgICAgICAgbmV4dE1lc3NhZ2UubGF5b3V0QWxpZ24gPSBcIlNUUkVUQ0hcIjtcbiAgICAgICAgICAgIG5leHRNZXNzYWdlLm5hbWUgPSAoKyttZXNzYWdlQ291bnQpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAvL1R1cm4gb2ZmIHJlY2VpcHRzIG9uIHByZXZpb3VzIG1lc3NhZ2UsIGlmIHRoZXJlIGlzIG9uZVxuICAgICAgICAgICAgbGV0IHJlY2VpcHQgPSBsYXN0TWVzc2FnZS5maW5kT25lKG5vZGUgPT4gbm9kZS5uYW1lID09IFwiUmVjZWlwdFwiKTtcbiAgICAgICAgICAgIGlmIChyZWNlaXB0KVxuICAgICAgICAgICAgICAgIHJlY2VpcHQudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgLy9JbnNlcnQgdGhlIG5ldyBtZXNzYWdlLlxuICAgICAgICAgICAgbG9nLmluc2VydENoaWxkKG1lc3NhZ2VDb3VudCwgbmV4dE1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIC8vU2V0IHRoZSBtZXNzYWdlIHRleHRcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBuZXh0TWVzc2FnZS5maW5kQWxsKG5vZGUgPT4gbm9kZS50eXBlID09PSBcIlRFWFRcIiAmJiBub2RlLm5hbWUgPT0gXCJUZXh0XCIpW3Bvc2l0aW9uSW5Hcm91cF07XG4gICAgICAgIHlpZWxkIGZpZ21hLmxvYWRGb250QXN5bmMobWVzc2FnZS5mb250TmFtZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBtZXNzYWdlLmNoYXJhY3RlcnMgPSBtZXNzYWdlVGV4dDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vQ2hlY2t0IHRoYXQgdGhlIG1lc3NhZ2Ugc2hvdWxkIG5vdCBiZSBtdWx0aS1saW5lXG4gICAgICAgIC8vVE9ETyBjb21wYXJlIHNpemUgb2YgbG9nIHdpZHRoLCBzbyB0aGlzIHdvdWxkIHN0aWxsIHdvcmsgbm8gbWF0dGVyIHRoZSBkZXZpY2Ugd2lkdGhcbiAgICAgICAgaWYgKG1lc3NhZ2Uud2lkdGggPiAyNjApIHtcbiAgICAgICAgICAgIGxldCBtZXNzYWdlQ29tcG9uZW50ID0gbmV4dE1lc3NhZ2UuZmluZEFsbChub2RlID0+IG5vZGUubmFtZS5zdGFydHNXaXRoKFwiTWVzc2FnZSBcIikpW3Bvc2l0aW9uSW5Hcm91cF07XG4gICAgICAgICAgICBsZXQgbWVzc2FnZUNvbXBvbmVudFNldCA9IG1lc3NhZ2VDb21wb25lbnQubWFpbkNvbXBvbmVudC5wYXJlbnQ7XG4gICAgICAgICAgICBtZXNzYWdlQ29tcG9uZW50LnN3YXBDb21wb25lbnQobWVzc2FnZUNvbXBvbmVudFNldC5jaGlsZHJlblswXSk7XG4gICAgICAgIH1cbiAgICAgICAgLy9DaGVjayB0aGF0IHRoZSBsb2cgaGFzIG5vdCBiZWNvbWUgZmlsbGVkXG4gICAgICAgIGlmIChuZXh0TWVzc2FnZS55ICsgbmV4dE1lc3NhZ2UuaGVpZ2h0ID4gbG9nLmhlaWdodCkge1xuICAgICAgICAgICAgbG9nLnByaW1hcnlBeGlzQWxpZ25JdGVtcyA9IFwiTUFYXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmVxdWVzdFJlc3BvbnNlKG1lc3NhZ2VUZXh0KTtcbiAgICB9KTtcbn1cbi8vfn5GdW5jdGlvbiB0byByZWNlaXZlIGEgbWVzc2FnZX5+Ly9cbmZ1bmN0aW9uIHJlY2VpdmVSZXNwb25zZShtZXNzYWdlVGV4dCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGxldCBwb3NpdGlvbkluR3JvdXA7XG4gICAgICAgIC8vRmluZCB0aGUgbGFzdCBtZXNzYWdlIGluIHRoZSBjb252ZXJzYXRpb24gZnJhbWUuLi5cbiAgICAgICAgbGV0IGxhc3RNZXNzYWdlID0gbG9nLmNoaWxkcmVuW2xvZy5jaGlsZHJlbi5sZW5ndGggLSAxXTtcbiAgICAgICAgLy8uLmFuZCBTZXQgdGhlIG1lc3NhZ2VDb3VudCB0byB0aGUgbnVtYmVyZWQgbmFtZSBvZiB0aGlzIG1lc3NhZ2VcbiAgICAgICAgbWVzc2FnZUNvdW50ID0gcGFyc2VJbnQobGFzdE1lc3NhZ2UubmFtZSk7XG4gICAgICAgIC8vSWYgcGFydGljaXBhbnQgaGFzbid0IGNoYW5nZWQgc2luY2UgbGFzdCBtZXNzYWdlLi4uXG4gICAgICAgIHBvc2l0aW9uSW5Hcm91cCA9IDA7XG4gICAgICAgIC8vQ3JlYXRlIGEgbmV3IG1lc3NhZ2UuLi5cbiAgICAgICAgbGV0IG1lc3NhZ2VHcm91cENvbXBvbmVudDtcbiAgICAgICAgeWllbGQgZmlnbWEuaW1wb3J0Q29tcG9uZW50U2V0QnlLZXlBc3luYyhcIjk4ZThmMmFmNWNlZjIwNTM3ZGZiZmIxZGMyOTRmNmZjMWY2MGQ0NjZcIikudGhlbihtZXNzYWdlR3JvdXBDb21wb25lbnRTZXQgPT4ge1xuICAgICAgICAgICAgbWVzc2FnZUdyb3VwQ29tcG9uZW50ID0gbWVzc2FnZUdyb3VwQ29tcG9uZW50U2V0LmZpbmRDaGlsZChjb21wb25lbnQgPT4gY29tcG9uZW50Lm5hbWUgPT09IFwiRGlyZWN0aW9uPUluYm91bmQsIE1lc3NhZ2VzPTFcIik7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgbmV4dE1lc3NhZ2UgPSBtZXNzYWdlR3JvdXBDb21wb25lbnQgPT09IG51bGwgfHwgbWVzc2FnZUdyb3VwQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtZXNzYWdlR3JvdXBDb21wb25lbnQuY3JlYXRlSW5zdGFuY2UoKTtcbiAgICAgICAgbmV4dE1lc3NhZ2UubGF5b3V0QWxpZ24gPSBcIlNUUkVUQ0hcIjtcbiAgICAgICAgbmV4dE1lc3NhZ2UubmFtZSA9ICgrK21lc3NhZ2VDb3VudCkudG9TdHJpbmcoKTtcbiAgICAgICAgLy9UdXJuIG9mZiByZWNlaXB0cyBvbiBwcmV2aW91cyBtZXNzYWdlLCBpZiB0aGVyZSBpcyBvbmVcbiAgICAgICAgbGV0IHJlY2VpcHQgPSBsYXN0TWVzc2FnZS5maW5kT25lKG5vZGUgPT4gbm9kZS5uYW1lID09IFwiUmVjZWlwdFwiKTtcbiAgICAgICAgaWYgKHJlY2VpcHQpXG4gICAgICAgICAgICByZWNlaXB0LnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgLy9JbnNlcnQgdGhlIG5ldyBtZXNzYWdlLlxuICAgICAgICBsb2cuaW5zZXJ0Q2hpbGQobWVzc2FnZUNvdW50LCBuZXh0TWVzc2FnZSk7XG4gICAgICAgIC8vU2V0IHRoZSBhdXRob3IgbGFiZWwsIGlmIGl0IGlzIGFuIGluYm91bmQgbWVzc2FnZVxuICAgICAgICBsZXQgbGFiZWwgPSBuZXh0TWVzc2FnZS5maW5kT25lKG5vZGUgPT4gbm9kZS50eXBlID09PSBcIlRFWFRcIiAmJiBub2RlLm5hbWUgPT0gXCJMYWJlbFwiKTtcbiAgICAgICAgeWllbGQgZmlnbWEubG9hZEZvbnRBc3luYyhsYWJlbC5mb250TmFtZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBsYWJlbC5jaGFyYWN0ZXJzID0gXCJNYXJpbHluIENvbGxpbnNcIjtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vU2V0IHRoZSBtZXNzYWdlIHRleHRcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBuZXh0TWVzc2FnZS5maW5kQWxsKG5vZGUgPT4gbm9kZS50eXBlID09PSBcIlRFWFRcIiAmJiBub2RlLm5hbWUgPT0gXCJUZXh0XCIpW3Bvc2l0aW9uSW5Hcm91cF07XG4gICAgICAgIHlpZWxkIGZpZ21hLmxvYWRGb250QXN5bmMobWVzc2FnZS5mb250TmFtZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBtZXNzYWdlLmNoYXJhY3RlcnMgPSBtZXNzYWdlVGV4dDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vQ2hlY2t0IHRoYXQgdGhlIG1lc3NhZ2Ugc2hvdWxkIG5vdCBiZSBtdWx0aS1saW5lXG4gICAgICAgIC8vVE9ETyBjb21wYXJlIHNpemUgb2YgbG9nIHdpZHRoLCBzbyB0aGlzIHdvdWxkIHN0aWxsIHdvcmsgbm8gbWF0dGVyIHRoZSBkZXZpY2Ugd2lkdGhcbiAgICAgICAgaWYgKG1lc3NhZ2Uud2lkdGggPiAyNDApIHtcbiAgICAgICAgICAgIGxldCBtZXNzYWdlQ29tcG9uZW50ID0gbmV4dE1lc3NhZ2UuZmluZEFsbChub2RlID0+IG5vZGUubmFtZS5zdGFydHNXaXRoKFwiTWVzc2FnZSBcIikpW3Bvc2l0aW9uSW5Hcm91cF07XG4gICAgICAgICAgICBsZXQgbWVzc2FnZUNvbXBvbmVudFNldCA9IG1lc3NhZ2VDb21wb25lbnQubWFpbkNvbXBvbmVudC5wYXJlbnQ7XG4gICAgICAgICAgICBtZXNzYWdlQ29tcG9uZW50LnN3YXBDb21wb25lbnQobWVzc2FnZUNvbXBvbmVudFNldC5jaGlsZHJlblswXSk7XG4gICAgICAgIH1cbiAgICAgICAgLy9DaGVjayB0aGF0IHRoZSBsb2cgaGFzIG5vdCBiZWNvbWUgZmlsbGVkXG4gICAgICAgIGlmIChuZXh0TWVzc2FnZS55ICsgbmV4dE1lc3NhZ2UuaGVpZ2h0ID4gbG9nLmhlaWdodCkge1xuICAgICAgICAgICAgbG9nLnByaW1hcnlBeGlzQWxpZ25JdGVtcyA9IFwiTUFYXCI7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vfn5+VVRJTElUSUVTfn5+Ly9cbi8vfn5GdW5jdGlvbiB0byBzYWZlbHkgY2hhbmNlIHRleHQgb24gVGV4dE5vZGVzLn5+Ly9cbmZ1bmN0aW9uIHNldFRleHQobm9kZSwgdGV4dCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHlpZWxkIGZpZ21hLmxvYWRGb250QXN5bmMobm9kZS5mb250TmFtZSk7XG4gICAgICAgIG5vZGUuY2hhcmFjdGVycyA9IHRleHQ7XG4gICAgfSk7XG59XG4vL35+RnVuY3Rpb24gdG8gY2xvbmUgZmlsbHMsIGV0Yy4gc28gdGhleSBjYW4gYmUgc2V0Ln5+Ly9cbmZ1bmN0aW9uIGNsb25lKHZhbCkge1xuICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgPT09ICd1bmRlZmluZWQnIHx8IHR5cGUgPT09ICdudW1iZXInIHx8XG4gICAgICAgIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGUgPT09ICdib29sZWFuJykge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAodmFsIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWwubWFwKHggPT4gY2xvbmUoeCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheSh2YWwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IG8gPSB7fTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHZhbCkge1xuICAgICAgICAgICAgICAgIG9ba2V5XSA9IGNsb25lKHZhbFtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRocm93ICd1bmtub3duJztcbn1cbmZ1bmN0aW9uIHJlcXVlc3RSZXNwb25zZShtZXNzYWdlVGV4dCkge1xuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogJ25ldHdvcmtSZXF1ZXN0JywgbWVzc2FnZTogbWVzc2FnZVRleHQgfSk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9