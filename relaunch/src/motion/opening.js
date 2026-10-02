/**
 * Opening, Phase 3 (Blueprint D): Expansion und Rückzoom auf den Werkplan.
 * Gepinnte Szene, folgt dem Scrollen 1:1 (Scrub). Nur in den Modi desktop und mobile.
 * Die Werkplan-Ebene steht in ihrer Endgröße und wird nur verkleinert (nie hochskaliert).
 */
import { gsap, ScrollTrigger, $, $$, mode } from './base.js';
import { setSection } from './rahmen.js';

export function initOpening() {
  const sec = $('#opening');
  const stage = $('[data-stage]');
  const wp = $('[data-werkplan]');
  if (!sec || !stage || !wp) return;

  const grid = $('.wp-grid', wp);
  const centre = $('[data-wp-center]', wp);
  const centreLogo = $('.wp-center-logo', wp);
  const statement = $('[data-wp-statement]', wp);
  const cells = $$('.wp-cell', wp);
  const heroLogo = $('[data-hero-logo]');
  const copy = [$('[data-hero-copy]'), $('[data-hero-actions]'), $('.hero-hint')].filter(Boolean);
  const deco = $('[data-hero-deco]');

  // Der Werkplan ist bis zum Ende der Expansion nicht bedienbar
  wp.inert = true;

  // Frühes Scrollen: Phase 2 läuft mit vierfachem Tempo zu Ende (Blueprint D, Sonderfälle)
  ScrollTrigger.create({
    trigger: sec, start: 'top -4px', end: 'top -5px',
    onEnter: () => { if (performance.now() < 1600) document.getAnimations().forEach((a) => { a.playbackRate = 4; }); },
  });

  const build = () => {
    // Zielgeometrie im Endzustand messen
    gsap.set(grid, { clearProps: 'transform' });
    if (centreLogo) centreLogo.style.removeProperty('--wp-logo');
    const sr = stage.getBoundingClientRect();
    const cr = centre.getBoundingClientRect();
    const gr = grid.getBoundingClientRect();
    const cx = cr.left - sr.left + cr.width / 2;
    const cy = cr.top - sr.top + cr.height / 2;
    const heroLogoH = heroLogo ? heroLogo.getBoundingClientRect().height : 96;
    const target = { x: sr.width / 2, y: sr.height * (mode === 'desktop' ? 0.42 : 0.30) };
    const s0 = Math.max(sr.width / cr.width, sr.height / cr.height) * 1.3;
    // Logo im Zentrum so groß, dass es zu Beginn genau wie das Logo im Hero erscheint
    if (centreLogo) centreLogo.style.setProperty('--wp-logo', heroLogoH / s0 + 'px');
    // Rahmen der Zelle 01 im Endzustand: Startform der Wachstums-Maske (t00)
    // Startform: die Fläche unter der Browserleiste; die Komposition schrumpft passend mit (Miniatur der Zelle)
    const frameEl = $('.wp-cell[data-world="01"] .wp-frame', wp);
    const fr = frameEl.getBoundingClientRect();
    const barH = $('.wp-bar', frameEl).getBoundingClientRect().height;
    const top = fr.top - sr.top + barH;
    const clip = `inset(${top}px ${sr.right - fr.right}px ${sr.bottom - fr.bottom}px ${fr.left - sr.left}px)`;
    const art = { x: fr.left - sr.left, y: top, s: fr.width / sr.width };
    return { s0, x0: target.x - cx, y0: target.y - cy, ox: cx - (gr.left - sr.left), oy: cy - (gr.top - sr.top), clip, art };
  };

  let g = build();
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: sec,
      start: 'top top',
      end: () => '+=' + (parseFloat(getComputedStyle(sec).getPropertyValue('--expansion')) / 100) * stage.offsetHeight,
      scrub: true,
      invalidateOnRefresh: true,
      onRefreshInit: () => { g = build(); },
      onUpdate: (self) => { wp.inert = self.progress < 0.9; },
    },
  });

  // 0–25 %: Hero-Text gleitet nach oben aus, Fragmente verblassen
  tl.fromTo(copy, { y: 0, autoAlpha: 1 }, { y: -40, autoAlpha: 0, duration: 0.25 }, 0);
  if (deco) tl.fromTo(deco, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.3 }, 0.1);
  if (heroLogo) tl.fromTo(heroLogo, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.15 }, 0.25);

  // 15–85 %: Rückzoom
  tl.fromTo(wp, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.12 }, 0.14);
  tl.fromTo(grid,
    { scale: () => g.s0, x: () => g.x0, y: () => g.y0, transformOrigin: () => `${g.ox}px ${g.oy}px` },
    { scale: 1, x: 0, y: 0, duration: 0.7, ease: 'power2.inOut', immediateRender: true }, 0.15);

  // Weltrahmen blenden ein, sobald sie ins Bild kommen
  cells.forEach((c, i) => tl.fromTo(c, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.14 }, 0.5 + i * 0.07));

  // 85–100 %: Statement
  if (statement) tl.fromTo(statement, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.15 }, 0.85);
  tl.set({}, {}, 1);

  // ---- t00 · Werkplan → Welt 01: Die Zelle wächst auf Viewport-Größe (Blueprint F, Übergang 1) ----
  const grow = $('[data-grow]', sec);
  const cell1 = $('.wp-cell[data-world="01"]', wp);
  const others = cells.filter((c) => c !== cell1);
  const rest = [centre, statement, ...others, $('.wp-caption', cell1)].filter(Boolean);
  const world1 = document.getElementById('baeckerei');
  const H = () => stage.offsetHeight;
  const css = (name) => parseFloat(getComputedStyle(sec).getPropertyValue(name));
  const art = $('.grow-art', grow);

  gsap.set(grow, { autoAlpha: 0 });
  let half = null;
  const tlB = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: sec,
      start: () => 'top+=' + ((css('--expansion') + css('--plan')) / 100) * H() + ' top',
      end: () => '+=' + (css('--grow') / 100) * H(),
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (self.progress > 0) wp.inert = true;
        if (!self.isActive) return;
        const second = self.progress > 0.5;
        if (second !== half) { half = second; if (second) setSection(world1); else setSection(document.getElementById('opening')); }
      },
      onLeaveBack: () => { half = null; wp.inert = false; },
    },
  });
  // Die Zelle wächst als Maske von ihrer Form auf den ganzen Viewport, die übrigen Rahmen treten zurück
  // Vor dem Start der Szene bleibt die Ebene unsichtbar (autoAlpha 0 bei Zeit 0), danach deckt sie die Zelle exakt
  tlB.fromTo(grow, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.001, immediateRender: true }, 0)
     .fromTo(grow, { clipPath: () => g.clip }, { clipPath: 'inset(0px 0px 0px 0px)', duration: 0.8, ease: 'power2.inOut', immediateRender: false }, 0)
     .fromTo(art, { x: () => g.art.x, y: () => g.art.y, scale: () => g.art.s, transformOrigin: '0 0' }, { x: 0, y: 0, scale: 1, duration: 0.8, ease: 'power2.inOut', immediateRender: true }, 0)
     .fromTo(rest, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.3 }, 0)
     .fromTo($('.wp-bar', cell1), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.25 }, 0)
     .fromTo(art, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.2 }, 0.8)
     .set({}, {}, 1);

  // Koordinate am Cursor (nur Desktop, Maus)
  const coord = $('[data-wp-coord]');
  if (coord && mode === 'desktop') {
    const pad = (n) => String(Math.max(0, Math.round(n))).padStart(4, '0');
    wp.addEventListener('pointermove', (e) => {
      coord.textContent = `x ${pad(e.clientX)} · y ${pad(e.clientY)}`;
      coord.style.transform = `translate(${e.clientX + 16}px, ${e.clientY + 16}px)`;
      coord.classList.add('is-on');
    });
    wp.addEventListener('pointerleave', () => coord.classList.remove('is-on'));
  }
}
