/**
 * Einstieg der Startseite (Auftrag 11. Oktober 2026, Teil C). Die Startseite lädt nur ihre eigenen Module.
 * Eine Szene je Abschnitt, keine Gesamt-Timeline; alles wird vor dem ersten Messen eingerichtet, danach genau ein Refresh.
 */
import { gsap, ScrollTrigger, root, mode, pinned, watchMode, whenReady } from '../base.js';
import { initFit } from '../fit.js';
import { initClock, initMenu } from '../menu.js';
import { initRahmen } from '../rahmen.js';
import { initKontakt } from '../kontakt.js';
import { initInterludes } from '../interludes.js';
import { initTransitions, snapshotBatons } from '../transitions.js';
import { initHero } from './hero.js';
import { initWarum } from './warum.js';
import { initVergleich } from './vergleich.js';

watchMode();

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

  initRahmen();
  initHero();
  if (pinned) initWarum();
  initVergleich();
  initInterludes();
  if (pinned) { snapshotBatons(); initTransitions(); }

  ScrollTrigger.sort();
  ScrollTrigger.refresh();
  root.setAttribute('data-ready', '');
}

whenReady(boot);
