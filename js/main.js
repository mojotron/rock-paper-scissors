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
// DOM Selectors for modal window
const gameOverModal = document.querySelector(".game-over");
const winnerMsg = document.querySelector(".winner-msg");
const newGameBtn = document.querySelector(".new-game");
// GAME LOGIC FUNCTIONS
// Random generated computer choice
function computerChoice() {
  const number = Math.random();
  if (number > 0.66) return "rock";
  else if (number > 0.33) return "paper";
  else return "scissors";
}
// Compare player and computer choice and declare winner
function roundWinner(userInput, computerInput) {
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
}
function removeWinLoseShadowEffect() {
  if (playerDisplay.classList.contains("winner-display-shadow"))
    playerDisplay.classList.remove("winner-display-shadow");
  if (playerDisplay.classList.contains("looser-display-shadow"))
    playerDisplay.classList.remove("looser-display-shadow");
  if (computerDisplay.classList.contains("winner-display-shadow"))
    computerDisplay.classList.remove("winner-display-shadow");
  if (computerDisplay.classList.contains("looser-display-shadow"))
    computerDisplay.classList.remove("looser-display-shadow");
}
// Give box shadow effect to display elements winner green looser red
function addWinLoseShadowEffect(winner) {
  removeWinLoseShadowEffect();
  if (winner === 1) {
    playerDisplay.classList.add("winner-display-shadow");
    computerDisplay.classList.add("looser-display-shadow");
  } else if (winner == -1) {
    playerDisplay.classList.add("looser-display-shadow");
    computerDisplay.classList.add("winner-display-shadow");
  }
}
// Update global variable depending on winner
function updateScore(input) {
  if (input === 1) playerScore++;
  if (input === -1) computerScore++;
}
// Update scoreboard text content
function updateScoreboard() {
  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
}
// Check for end game condition, first player to get 3 wins
function checkEndGame() {
  if (playerScore === 3) {
    winnerMsg.textContent = "🏆 You Won!!! 🏆";
    return true;
  } else if (computerScore === 3) {
    winnerMsg.textContent = "💩 You Loose!!! 💩";
    return true;
  } else {
    return false;
  }
}
// Reset game state
function resetGame() {
  playerScore = computerScore = 0;
  playerPick = computerPick = undefined;
  updateScoreboard();
  removeWinLoseShadowEffect();
  playerDisplay.style.backgroundImage =
    computerDisplay.style.backgroundImage = `none`;
  gameOverModal.classList.add("hidden");
}
// GAME LOGIC
function gameFlow(player, computer) {
  // 1. Decide round winner
  const round = roundWinner(player, computer);
  addWinLoseShadowEffect(round);
  // 2. Update DOM display containers
  playerDisplay.style.backgroundImage = `url('img/${player}.png')`;
  computerDisplay.style.backgroundImage = `url('img/${computer}.png')`;
  // 3. Update score and scoreboard
  updateScore(round);
  updateScoreboard();
  // 4. Check end game condition and reset state if game over
  const temp = checkEndGame();
  if (temp) gameOverModal.classList.remove("hidden");
}
// Add event handler to every player choice
for (let node of playerChoices) {
  node.addEventListener("click", function (e) {
    gameFlow(e.target.dataset.choice, computerChoice());
  });
}
//Modal window button event handler
newGameBtn.addEventListener("click", resetGame);
