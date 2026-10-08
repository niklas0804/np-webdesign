/** Menü-Overlay, Schalter „Ruhige Ansicht“, Lebenszeichen (Blueprint J). */
import { $, $$, root } from './base.js';

export function initClock() {
  const els = $$('[data-clock]');
  if (!els.length) return;
  const fmt = new Intl.DateTimeFormat('de-DE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' });
  const tick = () => { const t = fmt.format(new Date()); els.forEach((e) => { e.textContent = t; }); };
  tick();
  // einmal pro Minute – die einzige Daueranimation der Seite (Blueprint I.3)
  setTimeout(() => { tick(); setInterval(tick, 60000); }, 60000 - (Date.now() % 60000));
}

export function initMenu(lenis) {
  const menu = $('[data-menu]');
  const openBtn = $('[data-menu-open]');
  if (!menu || !openBtn) return;
  const inertTargets = () => [$('#main'), $('footer'), $('.frame'), $('[data-frame-bar]'), $('.skiplinks')].filter(Boolean);

  const open = () => {
    menu.hidden = false;
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.setAttribute('data-menu-open', '');
    inertTargets().forEach((n) => { n.inert = true; });
    if (lenis) lenis.stop();
    const first = $('[data-menu-close]', menu);
    if (first) first.focus();
  };
  const close = (restoreFocus = true) => {
    menu.hidden = true;
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.removeAttribute('data-menu-open');
    inertTargets().forEach((n) => { n.inert = false; });
    if (lenis) lenis.start();
    if (restoreFocus) openBtn.focus();
  };

  openBtn.addEventListener('click', open);
  $('[data-menu-close]', menu).addEventListener('click', () => close());
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) close(); });
  $$('[data-menu-link]', menu).forEach((a) => a.addEventListener('click', () => close(false)));

  // Schalter „Ruhige Ansicht“: erst nach Klick wird etwas im Browser gespeichert (§ 25 Abs. 2 Nr. 2 TDDDG)
  const sw = $('[data-calm-switch]', menu);
  if (sw) {
    sw.setAttribute('aria-pressed', root.hasAttribute('data-calm') ? 'true' : 'false');
    sw.addEventListener('click', () => {
      const on = !root.hasAttribute('data-calm');
      try { if (on) localStorage.setItem('np-calm', '1'); else localStorage.removeItem('np-calm'); } catch (e) { /* ohne Speicher gilt die Wahl nur bis zum Neuladen nicht */ }
      location.reload();
    });
  }

  // Aktuelle Welt im Menü markieren
  window.addEventListener('np:section', (e) => {
    $$('[data-menu-world]', menu).forEach((a) => {
      if (a.getAttribute('data-menu-world') === e.detail.world) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  });
}
