import Food from './Food.js';

class Snake{
  constructor(){
    const thisSnake = this;
    thisSnake.initSnake();
  }

  initSnake(){
    const thisSnake = this;
    let xPoint = Math.floor(Math.random()*7+4);
    let yPoint = Math.floor(Math.random()*7+4);
    let snakeArray = [];
    let direction = Math.floor(Math.random()*4);

    for(let i = 0; i<3; i++){
      if(direction == 0) yPoint++;
      else if(direction == 1) xPoint++;
      else if(direction == 2) yPoint--;
      else if(direction == 3) xPoint--;

      const pointSelector = yPoint + '-' + xPoint;
      const startPoint = document.getElementById(pointSelector);
      snakeArray.push(startPoint);
    }
    new Food(snakeArray);
    thisSnake.moveSnake(snakeArray, direction, xPoint, yPoint);
  }

  control(evt,direction){
    const thisSnake = this;
      if(evt == 37){
        if(direction != 1) direction = 3;
      }
      else if(evt == 38){
        if(direction != 0) direction = 2;
      }
      else if(evt == 39){
        if(direction != 3) direction = 1;
      }
      else if(evt == 40){
        if(direction != 2) direction = 0;
      }
    return direction;
  }

  generateSnake(snakeArray){
    const thisSnake = this;
    for(let snake in snakeArray){
      if(snakeArray[snakeArray.length-1] == snakeArray[snake]){
        snakeArray[snake].classList.add('snake-head')
      }
      snakeArray[snake].classList.add('snake');
      if(snakeArray[snakeArray.length-2] == snakeArray[snake]){
        snakeArray[snake].classList.remove('snake-head')
      }
    }
  }

  colision(snakeArray, head, time){
    const thisSnake = this;
    for(let i = 1; i<snakeArray.length-1; i++){
      if(snakeArray[i] == head){
        thisSnake.gameOver(snakeArray, time);
      }
    }
  }

  eat(head){
    const food = document.querySelector('.food');
    if(food == head){
      food.classList.remove('food');
      return true;
    }
  }

  gameOver(snakeArray, time){
    const thisSnake = this;
    clearInterval(time);
    for(let snake in snakeArray){
       snakeArray[snake].classList.add('dead');
    }
  }

  moveSnake(snakeArray, direction, xPoint, yPoint){
    const thisSnake = this;
    let time;
    time = setInterval(function(){
      window.addEventListener('keydown', function(){
        if(event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40){
          direction = thisSnake.control(event.keyCode, direction);
        }
      });

    if(direction == 0) yPoint++;
    else if(direction == 1)xPoint++;
    else if(direction == 2) yPoint--;
    else if(direction == 3) xPoint--;
    let id = yPoint + '-' + xPoint;

    if(yPoint == 16 || xPoint == 16 || yPoint == 0 || xPoint == 0){
      thisSnake.gameOver(snakeArray,time);
    }
    else{
      let newElement = document.getElementById(id);
      snakeArray.push(newElement);
      const head = snakeArray[snakeArray.length-1];
      if(!thisSnake.eat(head)){
        let remove = snakeArray.shift();
        remove.classList.remove('snake');
      }
      else new Food(snakeArray);
      thisSnake.colision(snakeArray,head, time);
      thisSnake.generateSnake(snakeArray);
    }
  },100);
  }
}

export default Snake;
