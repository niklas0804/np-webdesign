/**
 * Welt 01 · Bewegung und Bedienung (Blueprint F, I).
 * Aufgehen: Bilder wachsen von 0,96 auf 1 und runden sich wie Teig. Die Headline wird über die SOFT-Achse weich.
 * Backplan-Reiter, Teigführung und Demo-Bon arbeiten lokal und senden nichts.
 * `init` liefert eine Aufräum-Funktion (Weltmodul-Vertrag: „Aufräumen“).
 */
import { gsap, ScrollTrigger, $, $$, mode } from '../../motion/base.js';

export function init() {
  const root = $('.w01');
  if (!root) return () => {};
  const cleanups = [];

  /* ---- Bedienung: in jedem Modus ---- */
  initBackplan(root, cleanups);
  initBon(root, cleanups);

  /* ---- Bewegung: nur Desktop und Mobile ---- */
  if (mode === 'desktop' || mode === 'mobile') {
    const ctx = gsap.context(() => {
      // Aufgehen: Skalierung 0,96 auf 1, Ecken runden wie Teig (Maske, keine Layout-Animation)
      $$('[data-aufgehen]', root).forEach((el, i) => {
        const platzhalter = !!$('.foto-platzhalter', el);
        // Aufgehen mit Foto: Ecken runden wie Teig; solange es nur einen Platzhalter gibt, wächst er nur (die Maske würde den Text anschneiden)
        gsap.fromTo(el,
          platzhalter ? { scale: 0.96 } : { scale: 0.96, clipPath: 'inset(0% round 6%)' },
          { scale: 1, ...(platzhalter ? {} : { clipPath: 'inset(0% round 46%)' }), ease: 'power2.out', immediateRender: true,
            scrollTrigger: { trigger: el, start: 'top 92%', end: 'top 38%', scrub: true } });
        if (platzhalter) return;
        // Parallax: höchstens 15 % der Bildhöhe (Mobile 8 %), nie Text
        const max = mode === 'desktop' ? 15 : 8;
        gsap.fromTo($('svg', el), { yPercent: max * (i ? 0.6 : -0.6) }, { yPercent: max * (i ? -0.6 : 0.6), ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
      });

      // Die Schrift geht auf: SOFT-Achse 0 → 100
      const title = $('[data-soft]', root);
      if (title) {
        const state = { soft: 0 };
        const apply = () => { title.style.fontVariationSettings = `'SOFT' ${state.soft.toFixed(1)}`; };
        apply();
        gsap.to(state, { soft: 100, ease: 'none', onUpdate: apply,
          scrollTrigger: { trigger: title, start: 'top 85%', end: 'top 30%', scrub: true } });
      }
    }, root);
    cleanups.push(() => ctx.revert());
  }

  return () => cleanups.forEach((fn) => fn());
}

/* Backplan Montag bis Samstag als Reiter (Pfeiltasten, Pos1, Ende) und Teigführung je Brot */
function initBackplan(root, cleanups) {
  const tabs = $$('[data-tab]', root);
  const panels = $$('[data-panel]', root);
  if (!tabs.length) return;
  const show = (i, focus) => {
    tabs.forEach((t, j) => { t.setAttribute('aria-selected', j === i ? 'true' : 'false'); t.tabIndex = j === i ? 0 : -1; });
    panels.forEach((p, j) => p.classList.toggle('is-active', j === i));
    if (focus) tabs[i].focus();
  };
  show(0);
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => show(i));
    t.addEventListener('keydown', (e) => {
      const last = tabs.length - 1;
      const key = { ArrowRight: (i + 1) % tabs.length, ArrowLeft: (i - 1 + tabs.length) % tabs.length, Home: 0, End: last }[e.key];
      if (key !== undefined) { e.preventDefault(); show(key, true); }
    });
  });

  $$('[data-bread-btn]', root).forEach((btn) => {
    const detail = document.getElementById(btn.getAttribute('aria-controls'));
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      detail.classList.toggle('is-open', open);
      ScrollTrigger.refresh();
    });
  });
}

/* Demo-Bon: lokal, ohne Speichern (Blueprint Q2: keine Zwischenspeicherung) */
function initBon(root, cleanups) {
  const list = $('[data-bon-list]', root);
  const empty = $('[data-bon-empty]', root);
  const status = $('[data-bon-status]', root);
  if (!list) return;
  const items = new Set();
  const render = () => {
    list.replaceChildren(...[...items].map((name) => { const li = document.createElement('li'); li.textContent = name; return li; }));
    empty.hidden = items.size > 0;
  };
  $$('[data-bon-add]', root).forEach((btn) => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      const on = !items.has(name);
      if (on) items.add(name); else items.delete(name);
      // gleiches Brot in anderen Tagen mitschalten
      $$(`[data-bon-add][data-name="${name}"]`, root).forEach((b) => b.setAttribute('aria-pressed', on ? 'true' : 'false'));
      render();
      status.textContent = on ? `${name} auf den Bon gelegt.` : `${name} vom Bon genommen.`;
    });
  });
}
