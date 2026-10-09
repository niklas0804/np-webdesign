/**
 * Welt 09 · Bewegung und Bedienung (Blueprint F, I). Die langsamste Welt der Reise.
 * Drei Bilder blenden mit dem Scrollen ineinander (Bildüberblendungen über 120 vh, gepinnt, Länge `scene` aus der Konfiguration),
 * über allen liegt eine Farbtemperatur-Schicht, die von Abend zu Nacht abkühlt. Speisekarte Mittag/Abend als Reiter (Pfeiltasten),
 * Zimmer- und Tischanfrage in der fixierten Leiste als Demo ohne Versand. `init` liefert die Aufräum-Funktion.
 */
import { gsap, $, $$, mode } from '../../motion/base.js';

export function init() {
  const root = $('[data-w09]');
  if (!root) return () => {};
  const cleanups = [];
  initKarte(root);
  initLeiste(root);

  if (mode === 'desktop' || mode === 'mobile') {
    const ctx = gsap.context(() => {
      const tag = $('[data-tag]', root);
      const layers = $$('[data-layer]', root);
      const tint = $('[data-tint]', root);
      if (tag && layers.length === 3) {
        // Bild 1 → 2 → 3: Überblendung in zwei Hälften, dazwischen verweilt jedes Bild; die Schicht kühlt über die ganze Strecke ab
        const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: tag, start: 'top top', end: 'bottom bottom', scrub: 0.6, invalidateOnRefresh: true } });
        gsap.set(layers[0], { autoAlpha: 1 });
        tl.to(layers[0], { autoAlpha: 0, duration: 0.2 }, 0.3)
          .fromTo(layers[1], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, 0.3)
          .to(layers[1], { autoAlpha: 0, duration: 0.2 }, 0.65)
          .fromTo(layers[2], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, 0.65)
          .fromTo(tint, { opacity: 0 }, { opacity: 0.55, duration: 1 }, 0)
          .set({}, {}, 1);
      }
      // Ruhige Einblendungen der Inseln
      $$('.w09-zimmer, .w09-speise', root).forEach((s) => gsap.from(s, { autoAlpha: 0, y: 14, duration: 0.8, ease: 'power1.out', scrollTrigger: { trigger: s, start: 'top 88%', once: true } }));
    }, root);
    cleanups.push(() => ctx.revert());
  }
  return () => cleanups.forEach((fn) => fn());
}

/* Speisekarte: Reiter Mittag und Abend, Pfeiltasten wechseln (WAI-ARIA Tabs) */
function initKarte(root) {
  const tabs = $$('[data-karte-tab]', root);
  const panels = $$('[data-karte-panel]', root);
  if (!tabs.length) return;
  const show = (key, focus) => {
    tabs.forEach((t) => { const on = t.dataset.karteTab === key; t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1; if (on && focus) t.focus(); });
    panels.forEach((p) => { p.hidden = p.dataset.kartePanel !== key; });
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => show(t.dataset.karteTab, false));
    t.addEventListener('keydown', (e) => {
      const d = { ArrowRight: 1, ArrowLeft: -1, Home: -tabs.length, End: tabs.length }[e.key];
      if (!d) return; e.preventDefault();
      const n = e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : (i + d + tabs.length) % tabs.length;
      show(tabs[n].dataset.karteTab, true);
    });
  });
  show(tabs[0].dataset.karteTab, false);
}

/* Fixierte Leiste: Datum und Personen, Demo ohne Versand */
function initLeiste(root) {
  const bar = $('[data-bar]', root);
  if (!bar) return;
  const c = $('[data-bar-confirm]', bar);
  bar.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = $('[data-datum]', bar).value;
    const n = $('[data-personen]', bar).value;
    if (!d) { c.textContent = 'Bitte wählen Sie ein Datum.'; return; }
    const text = new Date(d + 'T12:00:00').toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' });
    c.textContent = `Vorgemerkt: ${text}, ${n} ${n === '1' ? 'Person' : 'Personen'}. Das ist eine Demo, es wird nichts gesendet.`;
  });
}
