/**
 * Finale (Blueprint L): Rückzoom auf den Werkplan, das Logo rückt beiseite, das Zentrum bleibt leer, die Einladung erscheint,
 * dann wächst die leere Zelle auf Viewport-Größe und führt in den Kontakt (Spiegelbild von t00).
 * Gepinnte Szene, folgt dem Scrollen 1:1. Nur in den Modi desktop und mobile. Nur Transform, Deckkraft, Maske.
 */
import { gsap, $, $$ } from './base.js';
import { setSection } from './rahmen.js';

export function initFinale() {
  const sec = $('[data-finale]');
  if (!sec) return;
  const stage = $('[data-f-stage]', sec);
  const plan = $('[data-f-plan]', sec);
  const grid = $('[data-f-grid]', sec);
  const cells = $$('.f-cell', sec);
  const centre = $('[data-f-center]', sec);
  const logo = $('[data-f-logo]', sec);
  const empty = $('[data-f-empty]', sec);
  const cursor = $('[data-f-cursor]', sec);
  const invite = $('[data-f-invite]', sec);
  const sign = $('[data-f-sign]', sec);
  const grow = $('[data-f-grow]', sec);
  const kontakt = document.getElementById('kontakt');
  if (!stage || !grid || !cells.length || !centre) return;
  const last = cells[cells.length - 1];

  const build = () => {
    gsap.set(grid, { clearProps: 'transform' });
    const sr = stage.getBoundingClientRect();
    const gr = grid.getBoundingClientRect();
    const lr = last.getBoundingClientRect();
    const cr = centre.getBoundingClientRect();
    const cx = lr.left - sr.left + lr.width / 2;
    const cy = lr.top - sr.top + lr.height / 2;
    // Start: die letzte Zelle füllt die Bühne, die Kamera fährt von dort zurück
    const s0 = Math.max(sr.width / lr.width, sr.height / lr.height) * 1.1;
    // Ist über dem Raster Platz für die Signatur? Sonst blendet das Logo nur aus.
    const room = gr.top - sr.top > parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--frame-top')) + 56;
    return {
      s0, x0: sr.width / 2 - cx, y0: sr.height / 2 - cy, ox: cx - (gr.left - sr.left), oy: cy - (gr.top - sr.top), room,
      clip: `inset(${cr.top - sr.top}px ${sr.right - cr.right}px ${sr.bottom - cr.bottom}px ${cr.left - sr.left}px)`,
    };
  };
  let g = build();

  const len = () => parseFloat(getComputedStyle(sec).getPropertyValue('--len'));
  let section = null;
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
      onUpdate: (self) => {
        const p = self.progress;
        if (p > 0.62 && !blinked) { blinked = true; cursor.classList.add('is-blink'); }
        if (p < 0.4 && blinked) { blinked = false; cursor.classList.remove('is-blink'); }
        // Zählerwechsel in der Mitte des Sprungs in den Kontakt
        if (self.isActive && kontakt) {
          const jump = p > 0.9;
          if (jump !== section) { section = jump; setSection(jump ? kontakt : sec); }
        }
      },
      onLeaveBack: () => { section = null; },
    },
  });

  // 0–38 %: Rückzoom von der letzten Zelle auf den ganzen Werkplan
  tl.fromTo(plan, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.06 }, 0);
  tl.fromTo(grid,
    { scale: () => g.s0, x: () => g.x0, y: () => g.y0, transformOrigin: () => `${g.ox}px ${g.oy}px` },
    { scale: 1, x: 0, y: 0, duration: 0.38, ease: 'power2.inOut', immediateRender: true }, 0);
  // Weitere Rahmen erscheinen, sobald sie ins Bild kommen; die letzte Zelle steht von Anfang an da
  cells.slice(0, -1).reverse().forEach((c, i) => tl.fromTo(c, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.12 + i * 0.05));
  tl.fromTo(centre, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.08 }, 0.26);

  // 46–62 %: Das Logo rückt als Signatur nach oben, die leere Zelle bleibt mit Marke und Cursor
  tl.fromTo(logo, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.08 }, 0.46);
  if (g.room) tl.fromTo(sign, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.1 }, 0.5);
  tl.fromTo(empty, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.08 }, 0.54);

  // 62–74 %: Einladung
  tl.fromTo(invite, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.12 }, 0.62);

  // 80–100 %: Sprung in den Kontakt: die leere Zelle wächst auf Viewport-Größe
  const rest = [...cells, invite, empty, ...(g.room ? [sign] : [])];
  tl.fromTo(rest, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.08, immediateRender: false }, 0.8);
  tl.fromTo(grow, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.001 }, 0.8);
  tl.fromTo(grow, { clipPath: () => g.clip }, { clipPath: 'inset(0px 0px 0px 0px)', duration: 0.17, ease: 'power2.inOut', immediateRender: false }, 0.8);
  tl.to(plan, { autoAlpha: 0, duration: 0.01 }, 0.97);
  tl.to(grow, { autoAlpha: 0, duration: 0.03 }, 0.97);
  tl.set({}, {}, 1);
}
