/**
 * S5 · So arbeiten wir zusammen (nur gepinnte Modi). Der orange Faden zeichnet sich scrollgesteuert durch die sechs Stationen:
 * Desktop quer (gepinnt, folgt dem Scrollen 1:1), mobil senkrecht ohne Pin. Der Faden kommt am linken Rand aus S4 (gleiche x-Position),
 * jede Station zeichnet ihr Piktogramm, sobald der Faden sie erreicht; zuletzt endet er im NP-Logo (Betreuung).
 * Das Logo ist das Objekt der Übergabe an S6 (P-Iris, src/motion/transitions.js).
 * Geometrie wird bei jedem Refresh neu gemessen (Offset-Kette bis zur Bühne, ohne Transformationen).
 */
import { gsap, ScrollTrigger, $, $$, mode } from '../base.js';

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export function initZusammenarbeit() {
  const sec = $('[data-zs]');
  if (!sec || !(mode === 'desktop' || mode === 'mobile')) return;
  const desktop = mode === 'desktop';
  const stage = $('[data-zs-stage]', sec); const track = $('[data-zs-track]', sec);
  const svg = $('[data-zs-thread]', sec); const path = $('.zs-thread-path', svg);
  const steps = $$('[data-zs-step]', sec);
  const pics = steps.map((s) => ({ svg: $('[data-zs-pic]', s), paths: $$('.zs-p', s), texts: $$('.zs-nr, .zs-h, .zs-t', s) }));
  const head = $('.zs-head', sec);

  const rel = (e) => { let x = 0; let y = 0; for (let n = e; n && n !== stage; n = n.offsetParent) { x += n.offsetLeft; y += n.offsetTop; } return { x, y, w: e.offsetWidth, h: e.offsetHeight }; };
  let th = [];
  const build = () => {
    const sb = stage.getBoundingClientRect();
    const fx = (() => { const d = document.createElement('i'); d.style.cssText = 'position:fixed;left:var(--fx);top:0;width:0;height:0'; document.body.append(d); const v = d.getBoundingClientRect().left; d.remove(); return v; })();
    const fxS = fx - sb.left; // x des Fadens in Bühnenkoordinaten (gleiche Seite wie in den Nachbarabschnitten)
    const first = rel(pics[0].svg); const last = rel(pics[5].svg);
    const pad = parseFloat(getComputedStyle(pics[0].svg).paddingLeft) || 0;
    const R = (first.w - 2 * pad) / 64; // Piktogramm: viewBox 64 → Innenmaß des Kreises
    let d; let L; const at = [];
    if (desktop) {
      const yT = first.y + first.h / 2; const xEnd = last.x - 8;
      d = `M${fxS} 0 V${yT} H${xEnd}`; L = yT + (xEnd - fxS);
      pics.forEach((p, i) => { const r = rel(p.svg); at.push(i === 5 ? 1 : (yT + (r.x - fxS)) / L); });
    } else {
      const cx = first.x + first.w / 2; const yH = rel(head).y + head.offsetHeight + 12; const yEnd = last.y - 6;
      d = `M${fxS} 0 V${yH} H${cx} V${yEnd}`; L = yH + (cx - fxS) + (yEnd - yH);
      pics.forEach((p, i) => { const r = rel(p.svg); at.push(i === 5 ? 1 : (yH + (cx - fxS) + (r.y - yH)) / L); });
    }
    path.setAttribute('d', d);
    th = at;
  };
  build();
  ScrollTrigger.addEventListener('refresh', build);

  const update = (P) => {
    const t = P / (desktop ? 0.52 : 0.8); // Desktop: Der Faden ist nach gut der Hälfte der Pinlänge fertig, danach steht alles zum Lesen (kein Wegziehen vor dem Lesen)
    path.style.strokeDashoffset = String(1 - clamp(t));
    pics.forEach((p, i) => {
      const q = clamp((t - th[i]) / 0.12);
      const n = p.paths.length;
      p.paths.forEach((el, j) => { el.style.strokeDashoffset = String(1 - clamp(q * n - j)); });
      if (p.svg.classList.contains('zs-logo')) p.svg.style.opacity = String(clamp(q * 1.4));
      const o = clamp(q * 1.6);
      p.texts.forEach((el) => { el.style.opacity = String(o); el.style.transform = `translateY(${(1 - o) * 8}px)`; });
    });
  };
  update(0);
  ScrollTrigger.create(desktop
    ? { trigger: track, start: 'top top', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true, onUpdate: (self) => update(self.progress), onRefresh: (self) => update(self.progress) }
    : { trigger: stage, start: 'top 60%', end: 'bottom 62%', scrub: true, invalidateOnRefresh: true, onUpdate: (self) => update(self.progress), onRefresh: (self) => update(self.progress) });
}
