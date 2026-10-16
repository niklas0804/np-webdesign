/**
 * S3 · Gleicher Betrieb. Zwei Websites. Der orange Faden ist die Trennlinie: Er wandert scrollgesteuert und deckt die Seite „Maßarbeit“ auf
 * (Desktop von rechts nach links, mobil von oben nach unten). Kreuzt er ein Merkmal, setzt die Maßschicht dort eine nummerierte Marke;
 * die Anmerkung steht als Liste im Dokument. Nach dem Pin lässt sich die Linie ziehen: Maus, Touch (Regler) und Tastatur (echtes <input type="range">).
 * Ruhig und ohne Pin: beide Fassungen untereinander, alle Marken stehen, die Liste darunter (nur CSS, hier nur das Laden von Bodoni Moda).
 */
import { gsap, ScrollTrigger, $, $$, root, mode } from '../base.js';

const clamp = (v, a = 0, b = 100) => Math.min(b, Math.max(a, v));

export function initVergleich() {
  const sec = $('[data-vergleich]');
  if (!sec) return;

  // Bodoni Moda (Maßarbeit-Seite) erst kurz bevor der Abschnitt erreicht wird (Budget: erster Bildschirm ≤ 350 KB)
  ScrollTrigger.create({ trigger: sec, start: 'top bottom+=120%', once: true, onEnter: () => { root.dataset.fonts = `${root.dataset.fonts || ''} bodoni`.trim(); } });

  const pinned = mode === 'desktop' || mode === 'mobile';
  const markersAll = $$('.vg-marker', sec);
  if (!pinned) { markersAll.forEach((m) => m.classList.add('is-on')); return; }

  const track = $('[data-vg-track]', sec);
  const view = $('[data-vg-view]', sec);
  const mass = $('.vg-mass', sec);
  const base = $('.vg-base', sec);
  const divider = $('[data-vg-divider]', sec);
  const range = $('[data-vg-range]', sec);
  const mMass = $$('[data-marker-mass]', sec); const nMass = $$('[data-note-mass]', sec);
  const mBase = $$('[data-marker-base]', sec); const nBase = $$('[data-note-base]', sec);
  const vertical = mode === 'mobile';
  let value = 0; let manual = false; let entered = false;

  // Lage der Marken in Prozent der Fläche (aus dem Stylesheet gelesen, ohne Transformationen)
  const pos = (m) => ({ x: (m.offsetLeft / m.offsetParent.offsetWidth) * 100, y: (m.offsetTop / m.offsetParent.offsetHeight) * 100 });
  let pMass = []; let pBase = [];
  const measure = () => { pMass = mMass.map(pos); pBase = mBase.map(pos); };
  measure();

  const text = (v) => (v < 15 ? 'Baukasten' : v > 85 ? 'Maßarbeit' : `${Math.round(v)} Prozent Maßarbeit`);

  /** v: Anteil der Seite „Maßarbeit“, der sichtbar ist (0 … 100) */
  const set = (v) => {
    value = clamp(v);
    if (vertical) { mass.style.clipPath = `inset(0 0 ${100 - value}% 0)`; divider.style.top = `${value}%`; }
    else { mass.style.clipPath = `inset(0 0 0 ${100 - value}%)`; divider.style.left = `${100 - value}%`; }
    mMass.forEach((m, i) => {
      const seen = vertical ? pMass[i].y <= value : pMass[i].x >= 100 - value;
      m.classList.toggle('is-on', seen && entered); nMass[i]?.classList.toggle('is-on', seen && entered);
    });
    mBase.forEach((m, i) => {
      const seen = vertical ? pBase[i].y > value : pBase[i].x < 100 - value;
      m.classList.toggle('is-on', seen && entered); nBase[i]?.classList.toggle('is-on', seen && entered);
    });
    if (range) { range.value = String(Math.round(value)); range.setAttribute('aria-valuetext', text(value)); }
  };
  set(0);

  // Scroll treibt die Linie, solange niemand sie angefasst hat
  ScrollTrigger.create({
    trigger: track, start: 'top top', end: 'bottom bottom', invalidateOnRefresh: true,
    onRefresh: () => { measure(); if (!manual) set(value); },
    onToggle: (self) => { entered = self.isActive || self.progress > 0; set(value); },
    onUpdate: (self) => {
      entered = true;
      if (manual) return;
      const p = clamp((self.progress - 0.08) / 0.8, 0, 1);
      set(gsap.parseEase('power1.inOut')(p) * 100);
    },
    onLeaveBack: () => { manual = false; entered = false; set(0); },
  });
  // Marken schon beim Einfahren des Abschnitts als „bereit“ (die Baukasten-Marken stehen, sobald der Rahmen im Bild ist)
  ScrollTrigger.create({ trigger: sec, start: 'top 80%', end: 'bottom top', onToggle: (self) => { entered = self.isActive; set(value); } });

  // Ziehen: Regler (Maus, Touch, Tastatur) und am Desktop direkt am Bild
  const user = (v) => { manual = true; set(v); };
  range?.addEventListener('input', () => user(parseFloat(range.value)));
  if (!vertical && view) {
    let drag = false;
    const at = (e) => { const r = view.getBoundingClientRect(); user(100 - ((e.clientX - r.left) / r.width) * 100); };
    view.addEventListener('pointerdown', (e) => { drag = true; view.setPointerCapture(e.pointerId); at(e); });
    view.addEventListener('pointermove', (e) => { if (drag) at(e); });
    const end = () => { drag = false; };
    view.addEventListener('pointerup', end); view.addEventListener('pointercancel', end);
  }
}
