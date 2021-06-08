"use strict";
// Global variables for score
let playerScore = 0;
let computerScore = 0;
let playerPick;
let computerPick;
// DOM Selectors
const playerChoices = document.querySelectorAll(".player-input");
const playerDisplay = document.querySelector(".player-pick");
const computerDisplay = document.querySelector(".computer-pick");
const playerScoreDisplay = document.querySelector("#player-score");
const computerScoreDisplay = document.querySelector("#computer-score");
// GAME LOGIC FUNCTIONS
// Random generated computer choice
const computerChoice = function () {
  const number = Math.random();
  if (number > 0.66) return "rock";
  else if (number > 0.33) return "paper";
  else return "scissors";
};
// Compare player and computer choice and declare winner
const roundWinner = function (userInput, computerInput) {
  if (userInput === computerInput) {
    return 0;
  } else if (
    (userInput === "rock" && computerInput === "scissors") ||
    (userInput === "scissors" && computerInput === "paper") ||
    (userInput === "paper" && computerInput === "rock")
  ) {
    return 1;
  } else {
    return -1;
  }
};
// Update global variable depending on winner
const updateScore = function (input) {
  if (input === 1) playerScore++;
  else if (input === -1) computerScore++;
  else return null;
};
// Update scoreboard
const updateScoreboard = function () {
  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
};
// Check for end game condition, first player to get 3 wins
const checkEndGame = function () {
  //TODO implemet modal window instead of alert
  if (playerScore === 3) {
    alert("GZ! YOU WON!!!!");
    return 1;
  } else if (computerScore === 3) {
    alert("Sorry You LOST!");
    return 1;
  }
  return 0;
};
// Reset game state
const resetGame = function () {
  playerScore = computerScore = 0;
  playerPick = computerPick = undefined;
  updateScoreboard();
  playerDisplay.style.backgroundImage =
    computerDisplay.style.backgroundImage = `none`;
};
// GAME LOGIC
const gameFlow = function (player, computer) {
  // 1. Decide round winner
  const round = roundWinner(player, computer);
  // 2. Update DOM display containers
  playerDisplay.style.backgroundImage = `url('img/${player}.png')`;
  computerDisplay.style.backgroundImage = `url('img/${computer}.png')`;
  // 3. Update score and scoreboard
  updateScore(round);
  updateScoreboard();
  // 4. Check end game condition and reset state if game over
  const temp = checkEndGame();
  if (temp) resetGame();
};
// Add event handler to every player choice
for (let node of playerChoices) {
  node.addEventListener("click", function (e) {
    gameFlow(e.target.dataset.choice, computerChoice());
  });
}
