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
    // debugger;
    conversation = figma.currentPage.findOne(node => node.type === "FRAME" && node.name == "Conversation");
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this...
    if (msg.type === 'create-message') {
        // debugger
        yield sendMessage(msg.message, msg.direction);
        doTherapy(msg.message);
    }
    else if (msg.type === 'setup') {
        //If there is not a conversation...
        if (!conversation) {
            //Make a conversation frame
            conversation = figma.createFrame();
            conversation.name = "Conversation";
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
            let inboundMessageComponent = figma.root.findOne(node => node.name == "message/inbound" && node.type === "COMPONENT");
            let firstMessage = inboundMessageComponent === null || inboundMessageComponent === void 0 ? void 0 : inboundMessageComponent.createInstance();
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
function sendMessage(messageText, messageDirection) {
    return __awaiter(this, void 0, void 0, function* () {
        //Find the last message in the conversation frame...
        let lastMessage = conversation.children[conversation.children.length - 1];
        //TODO make sure this is truely the last message (i.e. they did not get shuffled)
        //Set the messageCount to the numbered name of this message
        messageCount = parseInt(lastMessage.name);
        //Create a new outbound message and set the text to the msg...
        let outboundMessageComponent = figma.root.findOne(node => node.name == "message/outbound" && node.type === "COMPONENT");
        let inboundMessageComponent = figma.root.findOne(node => node.name == "message/inbound" && node.type === "COMPONENT");
        let nextMessage = messageDirection ? outboundMessageComponent === null || outboundMessageComponent === void 0 ? void 0 : outboundMessageComponent.createInstance() : inboundMessageComponent === null || inboundMessageComponent === void 0 ? void 0 : inboundMessageComponent.createInstance();
        nextMessage.name = (++messageCount).toString();
        let message = nextMessage.findOne(node => node.type === "TEXT" && node.name == "message");
        yield figma.loadFontAsync(message.fontName).then(() => {
            // debugger;
            message.characters = messageText;
            nextMessage.y = lastMessage.y + lastMessage.height;
            conversation.insertChild(messageCount, nextMessage);
            const nodes = [];
            nodes.push(conversation.children[conversation.children.length - 1]);
            figma.viewport.scrollAndZoomIntoView(nodes);
        });
    });
}
function doTherapy(textIn) {
    let canTreat = false;
    let textOut = textIn;
    if (textIn.startsWith("I feel")) {
        canTreat = true;
        textOut = "Do you enjoy feeling" + textIn.substring(6, textIn.length) + "?";
        sendMessage(textOut, false);
    }
    else if (textIn.startsWith("Maybe")) {
        canTreat = true;
        textOut = "WHY THE UNCERTAIN TONE ?";
        sendMessage(textOut, false);
    }
    figma.ui.postMessage(canTreat);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0EsMkJBQTJCLCtEQUErRCxnQkFBZ0IsRUFBRSxFQUFFO0FBQzlHO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLHFGQUFxRjtBQUNwSDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9jb2RlLnRzXCIpO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgbWVzc2FnZUNvdW50ID0gMDtcbnZhciBjb252ZXJzYXRpb247XG4vLyBUaGlzIHBsdWdpbiB3aWxsIG9wZW4gYSB3aW5kb3cgdG8gcHJvbXB0IHRoZSB1c2VyIHRvIGVudGVyIGEgbWVzc2FnZSwgYW5kXG4vLyBpdCB3aWxsIHRoZW4gY3JlYXRlIGEgbWVzc2FnZSBzeW1ib2wgd2l0aCB0aGF0IHRleHQgb24gc2NyZWVuLlxuLy8gVGhpcyBmaWxlIGhvbGRzIHRoZSBtYWluIGNvZGUgZm9yIHRoZSBwbHVnaW5zLiBJdCBoYXMgYWNjZXNzIHRvIHRoZSAqZG9jdW1lbnQqLlxuLy8gWW91IGNhbiBhY2Nlc3MgYnJvd3NlciBBUElzIGluIHRoZSA8c2NyaXB0PiB0YWcgaW5zaWRlIFwidWkuaHRtbFwiIHdoaWNoIGhhcyBhXG4vLyBmdWxsIGJyb3dzZXIgZW52aXJvbm1lbnQgKHNlZSBkb2N1bWVudGF0aW9uKS5cbi8vIFRoaXMgc2hvd3MgdGhlIEhUTUwgcGFnZSBpbiBcInVpLmh0bWxcIi5cbmZpZ21hLnNob3dVSShfX2h0bWxfXyk7XG5maWdtYS51aS5yZXNpemUoNDAwLCA0OCk7XG4vLyBDYWxscyB0byBcInBhcmVudC5wb3N0TWVzc2FnZVwiIGZyb20gd2l0aGluIHRoZSBIVE1MIHBhZ2Ugd2lsbCB0cmlnZ2VyIHRoaXNcbi8vIGNhbGxiYWNrLiBUaGUgY2FsbGJhY2sgd2lsbCBiZSBwYXNzZWQgdGhlIFwicGx1Z2luTWVzc2FnZVwiIHByb3BlcnR5IG9mIHRoZVxuLy8gcG9zdGVkIG1lc3NhZ2UuXG5maWdtYS51aS5vbm1lc3NhZ2UgPSAobXNnKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgLy8gTG9vayBmb3IgYSAnQ29udmVyc2F0aW9uJyBmcmFtZS4uLlxuICAgIC8vIGRlYnVnZ2VyO1xuICAgIGNvbnZlcnNhdGlvbiA9IGZpZ21hLmN1cnJlbnRQYWdlLmZpbmRPbmUobm9kZSA9PiBub2RlLnR5cGUgPT09IFwiRlJBTUVcIiAmJiBub2RlLm5hbWUgPT0gXCJDb252ZXJzYXRpb25cIik7XG4gICAgLy8gT25lIHdheSBvZiBkaXN0aW5ndWlzaGluZyBiZXR3ZWVuIGRpZmZlcmVudCB0eXBlcyBvZiBtZXNzYWdlcyBzZW50IGZyb21cbiAgICAvLyB5b3VyIEhUTUwgcGFnZSBpcyB0byB1c2UgYW4gb2JqZWN0IHdpdGggYSBcInR5cGVcIiBwcm9wZXJ0eSBsaWtlIHRoaXMuLi5cbiAgICBpZiAobXNnLnR5cGUgPT09ICdjcmVhdGUtbWVzc2FnZScpIHtcbiAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgeWllbGQgc2VuZE1lc3NhZ2UobXNnLm1lc3NhZ2UsIG1zZy5kaXJlY3Rpb24pO1xuICAgICAgICBkb1RoZXJhcHkobXNnLm1lc3NhZ2UpO1xuICAgIH1cbiAgICBlbHNlIGlmIChtc2cudHlwZSA9PT0gJ3NldHVwJykge1xuICAgICAgICAvL0lmIHRoZXJlIGlzIG5vdCBhIGNvbnZlcnNhdGlvbi4uLlxuICAgICAgICBpZiAoIWNvbnZlcnNhdGlvbikge1xuICAgICAgICAgICAgLy9NYWtlIGEgY29udmVyc2F0aW9uIGZyYW1lXG4gICAgICAgICAgICBjb252ZXJzYXRpb24gPSBmaWdtYS5jcmVhdGVGcmFtZSgpO1xuICAgICAgICAgICAgY29udmVyc2F0aW9uLm5hbWUgPSBcIkNvbnZlcnNhdGlvblwiO1xuICAgICAgICAgICAgY29udmVyc2F0aW9uLnJlc2l6ZSg0ODAsIDE4MDApO1xuICAgICAgICAgICAgbGV0IGJnUGFpbnQgPSBmaWdtYS5nZXRMb2NhbFBhaW50U3R5bGVzKCkuZmluZChwYWludFN0eWxlID0+IHBhaW50U3R5bGUubmFtZSA9PSBcIkJHXCIpLnBhaW50c1swXTtcbiAgICAgICAgICAgIGxldCBmaWxscyA9IGNsb25lKGNvbnZlcnNhdGlvbi5maWxscyk7XG4gICAgICAgICAgICBmaWxsc1swXS5jb2xvciA9IGJnUGFpbnQuY29sb3I7XG4gICAgICAgICAgICBjb252ZXJzYXRpb24uZmlsbHMgPSBmaWxscztcbiAgICAgICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLmFwcGVuZENoaWxkKGNvbnZlcnNhdGlvbik7XG4gICAgICAgICAgICBjb25zdCBub2RlcyA9IFtdO1xuICAgICAgICAgICAgbm9kZXMucHVzaChjb252ZXJzYXRpb24pO1xuICAgICAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gbm9kZXM7XG4gICAgICAgICAgICBmaWdtYS52aWV3cG9ydC5zY3JvbGxBbmRab29tSW50b1ZpZXcobm9kZXMpO1xuICAgICAgICB9XG4gICAgICAgIC8vTm93IHRoYXQgd2UgYXJlIHN1cmUgdGhlcmUgaXMgYSBjb252ZXJzYXRpb24uLi5cbiAgICAgICAgLy9DaGVjayBpZiB0aGVyZSBpcyBhbnkgbWVzc2FnZXMuLi5cbiAgICAgICAgdmFyIGZpcnN0TWVzc2FnZSA9IGNvbnZlcnNhdGlvbi5maW5kQ2hpbGQobm9kZSA9PiBub2RlLm5hbWUgPT0gXCIwXCIgJiYgbm9kZS50eXBlID09PSBcIklOU1RBTkNFXCIpO1xuICAgICAgICAvL0lmIHRoZXJlIGlzIG5vIGZpcnN0IG1lc3NhZ2UuLi5cbiAgICAgICAgaWYgKCFmaXJzdE1lc3NhZ2UpIHtcbiAgICAgICAgICAgIC8vQ3JlYXRlIGEgZmlyc3Qgd2VsY29tZSBtZXNzc2FnZS4uLlxuICAgICAgICAgICAgbGV0IGluYm91bmRNZXNzYWdlQ29tcG9uZW50ID0gZmlnbWEucm9vdC5maW5kT25lKG5vZGUgPT4gbm9kZS5uYW1lID09IFwibWVzc2FnZS9pbmJvdW5kXCIgJiYgbm9kZS50eXBlID09PSBcIkNPTVBPTkVOVFwiKTtcbiAgICAgICAgICAgIGxldCBmaXJzdE1lc3NhZ2UgPSBpbmJvdW5kTWVzc2FnZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBpbmJvdW5kTWVzc2FnZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogaW5ib3VuZE1lc3NhZ2VDb21wb25lbnQuY3JlYXRlSW5zdGFuY2UoKTtcbiAgICAgICAgICAgIC8vVE9ETyBMb29rIGludG8gYWRkaW5nIGNvbnN0cmFpbnRzXG4gICAgICAgICAgICBmaXJzdE1lc3NhZ2UubmFtZSA9IFwiMFwiO1xuICAgICAgICAgICAgbWVzc2FnZUNvdW50ID0gMDtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbi5pbnNlcnRDaGlsZCgwLCBmaXJzdE1lc3NhZ2UpO1xuICAgICAgICAgICAgY29uc3Qgbm9kZXMgPSBbXTtcbiAgICAgICAgICAgIG5vZGVzLnB1c2goY29udmVyc2F0aW9uLmNoaWxkcmVuWzBdKTtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbi5sYXlvdXRNb2RlID0gXCJWRVJUSUNBTFwiO1xuICAgICAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gbm9kZXM7XG4gICAgICAgICAgICBmaWdtYS52aWV3cG9ydC5zY3JvbGxBbmRab29tSW50b1ZpZXcobm9kZXMpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5mdW5jdGlvbiBzZW5kTWVzc2FnZShtZXNzYWdlVGV4dCwgbWVzc2FnZURpcmVjdGlvbikge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vRmluZCB0aGUgbGFzdCBtZXNzYWdlIGluIHRoZSBjb252ZXJzYXRpb24gZnJhbWUuLi5cbiAgICAgICAgbGV0IGxhc3RNZXNzYWdlID0gY29udmVyc2F0aW9uLmNoaWxkcmVuW2NvbnZlcnNhdGlvbi5jaGlsZHJlbi5sZW5ndGggLSAxXTtcbiAgICAgICAgLy9UT0RPIG1ha2Ugc3VyZSB0aGlzIGlzIHRydWVseSB0aGUgbGFzdCBtZXNzYWdlIChpLmUuIHRoZXkgZGlkIG5vdCBnZXQgc2h1ZmZsZWQpXG4gICAgICAgIC8vU2V0IHRoZSBtZXNzYWdlQ291bnQgdG8gdGhlIG51bWJlcmVkIG5hbWUgb2YgdGhpcyBtZXNzYWdlXG4gICAgICAgIG1lc3NhZ2VDb3VudCA9IHBhcnNlSW50KGxhc3RNZXNzYWdlLm5hbWUpO1xuICAgICAgICAvL0NyZWF0ZSBhIG5ldyBvdXRib3VuZCBtZXNzYWdlIGFuZCBzZXQgdGhlIHRleHQgdG8gdGhlIG1zZy4uLlxuICAgICAgICBsZXQgb3V0Ym91bmRNZXNzYWdlQ29tcG9uZW50ID0gZmlnbWEucm9vdC5maW5kT25lKG5vZGUgPT4gbm9kZS5uYW1lID09IFwibWVzc2FnZS9vdXRib3VuZFwiICYmIG5vZGUudHlwZSA9PT0gXCJDT01QT05FTlRcIik7XG4gICAgICAgIGxldCBpbmJvdW5kTWVzc2FnZUNvbXBvbmVudCA9IGZpZ21hLnJvb3QuZmluZE9uZShub2RlID0+IG5vZGUubmFtZSA9PSBcIm1lc3NhZ2UvaW5ib3VuZFwiICYmIG5vZGUudHlwZSA9PT0gXCJDT01QT05FTlRcIik7XG4gICAgICAgIGxldCBuZXh0TWVzc2FnZSA9IG1lc3NhZ2VEaXJlY3Rpb24gPyBvdXRib3VuZE1lc3NhZ2VDb21wb25lbnQgPT09IG51bGwgfHwgb3V0Ym91bmRNZXNzYWdlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvdXRib3VuZE1lc3NhZ2VDb21wb25lbnQuY3JlYXRlSW5zdGFuY2UoKSA6IGluYm91bmRNZXNzYWdlQ29tcG9uZW50ID09PSBudWxsIHx8IGluYm91bmRNZXNzYWdlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBpbmJvdW5kTWVzc2FnZUNvbXBvbmVudC5jcmVhdGVJbnN0YW5jZSgpO1xuICAgICAgICBuZXh0TWVzc2FnZS5uYW1lID0gKCsrbWVzc2FnZUNvdW50KS50b1N0cmluZygpO1xuICAgICAgICBsZXQgbWVzc2FnZSA9IG5leHRNZXNzYWdlLmZpbmRPbmUobm9kZSA9PiBub2RlLnR5cGUgPT09IFwiVEVYVFwiICYmIG5vZGUubmFtZSA9PSBcIm1lc3NhZ2VcIik7XG4gICAgICAgIHlpZWxkIGZpZ21hLmxvYWRGb250QXN5bmMobWVzc2FnZS5mb250TmFtZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvLyBkZWJ1Z2dlcjtcbiAgICAgICAgICAgIG1lc3NhZ2UuY2hhcmFjdGVycyA9IG1lc3NhZ2VUZXh0O1xuICAgICAgICAgICAgbmV4dE1lc3NhZ2UueSA9IGxhc3RNZXNzYWdlLnkgKyBsYXN0TWVzc2FnZS5oZWlnaHQ7XG4gICAgICAgICAgICBjb252ZXJzYXRpb24uaW5zZXJ0Q2hpbGQobWVzc2FnZUNvdW50LCBuZXh0TWVzc2FnZSk7XG4gICAgICAgICAgICBjb25zdCBub2RlcyA9IFtdO1xuICAgICAgICAgICAgbm9kZXMucHVzaChjb252ZXJzYXRpb24uY2hpbGRyZW5bY29udmVyc2F0aW9uLmNoaWxkcmVuLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgICAgIGZpZ21hLnZpZXdwb3J0LnNjcm9sbEFuZFpvb21JbnRvVmlldyhub2Rlcyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZG9UaGVyYXB5KHRleHRJbikge1xuICAgIGxldCBjYW5UcmVhdCA9IGZhbHNlO1xuICAgIGxldCB0ZXh0T3V0ID0gdGV4dEluO1xuICAgIGlmICh0ZXh0SW4uc3RhcnRzV2l0aChcIkkgZmVlbFwiKSkge1xuICAgICAgICBjYW5UcmVhdCA9IHRydWU7XG4gICAgICAgIHRleHRPdXQgPSBcIkRvIHlvdSBlbmpveSBmZWVsaW5nXCIgKyB0ZXh0SW4uc3Vic3RyaW5nKDYsIHRleHRJbi5sZW5ndGgpICsgXCI/XCI7XG4gICAgICAgIHNlbmRNZXNzYWdlKHRleHRPdXQsIGZhbHNlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGV4dEluLnN0YXJ0c1dpdGgoXCJNYXliZVwiKSkge1xuICAgICAgICBjYW5UcmVhdCA9IHRydWU7XG4gICAgICAgIHRleHRPdXQgPSBcIldIWSBUSEUgVU5DRVJUQUlOIFRPTkUgP1wiO1xuICAgICAgICBzZW5kTWVzc2FnZSh0ZXh0T3V0LCBmYWxzZSk7XG4gICAgfVxuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKGNhblRyZWF0KTtcbn1cbi8vVXNlZCB0byBjbG9uZSBmaWxscywgZXRjLiBzbyB0aGV5IGNhbiBiZSBzZXQuXG5mdW5jdGlvbiBjbG9uZSh2YWwpIHtcbiAgICBjb25zdCB0eXBlID0gdHlwZW9mIHZhbDtcbiAgICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09PSAndW5kZWZpbmVkJyB8fCB0eXBlID09PSAnbnVtYmVyJyB8fFxuICAgICAgICB0eXBlID09PSAnc3RyaW5nJyB8fCB0eXBlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKHZhbCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsLm1hcCh4ID0+IGNsb25lKHgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWwgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkodmFsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBvID0ge307XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB2YWwpIHtcbiAgICAgICAgICAgICAgICBvW2tleV0gPSBjbG9uZSh2YWxba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyAndW5rbm93bic7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9