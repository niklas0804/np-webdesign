/**
 * Finale (Blueprint L, Kurskorrektur 11. Oktober 2026): Rückzoom auf den Werkplan. Die Szene beginnt mit dem zehnten Platz, der die Bühne füllt
 * und das erleuchtete Fenster trägt (so endet der Übergang 09 → Finale). Die Kamera fährt zurück, bis der ganze Werkplan sichtbar ist,
 * das Fenster schrumpft mit seinem Platz, der Cursor blinkt, die Einladung erscheint.
 * Gepinnte Szene, folgt dem Scrollen 1:1. Nur in den Modi desktop und mobile. Nur Transform, Deckkraft, Maske.
 */
import { gsap, $, $$ } from './base.js';
import { docRect } from './baton.js';

/**
 * Wo das erleuchtete Fenster im ersten Bild des Finales steht (Fensterrechteck im Bühnen-/Fensterraum, Stand Fortschritt 0).
 * Reine Rechnung aus den Layout-Maßen (ohne Transformationen und ohne Nebenwirkung), damit der Übergang 09 → Finale genau dorthin landen kann.
 */
export function windowAtStart() {
  const sec = $('[data-finale]');
  if (!sec) return null;
  const stage = $('[data-f-stage]', sec); const grid = $('[data-f-grid]', sec); const open = $('[data-f-open]', sec); const win = $('[data-f-window]', sec);
  if (!stage || !grid || !open || !win) return null;
  const sr = docRect(stage); const gr = docRect(grid); const lr = docRect(open); const wr = docRect(win);
  const cx = lr.x - sr.x + lr.w / 2; const cy = lr.y - sr.y + lr.h / 2;
  const s0 = Math.max(sr.w / lr.w, sr.h / lr.h) * 1.06;
  const x0 = sr.w / 2 - cx; const y0 = sr.h / 2 - cy;
  const ox = cx - (gr.x - sr.x); const oy = cy - (gr.y - sr.y);
  const at = (v, o, t) => o + t + s0 * (v - o);
  const left = (gr.x - sr.x) + at(wr.x - gr.x, ox, x0); const top = (gr.y - sr.y) + at(wr.y - gr.y, oy, y0);
  const w = wr.w * s0; const h = wr.h * s0;
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
  const empty = $('[data-f-empty]', sec);
  const cursor = $('[data-f-cursor]', sec);
  const invite = $('[data-f-invite]', sec);
  const win = $('[data-f-window]', sec);
  if (!stage || !grid || !cells.length || !open || !centre) return;

  const build = () => {
    gsap.set(grid, { clearProps: 'transform' });
    const sr = stage.getBoundingClientRect();
    const gr = grid.getBoundingClientRect();
    const lr = open.getBoundingClientRect();
    // Start: der zehnte Platz füllt die Bühne bis zum Rand (deckt sie ganz), die Kamera fährt von dort zurück
    const cx = lr.left - sr.left + lr.width / 2;
    const cy = lr.top - sr.top + lr.height / 2;
    const s0 = Math.max(sr.width / lr.width, sr.height / lr.height) * 1.06;
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

  // 0–55 %: Rückzoom vom zehnten Platz auf den ganzen Werkplan
  tl.fromTo(plan, { autoAlpha: 1 }, { autoAlpha: 1, duration: 0.001 }, 0);
  tl.fromTo(grid,
    { scale: () => g.s0, x: () => g.x0, y: () => g.y0, transformOrigin: () => `${g.ox}px ${g.oy}px` },
    { scale: 1, x: 0, y: 0, duration: 0.55, ease: 'power2.inOut', immediateRender: true }, 0);
  // Die übrigen Plätze erscheinen, sobald sie ins Bild kommen; der zehnte steht von Anfang an da
  cells.filter((c) => c !== open).reverse().forEach((c, i) => tl.fromTo(c, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.18 + i * 0.04));
  tl.fromTo(centre, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.08 }, 0.34);

  // Die Leiste des zehnten Platzes (Browserleiste) ist am Anfang ausgeblendet, damit das erste Bild nur Dämmerung und Fenster zeigt (so endet der Übergang 09 → Finale)
  const bar = $('.wp-bar', open);
  if (bar) tl.fromTo(bar, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.12 }, 0.14);

  // 50–70 %: Das Fenster verlischt langsam zur Form eines leeren Platzes mit Cursor, der Platz bleibt „Ihr Betrieb“
  tl.fromTo(win, { opacity: 1 }, { opacity: 0.55, duration: 0.2 }, 0.5);
  tl.fromTo(empty, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, 0.56);

  // 62–82 %: Einladung
  tl.fromTo(invite, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.14 }, 0.62);
  tl.set({}, {}, 1);
}
