/**
 * Satz nach Maß (Blueprint H): Jede Display-Zeile läuft exakt von Rand zu Rand.
 * Erst wird die Breitenachse von Archivo angepasst (62–125); erst an der Grenze ändert sich die Schriftgröße.
 * Gemessen wird nach dem Laden der Schrift und bei Größenänderung (entprellt), nie beim Scrollen.
 */
const WDTH_MIN = 62;
const WDTH_MAX = 125;

function fitOne(el) {
  const box = el.parentElement.getBoundingClientRect().width;
  if (!box) return;
  el.classList.add('is-fit');
  const wrap = el.style;
  // Ausgangsgröße aus dem Stylesheet
  wrap.fontSize = '';
  wrap.fontStretch = '';
  const base = parseFloat(getComputedStyle(el).fontSize);

  const measure = () => {
    // Textbreite der Zeile (Block-Element: Range um den Inhalt)
    const r = document.createRange();
    r.selectNodeContents(el);
    return r.getBoundingClientRect().width;
  };

  let wdth = 100;
  wrap.fontStretch = wdth + '%';
  let w = measure();
  for (let i = 0; i < 4 && w; i++) {
    const next = Math.min(WDTH_MAX, Math.max(WDTH_MIN, wdth * (box / w)));
    if (Math.abs(next - wdth) < 0.2) break;
    wdth = next;
    wrap.fontStretch = wdth + '%';
    w = measure();
  }
  // Grenze erreicht und es passt noch nicht: Größe anpassen
  if (Math.abs(w - box) > 1) {
    wrap.fontSize = base * (box / w) + 'px';
  }
}

export function initFit() {
  const els = Array.from(document.querySelectorAll('[data-fit]'));
  if (!els.length) return;
  const run = () => els.forEach(fitOne);
  run();
  let t;
  const ro = new ResizeObserver(() => { clearTimeout(t); t = setTimeout(run, 150); });
  els.forEach((el) => ro.observe(el.parentElement));
}
