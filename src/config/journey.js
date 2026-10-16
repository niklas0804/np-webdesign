/**
 * Reise-Konfiguration – einzige Quelle für Reihenfolge, Längen und Paletten (Blueprint N und T.3).
 * Längen in vh. Module schreiben weder Längen noch Farben fest.
 *
 * @typedef {'light'|'mid'|'dark'} Tone  NP-Modus der Welt, aus dem Grund berechnet (npMode): hell → Orange-Text, mittel → Tinte, dunkel → Glut
 * @typedef {{ground:string,text:string,accent:string,accentUse:'text'|'large',accent2:string,accent2Use:'text'|'graphic'|'fill'|'lines'|'dekor',accent3?:string,tone:Tone}} Palette
 * @typedef {{nr:string,slug:string,name:string,branche:string,anchor:string,branchPage:string,palette:Palette,
 *            built:boolean,source:'neu'|'demo',leistung:string,notiz?:string}} World
 */

/** Aktuelle Bauphase (Blueprint T.4). Der Werkplan und die Claim-Texte passen sich an. */
export const PHASE = 2;

import { contrast, luminance } from './color.js';

/** Master-Palette (Blueprint G) */
export const MASTER = {
  leinen: '#F0EBE3', sand: '#E3D8C8', kalk: '#FBF8F5',
  tinte: '#1C1712', stein: '#5E5852',
  npOrange: '#CE5D17', orangeText: '#A34A0D', glut: '#F08A4B', ocker: '#C99A3E',
  nacht: '#14100C', kohle: '#2E2822', asche: '#B5AB9F',
  hoverToenung: '#ECDACB', fehler: '#A3271D', erfolg: '#2E6A4B',
};

/**
 * NP-Modus einer Welt (Blueprint C, Markenregel 2) – wird berechnet, nie von Hand gesetzt:
 *  dunkel  = heller Text steht besser auf dem Grund als dunkler Text
 *  mittel  = heller Grund, aber NP-Orange erreicht dort keine 3:1 (Maßschicht und Rahmen in Tinte)
 *  hell    = heller Grund, NP-Orange erreicht mindestens 3:1 (Maßschicht in Orange-Text)
 * @param {string} ground
 * @returns {Tone}
 */
export function npMode(ground) {
  if (contrast(ground, MASTER.leinen) > contrast(ground, MASTER.tinte)) return 'dark';
  return contrast(MASTER.npOrange, ground) < 3 ? 'mid' : 'light';
}

/**
 * Weltpalette: Grund, Text, Akzent und Akzent 2. Alles andere folgt daraus.
 * accentUse: 'text' = Akzent darf als Text stehen (mindestens 4,5:1), 'large' = nur große Schrift und Grafik (mindestens 3:1).
 * accent2Use: wofür die eingeschränkte Zweitfarbe taugt: text | graphic | fill | lines | dekor (nie als Text, außer 'text').
 * accent3: optionale dritte Farbe, z. B. Ende eines Verlaufs (nur Fläche).
 */
const pal = (ground, text, accent, accent2, { accentUse = 'text', accent2Use = 'fill', accent3 } = {}) =>
  ({ ground, text, accent, accentUse, accent2, accent2Use, ...(accent3 ? { accent3 } : {}), tone: npMode(ground) });

