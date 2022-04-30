"use strict";
//DOM Elements

const terminalScreen = document.getElementById("terminal-screen");
const registrationScreen = document.getElementById("registration-screen");
const gameArea = document.getElementById("game-area");
const winScreen = document.getElementById("win-screen");
const loseScreen = document.getElementById("lost-screen");
const startBtn = document.getElementById("start-btn");
const loginBtn = document.getElementById("login-btn");
const tryAgainBtn = document.getElementById("try-again");
const homePage = document.getElementById("home-page");
let nickName = document.getElementById("login");
let timer = document.getElementById("timer-number");
let userName = document.getElementById("user-name");

let virusImg = document.getElementById("virus-image");
let scoreEl = document.querySelector(".score");
let timerEl = document.getElementById("timer");
let gameAreaEl = document.querySelector(".game-area");
let winScreenEl = document.querySelector(".win-screen ");
let loseScreenEl = document.querySelector(".lose-screen ");

//Global Variables
let terminalShow = false;
let gameShow = false;
let timeleft = 10;
let totalClicked = 0;
let startTimer = false;
let timeInterval;
let userData;

// EventListeners //

startBtn.addEventListener("click", registration);
loginBtn.addEventListener("click", startGame);
tryAgainBtn.addEventListener("click", tryAgain);
homePage.addEventListener("click", goHome);
virusImg.addEventListener("click", counterClick);

// TypeText
let myText =
    "This is a message from Assembler School. The academy main server has been hacked.The virus is highly dangerous, its origin is unknown but it seems to be from deep Almeria. We need the help of all students. No teacher has been able to remove the virus from our system. Now it's your turn to show off your skills as a programmer.",
  i = 0;

window.onload = function () {
  console.log(window.onload);
  let typeWriter = setInterval(function () {
    document.getElementById("mytext").textContent += myText[i];
    i++;
    if (i > myText.length - 1) {
      clearInterval(typeWriter);
    }
  }, 50);
};

/////////////////////////////////
//*** LOCAL STORAGEDATA SECTION ***//
/////////////////////////////////

//--- Object Constructor --- //
class Player {
  constructor(userName, userScore) {
    this.userName = userName;
    this.userScore = userScore;
  }
}

let playersObj = [];

function storagePlayer() {
  for (i = 1; i < Player.length; i++) {
    let user = nickName.value;
    let score = scoreEl.textContent;
    let players = new Player(user, score);
    playersObj.push(players);
    localStorage.setItem("players", JSON.stringify(playersObj));
  }
}

/////////////////////////////////
//*** DISPLAY SCREEN SECTION ***//
/////////////////////////////////
function registration() {
  terminalScreen.style.display = "none";
  registrationScreen.style.display = "block";
  terminalShow = true;
}

function startGame() {
  userData = nickName.value;
  terminalScreen.style.display = "none";
  registrationScreen.style.display = "none";
  gameArea.style.display = "flex";
  timeInterval = setInterval(counterTime, 1000);
  userName.textContent = userData;
}

function winGame() {
  winScreenEl.style.display = "flex";
  gameAreaEl.style.display = "none";
  clearTimeout(timeInterval);
  return counterClick;
}

function loseGame() {
  loseScreenEl.style.display = "flex";
  gameAreaEl.style.display = "none";
}

/////////////////////////////////
//*** GAME MECANISM SECTION ***//
/////////////////////////////////
/* click interaction*/
function counterClick() {
  if (totalClicked === 5) {
    winGame();
    console.log(totalClicked);
  } else {
    startTimer === true;
    totalClicked += 1;
    scoreEl.textContent = totalClicked;
    console.log(totalClicked);
  }
}

/* Timer counting */
function counterTime() {
  if (timeleft === -1) {
    loseGame();
    stopTimer();
    startTimer = false;
  } else {
    timerEl.textContent = timeleft;
    timeleft -= 1;
    startTimer = true;
  }
}

/* Virus effect */
let object = document.getElementById("virus-image");
object.onclick = function () {
  let x = Math.floor(Math.random() * 300);
  let y = Math.floor(Math.random() * 700);
  object.style.top = x + "px";
  object.style.left = y + "px";
};

/////////////////////////////////
//*** DISPLAY SCOREBOARD SECTION ***//
/////////////////////////////////

let highScoreList = document.getElementById("ranking");

function gethighScore() {
  let userPlayers = JSON.parse(localStorage.getItem("players"));

  //number sort
  let scoreSort = userPlayers.sort((a, b) => b.userScore - a.userScore);

  let highScore = JSON.stringify(scoreSort);
  localStorage.setItem("players", highScore);

  highScoreList.innerHTML = scoreSort
    .map((score) => {
      return `<div class="highScore">${score.userName} - ${score.userScore}</div>`;
    })
    .join("");
  highScoreList.style.display = "flex";
}

/////////////////////////////////
//*** RESET GAME SECTION ***//
/////////////////////////////////

function stopTimer() {
  clearTimeout(timeInterval);
  timerEl.textContent = "";
}

function resetGlobalValues() {
  totalClicked = 0;
  timeleft = 10;
  startTimer = false;
  terminalShow = false;
  gameShow = false;
}

function tryAgain() {
  resetGlobalValues();
  stopTimer();
  //Display game area
  gameArea.style.display = "flex";
  terminalScreen.style.display = "none";
  registrationScreen.style.display = "none";
  loseScreenEl.style.display = "none";
  //Reset score in the game screen area
  scoreEl.textContent = "0";
  //Start game timer
  timeInterval = setInterval(counterTime, 1000);
}

function goHome() {
  resetGlobalValues();
  storagePlayer();
  stopTimer();
  gethighScore();

  //Display home page
  terminalScreen.style.display = "flex";
  registrationScreen.style.display = "none";
  gameArea.style.display = "none";
  loseScreenEl.style.display = "none";

  // Reset user name and score in the home page
  userName.textContent = "";
  scoreEl.textContent = "0";
}
