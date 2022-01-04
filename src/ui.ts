import './ui.css'

const composer = document.getElementById("composer") as HTMLFormElement;
composer.onsubmit = function() {return sendAndClear()}

var messageLog = "The following is a conversation with an AI assistant named Gus. The assistant is helpful, creative, clever, and very friendly.\n\n\n##\n\nHuman: Hello\nGus: Hello. What is your name?\n##\n\nHuman: My name is Graham.\nGus: Nice to meet you Graham. How can I help?"

window.onload = function() {
  parent.postMessage({ pluginMessage: { type: 'setup'} }, '*');
  document.getElementById('message').focus();
};

function sendAndClear() {
  const textbox = document.getElementById('message') as HTMLInputElement;
  const message = textbox.value;
  parent.postMessage({ pluginMessage: { type: 'send-message', message: message } }, '*');
  textbox.value = "";
  textbox.focus();
  return false;
}

window.onmessage = async (event) => {
  if (event.data.pluginMessage.type === 'networkRequest') {
    var message = event.data.pluginMessage.message
    messageLog = messageLog + "\n##\nHuman: " + message + "\nGus: "
    var request = new XMLHttpRequest()
    request.open('POST', 'https://api.openai.com/v1/engines/curie/completions')
    request.setRequestHeader("Content-Type", "application/json")
    request.setRequestHeader("Authorization", "Bearer ")
    request.responseType = 'json'
    request.onload = () => {
      var response = request.response.choices[0].text
      messageLog = messageLog + response
      window.parent.postMessage({ pluginMessage: { type: 'receive-message', message: request.response } }, '*')
    };
    request.send(JSON.stringify({
      "prompt": messageLog ,
      "temperature": 0.9,
      "max_tokens": 150,
      "top_p": 1,
      "frequency_penalty": 0.4,
      "presence_penalty": 0.8,
      "stop": ["\n", " Human:", " Gus:"]
    }))
  }
}