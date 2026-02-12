const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const tryAgain = document.getElementById("tryAgain");
const confettiCanvas = document.getElementById("confetti");

const ctx = confettiCanvas.getContext("2d");
let particles = [];
let confettiFrame = null;
let confettiEnd = 0;

const colors = ["#ff4f6a", "#ff9aad", "#ffd1db", "#47c46c", "#f4c542"];

const resizeCanvas = () => {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
};

const spawnConfetti = (count) => {
  particles = Array.from({ length: count }, () => {
    const size = Math.random() * 6 + 4;
    return {
      x: Math.random() * confettiCanvas.width,
      y: -20 - Math.random() * confettiCanvas.height,
      size,
      speedY: Math.random() * 3 + 2,
      speedX: (Math.random() - 0.5) * 2,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  });
};

const drawConfetti = () => {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  particles.forEach((p) => {
    p.y += p.speedY;
    p.x += p.speedX;
    p.rotation += p.spin;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
    ctx.restore();
  });

  particles = particles.filter((p) => p.y < confettiCanvas.height + 30);
};

const animateConfetti = (time) => {
  drawConfetti();
  if (time < confettiEnd) {
    confettiFrame = requestAnimationFrame(animateConfetti);
  } else {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    cancelAnimationFrame(confettiFrame);
  }
};

const startConfetti = () => {
  resizeCanvas();
  spawnConfetti(180);
  confettiEnd = performance.now() + 2600;
  cancelAnimationFrame(confettiFrame);
  confettiFrame = requestAnimationFrame(animateConfetti);
};

const createFloatingHearts = () => {
  const container = document.createElement("div");
  container.className = "floating-hearts";
  for (let i = 0; i < 14; i += 1) {
    const heart = document.createElement("span");
    const size = Math.random() * 18 + 12;
    heart.style.setProperty("--size", `${size}px`);
    heart.style.setProperty("--left", `${Math.random() * 100}%`);
    heart.style.setProperty("--duration", `${Math.random() * 10 + 10}s`);
    heart.style.animationDelay = `${Math.random() * -10}s`;
    container.appendChild(heart);
  }
  document.body.appendChild(container);
};

yesBtn.addEventListener("click", () => {
  tryAgain.classList.remove("show");
  startConfetti();
});

noBtn.addEventListener("click", () => {
  tryAgain.classList.add("show");
});

window.addEventListener("resize", resizeCanvas);

createFloatingHearts();
resizeCanvas();
