'use strict';

const numberEl = document.querySelector('.number__box');
const scoreEl = document.querySelector('.score');
const guessEl = document.querySelector('.left__guess');
const overlayEl = document.querySelector('.overlay');
const displayedPlayernameEl = document.querySelector('.player__name');
const playernameEl = document.querySelector('.login__player');
const messageEl = document.querySelector('.left__message');
const btnNextRound = document.querySelector('.btn--nextround');
const highScoreEl = document.querySelector('.highscore');

let isVisible = false;
let secretNumber = Math.trunc(Math.random() * 30) + 1;
let score = 20;
let highScore = 0;
let playerName = '';
const arrowDown = '\u2193';

const initGame = function () {
  score = 20;
  scoreEl.textContent = score;
  displayMessage(`${arrowDown} Your guess ${arrowDown}`);
  numberEl.textContent = '?';
  guessEl.value = null;
  secretNumber = Math.trunc(Math.random() * 30) + 1;
  overlayEl.classList.toggle('hidden');
  displayedPlayernameEl.value = '';
  playerName = '';
  playerName = playernameEl.value = '';
  document.querySelector('body').style.backgroundColor = '#5da9e9';
  highScore = 0;
  highScoreEl.textContent = highScore;
  isVisible = false;
};

const newRound = function() {
  score = 20;
  scoreEl.textContent = score;
  displayMessage(`${arrowDown} Your guess ${arrowDown}`);
  numberEl.textContent = '?';
  guessEl.value = null;
  secretNumber = Math.trunc(Math.random() * 30) + 1;
  document.querySelector('body').style.backgroundColor = '#5da9e9';
  btnNextRound.classList.toggle('notVisible');
  isVisible = false;
}

const displayMessage = function (message) {
  messageEl.textContent = message;
};

const toggleError = function () {
  messageEl.classList.toggle('error');
};

const checkError = function () {
  if (document.querySelector('.left__message').classList.contains('error'))
    messageEl.classList.remove('error');
};

const gameLogic = function () {
  const guess = Number(guessEl.value);

  checkError();
  if (guess == '') {
    toggleError();
    displayMessage('invalid input!');
  } else if (guess < 1 || guess > 30) {
    toggleError();
    displayMessage('Number 1-30!');
  } else if (guess === secretNumber) {
    displayMessage('Correct number!');
    numberEl.textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#5ae430';
    if(!isVisible)
      btnNextRound.classList.toggle('notVisible');

    isVisible = true;


    if (score >= highScore) {
      highScore = score;
     highScoreEl.textContent = highScore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(
        guess > secretNumber ? 'My number is lower!' : 'My number is higher!'
      );
      score--;
      scoreEl.textContent = score;
    } else {
      displayMessage('You lost the game!');
      score = 0;
      scoreEl.textContent = score;
      document.querySelector('body').style.backgroundColor = 'red';
      if(!isVisible)
        btnNextRound.classList.toggle('notVisible');
    }
  }
};

document.querySelector('.btn--check').addEventListener('click', gameLogic);

document.querySelector('.btn--restart').addEventListener('click', () => {
  initGame();
  checkError();
});

document.querySelector('.btn--confirm').addEventListener('click', () => {
  overlayEl.classList.toggle('hidden');
  playerName = playernameEl.value;

  if (playerName === '') displayedPlayernameEl.textContent = 'Unknown';
  else displayedPlayernameEl.textContent = playerName;
});

btnNextRound.addEventListener('click',newRound);
