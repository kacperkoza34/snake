import Board from './components/Board.js';
import Food from './components/Food.js';
import Snake from './components/Snake.js';


const app = {

  initGame: function(){
    new Board();
    new Snake();
  },

  init: function(){
      const thisApp = this;
      thisApp.initGame();
    },
};
app.init();
