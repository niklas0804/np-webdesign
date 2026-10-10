/**
 * Welt 08 · Bewegung und Bedienung (Blueprint F, I, P).
 * Die ruhigste Welt der Reise: kurze Einblendungen (Deckkraft und 8 px), sonst nichts. Terminbuchung als Demo (Behandlung, Tag, Uhrzeit),
 * vollständig per Tastatur (Radiogruppen, Pfeiltasten, Enter). Schalter „Große Schrift“ und „Hoher Kontrast“ wirken nur in dieser Welt.
 * Nichts wird gespeichert oder gesendet. `init` liefert die Aufräum-Funktion.
 */
import { gsap, $, $$, mode } from '../../motion/base.js';

export function init() {
  const root = $('[data-w08]');
  if (!root) return () => {};
  const cleanups = [];
  initSchalter(root);
  initBuchung(root);

  if (mode === 'desktop' || mode === 'mobile') {
    const ctx = gsap.context(() => {
      $$('[data-block]', root).forEach((b) => gsap.from(b, { autoAlpha: 0, y: 8, duration: 0.4, ease: 'power1.out', scrollTrigger: { trigger: b, start: 'top 90%', once: true } }));
    }, root);
    cleanups.push(() => ctx.revert());
  }
  return () => cleanups.forEach((fn) => fn());
}

/* Große Schrift und Hoher Kontrast: Attribute an der Welt, nichts wird gespeichert */
function initSchalter(root) {
  $$('[data-sw]', root).forEach((b) => b.addEventListener('click', () => {
    const on = b.getAttribute('aria-pressed') !== 'true';
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (on) root.setAttribute(`data-${b.dataset.sw}`, ''); else root.removeAttribute(`data-${b.dataset.sw}`);
  }));
}

/* Buchung: Demo ohne Versand */
function initBuchung(root) {
  const form = $('[data-buchung]', root);
  if (!form) return;
  const send = $('[data-send]', form);
  const confirm = $('[data-confirm]', form);
  const val = (name) => { const c = form.querySelector(`input[name="${name}"]:checked`); return c ? c.value : null; };
  const update = () => { send.disabled = !(val('behandlung') && val('tag') && val('zeit')); confirm.textContent = ''; };
  form.addEventListener('change', update);
  send.disabled = true;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const [b, t, z] = [val('behandlung'), val('tag'), val('zeit')];
    if (!(b && t && z)) { confirm.textContent = 'Bitte wählen Sie Behandlung, Tag und Uhrzeit.'; return; }
    confirm.textContent = `Vorgemerkt: ${b}, ${t}, ${z}. Das ist eine Demo, es wird nichts gesendet.`;
  });
}
