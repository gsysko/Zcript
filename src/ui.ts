import './ui.css'

const composer = document.getElementById("composer") as HTMLFormElement;
composer.onsubmit = function() {return sendAndClear()}

window.onload = function() {
  parent.postMessage({ pluginMessage: { type: 'setup'} }, '*');
  document.getElementById('message').focus();
};

function sendAndClear() {
  const textbox = document.getElementById('message') as HTMLInputElement;
  const message = textbox.value;
  const direction = document.getElementById('direction') as HTMLInputElement;
  parent.postMessage({ pluginMessage: { type: 'create-message', message: message, direction: direction.checked } }, '*');
  direction.checked = !direction.checked
  textbox.value = "";
  textbox.focus();
  return false;
}

onmessage = (event) => {
  if (event.data.pluginMessage == true){
    const direction = document.getElementById('direction') as HTMLInputElement;
    direction.checked = !direction.checked
  }
}