/**
 * Standard-Übergang (Blueprint T.3): Der orange Faden zieht eine Linie quer über den Viewport,
 * dahinter wischt die neue Welt herein. Eine Szene pro Übergang, gepinnt und scrollgesteuert.
 * Der Zähler springt in der Mitte der Szene (Markenregel 4).
 */
import { gsap, $, $$, mode } from './base.js';
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
    const split = { pruefstempel: 0.78, bon: 0.4, nblende: 0.42, scheinwerfer: 0.62, strahl: 0.55, messraster: 0.45, wasser: 0.5, fenster: 0.55 }[sec.dataset.variant] ?? 0.5;

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
    } else if (sec.dataset.variant === 'messraster') {
      messraster(tl, sec);
    } else if (sec.dataset.variant === 'wasser') {
      wasser(tl, sec);
    } else if (sec.dataset.variant === 'fenster') {
      fenster(tl, sec);
    } else if (sec.dataset.variant === 'scheinwerfer') {
      scheinwerfer(tl, sec, wipe);
    } else if (sec.dataset.variant === 'kreise') {
      kreise(tl, sec, wipe);
    } else if (sec.dataset.variant === 'strahl') {
      strahl(tl, sec, wipe);
    } else if (sec.dataset.variant === 'zierlinie') {
      zierlinie(tl, sec, wipe);
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

/**
 * Welt 04 → Welt 05: Die rote Linie unter der Schlagzeile verlängert sich über die Breite und biegt sich zur Zierlinie der
 * Karosserie; dabei wechselt sie von Siegelrot zu Elfenbein, Reinweiß wird British Racing Green (Blueprint F, Übergang 6).
 * Pfad-Morph von gerade zu Kurve ohne Plugin: gleiche Befehlsfolge, GSAP rechnet die Zahlen um. Nur Strichlänge, Pfad, Farbe, Transform.
 */
function zierlinie(tl, sec, wipe) {
  const path = $('[data-t-zl]', sec);
  const kurve = 'M40 250 C300 250 380 118 560 122 S860 200 1000 140';
  const to = getComputedStyle(sec).getPropertyValue('--to-accent').trim() || '#EFE6D2';
  tl.fromTo(path, { strokeDashoffset: 0.62 }, { strokeDashoffset: 0, duration: 0.3, ease: 'power2.out' }, 0.02)
    .to(path, { attr: { d: kurve }, duration: 0.4, ease: 'power2.inOut' }, 0.3)
    .fromTo(wipe, { y: 0, yPercent: 100 }, { yPercent: 0, duration: 0.55, ease: 'power2.inOut' }, 0.3)
    .to(path, { stroke: to, duration: 0.3, ease: 'none' }, 0.5)
    .to(path, { autoAlpha: 0, duration: 0.1 }, 0.9);
}

/**
 * Welt 05 → Welt 06: Die Kamera fährt auf den runden Scheinwerfer zu. Der Faden zeichnet zuerst den Ring (Elfenbein), das Glas glüht
 * warm auf (Pfirsich), wächst über den Viewport und wird zur Farbkugel; Racing Green wird Pfirsich und läuft in Flieder aus (Blueprint F, Übergang 7).
 * Glühen als Radialverlauf ohne Unschärfe (Blueprint O). Nur Transform, Deckkraft, Strichlänge.
 */
function scheinwerfer(tl, sec, wipe) {
  const wrap = $('[data-t-lampwrap]', sec);
  const ring = $('[data-t-ring]', sec);
  const lamp = $('[data-t-lamp]', sec);
  const cover = () => (Math.hypot(window.innerWidth, window.innerHeight) / wrap.getBoundingClientRect().width) * 1.15;
  gsap.set(wipe, { autoAlpha: 0 });
  gsap.set(wrap, { xPercent: -50, yPercent: -50 });
  tl.fromTo(ring, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.18, ease: 'power2.out' }, 0)
    .fromTo(lamp, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power1.in' }, 0.16)
    .to(ring, { opacity: 0, duration: 0.12 }, 0.4)
    .fromTo(wrap, { scale: 1 }, { scale: cover, duration: 0.5, ease: 'power2.in', immediateRender: false }, 0.34)
    .to(wipe, { autoAlpha: 1, duration: 0.14 }, 0.86)
    .to(wrap, { autoAlpha: 0, duration: 0.1 }, 0.9);
}

/**
 * Welt 06 → Zwischenspiel II: Die konzentrischen Kreise rollen sich zu einer Linie ab (Ellipsen mit schwindender Höhe und wachsender Breite),
 * die Linie bekommt sechs Stationen und wechselt von Malve zu NP-Orange; Flieder wird Leinen (Blueprint F, Übergang 8).
 */
function kreise(tl, sec, wipe) {
  const es = $$('[data-t-e]', sec);
  const stations = $$('[data-t-st]', sec);
  const svg = $('[data-t-kr]', sec);
  const orange = getComputedStyle(document.documentElement).getPropertyValue('--np-orange').trim() || '#CE5D17';
  gsap.set(wipe, { y: 0, yPercent: 100 });
  tl.fromTo(es, { opacity: 0, scale: 0.7, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.2, stagger: 0.05, ease: 'power2.out' }, 0)
    .to(es, { attr: { rx: 460, ry: 0.5 }, duration: 0.42, stagger: 0.04, ease: 'power2.inOut' }, 0.25)
    .to(es, { stroke: orange, duration: 0.25, ease: 'none' }, 0.5)
    .fromTo(stations, { opacity: 0, scale: 0.2, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.14, stagger: 0.04, ease: 'back.out(2)' }, 0.62)
    .to(wipe, { yPercent: 0, duration: 0.5, ease: 'power2.inOut' }, 0.4)
    .to(svg, { autoAlpha: 0, duration: 0.1 }, 0.92);
}

/**
 * Zwischenspiel II → Welt 07: Der Prozessstrahl (orange, sechs Stationen) glüht auf und wird zur Laserlinie in Signalgelb;
 * der Grund dunkelt von Leinen zu Stahlschiefer (Blueprint F, Übergang 9). Leuchten nur am Desktop (Radialverlauf statt Unschärfe).
 */
function strahl(tl, sec, wipe) {
  const beam = $('[data-t-beam]', sec);
  const dots = $$('[data-t-dot]', sec);
  const glow = $('[data-t-glow]', sec);
  const to = getComputedStyle(sec).getPropertyValue('--to-accent').trim() || '#F2C230';
  gsap.set(wipe, { yPercent: 0, y: 0, autoAlpha: 0 });
  tl.fromTo(beam, { attr: { x2: 40 } }, { attr: { x2: 960 }, duration: 0.3, ease: 'power2.out' }, 0)
    .fromTo(dots, { opacity: 0, scale: 0.2, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.14, stagger: 0.04, ease: 'back.out(2)' }, 0.1)
    .to(wipe, { autoAlpha: 1, duration: 0.4, ease: 'power1.inOut' }, 0.3)
    .to(beam, { stroke: to, duration: 0.25 }, 0.5)
    .to(dots, { opacity: 0, duration: 0.15 }, 0.55);
  if (glow && mode === 'desktop') tl.fromTo(glow, { opacity: 0 }, { opacity: 1, duration: 0.25 }, 0.45);
  tl.to([beam, glow].filter(Boolean), { autoAlpha: 0, duration: 0.1 }, 0.92);
}

/**
 * Welt 07 → Welt 08: Die Messraster-Zellen ordnen sich zum Monatskalender, eine Zelle leuchtet als gebuchter Termin;
 * Stahlschiefer wird Mint (Blueprint F, Übergang 10). Die Zellen kommen verstreut und finden ihre Plätze (Transform, Deckkraft, Farbe).
 */
function messraster(tl, sec) {
  const cal = $('[data-t-cal]', sec);
  const cells = $$('[data-t-cell]', sec);
  const heads = $$('[data-t-head]', sec);
  const termin = $('[data-termin]', sec);
  const bg = $('.t-stage', sec);
  const css = (n, d) => getComputedStyle(sec).getPropertyValue(n).trim() || d;
  const to = css('--to-accent', '#2F6B57'); const toText = css('--to-text', '#1E2D2A');
  const toGround = css('--to', '#CDE8DA'); const fromGround = css('--from', '#2B3642');
  const r = gsap.utils.random;
  gsap.set(cal, { xPercent: -50, yPercent: -50 });
  // Zufällige Startlagen einmal festlegen (stabil beim Zurückscrollen)
  const start = cells.map(() => ({ x: r(-45, 45, 1) * (window.innerWidth / 100), y: r(-40, 40, 1) * (window.innerHeight / 100), rotation: r(-30, 30, 1) }));
  tl.fromTo(cells, { x: (i) => start[i].x, y: (i) => start[i].y, rotation: (i) => start[i].rotation, opacity: 0 }, { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.5, stagger: { each: 0.008, from: 'random' }, ease: 'power3.out' }, 0.04)
    .fromTo(heads, { opacity: 0 }, { opacity: 1, duration: 0.12, stagger: 0.02 }, 0.45)
    .fromTo(bg, { backgroundColor: fromGround }, { backgroundColor: toGround, duration: 0.35, ease: 'none' }, 0.4)
    .to(cells, { borderColor: to, color: toText, duration: 0.3, ease: 'none' }, 0.45)
    .to(heads, { color: toText, duration: 0.3, ease: 'none' }, 0.45)
    .fromTo(termin, { scale: 1 }, { scale: 1.12, backgroundColor: to, color: '#fff', duration: 0.14, ease: 'back.out(2)' }, 0.75)
    .to(termin, { scale: 1, duration: 0.08 }, 0.89)
    .to(cal, { autoAlpha: 0, duration: 0.08 }, 0.94);
}

/**
 * Welt 08 → Welt 09: Das Bild des Weihers zoomt aus und wird zum See in der Abenddämmerung (Blueprint F, Übergang 11, länger: 80/50 vh).
 * Die Fotos stehen als Bildplatzhalter, nichts ist gezeichnet; Mint kippt in Dämmerungsviolett, die Wasserlinie zieht sich auf.
 */
function wasser(tl, sec) {
  const frame = $('[data-t-wsframe]', sec);
  const a = $('[data-t-wsa]', sec);
  const b = $('[data-t-wsb]', sec);
  const line = $('[data-t-wsline]', sec);
  const bg = $('.t-stage', sec);
  const css = (n, d) => getComputedStyle(sec).getPropertyValue(n).trim() || d;
  tl.fromTo(frame, { scale: 1.3, transformOrigin: '50% 60%' }, { scale: 1, duration: 0.7, ease: 'power2.out' }, 0)
    .fromTo(line, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.3, ease: 'power2.inOut' }, 0.2)
    .to(a, { opacity: 0, duration: 0.3, ease: 'none' }, 0.4)
    .to(b, { opacity: 1, duration: 0.3, ease: 'none' }, 0.4)
    .fromTo(bg, { backgroundColor: css('--from', '#CDE8DA') }, { backgroundColor: css('--to', '#2A1F33'), duration: 0.4, ease: 'none' }, 0.35)
    .to(line, { opacity: 0, duration: 0.1 }, 0.85)
    .to(frame, { autoAlpha: 0, duration: 0.1 }, 0.92);
}

