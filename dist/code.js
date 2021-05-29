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
figma.ui.resize(400, 48);
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
    if (msg.type === 'create-message') {
        yield sendMessage(msg.message, msg.direction);
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
            if (otherWidgets.length > 0)
                widget.x = otherWidgets[otherWidgets.length - 1].x + 480;
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
            let backgroundStyle = yield figma.importStyleByKeyAsync("8a51f0a179f0ad6d5af3e3329681bcd33e0f748c").catch(() => {
                figma.notify("Zcripter requires the '00 Zendesk Theme - Light (Default)' library.");
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
            let launcher = (yield figma.importComponentByKeyAsync("c5f2c7b8417b86629a8e52aa37ebe2c065a2c6de")).createInstance();
            widget.appendChild(launcher);
            //Make the header
            let header = (yield figma.importComponentByKeyAsync("da85778fa3e3f54485fcedfe1bf2476f851f2f41")).createInstance();
            let title = header.findChild(node => node.name == "✏️Title");
            yield figma.loadFontAsync(title.fontName);
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
            let composer = (yield figma.importComponentByKeyAsync("0cdeaec0c5baf216b6c74d1a939a9c94e025f1df")).createInstance();
            composer.layoutAlign = "STRETCH";
            messenger.appendChild(composer);
            figma.currentPage.appendChild(widget);
            const nodes = [];
            nodes.push(widget);
            figma.currentPage.selection = nodes;
            figma.viewport.scrollAndZoomIntoView(nodes);
        }
        //Now that we are sure there is a conversation, check if there is any messages.
        var firstMessage = log.findChild(node => node.name == "0" && node.type === "INSTANCE");
        //If there is no first message...
        if (!firstMessage) {
            //Create a first welcome messsage...
            yield figma.importComponentByKeyAsync("663b06bfe927cf5574dc82c60e084da2ee5e99d9").then(timestampComponent => {
                firstMessage = timestampComponent.createInstance();
            });
            firstMessage.name = "0";
            messageCount = 0;
            firstMessage.layoutAlign = "STRETCH";
            //TODO set text to todays date
            log.insertChild(0, firstMessage);
        }
    });
}
//~~Function to send a message~~//
function sendMessage(messageText, directionIsOutbound) {
    return __awaiter(this, void 0, void 0, function* () {
        let positionInGroup;
        //Find the last message in the conversation frame...
        let lastMessage = log.children[log.children.length - 1];
        //..and Set the messageCount to the numbered name of this message
        messageCount = parseInt(lastMessage.name);
        //If participant has changed since last message...
        //TODO need to properly account for first message - incorrectly registers as false if first message is inbound!
        if (directionIsOutbound != lastMessage.mainComponent.name.startsWith("Direction=Outbound")) {
            positionInGroup = 0;
            //Create a new message...
            let messageGroupComponent;
            yield figma.importComponentSetByKeyAsync("98e8f2af5cef20537dfbfb1dc294f6fc1f60d466").then(messageGroupComponentSet => {
                messageGroupComponent = directionIsOutbound ? messageGroupComponentSet.findChild(component => component.name === "Direction=Outbound, Messages=1") : messageGroupComponentSet.findChild(component => component.name === "Direction=Inbound, Messages=1");
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
            if (!directionIsOutbound) {
                let label = nextMessage.findOne(node => node.type === "TEXT" && node.name == "✏️Label");
                yield figma.loadFontAsync(label.fontName).then(() => {
                    label.characters = "Marilyn Collins";
                });
            }
        }
        else {
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
        //Set the message text
        let message = nextMessage.findAll(node => node.type === "TEXT" && node.name == "✏️Text")[positionInGroup];
        yield figma.loadFontAsync(message.fontName).then(() => {
            message.characters = messageText;
        });
        //Checkt that the message should not be multi-line
        if (nextMessage.mainComponent.name.startsWith("Direction=Outbound") ? message.width > 324 : message.width > 288) {
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0EsMkJBQTJCLCtEQUErRCxnQkFBZ0IsRUFBRSxFQUFFO0FBQzlHO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLHFGQUFxRjtBQUNwSDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLFdBQVc7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsV0FBVztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY29kZS50c1wiKTtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIG1lc3NhZ2VDb3VudCA9IDA7XG52YXIgbG9nO1xuLy8gVGhpcyBwbHVnaW4gd2lsbCBvcGVuIGEgd2luZG93IHRvIHByb21wdCB0aGUgdXNlciB0byBlbnRlciBhIG1lc3NhZ2UsIGFuZFxuLy8gaXQgd2lsbCB0aGVuIGNyZWF0ZSBhIG1lc3NhZ2Ugc3ltYm9sIHdpdGggdGhhdCB0ZXh0IG9uIHNjcmVlbi5cbi8vIFRoaXMgZmlsZSBob2xkcyB0aGUgbWFpbiBjb2RlIGZvciB0aGUgcGx1Z2lucy4gSXQgaGFzIGFjY2VzcyB0byB0aGUgKmRvY3VtZW50Ki5cbi8vIFlvdSBjYW4gYWNjZXNzIGJyb3dzZXIgQVBJcyBpbiB0aGUgPHNjcmlwdD4gdGFnIGluc2lkZSBcInVpLmh0bWxcIiB3aGljaCBoYXMgYVxuLy8gZnVsbCBicm93c2VyIGVudmlyb25tZW50IChzZWUgZG9jdW1lbnRhdGlvbikuXG4vLyBUaGlzIHNob3dzIHRoZSBIVE1MIHBhZ2UgaW4gXCJ1aS5odG1sXCIuXG5maWdtYS5zaG93VUkoX19odG1sX18pO1xuZmlnbWEudWkucmVzaXplKDQwMCwgNDgpO1xuLy8gQ2FsbHMgdG8gXCJwYXJlbnQucG9zdE1lc3NhZ2VcIiBmcm9tIHdpdGhpbiB0aGUgSFRNTCBwYWdlIHdpbGwgdHJpZ2dlciB0aGlzXG4vLyBjYWxsYmFjay4gVGhlIGNhbGxiYWNrIHdpbGwgYmUgcGFzc2VkIHRoZSBcInBsdWdpbk1lc3NhZ2VcIiBwcm9wZXJ0eSBvZiB0aGVcbi8vIHBvc3RlZCBtZXNzYWdlLlxuZmlnbWEudWkub25tZXNzYWdlID0gKG1zZykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIC8vTG9vayBmb3IgYSBcIldpZGdldFwiIG9yIGEgXCJNZXNzZW5nZXJcIiBpbiB0aGUgY3VycmVudCBzZWxlY3Rpb25cbiAgICBsZXQgd2lkZ2V0ID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uLmZpbmQobm9kZSA9PiBub2RlLnR5cGUgPT09IFwiRlJBTUVcIiAmJiBub2RlLm5hbWUgPT0gXCJXaWRnZXRcIik7XG4gICAgbGV0IG1lc3NlbmdlciA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbi5maW5kKG5vZGUgPT4gbm9kZS50eXBlID09PSBcIkZSQU1FXCIgJiYgbm9kZS5uYW1lID09IFwiTWVzc2VuZ2VyXCIpO1xuICAgIC8vIFRoZW4gbG9vayBmb3IgYSBjaGlsZCAnTG9nJyBmcmFtZS4uLlxuICAgIGlmICh3aWRnZXQpIHtcbiAgICAgICAgbG9nID0gd2lkZ2V0LmZpbmRPbmUobm9kZSA9PiBub2RlLnR5cGUgPT09IFwiRlJBTUVcIiAmJiBub2RlLm5hbWUgPT0gXCJMb2dcIik7XG4gICAgfVxuICAgIGVsc2UgaWYgKG1lc3Nlbmdlcikge1xuICAgICAgICBsb2cgPSBtZXNzZW5nZXIuZmluZE9uZShub2RlID0+IG5vZGUudHlwZSA9PT0gXCJGUkFNRVwiICYmIG5vZGUubmFtZSA9PSBcIkxvZ1wiKTtcbiAgICB9XG4gICAgLy8gT25lIHdheSBvZiBkaXN0aW5ndWlzaGluZyBiZXR3ZWVuIGRpZmZlcmVudCB0eXBlcyBvZiBtZXNzYWdlcyBzZW50IGZyb21cbiAgICAvLyB5b3VyIEhUTUwgcGFnZSBpcyB0byB1c2UgYW4gb2JqZWN0IHdpdGggYSBcInR5cGVcIiBwcm9wZXJ0eSBsaWtlIHRoaXMuLi5cbiAgICBpZiAobXNnLnR5cGUgPT09ICdjcmVhdGUtbWVzc2FnZScpIHtcbiAgICAgICAgeWllbGQgc2VuZE1lc3NhZ2UobXNnLm1lc3NhZ2UsIG1zZy5kaXJlY3Rpb24pO1xuICAgIH1cbiAgICBlbHNlIGlmIChtc2cudHlwZSA9PT0gJ3NldHVwJykge1xuICAgICAgICAvL0lmIHRoZXJlIGlzIG5vdCBhIGNvbnZlcnNhdGlvbi4uLlxuICAgICAgICB5aWVsZCBzZXRVcCgpO1xuICAgIH1cbn0pO1xuLy9+fkZ1bmN0aW9uIHRvIHNldCB1cCBhIG5ldyBjb252ZXJzYXRpb25+fi8vXG5mdW5jdGlvbiBzZXRVcCgpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBpZiAoIWxvZykge1xuICAgICAgICAgICAgLy9GaW5kIGxhc3Qgd2lkZ2V0Li4uXG4gICAgICAgICAgICBsZXQgb3RoZXJXaWRnZXRzID0gZmlnbWEuY3VycmVudFBhZ2UuZmluZEFsbChub2RlID0+IG5vZGUubmFtZSA9PSBcIldpZGdldFwiKTtcbiAgICAgICAgICAgIC8vTWFrZSB0aGUgY29udGFpbmVyXG4gICAgICAgICAgICBsZXQgd2lkZ2V0ID0gZmlnbWEuY3JlYXRlRnJhbWUoKTtcbiAgICAgICAgICAgIHdpZGdldC5zZXRSZWxhdW5jaERhdGEoeyBvcGVuOiBcIlwiIH0pO1xuICAgICAgICAgICAgd2lkZ2V0Lm5hbWUgPSBcIldpZGdldFwiO1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUgYXJlIG90aGVyIGNvbnRhaW5lcnMsIG9mZnNldCBpdCB0byB0aGUgcmlnaHQgb2YgdGhlIGxhc3Qgb25lLlxuICAgICAgICAgICAgaWYgKG90aGVyV2lkZ2V0cy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgICAgIHdpZGdldC54ID0gb3RoZXJXaWRnZXRzW290aGVyV2lkZ2V0cy5sZW5ndGggLSAxXS54ICsgNDgwO1xuICAgICAgICAgICAgd2lkZ2V0LnJlc2l6ZSgzODAsIDc4MCk7XG4gICAgICAgICAgICB3aWRnZXQuY2xpcHNDb250ZW50ID0gZmFsc2U7XG4gICAgICAgICAgICB3aWRnZXQuZmlsbHMgPSBbXTtcbiAgICAgICAgICAgIHdpZGdldC5sYXlvdXRNb2RlID0gXCJWRVJUSUNBTFwiO1xuICAgICAgICAgICAgd2lkZ2V0LnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9IFwiQVVUT1wiO1xuICAgICAgICAgICAgd2lkZ2V0LmNvdW50ZXJBeGlzQWxpZ25JdGVtcyA9IFwiTUFYXCI7XG4gICAgICAgICAgICB3aWRnZXQuaXRlbVNwYWNpbmcgPSA4O1xuICAgICAgICAgICAgLy9NYWtlIHRoZSBtZXNzZW5nZXJcbiAgICAgICAgICAgIGxldCBtZXNzZW5nZXIgPSBmaWdtYS5jcmVhdGVGcmFtZSgpO1xuICAgICAgICAgICAgbWVzc2VuZ2VyLnNldFJlbGF1bmNoRGF0YSh7IG9wZW46IFwiXCIgfSk7XG4gICAgICAgICAgICBtZXNzZW5nZXIubmFtZSA9IFwiTWVzc2VuZ2VyXCI7XG4gICAgICAgICAgICBtZXNzZW5nZXIucmVzaXplKDM4MCwgNzAwKTtcbiAgICAgICAgICAgIG1lc3Nlbmdlci5sYXlvdXRNb2RlID0gXCJWRVJUSUNBTFwiO1xuICAgICAgICAgICAgbWVzc2VuZ2VyLnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9IFwiRklYRURcIjtcbiAgICAgICAgICAgIGxldCBiYWNrZ3JvdW5kU3R5bGUgPSB5aWVsZCBmaWdtYS5pbXBvcnRTdHlsZUJ5S2V5QXN5bmMoXCI4YTUxZjBhMTc5ZjBhZDZkNWFmM2UzMzI5NjgxYmNkMzNlMGY3NDhjXCIpLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICBmaWdtYS5ub3RpZnkoXCJaY3JpcHRlciByZXF1aXJlcyB0aGUgJzAwIFplbmRlc2sgVGhlbWUgLSBMaWdodCAoRGVmYXVsdCknIGxpYnJhcnkuXCIpO1xuICAgICAgICAgICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1lc3Nlbmdlci5maWxsU3R5bGVJZCA9IGJhY2tncm91bmRTdHlsZS5pZDtcbiAgICAgICAgICAgIGxldCBiYWNrZ3JvdW5kRWZmZWN0ID0geWllbGQgZmlnbWEuaW1wb3J0U3R5bGVCeUtleUFzeW5jKFwiMjBiMDQwNWFkNzAyNGEyMGFkODc4YjkwYjNiNzViZDViYjI2NDQzYVwiKS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZmlnbWEubm90aWZ5KFwiWmNyaXB0ZXIgcmVxdWlyZXMgdGhlICdHYXJkZW4nIGxpYnJhcnkuXCIpO1xuICAgICAgICAgICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1lc3Nlbmdlci5lZmZlY3RTdHlsZUlkID0gYmFja2dyb3VuZEVmZmVjdC5pZDtcbiAgICAgICAgICAgIHdpZGdldC5hcHBlbmRDaGlsZChtZXNzZW5nZXIpO1xuICAgICAgICAgICAgLy9NYWtlIHRoZSBsYXVuY2hlclxuICAgICAgICAgICAgbGV0IGxhdW5jaGVyID0gKHlpZWxkIGZpZ21hLmltcG9ydENvbXBvbmVudEJ5S2V5QXN5bmMoXCJjNWYyYzdiODQxN2I4NjYyOWE4ZTUyYWEzN2ViZTJjMDY1YTJjNmRlXCIpKS5jcmVhdGVJbnN0YW5jZSgpO1xuICAgICAgICAgICAgd2lkZ2V0LmFwcGVuZENoaWxkKGxhdW5jaGVyKTtcbiAgICAgICAgICAgIC8vTWFrZSB0aGUgaGVhZGVyXG4gICAgICAgICAgICBsZXQgaGVhZGVyID0gKHlpZWxkIGZpZ21hLmltcG9ydENvbXBvbmVudEJ5S2V5QXN5bmMoXCJkYTg1Nzc4ZmEzZTNmNTQ0ODVmY2VkZmUxYmYyNDc2Zjg1MWYyZjQxXCIpKS5jcmVhdGVJbnN0YW5jZSgpO1xuICAgICAgICAgICAgbGV0IHRpdGxlID0gaGVhZGVyLmZpbmRDaGlsZChub2RlID0+IG5vZGUubmFtZSA9PSBcIuKcj++4j1RpdGxlXCIpO1xuICAgICAgICAgICAgeWllbGQgZmlnbWEubG9hZEZvbnRBc3luYyh0aXRsZS5mb250TmFtZSk7XG4gICAgICAgICAgICB0aXRsZS5jaGFyYWN0ZXJzID0gXCJaZW5kZXNrXCI7XG4gICAgICAgICAgICBoZWFkZXIubGF5b3V0QWxpZ24gPSBcIlNUUkVUQ0hcIjtcbiAgICAgICAgICAgIG1lc3Nlbmdlci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgICAgICAgICAgLy9NYWtlIGEgbG9nIGZyYW1lXG4gICAgICAgICAgICBsb2cgPSBmaWdtYS5jcmVhdGVGcmFtZSgpO1xuICAgICAgICAgICAgbG9nLm5hbWUgPSBcIkxvZ1wiO1xuICAgICAgICAgICAgbG9nLnJlc2l6ZSgzODAsIDEpO1xuICAgICAgICAgICAgbG9nLmxheW91dE1vZGUgPSBcIlZFUlRJQ0FMXCI7XG4gICAgICAgICAgICBsb2cubGF5b3V0R3JvdyA9IDE7XG4gICAgICAgICAgICBsb2cubGF5b3V0QWxpZ24gPSBcIlNUUkVUQ0hcIjtcbiAgICAgICAgICAgIGxvZy5vdmVyZmxvd0RpcmVjdGlvbiA9IFwiVkVSVElDQUxcIjtcbiAgICAgICAgICAgIGxvZy5maWxscyA9IFtdO1xuICAgICAgICAgICAgbWVzc2VuZ2VyLmFwcGVuZENoaWxkKGxvZyk7XG4gICAgICAgICAgICAvL01ha2UgdGhlIGNvbXBvc2VyXG4gICAgICAgICAgICBsZXQgY29tcG9zZXIgPSAoeWllbGQgZmlnbWEuaW1wb3J0Q29tcG9uZW50QnlLZXlBc3luYyhcIjBjZGVhZWMwYzViYWYyMTZiNmM3NGQxYTkzOWE5Yzk0ZTAyNWYxZGZcIikpLmNyZWF0ZUluc3RhbmNlKCk7XG4gICAgICAgICAgICBjb21wb3Nlci5sYXlvdXRBbGlnbiA9IFwiU1RSRVRDSFwiO1xuICAgICAgICAgICAgbWVzc2VuZ2VyLmFwcGVuZENoaWxkKGNvbXBvc2VyKTtcbiAgICAgICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLmFwcGVuZENoaWxkKHdpZGdldCk7XG4gICAgICAgICAgICBjb25zdCBub2RlcyA9IFtdO1xuICAgICAgICAgICAgbm9kZXMucHVzaCh3aWRnZXQpO1xuICAgICAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gbm9kZXM7XG4gICAgICAgICAgICBmaWdtYS52aWV3cG9ydC5zY3JvbGxBbmRab29tSW50b1ZpZXcobm9kZXMpO1xuICAgICAgICB9XG4gICAgICAgIC8vTm93IHRoYXQgd2UgYXJlIHN1cmUgdGhlcmUgaXMgYSBjb252ZXJzYXRpb24sIGNoZWNrIGlmIHRoZXJlIGlzIGFueSBtZXNzYWdlcy5cbiAgICAgICAgdmFyIGZpcnN0TWVzc2FnZSA9IGxvZy5maW5kQ2hpbGQobm9kZSA9PiBub2RlLm5hbWUgPT0gXCIwXCIgJiYgbm9kZS50eXBlID09PSBcIklOU1RBTkNFXCIpO1xuICAgICAgICAvL0lmIHRoZXJlIGlzIG5vIGZpcnN0IG1lc3NhZ2UuLi5cbiAgICAgICAgaWYgKCFmaXJzdE1lc3NhZ2UpIHtcbiAgICAgICAgICAgIC8vQ3JlYXRlIGEgZmlyc3Qgd2VsY29tZSBtZXNzc2FnZS4uLlxuICAgICAgICAgICAgeWllbGQgZmlnbWEuaW1wb3J0Q29tcG9uZW50QnlLZXlBc3luYyhcIjY2M2IwNmJmZTkyN2NmNTU3NGRjODJjNjBlMDg0ZGEyZWU1ZTk5ZDlcIikudGhlbih0aW1lc3RhbXBDb21wb25lbnQgPT4ge1xuICAgICAgICAgICAgICAgIGZpcnN0TWVzc2FnZSA9IHRpbWVzdGFtcENvbXBvbmVudC5jcmVhdGVJbnN0YW5jZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmaXJzdE1lc3NhZ2UubmFtZSA9IFwiMFwiO1xuICAgICAgICAgICAgbWVzc2FnZUNvdW50ID0gMDtcbiAgICAgICAgICAgIGZpcnN0TWVzc2FnZS5sYXlvdXRBbGlnbiA9IFwiU1RSRVRDSFwiO1xuICAgICAgICAgICAgLy9UT0RPIHNldCB0ZXh0IHRvIHRvZGF5cyBkYXRlXG4gICAgICAgICAgICBsb2cuaW5zZXJ0Q2hpbGQoMCwgZmlyc3RNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy9+fkZ1bmN0aW9uIHRvIHNlbmQgYSBtZXNzYWdlfn4vL1xuZnVuY3Rpb24gc2VuZE1lc3NhZ2UobWVzc2FnZVRleHQsIGRpcmVjdGlvbklzT3V0Ym91bmQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBsZXQgcG9zaXRpb25Jbkdyb3VwO1xuICAgICAgICAvL0ZpbmQgdGhlIGxhc3QgbWVzc2FnZSBpbiB0aGUgY29udmVyc2F0aW9uIGZyYW1lLi4uXG4gICAgICAgIGxldCBsYXN0TWVzc2FnZSA9IGxvZy5jaGlsZHJlbltsb2cuY2hpbGRyZW4ubGVuZ3RoIC0gMV07XG4gICAgICAgIC8vLi5hbmQgU2V0IHRoZSBtZXNzYWdlQ291bnQgdG8gdGhlIG51bWJlcmVkIG5hbWUgb2YgdGhpcyBtZXNzYWdlXG4gICAgICAgIG1lc3NhZ2VDb3VudCA9IHBhcnNlSW50KGxhc3RNZXNzYWdlLm5hbWUpO1xuICAgICAgICAvL0lmIHBhcnRpY2lwYW50IGhhcyBjaGFuZ2VkIHNpbmNlIGxhc3QgbWVzc2FnZS4uLlxuICAgICAgICAvL1RPRE8gbmVlZCB0byBwcm9wZXJseSBhY2NvdW50IGZvciBmaXJzdCBtZXNzYWdlIC0gaW5jb3JyZWN0bHkgcmVnaXN0ZXJzIGFzIGZhbHNlIGlmIGZpcnN0IG1lc3NhZ2UgaXMgaW5ib3VuZCFcbiAgICAgICAgaWYgKGRpcmVjdGlvbklzT3V0Ym91bmQgIT0gbGFzdE1lc3NhZ2UubWFpbkNvbXBvbmVudC5uYW1lLnN0YXJ0c1dpdGgoXCJEaXJlY3Rpb249T3V0Ym91bmRcIikpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uSW5Hcm91cCA9IDA7XG4gICAgICAgICAgICAvL0NyZWF0ZSBhIG5ldyBtZXNzYWdlLi4uXG4gICAgICAgICAgICBsZXQgbWVzc2FnZUdyb3VwQ29tcG9uZW50O1xuICAgICAgICAgICAgeWllbGQgZmlnbWEuaW1wb3J0Q29tcG9uZW50U2V0QnlLZXlBc3luYyhcIjk4ZThmMmFmNWNlZjIwNTM3ZGZiZmIxZGMyOTRmNmZjMWY2MGQ0NjZcIikudGhlbihtZXNzYWdlR3JvdXBDb21wb25lbnRTZXQgPT4ge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VHcm91cENvbXBvbmVudCA9IGRpcmVjdGlvbklzT3V0Ym91bmQgPyBtZXNzYWdlR3JvdXBDb21wb25lbnRTZXQuZmluZENoaWxkKGNvbXBvbmVudCA9PiBjb21wb25lbnQubmFtZSA9PT0gXCJEaXJlY3Rpb249T3V0Ym91bmQsIE1lc3NhZ2VzPTFcIikgOiBtZXNzYWdlR3JvdXBDb21wb25lbnRTZXQuZmluZENoaWxkKGNvbXBvbmVudCA9PiBjb21wb25lbnQubmFtZSA9PT0gXCJEaXJlY3Rpb249SW5ib3VuZCwgTWVzc2FnZXM9MVwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIG5leHRNZXNzYWdlID0gbWVzc2FnZUdyb3VwQ29tcG9uZW50ID09PSBudWxsIHx8IG1lc3NhZ2VHcm91cENvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbWVzc2FnZUdyb3VwQ29tcG9uZW50LmNyZWF0ZUluc3RhbmNlKCk7XG4gICAgICAgICAgICBuZXh0TWVzc2FnZS5sYXlvdXRBbGlnbiA9IFwiU1RSRVRDSFwiO1xuICAgICAgICAgICAgbmV4dE1lc3NhZ2UubmFtZSA9ICgrK21lc3NhZ2VDb3VudCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIC8vVHVybiBvZmYgcmVjZWlwdHMgb24gcHJldmlvdXMgbWVzc2FnZSwgaWYgdGhlcmUgaXMgb25lXG4gICAgICAgICAgICBsZXQgcmVjZWlwdCA9IGxhc3RNZXNzYWdlLmZpbmRPbmUobm9kZSA9PiBub2RlLm5hbWUgPT0gXCJSZWNlaXB0XCIpO1xuICAgICAgICAgICAgaWYgKHJlY2VpcHQpXG4gICAgICAgICAgICAgICAgcmVjZWlwdC52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAvL0luc2VydCB0aGUgbmV3IG1lc3NhZ2UuXG4gICAgICAgICAgICBsb2cuaW5zZXJ0Q2hpbGQobWVzc2FnZUNvdW50LCBuZXh0TWVzc2FnZSk7XG4gICAgICAgICAgICAvL1NldCB0aGUgYXV0aG9yIGxhYmVsLCBpZiBpdCBpcyBhbiBpbmJvdW5kIG1lc3NhZ2VcbiAgICAgICAgICAgIGlmICghZGlyZWN0aW9uSXNPdXRib3VuZCkge1xuICAgICAgICAgICAgICAgIGxldCBsYWJlbCA9IG5leHRNZXNzYWdlLmZpbmRPbmUobm9kZSA9PiBub2RlLnR5cGUgPT09IFwiVEVYVFwiICYmIG5vZGUubmFtZSA9PSBcIuKcj++4j0xhYmVsXCIpO1xuICAgICAgICAgICAgICAgIHlpZWxkIGZpZ21hLmxvYWRGb250QXN5bmMobGFiZWwuZm9udE5hbWUpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbC5jaGFyYWN0ZXJzID0gXCJNYXJpbHluIENvbGxpbnNcIjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBvc2l0aW9uSW5Hcm91cCA9IGxhc3RNZXNzYWdlLmZpbmRBbGwobm9kZSA9PiBub2RlLm5hbWUuc3RhcnRzV2l0aChcIk1lc3NhZ2UgXCIpKS5sZW5ndGg7XG4gICAgICAgICAgICBpZiAocG9zaXRpb25Jbkdyb3VwIDwgMykge1xuICAgICAgICAgICAgICAgIC8vVE9ETyBJbnZlc3RpZ2F0ZSBtYWtpbmcgdGhpcyBzY2FsYWJsZSBiZXlvbmQgMyBtZXNzYWdlcyBieSBhcHBlbmRpbmcgYW4gbmV3IG1lc3NhZ2UsIHZzIHN3YXBwaW5nIGNvbXBvbmVudC5cbiAgICAgICAgICAgICAgICB2YXIgbmV4dE1lc3NhZ2UgPSBsYXN0TWVzc2FnZTtcbiAgICAgICAgICAgICAgICBuZXh0TWVzc2FnZS5zd2FwQ29tcG9uZW50KG5leHRNZXNzYWdlLm1haW5Db21wb25lbnQucGFyZW50LmZpbmRDaGlsZChub2RlID0+IG5vZGUubmFtZSA9PSBuZXh0TWVzc2FnZS5tYWluQ29tcG9uZW50Lm5hbWUuc3Vic3RyKDAsIG5leHRNZXNzYWdlLm1haW5Db21wb25lbnQubmFtZS5sZW5ndGggLSAxKSArIChwb3NpdGlvbkluR3JvdXAgKyAxKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb25Jbkdyb3VwID0gMjtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dE1lc3NhZ2UgPSBsYXN0TWVzc2FnZTtcbiAgICAgICAgICAgICAgICBmaWdtYS5ub3RpZnkoXCJDb252ZXJzYXRpb24gS2l0IGN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIDMgY29uc2VjdXRpdmUgbWVzc2FnZXMuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vU2V0IHRoZSBtZXNzYWdlIHRleHRcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBuZXh0TWVzc2FnZS5maW5kQWxsKG5vZGUgPT4gbm9kZS50eXBlID09PSBcIlRFWFRcIiAmJiBub2RlLm5hbWUgPT0gXCLinI/vuI9UZXh0XCIpW3Bvc2l0aW9uSW5Hcm91cF07XG4gICAgICAgIHlpZWxkIGZpZ21hLmxvYWRGb250QXN5bmMobWVzc2FnZS5mb250TmFtZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBtZXNzYWdlLmNoYXJhY3RlcnMgPSBtZXNzYWdlVGV4dDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vQ2hlY2t0IHRoYXQgdGhlIG1lc3NhZ2Ugc2hvdWxkIG5vdCBiZSBtdWx0aS1saW5lXG4gICAgICAgIGlmIChuZXh0TWVzc2FnZS5tYWluQ29tcG9uZW50Lm5hbWUuc3RhcnRzV2l0aChcIkRpcmVjdGlvbj1PdXRib3VuZFwiKSA/IG1lc3NhZ2Uud2lkdGggPiAzMjQgOiBtZXNzYWdlLndpZHRoID4gMjg4KSB7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZUNvbXBvbmVudCA9IG5leHRNZXNzYWdlLmZpbmRBbGwobm9kZSA9PiBub2RlLm5hbWUuc3RhcnRzV2l0aChcIk1lc3NhZ2UgXCIpKVtwb3NpdGlvbkluR3JvdXBdO1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2VDb21wb25lbnRTZXQgPSBtZXNzYWdlQ29tcG9uZW50Lm1haW5Db21wb25lbnQucGFyZW50O1xuICAgICAgICAgICAgbWVzc2FnZUNvbXBvbmVudC5zd2FwQ29tcG9uZW50KG1lc3NhZ2VDb21wb25lbnRTZXQuY2hpbGRyZW5bMF0pO1xuICAgICAgICB9XG4gICAgICAgIC8vQ2hlY2sgdGhhdCB0aGUgbG9nIGhhcyBub3QgYmVjb21lIGZpbGxlZFxuICAgICAgICBpZiAobmV4dE1lc3NhZ2UueSArIG5leHRNZXNzYWdlLmhlaWdodCA+IGxvZy5oZWlnaHQpIHtcbiAgICAgICAgICAgIGxvZy5wcmltYXJ5QXhpc0FsaWduSXRlbXMgPSBcIk1BWFwiO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vL35+RnVuY3Rpb24gdG8gY2xvbmUgZmlsbHMsIGV0Yy4gc28gdGhleSBjYW4gYmUgc2V0Ln5+Ly9cbmZ1bmN0aW9uIGNsb25lKHZhbCkge1xuICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgPT09ICd1bmRlZmluZWQnIHx8IHR5cGUgPT09ICdudW1iZXInIHx8XG4gICAgICAgIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGUgPT09ICdib29sZWFuJykge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAodmFsIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWwubWFwKHggPT4gY2xvbmUoeCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheSh2YWwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IG8gPSB7fTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHZhbCkge1xuICAgICAgICAgICAgICAgIG9ba2V5XSA9IGNsb25lKHZhbFtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRocm93ICd1bmtub3duJztcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=