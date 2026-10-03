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
    if (sec.dataset.variant === 'bon') {
      bon(tl, sec, wipe);
    } else if (sec.dataset.variant === 'goldlinie') {
      goldlinie(tl, sec, wipe, thread);
    } else {
      // Der Faden zeichnet zuerst die Linie, dann wischt die neue Welt herein
      tl.fromTo(thread, { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: 'power2.out' }, 0)
        .fromTo(wipe, { y: 0, yPercent: 100 }, { yPercent: 0, duration: 0.7, ease: 'power2.inOut' }, 0.3);
    }
  });
}

/**
 * Welt 01 → 02: Ladenschluss. Der Grund dunkelt, der Bon „Nr. 07“ bleibt im Licht, dreht sich um die Hochachse
 * und wird als goldene Wartemarke neu gedruckt (Blueprint F, Übergang 2). Der Faden zeichnet zuerst die Kontur.
 * Nur Transform, Deckkraft und Strichlänge – keine Layout-Animation.
 */
function bon(tl, sec, wipe) {
  const obj = $('[data-t-bon]', sec);
  const card = $('[data-t-card]', sec);
  const outline = $('[data-t-outline] rect', sec);
  gsap.set(obj, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
  gsap.set(wipe, { yPercent: 0, autoAlpha: 0 }); // hier wird nicht gewischt, sondern überblendet
  tl.fromTo(obj, { autoAlpha: 0, scale: 0.94, y: 24 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.14, ease: 'power2.out' }, 0)
    .fromTo(outline, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.22, ease: 'power2.out' }, 0.02)
    .to(outline, { autoAlpha: 0, duration: 0.1 }, 0.26)
    .fromTo(wipe, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 0.12)
    .fromTo(card, { rotationY: 0 }, { rotationY: 180, duration: 0.45, ease: 'power2.inOut' }, 0.3)
    .to(obj, { autoAlpha: 0, scale: 1.04, duration: 0.15 }, 0.85);
}

/**
 * Welt 02 → 03: Die Goldlinie streckt sich über die Breite, wird tuscheblau, bekommt Maßpfeile und den Wert „12.400“;
 * Millimeterpapier schiebt sich darunter von unten über das Dunkel (Blueprint F, Übergang 3).
 * Der orange Faden zeichnet zuerst die Linie nach. Nur Transform und Deckkraft.
 */
function goldlinie(tl, sec, wipe, thread) {
  const gold = $('[data-t-gold]', sec);
  const blue = $('[data-t-blue]', sec);
  const dim = $('[data-t-dim]', sec);
  const mass = $('[data-t-mass]', sec);
  tl.fromTo(thread, { scaleX: 0 }, { scaleX: 1, duration: 0.18, ease: 'power2.out' }, 0)
    .to(thread, { autoAlpha: 0, duration: 0.12 }, 0.2)
    .fromTo(gold, { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power2.out' }, 0.08)
    .fromTo(blue, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 }, 0.35)
    .to(gold, { autoAlpha: 0, duration: 0.15 }, 0.35)
    .fromTo(dim, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, 0.4)
    .fromTo(wipe, { y: 0, yPercent: 100 }, { yPercent: 0, duration: 0.55, ease: 'power2.inOut' }, 0.45)
    .to(mass, { autoAlpha: 0, duration: 0.1 }, 0.92);
}
