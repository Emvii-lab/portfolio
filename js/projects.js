/* ── Tilt 3D sur les cartes projet ── */
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transition = 'transform 0.08s ease, box-shadow 0.3s ease';
    card.style.transform = `perspective(600px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease';
    card.style.transform = '';
  });
});

/* ── Pixel scratch reveal sur les images de projet ── */
function pixelScratch(imgEl) {
  const PIXEL      = 32;
  const GAP        = 2;
  const RADIUS     = 110;
  const FADE_SPEED = 0.08;

  const w   = imgEl.offsetWidth;
  const h   = imgEl.offsetHeight;
  const dpr = window.devicePixelRatio || 1;

  const canvas = document.createElement('canvas');
  canvas.width  = w * dpr;
  canvas.height = h * dpr;
  Object.assign(canvas.style, {
    position: 'absolute', inset: '0',
    width: w + 'px', height: h + 'px',
    borderRadius: '12px 12px 0 0', zIndex: '6',
    cursor: 'crosshair',
  });

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  imgEl.appendChild(canvas);

  const cols   = Math.ceil(w / PIXEL);
  const rows   = Math.ceil(h / PIXEL);
  const alphas = Array.from({ length: rows }, () => new Float32Array(cols).fill(1));

  let mouseX = -9999, mouseY = -9999;
  let rafId  = null;

  function initialDraw() {
    ctx.clearRect(0, 0, w, h);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const px = c * PIXEL + GAP;
        const py = r * PIXEL + GAP;
        const pw = PIXEL - GAP * 2;
        const ph = PIXEL - GAP * 2;
        const g  = ctx.createLinearGradient(px, py, px + pw, py + ph);
        g.addColorStop(0,   'rgba(140,20,80,0.85)');
        g.addColorStop(0.5, 'rgba(90,15,150,0.85)');
        g.addColorStop(1,   'rgba(0,120,160,0.85)');
        ctx.beginPath(); ctx.roundRect(px, py, pw, ph, 3); ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.roundRect(px, py, pw, ph * 0.4, [3, 3, 0, 0]); ctx.fillStyle = 'rgba(255,255,255,0.07)'; ctx.fill();
        ctx.beginPath(); ctx.roundRect(px, py + ph * 0.62, pw, ph * 0.38, [0, 0, 3, 3]); ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fill();
      }
    }
  }
  initialDraw();

  function drawFrame() {
    rafId = null;
    let needsNext = false;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (alphas[r][c] <= 0) continue;
        const cx   = c * PIXEL + PIXEL / 2;
        const cy   = r * PIXEL + PIXEL / 2;
        const dist = Math.hypot(cx - mouseX, cy - mouseY);
        if (dist < RADIUS) {
          const strength = 1 - dist / RADIUS;
          alphas[r][c]   = Math.max(0, alphas[r][c] - FADE_SPEED * strength * 2.5);
        }
        if (alphas[r][c] > 0) needsNext = true;
      }
    }

    ctx.clearRect(0, 0, w, h);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const a = alphas[r][c];
        if (a < 0.01) continue;
        const px = c * PIXEL + GAP;
        const py = r * PIXEL + GAP;
        const pw = PIXEL - GAP * 2;
        const ph = PIXEL - GAP * 2;
        const g = ctx.createLinearGradient(px, py, px + pw, py + ph);
        g.addColorStop(0,   `rgba(140,20,80,${a * 0.85})`);
        g.addColorStop(0.5, `rgba(90,15,150,${a * 0.85})`);
        g.addColorStop(1,   `rgba(0,120,160,${a * 0.85})`);
        ctx.beginPath(); ctx.roundRect(px, py, pw, ph, 3); ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.roundRect(px, py, pw, ph * 0.4, [3, 3, 0, 0]); ctx.fillStyle = `rgba(255,255,255,${a * 0.07})`; ctx.fill();
        ctx.beginPath(); ctx.roundRect(px, py + ph * 0.62, pw, ph * 0.38, [0, 0, 3, 3]); ctx.fillStyle = `rgba(0,0,0,${a * 0.35})`; ctx.fill();
      }
    }

    if (!needsNext) { canvas.remove(); return; }
    if (mouseX > 0) rafId = requestAnimationFrame(drawFrame);
  }

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    if (!rafId) rafId = requestAnimationFrame(drawFrame);
  });

  canvas.addEventListener('mouseleave', () => { mouseX = mouseY = -9999; });
}

const cardObserver = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => pixelScratch(e.target), 60);
      cardObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.15 }
);
document.querySelectorAll('.proj-img').forEach(c => cardObserver.observe(c));