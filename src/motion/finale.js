/**
 * Finale (Blueprint L, Kurskorrektur 11. Oktober 2026, Nachbesserung 17. Oktober): Rückzoom auf den Werkplan. Die Szene beginnt mit dem NP-Logo,
 * das der Übergang 09 → Finale aus den Linien der neun Welten gezeichnet hat (es steht in der Mitte des Werkplans und füllt dort die Bühne zur Hälfte).
 * Die Kamera fährt zurück, bis der ganze Werkplan sichtbar ist, die neun Studien und der leere zehnte Platz erscheinen, der Cursor blinkt,
 * die Einladung erscheint. Gepinnte Szene, folgt dem Scrollen 1:1. Nur in den Modi desktop und mobile. Nur Transform, Deckkraft, Maske.
 */
import { gsap, $, $$ } from './base.js';
import { docRect } from './baton.js';

/** Größe des Logos im ersten Bild: halbe Bühnenhöhe, höchstens 78 Prozent der Breite */
const startScale = (sw, sh, lw, lh) => Math.min((0.5 * sh) / lh, (0.78 * sw) / lw);

/**
 * Wo das Logo im ersten Bild des Finales steht (Rechteck in Bühnenkoordinaten, Stand Fortschritt 0).
 * Reine Rechnung aus den Layout-Maßen (ohne Transformationen und ohne Nebenwirkung), damit der Übergang 09 → Finale genau dorthin zeichnen kann.
 */
export function logoAtStart() {
  const sec = $('[data-finale]');
  if (!sec) return null;
  const stage = $('[data-f-stage]', sec); const grid = $('[data-f-grid]', sec); const centre = $('[data-f-center]', sec); const logo = $('[data-f-logo]', sec);
  if (!stage || !grid || !centre || !logo) return null;
  const sr = docRect(stage); const gr = docRect(grid); const cr = docRect(centre); const lr = docRect(logo);
  const cx = cr.x - sr.x + cr.w / 2; const cy = cr.y - sr.y + cr.h / 2;
  const s0 = startScale(sr.w, sr.h, lr.w, lr.h);
  const x0 = sr.w / 2 - cx; const y0 = sr.h / 2 - cy;
  const ox = cx - (gr.x - sr.x); const oy = cy - (gr.y - sr.y);
  const at = (v, o, t) => o + t + s0 * (v - o);
  const left = (gr.x - sr.x) + at(lr.x - gr.x, ox, x0); const top = (gr.y - sr.y) + at(lr.y - gr.y, oy, y0);
  const w = lr.w * s0; const h = lr.h * s0;
  return { x: left, y: top, w, h, cx: left + w / 2, cy: top + h / 2 };
}

export function initFinale() {
  const sec = $('[data-finale]');
  if (!sec) return;
  const stage = $('[data-f-stage]', sec);
  const plan = $('[data-f-plan]', sec);
  const grid = $('[data-f-grid]', sec);
  const cells = $$('.f-cell', sec);
  const open = $('[data-f-open]', sec);
  const centre = $('[data-f-center]', sec);
  const chrome = $('[data-f-chrome]', sec);
  const logo = $('[data-f-logo]', sec);
  const cursor = $('[data-f-cursor]', sec);
  const invite = $('[data-f-invite]', sec);
  if (!stage || !grid || !cells.length || !open || !centre || !logo) return;

  const build = () => {
    gsap.set(grid, { clearProps: 'transform' });
    const sr = stage.getBoundingClientRect();
    const gr = grid.getBoundingClientRect();
    const cr = centre.getBoundingClientRect();
    const lr = logo.getBoundingClientRect();
    // Start: das Logo in der Mitte des Werkplans steht in der Mitte der Bühne und füllt sie zur Hälfte, die Kamera fährt von dort zurück
    const cx = cr.left - sr.left + cr.width / 2;
    const cy = cr.top - sr.top + cr.height / 2;
    const s0 = startScale(sr.width, sr.height, lr.width, lr.height);
    return { s0, x0: sr.width / 2 - cx, y0: sr.height / 2 - cy, ox: cx - (gr.left - sr.left), oy: cy - (gr.top - sr.top) };
  };
  let g = build();

  const len = () => parseFloat(getComputedStyle(sec).getPropertyValue('--len'));
  let blinked = false;

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: sec,
      start: 'top top',
      end: () => '+=' + (len() / 100) * stage.offsetHeight,
      scrub: true,
      invalidateOnRefresh: true,
      onRefreshInit: () => { g = build(); },
      // ScrollTrigger setzt bei invalidateOnRefresh zurück und rendert nur Tweens mit ausdrücklichem immediateRender neu: einmal durchspielen, damit alle Startzustände stehen
      onRefresh: () => { const p = tl.progress(); tl.progress(1, true).progress(p, true); },
      onUpdate: (self) => {
        const p = self.progress;
        if (p > 0.62 && !blinked) { blinked = true; cursor.classList.add('is-blink'); }
        if (p < 0.4 && blinked) { blinked = false; cursor.classList.remove('is-blink'); }
      },
    },
  });

  // 0–55 %: Rückzoom vom Logo auf den ganzen Werkplan. Der erste Grund ist Kalk (wie am Ende des Übergangs), er geht in Leinen über.
  tl.fromTo(plan, { autoAlpha: 1 }, { autoAlpha: 1, duration: 0.001 }, 0);
  tl.fromTo(stage, { backgroundColor: '#FBF8F5' }, { backgroundColor: '#F0EBE3', duration: 0.3, immediateRender: true }, 0.08);
  tl.fromTo(grid,
    { scale: () => g.s0, x: () => g.x0, y: () => g.y0, transformOrigin: () => `${g.ox}px ${g.oy}px` },
    { scale: 1, x: 0, y: 0, duration: 0.55, ease: 'power2.inOut', immediateRender: true }, 0);
  // Die Plätze erscheinen, sobald sie ins Bild kommen (von außen nach innen); der Rahmen der Mitte zeichnet sich ein
  cells.slice().reverse().forEach((c, i) => tl.fromTo(c, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.16 + i * 0.035));
  if (chrome) tl.fromTo(chrome, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.14 }, 0.2);

  // 62–82 %: Einladung
  tl.fromTo(invite, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.14 }, 0.62);
  tl.set({}, {}, 1);
}
