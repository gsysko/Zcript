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
var conversation;
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
    // Look for a 'Conversation' frame...
    conversation = figma.currentPage.findOne(node => node.type === "FRAME" && node.name == "Log");
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this...
    if (msg.type === 'create-message') {
        yield sendMessage(msg.message, msg.direction);
    }
    else if (msg.type === 'setup') {
        //If there is not a conversation...
        if (!conversation) {
            //Make a conversation frame
            conversation = figma.createFrame();
            conversation.name = "Log";
            conversation.resize(480, 1800);
            let bgPaint = figma.getLocalPaintStyles().find(paintStyle => paintStyle.name == "BG").paints[0];
            let fills = clone(conversation.fills);
            fills[0].color = bgPaint.color;
            conversation.fills = fills;
            figma.currentPage.appendChild(conversation);
            const nodes = [];
            nodes.push(conversation);
            figma.currentPage.selection = nodes;
            figma.viewport.scrollAndZoomIntoView(nodes);
        }
        //Now that we are sure there is a conversation...
        //Check if there is any messages...
        var firstMessage = conversation.findChild(node => node.name == "0" && node.type === "INSTANCE");
        //If there is no first message...
        if (!firstMessage) {
            //Create a first welcome messsage...
            yield figma.importComponentByKeyAsync("663b06bfe927cf5574dc82c60e084da2ee5e99d9").then(timestampComponent => {
                firstMessage = timestampComponent.createInstance();
            });
            //TODO Look into adding constraints
            firstMessage.name = "0";
            messageCount = 0;
            conversation.insertChild(0, firstMessage);
            const nodes = [];
            nodes.push(conversation.children[0]);
            conversation.layoutMode = "VERTICAL";
            figma.currentPage.selection = nodes;
            figma.viewport.scrollAndZoomIntoView(nodes);
        }
    }
});
function sendMessage(messageText, directionIsOutbound) {
    return __awaiter(this, void 0, void 0, function* () {
        //Find the last message in the conversation frame...
        let lastMessage = conversation.children[conversation.children.length - 1];
        //TODO make sure this is truely the last message (i.e. they did not get shuffled)
        //Set the messageCount to the numbered name of this message
        messageCount = parseInt(lastMessage.name);
        //Create a new outbound message and set the text to the msg...
        let outboundMessageGroupComponent;
        let inboundMessageGroupComponent;
        yield figma.importComponentSetByKeyAsync("98e8f2af5cef20537dfbfb1dc294f6fc1f60d466").then(messageGroupComponentSet => {
            outboundMessageGroupComponent = messageGroupComponentSet.findChild(component => component.name === "Direction=Outbound, Messages=1");
            inboundMessageGroupComponent = messageGroupComponentSet.findChild(component => component.name === "Direction=Inbound, Messages=1");
        });
        let nextMessage = directionIsOutbound ? outboundMessageGroupComponent === null || outboundMessageGroupComponent === void 0 ? void 0 : outboundMessageGroupComponent.createInstance() : inboundMessageGroupComponent === null || inboundMessageGroupComponent === void 0 ? void 0 : inboundMessageGroupComponent.createInstance();
        nextMessage.name = (++messageCount).toString();
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
        if (!directionIsOutbound) {
            let label = nextMessage.findOne(node => node.type === "TEXT" && node.name == "✏️Label");
            yield figma.loadFontAsync(label.fontName).then(() => {
                label.characters = "Marilyn Collins";
            });
        }
        //TODO turn off receipts on previous message
        let message = nextMessage.findOne(node => node.type === "TEXT" && node.name == "✏️Text");
        yield figma.loadFontAsync(message.fontName).then(() => {
            message.characters = messageText;
            nextMessage.y = lastMessage.y + lastMessage.height;
            conversation.insertChild(messageCount, nextMessage);
            const nodes = [];
            nodes.push(conversation.children[conversation.children.length - 1]);
            figma.viewport.scrollAndZoomIntoView(nodes);
        });
    });
}
//Used to clone fills, etc. so they can be set.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0EsMkJBQTJCLCtEQUErRCxnQkFBZ0IsRUFBRSxFQUFFO0FBQzlHO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLHFGQUFxRjtBQUNwSDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY29kZS50c1wiKTtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIG1lc3NhZ2VDb3VudCA9IDA7XG52YXIgY29udmVyc2F0aW9uO1xuLy8gVGhpcyBwbHVnaW4gd2lsbCBvcGVuIGEgd2luZG93IHRvIHByb21wdCB0aGUgdXNlciB0byBlbnRlciBhIG1lc3NhZ2UsIGFuZFxuLy8gaXQgd2lsbCB0aGVuIGNyZWF0ZSBhIG1lc3NhZ2Ugc3ltYm9sIHdpdGggdGhhdCB0ZXh0IG9uIHNjcmVlbi5cbi8vIFRoaXMgZmlsZSBob2xkcyB0aGUgbWFpbiBjb2RlIGZvciB0aGUgcGx1Z2lucy4gSXQgaGFzIGFjY2VzcyB0byB0aGUgKmRvY3VtZW50Ki5cbi8vIFlvdSBjYW4gYWNjZXNzIGJyb3dzZXIgQVBJcyBpbiB0aGUgPHNjcmlwdD4gdGFnIGluc2lkZSBcInVpLmh0bWxcIiB3aGljaCBoYXMgYVxuLy8gZnVsbCBicm93c2VyIGVudmlyb25tZW50IChzZWUgZG9jdW1lbnRhdGlvbikuXG4vLyBUaGlzIHNob3dzIHRoZSBIVE1MIHBhZ2UgaW4gXCJ1aS5odG1sXCIuXG5maWdtYS5zaG93VUkoX19odG1sX18pO1xuZmlnbWEudWkucmVzaXplKDQwMCwgNDgpO1xuLy8gQ2FsbHMgdG8gXCJwYXJlbnQucG9zdE1lc3NhZ2VcIiBmcm9tIHdpdGhpbiB0aGUgSFRNTCBwYWdlIHdpbGwgdHJpZ2dlciB0aGlzXG4vLyBjYWxsYmFjay4gVGhlIGNhbGxiYWNrIHdpbGwgYmUgcGFzc2VkIHRoZSBcInBsdWdpbk1lc3NhZ2VcIiBwcm9wZXJ0eSBvZiB0aGVcbi8vIHBvc3RlZCBtZXNzYWdlLlxuZmlnbWEudWkub25tZXNzYWdlID0gKG1zZykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIC8vIExvb2sgZm9yIGEgJ0NvbnZlcnNhdGlvbicgZnJhbWUuLi5cbiAgICBjb252ZXJzYXRpb24gPSBmaWdtYS5jdXJyZW50UGFnZS5maW5kT25lKG5vZGUgPT4gbm9kZS50eXBlID09PSBcIkZSQU1FXCIgJiYgbm9kZS5uYW1lID09IFwiTG9nXCIpO1xuICAgIC8vIE9uZSB3YXkgb2YgZGlzdGluZ3Vpc2hpbmcgYmV0d2VlbiBkaWZmZXJlbnQgdHlwZXMgb2YgbWVzc2FnZXMgc2VudCBmcm9tXG4gICAgLy8geW91ciBIVE1MIHBhZ2UgaXMgdG8gdXNlIGFuIG9iamVjdCB3aXRoIGEgXCJ0eXBlXCIgcHJvcGVydHkgbGlrZSB0aGlzLi4uXG4gICAgaWYgKG1zZy50eXBlID09PSAnY3JlYXRlLW1lc3NhZ2UnKSB7XG4gICAgICAgIHlpZWxkIHNlbmRNZXNzYWdlKG1zZy5tZXNzYWdlLCBtc2cuZGlyZWN0aW9uKTtcbiAgICB9XG4gICAgZWxzZSBpZiAobXNnLnR5cGUgPT09ICdzZXR1cCcpIHtcbiAgICAgICAgLy9JZiB0aGVyZSBpcyBub3QgYSBjb252ZXJzYXRpb24uLi5cbiAgICAgICAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICAgICAgICAgIC8vTWFrZSBhIGNvbnZlcnNhdGlvbiBmcmFtZVxuICAgICAgICAgICAgY29udmVyc2F0aW9uID0gZmlnbWEuY3JlYXRlRnJhbWUoKTtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbi5uYW1lID0gXCJMb2dcIjtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbi5yZXNpemUoNDgwLCAxODAwKTtcbiAgICAgICAgICAgIGxldCBiZ1BhaW50ID0gZmlnbWEuZ2V0TG9jYWxQYWludFN0eWxlcygpLmZpbmQocGFpbnRTdHlsZSA9PiBwYWludFN0eWxlLm5hbWUgPT0gXCJCR1wiKS5wYWludHNbMF07XG4gICAgICAgICAgICBsZXQgZmlsbHMgPSBjbG9uZShjb252ZXJzYXRpb24uZmlsbHMpO1xuICAgICAgICAgICAgZmlsbHNbMF0uY29sb3IgPSBiZ1BhaW50LmNvbG9yO1xuICAgICAgICAgICAgY29udmVyc2F0aW9uLmZpbGxzID0gZmlsbHM7XG4gICAgICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5hcHBlbmRDaGlsZChjb252ZXJzYXRpb24pO1xuICAgICAgICAgICAgY29uc3Qgbm9kZXMgPSBbXTtcbiAgICAgICAgICAgIG5vZGVzLnB1c2goY29udmVyc2F0aW9uKTtcbiAgICAgICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbiA9IG5vZGVzO1xuICAgICAgICAgICAgZmlnbWEudmlld3BvcnQuc2Nyb2xsQW5kWm9vbUludG9WaWV3KG5vZGVzKTtcbiAgICAgICAgfVxuICAgICAgICAvL05vdyB0aGF0IHdlIGFyZSBzdXJlIHRoZXJlIGlzIGEgY29udmVyc2F0aW9uLi4uXG4gICAgICAgIC8vQ2hlY2sgaWYgdGhlcmUgaXMgYW55IG1lc3NhZ2VzLi4uXG4gICAgICAgIHZhciBmaXJzdE1lc3NhZ2UgPSBjb252ZXJzYXRpb24uZmluZENoaWxkKG5vZGUgPT4gbm9kZS5uYW1lID09IFwiMFwiICYmIG5vZGUudHlwZSA9PT0gXCJJTlNUQU5DRVwiKTtcbiAgICAgICAgLy9JZiB0aGVyZSBpcyBubyBmaXJzdCBtZXNzYWdlLi4uXG4gICAgICAgIGlmICghZmlyc3RNZXNzYWdlKSB7XG4gICAgICAgICAgICAvL0NyZWF0ZSBhIGZpcnN0IHdlbGNvbWUgbWVzc3NhZ2UuLi5cbiAgICAgICAgICAgIHlpZWxkIGZpZ21hLmltcG9ydENvbXBvbmVudEJ5S2V5QXN5bmMoXCI2NjNiMDZiZmU5MjdjZjU1NzRkYzgyYzYwZTA4NGRhMmVlNWU5OWQ5XCIpLnRoZW4odGltZXN0YW1wQ29tcG9uZW50ID0+IHtcbiAgICAgICAgICAgICAgICBmaXJzdE1lc3NhZ2UgPSB0aW1lc3RhbXBDb21wb25lbnQuY3JlYXRlSW5zdGFuY2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy9UT0RPIExvb2sgaW50byBhZGRpbmcgY29uc3RyYWludHNcbiAgICAgICAgICAgIGZpcnN0TWVzc2FnZS5uYW1lID0gXCIwXCI7XG4gICAgICAgICAgICBtZXNzYWdlQ291bnQgPSAwO1xuICAgICAgICAgICAgY29udmVyc2F0aW9uLmluc2VydENoaWxkKDAsIGZpcnN0TWVzc2FnZSk7XG4gICAgICAgICAgICBjb25zdCBub2RlcyA9IFtdO1xuICAgICAgICAgICAgbm9kZXMucHVzaChjb252ZXJzYXRpb24uY2hpbGRyZW5bMF0pO1xuICAgICAgICAgICAgY29udmVyc2F0aW9uLmxheW91dE1vZGUgPSBcIlZFUlRJQ0FMXCI7XG4gICAgICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBub2RlcztcbiAgICAgICAgICAgIGZpZ21hLnZpZXdwb3J0LnNjcm9sbEFuZFpvb21JbnRvVmlldyhub2Rlcyk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbmZ1bmN0aW9uIHNlbmRNZXNzYWdlKG1lc3NhZ2VUZXh0LCBkaXJlY3Rpb25Jc091dGJvdW5kKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy9GaW5kIHRoZSBsYXN0IG1lc3NhZ2UgaW4gdGhlIGNvbnZlcnNhdGlvbiBmcmFtZS4uLlxuICAgICAgICBsZXQgbGFzdE1lc3NhZ2UgPSBjb252ZXJzYXRpb24uY2hpbGRyZW5bY29udmVyc2F0aW9uLmNoaWxkcmVuLmxlbmd0aCAtIDFdO1xuICAgICAgICAvL1RPRE8gbWFrZSBzdXJlIHRoaXMgaXMgdHJ1ZWx5IHRoZSBsYXN0IG1lc3NhZ2UgKGkuZS4gdGhleSBkaWQgbm90IGdldCBzaHVmZmxlZClcbiAgICAgICAgLy9TZXQgdGhlIG1lc3NhZ2VDb3VudCB0byB0aGUgbnVtYmVyZWQgbmFtZSBvZiB0aGlzIG1lc3NhZ2VcbiAgICAgICAgbWVzc2FnZUNvdW50ID0gcGFyc2VJbnQobGFzdE1lc3NhZ2UubmFtZSk7XG4gICAgICAgIC8vQ3JlYXRlIGEgbmV3IG91dGJvdW5kIG1lc3NhZ2UgYW5kIHNldCB0aGUgdGV4dCB0byB0aGUgbXNnLi4uXG4gICAgICAgIGxldCBvdXRib3VuZE1lc3NhZ2VHcm91cENvbXBvbmVudDtcbiAgICAgICAgbGV0IGluYm91bmRNZXNzYWdlR3JvdXBDb21wb25lbnQ7XG4gICAgICAgIHlpZWxkIGZpZ21hLmltcG9ydENvbXBvbmVudFNldEJ5S2V5QXN5bmMoXCI5OGU4ZjJhZjVjZWYyMDUzN2RmYmZiMWRjMjk0ZjZmYzFmNjBkNDY2XCIpLnRoZW4obWVzc2FnZUdyb3VwQ29tcG9uZW50U2V0ID0+IHtcbiAgICAgICAgICAgIG91dGJvdW5kTWVzc2FnZUdyb3VwQ29tcG9uZW50ID0gbWVzc2FnZUdyb3VwQ29tcG9uZW50U2V0LmZpbmRDaGlsZChjb21wb25lbnQgPT4gY29tcG9uZW50Lm5hbWUgPT09IFwiRGlyZWN0aW9uPU91dGJvdW5kLCBNZXNzYWdlcz0xXCIpO1xuICAgICAgICAgICAgaW5ib3VuZE1lc3NhZ2VHcm91cENvbXBvbmVudCA9IG1lc3NhZ2VHcm91cENvbXBvbmVudFNldC5maW5kQ2hpbGQoY29tcG9uZW50ID0+IGNvbXBvbmVudC5uYW1lID09PSBcIkRpcmVjdGlvbj1JbmJvdW5kLCBNZXNzYWdlcz0xXCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IG5leHRNZXNzYWdlID0gZGlyZWN0aW9uSXNPdXRib3VuZCA/IG91dGJvdW5kTWVzc2FnZUdyb3VwQ29tcG9uZW50ID09PSBudWxsIHx8IG91dGJvdW5kTWVzc2FnZUdyb3VwQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvdXRib3VuZE1lc3NhZ2VHcm91cENvbXBvbmVudC5jcmVhdGVJbnN0YW5jZSgpIDogaW5ib3VuZE1lc3NhZ2VHcm91cENvbXBvbmVudCA9PT0gbnVsbCB8fCBpbmJvdW5kTWVzc2FnZUdyb3VwQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBpbmJvdW5kTWVzc2FnZUdyb3VwQ29tcG9uZW50LmNyZWF0ZUluc3RhbmNlKCk7XG4gICAgICAgIG5leHRNZXNzYWdlLm5hbWUgPSAoKyttZXNzYWdlQ291bnQpLnRvU3RyaW5nKCk7XG4gICAgICAgIC8vIGlmKG1lc3NhZ2VUZXh0Lmxlbmd0aCA8IDE1KXtcbiAgICAgICAgLy8gICBsZXQgbWVzc2FnZTEgPSBuZXh0TWVzc2FnZS5maW5kT25lKG5vZGUgPT4gbm9kZS50eXBlID09PSBcIklOU1RBTkNFXCIgJiYgbm9kZS5uYW1lID09IFwiTWVzc2FnZSAxXCIpIGFzIEluc3RhbmNlTm9kZVxuICAgICAgICAvLyAgIGxldCBtZXNzYWdlQ29tcG9uZW50OiBDb21wb25lbnROb2RlXG4gICAgICAgIC8vICAgYXdhaXQgZmlnbWEuaW1wb3J0Q29tcG9uZW50U2V0QnlLZXlBc3luYyhtZXNzYWdlMS5tYWluQ29tcG9uZW50LmtleSkudGhlbiggbWVzc2FnZUNvbXBvbmVudFNldCA9PiB7XG4gICAgICAgIC8vICAgICBkZWJ1Z2dlclxuICAgICAgICAvLyAgICAgbWVzc2FnZUNvbXBvbmVudCA9IG1lc3NhZ2VDb21wb25lbnRTZXQuZmluZENoaWxkKGNvbXBvbmVudCA9PiBjb21wb25lbnQubmFtZSA9PT0gXCJUeXBlPVRleHQsIE11bHRpbGluZT1GYWxzZSwgU3RhdGU9U2VudFwiKSBhcyBDb21wb25lbnROb2RlXG4gICAgICAgIC8vICAgfSlcbiAgICAgICAgLy8gICAvLyAvLyBsZXQgYnViID0gbWVzc2FnZTEubWFpbkNvbXBvbmVudFxuICAgICAgICAvLyAgIC8vIC8vIGJ1Yi5uYW1lID0gXCJUeXBlPVRleHQsIE11bHRpbGluZT1GYWxzZSwgU3RhdGU9U2VudFwiXG4gICAgICAgIC8vICAgbWVzc2FnZTEgPSBtZXNzYWdlQ29tcG9uZW50LmNyZWF0ZUluc3RhbmNlKClcbiAgICAgICAgLy8gfVxuICAgICAgICBpZiAoIWRpcmVjdGlvbklzT3V0Ym91bmQpIHtcbiAgICAgICAgICAgIGxldCBsYWJlbCA9IG5leHRNZXNzYWdlLmZpbmRPbmUobm9kZSA9PiBub2RlLnR5cGUgPT09IFwiVEVYVFwiICYmIG5vZGUubmFtZSA9PSBcIuKcj++4j0xhYmVsXCIpO1xuICAgICAgICAgICAgeWllbGQgZmlnbWEubG9hZEZvbnRBc3luYyhsYWJlbC5mb250TmFtZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGFiZWwuY2hhcmFjdGVycyA9IFwiTWFyaWx5biBDb2xsaW5zXCI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvL1RPRE8gdHVybiBvZmYgcmVjZWlwdHMgb24gcHJldmlvdXMgbWVzc2FnZVxuICAgICAgICBsZXQgbWVzc2FnZSA9IG5leHRNZXNzYWdlLmZpbmRPbmUobm9kZSA9PiBub2RlLnR5cGUgPT09IFwiVEVYVFwiICYmIG5vZGUubmFtZSA9PSBcIuKcj++4j1RleHRcIik7XG4gICAgICAgIHlpZWxkIGZpZ21hLmxvYWRGb250QXN5bmMobWVzc2FnZS5mb250TmFtZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBtZXNzYWdlLmNoYXJhY3RlcnMgPSBtZXNzYWdlVGV4dDtcbiAgICAgICAgICAgIG5leHRNZXNzYWdlLnkgPSBsYXN0TWVzc2FnZS55ICsgbGFzdE1lc3NhZ2UuaGVpZ2h0O1xuICAgICAgICAgICAgY29udmVyc2F0aW9uLmluc2VydENoaWxkKG1lc3NhZ2VDb3VudCwgbmV4dE1lc3NhZ2UpO1xuICAgICAgICAgICAgY29uc3Qgbm9kZXMgPSBbXTtcbiAgICAgICAgICAgIG5vZGVzLnB1c2goY29udmVyc2F0aW9uLmNoaWxkcmVuW2NvbnZlcnNhdGlvbi5jaGlsZHJlbi5sZW5ndGggLSAxXSk7XG4gICAgICAgICAgICBmaWdtYS52aWV3cG9ydC5zY3JvbGxBbmRab29tSW50b1ZpZXcobm9kZXMpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbi8vVXNlZCB0byBjbG9uZSBmaWxscywgZXRjLiBzbyB0aGV5IGNhbiBiZSBzZXQuXG5mdW5jdGlvbiBjbG9uZSh2YWwpIHtcbiAgICBjb25zdCB0eXBlID0gdHlwZW9mIHZhbDtcbiAgICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09PSAndW5kZWZpbmVkJyB8fCB0eXBlID09PSAnbnVtYmVyJyB8fFxuICAgICAgICB0eXBlID09PSAnc3RyaW5nJyB8fCB0eXBlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKHZhbCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsLm1hcCh4ID0+IGNsb25lKHgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWwgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkodmFsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBvID0ge307XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB2YWwpIHtcbiAgICAgICAgICAgICAgICBvW2tleV0gPSBjbG9uZSh2YWxba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyAndW5rbm93bic7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9