/** @type {World[]} Die neun Welten (Blueprint F, Kurskorrektur 11. Oktober 2026: NP Labor entfällt). `built` richtet sich nach der Bauphase. Paletten: Designentscheidung vom 7. Oktober 2026. */
export const WORLDS = [
  { nr: '01', slug: 'baeckerei', name: 'Halmberg', branche: 'Bäckerei', anchor: 'baeckerei', branchPage: '/branchenloesungen/baeckerei',
    palette: pal('#E9C46A', '#3B2618', '#5E2B4A', '#8B5A2B', { accent2Use: 'graphic' }), // Weizengold · Kruste · Zwetschge · Roggen (nur Grafik, nie Text)
    notiz: 'Eine Bäckerei verkauft Duft. Darum trägt hier die Fotografie, nicht der Text.',
    built: true, source: 'neu', leistung: 'Bildkonzept und Fotobriefing' },
  { nr: '02', slug: 'friseur-barber', name: 'Messingstuhl', branche: 'Barbershop', anchor: 'barbershop', branchPage: '/branchenloesungen/friseur-barber',
    palette: pal('#121010', '#EDE6D8', '#C9A24A', '#7A2433', { accent2Use: 'fill' }), // Schwarz · Elfenbein · Gold · Bordeaux (nur Fläche)
    notiz: 'Ein Barbershop verkauft Atmosphäre. Die Wartemarke macht Warten zum Teil des Erlebnisses.',
    built: true, source: 'demo', leistung: 'Online-Terminbuchung und Markenwirkung' },
  { nr: '03', slug: 'handwerker', name: 'Wittgenfeld Bau', branche: 'Bauunternehmen', anchor: 'bau', branchPage: '/branchenloesungen/handwerker',
    palette: pal('#DCE8F1', '#1C2A38', '#2B5C8A', '#B23A2E', { accent2Use: 'text' }), // Planblau-Weiß · Tusche · Blaupause · Prüfrot
    notiz: 'Bauherren wollen Klarheit. Darum ist jede Leistung ein Bauteil mit Maß.',
    built: true, source: 'demo', leistung: 'Konzeption und Seitenstruktur' },
  { nr: '04', slug: 'kanzlei', name: 'Haas & Sternfeld', branche: 'Kanzlei', anchor: 'kanzlei', branchPage: '/branchenloesungen/kanzlei',
    palette: pal('#FFFFFF', '#111111', '#A3122A', '#6E6E66', { accent2Use: 'text' }), // Reinweiß · Schwarz · Siegelrot · Grau (Linien und Meta)
    notiz: 'Eine Kanzlei verkauft Urteilsvermögen. Darum führt hier die Typografie.',
    built: true, source: 'neu', leistung: 'Texte und Inhaltsstruktur' },
  { nr: '05', slug: 'kfz-werkstatt', name: 'Chromwerk', branche: 'Oldtimer-Werkstatt', anchor: 'oldtimer', branchPage: '/branchenloesungen/kfz-werkstatt',
    palette: pal('#13382B', '#E8EAED', '#EFE6D2', '#8C939B', { accent2Use: 'lines' }), // British Racing Green · Chrom · Elfenbein · Chromgrau (nur Linien und große Schrift)
    notiz: 'Ein Oldtimer ist Bewegung. Darum fährt diese Seite quer.',
    built: true, source: 'neu', leistung: 'Animation und Interaktion' },
  { nr: '06', slug: 'beratung-coaching', name: 'Jana Ahrens', branche: 'Coaching', anchor: 'coaching', branchPage: '/branchenloesungen/beratung-coaching',
    palette: pal('#DCD1EA', '#35292A', '#8A5470', '#F1C9B5', { accentUse: 'large', accent2Use: 'fill', accent3: '#C9B6D9' }), // Flieder · Dunkelbraun · Malve (nur große Schrift/Grafik) · Kugelverlauf Pfirsich → Flieder (nur Fläche)
    notiz: 'Beratung beginnt mit Vertrauen. Darum ist hier nichts laut — und der Weg zur Anfrage ist zwei Klicks kurz.',
    built: true, source: 'demo', leistung: 'Nutzerführung' },
  { nr: '07', slug: 'industrie', name: 'TORQUEL', branche: 'Industrie', anchor: 'industrie', branchPage: '/branchenloesungen/industrie',
    palette: pal('#2B3642', '#E6EAEE', '#F2C230', '#5A6A78', { accent2Use: 'dekor' }), // Stahlschiefer · Hellgrau · Signalgelb · Rastergrau (nur Dekor)
    notiz: 'Einkäufer prüfen genau. Darum ist hier jede Zahl auffindbar und die Seite schnell.',
    built: true, source: 'neu', leistung: 'Performance und Technik' },
  { nr: '08', slug: 'physiotherapie', name: 'Praxis am Weiher', branche: 'Physiotherapie', anchor: 'physiotherapie', branchPage: '/branchenloesungen/physiotherapie',
    palette: pal('#CDE8DA', '#1E2D2A', '#2F6B57', '#CFE6DC', { accent2Use: 'fill' }), // Mint · Tannengrün · Salbei · Hellmint (nur Fläche)
    notiz: 'Patienten sind nicht immer fit. Darum ist hier alles groß, klar und mit der Tastatur bedienbar.',
    built: true, source: 'neu', leistung: 'Barrierefreiheit und Terminbuchung' },
  { nr: '09', slug: 'gastronomie-hotel', name: 'Gut Weidenstein', branche: 'Landgasthof', anchor: 'landgasthof', branchPage: '/branchenloesungen/gastronomie-hotel',
    palette: pal('#2A1F33', '#ECE6DA', '#A9BC93', '#6F8796', { accent2Use: 'lines' }), // Dämmerungsviolett · Elfenbein · Schilf · Wasser (nur Linien)
    notiz: 'Gäste buchen ein Gefühl. Darum kommt die Anfrage erst, wenn es da ist — und dann ohne Hürde.',
    built: true, source: 'neu', leistung: 'Conversion-Struktur' },
];

