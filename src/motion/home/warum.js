/**
 * S2 · Warum eine eigene Website (nur gepinnte Modi). Drei Sätze, gepinnt; jeder Satz ist Zeile für Zeile auf Maß gesetzt
 * (Breitenachse von Archivo, erst an der Grenze die Größe, src/motion/fit.js). Während ein Satz steht, zeichnet die Maßschicht
 * in Glut Bemaßungslinien an einzelne Wörter, mit live gemessenen Breiten. Die vier Schnittmarken des Rahmens lösen sich von den
 * Viewport-Ecken und rahmen den Satz; der Faden zeichnet sich am linken Rand und führt in den Übergang (N-Blende).
 * Die Szene folgt dem Scrollen 1:1 (kein Einrasten). Zeit der Timeline: Fortschritt 0 … 1 über die Pinlänge.
 */
import { gsap, ScrollTrigger, $, $$, mode } from '../base.js';
import { fitElement } from '../fit.js';

const fmt = new Intl.NumberFormat('de-DE');
const mk = (cls) => { const e = document.createElement('div'); e.className = cls; return e; };

/** Wörter auf Zeilen verteilen: mobil höchstens zwei Wörter je Zeile, am Desktop drei bis vier Zeilen je Satz.
 *  Unter allen Möglichkeiten gewinnt die mit den ähnlichsten Zeilenlängen (kleinste Streuung der Zeichenzahl), damit die Größen nah beieinander liegen. */
function groups(words) {
  const mobile = mode === 'mobile';
  const k = mobile ? Math.ceil(words.length / 2) : (words.length <= 7 ? 3 : 4);
  const len = (a, b) => words.slice(a, b).join(' ').length;
  let best = null;
  const walk = (start, left, cuts) => {
    if (left === 1) {
      const all = [...cuts, words.length];
      const sizes = all.map((e, i) => ({ n: e - (i ? all[i - 1] : 0), c: len(i ? all[i - 1] : 0, e) }));
      if (mobile && sizes.some((z) => z.n > 2)) return;
      const mean = sizes.reduce((t, z) => t + z.c, 0) / sizes.length;
      const v = sizes.reduce((t, z) => t + (z.c - mean) ** 2, 0);
      if (!best || v < best.v) best = { v, all };
      return;
    }
    for (let e = start + 1; e <= words.length - (left - 1); e += 1) walk(e, left - 1, [...cuts, e]);
  };
  walk(0, k, []);
  return best.all.map((e, i) => words.slice(i ? best.all[i - 1] : 0, e)).filter((g) => g.length);
}

