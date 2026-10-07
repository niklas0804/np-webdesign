/**
 * Welt 03 · Wittgenfeld Bau – Linienzeichnungen (Schnitt, Grundriss, Ansicht) als Pfaddaten.
 * Alle Maße sind frei erfunden (Demo-Zeichnung einer fiktiven Firma, im Schriftfeld so gekennzeichnet).
 * Maßeinheit der Zeichnung: 1 m = 40 Einheiten (viewBox 600 × 520). Alle Maßzahlen werden aus der Geometrie gerechnet,
 * damit Zeichnung und Beschriftung nicht auseinanderlaufen (Hausgrundfläche 10,00 × 7,00 m, Wandstärke 0,40 m).
 */

/** Diagonale Schraffur (45°) exakt in einem Rechteck, an den Rändern abgeschnitten */
export function hatch(x1, y1, x2, y2, step = 9) {
  const w = x2 - x1, h = y2 - y1, out = [];
  for (let k = -h; k < w; k += step) {
    let ax = x1 + k, ay = y2, bx = x1 + k + h, by = y1;
    if (ax < x1) { ay -= x1 - ax; ax = x1; }
    if (bx > x2) { by += bx - x2; bx = x2; }
    if (ay > y1 && by < y2 && ax < bx + 0.01) out.push(`M${ax.toFixed(1)} ${ay.toFixed(1)} L${bx.toFixed(1)} ${by.toFixed(1)}`);
  }
  return out;
}

/** Länge in Metern aus Zeicheneinheiten (1 m = 40 Einheiten), deutsches Zahlenformat */
const m = (u) => (Math.abs(u) / 40).toFixed(2).replace('.', ',');

/** Maßkette: Linie, Maßstriche und Beschriftung; ohne Beschriftungen werden die Maße aus der Geometrie gerechnet */
export function dimV(x, ys, labels = ys.slice(1).map((y, i) => m(ys[i] - y))) {
  const lines = [`M${x} ${ys[0]} V${ys[ys.length - 1]}`, ...ys.map((y) => `M${x - 8} ${y} H${x + 8}`)];
  const texts = labels.map((t, i) => ({ t, x: x + 14, y: (ys[i] + ys[i + 1]) / 2 + 5 }));
  return { lines, texts };
}
export function dimH(y, xs, labels = xs.slice(1).map((x, i) => m(x - xs[i])), dir = 'above') {
  const lines = [`M${xs[0]} ${y} H${xs[xs.length - 1]}`, ...xs.map((x) => `M${x} ${y - 8} V${y + 8}`)];
  const texts = labels.map((t, i) => ({ t, x: (xs[i] + xs[i + 1]) / 2, y: y + (dir === 'below' ? 22 : -12), anchor: 'middle' }));
  return { lines, texts };
}

/* ---------- Schnitt: sechs Schichten, vom Fundament bis zum Dach ---------- */
const GY = 440; // Geländekante
export const SCHNITT = {
  gelaende: { lines: ['M30 440 H570', ...hatch(30, 448, 88, 500, 12), ...hatch(512, 448, 570, 500, 12)] },
  layers: [
    { id: 'fundament', name: 'Fundament', lines: [
      'M88 440 V486 H512 V440', 'M138 440 V462 H462 V440', ...hatch(88, 462, 138, 486, 8), ...hatch(462, 462, 512, 486, 8) ] },
    { id: 'erdgeschoss', name: 'Erdgeschoss', lines: [
      'M100 440 V304 H116 V440', 'M484 440 V304 H500 V440', ...hatch(100, 304, 116, 440, 9), ...hatch(484, 304, 500, 440, 9),
      'M116 440 H484', 'M484 372 H500 M484 336 H500' ] },
    { id: 'decke', name: 'Geschossdecke', lines: [
      'M100 304 V296 H500 V304', 'M116 304 H484', ...hatch(100, 296, 500, 304, 8) ] },
    { id: 'obergeschoss', name: 'Obergeschoss', lines: [
      'M100 296 V172 H116 V296', 'M484 296 V172 H500 V296', ...hatch(100, 172, 116, 296, 9), ...hatch(484, 172, 500, 296, 9),
      'M484 252 H500 M484 214 H500', 'M100 252 H116 M100 214 H116' ] },
    { id: 'dachstuhl', name: 'Dachstuhl', lines: [
      'M100 172 H500', 'M92 178 L300 46 L508 178', 'M116 172 L300 64 L484 172', 'M300 64 V172', 'M200 172 L300 112 L400 172', 'M236 172 L236 148 M364 172 L364 148' ] },
    { id: 'dach', name: 'Dach', lines: (() => {
      const l = ['M84 184 L300 36 L516 184'];
      for (let t = 0.1; t < 1; t += 0.1) { // Ziegelstriche entlang der Dachflächen
        const lx = 84 + 216 * t, ly = 184 - 148 * t, rx = 516 - 216 * t;
        l.push(`M${lx.toFixed(1)} ${ly.toFixed(1)} l6 8`, `M${rx.toFixed(1)} ${ly.toFixed(1)} l-6 8`);
      }
      l.push('M392 78 V22 H432 V102', 'M386 22 H438');
      return l; })() },
  ],
  dims: [dimV(548, [440, 304, 172, 36]), dimH(496, [100, 500], undefined, 'below')],
};

