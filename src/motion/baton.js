/**
 * Staffelstab-Technik der Übergänge (Auftrag 11. Oktober 2026, A4.2/A4.3):
 * Das Objekt der Übergabe ist ein echtes Element der alten Welt. Es wird dort abgeholt (Position und Größe gemessen), als Abbild in eine
 * feste Ebene über den Welten gehoben und am Ende genau auf das Gegenstück in der neuen Welt gelegt (Position und Größe gemessen).
 * Das echte Gegenstück bleibt bis zur Landung unsichtbar (`data-lent`), danach ist es da: gleiche Stelle, gleiche Farbe, kein Sprung.
 */

/** Lage eines Elements im Dokument, ohne Transformationen (Offset-Kette); SVG-Elemente über getBoundingClientRect */
export function docRect(el) {
  if (el instanceof HTMLElement) {
    let x = 0; let y = 0;
    for (let e = el; e; e = e.offsetParent) { x += e.offsetLeft; y += e.offsetTop; }
    return { x, y, w: el.offsetWidth, h: el.offsetHeight };
  }
  const r = el.getBoundingClientRect();
  return { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height };
}

/** Rechteck im Fenster, wenn die Seite bei `scroll` steht (ohne Transformationen des Elements selbst) */
export function viewRect(el, scroll) {
  const r = docRect(el);
  return { x: r.x, y: r.y - scroll, w: r.w, h: r.h, cx: r.x + r.w / 2, cy: r.y - scroll + r.h / 2 };
}

const KEEP_STYLE = /^--/;

/** Abbild eines Elements: ohne Kennungen, Bedienung und Animationszustände, in einer Hülle mit den Klassen der Welt */
export function cloneOf(el, world, rect, source = el) {
  const c = source.cloneNode(true);
  [c, ...c.querySelectorAll('*')].forEach((n) => {
    ['id', 'for', 'name', 'href', 'tabindex', 'role', 'value', 'checked', 'disabled'].forEach((a) => n.removeAttribute(a));
    Array.from(n.attributes).forEach((a) => { if (a.name.startsWith('data-') || a.name.startsWith('aria-')) n.removeAttribute(a.name); });
    if (n.style && n.getAttribute('style')) {
      const keep = [];
      for (let i = 0; i < n.style.length; i += 1) { const p = n.style[i]; if (KEEP_STYLE.test(p)) keep.push([p, n.style.getPropertyValue(p)]); }
      n.removeAttribute('style');
      keep.forEach(([p, v]) => n.style.setProperty(p, v));
    }
  });
  // Die Vorfahren innerhalb der Welt bleiben als Hüllen ohne eigene Box erhalten, damit Regeln wie `.w07-raster i` weiter greifen
  let inner = c;
  for (let p = el.parentElement; p && !p.hasAttribute('data-world'); p = p.parentElement) {
    const w = document.createElement('div');
    w.className = p.className;
    w.style.display = 'contents';
    w.append(inner);
    inner = w;
  }
  const section = el.closest('[data-world]');
  const shell = document.createElement('div');
  shell.className = `t-clone world w${world}`; // Klassen der Welt für Schrift und Farben; Maße der Welt unten ausdrücklich zurückgesetzt
  shell.setAttribute('data-world', world);
  if (section?.dataset.tone) shell.setAttribute('data-tone', section.dataset.tone);
  shell.setAttribute('aria-hidden', 'true');
  shell.inert = true;
  Object.assign(shell.style, { position: 'absolute', left: '0', top: '0', width: rect.w + 'px', height: rect.h + 'px', margin: '0', padding: '0', minHeight: '0', background: 'none', color: 'var(--text)', transformOrigin: '50% 50%', willChange: 'transform' });
  // Das Abbild füllt seine Hülle genau so, wie das Original in seinem Raster oder Fluss stand (Rasterzellen sind block, auch wenn sie `i` oder `b` heißen)
  if (c instanceof HTMLElement) {
    const cs = getComputedStyle(el);
    c.style.setProperty('display', cs.display === 'inline' || cs.display === 'contents' ? 'block' : cs.display);
    c.style.setProperty('width', '100%'); c.style.setProperty('height', '100%'); c.style.setProperty('box-sizing', cs.boxSizing);
  }
  c.style.setProperty('margin', '0');
  shell.append(inner);
  shell._el = c; // das eigentliche Abbild, zum Beispiel für Farbwechsel
  return shell;
}

/**
 * Abbild in bestehender Hülle neu aufbauen (Größe und Inhalt aus dem Stand jetzt). `pristine`: Inhalt aus dem Zustand beim Laden der Seite
 * (`el.__pristine`, siehe snapshot), damit das Abbild des Ziels dessen Endzustand zeigt und nicht eine laufende Einblendung.
 */
export function refreshClone(shell, el, world, pristine = false) {
  const rect = docRect(el);
  const fresh = cloneOf(el, world, rect, pristine && el.__pristine ? el.__pristine : el);
  shell.replaceChildren(...fresh.childNodes);
  shell.style.width = rect.w + 'px'; shell.style.height = rect.h + 'px';
  shell._el = fresh._el;
}

/** Zustand beim Laden festhalten (vor den Weltmodulen) */
export function snapshot(el) { if (el && !el.__pristine) el.__pristine = el.cloneNode(true); }

/** Zeichnet das echte Element unsichtbar (oder wieder sichtbar), solange das Abbild seine Stelle einnimmt */
export function lend(el, on) {
  if (!el) return;
  if (on) el.setAttribute('data-lent', ''); else el.removeAttribute('data-lent');
}
