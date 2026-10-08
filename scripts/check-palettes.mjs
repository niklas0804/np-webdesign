#!/usr/bin/env node
/*
 * Unterscheidbarkeits-Prüfung der Weltpaletten (Blueprint R und T.1). Liest nur src/config/journey.js.
 * Der Build bricht ab, wenn eine Regel verletzt ist (npm run build ruft das Skript vorher auf).
 *
 *  1. Grund: ΔE (CIE76) paarweise und zu Leinen mindestens 10 (Ausnahmen stehen in DISTINCT, journey.js)
 *  2. Text auf Grund mindestens 4,5:1; Akzent als Text mindestens 4,5:1, sonst nur große Schrift/Grafik (mindestens 3:1);
 *     eingeschränkte Zweitfarbe nur als Text, wenn sie 4,5:1 erreicht
 *  3. Kein Grund und kein Akzent im geschützten Orange-Bereich (Farbton 10–35°, Sättigung über 55 %)
 *  4. Keine zwei Welten teilen Akzentfarbe
 * Hinweise (kein Abbruch): Zweitfarben/Dritt­farben im Orange-Bereich, Grafik- und Linienfarben unter 3:1
 */
import { WORLDS, DISTINCT, MASTER, npMode } from '../src/config/journey.js';
import { contrast, deltaE, isProtectedOrange, hsl } from '../src/config/color.js';

const fails = [];
const hints = [];
const fail = (m) => fails.push(m);
const hint = (m) => hints.push(m);
const f1 = (n) => n.toFixed(1).replace('.', ',');
const label = (w) => `Welt ${w.nr} ${w.name}`;
const isPair = (list, a, b) => list.some(([x, y]) => (x === a && y === b) || (x === b && y === a));

// 1 · Grundfarben unterscheidbar
for (let i = 0; i < WORLDS.length; i++) {
  for (let j = i + 1; j < WORLDS.length; j++) {
    const a = WORLDS[i], b = WORLDS[j];
    if (isPair(DISTINCT.samePairs, a.nr, b.nr)) continue;
    const d = deltaE(a.palette.ground, b.palette.ground);
    if (d < DISTINCT.minDeltaE) fail(`Grund: ${label(a)} (${a.palette.ground}) und ${label(b)} (${b.palette.ground}) liegen bei ΔE ${f1(d)}, verlangt sind ${DISTINCT.minDeltaE}`);
  }
  const w = WORLDS[i];
  const d = deltaE(w.palette.ground, MASTER.leinen);
  if (d < DISTINCT.minDeltaE) {
    if (DISTINCT.leinenExempt.includes(w.nr)) hint(`Grund ${label(w)} liegt bei ΔE ${f1(d)} zu Leinen (Ausnahme in journey.js eingetragen)`);
    else fail(`Grund: ${label(w)} (${w.palette.ground}) liegt bei ΔE ${f1(d)} zu Leinen ${MASTER.leinen}, verlangt sind ${DISTINCT.minDeltaE}`);
  }
}

