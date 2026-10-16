/**
 * S1 · Maßschicht der H1: Breiten der Zeilen, live gemessen (Range um den Text), nie erfunden.
 * Am Desktop endet jede Zeile mit einer Messmarke; schmal steht eine Bemaßung der längsten Zeile unter der Überschrift.
 * Neu gemessen nach dem Laden der Schrift und bei Größenänderung (entprellt), nie beim Scrollen.
 */
import { gsap, ScrollTrigger, $, $$, mode } from '../base.js';

const fmt = new Intl.NumberFormat('de-DE');
const el = (cls, tag = 'span') => { const e = document.createElement(tag); e.className = cls; return e; };

export function initHero() {
  const hero = $('.hero');
  const title = $('[data-hero-title]');
  const layer = $('[data-hero-ms]');
  if (!hero || !title || !layer) return;
  const lines = $$('[data-hero-line]', title);

  const draw = () => {
    layer.replaceChildren();
    const base = title.getBoundingClientRect();
    let widest = null;
    lines.forEach((ln, i) => {
      const r = document.createRange();
      r.selectNodeContents(ln);
      const b = r.getBoundingClientRect();
      if (!b.width) return;
      const w = Math.round(b.width);
      const ms = el('hero-ms');
      ms.style.setProperty('--i', String(i));
      ms.style.left = `${b.right - base.left + 14}px`;
      ms.style.top = `${b.top - base.top + b.height / 2 - 7}px`;
      const v = document.createElement('span');
      v.textContent = `${fmt.format(w)} px`;
      ms.append(v);
      layer.append(ms);
      if (!widest || w > widest.w) widest = { w, left: b.left - base.left };
    });
    if (widest) {
      const dim = el('hero-dim');
      dim.style.left = `${widest.left}px`;
      dim.style.width = `${widest.w}px`;
      dim.style.top = `${base.height + 10}px`;
      dim.append(document.createElement('i'));
      const v = document.createElement('span');
      v.textContent = `← ${fmt.format(widest.w)} px →`;
      dim.append(v);
      layer.append(dim);
    }
  };
  draw();
  let t;
  new ResizeObserver(() => { clearTimeout(t); t = setTimeout(draw, 150); }).observe(title);

  // Der orange Faden verlässt den Hero am linken Rand und führt in S2: er zeichnet sich, während der Hero nach oben wegscrollt
  const faden = $('[data-faden-v]', hero);
  if (faden && (mode === 'desktop' || mode === 'mobile')) {
    gsap.fromTo(faden, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true } });
  }
}
