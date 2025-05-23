let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");
function speak(text) {
  window.speechSynthesis.cancel(); // Cancel any ongoing speech
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang = "en-US"; // More universally supported
  window.speechSynthesis.speak(text_speak);
}
function wishMe() {
  let day = new Date();
  let hours = day.getHours();
  if (hours >= 0 && hours < 12) {
    speak("Good Morning Sir");
  } else if (hours >= 12 && hours < 16) {
    speak("Good Afternoon Sir");
  } else {
    speak("Good Evening Sir");
  }
}
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
  alert("Your browser does not support Speech Recognition");
} else {
  let recognition = new SpeechRecognition();
  recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
  };
  btn.addEventListener("click", () => {
    recognition.start();
    voice.style.display = "block";
    btn.style.display = "none";
    wishMe();
  });
  function takeCommand(message) {
    voice.style.display = "none";
    btn.style.display = "inline-block";
    if (message.includes("hello") || message.includes("hey")) {
      speak("Hello sir, what can I help you with?");
    } else if (message.includes("who are you")) {
      speak("I am a virtual assistant, created by Ayush Sir.");
    } else if (message.includes("open youtube")) {
      speak("Opening YouTube...");
      window.open("https://youtube.com/", "_blank");
    } else if (message.includes("open google")) {
      speak("Opening Google...");
      window.open("https://google.com/", "_blank");
    } else if (message.includes("open facebook")) {
      speak("Opening Facebook...");
      window.open("https://facebook.com/", "_blank");
    } else if (message.includes("open instagram")) {
      speak("Opening Instagram...");
      window.open("https://instagram.com/", "_blank");
    } else if (message.includes("open whatsapp")) {
      speak("Opening WhatsApp Web...");
      window.open("https://web.whatsapp.com/", "_blank");
    } else if (message.includes("time")) {
      let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
      speak("The time is " + time);
    } else if (message.includes("date")) {
      let date = new Date().toLocaleString(undefined, { day: "numeric", month: "long" });
      speak("Today's date is " + date);
    } else {
      let finalText = "This is what I found on the internet about " + message;
      speak(finalText);
      window.open(`https://www.google.com/search?q=${message}`, "_blank");
    }
  }
}

