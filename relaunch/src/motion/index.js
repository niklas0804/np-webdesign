/** Einstieg der Bewegung. Eine Szene pro Abschnitt, keine Gesamt-Timeline (Blueprint N, T.1). */
import { gsap, ScrollTrigger, root, mode, pinned, watchMode, whenReady } from './base.js';
import { initFit } from './fit.js';
import { initClock, initMenu } from './menu.js';
import { initRahmen } from './rahmen.js';
import { initOpening } from './opening.js';
import { initTransitions } from './transitions.js';
import { initInterludes } from './interludes.js';

watchMode();

async function boot() {
  let lenis = null;
  // Lenis nur am Desktop mit Maus oder Trackpad, über den GSAP-Ticker synchronisiert
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

  initRahmen();
  if (pinned) {
    initOpening();
    initTransitions();
  }
  initInterludes();

  ScrollTrigger.refresh();
  root.setAttribute('data-ready', '');
}

whenReady(boot);
