/**
 * Einstieg der Startseite (Auftrag 11. Oktober 2026, Teil C). Die Startseite lädt nur ihre eigenen Module.
 * Eine Szene je Abschnitt, keine Gesamt-Timeline; alles wird vor dem ersten Messen eingerichtet, danach genau ein Refresh.
 */
import { gsap, ScrollTrigger, root, mode, pinned, watchMode, whenReady, yieldMain } from '../base.js';
import { initFit } from '../fit.js';
import { initClock, initMenu } from '../menu.js';
import { initRahmen } from '../rahmen.js';
import { initKontakt } from '../kontakt.js';
import { initTransitions, snapshotBatons } from '../transitions.js';
import { initHero } from './hero.js';
import { initWarum } from './warum.js';
import { initBeispiele } from './beispiele.js';
import { initZusammenarbeit } from './zusammenarbeit.js';

watchMode();

/** S3 · Der Kunden-Test: Ablauf und Schrift (Bodoni Moda) erst bei Annäherung laden; die Fläche ist vorab reserviert, es gibt keinen Layout-Sprung */
function lazyKundentest() {
  const sec = document.querySelector('[data-kt]');
  if (!sec || !pinned) return;
  const io = new IntersectionObserver((es) => {
    if (!es.some((e) => e.isIntersecting)) return;
    io.disconnect();
    root.setAttribute('data-fonts', `${root.getAttribute('data-fonts') || ''} bodoni`.trim());
    Promise.all([import('./kundentest.js'), document.fonts.load('500 20px "Bodoni Moda NP"').catch(() => {})]).then(([m]) => { m.initKundentest(sec); requestAnimationFrame(() => ScrollTrigger.refresh()); });
  }, { rootMargin: '900px 0px' });
  io.observe(sec);
}

async function boot() {
  let lenis = null;
  if (mode === 'desktop') {
    const { default: Lenis } = await import('lenis');
    lenis = new Lenis({ lerp: 0.12, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  initClock();
  initMenu(lenis);
  initFit();
  initKontakt();

  // Kurze Aufgaben statt einer langen: zwischen den Abschnitten wird der Hauptthread abgegeben, gemessen wird einmal am Ende
  await yieldMain();
  initRahmen();
  initHero();
  await yieldMain();
  if (pinned) initWarum();
  lazyKundentest();
  await yieldMain();
  initBeispiele();
  await yieldMain();
  initZusammenarbeit();
  if (pinned) { snapshotBatons(); await initTransitions(); }

  await yieldMain();
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
  root.setAttribute('data-ready', '');
}

whenReady(boot);
