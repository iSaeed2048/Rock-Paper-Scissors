const gameContainer = document.querySelector(".container");
const rockElm = document.querySelector(".rock");
const paperElm = document.querySelector(".paper");
const scissorsElm = document.querySelector(".scissors");
const showResultContainer = document.querySelector(".show-result");
const userChoiceImg = document.getElementById("user-choice");
const cpuChoiceImg = document.getElementById("cpu-choise");
const resultImg = document.getElementById("result-game");
const choices = gameContainer.querySelectorAll("div");
const rematchButton = document.querySelector(".rematch");
const resultHistory = document.querySelector(".result").querySelector("p");
const clearHistoryButton = document
  .querySelector(".result")
  .querySelector("span");

const allChoices = ["rock", "paper", "scissors"];

let win = +localStorage.getItem("win") || 0;
let draw = +localStorage.getItem("draw") || 0;
let lose = +localStorage.getItem("lose") || 0;

resultHistory.innerText = `WIN: ${win} | DRAW: ${draw} | LOSE: ${lose}`;

const gameHandler = (i) => {
  const cpuChoice = allChoices[Math.floor(Math.random() * 3)];
  const userChoice = i.target.alt;
  userChoiceImg.src = `img/${userChoice}.png`;
  cpuChoiceImg.src = `img/${cpuChoice}.png`;
  showResultContainer.style.display = "flex";
  if (userChoice === cpuChoice) {
    drawHandler(cpuChoice, userChoice);
    return;
  }
  (userChoice === "rock" && cpuChoice === "scissors") ||
  (userChoice === "paper" && cpuChoice === "rock") ||
  (userChoice === "scissors" && cpuChoice === "paper")
    ? winHandler(cpuChoice, userChoice)
    : loseHandler(cpuChoice, userChoice);
};

const winHandler = (cpu, user) => {
  win++;
  localStorage.setItem("win", JSON.stringify(win));
  console.log(`WIN: ${user} > ${cpu}`);
  resultImg.src = `img/win.png`;
};
const drawHandler = (cpu, user) => {
  draw++;
  localStorage.setItem("draw", JSON.stringify(draw));
  console.log(`DRAW: ${user} = ${cpu}`);
  resultImg.src = `img/draw.png`;
};
const loseHandler = (cpu, user) => {
  lose++;
  localStorage.setItem("lose", JSON.stringify(lose));
  console.log(`LOSE: ${user} < ${cpu}`);
  resultImg.src = `img/lose.png`;
};

clearHistoryButton.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

rematchButton.addEventListener("click", () => location.reload());

choices.forEach((i) => {
  i.addEventListener("click", gameHandler);
});