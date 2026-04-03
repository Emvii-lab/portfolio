/* ── Pixels flottants autour du portrait ── */
(function () {
  const wrapper = document.querySelector('.portrait-wrapper');
  if (!wrapper) return;
  const COLORS = ['#FF2D95', '#B026FF', '#00F0FF'];

  function spawnPixel() {
    const px    = document.createElement('div');
    const size  = Math.random() * 5 + 3;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const side  = Math.floor(Math.random() * 4);
    const dur   = 2500 + Math.random() * 2000;

    let startX, startY;
    if      (side === 0) { startX = Math.random() * 340 - 10; startY = -10; }
    else if (side === 1) { startX = 330;  startY = Math.random() * 340 - 10; }
    else if (side === 2) { startX = Math.random() * 340 - 10; startY = 330; }
    else                 { startX = -10;  startY = Math.random() * 340 - 10; }

    const driftX = (Math.random() - 0.5) * 40;
    const driftY = (Math.random() - 0.5) * 40;

    px.style.cssText = `
      position: absolute;
      width: ${size}px; height: ${size}px;
      border-radius: 1px;
      background: ${color};
      box-shadow: 0 0 ${size * 2}px ${color};
      left: ${startX}px; top: ${startY}px;
      opacity: 0;
      pointer-events: none;
      z-index: 3;
      transition: none;
    `;
    wrapper.appendChild(px);

    const anim = px.animate([
      { opacity: 0, transform: 'translate(0,0) scale(1)' },
      { opacity: 1, transform: `translate(${driftX * 0.3}px, ${driftY * 0.3}px) scale(1.2)`, offset: 0.15 },
      { opacity: 0.8, transform: `translate(${driftX}px, ${driftY}px) scale(0.8)`, offset: 0.8 },
      { opacity: 0, transform: `translate(${driftX * 1.3}px, ${driftY * 1.3}px) scale(0)` },
    ], { duration: dur, easing: 'ease-in-out', fill: 'forwards' });

    anim.onfinish = () => { px.remove(); spawnPixel(); };
  }

  for (let i = 0; i < 8; i++) {
    setTimeout(spawnPixel, i * 400);
  }
})();