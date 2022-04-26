"use strict";
//DOM Elements

const terminalScreen = document.getElementById("terminal-screen");
const registrationScreen = document.getElementById("registration-screen");
const gameArea = document.getElementById("game-area");
const winScreen = document.getElementById("win-screen");
const loseScreen = document.getElementById("lost-screen");
const startBtn = document.getElementById("start-btn");
const loginBtn = document.getElementById("login-btn");

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
let finishTimer = false;
let timeInterval;
let userData;

startTimer === true; //TODO --> Remove this line after player "Enter" in the game area

virusImg.addEventListener("click", counterClick);

//--- OBJECT --- //
class Player {
  constructor(userName, score) {
    this.userName = userName;
    this.score = score;
  }
}

let playersObj = [];

//--- FUNCTIONS ---//
function storagePlayer() {
  let user = nickName.value;
  console.log(user);
  let score = scoreEl.textContent;
  let players = new Player(user, score);
  playersObj.push(players);
  localStorage.setItem("players", JSON.stringify(playersObj));
}

function counterClick() {
  if (finishTimer === true) {
    return counterClick;
  } else if (totalClicked === 20) {
    winGame();
  } else {
    startTimer === true;
    totalClicked += 1;
    scoreEl.textContent = totalClicked;
    console.log(totalClicked);
  }
}

function counterTime() {
  if (timeleft === -1) {
    loseGame();
    startTimer = false;
    finishTimer = true;
  } else {
    timerEl.textContent = timeleft;
    timeleft -= 1;
    startTimer = true;
  }
}

//startGame(); //TODO --> Add StartGame() after Enter in the game area

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

function restartGame() {
  clearTimeout(timeInterval);
}

startBtn.addEventListener("click", registration);
loginBtn.addEventListener("click", startGame);

function registration() {
  terminalScreen.style.display = "none";
  registrationScreen.style.display = "block";
  terminalShow = true;
}

function startGame() {
  terminalScreen.style.display = "none";
  registrationScreen.style.display = "none";
  gameArea.style.display = "flex";
  timeInterval = setInterval(counterTime, 1000);
  userName.textContent = `${nickName}`;
  console.log(nickName);
}
