"use strict";

//DOM Elements
let virusImg = document.getElementById("virus-image");
let scoreEl = document.querySelector(".score");
let timerEl = document.getElementById("timer");
let gameAreaEl = document.querySelector(".game-area");
let winScreenEl = document.querySelector(".win-screen ");
let loseScreenEl = document.querySelector(".lose-screen ");

//Global Variables
let timeleft = 10;
let totalClicked = 0;
let startTimer = false;
let finishTimer = false;
let timeInterval;

startTimer === true; //TODO --> Remove this line after player "Enter" in the game area

virusImg.addEventListener("click", counterClick);

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

function startGame() {
  timeInterval = setInterval(counterTime, 1000);
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

function restartGame() {
  clearTimeout(timeInterval);
}
