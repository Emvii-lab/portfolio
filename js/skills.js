/* ── Bars fill animation on scroll ── */
document.querySelectorAll('.bar-fill').forEach(bar => {
  const target = bar.style.width || '0%';
  bar.style.width = '0';
  bar.dataset.w = target;
});

const barsObserver = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.bar-fill').forEach((bar, i) => {
        setTimeout(() => { bar.style.width = bar.dataset.w; }, i * 120);
      });
      barsObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.3 }
);
document.querySelectorAll('.skill-col').forEach(col => barsObserver.observe(col));