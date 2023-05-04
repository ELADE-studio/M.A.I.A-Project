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

    // Use the GPT-3.5 API to generate a response in speech format
    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_API_KEY", // Replace YOUR_API_KEY with your actual API key
      },
      body: JSON.stringify({
        prompt: transcript,
        max_tokens: 50,
        temperature: 0.5,
        stop: "\n",
        model: "davinci",
      }),
    })
      .then((response) => {
        if (response.status === 429) {
          // Check if the response status is 429
          throw new Error(
            "ERROR 1 : I'm sorry, but you have already used all your API Tokens."
          );
        } else if (!response.ok) {
          // Check if the response status is not ok
          throw new Error(
            "ERROR 2 : I'm sorry, but I'm having trouble with your API key. Are you sure you've registered it in the right place and that it's valid?"
          );
        } else {
          return response.json();
        }
      })
      .then((data) => {
        // Display the response in the output area using speech synthesis
        let speech = new SpeechSynthesisUtterance(data.choices[0].text);
        window.speechSynthesis.speak(speech);
        outputArea.innerHTML = data.choices[0].text;
      })
      .catch((error) => {
        console.error(error);
        outputArea.innerHTML = error.message;
      });
  };
}
