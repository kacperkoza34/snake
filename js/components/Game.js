import Board from "./Board.js";
import Snake from "./Snake.js";

class Game {
  constructor(boardSize, snakeSpeed) {
    const thisGame = this;
    thisGame.boardSize = boardSize;
    thisGame.snakeSpeed = snakeSpeed;
    thisGame.initGame();
  }

  initGame() {
    const thisGame = this;
    new Board(thisGame.boardSize);
    new Snake(thisGame.snakeSpeed, thisGame.boardSize);
  }
}

export default Game;
