let boxes = document.querySelectorAll(".box"); // Renamed to "boxes" to avoid conflict
let reset = document.querySelector("#reset");
let play = document.querySelector("#play");
let msg = document.querySelector(".msg");
let msgContainer = document.querySelector(".msg-container");

let turnO = true;
let draw = 0;

const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("Clicked");
    if (turnO) {
      box.innerText = "O";
      turnO = false;
      box.style.color = "red";
    } else {
      box.innerText = "X";
      turnO = true;
      box.style.color = "blue";
    }
    box.disabled = true;

    let winner = checkWinner();

    draw++;
    if (draw === 9 && !winner) {
      checkDraw();
    }
  });
});

const checkWinner = () => {
  for (let pattern of win) {
    console.log(pattern);
    console.log(pattern[0], pattern[1], pattern[2]); //understanding pattern
    console.log(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]);
    let val1 = boxes[pattern[0]].innerText;
    let val2 = boxes[pattern[1]].innerText;
    let val3 = boxes[pattern[2]].innerText;
    if (val1 != "" && val2 != "" && val3 != "") {
      if (val1 === val2 && val2 === val3) {
        console.log("Winner is", val1);
        showWinner(val1);
        winLine(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]);
        return true;
      }
    }
  }
};

const showWinner = (val1) => {
  msg.innerText = `Congrats! Winner is ${val1}`;
  msgContainer.classList.remove("hide");
  reset.classList.add("hide");
  disable();
};

const checkDraw = () => {
  msg.innerText = "Match drawn!";
  msgContainer.classList.remove("hide");
  reset.classList.add("hide");
};

const winLine= (val1, val2, val3)=> {
  val1.classList.add("line");
  val2.classList.add("line");
  val3.classList.add("line");
}

const disable = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enable = () => {
  for (let box of boxes) {
    box.disabled = false;  
    box.innerText = "";
  }
};

const resetGame = () => {
  turnO = true;
  draw = 0;
  enable();
  msgContainer.classList.add("hide");
  reset.classList.remove("hide");
  boxes.forEach((box) => {
    box.classList.remove("line");
  });
};

reset.addEventListener("click", resetGame);
play.addEventListener("click", resetGame);
