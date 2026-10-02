/* NP Webdesign – Startseite
   Alles lokal (js/gsap.min.js, js/ScrollTrigger.min.js), keine Fremdanfragen, kein Speichern im Browser. */
(function () {
  'use strict';

  var root = document.documentElement;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ── Jahreszahl im Footer ─────────────────────────── */
  var year = $('#fyear');
  if (year) year.textContent = new Date().getFullYear();

  /* ── Mobiles Menü ─────────────────────────────────── */
  var menu = $('#mobileMenu');
  var burger = $('#hamburger');
  var main = $('#main');
  var footer = $('footer');

  function setMenu(open) {
    menu.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    document.body.style.overflow = open ? 'hidden' : '';
    /* Fokus bleibt im Menü: der Rest der Seite wird währenddessen inaktiv */
    if (main) main.inert = open;
    if (footer) footer.inert = open;
    if (open) { var first = $('a', menu); if (first) first.focus(); }
  }
  if (menu && burger) {
    burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); burger.focus(); }
    });
    window.matchMedia('(min-width:769px)').addEventListener('change', function (e) {
      if (e.matches && menu.classList.contains('open')) setMenu(false);
    });
  }

  /* ── FAQ ──────────────────────────────────────────── */
  $$('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var answer = document.getElementById(btn.getAttribute('aria-controls'));
      var open = !item.classList.contains('active');
      item.classList.toggle('active', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      answer.style.maxHeight = open ? answer.scrollHeight + 'px' : '0px';
    });
  });

  /* ── Animationen (GSAP) ───────────────────────────── */
  if (!window.gsap || !window.ScrollTrigger) {
    /* Skripte nicht verfügbar: alles bleibt sichtbar */
    root.classList.add('no-anim');
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  /* Kopfzeile bekommt nach 40 px einen Hintergrund; Fortschrittslinie oben */
  ScrollTrigger.create({ start: 40, end: 'max', toggleClass: { targets: '#navbar', className: 'scrolled' } });
  gsap.to('#sp', {
    width: '100%',
    ease: 'none',
    scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: true }
  });

  /* Einblendungen nur bei normaler Bewegung; bei „Bewegung reduzieren“ steht alles sofort */
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', function () {
    var at = function (trigger, start) { return { trigger: trigger, start: start }; };

    gsap.to('#lblUeber', { opacity: 1, x: 0, duration: .8, ease: 'power3.out', scrollTrigger: at('#design-strategie', 'top 80%') });
    gsap.to('#lblDash', { scaleX: 1, duration: 1, ease: 'power3.out', delay: .2, scrollTrigger: at('#design-strategie', 'top 80%') });
    gsap.from('#ueberTitle', { opacity: 0, y: 40, duration: 1, ease: 'power4.out', scrollTrigger: at('#ueberTitle', 'top 85%') });
    ['#hdiv1', '#hdiv2'].forEach(function (id, i) {
      gsap.to(id, { scaleX: 1, duration: 1, ease: 'power3.inOut', delay: i * .15, scrollTrigger: at(id, 'top 90%') });
    });
    ['#fn1', '#fn2'].forEach(function (id, i) {
      gsap.to(id, { opacity: 1, y: 0, duration: .7, delay: i * .12, ease: 'power3.out', scrollTrigger: at('#fn1', 'top 88%') });
    });
    gsap.to('#ueberCta a', { opacity: 1, y: 0, duration: .8, ease: 'power3.out', scrollTrigger: at('#ueberCta', 'top 90%') });

    $$('.reveal-text').forEach(function (el) {
      gsap.from(el, { opacity: 0, y: 28, duration: .9, ease: 'power3.out', scrollTrigger: at(el, 'top 88%') });
    });

    gsap.from('#lstTitle', { opacity: 0, y: 48, duration: 1.1, ease: 'power4.out', scrollTrigger: at('#lstTitle', 'top 82%') });
    $$('.pkg').forEach(function (el, i) {
      gsap.to(el, { opacity: 1, y: 0, duration: .8, delay: i * .12, ease: 'power3.out', scrollTrigger: at('#pkgs', 'top 80%') });
    });
    $$('.pstep').forEach(function (el, i) {
      gsap.to(el, { opacity: 1, y: 0, duration: .7, delay: i * .1, ease: 'power3.out', scrollTrigger: at('.proc-grid', 'top 82%') });
    });

    gsap.from('#kTitle', { opacity: 0, y: 60, duration: 1.2, ease: 'power4.out', scrollTrigger: at('#kTitle', 'top 80%') });
    $$('.krow').forEach(function (el, i) {
      gsap.to(el, { opacity: 1, x: 0, duration: .6, delay: i * .1, ease: 'power3.out', scrollTrigger: at('.krows', 'top 85%') });
    });
    gsap.to('#contactBox', { opacity: 1, y: 0, duration: .9, ease: 'power3.out', scrollTrigger: at('#contactBox', 'top 82%') });
  });
})();