// 2 · Kontraste und 3 · geschütztes Orange
for (const w of WORLDS) {
  const p = w.palette;
  const text = contrast(p.text, p.ground);
  if (text < 4.5) fail(`Text: ${label(w)} ${p.text} auf ${p.ground} hat ${f1(text)}:1, verlangt sind 4,5:1`);
  const acc = contrast(p.accent, p.ground);
  if (p.accentUse === 'text' && acc < 4.5) fail(`Akzent: ${label(w)} ${p.accent} auf ${p.ground} hat ${f1(acc)}:1 als Text, verlangt sind 4,5:1 (sonst accentUse 'large')`);
  if (p.accentUse === 'large' && acc < 3) fail(`Akzent: ${label(w)} ${p.accent} auf ${p.ground} hat ${f1(acc)}:1, selbst für große Schrift sind 3:1 nötig`);
  if (p.accentUse === 'large' && acc >= 4.5) hint(`Akzent ${label(w)} erreicht ${f1(acc)}:1 und könnte als Text freigegeben werden`);
  const acc2 = contrast(p.accent2, p.ground);
  if (p.accent2Use === 'text' && acc2 < 4.5) fail(`Zweitfarbe: ${label(w)} ${p.accent2} ist als Text vorgesehen, hat aber ${f1(acc2)}:1`);
  if ((p.accent2Use === 'graphic' || p.accent2Use === 'lines') && acc2 < 3) hint(`Zweitfarbe ${label(w)} ${p.accent2} (${p.accent2Use}) hat nur ${f1(acc2)}:1 zum Grund (Grafik/Linien brauchen 3:1)`);
  if (isProtectedOrange(p.ground)) fail(`Orange-Schutz: Grund ${label(w)} ${p.ground} liegt im geschützten Orange-Bereich`);
  if (isProtectedOrange(p.accent)) fail(`Orange-Schutz: Akzent ${label(w)} ${p.accent} liegt im geschützten Orange-Bereich`);
  for (const [k, v] of [['Zweitfarbe', p.accent2], ['Drittfarbe', p.accent3]]) {
    if (v && isProtectedOrange(v)) { const { h, s } = hsl(v); hint(`Orange-Schutz: ${k} ${label(w)} ${v} liegt mit Farbton ${Math.round(h)}° und Sättigung ${Math.round(s)} % im geschützten Bereich (nur Fläche erlaubt)`); }
  }
  // Modus muss berechnet sein
  if (p.tone !== npMode(p.ground)) fail(`NP-Modus: ${label(w)} steht auf ${p.tone}, die Rechnung ergibt ${npMode(p.ground)}`);
}

// 4 · keine gleiche Akzentfarbe
for (let i = 0; i < WORLDS.length; i++) for (let j = i + 1; j < WORLDS.length; j++) {
  const a = WORLDS[i], b = WORLDS[j];
  if (a.palette.accent.toLowerCase() === b.palette.accent.toLowerCase()) fail(`Akzent: ${label(a)} und ${label(b)} teilen ${a.palette.accent}`);
  else if (deltaE(a.palette.accent, b.palette.accent) < 10) hint(`Akzente ${label(a)} ${a.palette.accent} und ${label(b)} ${b.palette.accent} liegen nahe beieinander (ΔE ${f1(deltaE(a.palette.accent, b.palette.accent))})`);
}

// Ausgabe
const pad = (s, n) => String(s).padEnd(n);
console.log('Weltpaletten (aus src/config/journey.js)\n');
console.log(pad('Welt', 22) + pad('Grund', 9) + pad('Text', 8) + pad('Akzent', 8) + pad('NP-Modus', 10) + pad('Orange/Grund', 13) + 'ΔE Leinen');
for (const w of WORLDS) {
  const p = w.palette;
  console.log(pad(`${w.nr} ${w.name}`, 22) + pad(p.ground, 9) + pad(f1(contrast(p.text, p.ground)), 8) + pad(f1(contrast(p.accent, p.ground)), 8) + pad({ light: 'hell', mid: 'mittel', dark: 'dunkel' }[p.tone], 10) + pad(f1(contrast(MASTER.npOrange, p.ground)), 13) + f1(deltaE(p.ground, MASTER.leinen)));
}
let min = { d: Infinity, a: '', b: '' };
for (let i = 0; i < WORLDS.length; i++) for (let j = i + 1; j < WORLDS.length; j++) {
  if (isPair(DISTINCT.samePairs, WORLDS[i].nr, WORLDS[j].nr)) continue;
  const d = deltaE(WORLDS[i].palette.ground, WORLDS[j].palette.ground);
  if (d < min.d) min = { d, a: WORLDS[i].nr, b: WORLDS[j].nr };
}
console.log(`\nKleinster Abstand zweier Gründe: ΔE ${f1(min.d)} (Welt ${min.a} und ${min.b}), verlangt ${DISTINCT.minDeltaE}`);
if (hints.length) { console.log('\nHinweise:'); hints.forEach((h) => console.log('  · ' + h)); }
if (fails.length) {
  console.log(`\n✗ ${fails.length} Regelverstoß(e):`);
  fails.forEach((f) => console.log('  - ' + f));
  process.exit(1);
}
console.log('\n✓ Alle Palettenregeln erfüllt.');
