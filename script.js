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
      "Welcome": () => {
        document.querySelector("#mainText").className = "variable0";
        document.querySelector("#image").src = "./img/P1a.png"
        document.body.style.backgroundColor = "black";
      },
      "lecture": () => {
        document.querySelector("#mainText").className = "variable1";
        document.querySelector("#image").src = "./img/P1b-1.png"
        document.body.style.backgroundColor = "white";
        document.querySelector("#mainText").textContent = "Tiri Kananuruk";
      },
      "February 27": () => {
        document.querySelector("#mainText").className = "variable2";
        document.querySelector("#image").src = "./img/P1c-1.png"
        document.body.style.backgroundColor = "white";
      },
      "808": () =>{
        document.querySelector("#mainText").className = "variable3";
        document.querySelector("#image").src = "./img/P1d-1.png"
        document.body.style.backgroundColor = "white";
      },
      "See you then": () =>{
        document.querySelector("#mainText").className = "variable4";
        document.querySelector("#image").src = "./img/P1d-2.png"
        document.body.style.backgroundColor = "white";
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
