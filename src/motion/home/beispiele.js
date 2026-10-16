/**
 * S4 · Der Musterkoffer. Desktop (gepinnt): Die neun Vorschaukarten liegen zuerst als gefächerter Stapel auf dem „Tisch“ (Mitte des Rasters);
 * sobald der Abschnitt einfährt, werden sie zeitgesteuert ausgeteilt (FLIP, 70 ms Versatz je Karte) und rasten in ihre Zelle des 3×3-Rasters ein,
 * jede setzt sich mit einem kurzen Schnittmarken-Zucken. Rückwärts fährt der Stapel wieder zusammen. Nur Transform. Bewegung reduzieren: das Raster steht sofort. Mobil: zweispaltig, jede Karte erscheint beim Einfahren.
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
  // FLIP: First = Stapel in der Mitte des Rasters (gemessen), Last = Zelle im Raster; abgespielt wird nur mit transform
  const stack = (i) => {
    const g = rel(grid); const c = rel(cards[i]); const f = fan(i);
    return { x: g.x + g.w / 2 - (c.x + c.w / 2) + f.x, y: g.y + g.h / 2 - (c.y + c.h / 2) + f.y, rotation: f.r };
  };
  // Zeitgesteuert statt am Scrollen: Der Stapel fächert sich sichtbar auf, auch wenn jemand schnell scrollt (je Karte 70 ms versetzt)
  const tl = gsap.timeline({ paused: true });
  cards.forEach((card, i) => {
    const s = () => stack(i);
    tl.fromTo(card, { x: () => s().x, y: () => s().y, rotation: () => s().rotation, scale: 0.93 },
      { x: 0, y: 0, rotation: 0, scale: 1, duration: 0.95, ease: 'power3.inOut', immediateRender: true,
        onComplete: () => card.classList.add('is-set'), onReverseComplete: () => card.classList.remove('is-set') }, i * 0.07);
  });
  // Messwerte der Ausgangslage nach jedem Refresh neu (Größenänderung), ohne die Wiedergabe zu stören
  ScrollTrigger.addEventListener('refresh', () => { const p = tl.progress(); tl.invalidate(); tl.progress(p, true); });
  ScrollTrigger.create({
    trigger: track, start: 'top 38%', end: 'bottom top',
    onEnter: () => tl.play(), onEnterBack: () => tl.play(), onLeaveBack: () => tl.reverse(),
  });

  // Faden und Unterstreichung beim Einfahren des Abschnitts
  if (faden) gsap.fromTo(faden, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: sec, start: 'top 80%', end: 'top 20%', scrub: true, invalidateOnRefresh: true } });
  if (underline) gsap.fromTo(underline, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: sec, start: 'top 45%', end: 'top top', scrub: true, invalidateOnRefresh: true } });
}
