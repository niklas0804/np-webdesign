/**
 * Welt 07 · Bewegung und Bedienung (Blueprint F, I).
 * Eine Laserlinie scannt das Messprotokoll horizontal, dahinter werden die Zeilen gültig; die Kennzahlen zählen einmal hoch.
 * Ohne Bildflächen (13. November 2026, 3.2): „Bauteil drehen“ entfällt.
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

  initAnfrage(root);

  if (animated) {
    const ctx = gsap.context(() => {
      // Kennzahlen zählen einmal hoch
      $$('[data-count]', root).forEach((el) => {
        const end = Number(el.dataset.zahl); const dec = Number(el.dataset.dec); const pre = el.dataset.pre || '';
        const s = { v: 0 };
        // Breite des Endwerts festhalten, damit das Hochzählen nichts umbricht und nichts verschiebt (Layout-Shift)
        el.style.display = 'inline-block'; el.style.minWidth = el.getBoundingClientRect().width + 'px';
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
            // Die Laserlinie blendet am Anfang und am Ende weich ein und aus (nur Deckkraft, kein harter Wechsel von visibility)
            gsap.set(laser, { x: () => p * (bild.clientWidth - 3), opacity: Math.min(1, p / 0.06, (1 - p) / 0.06) });
            rows.forEach((r, i) => r.classList.toggle('is-on', p >= (i + 1) / (rows.length + 1)));
          },
        });
      }
    }, root);
    cleanups.push(() => ctx.revert());
  }
  return () => cleanups.forEach((fn) => fn());
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
