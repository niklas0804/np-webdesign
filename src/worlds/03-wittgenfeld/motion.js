/**
 * Welt 03 · Bewegung und Bedienung (Blueprint F, I).
 * Bauen mit dem Scrollen: Der Hausquerschnitt zeichnet sich Schicht für Schicht vom Fundament bis zum Dach
 * (Desktop sechs Schichten, Mobile vier). Danach wird der Prüfstempel gesetzt (1,15 auf 1 in 180 ms).
 * Plan-Reiter und Explosionszeichnung arbeiten lokal. `init` liefert die Aufräum-Funktion.
 */
import { gsap, ScrollTrigger, $, $$, mode } from '../../motion/base.js';

export function init() {
  const root = $('.w03');
  if (!root) return () => {};
  const cleanups = [];
  const animated = mode === 'desktop' || mode === 'mobile';

  initTabs(root, animated);
  initExplosion(root);
  if (animated) {
    const ctx = gsap.context(() => buildSchnitt(root), root);
    cleanups.push(() => ctx.revert());
  }
  return () => cleanups.forEach((fn) => fn());
}

/* Linien zeichnen: Strichlänge 1 (pathLength) von verdeckt auf sichtbar */
const hide = (paths) => gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });

function buildSchnitt(root) {
  const sheet = $('.w03-sheet', root);
  const stamp = $('[data-stamp]', root);
  const layers = $$('.ln-layer[data-layer]', root);
  const ground = $$('.ln-ground path', root);
  const dims = $$('[data-dims] path', root);
  const dimText = $$('[data-dims] text', root);

  // Desktop: sechs Schichten nacheinander, Mobile: vier (Wände und Decke zusammen, Dachstuhl und Dach zusammen)
  const steps = mode === 'desktop' ? [[0], [1], [2], [3], [4], [5]] : [[0], [1, 2], [3], [4, 5]];
  hide([...ground, ...layers.flatMap((l) => $$('path', l)), ...dims]);
  gsap.set(dimText, { autoAlpha: 0 });
  gsap.set(stamp, { autoAlpha: 0, scale: 1.15 });

  const tl = gsap.timeline({ defaults: { ease: 'none' } });
  tl.to(ground, { strokeDashoffset: 0, duration: 0.8 }, 0);
  steps.forEach((idx, i) => {
    const paths = idx.flatMap((n) => $$('path', layers[n]));
    tl.to(paths, { strokeDashoffset: 0, duration: 1, stagger: { each: 0.5 / Math.max(paths.length, 1), from: 'start' } }, 0.4 + i);
  });
  tl.to(dims, { strokeDashoffset: 0, duration: 0.8, stagger: 0.1 }, 0.4 + steps.length)
    .to(dimText, { autoAlpha: 1, duration: 0.4, stagger: 0.1 }, 0.8 + steps.length);

  // Prüfstempel: wird gesetzt, sobald die Zeichnung steht
  const set = gsap.timeline({ paused: true }).to(stamp, { autoAlpha: 0.94, scale: 1, duration: 0.18, ease: 'back.out(2)' });
  ScrollTrigger.create({
    trigger: sheet, start: 'top 85%', end: 'top 6%', scrub: true, animation: tl,
    onUpdate: (self) => { if (self.progress > 0.985) set.play(); else if (self.progress < 0.9) set.reverse(); },
  });
}

/* Plan-Reiter: Grundriss, Schnitt, Ansicht (Pfeiltasten, Pos1, Ende); die anderen Blätter zeichnen sich beim Wechsel */
function initTabs(root, animated) {
  const tabs = $$('[data-tab3]', root);
  const out = $('[data-blatt-out]', root);
  if (!tabs.length) return;
  const show = (i, focus) => {
    tabs.forEach((t, j) => { t.setAttribute('aria-selected', j === i ? 'true' : 'false'); t.tabIndex = j === i ? 0 : -1; });
    const id = tabs[i].dataset.tab3;
    $$('[data-view]', root).forEach((v) => v.classList.toggle('is-active', v.dataset.view === id));
    if (out) out.textContent = tabs[i].dataset.blatt;
    if (focus) tabs[i].focus();
    if (animated && id !== 'schnitt') {
      const paths = $$(`[data-view="${id}"] .ln-layer path`, root);
      gsap.fromTo(paths, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1, ease: 'power1.out', stagger: 0.03, clearProps: 'strokeDasharray,strokeDashoffset' });
    }
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => show(i));
    t.addEventListener('keydown', (e) => {
      const last = tabs.length - 1;
      const key = { ArrowRight: (i + 1) % tabs.length, ArrowLeft: (i - 1 + tabs.length) % tabs.length, Home: 0, End: last }[e.key];
      if (key !== undefined) { e.preventDefault(); show(key, true); }
    });
  });
}

/* Explosionszeichnung: Bauteil antippen, es hebt sich heraus und wird beschriftet. Ohne JavaScript stehen alle Texte da. */
function initExplosion(root) {
  const wrap = $('[data-expl]', root);
  if (!wrap) return;
  const parts = $$('[data-part]', wrap);
  const labels = $$('[data-label]', wrap);
  const names = { dach: 'Dach', rohbau: 'Rohbau', sanierung: 'Sanierung' };
  const open = (id) => {
    if (id) wrap.dataset.open = id; else delete wrap.dataset.open;
    parts.forEach((p) => { const on = p.dataset.part === id; p.classList.toggle('is-open', on); p.setAttribute('aria-expanded', on ? 'true' : 'false'); });
    labels.forEach((l) => l.classList.toggle('is-open', l.dataset.label === id));
  };
  parts.forEach((p) => {
    // Erst jetzt werden die Zeichnungen zu bedienbaren Elementen
    p.setAttribute('role', 'button');
    p.tabIndex = 0;
    p.setAttribute('aria-label', names[p.dataset.part]);
    p.setAttribute('aria-expanded', 'false');
    p.setAttribute('aria-controls', `lb-${p.dataset.part}`);
    const toggle = () => open(wrap.dataset.open === p.dataset.part ? null : p.dataset.part);
    p.addEventListener('click', toggle);
    p.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  });
}
