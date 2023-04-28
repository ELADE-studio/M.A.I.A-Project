function listen() {
  let inputArea = document.getElementById("input-area");
  let outputArea = document.getElementById("output-area");

  var recognition = new webkitSpeechRecognition();
  recognition.lang = "en-GB";
  recognition.start();

  recognition.onresult = function (event) {
    let transcript = event.results[0][0].transcript;
    inputArea.innerHTML = event.results[0][0].transcript;

    if (transcript.includes("hello")) {
      outputArea.innerHTML = "Hello, User!";
    } else if (transcript.includes("weather")) {
      window.open("https://www.google.com/search?q=weather");
    } else {
      outputArea.innerHTML = "I don't know what you mean.";
    }
  };
}
