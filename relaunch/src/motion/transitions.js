/**
 * Standard-Übergang (Blueprint T.3): Der orange Faden zieht eine Linie quer über den Viewport,
 * dahinter wischt die neue Welt herein. Eine Szene pro Übergang, gepinnt und scrollgesteuert.
 * Der Zähler springt in der Mitte der Szene (Markenregel 4).
 */
import { gsap, $, $$ } from './base.js';
import { setTone, setSection } from './rahmen.js';

export function initTransitions() {
  $$('.transition').forEach((sec) => {
    const thread = $('.t-thread', sec);
    const wipe = $('.t-wipe', sec);
    const from = document.querySelector(`[data-section="${sec.dataset.fromId}"]`);
    const to = document.querySelector(`[data-section="${sec.dataset.toId}"]`);
    let half = null;

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: sec,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          if (!self.isActive) return;
          const second = self.progress > 0.5;
          if (second === half) return;
          half = second;
          setTone(second ? sec.dataset.toTone : sec.dataset.fromTone);
          setSection(second ? to : from);
        },
        onLeave: () => { half = null; },
        onLeaveBack: () => { half = null; },
      },
    });
    // Der Faden zeichnet zuerst die Linie, dann wischt die neue Welt herein
    tl.fromTo(thread, { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: 'power2.out' }, 0)
      .fromTo(wipe, { yPercent: 100 }, { yPercent: 0, duration: 0.7, ease: 'power2.inOut' }, 0.3);
  });
}
