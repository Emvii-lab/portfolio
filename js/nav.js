/* ── Glitch on logo hover ── */
const logo = document.querySelector('.nav-logo-img');
if (logo) {
  logo.addEventListener('mouseenter', () => {
    logo.style.animation = 'none';
    logo.style.filter = 'drop-shadow(0 0 12px #FF2D95) drop-shadow(0 0 30px #B026FF) drop-shadow(0 0 60px #00F0FF)';
    setTimeout(() => {
      logo.style.filter = '';
      logo.style.animation = '';
    }, 400);
  });
}

/* ── Smooth active nav link highlight ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? '#fff' : '';
  });
}, { passive: true });