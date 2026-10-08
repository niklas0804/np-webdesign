/**
 * Der Rahmen (Blueprint C, J): Weltzähler, Lineal, Fortschritt, Farbe der NP-Schicht, Anfrage-Leiste.
 * Läuft über ScrollTrigger – keine eigenen Scroll-Listener.
 */
import { gsap, ScrollTrigger, $, $$, root, mode } from './base.js';

let currentKey = null;

export function setSection(sec) {
  if (!sec) return;
  const key = sec.id + '|' + sec.dataset.section;
  if (currentKey === key) return;
  currentKey = key;

  root.dataset.tone = sec.dataset.tone || 'light';

  const counter = $('[data-frame-counter]');
  const short = $('[data-frame-counter-short]');
  if (counter && sec.dataset.counter) {
    counter.textContent = sec.dataset.counter;
    if (mode !== 'calm') { counter.classList.remove('is-swapping'); void counter.offsetWidth; counter.classList.add('is-swapping'); }
  }
  if (short && sec.dataset.counterShort) short.textContent = sec.dataset.counterShort;

  window.dispatchEvent(new CustomEvent('np:section', { detail: { world: sec.dataset.world || null, id: sec.id } }));
  updateBar(sec);

  // Anker in der Adresszeile ohne neuen Verlaufseintrag (Blueprint J)
  if (sec.id && sec.id !== 'opening') history.replaceState(null, '', '#' + sec.id);
  else if (location.hash) history.replaceState(null, '', location.pathname + location.search);
}

let heroPast = false;
let current = null;
function updateBar(sec) {
  if (sec) current = sec;
  const off = !heroPast || (current && current.hasAttribute('data-bar-off'));
  root.dataset.bar = off ? 'off' : 'on';
}

export function initRahmen() {
  // Welt- und Abschnittswechsel: Zähler, Farbe, Anker
  $$('[data-section][data-counter]').forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => { if (self.isActive) setSection(sec); },
    });
  });

  // Anfrage-Leiste (Mobile) erscheint nach dem Hero
  ScrollTrigger.create({
    start: () => window.innerHeight * 0.7,
    end: 'max',
    onToggle: (self) => { heroPast = self.isActive; updateBar(); },
  });

  // Lineal und Fortschritt
  const fill = $('[data-ruler-fill]');
  const mark = $('[data-ruler-mark]');
  const prog = $('[data-progress]');
  const ticks = $$('.ruler-tick');
  const fracs = new Map();

  const place = () => {
    const max = ScrollTrigger.maxScroll(window);
    ticks.forEach((t) => {
      const sec = document.querySelector(`section[data-world="${t.dataset.tick}"]`);
      if (!sec || !max) return;
      const top = sec.getBoundingClientRect().top + window.scrollY;
      const f = Math.min(1, Math.max(0, top / max));
      fracs.set(t, f);
      t.style.top = f * 100 + '%';
    });
  };
  place();
  ScrollTrigger.addEventListener('refresh', place);

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const p = self.progress;
      if (fill) fill.style.transform = `scaleY(${p})`;
      if (mark) mark.style.top = p * 100 + '%';
      if (prog) prog.style.transform = `scaleX(${p})`;
      ticks.forEach((t) => t.classList.toggle('is-reached', p >= (fracs.get(t) ?? 2) - 0.002));
    },
  });
}

/** Ton der NP-Schicht setzen (Mitte eines Übergangs) */
export function setTone(tone) { root.dataset.tone = tone; }
