class Food{
  constructor(snakeArray){
    const thisFood = this;
    thisFood.initFood(snakeArray);
  }

  initFood(snakeArray){
    const thisFood = this;
    let xPoint = Math.floor(Math.random()*14+1);
    let yPoint = Math.floor(Math.random()*14+1);
    //console.log(snakeArray.length);
    const pointSelector = yPoint + '-' + xPoint;
    const startPoint = document.getElementById(pointSelector);
  //  console.log(snakeArray);
    let check = true;
    for(let i = 0; i < snakeArray.length; i++){
      if(snakeArray[i] == startPoint){
        check = false;
      }
    }
    if(check) startPoint.classList.add('food');
    else new Food(snakeArray);
  }
}

export default Food;
