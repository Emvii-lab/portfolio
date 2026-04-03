/* ── Shared refs ── */
const burger   = document.querySelector('.nav-burger');
const navMenu  = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

/* ── Hamburger menu ── */
if (burger && navMenu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  navItems.forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

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

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navItems.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? '#fff' : '';
  });
}, { passive: true });