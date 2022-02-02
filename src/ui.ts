import './ui.css'
const DAVINCI_URL = 'https://api.openai.com/v1/engines/text-davinci-001/completions';
const CURIE_URL = 'https://api.openai.com/v1/engines/text-curie-001/completions';
const BABBAGE_URL = 'https://api.openai.com/v1/engines/text-babbage-001/completions';
const ADA_URL = 'https://api.openai.com/v1/engines/text-ada-001/completions';

var messageLog = "The following is a conversation with an AI assistant named Answer Bot. Answer Bot is helpful, creative, clever, and very friendly.\n\nHuman:Hello\nAnswer Bot:Hello. What is your name?\nHuman:My name is Graham.\nAnswer Bot:Nice to meet you Graham. How can I help?"

//Print message and clear composer when the send button is pressed.
const composer = document.getElementById("composer") as HTMLFormElement;
composer.onsubmit = function() {return sendAndClear()}

//Build the widget when the plugin is started.
window.onload = function() {
  parent.postMessage({ pluginMessage: { type: 'setup'} }, '*');
  document.getElementById('message').focus();
};

//Function to communicate the message to code.ts and clear the text from the input.
function sendAndClear() {
  const textbox = document.getElementById('message') as HTMLInputElement;
  const message = textbox.value;
  parent.postMessage({ pluginMessage: { type: 'send-message', message: message } }, '*');
  textbox.value = "";
  textbox.focus();
  return false;
}

//On receiving an event from code.ts...
window.onmessage = async (event) => {
  //...if it is a request to fetch a response from the network...
  if (event.data.pluginMessage.type === 'networkRequest') {
    //Get the prior user message.
    var message = event.data.pluginMessage.message
    //Add it to the running message log, with labels.
    messageLog = messageLog + "\nHuman:" + message + "\nAnswer bot:"

    //Prepare a request to OpenAI API
    var request = new XMLHttpRequest()
    request.open('POST', DAVINCI_URL)
    request.setRequestHeader("Content-Type", "application/json")
    request.setRequestHeader("Authorization", "Bearer " + process.env.API_KEY)
    request.responseType = 'json'
    //On recieving a response...
    request.onload = () => {
      var response = request.response.choices[0].text
      //...add the response to the log...
      messageLog = messageLog + response
      //...and communicate it to code.ts.
      window.parent.postMessage({ pluginMessage: { type: 'receive-message', message: request.response } }, '*')
    };
    //Send API request.
    request.send(JSON.stringify({
      "prompt": messageLog ,
      "temperature": 0.9,
      "max_tokens": 60,
      "top_p": 1,
      "n": 1,
      "frequency_penalty": 0.4,
      "presence_penalty": 0.0,
      "stop": ["\n", "Human:", "Answer Bot:"]
    }))
  }
}