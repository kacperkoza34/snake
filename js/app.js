
  class initBoard {
    constructor() {
      const thisBoard = this;
      thisBoard.test();
    }
    test(){
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

  class Food{
    constructor(snakeArray){
      const thisFood = this;
      thisFood.initFood(snakeArray);
    }

    initFood(snakeArray){
      const thisFood = this;
      let xPoint = Math.floor(Math.random()*7+4);
      let yPoint = Math.floor(Math.random()*7+4);
      //console.log(snakeArray.length);
      const pointSelector = yPoint + '-' + xPoint;
      const startPoint = document.getElementById(pointSelector);
    //  console.log(snakeArray);
      let check = true;
      for(let i = 0; i<snakeArray.length; i++){
        if(snakeArray[i] == startPoint){
          check = false;
        }
      }
      if(check) startPoint.classList.add('food');
      else new Food(snakeArray);
    }
  }

  class Snake{
    constructor(){
      const thisSnake = this;
      thisSnake.initSnake();
      thisSnake.control();
    }

    initSnake(){
      const thisSnake = this;
      let xPoint = Math.floor(Math.random()*7+4);
      let yPoint = Math.floor(Math.random()*7+4);
      var snakeArray = [];
      let direction = Math.floor(Math.random()*4);
      //console.log('kierunek: ', direction);
      //console.log('x: ', xPoint);
      //console.log('y: ', yPoint);

      for(let i = 0; i<3; i++){
        if(direction == 0) yPoint++;
        else if(direction == 1) xPoint++;
        else if(direction == 2) yPoint--;
        else if(direction == 3) xPoint--;

        const pointSelector = yPoint + '-' + xPoint;
        //console.log(pointSelector);
        const startPoint = document.getElementById(pointSelector);
        snakeArray.push(startPoint);
      }
      //thisSnake.generateSnake(snakeArray);
      new Food(snakeArray);
      if(direction == 0) yPoint = yPoint - 2;
      else if(direction == 1)xPoint = xPoint -2;
      else if(direction == 2) yPoint = yPoint +2;
      else if(direction == 3) xPoint = xPoint +2;
      thisSnake.moveSnake(snakeArray, direction, xPoint, yPoint);
    }

    control(){
      const thisSnake = this;
      let direction;
      window.addEventListener('keydown', function(){
        if(event.keyCode == 37) direction = 2;
        else if(event.keyCode == 38) direction = 1;
        else if(event.keyCode == 39) direction = 0;
        else if(event.keyCode == 40) direction = 3;
      });
    }

    generateSnake(snakeArray){
      const thisSnake = this;
      for(let snake in snakeArray){
        /*======================================================*/
        if(snakeArray[0] == snakeArray[snake]){
          snakeArray[snake].classList.add('snake-head')
        }
        snakeArray[snake].classList.add('snake');
        if(snakeArray[1] == snakeArray[snake]){
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
          if(event.keyCode == 37){
            if(direction != 3) direction = 1;   //console.log('left');
          }
          else if(event.keyCode == 38){
            if(direction != 2) direction = 0;  //console.log('top');
          }
          else if(event.keyCode == 39){
            if(direction != 1) direction = 3;  //console.log('right');
          }
          else if(event.keyCode == 40){
            if(direction != 0) direction = 2;  //console.log('bottom');
          }
        });
      if(direction == 0) yPoint--;
      else if(direction == 1)xPoint--;
      else if(direction == 2) yPoint++;
      else if(direction == 3) xPoint++;

      let id = yPoint + '-' + xPoint;
      if(yPoint == 16 || xPoint == 16 || yPoint == 0 || xPoint == 0){
        thisSnake.gameOver(snakeArray,time);
      }
      else{
        let newElement = document.getElementById(id);
        snakeArray.unshift(newElement);

        const head = snakeArray[0];

        if(!thisSnake.eat(head)){
          let remove = snakeArray.pop();
          remove.classList.remove('snake');
        }
        else new Food(snakeArray);


        thisSnake.colision(snakeArray,head, time);
        thisSnake.generateSnake(snakeArray);
      }
    },100);
    }
  }

const app = {

  initGame: function(){
    new initBoard();
    new Snake();
  },

  init: function(){
      const thisApp = this;
      thisApp.initGame();
    },
};
app.init();
