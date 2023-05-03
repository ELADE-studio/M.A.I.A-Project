// Function to start speech recognition and process user input
function listen() {
  let inputArea = document.getElementById("input-area"); // Get reference to the input area element
  let outputArea = document.getElementById("output-area"); // Get reference to the output area element

  var recognition = new webkitSpeechRecognition() || new SpeechRecognition(); // Create a new speech recognition object
  recognition.lang = "en-GB"; // Set the language to British English
  recognition.start(); // Start listening for user input

  // Process the user input when recognition is successful
  recognition.onresult = function (event) {
    let transcript = event.results[0][0].transcript; // Get the transcribed text from the user input
    inputArea.innerHTML = event.results[0][0].transcript; // Display the user input in the input area

    // Determine the appropriate response based on the user input
    switch (true) {
      case transcript.toLowerCase().includes("hello"):
        outputArea.innerHTML = "Hello, User! How can I help you ?";
        break;
      case transcript.toLowerCase().includes("weather"):
        window.open("https://www.google.com/search?q=weather"); // Open a new tab with a weather search on Google
        break;
      case transcript.toLowerCase().includes("time"):
        outputArea.innerHTML = new Date().toLocaleTimeString(); // Display the current time
        break;
      case transcript.toLowerCase().includes("joke"):
        // Fetch a random joke from the Chuck Norris API and display it in the output area
        fetch("https://api.chucknorris.io/jokes/random")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch joke");
            }
            return response.json();
          })
          .then((data) => (outputArea.innerHTML = data.value))
          .catch((error) => (outputArea.innerHTML = error.message));
        break;
      default:
        outputArea.innerHTML = "I don't know what you mean.";
        break;
    }
  };
}

const bubble = document.querySelector(".bubble");
const outputArea = document.querySelector(".output-area");

outputArea.addEventListener("mouseover", () => {
  bubble.classList.toggle("writting");
});
