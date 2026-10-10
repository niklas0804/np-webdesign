/**
 * Welt 05 · Bewegung und Bedienung (Blueprint F, I).
 * Querfahrt (nur Desktop, gepinnt): vertikales Scrollen schiebt die Bildstrecke seitwärts, ein Lichtreflex wandert synchron mit,
 * bei schnellem Scrollen neigt sich die Strecke um bis zu 4°. Mobil und ruhig ist die Strecke eine wischbare Leiste.
 * Die elfenbeinfarbene Zierlinie zeichnet sich beim Eintritt. Der Vorher-Nachher-Schieber geht mit Maus, Touch und Pfeiltasten.
 * `init` liefert die Aufräum-Funktion.
 */
import { gsap, ScrollTrigger, $, $$, mode } from '../../motion/base.js';

export function init() {
  const root = $('.w05');
  if (!root) return () => {};
  const cleanups = [];
  const animated = mode === 'desktop' || mode === 'mobile';

  initSchieber(root);

  if (animated) {
    const ctx = gsap.context(() => {
      // Zierlinie zeichnet sich einmal
      const zier = $('[data-zier]', root);
      gsap.set(zier, { strokeDasharray: 1, strokeDashoffset: 1 });
      ScrollTrigger.create({ trigger: zier, start: 'top 92%', once: true, onEnter: () => gsap.to(zier, { strokeDashoffset: 0, duration: 1.3, ease: 'power2.inOut' }) });
      // Titel und Kopf kommen ruhig herein
      gsap.from($$('.w05-title, .w05-sub, .w05-lead', root), { autoAlpha: 0, y: 18, duration: 0.8, stagger: 0.12, ease: 'power2.out', scrollTrigger: { trigger: $('.w05-head', root), start: 'top 80%', once: true } });
    }, root);
    cleanups.push(() => ctx.revert());
  }

  if (mode === 'desktop') cleanups.push(initQuerfahrt(root));
  return () => cleanups.forEach((fn) => fn());
}

/* Querfahrt: gepinnte Bühne (sticky, Länge aus der Konfiguration), Strecke fährt mit dem Scrollen nach links */
function initQuerfahrt(root) {
  const fahrt = $('[data-fahrt]', root);
  const wrap = $('[data-strip-wrap]', root);
  const strip = $('[data-strip]', root);
  const reflex = $('[data-reflex]', root);
  if (!fahrt || !wrap || !strip) return () => {};
  // Am Desktop ist die Strecke keine Scroll-Leiste mehr: Fokus und Rolle der Leiste entfallen, die Bänder bleiben als Liste lesbar
  wrap.removeAttribute('tabindex'); wrap.removeAttribute('role'); wrap.removeAttribute('aria-label');
  const dist = () => Math.max(0, strip.scrollWidth - (window.innerWidth - parseFloat(getComputedStyle(wrap).paddingLeft) * 2));
  const cleanup = [];
  const ctx = gsap.context(() => {
    gsap.to(strip, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: fahrt, start: 'top top', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true } });
    // Der Lichtreflex wandert schneller als die Strecke über die Bühne
    if (reflex) gsap.fromTo(reflex, { xPercent: -80 }, { xPercent: 80, ease: 'none', scrollTrigger: { trigger: fahrt, start: 'top top', end: 'bottom bottom', scrub: true } });
    // Neigung bei schnellem Scrollen, bis 4°
    const tilt = gsap.quickTo(wrap, 'rotation', { duration: 0.6, ease: 'power3.out' });
    ScrollTrigger.create({
      trigger: fahrt, start: 'top top', end: 'bottom bottom',
      onUpdate: (self) => tilt(gsap.utils.clamp(-4, 4, self.getVelocity() / -500)),
      onLeave: () => tilt(0), onLeaveBack: () => tilt(0),
    });
    // Wenn das Scrollen aufhört, richtet sich die Strecke wieder gerade
    const settle = () => tilt(0);
    ScrollTrigger.addEventListener('scrollEnd', settle);
    cleanup.push(() => ScrollTrigger.removeEventListener('scrollEnd', settle));
  }, root);
  return () => { cleanup.forEach((fn) => fn()); ctx.revert(); };
}

/* Vorher-Nachher: Regler (Pfeiltasten, Ziehen auf dem Regler) und Ziehen direkt auf dem Bild */
function initSchieber(root) {
  const stage = $('[data-vn-stage]', root);
  const range = $('[data-vn-range]', root);
  if (!stage || !range) return;
  const set = (v) => {
    const n = Math.max(0, Math.min(100, Math.round(v)));
    stage.style.setProperty('--vn', String(n));
    range.value = String(n);
    range.setAttribute('aria-valuetext', `${n} Prozent Vorher`);
  };
  range.addEventListener('input', () => set(Number(range.value)));
  const fromPointer = (e) => { const r = stage.getBoundingClientRect(); set(((e.clientX - r.left) / r.width) * 100); };
  let drag = false;
  stage.addEventListener('pointerdown', (e) => { drag = true; stage.setPointerCapture(e.pointerId); fromPointer(e); });
  stage.addEventListener('pointermove', (e) => { if (drag) fromPointer(e); });
  const end = () => { drag = false; };
  stage.addEventListener('pointerup', end); stage.addEventListener('pointercancel', end);
  set(50);
}
