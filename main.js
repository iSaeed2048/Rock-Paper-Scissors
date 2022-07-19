const history = document.querySelector(".history");
const historyCleaner = document.querySelector(".history-cleaner");

const resultBox = document.querySelector("#ResultBox");
const gameResult = document.querySelector("#gameResult");
const rematchButton = document.querySelector("#rematch");

const youBox = document.querySelector("#YouBox");
const cpuBox = document.querySelector("#CpuBox");

// Create computer choice
const choices = ["rock", "paper", "scissors"];
const computerChoice = choices[Math.floor(Math.random() * 3)];

const userSelect = document.querySelectorAll(".userSelect");
userSelect.forEach((item) => {
  item.addEventListener("click", gameHandeler);
});

rematchButton.addEventListener("click", () => location.reload());

let winLog = Number(localStorage.getItem("winLog"));
let loseLog = Number(localStorage.getItem("loseLog"));
let drawLog = Number(localStorage.getItem("drawLog"));

function gameHandeler() {
  if (event.target.id === computerChoice) {
    draw();
  } else if (event.target.id === "rock") {
    if (computerChoice === "paper") {
      lose();
    } else {
      win();
    }
  } else if (event.target.id === "paper") {
    if (computerChoice === "scissors") {
      lose();
    } else {
      win();
    }
  } else if (event.target.id === "scissors") {
    if (computerChoice === "rock") {
      lose();
    } else {
      win();
    }
  }
}

const winSound = new Audio("assets/win.mp3");
const loseSound = new Audio("assets/lose.mp3");
const drawSound = new Audio("assets/draw.mp3");

function win() {
  winLog++;
  winSound.play();
  localStorage.setItem("winLog", JSON.stringify(winLog));
  resultBox.style.display = "flex";
  gameResult.innerText = `You Win`
  gameResult.style.color = "blue";
  youBox.children[0].src = `assets/${event.target.id}.png`;
  cpuBox.children[0].src = `assets/${computerChoice}.png`;
}
function lose() {
  loseLog++;
  loseSound.play();
  localStorage.setItem("loseLog", JSON.stringify(loseLog));
  resultBox.style.display = "flex";
  gameResult.innerText = `You lose`
  gameResult.style.color = "red";
  youBox.children[0].src = `assets/${event.target.id}.png`;
  cpuBox.children[0].src = `assets/${computerChoice}.png`;
}
function draw() {
  drawLog++;
  drawSound.play();
  localStorage.setItem("drawLog", JSON.stringify(drawLog));
  gameResult.innerText = `Draw`
  resultBox.style.display = "flex";
  youBox.children[0].src = `assets/${event.target.id}.png`;
  cpuBox.children[0].src = `assets/${computerChoice}.png`;
}

history.innerText = `Win: ${winLog} | Lose: ${loseLog} | Draw: ${drawLog}`;

historyCleaner.addEventListener("click", () => {
  localStorage.clear();
});
