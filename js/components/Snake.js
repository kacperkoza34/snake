import Food from "./Food.js";
import getRandomInt from "../utils/getRandomInt.js";

class Snake {
  constructor(snakeSpeed, boardSize) {
    const thisSnake = this;
    thisSnake.snakeSpeed = snakeSpeed;
    thisSnake.boardSize = boardSize;
    thisSnake.snakeArray = [];
    thisSnake.directions = { up: 2, down: 0, rigth: 1, left: 3 };
    thisSnake.initSnake();
  }

  initSnake() {
    const thisSnake = this;
    const {
      boardSize,
      snakeArray,
      directions: { up, down, rigth, left }
    } = thisSnake;

    let xPoint = getRandomInt(2, boardSize - 2);
    let yPoint = getRandomInt(2, boardSize - 2);
    const direction = getRandomInt(0, 3);

    for (let i = 0; i < 3; i++) {
      if (down === 0) yPoint++;
      else if (rigth === 1) xPoint++;
      else if (up === 2) yPoint--;
      else if (left === 3) xPoint--;

      const pointSelector = yPoint + "-" + xPoint;
      const startPoint = document.querySelector(
        `[data-index="${pointSelector}"]`
      );
      snakeArray.push(startPoint);
    }
    new Food(snakeArray, boardSize);
    thisSnake.moveSnake(direction, xPoint, yPoint);
  }

  moveSnake(direction, xPoint, yPoint) {
    const thisSnake = this;
    const {
      snakeArray,
      boardSize,
      directions: { up, down, rigth, left }
    } = thisSnake;

    const time = setInterval(function() {
      window.addEventListener("keydown", function() {
        if (
          event.keyCode === 37 ||
          event.keyCode === 38 ||
          event.keyCode === 39 ||
          event.keyCode === 40
        ) {
          event.preventDefault();
          direction = thisSnake.control(event.keyCode, direction);
        }
      });

      if (direction === down) yPoint++;
      else if (direction === rigth) xPoint++;
      else if (direction === up) yPoint--;
      else if (direction === left) xPoint--;
      const dataSelector = `${yPoint}-${xPoint}`;

      if (
        yPoint === boardSize + 1 ||
        xPoint === boardSize + 1 ||
        yPoint === 0 ||
        xPoint === 0
      ) {
        thisSnake.gameOver(time);
      } else {
        let newElement = document.querySelector(
          `[data-index="${dataSelector}"]`
        );
        snakeArray.push(newElement);
        const head = snakeArray[snakeArray.length - 1];

        if (!thisSnake.eat(head)) {
          let remove = snakeArray.shift();
          remove.classList.remove("snake");
        } else new Food(snakeArray, boardSize);

        thisSnake.colision(head, time);
        thisSnake.generateSnake();
      }
    }, thisSnake.snakeSpeed);
  }

  control(evt, direction) {
    const thisSnake = this;
    const { up, down, rigth, left } = thisSnake.directions;

    if (evt === 37) {
      if (direction !== rigth) direction = left;
    } else if (evt === 38) {
      if (direction !== down) direction = up;
    } else if (evt === 39) {
      if (direction !== left) direction = rigth;
    } else if (evt === 40) {
      if (direction !== up) direction = down;
    }
    return direction;
  }

  generateSnake() {
    const thisSnake = this;
    const { snakeArray } = thisSnake;
    for (let snake in snakeArray) {
      if (snakeArray[snakeArray.length - 1] == snakeArray[snake]) {
        snakeArray[snake].classList.add("head");
      }
      snakeArray[snake].classList.add("snake");
      if (snakeArray[snakeArray.length - 2] == snakeArray[snake]) {
        snakeArray[snake].classList.remove("head");
      }
    }
  }

  colision(head, time) {
    const thisSnake = this;
    const { snakeArray } = thisSnake;
    for (let i = 1; i < snakeArray.length - 1; i++) {
      if (snakeArray[i] === head) {
        thisSnake.gameOver(time);
      }
    }
  }

  eat(head) {
    const thisSnake = this;
    const food = document.querySelector(".food");
    if (food === head) {
      food.classList.remove("food");
      const event = new CustomEvent("updateScore", {
        bubbles: true,
        detail: {
          score: thisSnake.snakeArray.length - 3
        }
      });
      food.dispatchEvent(event);

      return true;
    }
  }

  gameOver(time) {
    const thisSnake = this;
    const { snakeArray } = thisSnake;
    clearInterval(time);

    const event = new CustomEvent("gameOver", {
      bubbles: true,
      detail: {
        score: thisSnake.snakeArray.length - 3
      }
    });
    snakeArray[0].dispatchEvent(event);

    for (let snake in snakeArray) {
      snakeArray[snake].classList.add("dead");
    }
  }
}

export default Snake;
