const maze = document.getElementById("maze");
const ball = document.getElementById("ball");
const goal = document.getElementById("goal");
const walls = document.querySelectorAll(".wall");

let ballX = 18;
let ballY = 18;

maze.addEventListener("mousemove", (e) => {
  const rect = maze.getBoundingClientRect();
  let mouseX = e.clientX - rect.left;
  let mouseY = e.clientY - rect.top;

  let nextX = ballX + (mouseX - ballX) * 0.08;
  let nextY = ballY + (mouseY - ballY) * 0.08;

  if (!hitsWall(nextX, nextY)) {
    ballX = nextX;
    ballY = nextY;
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
  }

  checkWin();
});

function hitsWall(x, y) {
  const ballSize = 14;
  const offset = 0.5;
  const ballRect = {
    left: x + offset,
    top: y + offset,
    right: x + ballSize - offset,
    bottom: y + ballSize - offset
  };

  for (let wall of walls) {
    const w = wall.getBoundingClientRect();
    const m = maze.getBoundingClientRect();
    const wallRect = {
      left: w.left - m.left,
      top: w.top - m.top,
      right: w.right - m.left,
      bottom: w.bottom - m.top
    };

    if (
      ballRect.left < wallRect.right &&
      ballRect.right > wallRect.left &&
      ballRect.top < wallRect.bottom &&
      ballRect.bottom > wallRect.top
    ) {
      return true;
    }
  }
  return false;
}

function checkWin() {
  const ballBox = ball.getBoundingClientRect();
  const goalBox = goal.getBoundingClientRect();

  if (
    ballBox.left < goalBox.right &&
    ballBox.right > goalBox.left &&
    ballBox.top < goalBox.bottom &&
    ballBox.bottom > goalBox.top
  ) {
    showWin();
  }
}

function showWin() {
  if (document.getElementById("win-screen")) return;

  const win = document.createElement("div");
  win.id = "win-screen";
  win.innerHTML = "<h2>WIN</h2>";
  document.body.appendChild(win);

  const colors = ['#ff0037', '#ffffff', '#888888', '#333333'];

  for (let i = 0; i < 150; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    const size = (Math.random() * 10 + 5) + "px";
    confetti.style.width = size;
    confetti.style.height = size;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + "vw";
    const duration = (Math.random() * 3 + 2) + "s";
    const delay = (Math.random() * 2) + "s";
    const wobbleDuration = (Math.random() * 2 + 1) + "s";
    confetti.style.animation = `fall ${duration} linear ${delay} forwards, wobble ${wobbleDuration} ease-in-out infinite`;
    document.body.appendChild(confetti);
  }

  setTimeout(() => {
    win.style.opacity = "0";
    win.style.transition = "1.2s ease-in-out";
    setTimeout(() => {
      win.remove();
      const allConfetti = document.querySelectorAll(".confetti");
      allConfetti.forEach(c => c.remove());
      ballX = 18;
      ballY = 18;
      ball.style.left = "18px";
      ball.style.top = "18px";
    }, 1200);
  }, 5000);
}