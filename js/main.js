"use strict";
//Global variables for score
let userScore = 0;
let computerScore = 0;

// GAME LOGIC
const computerChoice = function () {
  const number = Math.random();
  if (number > 0.66) return "rock";
  else if (number > 0.33) return "paper";
  else return "scissors";
};

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

const updateScore = function (input) {
  if (input === 1) userScore++;
  else if (input === -1) computerScore++;
};

let usr;
let ai;

while (userScore < 3 && computerScore < 3) {
  usr = computerChoice();
  ai = computerChoice();
  updateScore(roundWinner(usr, ai));
  console.log(`${usr} ${userScore} - ${computerScore} ${ai}`);
}

/* PLAYER INPUT*/
const x = document.querySelectorAll(".player-input");
const y = document.querySelector(".player-pick");
for (let i of x) {
  i.addEventListener("click", function (e) {
    let playerChoice = e.target.dataset.choice;
    y.style.backgroundImage = `url('img/${playerChoice}.png')`;
  });
}
