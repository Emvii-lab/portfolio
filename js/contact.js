const WEBHOOK = 'https://n8n.emvii.fr/webhook/8efdfc93-c75a-4f81-a2cc-04cacb263776';

function showForm() {
  form.style.display = 'flex';
  confirmEl.style.display = 'none';
  btn.classList.remove('loading');
  btn.style.background = '';
  icon.textContent = '►';
  label.textContent = 'ENVOYER LE MESSAGE';
}

function showConfirm() {
  form.style.display = 'none';
  confirmEl.style.display = 'flex';
  typewriteConfirm();
}

function typewriteConfirm() {
  const title = document.querySelector('.confirm-title');
  if (!title) return;

  const text = title.dataset.text || 'MESSAGE ENVOYÉ !';
  title.textContent = '';

  const cursor = document.createElement('span');
  cursor.className = 'confirm-cursor';
  title.appendChild(cursor);

  let i = 0;
  const interval = setInterval(() => {
    title.insertBefore(document.createTextNode(text[i++]), cursor);
    if (i >= text.length) {
      clearInterval(interval);
      setTimeout(() => cursor.remove(), 800);
    }
  }, 60);
}

const form      = document.getElementById('contact-form');
const confirmEl = document.getElementById('contact-confirm');
const btn       = document.getElementById('submit-btn');
const icon      = document.getElementById('submit-icon');
const label     = document.getElementById('submit-label');
const resetBtn  = document.getElementById('confirm-reset-btn');

/* Cache la confirmation au chargement */
if (confirmEl) confirmEl.style.display = 'none';

if (resetBtn) {
  resetBtn.addEventListener('click', showForm);
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    btn.classList.add('loading');
    icon.textContent = '◌';
    label.textContent = 'ENVOI EN COURS...';

    const data = {
      nom:     form.nom.value.trim(),
      email:   form.email.value.trim(),
      message: form.message.value.trim(),
    };

    try {
      await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      form.reset();
      showConfirm();
    } catch {
      label.textContent = 'ERREUR — RÉESSAYEZ';
      icon.textContent = '✕';
      btn.classList.remove('loading');
      btn.style.background = 'linear-gradient(270deg, #ff4444, #b02626)';

      setTimeout(() => {
        btn.style.background = '';
        icon.textContent = '►';
        label.textContent = 'ENVOYER LE MESSAGE';
      }, 3000);
    }
  });
}