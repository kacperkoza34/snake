import Game from "./components/Game.js";

const app = {
  game: null,
  bestScore: 0,
  form: document.querySelector("#form"),
  game: document.querySelector("#game"),
  button: document.querySelector("#button"),
  bestScoreDOM: document.querySelector("#bestScore"),

  initGame: function() {
    /*START GAME*/
    this.form.addEventListener("submit", e => {
      e.preventDefault();
      this.button.innerHTML =
        "<div class='button-animation'><span></span><span></span><span></span><span></span><span></span></div>";
      this.button.disabled = true;

      this.game = new Game(
        parseInt(e.target["boardSize"].value),
        parseInt(e.target["snakeSpeed"].value)
      );
    });

    /*STOP GAME*/
    this.game.addEventListener("gameOver", e => {
      e.stopPropagation();
      this.button.innerHTML = "Start";
      this.button.disabled = false;

      if (e.detail.score > this.bestScore) {
        this.bestScore = e.detail.score;
        this.bestScoreDOM.innerHTML = e.detail.score;
      }
    });
  }
};

app.initGame();
