import getRandomInt from "../utils/getRandomInt.js";

class Food {
  constructor(snakeArray, boardSize) {
    const thisFood = this;
    thisFood.boardSize = boardSize;
    thisFood.snakeArray = snakeArray;
    thisFood.initFood();
  }

  initFood() {
    const thisFood = this;
    const { boardSize, snakeArray } = thisFood;

    let xPoint = getRandomInt(1, boardSize);
    let yPoint = getRandomInt(1, boardSize);
    const pointSelector = `${yPoint}-${xPoint}`;

    const startPoint = document.querySelector(
      `[data-index="${pointSelector}"]`
    );

    let check = true;
    for (let i = 0; i < snakeArray.length; i++) {
      if (snakeArray[i] === startPoint) {
        check = false;
      }
    }

    if (check) {
      startPoint.classList.add("food");
    } else thisFood.initFood(snakeArray);
  }
}

export default Food;
