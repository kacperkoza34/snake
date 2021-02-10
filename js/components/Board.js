class Board {
  constructor(size) {
    const thisBoard = this;
    thisBoard.boardDOM = document.getElementById("game");
    thisBoard.initBoard(size);
  }

  initBoard(size) {
    const thisBoard = this;
    const { boardDOM } = thisBoard;

    boardDOM.innerHTML = "";
    boardDOM.style.width = `${size * 20}px`;
    boardDOM.style.height = `${size * 20}px`;
    boardDOM.style.gridTemplateColumns = `repeat(${size}, 20px [col-start])`;

    const gameDOM = document.getElementById("game");

    const scoreDOM = document.createElement("div");
    scoreDOM.className = "current-score";
    scoreDOM.innerHTML = 0;

    boardDOM.appendChild(scoreDOM);

    for (let j = 1; j <= size; j++) {
      for (let i = 1; i <= size; i++) {
        const div = document.createElement("div");
        div.className = "board-element";
        div.dataset.index = j + "-" + i;
        boardDOM.appendChild(div);
      }
    }
    thisBoard.upDateCurrentScore();
  }

  upDateCurrentScore() {
    const thisBoard = this;
    thisBoard.boardDOM.addEventListener("updateScore", function(e) {
      e.stopPropagation();
      this.querySelector(".current-score").innerHTML = e.detail.score;
    });
  }
}

export default Board;
