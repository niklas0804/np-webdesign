/**
 * Einstieg von /welten (Blueprint D, Kurskorrektur 11. Oktober 2026): Der Werkplan steht von Anfang an. Er ruht kurz, dann wächst die Zelle
 * von Welt 01 auf Viewport-Größe (t00). Den Hero und die Expansion gibt es hier nicht mehr, sie gehören der Startseite.
 * Gepinnte Szene, folgt dem Scrollen 1:1 (Scrub). Nur in den Modi desktop und mobile.
 */
import { gsap, ScrollTrigger, $, $$, mode } from './base.js';
import { setSection } from './rahmen.js';

/** Mobil: oberer Versatz des Zellenausschnitts in Viewport-px, gleicher Wert wie in scripts/render-previews.cjs */
const FOCUS_M = 120;

export function initOpening() {
  const sec = $('#opening');
  const stage = $('[data-stage]');
  const wp = $('[data-werkplan]');
  /** Der Werkplan ist nach dem Wegscrollen nicht mehr bedienbar; die Hauptüberschrift (H1) bleibt für Hilfstechnik erhalten */
  const setInert = (on) => wp.querySelectorAll('.wp-cells, .wp-statement').forEach((e) => { e.inert = on; });
  if (!sec || !stage || !wp) return;

  const grid = $('.wp-grid', wp);
  const centre = $('[data-wp-center]', wp);
  const statement = $('[data-wp-statement]', wp);
  const cells = $$('.wp-cell', wp);
  const cursor = $('[data-wp-cursor]', wp);

  // Der Werkplan steht sofort und ist bedienbar, bis die Zelle zu wachsen beginnt
  gsap.set(wp, { autoAlpha: 1 });

  // Der Cursor im zehnten Platz blinkt sechsmal, sobald die Szene im Bild ist (und noch einmal bei jedem Wiedereintritt)
  if (cursor) {
    ScrollTrigger.create({
      trigger: sec, start: 'top bottom', end: 'bottom top',
      onToggle: (self) => { cursor.classList.remove('is-blink'); if (self.isActive) { void cursor.offsetWidth; cursor.classList.add('is-blink'); } },
    });
  }

  const build = () => {
    // Zielgeometrie im Endzustand messen: Rahmen der Zelle 01, Startform der Wachstums-Maske (t00)
    gsap.set(grid, { clearProps: 'transform' });
    const sr = stage.getBoundingClientRect();
    const frameEl = $('.wp-cell[data-world="01"] .wp-frame', wp);
    const fr = frameEl.getBoundingClientRect();
    const barH = $('.wp-bar', frameEl).getBoundingClientRect().height;
    const top = fr.top - sr.top + barH;
    const clip = `inset(${top}px ${sr.right - fr.right}px ${sr.bottom - fr.bottom}px ${fr.left - sr.left}px)`;
    // Mobil zeigt die Zelle den Streifen ab FOCUS_M (scripts/render-previews.cjs): die Ebene startet entsprechend nach oben versetzt
    const focus = mode === 'mobile' ? FOCUS_M : 0;
    const s = fr.width / sr.width;
    const art = { x: fr.left - sr.left, y: top - focus * s, s };
    return { clip, art };
  };
  let g = build();

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
      onRefreshInit: () => { g = build(); },
      onRefresh: () => { const p = tlB.progress(); tlB.progress(1, true).progress(p, true); },
      onUpdate: (self) => {
        if (self.progress > 0) setInert(true);
        if (!self.isActive) return;
        const second = self.progress > 0.5;
        if (second !== half) { half = second; if (second) setSection(world1); else setSection(document.getElementById('opening')); }
      },
      onLeaveBack: () => { half = null; setInert(false); },
    },
  });
  // Die Zelle wächst als Maske von ihrer Form auf den ganzen Viewport, die übrigen Rahmen treten zurück
  // Vor dem Start der Szene bleibt die Ebene unsichtbar (autoAlpha 0 bei Zeit 0), danach deckt sie die Zelle exakt
  tlB.fromTo(grow, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.001, immediateRender: true }, 0)
     .fromTo(grow, { clipPath: () => g.clip }, { clipPath: 'inset(0px 0px 0px 0px)', duration: 0.8, ease: 'power2.inOut', immediateRender: false }, 0)
     .fromTo(art, { x: () => g.art.x, y: () => g.art.y, scale: () => g.art.s, transformOrigin: '0 0' }, { x: 0, y: 0, scale: 1, duration: 0.8, ease: 'power2.inOut', immediateRender: true }, 0)
     .fromTo(rest, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.3 }, 0)
     .fromTo($('.wp-bar', cell1), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.25 }, 0)
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
