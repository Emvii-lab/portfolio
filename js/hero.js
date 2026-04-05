/* ── Hero typewriter ── */
document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('.hero-subtitle');
  if (!el) return;

  const text = el.textContent.trim();
  el.textContent = '';

  // cursor span
  const cursor = document.createElement('span');
  cursor.className = 'hero-type-cursor';
  cursor.textContent = '█';
  el.appendChild(cursor);

  let i = 0;
  const speed = 42; // ms per character

  const type = () => {
    if (i < text.length) {
      el.insertBefore(document.createTextNode(text[i]), cursor);
      i++;
      setTimeout(type, speed);
    } else {
      // typing done — cursor stays and blinks
      cursor.classList.add('blink');
    }
  };

  setTimeout(type, 700); // wait for headline animation
});