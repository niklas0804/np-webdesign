/**
 * Welt 10 · Bewegung und Bedienung (Blueprint F, I).
 * Die Archivo-Buchstaben dehnen sich über die Breitenachse (wdth) mit der Scrollgeschwindigkeit, Elemente rasten ins 8-px-Raster ein,
 * am Ende bekommen die Rohelemente NP-Stil zurück (Klasse is-np). Der Rohbau-Schalter blendet das Gerüst der Welt 01 ein und aus.
 * Die Bedienelemente des Rohbaus sind die des Browsers und tun lokal etwas Kleines. `init` liefert die Aufräum-Funktion.
 */
import { gsap, ScrollTrigger, $, $$, mode } from '../../motion/base.js';

export function init() {
  const root = $('[data-w10]');
  if (!root) return () => {};
  const cleanups = [];
  initSchalter(root);
  initRoh(root);

  if (mode === 'desktop' || mode === 'mobile') {
    const ctx = gsap.context(() => {
      // Elemente rasten ins Raster ein: stufenweise Bewegung in 8-px-Schritten
      $$('[data-snap]', root).forEach((el, i) => {
        gsap.fromTo(el, { x: 37 + i * 11, y: 29 + i * 7 }, { x: 0, y: 0, snap: { x: 8, y: 8 }, ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 45%', scrub: true } });
      });
      // Breitenachse folgt der Scrollgeschwindigkeit: ruhig 75, schnell bis 125
      const riese = $('[data-riese]', root);
      const bruch = $('[data-bruch]', root);
      if (riese && bruch) {
        const s = { w: 75 };
        const apply = () => { riese.style.fontVariationSettings = `'wdth' ${s.w.toFixed(1)}`; };
        const to = gsap.quickTo(s, 'w', { duration: 0.45, ease: 'power3.out', onUpdate: apply });
        apply();
        ScrollTrigger.create({ trigger: bruch, start: 'top bottom', end: 'bottom top', onUpdate: (self) => to(75 + gsap.utils.clamp(0, 50, Math.abs(self.getVelocity()) / 40)), onLeave: () => to(75), onLeaveBack: () => to(75) });
        const settle = () => to(75);
        ScrollTrigger.addEventListener('scrollEnd', settle);
        cleanups.push(() => ScrollTrigger.removeEventListener('scrollEnd', settle));
      }
      // Ende: Links werden orange, Times wird Archivo
      const ende = $('[data-ende]', root);
      if (ende) ScrollTrigger.create({ trigger: ende, start: 'top 75%', onEnter: () => root.classList.add('is-np'), onLeaveBack: () => root.classList.remove('is-np') });
    }, root);
    cleanups.push(() => ctx.revert());
  } else {
    // Ruhig: der Stilwechsel am Ende geschieht ohne Bewegung beim Erreichen des Endes
    const ende = $('[data-ende]', root);
    if (ende && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(([e]) => root.classList.toggle('is-np', e.isIntersecting || e.boundingClientRect.top < 0), { threshold: 0.2 });
      io.observe(ende); cleanups.push(() => io.disconnect());
    }
  }
  return () => cleanups.forEach((fn) => fn());
}

/* Rohbau-Schalter: Gerüst der Welt 01 mit Etiketten ein- und ausblenden */
function initSchalter(root) {
  const b = $('[data-schalter]', root);
  const sk = $('[data-skelett]', root);
  if (!b || !sk) return;
  b.addEventListener('click', () => {
    const on = b.getAttribute('aria-pressed') !== 'true';
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
    b.textContent = on ? 'Gerüst ausblenden' : 'Gerüst einblenden';
    sk.classList.toggle('is-offen', on);
  });
}

/* Die Browser-Bedienelemente tun lokal etwas Kleines und senden nichts */
function initRoh(root) {
  const status = $('[data-roh-status]', root);
  const btn = $('[data-roh-btn]', root);
  const chk = $('[data-roh-check]', root);
  const sel = $('[data-roh-select]', root);
  if (!status) return;
  let n = 0;
  btn.addEventListener('click', () => { n += 1; status.textContent = `Der Button wurde ${n}-mal gedrückt.`; });
  chk.addEventListener('change', () => { status.textContent = chk.checked ? 'Die Checkbox ist an.' : 'Die Checkbox ist aus.'; });
  sel.addEventListener('change', () => { status.textContent = `Gewählt: ${sel.value}.`; });
}
