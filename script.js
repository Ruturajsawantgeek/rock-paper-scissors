function computerPlay() {
  let play = Math.floor(Math.random() * 3);
  if (play == 0) {
    return "rock";
  } else if (play == 1) {
    return "paper";
  } else {
    return "scissors";
  }
}

function motion() {
  document.getElementById("leftRock").classList.toggle("leftUp");
  document.getElementById("rightRock").classList.toggle("rightUp");
}

function shoot() {
  let leftPlay = document.getElementsByClassName("leftHand")[0];
  let rightPlay = document.getElementsByClassName("rightHand")[0];

  if (playerSelection === "paper") {
    leftPlay.id = "leftPaper";
  } else if (playerSelection === "scissors") {
    leftPlay.id = "leftScissors";
  }
  if (computerSelection === "paper") {
    rightPlay.id = "rightPaper";
  } else if (computerSelection === "scissors") {
    rightPlay.id = "rightScissors";
  }
}

function animation() {
  document.getElementsByClassName("leftHand")[0].id = "leftRock";
  document.getElementsByClassName("rightHand")[0].id = "rightRock";
  let rockPaperScissors = setInterval(motion, 200);
  setTimeout(function(){clearInterval(rockPaperScissors)}, 1600);
  setTimeout(shoot, 1600);
}

function playRound() {
  switch (true) {
    case playerSelection === computerSelection:
      return "draw";
    case playerSelection === "rock":
      if (computerSelection === "paper") {
        return "lose";
      } else {
        return "win";
      }
    case playerSelection === "paper":
      if (computerSelection === "scissors") {
        return "lose";
      } else {
        return "win";
      }
    case playerSelection === "scissors":
      if (computerSelection === "rock") {
        return "lose";
      } else {
        return "win";
      }
    default:
      return;
  }
}

function keepScore() {
  if (roundResult === "win") {
    playerScore++;
    document.querySelector("#youScore div.score").innerText = playerScore;
  } else if (roundResult === "lose") {
    cpuScore++;
    document.querySelector("#themScore div.score").innerText = cpuScore;
  }
  if (playerScore === 5) {
    playerScore = 0;
    cpuScore = 0;
    document.getElementById("winLoss").innerText = "YOU WIN";
    document.querySelector("#youScore div.score").innerText = playerScore;
    document.querySelector("#themScore div.score").innerText = cpuScore;
  } 
  if (cpuScore === 5) {
    playerScore = 0;
    cpuScore = 0;
    document.getElementById("winLoss").innerText = "YOU LOSE";
    document.querySelector("#youScore div.score").innerText = playerScore;
    document.querySelector("#themScore div.score").innerText = cpuScore;
  }
}

// GAME
let playerScore = 0;
let cpuScore = 0;
let computerSelection;
let playerSelection;
let roundResult;

document.addEventListener("keydown", event => {
  // remove win-loss declaration if it's visible
  document.getElementById("winLoss").innerText = "";

  // get player's move
  if (event.key === "r") {
    playerSelection = "rock";
  } else if (event.key === "p") {
    playerSelection = "paper";
  } else if (event.key === "s") {
    playerSelection = "scissors";
  } else return;

  // get computer's move
  computerSelection = computerPlay()

  // compare moves and determine win or loss for round
  roundResult = playRound();

  // show rock-paper-scissors-shoot motions
  animation();

  // update scores at end of animation and declare winner if either score is 5
  setTimeout(keepScore, 1600);
});