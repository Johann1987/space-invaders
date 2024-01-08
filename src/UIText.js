import State from "./State";

export class UIText {
  playAgainPressed = false;
  randNum = Math.floor(Math.random() * 10);
  gameHints = [
    "Vous commencez avec un certain nombre de vies mais si les envahisseurs vous franchissent, c'est game over.",
    "En 1982, Space Invaders était le jeux le plus rentable de l'époque.",
    "Les formations aliens deviennent plus fortes, plus grandes et plus agressives à chaque niveau.",
    "Le journal britannique The Times a classé Space Invaders à la première place de sa liste des dix jeux vidéo les plus influents de tous les temps",
    "Détruisez les vaisseaux mères pour obtenir un énorme bonus.",
    "Tomohiro Nishikado a développé Space Invaders en 1978. Son nom n'a jamais été inscrit sur le jeu pour des raisons contractuelles.",
  ];

  constructor() {
    this.startButtonInit();
    this.modeSelectorInit();
  }

  startButtonInit() {
    document.getElementById("start-game").addEventListener("click", (el) => {
      this.startButtonClick(el);
    });
  }

  modeSelectorInit() {
    let selector = document.getElementById("change-mode");
    let mode = parseInt(window.localStorage.getItem("mode") ?? 0);
    selector.getElementsByTagName("option")[mode].selected = true;

    selector.onchange = function (el) {
      window.localStorage.setItem("mode", selector.value);
      location.reload();
    };
  }

  startButtonClick(el) {
    this.hideTitleScreen();
    State.state = "STARTGAME";
  }

  enable() {
    let UI = document.querySelector("#ui");
    UI.classList.add("active");
  }

  disable() {
    let UI = document.querySelector("#ui");
    UI.classList.remove("active");
  }

  showGameUI() {
    this.enable();
    let UI = document.querySelector("#game-ui");
    UI.classList.add("active");
  }

  hideGameUI() {
    let UI = document.querySelector("#game-ui");
    UI.classList.remove("active");
  }

  showGameOver() {
    this.enable();
    let UI = document.querySelector("#panel-game-over");
    UI.classList.add("active");
  }

  hideGameOver() {
    let UI = document.querySelector("#panel-game-over");
    UI.classList.remove("active");
  }

  showGameHints() {
    this.newGameHint();
    this.enable();
    let UI = document.querySelector("#panel-game-hints");
    UI.classList.add("active");
  }

  hideGameHints() {
    let UI = document.querySelector("#panel-game-hints");
    UI.classList.remove("active");
  }

  newGameHint() {
    let i = (this.randNum + State.level) % this.gameHints.length;
    document.querySelector("#panel-game-hints .value").innerHTML =
      this.gameHints[i];
  }

  showPlayAgain() {
    let UI = document.querySelector("#panel-play-again");
    UI.classList.add("active");
    UI.onclick = () => {
      this.playAgainPressed = true;
    };
  }

  hidePlayAgain() {
    let UI = document.querySelector("#panel-play-again");
    UI.classList.remove("active");
    this.playAgainPressed = false;
  }

  showNewHighScore() {
    this.enable();
    document.querySelector("#panel-new-highscore .value").innerHTML =
      window.localStorage.getItem("highScore");
    let UI = document.querySelector("#panel-new-highscore");
    UI.classList.add("active");
  }

  hideNewHighScore() {
    let UI = document.querySelector("#panel-new-highscore");
    UI.classList.remove("active");
  }

  showTitleScreen() {
    this.enable();
    let UI = document.querySelector("#title-screen");
    UI.classList.add("active");
    let buttons = document.querySelector("#intro");
    buttons.classList.add("active");
  }

  hideTitleScreen() {
    let UI = document.querySelector("#title-screen");
    UI.classList.remove("active");
    let buttons = document.querySelector("#intro");
    buttons.classList.remove("active");
  }

  hideLoadingScreen() {
    let loading = document.querySelector("#loading");
    loading.classList.remove("active");
  }
}