export function initWarum() {
  const sec = $('.warum');
  const stage = $('[data-warum-stage]', sec);
  const sentences = $$('[data-satz]', sec);
  const layer = $('[data-warum-mass]', sec);
  const faden = $('[data-faden-v]', sec);
  const box = $('[data-warum-saetze]', sec);
  if (!sec || !stage || !sentences.length || !layer) return;

  // Zeilen bauen
  const data = sentences.map((li) => {
    const p = $('[data-satz-text]', li);
    const words = p.textContent.trim().split(/\s+/);
    const mass = (li.dataset.mass || '').split('|').filter(Boolean);
    p.textContent = '';
    p.setAttribute('aria-label', words.join(' '));
    const lns = groups(words).map((g) => {
      const ln = document.createElement('span'); ln.className = 'ln'; ln.setAttribute('aria-hidden', 'true');
      const inn = document.createElement('span'); inn.className = 'ln-in';
      g.forEach((w, j) => {
        if (j) inn.append(' ');
        if (mass.includes(w)) { const mw = document.createElement('span'); mw.className = 'mw'; mw.textContent = w; inn.append(mw); } else inn.append(w);
      });
      ln.append(inn); p.append(ln);
      return inn;
    });
    return { li, lns, mws: $$('.mw', li) };
  });

  // Satz nach Maß, danach gegebenenfalls insgesamt verkleinern, damit der Satz in die Bühne passt
  const fitAll = () => {
    const availH = box.clientHeight;
    data.forEach((d) => {
      d.lns.forEach(fitElement);
      const h = d.li.getBoundingClientRect().height;
      if (h > availH) {
        const f = availH / h;
        d.lns.forEach((inn) => { inn.style.fontSize = `${parseFloat(getComputedStyle(inn).fontSize) * f}px`; });
      }
    });
  };

  // Bemaßungen: ein Element je Wort, einmal gebaut, bei Layoutänderung neu platziert
  const dims = [];
  data.forEach((d, si) => d.mws.forEach((mw) => {
    const dim = mk('dim'); dim.setAttribute('aria-hidden', 'true');
    const line = mk('dim-line'); const tl_ = mk('dim-tick dim-tick-l'); const tr_ = mk('dim-tick dim-tick-r'); const val = mk('dim-val');
    dim.append(line, tl_, tr_, val); layer.append(dim);
    dims.push({ dim, line, val, mw, si, ticks: [tl_, tr_] });
  }));
  const rel = (e) => { let x = 0; let y = 0; for (let n = e; n && n !== stage; n = n.offsetParent) { x += n.offsetLeft; y += n.offsetTop; } return { x, y, w: e.offsetWidth, h: e.offsetHeight }; };
  const place = () => {
    dims.forEach((d) => {
      const r = rel(d.mw);
      d.dim.style.left = `${r.x}px`; d.dim.style.width = `${r.w}px`; d.dim.style.top = `${r.y + r.h * 0.92}px`;
      d.val.textContent = `${fmt.format(Math.round(r.w))} px`;
    });
  };

  fitAll(); place();
  ScrollTrigger.addEventListener('refresh', () => { fitAll(); place(); });
  let rt;
  new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(() => { fitAll(); place(); ScrollTrigger.refresh(); }, 200); }).observe(stage);

  // Zeitleiste über die Pinlänge: [Beginn, Ende] je Satz in Anteilen
  const T = [[0, 0.3, 0.06, 0.2], [0.32, 0.64, 0.4, 0.54], [0.66, 1, 0.76, 0.9]]; // [in, out, Bemaßung ab, Bemaßung bis]
  const IN = 0.1; const OUT = 0.07;
  const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true } });
  data.forEach((d, si) => {
    const [tin, tout, m0, m1] = T[si];
    const inner = d.lns;
    // Satz 1 steht beim Beginn des Pins schon da (er läuft beim Einfahren des Abschnitts ein, siehe unten)
    if (si > 0) {
      tl.fromTo(inner, { yPercent: 112 }, { yPercent: 112, duration: 0.001, immediateRender: true }, 0)
        .fromTo(inner, { yPercent: 112 }, { yPercent: 0, duration: IN, stagger: IN / 4, ease: 'power2.out', immediateRender: false }, tin);
    }
    if (si < data.length - 1) tl.fromTo(inner, { yPercent: 0, autoAlpha: 1 }, { yPercent: -112, autoAlpha: 0, duration: OUT, stagger: OUT / 6, ease: 'power2.in', immediateRender: false }, tout);
  });
  // Bemaßungen
  dims.forEach((d, i) => {
    const [, , m0, m1] = T[d.si];
    const same = dims.filter((x) => x.si === d.si); const k = same.indexOf(d); const span = (m1 - m0) / same.length;
    const a = m0 + k * span;
    tl.fromTo(d.line, { scaleX: 0 }, { scaleX: 1, duration: span * 0.8, ease: 'power2.out', immediateRender: true }, a)
      .fromTo([d.ticks[0], d.ticks[1], d.val], { autoAlpha: 0 }, { autoAlpha: 1, duration: span * 0.4, immediateRender: true }, a + span * 0.4);
    const out = T[d.si][1];
    if (d.si < data.length - 1) tl.fromTo([d.line, d.ticks[0], d.ticks[1], d.val], { autoAlpha: 1 }, { autoAlpha: 0, duration: OUT, immediateRender: false }, out);
  });
  // Faden am linken Rand: zeichnet sich über die ersten 60 Prozent und steht dann ganz (der Übergang führt ihn als linkes Bein des N weiter)
  if (faden) tl.fromTo(faden, { scaleY: 0 }, { scaleY: 1, duration: 0.6, immediateRender: true }, 0);

  // Eingang: Satz 1 läuft beim Einfahren des Abschnitts ein, die Schnittmarken lösen sich von den Ecken und rahmen den Satz
  const first = data[0].lns;
  gsap.fromTo(first, { yPercent: 112 }, { yPercent: 0, stagger: 0.12, ease: 'none', scrollTrigger: { trigger: sec, start: 'top 85%', end: 'top 15%', scrub: true, invalidateOnRefresh: true } });

  const crops = $$('.frame .crop');
  const corners = () => {
    const vw = document.documentElement.clientWidth; const vh = stage.offsetHeight;
    const b = rel(box); const pad = 16; const c = 16; const o = 6;
    const bx0 = b.x - pad; const by0 = b.y - pad; const bx1 = b.x + b.w + pad; const by1 = b.y + b.h + pad;
    return [
      { x: bx0 - o, y: by0 - o }, // tl
      { x: bx1 - (vw - o - c), y: by0 - o }, // tr
      { x: bx0 - o, y: by1 - (vh - o - c) }, // bl
      { x: bx1 - (vw - o - c), y: by1 - (vh - o - c) }, // br
    ];
  };
  const order = ['crop-tl', 'crop-tr', 'crop-bl', 'crop-br'];
  const cropEls = order.map((cls) => crops.find((e) => e.classList.contains(cls)));
  cropEls.forEach((e, i) => {
    if (!e) return;
    gsap.fromTo(e, { x: 0, y: 0 }, { x: () => corners()[i].x, y: () => corners()[i].y, ease: 'none', immediateRender: false, scrollTrigger: { trigger: sec, start: 'top 85%', end: 'top top', scrub: true, invalidateOnRefresh: true } });
    gsap.fromTo(e, { x: () => corners()[i].x, y: () => corners()[i].y }, { x: 0, y: 0, ease: 'none', immediateRender: false, scrollTrigger: { trigger: sec, start: 'bottom 78%', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true } });
  });
}
