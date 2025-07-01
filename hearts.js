const canvas = document.getElementById('hearts-bg');
const ctx = canvas.getContext('2d');
let hearts = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function randomHeart() {
  const size = 18 + Math.random() * 18;
  return {
    x: Math.random() * canvas.width,
    y: -size,
    size,
    speed: 0.7 + Math.random() * 1.2,
    drift: (Math.random() - 0.5) * 0.7,
    opacity: 0.7 + Math.random() * 0.3,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.01
  };
}

function drawHeart(x, y, size, color, opacity, rotation) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  ctx.moveTo(0, size * 0.3);
  ctx.bezierCurveTo(size * 0.5, -size * 0.3, size, size * 0.5, 0, size);
  ctx.bezierCurveTo(-size, size * 0.5, -size * 0.5, -size * 0.3, 0, size * 0.3);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.shadowColor = "#ff69b4";
  ctx.shadowBlur = 8;
  ctx.fill();
  ctx.restore();
}

function animateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (hearts.length < 30 && Math.random() < 0.5) {
    hearts.push(randomHeart());
  }

  for (let i = 0; i < hearts.length; i++) {
    const h = hearts[i];
    h.y += h.speed;
    h.x += h.drift;
    h.rotation += h.rotationSpeed;
    drawHeart(h.x, h.y, h.size, "#ff69b4", h.opacity, h.rotation);
  }

  hearts = hearts.filter(h => h.y < canvas.height + h.size);

  requestAnimationFrame(animateHearts);
}
animateHearts();