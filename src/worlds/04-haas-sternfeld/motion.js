/**
 * Welt 04 · Bewegung und Bedienung (Blueprint F, I).
 * Die Schlagzeile setzt sich Zeile für Zeile, die rote Linie zieht sich auf, die Spalten setzen sich wie Druckzeilen und die
 * Initiale wächst aus dem Statement heraus. Fußnoten öffnen als Marginalie, das Themenregister führt zu den Rubriken.
 * Ruhig und ohne JavaScript: alles steht fertig im Text. `init` liefert die Aufräum-Funktion.
 */
import { gsap, ScrollTrigger, $, $$, mode } from '../../motion/base.js';

export function init() {
  const root = $('.w04');
  if (!root) return () => {};
  const cleanups = [];
  const animated = mode === 'desktop' || mode === 'mobile';

  initMarginalien(root);
  initRegister(root);

  if (animated) {
    let ctx;
    // SplitText erst bei Bedarf laden (Modul der Welt, nicht im Kern)
    import('gsap/SplitText').then(({ SplitText }) => {
      gsap.registerPlugin(SplitText);
      const reduce = mode === 'mobile';
      const fire = (trigger, start = 'top 82%') => ({ trigger, start, once: true });
      ctx = gsap.context(() => {
        // Schlagzeile: zeilenweise aus einer Maske
        const headline = $('[data-headline]', root);
        SplitText.create(headline, {
          type: 'lines', mask: 'lines', autoSplit: true, aria: 'none',
          onSplit: (self) => gsap.from(self.lines, { yPercent: 108, duration: 0.9, stagger: 0.12, ease: 'power3.out', scrollTrigger: fire(headline, 'top 92%') }),
        });
        // Die rote Linie zieht sich unter der Schlagzeile auf
        gsap.from($('[data-line]', root), { scaleX: 0, duration: 1, delay: 0.35, ease: 'power2.inOut', scrollTrigger: fire($('[data-line]', root), 'top 95%') });

        // Spalten: Zeile für Zeile wie Druckzeilen
        const cols = $('[data-cols]', root);
        // Der erste Absatz trägt die Initiale (schwebendes Element): er blendet ein, statt in Zeilen zu zerfallen
        const first = $('.w04-p-first', cols);
        if (first) gsap.from(first, { autoAlpha: 0, y: 18, duration: 0.8, ease: 'power2.out', scrollTrigger: fire(cols, 'top 82%') });
        $$('.w04-p:not(.w04-p-first)', cols).forEach((p, i) => {
          SplitText.create(p, {
            type: 'lines', mask: 'lines', autoSplit: true, aria: 'none',
            onSplit: (self) => gsap.from(self.lines, {
              yPercent: 105, duration: 0.55, stagger: reduce ? 0.02 : 0.035, ease: 'power2.out', delay: i === 0 ? 0 : 0.1,
              scrollTrigger: fire(p, 'top 88%'),
            }),
          });
        });
        // Die Initiale wächst aus dem Statement heraus
        const initial = $('[data-initial]', root);
        if (initial) gsap.fromTo(initial, { scale: 0.3, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: fire(cols, 'top 82%') });

        // Register und Rubriken setzen sich als ruhige Einblendung
        gsap.from($$('.w04-register li', root), { autoAlpha: 0, y: 14, duration: 0.6, stagger: 0.1, ease: 'power2.out', scrollTrigger: fire($('.w04-register', root), 'top 85%') });
      }, root);
      ScrollTrigger.refresh();
    });
    cleanups.push(() => ctx && ctx.revert());
  }

  return () => cleanups.forEach((fn) => fn());
}

/* Fußnoten: die Zahl im Text öffnet die Anmerkung am Rand; eine zweite öffnet die nächste und schließt die erste */
function initMarginalien(root) {
  const buttons = $$('[data-fn]', root);
  const margins = $$('[data-margin]', root);
  const aside = $('[data-margins]', root);
  const status = $('[data-fn-status]', root);
  if (!buttons.length) return;
  const open = (id) => {
    margins.forEach((m) => m.classList.toggle('is-open', m.id === id));
    buttons.forEach((b) => b.setAttribute('aria-expanded', b.dataset.fn === id ? 'true' : 'false'));
    if (id) { aside.setAttribute('data-open', ''); const m = margins.find((x) => x.id === id); status.textContent = `Anmerkung ${m.querySelector('.w04-margin-nr').textContent} geöffnet: ${m.lastChild.textContent.trim()}`; }
    else { aside.removeAttribute('data-open'); status.textContent = ''; }
  };
  buttons.forEach((b) => b.addEventListener('click', () => open(b.getAttribute('aria-expanded') === 'true' ? null : b.dataset.fn)));
  root.addEventListener('keydown', (e) => { if (e.key === 'Escape' && aside.hasAttribute('data-open')) { const cur = buttons.find((b) => b.getAttribute('aria-expanded') === 'true'); open(null); if (cur) cur.focus(); } });
  open(null);
}

/* Themenregister: führt zur Rubrik und markiert sie in Rot, bis eine andere gewählt wird */
function initRegister(root) {
  const items = $$('[data-thema]', root);
  const articles = $$('.w04-thema', root);
  items.forEach((a) => a.addEventListener('click', () => {
    articles.forEach((x) => x.classList.toggle('is-picked', x.id === `w04-${a.dataset.thema}`));
    const target = document.getElementById(`w04-${a.dataset.thema}`);
    if (target) setTimeout(() => target.focus({ preventScroll: true }), 50);
  }));
}
