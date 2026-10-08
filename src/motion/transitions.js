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
    // Wann der Rahmen seine Farbe wechselt: bei der Iris erst, wenn sie Kopfzeile und Zähler erreicht hat;
    // beim Ladenschluss (Weizengold wird dunkel) früher, sonst verschwindet die Tinte im Braun
    const split = { pruefstempel: 0.78, bon: 0.4, nblende: 0.42 }[sec.dataset.variant] ?? 0.5;

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: sec,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (!self.isActive) return;
          const second = self.progress > split;
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
    } else if (sec.dataset.variant === 'pruefstempel') {
      pruefstempel(tl, sec, wipe);
    } else if (sec.dataset.variant === 'nblende') {
      nblende(tl, sec, wipe);
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

/**
 * Welt 03 → Zwischenspiel I: Der Prüfstempel wird gesetzt (1,15 auf 1), färbt sich NP-Orange, sein Text wechselt zu
 * „Geprüft: kein Baukasten“, und der Ring öffnet sich als P-Iris: eine Kreismaske in der Farbe der Nacht wächst aus dem
 * Innenkreis über den Viewport (Blueprint F, Übergang 4). Nur Transform, Deckkraft, Farbe und Maske.
 */
function pruefstempel(tl, sec, wipe) {
  const seal = $('[data-t-seal]', sec);
  const iris = $('[data-t-iris]', sec);
  const ringA = $('[data-t-ring-a]', sec);
  const ringB = $('[data-t-ring-b]', sec);
  const mainA = $('[data-t-main-a]', sec);
  const mainB = $('[data-t-main-b]', sec);
  const ringGroup = $('[data-t-ringgroup]', sec);
  const token = (name, fallback) => getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
  const orange = token('--np-orange', '#CE5D17');
  const glut = token('--glut', '#F08A4B');
  // Innenkreis des Siegels (r 40 von 80) in Pixeln, und der Radius, der den ganzen Viewport deckt
  const innerR = () => seal.getBoundingClientRect().width * 0.25;
  const coverR = () => Math.hypot(window.innerWidth, window.innerHeight) / 2 + 8;

  gsap.set(wipe, { autoAlpha: 0 }); // hier wird nicht gewischt, sondern aufgeblendet
  gsap.set(seal, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
  gsap.set([ringB, mainB], { autoAlpha: 0 });
  tl.fromTo(seal, { autoAlpha: 0, scale: 1.15, rotation: -9 }, { autoAlpha: 0.94, scale: 1, rotation: -9, duration: 0.12, ease: 'back.out(2)' }, 0)
    .to(seal, { color: orange, autoAlpha: 1, duration: 0.14 }, 0.16)
    .to([ringA, mainA], { autoAlpha: 0, duration: 0.1 }, 0.18)
    .fromTo([ringB, mainB], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, 0.24)
    // Die Blende öffnet sich im Innenkreis des Siegels (dem „Bauch des P“) und wächst dann über den Viewport
    .fromTo(iris, { clipPath: 'circle(0px at 50% 50%)' }, { clipPath: () => `circle(${innerR()}px at 50% 50%)`, duration: 0.08, ease: 'power1.out', immediateRender: true }, 0.3)
    .to(iris, { clipPath: () => `circle(${coverR()}px at 50% 50%)`, duration: 0.5, ease: 'power2.inOut' }, 0.4)
    .to(ringGroup, { rotation: 40, svgOrigin: '80 80', duration: 0.5, ease: 'power2.inOut' }, 0.4)
    .to(seal, { color: glut, duration: 0.2 }, 0.52)
    .to(seal, { autoAlpha: 0, scale: 1.08, duration: 0.12 }, 0.88);
}

/**
 * Zwischenspiel I → Welt 04: Der orange Faden zeichnet ein N nach (Kontur), dann setzt sich das N in Weiß über die Nacht:
 * linker Schenkel, Diagonale, rechter Schenkel; danach füllt eine schräge Kante den Rest mit Reinweiß (Blueprint F, Übergang 5).
 * „Kein Zufall.“ steht dabei in NP-Orange mittig; das Wort „Zufall“ wandert an seine Stelle in „Nichts dem Zufall überlassen.“,
 * die übrigen Wörter erscheinen, am Ende blendet alles aus und die Welt rollt mit derselben Schlagzeile herein.
 * Nur Transform, Deckkraft, Farbe, Strichlänge und Masken.
 */
function nblende(tl, sec, wipe) {
  const outline = $('[data-t-outline] polygon', sec);
  const nl = $('[data-t-nl]', sec);
  const nd = $('[data-t-nd]', sec);
  const nr = $('[data-t-nr]', sec);
  const fill = $('[data-t-fill]', sec);
  const kz = $('[data-t-kz]', sec);
  const kein = $('[data-t-kein]', sec);
  const kzZ = $('[data-t-kz-z]', sec);
  const dot = $('[data-t-dot]', sec);
  const wrap = $('[data-t-finalwrap]', sec);
  const final = $('[data-t-final]', sec);
  const pre = $$('[data-t-pre]', sec);
  const finZ = $('[data-t-final-z]', sec);
  const post = $$('[data-t-post]', sec);
  const ink = () => getComputedStyle(final).color;
  // Das Wort „Zufall“ fährt von seiner Mitte-Position an die Stelle im Schlagzeilen-Satz (gleiche Schriftgröße, nur Verschiebung)
  const shift = (axis) => () => {
    const a = kzZ.getBoundingClientRect(); const b = finZ.getBoundingClientRect();
    return axis === 'x' ? b.left - a.left : b.top - a.top;
  };

  gsap.set(wipe, { autoAlpha: 0 });
  gsap.set(kz, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
  gsap.set([...pre, finZ, ...post], { autoAlpha: 0 });
  tl.fromTo(outline, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.16, ease: 'power2.out' }, 0)
    .fromTo(kz, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.12, ease: 'power2.out' }, 0.04)
    .fromTo(nl, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.1, ease: 'power2.out' }, 0.14)
    .fromTo(nd, { clipPath: 'polygon(26% 0%, 26% 0%, 26% 0%, 26% 0%)' }, { clipPath: 'polygon(26% 0%, 74% 66%, 74% 100%, 26% 34%)', duration: 0.14, ease: 'none' }, 0.24)
    .fromTo(nr, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.1, ease: 'power2.out' }, 0.38)
    .to(outline, { autoAlpha: 0, duration: 0.08 }, 0.3)
    .fromTo(fill, { xPercent: -130, skewX: -35, autoAlpha: 1 }, { xPercent: 0, skewX: 0, autoAlpha: 1, duration: 0.24, ease: 'power2.inOut' }, 0.46)
    .to(kzZ, { color: ink, duration: 0.08 }, 0.72)
    .to([kein, dot], { autoAlpha: 0, duration: 0.08 }, 0.7)
    .to(kzZ, { x: shift('x'), y: shift('y'), duration: 0.2, ease: 'power2.inOut' }, 0.72)
    .fromTo([...pre, ...post], { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.12, stagger: 0.05, ease: 'power2.out' }, 0.78)
    .set(finZ, { autoAlpha: 1 }, 0.92)
    .set(kzZ, { autoAlpha: 0 }, 0.92)
    .to([wrap, kz], { autoAlpha: 0, duration: 0.08 }, 0.94);
}
