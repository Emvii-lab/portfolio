/* ── Hero floating neon particles ── */
const container = document.getElementById('particles');
const COLORS = ['#FF2D95', '#B026FF', '#00F0FF'];
const COUNT = 28;

for (let i = 0; i < COUNT; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const color = COLORS[i % COLORS.length];
  const size = Math.random() * 3 + 1;
  p.style.cssText = `
    left: ${Math.random() * 100}%;
    width: ${size}px;
    height: ${size}px;
    background: ${color};
    box-shadow: 0 0 ${size * 3}px ${color};
    animation-duration: ${Math.random() * 10 + 8}s;
    animation-delay: ${Math.random() * 8}s;
  `;
  container.appendChild(p);
}