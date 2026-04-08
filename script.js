// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animateCursor() {
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();
document.querySelectorAll('a, button, .service-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px'; cursor.style.height = '20px';
    ring.style.width = '50px'; ring.style.height = '50px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px'; cursor.style.height = '12px';
    ring.style.width = '36px'; ring.style.height = '36px';
  });
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(r => observer.observe(r));

// Counter animation
function animateCount(el, target, suffix) {
  let start = 0;
  const dur = 1800;
  const step = timestamp => {
    if (!start) start = timestamp;
    const p = Math.min((timestamp - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const statsObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    animateCount(document.querySelectorAll('.stat-num')[0], 50, '+');
    animateCount(document.querySelectorAll('.stat-num')[1], 3, 'x');
    animateCount(document.querySelectorAll('.stat-num')[2], 98, '%');
    animateCount(document.querySelectorAll('.stat-num')[3], 24, 'h');
    statsObs.disconnect();
  }
}, { threshold: 0.5 });
statsObs.observe(document.querySelector('.stats'));
