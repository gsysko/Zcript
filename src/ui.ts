import '@zendeskgarden/css-bedrock'
import '@zendeskgarden/css-buttons'
// import '@zendeskgarden/css-forms'
import './ui.css'
import imgBot from './img_bot.png'
import imgHuman from './img_human.png'

var isBot = true

// const composer = document.getElementById("composer") as HTMLFormElement;
// composer.onsubmit = function() {return sendAndClear()}

let input = document.getElementById("message") as HTMLInputElement
input.onkeydown = event => {if(event.key == "Enter")sendAndClear()}
let sendButton = document.getElementById("send") as HTMLInputElement
sendButton.onclick = event => sendAndClear()

let participantButton = document.getElementById("participant") as HTMLButtonElement
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
  const direction = document.getElementById('direction') as HTMLInputElement;
  parent.postMessage({ pluginMessage: { type: 'create-message', message: message, direction: direction.checked, isBot: isBot} }, '*');
  direction.checked = !direction.checked
  textbox.value = "";
  textbox.focus();
  return false;
}