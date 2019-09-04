
class Board {
  constructor() {
    const thisBoard = this;
    thisBoard.initBoard();
  }
  initBoard(){
    for(let j = 1; j<=15; j++){
      for(let i = 1; i<=15; i++){
      let div = document.createElement('div');
      div.className = "board-element";
      div.id = j + '-' + i;
      document.getElementById('game').appendChild(div);
      }
    }
  }
}

export default Board;
