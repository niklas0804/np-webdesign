/**
 * Welt 02 · Bewegung und Bedienung (Blueprint F, I).
 * Die Wartemarke druckt sich aus einem Schlitz (Maske von oben), die Nummer zählt von 05 auf 07; danach der Stempel
 * (1,15 auf 1 in 180 ms mit leichtem Überschwung – nur hier und beim Prüfstempel erlaubt).
 * „Wartemarke ziehen“ und die Terminwahl arbeiten lokal und senden nichts. `init` liefert die Aufräum-Funktion.
 */
import { gsap, ScrollTrigger, $, $$, mode } from '../../motion/base.js';
import { WARTE, pad, wartezeit } from './data.js';

export function init() {
  const root = $('.w02');
  if (!root) return () => {};
  const cleanups = [];
  const animated = mode === 'desktop' || mode === 'mobile';

  initWartemarke(root, animated);
  initTermin(root);

  if (animated) {
    const ctx = gsap.context(() => {
      // Mittelachse zeichnet sich mit dem Scrollen
      gsap.fromTo($('.w02-axis', root), { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: root, start: 'top 70%', end: 'bottom bottom', scrub: true } });

      // Werkzeuge blenden ein
      const tools = $$('.w02-tool', root);
      gsap.set(tools, { autoAlpha: 0, y: 16 });
      ScrollTrigger.create({ trigger: $('.w02-stage', root), start: 'top 75%', once: true,
        onEnter: () => gsap.to(tools, { autoAlpha: (i, el) => (el.classList.contains('w02-tool-mid') ? 0.6 : 0.85), y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out' }) });

      // Wartemarke: druckt sich einmal, wenn sie ins Bild kommt (kein Dauerlauf)
      const ticket = $('[data-ticket]', root);
      const nr = $('[data-t-nr]', root);
      const state = { n: WARTE.aufgerufen };
      const set = () => { nr.textContent = pad(Math.round(state.n)); };
      gsap.set(ticket, { yPercent: -102 });
      set();
      const tl = gsap.timeline({ paused: true })
        .to(ticket, { yPercent: 0, duration: 1.1, ease: 'power2.out' }, 0)
        .to(state, { n: WARTE.start, duration: 1.1, ease: 'none', onUpdate: set }, 0)
        .fromTo(ticket, { scale: 1.15 }, { scale: 1, duration: 0.18, ease: 'back.out(2)', immediateRender: false }, 1.1);
      ScrollTrigger.create({
        trigger: $('[data-printer]', root), start: 'top 78%', end: 'bottom top',
        onEnter: () => tl.play(),
        onLeaveBack: () => { tl.pause(0); state.n = WARTE.aufgerufen; set(); },
      });
    }, root);
    cleanups.push(() => ctx.revert());
  }

  return () => cleanups.forEach((fn) => fn());
}

/* „Wartemarke ziehen“: nächste Nummer, geschätzte Wartezeit (Demo-Daten) */
function initWartemarke(root, animated) {
  const btn = $('[data-ziehen]', root);
  if (!btn) return;
  const nrEl = $('[data-t-nr]', root);
  const wait = $('[data-wait]', root);
  const status = $('[data-wait-status]', root);
  const ticket = $('[data-ticket]', root);
  let nr = WARTE.start;
  btn.addEventListener('click', () => {
    nr = nr >= WARTE.max ? WARTE.start : nr + 1;
    nrEl.textContent = pad(nr);
    const text = `Aufgerufen wird Nr. ${pad(WARTE.aufgerufen)}. Ihre Wartemarke: Nr. ${pad(nr)}. Geschätzte Wartezeit: etwa ${wartezeit(nr)} Minuten.`;
    wait.textContent = text;
    status.textContent = `Neue Wartemarke gezogen. ${text}`;
    if (animated) gsap.fromTo(ticket, { scale: 1.15 }, { scale: 1, duration: 0.18, ease: 'back.out(2)' });
  });
}

/* Terminwahl (Demo): nichts wird gesendet oder gespeichert */
function initTermin(root) {
  const slots = $$('[data-slot]', root);
  const confirm = $('[data-confirm]', root);
  if (!slots.length) return;
  slots.forEach((b) => b.addEventListener('click', () => {
    slots.forEach((o) => o.setAttribute('aria-pressed', o === b ? 'true' : 'false'));
    confirm.hidden = false;
    confirm.textContent = `Vorgemerkt: ${b.textContent}. Das ist eine Demo, es wird nichts gesendet.`;
  }));
}
