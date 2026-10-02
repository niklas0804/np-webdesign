/** Grundgerüst: GSAP, Modi, gemeinsame Hilfen (Blueprint N, Scroll-Orchestrierung). */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
// Adressleiste auf dem Smartphone löst kein Neuberechnen aus (Blueprint M)
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger };
export const root = document.documentElement;
export const $ = (sel, ctx = document) => ctx.querySelector(sel);
export const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/** 'desktop' | 'mobile' | 'calm' – gesetzt von /mode-init.js vor dem ersten Paint */
export const mode = root.getAttribute('data-mode') || 'calm';
export const pinned = mode === 'desktop' || mode === 'mobile';

/** Welcher Modus wäre jetzt richtig? Bei Wechsel (Drehen, Fenstergröße) lädt die Seite einmal neu – robuster als Umbauen. */
export function watchMode() {
  const want = () => {
    if (root.hasAttribute('data-calm') || matchMedia('(prefers-reduced-motion: reduce)').matches) return 'calm';
    return matchMedia('(min-width: 1024px) and (pointer: fine)').matches ? 'desktop' : 'mobile';
  };
  let t;
  const check = () => { clearTimeout(t); t = setTimeout(() => { if (want() !== mode) location.reload(); }, 250); };
  ['(min-width: 1024px)', '(pointer: fine)', '(prefers-reduced-motion: reduce)'].forEach((q) => matchMedia(q).addEventListener('change', check));
}

/** Messung der Seite nach Schriften und Bildern, einmal – nie beim Scrollen */
export function whenReady(fn) {
  const go = () => document.fonts.ready.then(fn);
  if (document.readyState === 'complete') go(); else window.addEventListener('load', go, { once: true });
}
