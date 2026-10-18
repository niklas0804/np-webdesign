/**
 * S3 · Der Kunden-Test: Ablauf und Steuerung (wird erst bei Annäherung geladen, siehe index.js).
 * Ein simulierter Kunde erledigt auf beiden Fassungen dasselbe: Computer = Rennen in zwei Fenstern (Termin buchen),
 * Handy = eine Karte, Szenen nacheinander (Anrufen); auf dem Computer lässt sich „Am Handy“ zuschalten (zwei Karten parallel).
 * Nur transform und opacity (plus visibility), kein ScrollTrigger, kein Scroll-Hijacking. Das Markup steht im Endzustand;
 * jeder Lauf setzt den Anfangszustand, misst die Zielpunkte im Dokument und baut eine neue Zeitleiste (robust bei Größenänderung).
 */
import { gsap, $, $$ } from '../base.js';

const WIDE = matchMedia('(min-width: 1024px)');

export function initKundentest(sec) {
  const demo = $('[data-kt-demo]', sec);
  if (!demo) return;
  const live = $('[data-kt-live]', sec);
  const res = $('[data-kt-res]', sec);
  const pauseBtn = $('[data-pause]', sec);
  const pauseLabel = $('[data-pause-label]', sec);
  const runBtns = $$('[data-run]', sec);
  const devBtns = $$('[data-dev]', sec);
  const warum = $$('[data-kt-warum] li', sec);

  const q = (root, sel) => $(sel, root);
  const L = (root, name) => $(`[data-l="${name}"]`, root);

  let device = 'pc'; // nur auf dem Computer: 'pc' | 'phone'
  let tl = null;
  let started = false;

  const view = () => (WIDE.matches ? (device === 'phone' ? 'phones' : 'race') : 'single');

  /* ---------- Hilfen ---------- */
  /** Mitte (oder Bruchteil) eines Elements in Koordinaten von `box` (ohne Transformationen von box selbst) */
  const at = (el, box, fx = 0.5, fy = 0.5) => {
    const r = el.getBoundingClientRect(); const b = box.getBoundingClientRect();
    return { x: r.left - b.left + r.width * fx, y: r.top - b.top + r.height * fy };
  };
  const show = (el, on = true) => gsap.set(el, { autoAlpha: on ? 1 : 0 });
  /** Zähler und Texte folgen der Zeit: Tabelle [Zeit, Text], damit auch Springen und Wiederholen stimmen */
  const timed = (el, rows) => {
    const f = (t) => { let txt = rows[0][1]; for (const [at_, s] of rows) if (t >= at_) txt = s; if (el.textContent !== txt) el.textContent = txt; };
    f(0); return f;
  };
  /** Zeiger bewegt sich von selbst auf (x, y) */
  const move = (tl_, cur, p, t, d = 0.5) => tl_.to(cur, { x: p.x, y: p.y, duration: d, ease: 'power2.inOut' }, t);
  const click = (tl_, rip, p, t) => {
    tl_.set(rip, { x: p.x, y: p.y, scale: 0.3, autoAlpha: 0.9 }, t)
      .to(rip, { scale: 1.15, autoAlpha: 0, duration: 0.45, ease: 'power2.out' }, t);
  };
  const say = (tl_, text, t) => tl_.call(() => { live.textContent = text; }, null, t);

  /* ---------- Rennen am Computer ---------- */
  function raceBase(ctx) {
    const { win, count } = ctx;
    const box = q(win, '[data-view]');
    const cur = q(box, '[data-cur]'); const rip = q(box, '[data-rip]');
    const skel = L(box, 'skel'); const home = L(box, 'home'); const ang = L(box, 'angebot'); const kon = L(box, 'kontakt');
    const cookie = q(box, '[data-cookie]'); const jl = q(box, '[data-jumpline]'); const label = q(box, '[data-label]');
    const stock = q(home, '[data-stock]'); const jump = q(home, '[data-jump]');
    // Anfangszustand
    gsap.set([home, ang, kon, cookie, label, jl], { autoAlpha: 0 });
    show(skel); gsap.set(cur, { x: at(box, box, .62, .30).x, y: at(box, box, .62, .30).y, autoAlpha: 1 });
    gsap.set(rip, { autoAlpha: 0 }); gsap.set(stock, { autoAlpha: 1 }); gsap.set(jump, { y: 0 });
    gsap.set(skel, { autoAlpha: 1 });
    const ih = stock.getBoundingClientRect().height + (parseFloat(getComputedStyle(stock.parentElement).paddingTop) || 0);
    const P = {
      ck: at(q(box, '[data-ckbtn]'), box, .5, .5),
      tile: at(q(home, '[data-tile="angebot"]'), box, .5, .45),
      logo: at(q(home, '[data-n="logo"]'), box, .5, .5),
      kont: at(q(home, '[data-n="kontakt"]'), box, .5, .5),
      fm: at(q(kon, '[data-fm]'), box, .5, .5),
      fn: at(q(kon, '[data-fn]'), box, .5, .5),
      sInfo: at(q(home, '[data-n="kontakt"]'), box, -.9, .5),
    };
    const set = (tl_, el, a, t) => tl_.set(el, { autoAlpha: a }, t);
    const tl_ = gsap.timeline({ paused: true });
    // 0 bis 1,4 s: träges Laden (die Platzhalter pulsieren leicht)
    tl_.to(skel, { opacity: 0.55, duration: 0.5, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0.1);
    tl_.set(skel, { autoAlpha: 0 }, 1.4).set(home, { autoAlpha: 1 }, 1.4).set(stock, { autoAlpha: 0 }, 1.4).set(jump, { y: -ih }, 1.4);
    // Layout springt einmal: das Bild rutscht nach, alles darunter springt
    tl_.set(stock, { autoAlpha: 1 }, 1.95).set(jump, { y: 0 }, 1.95)
      .set(jl, { autoAlpha: 1 }, 1.95).to(jl, { autoAlpha: 0, duration: 0.4 }, 2.0);
    // Cookie-Hinweis
    tl_.set(cookie, { autoAlpha: 1, y: 40 }, 2.2).to(cookie, { y: 0, duration: 0.3, ease: 'power2.out' }, 2.2);
    move(tl_, cur, { x: P.ck.x - 6, y: P.ck.y - 2 }, 2.6, 0.7);
    click(tl_, rip, P.ck, 3.4);
    tl_.set(cookie, { autoAlpha: 0 }, 3.45);
    // Menü absuchen, Kachel „Unser Angebot“ (zweiter Klick), zurück über das Logo
    move(tl_, cur, P.sInfo, 3.7, 0.5);
    move(tl_, cur, P.tile, 4.3, 0.5);
    click(tl_, rip, P.tile, 4.85);
    tl_.set(home, { autoAlpha: 0 }, 4.9).set(ang, { autoAlpha: 1 }, 4.9);
    move(tl_, cur, P.logo, 5.0, 0.4);
    click(tl_, rip, P.logo, 5.45);
    tl_.set(ang, { autoAlpha: 0 }, 5.5).set(home, { autoAlpha: 1 }, 5.5);
    move(tl_, cur, P.kont, 5.6, 0.4);
    click(tl_, rip, P.kont, 6.05);
    tl_.set(home, { autoAlpha: 0 }, 6.1).set(kon, { autoAlpha: 1 }, 6.1);
    move(tl_, cur, P.fm, 6.2, 0.4); click(tl_, rip, P.fm, 6.6);
    move(tl_, cur, P.fn, 6.7, 0.35); click(tl_, rip, P.fn, 7.05);
    tl_.set(label, { autoAlpha: 0 }, 0).to(label, { autoAlpha: 1, duration: 0.25 }, 7.2);
    say(tl_, 'Baukasten: Nach sechs Klicks auf drei Seiten ist kein Termin buchbar. Der Kunde schreibt eine Mail oder geht.', 7.3);
    const f = timed(count, [[0, 'Klicks 0 · Seiten 1'], [3.4, 'Klicks 1 · Seiten 1'], [4.85, 'Klicks 2 · Seiten 2'], [5.45, 'Klicks 3 · Seiten 2'], [6.05, 'Klicks 4 · Seiten 3'], [6.6, 'Klicks 5 · Seiten 3'], [7.05, 'Klicks 6 · Seiten 3']]);
    return { tl: tl_, end: 7.5, update: f };
  }

  function raceMass(ctx) {
    const { win, count } = ctx;
    const box = q(win, '[data-view]');
    const cur = q(box, '[data-cur]'); const rip = q(box, '[data-rip]'); const label = q(box, '[data-label]');
    const t07 = q(box, '.kt-t07'); const slots = q(box, '.kt-slots'); const book = q(box, '.kt-tbook');
    const wa = q(box, '.kt-wa'); const wb = q(box, '.kt-wb'); const stamp = q(box, '[data-stamp]'); const s17 = q(box, '[data-slot]');
    gsap.set([t07, wa], { autoAlpha: 1 }); gsap.set([slots, book, wb, stamp, label], { autoAlpha: 0 });
    s17.classList.remove('on');
    gsap.set(cur, { x: at(box, box, .78, .62).x, y: at(box, box, .78, .62).y, autoAlpha: 1 }); gsap.set(rip, { autoAlpha: 0 });
    const P = { termin: at(q(box, '[data-termin]'), box, .5, .6), slot: at(s17, box, .5, .55) };
    const tl_ = gsap.timeline({ paused: true });
    move(tl_, cur, P.termin, 0.15, 0.5);
    click(tl_, rip, P.termin, 0.7);
    tl_.to(t07, { autoAlpha: 0, duration: 0.2 }, 0.75).to(slots, { autoAlpha: 1, duration: 0.25 }, 0.8);
    move(tl_, cur, P.slot, 0.9, 0.45);
    click(tl_, rip, P.slot, 1.4);
    tl_.call(() => s17.classList.add('on'), null, 1.4)
      .to(slots, { autoAlpha: 0, duration: 0.2 }, 1.55).to(book, { autoAlpha: 1, duration: 0.3 }, 1.55)
      .to(wa, { autoAlpha: 0, duration: 0.2 }, 1.55).to(wb, { autoAlpha: 1, duration: 0.3 }, 1.6)
      .fromTo(stamp, { autoAlpha: 0, scale: 1.6 }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, 1.7)
      .to(label, { autoAlpha: 1, duration: 0.25 }, 1.95);
    say(tl_, 'Maßarbeit: Zwei Klicks, der Termin heute um 17:15 steht.', 2.2);
    const f = timed(count, [[0, 'Klicks 0 · Seiten 1'], [0.7, 'Klicks 1 · Seiten 1'], [1.4, 'Klicks 2 · Seiten 1']]);
    return { tl: tl_, end: 2.3, update: f };
  }

  /* ---------- Handykarten ---------- */
  function phoneBase(ctx) {
    const { card, count } = ctx;
    const pv = q(card, '[data-pv]'); const sc = q(pv, '[data-scroll]'); const skel = L(pv, 'skel');
    const zone = q(pv, '[data-zone]'); const label = q(pv, '[data-label]'); const rip = q(pv, '[data-rip]'); const fing = q(pv, '[data-fing]');
    const tel = q(pv, '[data-tel]'); const stock = q(sc, '[data-stock]'); const jump = q(sc, '[data-jump]');
    gsap.set(sc, { y: 0, autoAlpha: 1 }); gsap.set(skel, { autoAlpha: 1 }); gsap.set([zone, label], { autoAlpha: 0 }); gsap.set(rip, { autoAlpha: 0 });
    tel.classList.remove('hit');
    gsap.set($$('.bk-nav, .kt-stockrow, .bk-welcome, .bk-text, .bk-btn, .bk-tile, .bk-more > *, .bk-foot2 > *', sc), { clearProps: 'opacity,visibility,transform' });
    const H = pv.clientHeight; const max = Math.max(0, sc.scrollHeight - H);
    const cp = (el, fx = .5, fy = .5) => at(el, sc, fx, fy); // Lage im Inhalt (unabhängig vom Verschieben)
    const tile = cp(q(sc, '[data-tile="ueber"]')); const more = cp(q(sc, '[data-more]')); const wel = cp(q(sc, '[data-welcome]'), .5, .6); const tp = cp(tel, .86, .5);
    const y1 = -Math.min(max, Math.max(0, tile.y - H * 0.42)); const y2 = -Math.min(max, Math.max(-y1, (max + -y1) / 2)); const y3 = -max;
    const scr = (p, y) => ({ x: p.x, y: p.y + y }); // Bildschirmlage = Inhaltslage + Verschiebung
    const W = pv.clientWidth;
    gsap.set(fing, { x: W * 0.55, y: H * 0.62, autoAlpha: 1 });
    gsap.set(label, { y: 0 });
    const ih = stock.getBoundingClientRect().height + (parseFloat(getComputedStyle(stock.parentElement).paddingTop) || 0);
    gsap.set(stock, { autoAlpha: 1 }); gsap.set(jump, { y: 0 });
    const tl_ = gsap.timeline({ paused: true });
    tl_.to(skel, { opacity: 0.55, duration: 0.5, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0.1);
    tl_.set(skel, { autoAlpha: 0 }, 1.6).set(stock, { autoAlpha: 0 }, 1.6).set(jump, { y: -ih }, 1.6)
      .set(stock, { autoAlpha: 1 }, 2.0).set(jump, { y: 0 }, 2.0);
    // Tippen daneben (1), „Mehr erfahren“ (2), Scrollen (1), Kachel „Über uns“ (3), Scrollen (2, 3), Nummer (4)
    move(tl_, fing, scr(wel, 0), 2.2, 0.35); click(tl_, rip, scr(wel, 0), 2.6);
    move(tl_, fing, scr(more, 0), 2.7, 0.3); click(tl_, rip, scr(more, 0), 3.05);
    tl_.to(sc, { y: y1, duration: 0.6, ease: 'power2.inOut' }, 3.2).to(fing, { y: H * 0.5, x: W * 0.5, duration: 0.6, ease: 'power2.inOut' }, 3.2);
    move(tl_, fing, scr(tile, y1), 3.85, 0.3); click(tl_, rip, scr(tile, y1), 4.2);
    tl_.to(sc, { y: y2, duration: 0.55, ease: 'power2.inOut' }, 4.35).to(fing, { y: H * 0.55, duration: 0.55, ease: 'power2.inOut' }, 4.35)
      .to(sc, { y: y3, duration: 0.55, ease: 'power2.inOut' }, 5.0).to(fing, { y: H * 0.45, x: W * 0.4, duration: 0.55, ease: 'power2.inOut' }, 5.0);
    tl_.call(() => { const r = tel.getBoundingClientRect(); const b = pv.getBoundingClientRect(); label.style.top = `${Math.max(8, r.top - b.top - label.offsetHeight - 14)}px`; label.style.bottom = 'auto'; }, null, 5.55);
    tl_.to(zone, { autoAlpha: 1, duration: 0.3 }, 5.6).to(label, { autoAlpha: 1, duration: 0.3 }, 5.7)
      .call(() => tel.classList.add('hit'), null, 5.7);
    move(tl_, fing, scr(tp, y3), 5.9, 0.3); click(tl_, rip, scr(tp, y3), 6.25);
    say(tl_, 'Baukasten: Nach vier Taps und dreimal Scrollen steht die Telefonnummer ganz unten, außerhalb der Daumenzone.', 6.4);
    const f = timed(count, [[0, 'Taps 0 · Scrollen 0 ×'], [2.6, 'Taps 1 · Scrollen 0 ×'], [3.05, 'Taps 2 · Scrollen 0 ×'], [3.2, 'Taps 2 · Scrollen 1 ×'], [4.2, 'Taps 3 · Scrollen 1 ×'], [4.35, 'Taps 3 · Scrollen 2 ×'], [5.0, 'Taps 3 · Scrollen 3 ×'], [6.25, 'Taps 4 · Scrollen 3 ×']]);
    return { tl: tl_, end: 6.6, update: f, blocks: () => $$('.bk-nav, .kt-stockrow, .bk-welcome, .bk-text, .bk-btn, .bk-tile, .bk-more > *, .bk-foot2 > *', sc) };
  }

  function phoneMass(ctx, o = {}) {
    const { card, count } = ctx;
    const pv = q(card, '[data-pv]'); const page = L(pv, 'mass');
    const zone = q(pv, '[data-zone]'); const label = q(pv, '[data-label]'); const rip = q(pv, '[data-rip]'); const fing = q(pv, '[data-fing]');
    const call = q(pv, '[data-call]');
    gsap.set(page, { autoAlpha: 1 }); gsap.set([zone, label], { autoAlpha: 0 }); gsap.set(rip, { autoAlpha: 0 });
    const W = pv.clientWidth; const H = pv.clientHeight;
    gsap.set(fing, { x: W * 0.78, y: H * 0.5, autoAlpha: 1 });
    const p = at(call, pv, .74, .5);
    const blocks = $$('.ms-nav, .ms-kicker, .ms-title, .kt-mid, .ms-wait, .ms-prices, .ms-callwrap', page);
    gsap.set(blocks, { clearProps: 'opacity,visibility,transform' });
    const tl_ = gsap.timeline({ paused: true });
    const t0 = 0;
    tl_.to(zone, { autoAlpha: 1, duration: 0.3 }, t0 + (o.in ? 0.5 : 0.4));
    move(tl_, fing, p, t0 + (o.in ? 0.7 : 0.5), 0.45);
    click(tl_, rip, p, t0 + (o.in ? 1.3 : 1.1));
    tl_.to(label, { autoAlpha: 1, duration: 0.25 }, t0 + (o.in ? 1.45 : 1.25));
    say(tl_, 'Maßarbeit: Ein Tipp auf „Anrufen“ in der Daumenzone, der Anruf läuft.', t0 + (o.in ? 1.7 : 1.5));
    const f = timed(count, [[0, 'Taps 0 · Scrollen 0 ×'], [t0 + (o.in ? 1.3 : 1.1), 'Taps 1 · Scrollen 0 ×']]);
    return { tl: tl_, end: t0 + (o.in ? 1.9 : 1.7), update: f, blocks, card };
  }

  /* Übergang auf der einen Handykarte: die Baukasten-Seite zerfällt in Blöcke, die sich zur Maßarbeit neu ordnen (höchstens 600 ms) */
  function decay(baseRes, massRes) {
    const tl_ = gsap.timeline({ paused: true });
    const bb = baseRes.blocks();
    tl_.to(bb, { x: (i) => ((i % 3) - 1) * 26, y: (i) => -14 - (i % 4) * 8, rotation: (i) => ((i % 5) - 2) * 4, autoAlpha: 0, duration: 0.3, stagger: { amount: 0.18 }, ease: 'power2.in' }, 0);
    tl_.to(massRes.card, { autoAlpha: 1, duration: 0.2 }, 0.25);
    tl_.fromTo(massRes.blocks, { y: 26, scale: 0.94, autoAlpha: 0 }, { y: 0, scale: 1, autoAlpha: 1, duration: 0.3, stagger: { amount: 0.2 }, ease: 'power2.out' }, 0.3);
    return tl_;
  }

  /* ---------- Lauf aufbauen und spielen ---------- */
  function ctxs(v) {
    const win = (k) => { const w = $(`[data-win="${k}"]`, demo); return { win: w, count: $('[data-count]', w) }; };
    const card = (k) => { const c = $(`[data-phone="${k}"]`, demo); return { card: c, count: $('[data-count]', c) }; };
    return v === 'race' ? { b: win('b'), m: win('m') } : { b: card('b'), m: card('m') };
  }

  function resetAll() {
    // Endzustand der Handykarte „Maßarbeit“ ist für alle Karten die Ausgangslage der CSS (Wartemarke sichtbar)
    gsap.set($$('.kt-cur, .kt-rip, .kt-fing', demo), { autoAlpha: 0 });
    $$('.kt-phone-m .kt-t07, .kt-phone-m .kt-wa', demo).forEach((e) => gsap.set(e, { autoAlpha: 1 }));
    $$('.kt-phone-m .kt-tbook, .kt-phone-m .kt-wb, .kt-phone-m .kt-slots', demo).forEach((e) => gsap.set(e, { autoAlpha: 0 }));
  }

  function play(mode = 'both', hold = false) {
    if (tl) { tl.kill(); tl = null; }
    resetAll();
    live.textContent = '';
    const v = view(); sec.dataset.view = v;
    runBtns.forEach((b) => { if (b.dataset.run !== 'both') b.setAttribute('aria-pressed', b.dataset.run === mode ? 'true' : 'false'); });
    const C = ctxs(v);
    const master = gsap.timeline({ paused: true });
    const ups = [];
    let end = 0;
    const add = (r, at = 0) => { master.add(r.tl.paused(false), at); ups.push((t) => r.update(Math.max(0, t - at))); end = Math.max(end, at + r.end); };
    gsap.set(res, { autoAlpha: 0, y: 14 });
    if (v === 'race') {
      const rb = raceBase(C.b); const rm = raceMass(C.m);
      if (mode !== 'm') add(rb); else rb.tl.kill();
      if (mode !== 'b') add(rm); else rm.tl.kill();
    } else {
      const single = v === 'single';
      const b = phoneBase(C.b);
      gsap.set(C.b.card, { autoAlpha: single && mode === 'm' ? 0 : 1 });
      gsap.set(C.m.card, { autoAlpha: single && mode !== 'm' ? 0 : 1 });
      const m = phoneMass(C.m, { in: single && mode === 'both' });
      if (mode !== 'm') add(b); else b.tl.kill();
      if (mode === 'both' && single) {
        const gap = b.end + 0.1;
        master.add(decay(b, m).paused(false), gap);
        add(m, gap + 0.3);
      } else if (mode !== 'b') add(m); else m.tl.kill();
    }
    if (mode === 'both') master.to(res, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, end + 0.3);
    master.eventCallback('onUpdate', () => { const t = master.time(); ups.forEach((u) => u(t)); });
    master.eventCallback('onComplete', () => ups.forEach((u) => u(end + 10)));
    tl = master;
    pauseLabel.textContent = 'Pause';
    if (!hold) tl.play(0);
  }

  /* ---------- Steuerung ---------- */
  runBtns.forEach((b) => b.addEventListener('click', () => play(b.dataset.run)));
  devBtns.forEach((b) => b.addEventListener('click', () => {
    device = b.dataset.dev;
    devBtns.forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    play('both');
  }));
  pauseBtn.addEventListener('click', () => {
    if (!tl) return;
    const p = !tl.paused(); tl.paused(p);
    pauseLabel.textContent = p ? 'Weiter' : 'Pause';
  });
  WIDE.addEventListener('change', () => { if (started) play('both'); else play('both', true); });

  /* ---------- Bereitstellen (Anfangszustand steht, bevor der Abschnitt sichtbar wird), Start einmal bei 60 Prozent Sichtbarkeit ---------- */
  sec.dataset.run = '';
  sec.dataset.ready = '';
  play('both', true);
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (e.isIntersecting && !started) { started = true; io.disconnect(); if (tl) tl.play(0); }
    });
  }, { threshold: 0.6 });
  io.observe(demo);

  /* „Warum sich das lohnt“: die Linie zeichnet sich beim Erscheinen */
  sec.classList.add('kt-armed');
  const io2 = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io2.unobserve(e.target); } }), { threshold: 0.4 });
  warum.forEach((li) => io2.observe(li));
}