/* ---------- Grundriss ---------- */
export const GRUNDRISS = {
  lines: [
    'M100 120 H500 V400 H100 Z', 'M116 136 H484 V384 H116 Z',
    'M300 136 V252 M300 292 V384', 'M300 292 H340 M340 292 A40 40 0 0 0 300 252',
    'M300 272 H400 M440 272 H484', 'M400 272 V312 M440 272 V312', 'M400 312 A40 40 0 0 1 440 312',
    'M160 120 V136 M240 120 V136 M160 128 H240', 'M484 180 H500 M484 240 H500 M492 180 V240',
    'M190 384 V400 M262 384 V400', 'M190 384 A72 72 0 0 1 262 312', 'M190 384 H262',
    'M100 456 H500 M100 448 V464 M500 448 V464', 'M544 120 V400 M536 120 H552 M536 400 H552',
  ],
  texts: [
    { t: 'Wohnen', x: 200, y: 214 }, { t: 'Küche', x: 372, y: 206 }, { t: 'Bad', x: 372, y: 346 }, { t: 'Flur', x: 200, y: 352 },
    { t: m(400), x: 300, y: 446, anchor: 'middle' }, { t: m(280), x: 560, y: 266 },
  ],
};

/* ---------- Ansicht (Vorderseite) ---------- */
export const ANSICHT = {
  lines: [
    'M30 440 H570', 'M100 440 V172 H500 V440', 'M84 178 L300 36 L516 178', 'M100 172 H500', 'M392 78 V22 H432 V102',
    'M276 440 V350 H324 V440', 'M276 395 H324', 'M314 398 V404',
    'M140 220 h76 v70 h-76 z M178 220 v70 M140 255 h76', 'M384 220 h76 v70 h-76 z M422 220 v70 M384 255 h76',
    'M140 340 h76 v70 h-76 z M178 340 v70 M140 375 h76', 'M384 340 h76 v70 h-76 z M422 340 v70 M384 375 h76',
    'M548 440 V36 M540 440 H556 M540 172 H556 M540 36 H556', 'M100 504 H500 M100 496 V512 M500 496 V512',
  ],
  texts: [{ t: m(268), x: 562, y: 312 }, { t: m(400), x: 300, y: 492, anchor: 'middle' }],
};

export const BLAETTER = [
  { id: 'grundriss', name: 'Grundriss', blatt: 'Blatt 1', alt: 'Zeichnung: Grundriss eines Wohnhauses mit Wohnen, Küche, Bad und Flur (Demo)' },
  { id: 'schnitt', name: 'Schnitt', blatt: 'Blatt 2', alt: 'Zeichnung: Querschnitt eines Wohnhauses vom Fundament bis zum Dach (Demo)' },
  { id: 'ansicht', name: 'Ansicht', blatt: 'Blatt 3', alt: 'Zeichnung: Vorderansicht eines Wohnhauses mit Dach, Tür und Fenstern (Demo)' },
];
