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
  leftPlay.classList.toggle("leftUp");
  rightPlay.classList.toggle("rightUp");
}

function shoot() {
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
  leftPlay.id = "leftRock";
  rightPlay.id = "rightRock";
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
    youScore.innerText = ++playerScore;
    themScore.innerText = cpuScore;
  } else if (roundResult === "lose") {
    themScore.innerText = ++cpuScore;
    youScore.innerText = playerScore;
  }
  if (playerScore === 5) {
    playerScore = 0;
    cpuScore = 0;
    winLoss.innerText = "YOU WIN";
  } 
  if (cpuScore === 5) {
    playerScore = 0;
    cpuScore = 0;
    winLoss.innerText = "YOU LOSE";
  }
}

function resetScore() {
  if (
    playerScore === 0 && 
    cpuScore === 0 &&
    youScore.innerText !== themScore.innerText
  ) {
    youScore.innerText = 0;
    themScore.innerText = 0;
  }
}

// GAME
let playerScore = 0;
let cpuScore = 0;
let computerSelection;
let playerSelection;
let roundResult;
let youScore = document.querySelector("#youScore div.score");
let themScore = document.querySelector("#themScore div.score");
let winLoss = document.getElementById("winLoss");
let leftPlay = document.getElementsByClassName("leftHand")[0];
let rightPlay = document.getElementsByClassName("rightHand")[0];

const keyboardHandler = function(event) {
  // *
  document.removeEventListener("keydown", keyboardHandler);
  
  // remove win-loss declaration if it's visible
  winLoss.innerText = "";

  // reset shown scores to zero if new game started
  resetScore();

  // get player's move
  if (event.key === "r") {
    playerSelection = "rock";
  } else if (event.key === "p") {
    playerSelection = "paper";
  } else if (event.key === "s") {
    playerSelection = "scissors";
  } else {
    document.addEventListener("keydown", keyboardHandler);
    return;
  };

  // get computer's move
  computerSelection = computerPlay()

  // compare moves and determine win or loss for round
  roundResult = playRound();

  // show rock-paper-scissors-shoot motions
  animation();

  setTimeout( () => {
    // update scores at end of animation and declare winner if either score is 5
    keepScore();
    //*
    document.addEventListener("keydown", keyboardHandler);
  }, 1600);

  // * = together these make animation uninterruptible
};

document.addEventListener("keydown", keyboardHandler);