/**
 * Welt 09 → Zwischenspiel III: Die Kamera fährt auf ein erleuchtetes Fenster zu; sein Rahmen wird zur Maske für das Porträt
 * (Blueprint F, Übergang 12). Das Fenster geht an, wächst über den Viewport und füllt sich mit dem Leinen der nächsten Seite.
 */
function fenster(tl, sec) {
  const win = $('[data-t-window]', sec);
  const licht = $('[data-t-licht]', sec);
  const bg = $('.t-stage', sec);
  const toGround = getComputedStyle(sec).getPropertyValue('--to').trim() || '#F0EBE3';
  const cover = () => Math.max(window.innerWidth / win.offsetWidth, window.innerHeight / win.offsetHeight) * 1.25;
  gsap.set(win, { xPercent: -50, yPercent: -50 });
  tl.fromTo(win, { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 0.18, ease: 'power2.out' }, 0)
    .fromTo(licht, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power1.in' }, 0.14)
    .fromTo(win, { scale: 1 }, { scale: cover, duration: 0.5, ease: 'power2.in', immediateRender: false }, 0.36)
    .to(licht, { backgroundColor: toGround, backgroundImage: 'none', duration: 0.2, ease: 'none' }, 0.7)
    .to(bg, { backgroundColor: toGround, duration: 0.15, ease: 'none' }, 0.82)
    .to(win, { autoAlpha: 0, duration: 0.08 }, 0.94);
}
