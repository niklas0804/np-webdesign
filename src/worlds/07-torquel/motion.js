/**
 * Welt 07 · Bewegung und Bedienung (Blueprint F, I).
 * Eine Laserlinie scannt das Bauteil horizontal, dahinter entsteht das Messprotokoll; die Kennzahlen zählen einmal hoch.
 * Bauteil drehen per Ziehen, Scrollen, Regler und Tasten: zwölf Ansichten im Abstand von 30 Grad (mobil sechs), kein WebGL.
 * Die Anfrage für Zeichnungen ist eine Demo: nichts wird gesendet, keine Datei hochgeladen.
 * Ruhig und ohne JavaScript: Werte und Protokoll stehen fertig da. `init` liefert die Aufräum-Funktion.
 */
import { gsap, ScrollTrigger, $, $$, mode } from '../../motion/base.js';

const fmt = (n, dec) => n.toLocaleString('de-DE', { minimumFractionDigits: dec, maximumFractionDigits: dec });

export function init() {
  const root = $('.w07');
  if (!root) return () => {};
  const cleanups = [];
  const animated = mode === 'desktop' || mode === 'mobile';

  const stopDreher = initDreher(root, animated);
  initAnfrage(root);

  if (animated) {
    const ctx = gsap.context(() => {
      // Kennzahlen zählen einmal hoch
      $$('[data-count]', root).forEach((el) => {
        const end = Number(el.dataset.zahl); const dec = Number(el.dataset.dec); const pre = el.dataset.pre || '';
        const s = { v: 0 };
        el.textContent = pre + fmt(0, dec);
        ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => gsap.to(s, { v: end, duration: 1.4, ease: 'power2.out', onUpdate: () => { el.textContent = pre + fmt(s.v, dec); } }) });
      });
      // Laserlinie scannt horizontal, das Protokoll entsteht dahinter (an das Scrollen gebunden, rückwärts umkehrbar)
      const scan = $('[data-scan]', root);
      const bild = $('.w07-scan-bild', root);
      const laser = $('[data-laser]', root);
      const rows = $$('[data-row]', root);
      if (scan && bild && laser) {
        ScrollTrigger.create({
          trigger: scan, start: 'top 70%', end: 'bottom 55%', scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            gsap.set(laser, { x: () => p * (bild.clientWidth - 3), autoAlpha: p > 0.01 && p < 0.99 ? 1 : 0 });
            rows.forEach((r, i) => r.classList.toggle('is-on', p >= (i + 1) / (rows.length + 1)));
          },
        });
      }
    }, root);
    cleanups.push(() => ctx.revert());
  }
  cleanups.push(stopDreher);
  return () => cleanups.forEach((fn) => fn());
}

/* Bauteil drehen: Index 0–11 (Winkel = Index · 30°). Mobil gibt es sechs Ansichten (nur gerade Indizes). */
function initDreher(root, animated) {
  const sec = $('[data-dreher]', root);
  const stage = $('[data-dreher-stage]', root);
  const range = $('[data-range]', root);
  if (!sec || !stage || !range) return () => {};
  const N = Number(sec.dataset.ansichten); const step = Number(sec.dataset.schritt);
  const stride = mode === 'mobile' ? 2 : 1; // mobil: sechs statt zwölf Ansichten
  const count = N / stride;
  const text = $('[data-winkel-text]', root);
  let idx = 0; let touched = false;
  range.max = String(count - 1);
  const show = (i) => {
    idx = ((i % count) + count) % count;
    const angle = idx * stride * step;
    range.value = String(idx);
    range.setAttribute('aria-valuetext', `Ansicht ${idx + 1} von ${count}, ${angle} Grad`);
    text.textContent = `Ansicht ${String(idx + 1).padStart(2, '0')} von ${count} · ${angle}°`;
    sec.style.setProperty('--w07-winkel', `${angle}deg`);
  };
  show(0);
  range.addEventListener('input', () => { touched = true; show(Number(range.value)); });
  $('[data-prev]', root).addEventListener('click', () => { touched = true; show(idx - 1); });
  $('[data-next]', root).addEventListener('click', () => { touched = true; show(idx + 1); });
  // Ziehen: alle 28 px eine Ansicht
  let drag = null;
  stage.addEventListener('pointerdown', (e) => { drag = { x: e.clientX, i: idx }; stage.setPointerCapture(e.pointerId); touched = true; });
  stage.addEventListener('pointermove', (e) => { if (drag) show(drag.i - Math.round((e.clientX - drag.x) / 28)); });
  const end = () => { drag = null; };
  stage.addEventListener('pointerup', end); stage.addEventListener('pointercancel', end);
  // Scrollen: solange niemand zieht oder den Regler benutzt, dreht das Scrollen das Bauteil
  let st;
  if (animated) {
    st = ScrollTrigger.create({
      trigger: sec, start: 'top 75%', end: 'bottom 25%',
      onUpdate: (self) => { if (!touched) show(Math.min(count - 1, Math.floor(self.progress * count))); },
      onLeave: () => { touched = false; }, onLeaveBack: () => { touched = false; },
    });
  }
  return () => st && st.kill();
}

/* Anfrage (Demo): nichts wird gesendet, die gewählte Datei wird nicht gelesen oder übertragen, nur ihr Name erscheint */
function initAnfrage(root) {
  const form = $('[data-form]', root);
  if (!form) return;
  const confirm = $('[data-confirm]', form);
  const file = $('[data-datei]', form);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = file.files && file.files[0] ? file.files[0].name : 'ohne Datei';
    confirm.hidden = false;
    confirm.textContent = `Das ist eine Demo: Die Anfrage (${name}) wurde nicht gesendet, und es wurde nichts hochgeladen.`;
  });
}