/**
 * Regeln der Unterscheidbarkeit (scripts/check-palettes.mjs, Blueprint R und T.1). Ausnahmen sind hier festgehalten, nicht im Skript.
 */
export const DISTINCT = {
  minDeltaE: 10,
  /** Paare, die denselben Grund teilen dürfen (derzeit keine) */
  samePairs: [],
  /** Welten, deren Grund Leinen nahekommt (Weiß liegt bei ΔE 8,1 zu Leinen) */
  leinenExempt: ['04'],
};

export const builtWorlds = WORLDS.filter((w) => w.built);

/** Zahlwörter für Claim und Statement – richten sich nach der Zahl der gebauten Welten */
const ZAHL = ['null', 'Eine', 'Zwei', 'Drei', 'Vier', 'Fünf', 'Sechs', 'Sieben', 'Acht', 'Neun', 'Zehn'];
const ZAHL_KLEIN = ['null', 'eine', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn'];
const ORDINAL = ['', 'erste', 'zweite', 'dritte', 'vierte', 'fünfte', 'sechste', 'siebte', 'achte', 'neunte', 'zehnte', 'elfte'];
const n = builtWorlds.length;
export const TEXT = {
  worldCount: n,
  claim: `${ZAHL[n]} Welten. Die ${ORDINAL[n + 1]} gehört Ihnen.`,
  statement: `${ZAHL[n]} Betriebe. ${ZAHL[n]} Websites. Keine sieht aus wie die andere.`,
  statementNote: `Alle ${ZAHL_KLEIN[n]} sind Studien: erfundene Unternehmen, echte Gestaltung.`,
  heroSecondary: 'Sehen Sie, was ich baue',
  nextWorld: `Welt ${String(n + 1).padStart(2, '0')}`,
};

/**
 * Übergänge mit eigenem Staffelstab statt des Standard-Fadens. Schlüssel: `von>nach`. Die Länge bleibt in der Konfiguration.
 * Stand Kurskorrektur 11. Oktober 2026: neun Welten, keine Zwischenspiele auf /welten, Labor entfällt.
 */
export const TRANSITION_VARIANTS = {
  'welt-01>welt-02': 'bon', // Bon „Nr. 07“ aus Halmberg dreht sich um und wird als goldene Wartemarke von Messingstuhl neu gedruckt
  'welt-02>welt-03': 'goldlinie', // Goldlinie wird Maßlinie, Millimeterpapier schiebt sich darunter hoch
  'welt-03>welt-04': 'stempel', // Der rote Prüfstempel von Wittgenfeld wird gesetzt, sein Abdruck streckt sich zur roten Linie der Kanzlei; Planblau wird Reinweiß
  'welt-04>welt-05': 'zierlinie', // Die rote Linie wird zur elfenbeinfarbenen Zierlinie, Reinweiß wird British Racing Green
  'welt-05>welt-06': 'scheinwerfer', // Der Scheinwerfer glüht auf, wächst über den Viewport und wird zur Farbkugel; Racing Green wird Pfirsich und läuft in Flieder aus
  'welt-06>welt-07': 'messkreise', // Die Kreise der Farbkugel werden Messkreise einer Rundheitsmessung, die Laserlinie von TORQUEL tastet sie ab
  'welt-07>welt-08': 'messraster', // Die Messraster-Zellen ordnen sich zum Monatskalender, eine Zelle leuchtet als Termin, Stahlschiefer wird Mint
  'welt-08>welt-09': 'wasser', // Das Bild des Weihers zoomt aus und wird zum See in der Abenddämmerung, Mint kippt in Dämmerungsviolett
  'welt-09>finale': 'fensterplan', // Das erleuchtete Fenster schrumpft in den leeren zehnten Platz des Werkplans, die Kamera fährt zurück
};

/** Standard-Übergang: der orange Faden zieht eine Linie quer über den Viewport, dahinter wischt die neue Welt herein */
export const TRANSITION_DEFAULT = { desktop: 60, mobile: 40 };
/** Längere Übergänge (Blueprint F): Weiher → See, Fenster → Werkplan */
export const TRANSITION_LENGTH = {
  'welt-08>welt-09': { desktop: 80, mobile: 50 },
  'welt-09>finale': { desktop: 100, mobile: 80 },
};

/**
 * Reihenfolge der Seite /welten: Werkplan → Welten 01–09 mit Übergängen → Finale (Auftrag 11. Oktober 2026).
 * kind: opening | world | transition | finale
 */
export const journey = (() => {
  /** @type {any[]} */
  const seq = [
    // Werkplan-Szene: Der Werkplan steht von Anfang an (kein Hero, der gehört der Startseite), ruht kurz (plan) und t00 lässt die Zelle 01 wachsen (grow)
    { id: 'opening', kind: 'opening', anchor: 'werkplan', expansion: { d: 0, m: 0 }, plan: { d: 70, m: 60 }, grow: { d: 60, m: 40 }, ground: MASTER.leinen, tone: 'light' },
    { id: 'welt-01', kind: 'world', world: '01', d: 160, m: 140 },
    { id: 'welt-02', kind: 'world', world: '02', d: 140, m: 120 },
    { id: 'welt-03', kind: 'world', world: '03', d: 140, m: 120 },
    { id: 'welt-04', kind: 'world', world: '04', d: 200, m: 160 },
    // scene: Länge der gepinnten Querfahrt (Desktop); mobil ist die Bildstrecke eine wischbare Leiste ohne Pin
    { id: 'welt-05', kind: 'world', world: '05', d: 240, m: 180, scene: { d: 260, m: 0 } },
    { id: 'welt-06', kind: 'world', world: '06', d: 230, m: 190 },
    { id: 'welt-07', kind: 'world', world: '07', d: 260, m: 200 },
    { id: 'welt-08', kind: 'world', world: '08', d: 240, m: 200 },
    // scene: Länge der gepinnten Bildüberblendung (Blueprint F: 120vh plus Verweilen); die langsamste Welt der Reise
    { id: 'welt-09', kind: 'world', world: '09', d: 320, m: 240, scene: { d: 240, m: 170 } },
    // Finale: Rückzoom auf den Werkplan, der zehnte Platz bleibt leer, Einladung (Blueprint L). Der Kontakt liegt auf der Startseite.
    { id: 'finale', kind: 'finale', anchor: 'finale', d: 160, m: 120, ground: MASTER.leinen, tone: 'light' },
  ];

  const groundOf = (s) => (s.kind === 'world' ? WORLDS.find((w) => w.nr === s.world).palette.ground : s.ground);
  const accentOf = (s) => (s.kind === 'world' ? WORLDS.find((w) => w.nr === s.world).palette.accent : null);
  const textOf = (s) => (s.kind === 'world' ? WORLDS.find((w) => w.nr === s.world).palette.text : null);
  const toneOf = (s) => (s.kind === 'world' ? WORLDS.find((w) => w.nr === s.world).palette.tone : s.tone);

  // Übergänge zwischen den Abschnitten einfügen. Keiner nach dem Opening: t00 läuft auf dessen Bühne.
  const out = [];
  seq.forEach((s, i) => {
    out.push(s);
    const next = seq[i + 1];
    if (!next || s.kind === 'opening') return;
    const len = TRANSITION_LENGTH[`${s.id}>${next.id}`] || TRANSITION_DEFAULT;
    out.push({
      id: `t-${s.id}-${next.id}`, kind: 'transition', from: s.id, to: next.id,
      fromGround: groundOf(s), toGround: groundOf(next), fromTone: toneOf(s), toTone: toneOf(next),
      fromAccent: accentOf(s), toAccent: accentOf(next), fromText: textOf(s), toText: textOf(next),
      d: len.desktop, m: len.mobile,
      variant: TRANSITION_VARIANTS[`${s.id}>${next.id}`] || null,
    });
  });
  return out;
})();

/**
 * Abschnitte der Startseite (Teil C ersetzt das). Hier nur Länge, Grund und Ton, damit /journey.css sie kennt.
 */
export const homeRows = [
  { id: 'warum', kind: 'interlude', anchor: 'warum', d: 120, m: 100, ground: MASTER.nacht, tone: 'dark' },
  { id: 'arbeitsweise', kind: 'interlude', anchor: 'arbeitsweise', d: 100, m: 100, ground: MASTER.leinen, tone: 'light' },
  { id: 'kontakt', kind: 'contact', anchor: 'kontakt', d: 100, m: 100, ground: MASTER.leinen, tone: 'light' },
  { id: 'faq', kind: 'faq', anchor: 'faq', d: 100, m: 100, ground: MASTER.kalk, tone: 'light' },
];

/** Welt-Eintrag zu einer Reise-Zeile */
export const worldOf = (row) => WORLDS.find((w) => w.nr === row.world);

/** Kleine Hilfen für Tests und Abnahme */
export const totals = () => ({
  desktop: journey.reduce((sum, r) => sum + (r.kind === 'opening' ? r.expansion.d + r.plan.d + r.grow.d : r.d), 0),
  mobile: journey.reduce((sum, r) => sum + (r.kind === 'opening' ? r.expansion.m + r.plan.m + r.grow.m : r.m), 0),
});
