/** Einstieg der Bewegung. Eine Szene pro Abschnitt, keine Gesamt-Timeline (Blueprint N, T.1). */
import { gsap, ScrollTrigger, root, mode, pinned, watchMode, whenReady } from './base.js';
import { initFit } from './fit.js';
import { initClock, initMenu } from './menu.js';
import { initRahmen } from './rahmen.js';
import { initOpening } from './opening.js';
import { initTransitions } from './transitions.js';
import { initInterludes } from './interludes.js';
import { initKontakt } from './kontakt.js';
import { initFinale } from './finale.js';

watchMode();

/** Weltmodule: Bewegung und Bedienung laden erst 1,5 Bildschirmhöhen vor der Welt (Blueprint N, Ladestrategie) */
const WORLD_MODULES = {
  baeckerei: () => import('../worlds/01-halmberg/motion.js'),
  barbershop: () => import('../worlds/02-messingstuhl/motion.js'),
  bau: () => import('../worlds/03-wittgenfeld/motion.js'),
  kanzlei: () => import('../worlds/04-haas-sternfeld/motion.js'),
};
function loadWorlds() {
  Object.entries(WORLD_MODULES).forEach(([anchor, load]) => {
    const el = document.getElementById(anchor);
    if (!el) return;
    let started = false;
    const go = async () => { if (started) return; started = true; const m = await load(); m.init(); ScrollTrigger.refresh(); };
    ScrollTrigger.create({ trigger: el, start: 'top bottom+=150%', end: 'bottom top', onToggle: (self) => { if (self.isActive) go(); } });
  });
}

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
  initKontakt();

  initRahmen();
  if (pinned) {
    initOpening();
    initTransitions();
    initFinale();
  }
  initInterludes();
  loadWorlds();

  ScrollTrigger.refresh();
  root.setAttribute('data-ready', '');
}

whenReady(boot);
