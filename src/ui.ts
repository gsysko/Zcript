import '@zendeskgarden/css-bedrock'
import '@zendeskgarden/css-buttons'
// import '@zendeskgarden/css-forms'
import './ui.css'
import imgBot from './img_bot.png'
import imgHuman from './img_human.png'

var isBot = true

// const composer = document.getElementById("composer") as HTMLFormElement;
// composer.onsubmit = function() {return sendAndClear()}
const direction = document.getElementById('direction') as HTMLInputElement;
direction.onchange = event => {
  let actions = document.getElementsByClassName('agent-actions')
  Array.prototype.forEach.call(actions, function(action) {
    action.style.visibility = direction.checked ? "hidden" : "visible"
    action.style.opacity = direction.checked ? "0" : "1"
  });
}

const input = document.getElementById("message") as HTMLInputElement
input.onkeydown = event => {if(event.key == "Enter")sendAndClear()}
const sendButton = document.getElementById("send") as HTMLInputElement
sendButton.onclick = event => sendAndClear()

const imgButton = document.getElementById("image") as HTMLButtonElement
imgButton.onclick = event => {sendImage()}
const fileButton = document.getElementById("file") as HTMLButtonElement
fileButton.onclick = event => {sendFile()}
const quickReplyButton = document.getElementById("quick_reply") as HTMLButtonElement
quickReplyButton.onclick = event => {sendQuickReply()}

const participantButton = document.getElementById("participant") as HTMLButtonElement
participantButton.onclick = event => {
  isBot = !isBot
  if (isBot) {participantButton.getElementsByTagName("img")[0].setAttribute("src", imgBot)}
  else {participantButton.getElementsByTagName("img")[0].setAttribute("src", imgHuman)}
}

window.onload = function() {
  parent.postMessage({ pluginMessage: { type: 'setup'} }, '*');
  document.getElementById('message').focus();
};

function sendAndClear() {
  const textbox = document.getElementById('message') as HTMLInputElement;
  const message = textbox.value;
  parent.postMessage({ pluginMessage: { type: 'create-message', messageType: "text", message: message, direction: direction.checked, isBot: isBot} }, '*');
  //Experimenting with no longer alternating direction automoatically - maybe later this should be a user selected option.
  // direction.checked = !direction.checked
  textbox.value = "";
  textbox.focus();
}

function sendImage() {
  const direction = document.getElementById('direction') as HTMLInputElement;
  parent.postMessage({ pluginMessage: { type: 'create-message', messageType: "image", message: null, direction: direction.checked, isBot: isBot} }, '*');
}
function sendFile() {
  const direction = document.getElementById('direction') as HTMLInputElement;
  parent.postMessage({ pluginMessage: { type: 'create-message', messageType: "file", message: null, direction: direction.checked, isBot: isBot} }, '*');
}
function sendQuickReply() {
  const direction = document.getElementById('direction') as HTMLInputElement;
  parent.postMessage({ pluginMessage: { type: 'create-message', messageType: "quick reply", message: null, direction: direction.checked, isBot: isBot} }, '*');
}