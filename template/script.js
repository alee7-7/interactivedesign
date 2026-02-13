const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  //==============================================================
  //❓Create a new speech recognition
  //==============================================================
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";          // Set language to English
    recognition.continuous = true;       // Keep listening until stopped
    recognition.interimResults = true;   // Show partial results while speaking

  //==============================================================
  //❓Start recognition when "#startBtn" button is clicked
  //==============================================================
    document.querySelector("#startBtn").addEventListener("click", () => {
      recognition.start(); // Start listening
      document.querySelector("#startBtn").style.display = "none"; // Hide button after click
    });

  //==============================================================
  //✅ Define keywords and what happens when they are spoken
  //==============================================================
    const keywords = {
      "Interactive Design": () => {
        document.querySelector("#mainText").className = "variable1";   // Select "#mainText" > Set class "variable1"
        document.querySelector("#image").src = "./img/fish.png";       // Select "#image" > Set image source
        document.body.style.backgroundColor = "#19b9e5";             // Select "body" > Set background color
     // document.body.style.backgroundImage = "url('./img/sea.jpg')";  // Select "body" > Set background image
      },
      "Learning": () => {
        document.querySelector("#mainText").className = "variable1";
        document.querySelector("#image").src = "./img/bird.png";
        document.body.style.backgroundColor = "#86f5ff";
     // document.body.style.backgroundImage = "url('./img/sky.jpg')"; 
      },
      "Growing": () => {
        document.querySelector("#mainText").className = "variable2";
        document.querySelector("#image").src = "./img/rabbit.png";
        document.body.style.backgroundColor = "#75ff75";
     // document.body.style.backgroundImage = "url('./img/grass.jpg')"; 
      },
    };

  //==============================================================
  //❓Process recognized speech results
  //==============================================================
    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      document.querySelector("#mainText").textContent = transcript; // Show what user said
      const lowerTranscript = transcript.toLowerCase();
      for (const key in keywords) { 
        if (lowerTranscript.includes(key.toLowerCase())) { // Check if keyword is spoken
          document.querySelector("#mainText").textContent = key; // Display the keyword
          keywords[key](); // Run the keyword action
          break; // Stop checking after first match
        }
      }
    };

  //==============================================================
  //❓Restart recognition automatically when it ends
  //==============================================================
    recognition.onend = () => {
      recognition.start();
    };

  //==============================================================
}
