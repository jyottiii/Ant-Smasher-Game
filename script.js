const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");
const restartBtn = document.getElementById("restart");
const smashSound = document.getElementById("smashSound");

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let spawnInterval;
highScoreDisplay.textContent = highScore;

function spawnAnt() {
  const ant = document.createElement("div");
  ant.classList.add("ant");

  const maxX = gameArea.clientWidth - 50;
  const maxY = gameArea.clientHeight - 50;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  ant.style.left = `${randomX}px`;
  ant.style.top = `${randomY}px`;

  ant.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = score;

    ant.classList.add("smashed");
    smashSound.currentTime = 0;
    smashSound.play();

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
      highScoreDisplay.textContent = highScore;
    }

    setTimeout(() => ant.remove(), 400);
  });

  gameArea.appendChild(ant);

  // Remove ant after a few seconds if not smashed
  setTimeout(() => {
    if (gameArea.contains(ant)) ant.remove();
  }, 3000);
}

function startGame() {
  score = 0;
  scoreDisplay.textContent = score;
  spawnInterval = setInterval(spawnAnt, 1000);
}

function resetGame() {
  clearInterval(spawnInterval);
  gameArea.innerHTML = "";
  startGame();
}

restartBtn.addEventListener("click", resetGame);

// Start the game initially
startGame();
