/**
 * S4 · Der Musterkoffer. Desktop (gepinnt): Die neun Vorschaukarten liegen zuerst als gefächerter Stapel auf dem „Tisch“ (Mitte des Rasters);
 * beim Scrollen werden sie nacheinander ausgeteilt und rasten in ihre Zelle des 3×3-Rasters ein (Versatz je Karte 5 Prozent der Pinlänge),
 * jede setzt sich mit einem kurzen Schnittmarken-Zucken. Nur Transform. Mobil: zweispaltig, jede Karte erscheint beim Einfahren.
 * Der Faden zeichnet sich am linken Rand und unterstreicht die Überschrift.
 */
import { gsap, ScrollTrigger, $, $$, mode } from '../base.js';

export function initBeispiele() {
  const sec = $('[data-beispiele]');
  if (!sec) return;
  const cards = $$('[data-card]', sec);
  const grid = $('[data-bsp-grid]', sec);
  const stage = $('[data-bsp-stage]', sec);
  const track = $('[data-bsp-track]', sec);
  const underline = $('[data-bsp-underline]', sec);
  const faden = $('[data-faden-v]', sec);

  if (mode === 'mobile') {
    cards.forEach((card, i) => {
      gsap.fromTo(card, { autoAlpha: 0, y: 26 }, {
        autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: card, start: 'top 92%', once: true, onEnter: () => card.classList.add('is-set') },
        delay: (i % 2) * 0.06,
      });
    });
    if (underline) gsap.fromTo(underline, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: underline, start: 'top 90%', once: true } });
    return;
  }
  if (mode !== 'desktop') return;

  // Lage eines Elements in der Bühne (Offset-Kette bis zur Bühne, ohne Transformationen und unabhängig vom Scrollstand)
  const rel = (e) => { let x = 0; let y = 0; for (let n = e; n && n !== stage; n = n.offsetParent) { x += n.offsetLeft; y += n.offsetTop; } return { x, y, w: e.offsetWidth, h: e.offsetHeight }; };
  const n = cards.length;
  const fan = (i) => { const t = (i - (n - 1) / 2) / ((n - 1) / 2); return { x: t * 64, y: Math.abs(t) * 16, r: t * 13 }; };
  const stack = (i) => {
    const g = rel(grid); const c = rel(cards[i]); const f = fan(i);
    return { x: g.x + g.w / 2 - (c.x + c.w / 2) + f.x, y: g.y + g.h / 2 - (c.y + c.h / 2) + f.y, rotation: f.r };
  };
  const STEP = 0.05; const DUR = 0.2; const T0 = 0.04; // Anteile der Pinlänge
  const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: track, start: 'top top', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true } });
  cards.forEach((card, i) => {
    const s = () => stack(i);
    tl.fromTo(card, { x: () => s().x, y: () => s().y, rotation: () => s().rotation, scale: 0.93 }, { x: () => s().x, y: () => s().y, rotation: () => s().rotation, scale: 0.93, duration: 0.001, immediateRender: true }, 0)
      .fromTo(card, { x: () => s().x, y: () => s().y, rotation: () => s().rotation, scale: 0.93 }, { x: 0, y: 0, rotation: 0, scale: 1, duration: DUR, ease: 'power2.inOut', immediateRender: false }, T0 + i * STEP);
  });
  tl.set({}, {}, 1); // die Zeitleiste ist genau eine Pinlänge lang, danach steht das Raster
  ScrollTrigger.create({
    trigger: track, start: 'top top', end: 'bottom bottom',
    onUpdate: (self) => cards.forEach((c, i) => c.classList.toggle('is-set', self.progress >= T0 + i * STEP + DUR * 0.92)),
    onLeaveBack: () => cards.forEach((c) => c.classList.remove('is-set')),
  });

  // Faden und Unterstreichung beim Einfahren des Abschnitts
  if (faden) gsap.fromTo(faden, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: sec, start: 'top 80%', end: 'top 20%', scrub: true, invalidateOnRefresh: true } });
  if (underline) gsap.fromTo(underline, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: sec, start: 'top 45%', end: 'top top', scrub: true, invalidateOnRefresh: true } });
}
