/** Einstieg der Bewegung. Eine Szene pro Abschnitt, keine Gesamt-Timeline (Blueprint N, T.1). */
import { gsap, ScrollTrigger, root, mode, pinned, watchMode, whenReady } from './base.js';
import { initFit } from './fit.js';
import { initClock, initMenu } from './menu.js';
import { initRahmen } from './rahmen.js';
import { initOpening } from './opening.js';
import { initTransitions, snapshotBatons } from './transitions.js';
import { initInterludes } from './interludes.js';
import { initKontakt } from './kontakt.js';
import { initFinale } from './finale.js';

watchMode();

/**
 * Weltmodule: Alle Module sind klein (je 1–3 KB) und werden beim Start in Dokumentreihenfolge geladen und eingerichtet.
 * Früher luden sie erst 1,5 Bildschirmhöhen vor der Welt und riefen danach ScrollTrigger.refresh() auf – das verschob
 * die Seite um bis zu 377 px, mitten im Scrollen (docs/troubleshooting-uebergaenge.md, Ursache 4).
 * Nur schwere Dateien (Bilder) laden nach, mit festen Maßen.
 */
const WORLD_MODULES = {
  baeckerei: () => import('../worlds/01-halmberg/motion.js'),
  barbershop: () => import('../worlds/02-messingstuhl/motion.js'),
  bau: () => import('../worlds/03-wittgenfeld/motion.js'),
  kanzlei: () => import('../worlds/04-haas-sternfeld/motion.js'),
  oldtimer: () => import('../worlds/05-chromwerk/motion.js'),
  coaching: () => import('../worlds/06-jana-ahrens/motion.js'),
  industrie: () => import('../worlds/07-torquel/motion.js'),
  physiotherapie: () => import('../worlds/08-praxis-am-weiher/motion.js'),
  landgasthof: () => import('../worlds/09-gut-weidenstein/motion.js'),
};
async function initWorlds() {
  const entries = Object.entries(WORLD_MODULES).filter(([anchor]) => document.getElementById(anchor));
  const modules = await Promise.all(entries.map(([, load]) => load()));
  modules.forEach((m) => m.init());
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

  // Alles wird vor dem ersten Messen eingerichtet; danach genau ein Refresh, nie mehr während des Scrollens
  initRahmen();
  if (pinned) {
    initOpening();
    initFinale();
  }
  initInterludes();
  if (pinned) snapshotBatons(); // Ziele der Übergänge im Zustand beim Laden festhalten, bevor die Weltmodule sie animieren
  await initWorlds();
  if (pinned) initTransitions();

  ScrollTrigger.sort();
  ScrollTrigger.refresh();
  root.setAttribute('data-ready', '');
}

whenReady(boot);
