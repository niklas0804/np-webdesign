/**
 * Übergänge zwischen den Welten (Blueprint F, T.3; Auftrag 11. Oktober 2026, Teil A und B).
 *
 * Aufbau (siehe docs/troubleshooting-uebergaenge.md): Die Bühne liegt unter den Welten, die alte Welt deckt sie beim Wegziehen auf,
 * die neue schiebt sich später darüber. Über allen Welten liegt die Ebene des Staffelstabs. Das Objekt der Übergabe ist ein echtes Element
 * der alten Welt: Es wird dort abgeholt (Lage und Größe gemessen), als Abbild in die feste Ebene gehoben und am Ende genau auf das
 * Gegenstück der neuen Welt gelegt (Lage und Größe gemessen). Das echte Gegenstück bleibt bis dahin unsichtbar (`data-lent`).
 *
 * Zeit der Timeline = Bildschirmhöhen (svh) ab dem Moment, in dem die alte Welt mit ihrem letzten Bildschirm den Viewport füllt:
 *   0 … 100        die alte Welt zieht weg und deckt die Bühne auf (A = 100: die alte Welt ist ganz weg)
 *   100 … 100+len  die Bühne steht frei (len = Länge des Übergangs aus der Konfiguration)
 *   100+len … L    die neue Welt schiebt sich von unten darüber; bei L (= 200 + len) steht ihr erstes Bild genau da, wo es hingehört
 */
import { gsap, ScrollTrigger, $, $$ } from './base.js';
import { setTone, setSection } from './rahmen.js';
import { docRect, viewRect, cloneOf, refreshClone, snapshot, lend } from './baton.js';
import { windowAtStart } from './finale.js';

/** 1 svh in Pixeln. Die Bühne selbst ist 100 lvh hoch (deckt auch bei eingefahrener Adressleiste), die Ränder rechnen mit svh. */
let probe = null;
function svhUnit() {
  if (!probe) {
    probe = document.createElement('div');
    probe.setAttribute('aria-hidden', 'true');
    probe.style.cssText = 'position:absolute;left:0;top:0;width:0;height:100svh;visibility:hidden;pointer-events:none';
    document.body.append(probe);
  }
  return probe.offsetHeight / 100;
}

/** Ziel-Elemente je Übergang: ihr Zustand beim Laden wird festgehalten, bevor die Weltmodule sie animieren */
const DST = { bon: ['.w02-ticket'], goldlinie: ['.w03-mass'], stempel: ['.w04-line'], zierlinie: ['.w05-zier'], scheinwerfer: ['.w06-orb-wrap'], messkreise: ['.w07-rund'],
  messraster: ['.w08-kalender i', '.w08-kalender b'], wasser: ['.w09-hero-bild'] };
export function snapshotBatons() {
  $$('.transition[data-variant]').forEach((sec) => {
    const to = document.querySelector(`[data-section="${sec.dataset.toId}"]`);
    (DST[sec.dataset.variant] || []).forEach((sel) => $$(sel, to).forEach(snapshot));
  });
}

