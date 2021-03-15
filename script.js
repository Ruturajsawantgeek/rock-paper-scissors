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

// function shoot() {
  // let leftPlay = document.getElementsByClassName("leftHand")[0].id;
  // let rightPlay = document.getElementsByClassName("rightHand")[0].id;
// 
  // if (playerSelection === "paper") {
    // leftPlay = "leftPaper";
  // } else if (playerSelection === "scissors") {
    // leftPlay = "leftScissors";
  // }
  // if (computerSelection === "paper") {
    // rightPlay = "rightPaper";
  // } else if (computerSelection === "scissors") {
    // rightPlay = "rightScissors";
  // }
// }

function playRound(playerSelection, computerSelection) {
  playerSelection = choice;
  computerSelection = computerPlay();

  let rockPaperScissors = setInterval(motion, 200);
  setTimeout(function(){clearInterval(rockPaperScissors)}, 1600);
  // setTimeout(shoot, 1600);

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

// GAME
let i = 0;
let j = 0;
let choice;

document.addEventListener("keydown", event => {
  if (event.key === "r") {
    choice = "rock";
  } else if (event.key === "p") {
    choice = "paper";
  } else if (event.key === "s") {
    choice = "scissors";
  } else return;

  let result = playRound();
  setTimeout(function() {
    if (result === "win") {
      i++;
      document.querySelector("#youScore div.score").innerText = i;
    } else if (result === "lose") {
      j++;
      document.querySelector("#themScore div.score").innerText = j;
    }
    if (i === 5) {
      i = 0;
      j = 0;
      document.getElementById("winLoss").innerText = "YOU WIN";
      document.querySelector("#youScore div.score").innerText = i;
      document.querySelector("#themScore div.score").innerText = j;
    } 
    if (j === 5) {
      i = 0;
      j = 0;
      document.getElementById("winLoss").innerText = "YOU LOSE";
      document.querySelector("#youScore div.score").innerText = i;
      document.querySelector("#themScore div.score").innerText = j;
    }
  }, 1600);
});