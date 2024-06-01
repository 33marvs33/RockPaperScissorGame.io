// selectors
const chosenButtons = document.querySelectorAll(".button"); //Rock Paper Scissor buttons selectors
const userScore = document.querySelector(".user-score"); // User Score Selector
const computerScore = document.querySelector(".computer-score"); // Computer Score Selector
const chosenContainer = document.querySelector(".picked-container"); // chosen container selector
const playContainer = document.querySelector(".play-container"); // play container selector
const overlay = document.querySelector(".overlay"); // overlay selector
const playButton = document.querySelector(".play"); // play button selector
const choices = ["rock", "paper", "scissor"]; // computer choices

let time = 10; //time is set to 10
const timer = document.querySelector(".timer"); //countdown selector

let scoreCards = [0, 0]; // score Cards
let isPlaying = false; // is game playing?

function isReady() {
  if (isPlaying === false) {
    overlay.classList.add("toggle");
    playContainer.classList.add("toggle");
  } else {
    overlay.classList.remove("toggle");
    playContainer.classList.remove("toggle");
  }
}

// making isPlaying to true and by clicking the overlay remove
playButton.addEventListener("click", () => {
  isPlaying = true;
  isReady();
});

// calling the function isReady when page loads
window.addEventListener("load", isReady());

// adding event Listeners to the buttons
chosenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const pickSound = new Audio("../sound/mouse click.mp3");
    pickSound.play();
    const userID = button.getAttribute("data-id");
    const computerID = computerChoice();
    function open() {
      openPickedContainer(userID, computerID);
    }
    setTimeout(open, 1000);
  });
});


// getting the computer picked choice
function computerChoice() {
  const computerId = Math.floor(Math.random() * choices.length);
  return choices[computerId];
}



function openPickedContainer(user, computer) {
  let winner = checkWinner(user, computer);

  chosenContainer.innerHTML = `
            <div class="result">
            <h1>${winner}</h1>
        </div>
        <div class="picked">
            <div class="user-container">
                <img src="/images/${user}.svg" alt="${user}image">
                <p>User Pick</p>
            </div>
            <div class="computer-container">
                <img src="/images/${computer}.svg" alt="${computer}image">
                <p>Computer Pick</p>
            </div>
        </div>
    `;

  chosenContainer.classList.add("toggle");

  if (winner === "user win") {
    const userWin = new Audio("../sound/winner.mp3");
    userWin.play();
  } else if (winner === "computer win") {
    const computerWin = new Audio("../sound/failed.mp3");
    computerWin.play();
  } else {
    const draw = new Audio("../sound/draw.mp3");
    draw.play();
  }

  setTimeout(closePickedContainer, 2000);
}

function checkWinner(user, computer) {
  let result;
  if (user === computer) {
    result = "draw";
  } else if (user === "paper" && computer === "rock") {
    result = "user win";
    scoreCards[0]++;
  } else if (user === "scissor" && computer === "paper") {
    result = "user win";
    scoreCards[0]++;
  } else if (user === "rock" && computer === "scissor") {
    result = "user win";
    scoreCards[0]++;
  } else {
    result = "computer win";
    scoreCards[1]++;
  }

  setTimeout(updateScore, 2000);
  checkingVictory();
  return result;
}

function closePickedContainer() {
  chosenContainer.classList.remove("toggle");
}

function updateScore() {
  userScore.textContent = scoreCards[0];
  computerScore.textContent = scoreCards[1];
}

const results = document.querySelector(".result"); //result selector

let myTime;

function checkingVictory() {
  const victorySound = new Audio("../sound/victory.mp3");
  const defeatSound = new Audio("../sound/defeat.mp3");
  let result = "";
  if (scoreCards[0] >= 5) {
    result = "victory";
    showMessage(result);
    scoreCards = [0, 0];
    victorySound.play();
    myTime = setInterval(countDown, 1000);
  } else if (scoreCards[1] >= 5) {
    result = "defeat";
    showMessage(result);
    scoreCards = [0, 0];
    defeatSound.play();
    myTime = setInterval(countDown, 1000);
  }

  updateScore();
}
const victoryMessage = document.querySelector(".continue-container");

function showMessage(result) {
  victoryMessage.classList.add("open");
  results.textContent = result;
}

const continueBtn = document.querySelector(".btn-continue"); // continue button

const stopBtn = document.querySelector(".btn-stop"); //stop button

continueBtn.addEventListener("click", () => {
  victoryMessage.classList.remove("open");
  stopCountdown();
});
stopBtn.addEventListener("click", () => {
  victoryMessage.classList.remove("open");
  overlay.classList.add("toggle");
  playContainer.classList.add("toggle");
  stopCountdown();
});

updateScore();

function countDown() {
  if (time <= 0) {
    stopCountdown();
    victoryMessage.classList.remove("open");
    overlay.classList.add("toggle");
    playContainer.classList.add("toggle");
    return;
  }
  time--;
  timer.textContent = time;
}

function stopCountdown() {
  resetTime();
  clearInterval(myTime);
  timer.textContent = 10
}

function resetTime() {
  time = 10;
}