/** Spätere Abschnitte eines Staffelstabs sind fromTo mit ausdrücklichem Startwert und ohne Sofortdarstellung: .to() würde seinen Startwert erst beim ersten Erreichen merken (und beim Zurückspringen falsch setzen) */
const NI = { immediateRender: false };
/** #RRGGBB → rgba(r, g, b, a) (für Schatten, die GSAP durchrechnen kann) */
const rgba = (hex, a) => { const h = String(hex).replace('#', ''); const n = parseInt(h.length === 3 ? h.replace(/./g, '$&$&') : h, 16); return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`; };
const el = (cls) => { const e = document.createElement('div'); e.className = cls; return e; };

export function initTransitions() {
  $$('.transition').forEach((sec) => {
    const stage = $('.t-stage', sec);
    const layer = $('[data-t-layer]', sec);
    const thread = $('.t-thread', sec);
    const wipe = $('.t-wipe', sec);
    const fromSec = document.querySelector(`[data-section="${sec.dataset.fromId}"]`);
    const toSec = document.querySelector(`[data-section="${sec.dataset.toId}"]`);
    const variant = sec.dataset.variant;
    const len = () => parseFloat(getComputedStyle(sec).getPropertyValue('--len')) || 60;
    const L = () => 200 + len();
    const unit = svhUnit;
    let half = null;
    const lent = [];
    const clones = []; // { shell, el, world, pristine }
    // Wann der Rahmen seine Farbe wechselt: Anteil des freien Fensters
    const splitW = { nblende: 0.6, piris: 0.5, bon: 0.45, goldlinie: 0.5, stempel: 0.5, zierlinie: 0.5, scheinwerfer: 0.62, messkreise: 0.5, messraster: 0.45, wasser: 0.5, fensterplan: 0.5 }[variant] ?? 0.5;

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: sec,
        start: 'top top',
        end: () => `top+=${L() * unit()} top`,
        scrub: true,
        invalidateOnRefresh: true,
        // Bei jedem Refresh setzt ScrollTrigger (invalidateOnRefresh) die Animation zurück und rendert nur Tweens mit ausdrücklichem
        // immediateRender neu. Alles andere stünde im CSS-Grundzustand, bis der Scroll den Tween erreicht, und spränge dann (gemessen:
        // Kalenderzellen in Welt 07 → 08, vorwärts anders als rückwärts). Deshalb einmal ganz durchspielen und zurück.
        onRefresh: () => { clones.forEach((k) => refreshClone(k.shell, k.el, k.world, k.pristine)); const p = tl.progress(); tl.progress(1, true).progress(p, true); },
        onToggle: (self) => {
          if (self.isActive) clones.forEach((k) => refreshClone(k.shell, k.el, k.world, k.pristine));
          layer.classList.toggle('is-on', self.isActive);
          lent.forEach((e) => lend(e, self.isActive));
        },
        onUpdate: (self) => {
          if (!self.isActive) return;
          const second = self.progress * L() > 100 + len() * splitW;
          if (second === half) return;
          half = second;
          setTone(second ? sec.dataset.toTone : sec.dataset.fromTone);
          setSection(second ? toSec : fromSec);
        },
        onLeave: () => { half = null; },
        onLeaveBack: () => { half = null; },
      },
    });

    const c = {
      tl, sec, stage, layer, thread, wipe, fromSec, toSec, len, L, lent,
      /** Abbild eines echten Elements; `pristine`: Zustand beim Laden (für Ziele) statt des laufenden Zustands */
      clone: (e, world, pristine = false) => { const shell = cloneOf(e, world, docRect(e), pristine && e.__pristine ? e.__pristine : e); clones.push({ shell, el: e, world, pristine }); return shell; },
      A: 100, E: () => 100 + len(),
      start: () => tl.scrollTrigger.start,
      end: () => tl.scrollTrigger.end,
      vw: () => document.documentElement.clientWidth,
      vh: () => stage.offsetHeight,
      from: sec.dataset.fromGround, to: sec.dataset.toGround,
      fromAccent: getComputedStyle(sec).getPropertyValue('--from-accent').trim(), toAccent: getComputedStyle(sec).getPropertyValue('--to-accent').trim(),
      srcRect: (e) => viewRect(e, tl.scrollTrigger.start),
      dstRect: (e) => viewRect(e, tl.scrollTrigger.end),
      world: (s) => s?.dataset.world,
    };
    const fn = { bon, goldlinie, stempel, zierlinie, scheinwerfer, messkreise, messraster, wasser, fensterplan, nblende }[variant];
    if (!(fn && fn(c))) {
      // Ohne Staffelstab: der Faden zeichnet eine Linie, dann wischt die neue Welt herein
      tl.fromTo(thread, { scaleX: 0 }, { scaleX: 1, duration: 40, ease: 'power2.out' }, 100)
        .fromTo(wipe, { yPercent: 100 }, { yPercent: 0, duration: 60, ease: 'power2.inOut' }, 100 + 20);
    }
    tl.set({}, {}, L());
  });
}

/* ---------- gemeinsame Hilfen ---------- */

/** Eine Stelle in der Mitte des Fensters: Position (Mittelpunkt) in Bildschirmpixeln */
const center = (c) => ({ x: c.vw() / 2, y: c.vh() / 2 });

/** Abbild in die Ebene setzen, am Mittelpunkt verankert (xPercent/yPercent −50) */
function put(c, node) {
  c.layer.append(node);
  gsap.set(node, { xPercent: -50, yPercent: -50 });
  return node;
}

/** Hintergrund der Bühne wechselt über das freie Fenster */
function ground(c, from, to, at, dur) {
  c.tl.fromTo(c.stage, { backgroundColor: from }, { backgroundColor: to, duration: dur, ease: 'none', immediateRender: true }, at);
}

/* ---------- t01 · Bon → Wartemarke (Welt 01 → 02) ---------- */
/**
 * Der Bon „Nr. 07“ aus Halmberg wird dort abgeholt, hebt ab, dreht sich um die Hochachse und wird als goldene Wartemarke von Messingstuhl neu gedruckt.
 * Der Grund dunkelt, wie der Laden schließt. Landung: genau auf die Wartemarke im Kopf von Welt 02.
 */
function bon(c) {
  const src = $('.w01-bon', c.fromSec); const dst = $('.w02-ticket', c.toSec);
  if (!src || !dst) return false;
  c.lent.push(src, dst);
  const sr = () => c.srcRect(src); const dr = () => c.dstRect(dst);
  const W = () => Math.min(300, c.vw() * 0.7);
  const card = put(c, el('t-card')); gsap.set(card, { xPercent: 0, yPercent: 0 });
  const front = c.clone(src, '01'); const back = c.clone(dst, '02', true);
  card.append(front, back);
  gsap.set([front, back], { xPercent: -50, yPercent: -50 });
  gsap.set(back, { rotationY: 180 });
  const { tl, A } = c; const E = c.E();
  tl.fromTo(card, { x: () => sr().cx, y: () => sr().cy }, { x: () => center(c).x, y: () => center(c).y, duration: 70, ease: 'power2.inOut', immediateRender: true }, 8)
    .fromTo(front, { scale: 1, boxShadow: '0 0 0 rgba(0,0,0,0)' }, { scale: () => W() / sr().w, boxShadow: '0 22px 40px rgba(20,12,4,.35)', duration: 70, ease: 'power2.inOut', immediateRender: true }, 8)
    .fromTo(back, { scale: () => W() / dr().w }, { scale: () => W() / dr().w, duration: 0.001, immediateRender: true }, 0)
    .fromTo(card, { rotationY: 0 }, { rotationY: 180, duration: c.len() * 0.5, ease: 'power2.inOut', immediateRender: true }, A + c.len() * 0.1)
    .fromTo(card, { x: () => center(c).x, y: () => center(c).y }, { x: () => dr().cx, y: () => dr().cy, duration: 86, ease: 'power2.inOut', ...NI }, E + 6)
    .fromTo(back, { scale: () => W() / dr().w }, { scale: 1, duration: 86, ease: 'power2.inOut', ...NI }, E + 6);
  ground(c, c.from, c.to, A, c.len() * 0.7);
  return true;
}

/* ---------- t02 · Goldlinie → Maßlinie (Welt 02 → 03) ---------- */
/**
 * Die Messingschiene am Ende des Salons wird abgeholt, streckt sich über die Breite, wird tuscheblau und bekommt Maßpfeile und den Wert „12.400“;
 * Millimeterpapier schiebt sich darunter von unten über das Dunkel. Landung: genau auf die Maßlinie im Kopf von Welt 03.
 */
function goldlinie(c) {
  const src = $('.w02-schiene', c.fromSec); const dst = $('.w03-mass', c.toSec);
  if (!src || !dst) return false;
  c.lent.push(src, dst);
  const sr = () => c.srcRect(src); const dr = () => c.dstRect(dst);
  const bar = put(c, c.clone(src, '02'));
  const mass = put(c, c.clone(dst, '03', true));
  const { tl, A } = c; const E = c.E(); const len = c.len();
  const blue = () => c.toAccent || '#2B5C8A';
  tl.fromTo(bar, { x: () => sr().cx, y: () => sr().cy, scaleX: 1, autoAlpha: 1 }, { x: () => center(c).x, y: () => center(c).y, scaleX: () => c.vw() / sr().w, duration: 80, ease: 'power2.inOut', immediateRender: true }, 8)
    .fromTo(bar._el, { backgroundColor: () => getComputedStyle(src).backgroundColor }, { backgroundColor: () => getComputedStyle(src).backgroundColor, duration: 0.001, immediateRender: true }, 0)
    .fromTo(mass, { x: () => center(c).x, y: () => center(c).y, autoAlpha: 0, scaleX: () => c.vw() / dr().w }, { autoAlpha: 0, duration: 0.001, immediateRender: true }, 0)
    // 100 → : Schiene zieht sich auf Maßlinienbreite zusammen und wird blau, die Maßlinie blendet ein
    .fromTo(bar, { scaleX: () => c.vw() / sr().w }, { scaleX: () => dr().w / sr().w, duration: len * 0.4, ease: 'power2.inOut', ...NI }, A + len * 0.1)
    .fromTo(bar._el, { backgroundColor: () => getComputedStyle(src).backgroundColor }, { backgroundColor: blue, duration: len * 0.4, ease: 'none', ...NI }, A + len * 0.1)
    .fromTo(mass, { autoAlpha: 0, scaleX: () => c.vw() / dr().w, scaleY: 1.8 }, { autoAlpha: 1, scaleX: 1.8, scaleY: 1.8, duration: len * 0.3, ease: 'power2.out', ...NI }, A + len * 0.35)
    .fromTo(bar, { autoAlpha: 1 }, { autoAlpha: 0, duration: len * 0.15, ...NI }, A + len * 0.55)
    // Millimeterpapier schiebt sich über das Dunkel
    .fromTo(c.wipe, { yPercent: 100 }, { yPercent: 0, duration: len * 0.7, ease: 'power2.inOut' }, A + len * 0.3)
    // Landung
    .fromTo(mass, { x: () => center(c).x, y: () => center(c).y, scaleX: 1.8, scaleY: 1.8 }, { x: () => dr().cx, y: () => dr().cy, scaleX: 1, scaleY: 1, duration: 86, ease: 'power2.inOut', ...NI }, E + 6);
  return true;
}

/* ---------- t03 · Prüfstempel → rote Linie (Welt 03 → 04) ---------- */
/**
 * Der rote Prüfvermerk am Ende von Wittgenfeld wird abgeholt und gesetzt (er schlägt von 1,4 auf 1 ein); sein Abdruck streckt sich zur roten Linie
 * unter der Kanzlei-Schlagzeile „Nichts dem Zufall überlassen.“. Planblau wird Reinweiß. Landung: genau auf die Linie in Welt 04.
 */
function stempel(c) {
  const src = $('.w03-stempel', c.fromSec); const dst = $('.w04-line', c.toSec);
  if (!src || !dst) return false;
  c.lent.push(src, dst);
  const sr = () => c.srcRect(src); const dr = () => c.dstRect(dst);
  const stamp = put(c, c.clone(src, '03'));
  const line = put(c, c.clone(dst, '04', true));
  const { tl, A } = c; const E = c.E(); const len = c.len();
  const stampW = () => sr().w;
  const NI = { immediateRender: false };
  tl.fromTo(stamp, { x: () => sr().cx, y: () => sr().cy, scale: 1, autoAlpha: 1 }, { x: () => center(c).x, y: () => center(c).y, scale: 1.4, duration: 60, ease: 'power2.inOut', immediateRender: true }, 8)
    // gesetzt: schlägt auf 1 ein
    .fromTo(stamp, { scale: 1.4 }, { scale: 1, duration: len * 0.12, ease: 'power4.in', ...NI }, A + len * 0.05)
    // der Abdruck: die rote Linie wächst aus der Breite des Stempels, anfangs dick, und wird auf dem Weg zur Linie dünn
    .fromTo(line, { x: () => center(c).x, y: () => center(c).y, scaleX: () => stampW() / dr().w, scaleY: 4, autoAlpha: 0 }, { autoAlpha: 1, scaleX: () => Math.min(c.vw() * 0.8, 900) / dr().w, duration: len * 0.4, ease: 'power3.out', immediateRender: true }, A + len * 0.22)
    // der Stempel bleibt als Geisterring stehen und wächst
    .fromTo(stamp, { scale: 1, autoAlpha: 1 }, { scale: 2.4, autoAlpha: 0.22, duration: len * 0.5, ease: 'power2.out', ...NI }, A + len * 0.3)
    .fromTo(line, { scaleX: () => Math.min(c.vw() * 0.8, 900) / dr().w, scaleY: 4, x: () => center(c).x, y: () => center(c).y }, { scaleX: 1, scaleY: 1, x: () => dr().cx, y: () => dr().cy, duration: 100 - 14, ease: 'power2.inOut', ...NI }, E + 6)
    .fromTo(stamp, { autoAlpha: 0.22 }, { autoAlpha: 0, duration: 40, ...NI }, E + 6);
  ground(c, c.from, c.to, A + len * 0.15, len * 0.6);
  return true;
}

/* ---------- t04 · Rote Linie → Zierlinie (Welt 04 → 05) ---------- */
/**
 * Die rote Schlusslinie der Kanzlei wird abgeholt, streckt sich über die Breite und biegt sich zur elfenbeinfarbenen Zierlinie von Chromwerk.
 * Reinweiß wird British Racing Green. Landung: genau auf die Zierlinie im Kopf von Welt 05.
 */
function zierlinie(c) {
  const src = $('.w04-schluss', c.fromSec); const dst = $('.w05-zier', c.toSec);
  if (!src || !dst) return false;
  c.lent.push(src, dst);
  const sr = () => c.srcRect(src); const dr = () => c.dstRect(dst);
  const bar = put(c, c.clone(src, '04'));
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 1000 80'); svg.setAttribute('preserveAspectRatio', 'none'); svg.setAttribute('aria-hidden', 'true');
  Object.assign(svg.style, { position: 'absolute', left: '0', top: '0', overflow: 'visible' });
  const path = document.createElementNS(NS, 'path');
  const gerade = 'M40 62 C300 62 380 62 560 62 S860 62 1000 62';
  const kurve = $('path', dst)?.getAttribute('d') || 'M40 62 C300 62 380 18 560 22 S860 50 1000 30';
  path.setAttribute('d', gerade);
  Object.assign(path.style, { fill: 'none', stroke: c.fromAccent || '#A3122A', strokeWidth: '14px', vectorEffect: 'non-scaling-stroke', strokeLinecap: 'round' });
  svg.append(path); put(c, svg);
  const { tl, A } = c; const E = c.E(); const len = c.len();
  const dstAccent = () => c.toAccent || '#EFE6D2';
  tl.fromTo(bar, { x: () => sr().cx, y: () => sr().cy, scaleX: 1, scaleY: 1, autoAlpha: 1 }, { x: () => center(c).x, y: () => center(c).y, scaleX: () => c.vw() / sr().w, scaleY: 3, duration: 80, ease: 'power2.inOut', immediateRender: true }, 8)
    .fromTo(svg, { x: () => center(c).x, y: () => center(c).y, width: () => dr().w, height: () => dr().h, autoAlpha: 0 }, { autoAlpha: 0, duration: 0.001, immediateRender: true }, 0)
    .fromTo(path, { stroke: c.fromAccent || '#A3122A', strokeWidth: '14px', attr: { d: gerade } }, { stroke: c.fromAccent || '#A3122A', strokeWidth: '14px', attr: { d: gerade }, duration: 0.001, immediateRender: true }, 0)
    // die Linie zieht sich auf die Breite der Zierlinie zusammen und wird dick wie ein Pinselstrich
    .fromTo(bar, { scaleX: () => c.vw() / sr().w, scaleY: 3 }, { scaleX: () => dr().w / sr().w, scaleY: 3.5, duration: len * 0.25, ease: 'power2.inOut', ...NI }, A)
    .fromTo(svg, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, ...NI }, A + len * 0.25)
    .fromTo(bar, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.01, ...NI }, A + len * 0.25)
    .fromTo(path, { attr: { d: gerade } }, { attr: { d: kurve }, duration: len * 0.45, ease: 'power2.inOut', immediateRender: false }, A + len * 0.28)
    .fromTo(path, { stroke: c.fromAccent || '#A3122A' }, { stroke: dstAccent, duration: len * 0.3, ease: 'none', ...NI }, A + len * 0.62)
    .fromTo(path, { strokeWidth: '14px' }, { strokeWidth: '3px', duration: 40, ease: 'power2.inOut', ...NI }, E + 50)
    .fromTo(svg, { x: () => center(c).x, y: () => center(c).y }, { x: () => dr().cx, y: () => dr().cy, duration: 86, ease: 'power2.inOut', ...NI }, E + 6);
  ground(c, c.from, c.to, A + len * 0.1, len * 0.6);
  return true;
}

/* ---------- t05 · Scheinwerfer → Farbkugel (Welt 05 → 06) ---------- */
/**
 * Der Scheinwerfer am Ende von Chromwerk wird abgeholt, glüht warm auf, wächst über den Bildschirm und schrumpft als Farbkugel von Jana Ahrens
 * zurück auf ihren Platz. Racing Green wird Pfirsich und läuft in Flieder aus. Landung: genau auf die Kugel im Kopf von Welt 06.
 */
function scheinwerfer(c) {
  const src = $('.w05-lampe', c.fromSec); const dst = $('.w06-orb-wrap', c.toSec);
  if (!src || !dst) return false;
  c.lent.push(src, dst);
  const sr = () => c.srcRect(src); const dr = () => c.dstRect(dst);
  const lamp = put(c, c.clone(src, '05'));
  const orb = put(c, c.clone(dst, '06', true));
  const { tl, A } = c; const E = c.E(); const len = c.len();
  const edge = (a) => `0 0 0 4px ${rgba(c.toAccent || '#8A5470', a)}`; // Rand der Kugel: hebt sie vom gleich hellen Flieder ab, solange sie den Bildschirm füllt
  orb.style.borderRadius = '50%';
  const cover = () => (c.vh() * 1.3) / dr().w; // fast bildschirmhoch: Rand und Ecken bleiben sichtbar (nie ein einfarbiger Bildschirm)
  const lampScale = () => (sr().w * 2.2) / dr().w;
  tl.fromTo(lamp, { x: () => sr().cx, y: () => sr().cy, scale: 1, autoAlpha: 1 }, { x: () => center(c).x, y: () => center(c).y, scale: 2.2, duration: 70, ease: 'power2.inOut', immediateRender: true }, 8)
    .fromTo(orb, { x: () => center(c).x, y: () => center(c).y, scale: lampScale, autoAlpha: 0 }, { autoAlpha: 0, duration: 0.001, immediateRender: true }, 0)
    // das Glas glüht auf
    .fromTo(orb, { autoAlpha: 0 }, { autoAlpha: 1, duration: len * 0.3, ease: 'power1.in', ...NI }, A * 0.5)
    .fromTo(orb, { boxShadow: () => edge(0) }, { boxShadow: () => edge(0.7), duration: len * 0.3, ease: 'none', immediateRender: true }, A + len * 0.1)
    // wächst fast bis zur Bildschirmhöhe; der Ring verblasst
    .fromTo(orb, { scale: lampScale }, { scale: cover, duration: len * 0.55, ease: 'power2.in', ...NI }, A + len * 0.15)
    .fromTo(lamp, { autoAlpha: 1 }, { autoAlpha: 0, duration: len * 0.25, ...NI }, A + len * 0.2)
    // schrumpft auf die Kugel in Welt 06
    // bleibt groß, bis die neue Welt von unten kommt, und schrumpft dann auf die Kugel in Welt 06
    .fromTo(orb, { scale: cover, x: () => center(c).x, y: () => center(c).y }, { scale: 1, x: () => dr().cx, y: () => dr().cy, duration: 45, ease: 'power2.inOut', ...NI }, E + 55)
    .fromTo(orb, { boxShadow: () => edge(0.7) }, { boxShadow: () => edge(0), duration: 40, ease: 'none', ...NI }, E + 60);
  ground(c, c.from, c.to, A + len * 0.2, len * 0.6);
  return true;
}

/* ---------- t06 · Kreise → Messkreise (Welt 06 → 07) ---------- */
/**
 * Die konzentrischen Kreise der Farbkugel am Ende von Jana Ahrens werden abgeholt und zu den Messkreisen einer Rundheitsmessung an einem Bauteil;
 * die Laserlinie von TORQUEL tastet sie ab. Flieder wird Stahlschiefer, Malve wird Signalgelb. Landung: genau auf die Messkreise im Kopf von Welt 07.
 */
function messkreise(c) {
  const src = $('.w06-messkreise', c.fromSec); const dst = $('.w07-rund', c.toSec);
  if (!src || !dst) return false;
  c.lent.push(src, dst);
  const sr = () => c.srcRect(src); const dr = () => c.dstRect(dst);
  const rings = put(c, c.clone(src, '06'));
  const rund = put(c, c.clone(dst, '07', true));
  const laser = el('t-laser'); put(c, laser);
  const { tl, A } = c; const E = c.E(); const len = c.len();
  const size = () => Math.min(c.vw() * 0.7, c.vh() * 0.62, 480);
  const yellow = () => c.toAccent || '#F2C230';
  const contour = $('.w07-rund-kontur', rund);
  tl.fromTo(rings, { x: () => sr().cx, y: () => sr().cy, scale: 1, autoAlpha: 1 }, { x: () => center(c).x, y: () => center(c).y, scale: () => size() / sr().w, duration: 80, ease: 'power2.inOut', immediateRender: true }, 8)
    .fromTo(rund, { x: () => center(c).x, y: () => center(c).y, scale: () => size() / dr().w, autoAlpha: 0 }, { autoAlpha: 0, duration: 0.001, immediateRender: true }, 0)
    .fromTo(laser, { x: () => center(c).x - size() / 2 - 20, y: () => center(c).y, height: () => size() * 1.15, autoAlpha: 0 }, { autoAlpha: 0, duration: 0.001, immediateRender: true }, 0)
    // die Kreise werden gelb und zu Messkreisen
    .fromTo(rings.querySelectorAll('i'), { borderColor: () => getComputedStyle(src.querySelector('i')).borderTopColor }, { borderColor: () => getComputedStyle(src.querySelector('i')).borderTopColor, duration: 0.001, immediateRender: true }, 0)
    .fromTo(rings.querySelectorAll('i'), { borderColor: () => getComputedStyle(src.querySelector('i')).borderTopColor }, { borderColor: yellow, duration: len * 0.3, ...NI }, A)
    .fromTo(rund, { autoAlpha: 0 }, { autoAlpha: 1, duration: len * 0.2, ...NI }, A + len * 0.2)
    .fromTo(rings, { autoAlpha: 1 }, { autoAlpha: 0, duration: len * 0.2, ...NI }, A + len * 0.35)
    // der Laser tastet ab: von links nach rechts über die Kreise, die Kontur erscheint in seinem Zug
    .fromTo(laser, { autoAlpha: 0 }, { autoAlpha: 1, duration: len * 0.05, ...NI }, A + len * 0.3)
    .fromTo(laser, { x: () => center(c).x - size() / 2 - 20 }, { x: () => center(c).x + size() / 2 + 20, duration: len * 0.5, ease: 'power1.inOut', ...NI }, A + len * 0.35)
    .fromTo(laser, { autoAlpha: 1 }, { autoAlpha: 0, duration: len * 0.08, ...NI }, A + len * 0.85);
  if (contour) tl.fromTo(contour, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: len * 0.5, ease: 'power1.inOut', immediateRender: true }, A + len * 0.35);
  tl.fromTo(rund, { x: () => center(c).x, y: () => center(c).y, scale: () => size() / dr().w }, { x: () => dr().cx, y: () => dr().cy, scale: 1, duration: 100 - 36, ease: 'power2.inOut', ...NI }, E + 30);
  ground(c, c.from, c.to, A + len * 0.1, len * 0.55);
  return true;
}

/* ---------- t07 · Messraster → Monatskalender (Welt 07 → 08) ---------- */
/**
 * Die 35 Zellen des Messrasters am Ende von TORQUEL werden einzeln abgeholt, lösen sich vom Raster, ordnen sich in der Bildmitte zum Kalender,
 * eine Zelle leuchtet als Termin; Stahlschiefer wird Mint. Landung: jede Zelle genau auf ihre Zelle im Kalender von Welt 08.
 */
function messraster(c) {
  const srcs = $$('.w07-raster i', c.fromSec); const dsts = $$('.w08-kalender i', c.toSec); const heads = $$('.w08-kalender b', c.toSec);
  const grid = $('.w07-raster', c.fromSec); const cal = $('.w08-kalender', c.toSec);
  if (!srcs.length || srcs.length !== dsts.length || !grid || !cal) return false;
  c.lent.push(grid, cal);
  const { tl, A } = c; const E = c.E(); const len = c.len();
  const r = gsap.utils.random;
  // Mittelanordnung: der Kalender (Maße und Abstände wie im Ziel) in die Bildmitte geschoben
  const off = () => { const d = viewRect(cal, c.end()); return { x: center(c).x - d.cx, y: center(c).y - d.cy }; };
  const scatter = srcs.map(() => ({ x: r(-0.3, 0.3, 0.01), y: r(-0.3, 0.3, 0.01), rot: r(-25, 25, 1) }));
  const blue = c.toAccent || '#2F6B57'; const toText = getComputedStyle(c.sec).getPropertyValue('--to-text').trim() || '#1E2D2A';
  const cells = srcs.map((s, i) => {
    const front = c.clone(s, '07'); const back = c.clone(dsts[i], '08', true);
    const node = el('t-pieces'); node.append(front, back); c.layer.append(node);
    gsap.set([front, back], { xPercent: -50, yPercent: -50 });
    const sr = () => c.srcRect(s); const dr = () => c.dstRect(dsts[i]);
    gsap.set(back, { autoAlpha: 0 });
    tl.fromTo(front, { autoAlpha: 1 }, { autoAlpha: 1, duration: 0.001, immediateRender: true }, 0)
      .fromTo(back, { autoAlpha: 0 }, { autoAlpha: 0, duration: 0.001, immediateRender: true }, 0);
    // 8–70: von ihrer Stelle im Raster zu verstreuten Lagen um die Mitte
    tl.fromTo(node, { x: () => sr().cx, y: () => sr().cy, rotation: 0 }, { x: () => center(c).x + scatter[i].x * c.vw(), y: () => center(c).y + scatter[i].y * c.vh(), rotation: scatter[i].rot, duration: 62, ease: 'power2.inOut', immediateRender: true }, 8 + (i % 7) * 0.8)
      // 100 → : ordnen sich zum Kalender in der Bildmitte
      .fromTo(node, { x: () => center(c).x + scatter[i].x * c.vw(), y: () => center(c).y + scatter[i].y * c.vh(), rotation: scatter[i].rot }, { x: () => dr().cx + off().x, y: () => dr().cy + off().y, rotation: 0, duration: len * 0.45, ease: 'power3.out', ...NI }, A + (i % 7) * 0.4 + Math.floor(i / 7) * 0.5)
      // Farbwechsel: Zellen von Stahlschiefer-Gelb zu Mint-Grün (Aussehen der Zielzelle blendet ein)
      .fromTo(back, { autoAlpha: 0 }, { autoAlpha: 1, duration: len * 0.2, ...NI }, A + len * 0.4)
      .fromTo(front, { autoAlpha: 1 }, { autoAlpha: 0, duration: len * 0.2, ...NI }, A + len * 0.4)
      // Landung auf der echten Zelle
      .fromTo(node, { x: () => dr().cx + off().x, y: () => dr().cy + off().y }, { x: () => dr().cx, y: () => dr().cy, duration: 86, ease: 'power2.inOut', ...NI }, E + 6);
    return node;
  });
  // Wochentage blenden in der Mitte ein und landen mit
  heads.forEach((h) => {
    const node = el('t-pieces'); const cl = c.clone(h, '08', true); node.append(cl); c.layer.append(node);
    gsap.set(cl, { xPercent: -50, yPercent: -50 });
    const dr = () => c.dstRect(h);
    tl.fromTo(node, { x: () => dr().cx + off().x, y: () => dr().cy + off().y, autoAlpha: 0 }, { autoAlpha: 1, duration: len * 0.15, immediateRender: true }, A + len * 0.4)
      .fromTo(node, { x: () => dr().cx + off().x, y: () => dr().cy + off().y }, { x: () => dr().cx, y: () => dr().cy, duration: 86, ease: 'power2.inOut', ...NI }, E + 6);
    c.lent.push(h);
  });
  c.lent.push(...dsts);
  void cells;
  ground(c, c.from, c.to, A + len * 0.25, len * 0.5);
  return true;
}

/* ---------- t08 · Weiher → See (Welt 08 → 09) ---------- */
/**
 * Das Bild des Weihers am Ende von Praxis am Weiher wird abgeholt, zoomt aus und wird zum See in der Abenddämmerung von Gut Weidenstein;
 * Mint kippt in Dämmerungsviolett, die Wasserlinie zieht sich auf. Die Fotos stehen als Bildplatzhalter, nichts ist gezeichnet.
 * Landung: genau auf das Bild im Kopf von Welt 09.
 */
function wasser(c) {
  const src = $('.w08-weiher', c.fromSec); const dst = $('.w09-hero-bild', c.toSec);
  if (!src || !dst) return false;
  c.lent.push(src, dst);
  const sr = () => c.srcRect(src); const dr = () => c.dstRect(dst);
  const a = put(c, c.clone(src, '08'));
  const b = put(c, c.clone(dst, '09', true));
  const line = $('[data-t-wsline]', c.sec);
  const { tl, A } = c; const E = c.E(); const len = c.len();
  const width = () => Math.min(c.vw() * 0.9, 1100);
  tl.fromTo(a, { x: () => sr().cx, y: () => sr().cy, scale: 1, autoAlpha: 1 }, { x: () => center(c).x, y: () => center(c).y, scale: () => width() / sr().w, duration: 80, ease: 'power2.inOut', immediateRender: true }, 8)
    .fromTo(b, { x: () => center(c).x, y: () => center(c).y, scale: () => width() / dr().w, autoAlpha: 0 }, { autoAlpha: 0, duration: 0.001, immediateRender: true }, 0)
    // erst kippt der Grund ins Dämmerungsviolett (siehe unten), dann blendet der See über
    .fromTo(b, { autoAlpha: 0 }, { autoAlpha: 1, duration: len * 0.3, ease: 'none', ...NI }, A + len * 0.5)
    .fromTo(a, { autoAlpha: 1 }, { autoAlpha: 0, duration: len * 0.25, ...NI }, A + len * 0.6)
    .fromTo(b, { x: () => center(c).x, y: () => center(c).y, scale: () => width() / dr().w }, { x: () => dr().cx, y: () => dr().cy, scale: 1, duration: 86, ease: 'power2.inOut', ...NI }, E + 6);
  if (line) tl.fromTo(line, { strokeDashoffset: 1, autoAlpha: 1 }, { strokeDashoffset: 0, duration: len * 0.5, ease: 'power1.inOut', immediateRender: true }, A + len * 0.05)
    .fromTo(line, { autoAlpha: 1 }, { autoAlpha: 0, duration: len * 0.15, ...NI }, A + len * 0.85);
  ground(c, c.from, c.to, A, len * 0.4);
  return true;
}

/* ---------- t09 · Fenster → Werkplan (Welt 09 → Finale) ---------- */
/**
 * Das erleuchtete Fenster am Ende von Gut Weidenstein wird abgeholt und wächst auf die Größe, in der es im ersten Bild des Finales steht: im leeren
 * zehnten Platz des Werkplans, der die ganze Bühne füllt. Von dort fährt die Kamera zurück, bis der ganze Werkplan sichtbar ist (Finale).
 * Landung: genau auf das Fenster im ersten Bild des Finales.
 */
function fensterplan(c) {
  const src = $('.w09-fenster', c.fromSec);
  const dstEl = $('.f-window', c.toSec);
  if (!src || !dstEl) return false;
  c.lent.push(src, dstEl);
  const sr = () => c.srcRect(src); const dr = () => windowAtStart() || c.dstRect(dstEl);
  const win = put(c, c.clone(src, '09'));
  const { tl, A } = c; const E = c.E(); const len = c.len();
  const mid = () => Math.min(c.vw() * 0.5, c.vh() * 0.46, 300) / sr().w;
  tl.fromTo(win, { x: () => sr().cx, y: () => sr().cy, scale: 1 }, { x: () => center(c).x, y: () => center(c).y, scale: mid, duration: 85, ease: 'power2.inOut', immediateRender: true }, 8)
    // das Fenster wächst, bis es so groß ist wie im ersten Bild des Finales
    .fromTo(win, { x: () => center(c).x, y: () => center(c).y, scale: mid }, { scale: () => dr().w / sr().w, x: () => dr().cx, y: () => dr().cy, duration: len * 0.7 + 100, ease: 'power2.inOut', ...NI }, A + len * 0.2);
  // Der Grund bleibt Dämmerung: Welt 09 und der zehnte Platz haben dieselbe Farbe
  return true;
}

/* ---------- N-Blende (Startseite: Warum → Vergleich) ---------- */
/**
 * Der Faden am linken Rand von S2 ist das linke Bein eines N. Die Diagonale zeichnet sich von oben links nach unten rechts, das rechte Bein
 * steigt vom unteren Rand auf (genau über dem rechten Rand des Browserrahmens von S3). Dann wischt die Diagonale von Nacht zu Leinen:
 * erst füllt sich das Dreieck oben rechts, dann das unten links. Das N bleibt als Faden stehen; S3 schiebt sich darüber, der rechte Strich
 * wird dort zur Trennlinie.
 */
function nblende(c) {
  const frame = $('.vg-frame', c.toSec);
  const spine = $('.warum-faden', c.fromSec);
  if (!frame || !spine) return false;
  const wipe = el('t-nb-wipe'); const left = el('t-nb-leg t-nb-l'); const diag = el('t-nb-diag'); const right = el('t-nb-leg t-nb-r');
  c.stage.append(wipe, left, diag, right);
  const fx = () => parseFloat(getComputedStyle(spine).left) || 58;
  const xr = () => { const r = docRect(frame); return r.x + r.w; };
  const geom = () => {
    const w = c.vw(); const h = c.vh(); const l = fx(); const r = xr();
    const dx = r - l; const dy = h; const len = Math.hypot(dx, dy);
    const ux = dx / len; const uy = dy / len;
    wipe.style.setProperty('--W', `${w}px`); wipe.style.setProperty('--H', `${h}px`);
    wipe.style.setProperty('--ux', String(ux)); wipe.style.setProperty('--uy', String(uy)); wipe.style.setProperty('--nx', String(uy)); wipe.style.setProperty('--ny', String(-ux));
    left.style.left = `${l}px`; right.style.left = `${r}px`;
    diag.style.left = `${l}px`; diag.style.width = `${len}px`;
    gsap.set(diag, { rotation: (Math.atan2(dy, dx) * 180) / Math.PI });
  };
  geom();
  ScrollTrigger.addEventListener('refresh', geom);
  const { tl, A } = c; const len = c.len();
  tl.fromTo(wipe, { '--a': 0 }, { '--a': 1, duration: len * 0.42, ease: 'power2.inOut', immediateRender: true }, A + len * 0.34)
    .fromTo(diag, { scaleX: 0 }, { scaleX: 1, duration: len * 0.28, ease: 'power2.inOut', immediateRender: true }, A)
    .fromTo(right, { scaleY: 0 }, { scaleY: 1, duration: len * 0.2, ease: 'power2.out', immediateRender: true }, A + len * 0.2);
  return true;
}
