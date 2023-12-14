 
const newgame = document.getElementById("new-game");
const startgamebutton = document.getElementById("start-game");
const selectedMode = document.getElementById("mode").value;
const gamecontainer = document.getElementById("game-container");
const questioncontainer = document.getElementById("question-container");
const modedisplay = document.getElementById("modedisplay");
let timer;
let seconds = 100;
let isPaused = false;
function startTimer() {
  // Clear any existing timers
  clearInterval(timer);

  // Set up a new timer
  timer = setInterval(function () {
    // Update the display
    document.getElementById("timer").innerText = seconds;

    if (seconds === 0) {
      clearInterval(timer); // Stop the timer
      alert("Game Over! your score is"  + " " + score ); 
      gamecontainer.style.display = "block"
     questioncontainer.style.display = "none"
     maingame.style.display = "none"
     seconds = 100;
     score = "";
     selectedMode = "";
     
     startTimer();
    } else {
      seconds--; // Decrement the timer
    }
    

  }, 1000); 
  
 
}
function pauseTimer() {
  isPaused = true;
  clearInterval(timer);
}
function continueTimer() {
  isPaused = false;
  startTimer();
}

function startgame(event) {
  event.preventDefault();
  document.getElementById("score").innerText = 0;
  const newgame = document.getElementById("new-game");
  const startgamebutton = document.getElementById("start-game");
  const selectedMode = document.getElementById("mode").value;
  const gamecontainer = document.getElementById("game-container");
  const questioncontainer = document.getElementById("question-container");
  const modedisplay = document.getElementById("modedisplay");
  const correctdisplay = document.getElementById("correct-answer-display"); 

  gamecontainer.style.display = "none";
  questioncontainer.style.display = "block";
  // this is to display the selected mode of the game
  modedisplay.innerHTML = selectedMode;
  const maingame = document.getElementById("maingame")
  maingame.style.display = "block"
  correctdisplay.style.display = "none"
  startTimer();
 
}
startgamebutton.addEventListener("click", startgame);

let score = 0;
let currentCountry;

// Function to fetch a random country and its flag
function fetchRandomCountry() {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      currentCountry = data[randomIndex];
      
      const flagUrl = currentCountry.flags.png;
      document.getElementById("flag").src = flagUrl;
    })
    .catch((error) => console.error("Error fetching data:", error));
  
}

// Function to check the user's guess weather its correct or wrong
function checkGuess() {
  const userGuess = document.getElementById("guess").value.toLowerCase();
  const countryName = currentCountry.name.common.toLowerCase();
  const correctdisplay = document.getElementById("correct-answer-display"); 
  
  
  

  if (userGuess === countryName) {
    
    score++;
    document.getElementById("score").innerText = score;
    correctdisplay.style.display = "none"
    

    fetchRandomCountry();
  } else {
    // alert("Incorrect. Try again.that is" + " " + countryName);
    correctdisplay.style.display = "block"
    correctdisplay.style.border = "1px solid black"
    correctdisplay.style.backgroundColor = "#003566"
    correctdisplay.style.width = "30%"
    correctdisplay.style.marginTop = "5px"
    correctdisplay.style.padding = "6px"
    correctdisplay.style.textAlign = "center"
    correctdisplay.style.marginLeft = "30%"

    correctdisplay.innerText = "The correct answer is" + " " + countryName;
    fetchRandomCountry();
    
  }

  document.getElementById("guess").value = "";
  
}



fetchRandomCountry();
function disablebutton(){
   document.getElementById("checkbtn").disabled = true;
   alert("click continue, to continue with the game")


}

const pausebtn = document.getElementById("pause");
pausebtn.addEventListener("click", disablebutton)