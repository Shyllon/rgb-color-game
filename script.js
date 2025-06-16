let numberOfSquares = 6;
let colors = [];
let pickedColor;
let score = 0;
let timer = 0;
let timerInterval;

const squaresContainer = document.getElementById("squareContainer");
const colorDisplay = document.getElementById("colorDisplay");
const messageDisplay = document.getElementById("message");
const resetButton = document.getElementById("reset");
const easyBtn = document.getElementById("easyBtn");
const hardBtn = document.getElementById("hardBtn");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

function setupModeButtons() {
  easyBtn.addEventListener("click", function () {
    easyBtn.classList.add("selected");
    hardBtn.classList.remove("selected");
    numberOfSquares = 3;
    reset();
  });

  hardBtn.addEventListener("click", function () {
    hardBtn.classList.add("selected");
    easyBtn.classList.remove("selected");
    numberOfSquares = 6;
    reset();
  });
}

function setupSquares() {
  squaresContainer.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.addEventListener("click", handleClick);
    squaresContainer.appendChild(square);
  }
}

function reset() {
  colors = generateRandomColors(numberOfSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  messageDisplay.textContent = "";
  resetButton.textContent = "New Colors";

  const squares = document.querySelectorAll(".square");
  squares.forEach((square, index) => {
    square.classList.remove("correct");
    square.classList.remove("fade");
    if (colors[index]) {
      square.style.display = "block";
      square.style.backgroundColor = colors[index];
    } else {
      square.style.display = "none";
    }
  });

  stopTimer();
  timer = 0;
  updateTimerDisplay();
  startTimer();
}

function handleClick(e) {
  const clickedColor = e.target.style.backgroundColor;
  if (clickedColor === pickedColor) {
    messageDisplay.textContent = "Correct!";
    resetButton.textContent = "Play Again?";
    changeColors(pickedColor);
    updateScore();
    stopTimer();
    animateCorrect();
  } else {
    e.target.classList.add("fade");
    e.target.style.backgroundColor = "#232323";
    messageDisplay.textContent = "Try Again";
  }
}

function changeColors(color) {
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.classList.remove("fade");
    square.style.backgroundColor = color;
  });
}

function pickColor() {
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Score
function updateScore() {
  score += 1;
  scoreDisplay.textContent = score;
}

// Timer
function startTimer() {
  timerInterval = setInterval(() => {
    timer++;
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function updateTimerDisplay() {
  timerDisplay.textContent = `${timer}s`;
}

// Animation
function animateCorrect() {
  const squares = document.querySelectorAll(".square");
  squares.forEach(square => square.classList.add("correct"));
}

resetButton.addEventListener("click", reset);
