const WEBHOOK = 'https://n8n.emvii.fr/webhook/8efdfc93-c75a-4f81-a2cc-04cacb263776';

const form    = document.getElementById('contact-form');
const confirm = document.getElementById('contact-confirm');
const btn     = document.getElementById('submit-btn');
const icon    = document.getElementById('submit-icon');
const label   = document.getElementById('submit-label');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    /* Loading state */
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

      /* Show confirmation */
      form.hidden = true;
      confirm.hidden = false;
      form.reset();
    } catch {
      /* Error fallback */
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