/* Wird vor dem ersten Paint geladen (Blueprint N, drei Modi). Liest nur Medienabfragen
   und – falls Sie ihn zuvor selbst eingeschaltet haben – den Schalter „Ruhige Ansicht“.
   Es wird nichts gespeichert oder gesendet. Ohne JavaScript bleibt die ruhige, statische Seite. */
(function () {
  var d = document.documentElement;
  d.setAttribute('data-js', '');
  var calm = false;
  try { calm = localStorage.getItem('np-calm') === '1'; } catch (e) { /* Speicher gesperrt: egal */ }
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mode = 'mobile';
  if (calm || reduce) mode = 'calm';
  else if (window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches) mode = 'desktop';
  d.setAttribute('data-mode', mode);
  if (calm) d.setAttribute('data-calm', '');
})();
