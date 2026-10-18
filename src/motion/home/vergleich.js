/**
 * S3 · Gleicher Betrieb. Zwei Websites. Der orange Faden ist die Trennlinie zwischen „Baukasten“ (links) und „Maßarbeit“ (rechts).
 * Sie bewegt sich NUR über den Regler: ziehen am Griff (Maus, Touch, Stift), Pfeiltasten im fokussierten <input type="range">,
 * am Desktop zusätzlich Ziehen mit der Maus irgendwo im Bild. Beim Scrollen bleibt die Linie, wo sie ist (Start: 50 Prozent).
 * Mobil: Senkrechtes Wischen über dem Bild scrollt die Seite; nur ein waagerechtes Ziehen am Griff bewegt die Linie (Griff: touch-action pan-y, kein preventDefault).
 * Die nummerierten Marken und Anmerkungen folgen der Position der Linie. Es gibt keine Scroll-Kopplung und keinen ScrollTrigger.
 * Ruhig und ohne JavaScript: beide Fassungen untereinander, alle Marken stehen, die Liste darunter (nur CSS).
 */
import { $, $$, root, mode } from '../base.js';

const clamp = (v, a = 0, b = 100) => Math.min(b, Math.max(a, v));

export function initVergleich() {
  const sec = $('[data-vergleich]');
  if (!sec) return;

  // Bodoni Moda (Maßarbeit-Seite) erst kurz bevor der Abschnitt erreicht wird (Budget: erster Bildschirm ≤ 350 KB); IntersectionObserver, keine Scroll-Kopplung
  const io = new IntersectionObserver((es) => {
    if (es.some((e) => e.isIntersecting)) { root.dataset.fonts = `${root.dataset.fonts || ''} bodoni`.trim(); io.disconnect(); }
  }, { rootMargin: '150% 0px 150% 0px' });
  io.observe(sec);

  const interactive = mode === 'desktop' || mode === 'mobile';
  if (!interactive) { $$('.vg-marker', sec).forEach((m) => m.classList.add('is-on')); return; }

  const view = $('[data-vg-view]', sec);
  const mass = $('.vg-mass', sec);
  const divider = $('[data-vg-divider]', sec);
  const handle = $('[data-vg-handle]', sec);
  const range = $('[data-vg-range]', sec);
  const mMass = $$('[data-marker-mass]', sec); const nMass = $$('[data-note-mass]', sec);
  const mBase = $$('[data-marker-base]', sec); const nBase = $$('[data-note-base]', sec);

  // Lage der Marken in Prozent der Fläche (aus dem Stylesheet gelesen, ohne Transformationen); neu beim Ändern der Fenstergröße
  const pos = (m) => (m.offsetLeft / m.offsetParent.offsetWidth) * 100;
  let pMass = []; let pBase = [];
  const measure = () => { pMass = mMass.map(pos); pBase = mBase.map(pos); };
  const text = (v) => (v <= 3 ? 'Linie ganz links: nur Maßarbeit' : v >= 97 ? 'Linie ganz rechts: nur Baukasten' : `Linie bei ${Math.round(v)} Prozent von links: links Baukasten, rechts Maßarbeit`);

  /** v: Position der Trennlinie in Prozent von links (0 … 100). Links der Linie steht „Baukasten“, rechts „Maßarbeit“; Regler und Linie laufen in dieselbe Richtung. */
  let value = 50;
  const set = (v) => {
    value = clamp(v);
    mass.style.clipPath = `inset(0 0 0 ${value}%)`;
    divider.style.left = `${value}%`;
    mMass.forEach((m, i) => { const seen = pMass[i] >= value; m.classList.toggle('is-on', seen); nMass[i]?.classList.toggle('is-on', seen); });
    mBase.forEach((m, i) => { const seen = pBase[i] < value; m.classList.toggle('is-on', seen); nBase[i]?.classList.toggle('is-on', seen); });
    if (range) { range.value = String(Math.round(value)); range.setAttribute('aria-valuetext', text(value)); }
  };
  measure(); set(50);
  let rt;
  new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(() => { measure(); set(value); }, 150); }).observe(view);

  // Regler: Tastatur, Maus und Touch am nativen Element
  range?.addEventListener('input', () => set(parseFloat(range.value)));

  // Ziehen im Bild: am Griff mit jedem Zeiger, am Desktop mit der Maus auch irgendwo im Bild
  const at = (e) => { const r = view.getBoundingClientRect(); set(((e.clientX - r.left) / r.width) * 100); };
  let drag = null;
  const down = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    drag = e.pointerId; e.currentTarget.setPointerCapture(e.pointerId); at(e);
  };
  const move = (e) => { if (drag === e.pointerId) at(e); };
  const end = (e) => { if (drag === e.pointerId) drag = null; };
  handle?.addEventListener('pointerdown', down);
  [handle, view].forEach((t) => { t?.addEventListener('pointermove', move); t?.addEventListener('pointerup', end); t?.addEventListener('pointercancel', end); });
  view?.addEventListener('pointerdown', (e) => { if (e.pointerType === 'mouse' && e.target !== handle) down(e); });
}
