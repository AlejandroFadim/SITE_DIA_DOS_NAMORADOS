const images = document.querySelectorAll('.carousel-img');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let current = 0;
let intervalId;

function showImage(idx) {
  images.forEach((img, i) => img.classList.toggle('active', i === idx));
}

function nextImage() {
  current = (current + 1) % images.length;
  showImage(current);
}

function prevImage() {
  current = (current - 1 + images.length) % images.length;
  showImage(current);
}

prevBtn.addEventListener('click', () => {
  prevImage();
  resetInterval();
});

nextBtn.addEventListener('click', () => {
  nextImage();
  resetInterval();
});

function startInterval() {
  intervalId = setInterval(nextImage, 3000); // Troca a cada 3 segundos
}

function resetInterval() {
  clearInterval(intervalId);
  startInterval();
}

function updateLoveTimer() {
  const startDate = new Date(2023, 6, 2, 0, 0, 0); // 02/07/2023
  const now = new Date();
  let diff = Math.floor((now - startDate) / 1000);

  const days = Math.floor(diff / (3600 * 24));
  diff -= days * 3600 * 24;
  const hours = Math.floor(diff / 3600);
  diff -= hours * 3600;
  const minutes = Math.floor(diff / 60);
  const seconds = diff - minutes * 60;

  // Atualiza os spans do poema
  if (document.getElementById('poem-days')) {
    document.getElementById('poem-days').textContent = days;
    document.getElementById('poem-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('poem-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('poem-seconds').textContent = String(seconds).padStart(2, '0');
  }
}

setInterval(updateLoveTimer, 1000);
updateLoveTimer();

showImage(current);
startInterval();