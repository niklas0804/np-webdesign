/**
 * Welt 06 · Bewegung und Bedienung (Blueprint F, I).
 * Die Kugel atmet mit dem Scrollen (Skalierung 0,9 bis 1,05), die Kreise wachsen nach außen wie Ringe im Wasser.
 * „Drei Fragen“ (Demo): die Antworten färben die Kugel, nichts wird gespeichert oder gesendet. Die Terminanfrage ist zwei Klicks kurz.
 * Ruhig und ohne JavaScript: nichts bewegt sich, alles steht im Text. `init` liefert die Aufräum-Funktion.
 */
import { gsap, ScrollTrigger, $, $$, mode } from '../../motion/base.js';
import { ERGEBNISSE } from './data.js';

export function init() {
  const root = $('.w06');
  if (!root) return () => {};
  const cleanups = [];
  initFragen(root);
  initTermin(root);

  if (mode === 'desktop' || mode === 'mobile') {
    const ctx = gsap.context(() => {
      const hero = $('.w06-hero', root);
      // Atmen: nur Skalierung, an das Scrollen gebunden, kein Dauerlauf
      gsap.fromTo($('[data-orbwrap]', root), { scale: 0.9 }, { scale: 1.05, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
      // Ringe wachsen nach außen, nacheinander
      $$('[data-ring]', root).reverse().forEach((r, i) => {
        gsap.fromTo(r, { scale: 0.9, autoAlpha: 0.5 }, { scale: 1.12, autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: hero, start: "top top", end: 'bottom top', scrub: true } });
      });
      gsap.from($$('.w06-kicker, .w06-title, .w06-satz, .w06-unter, .w06-hero .w06-pill', root), { autoAlpha: 0, y: 14, duration: 0.7, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: hero, start: 'top 85%', once: true } });
      gsap.from($$('.w06-karte', root), { autoAlpha: 0, y: 16, duration: 0.7, stagger: 0.12, ease: 'power2.out', scrollTrigger: { trigger: $('.w06-karten', root), start: 'top 85%', once: true } });
      gsap.from($$('.w06-kreise li', root), { autoAlpha: 0, x: -10, duration: 0.6, stagger: 0.12, ease: 'power2.out', scrollTrigger: { trigger: $('.w06-kreise', root), start: 'top 85%', once: true } });
    }, root);
    cleanups.push(() => ctx.revert());
  }
  return () => cleanups.forEach((fn) => fn());
}

/* Drei Fragen: der Mittelwert der Antworten bestimmt die Stimmung der Kugel (0 ruhig, 1 klar, 2 in Bewegung) */
function initFragen(root) {
  const orbs = $$('[data-orb]', root);
  const inputs = $$('[data-antwort]', root);
  const box = $('[data-ergebnis]', root);
  const t = $('[data-ergebnis-t]', root);
  const x = $('[data-ergebnis-x]', root);
  if (!inputs.length) return;
  const update = () => {
    const picked = $$('[data-antwort]:checked', root).map((i) => Number(i.value));
    if (!picked.length) return;
    const mood = Math.max(0, Math.min(2, Math.round(picked.reduce((a, b) => a + b, 0) / picked.length)));
    orbs.forEach((o) => o.setAttribute('data-mood', String(mood)));
    const all = picked.length === 3;
    box.hidden = !all;
    if (all) { t.textContent = ERGEBNISSE[mood].titel; x.textContent = ERGEBNISSE[mood].text; }
  };
  inputs.forEach((i) => i.addEventListener('change', update));
}

/* Terminanfrage: Zeit wählen, vormerken; lokal, nichts wird gesendet */
function initTermin(root) {
  const slots = $$('[data-slot]', root);
  const go = $('[data-vormerken]', root);
  const confirm = $('[data-confirm]', root);
  if (!slots.length || !go) return;
  let pick = null;
  slots.forEach((b) => b.addEventListener('click', () => {
    pick = b.textContent.trim();
    slots.forEach((o) => o.setAttribute('aria-pressed', o === b ? 'true' : 'false'));
    go.disabled = false; confirm.hidden = true;
  }));
  go.addEventListener('click', () => {
    if (!pick) return;
    confirm.hidden = false;
    confirm.textContent = `Vorgemerkt: ${pick}. Das ist eine Demo, es wird nichts gesendet.`;
  });
}
