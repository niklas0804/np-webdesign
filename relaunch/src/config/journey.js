/**
 * Reise-Konfiguration – einzige Quelle für Reihenfolge, Längen und Paletten (Blueprint N und T.3).
 * Längen in vh. Module schreiben weder Längen noch Farben fest.
 *
 * @typedef {'light'|'dark'} Tone  Helligkeit des Grundes; bestimmt die NP-Farbe (Orange-Text auf hell, Glut auf dunkel)
 * @typedef {{ground:string,text:string,accent:string,accent2:string,tone:Tone}} Palette
 * @typedef {{nr:string,slug:string,name:string,branche:string,anchor:string,branchPage:string,palette:Palette,
 *            built:boolean,source:'neu'|'demo',leistung:string,notiz?:string}} World
 */

/** Aktuelle Bauphase (Blueprint T.4). Der Werkplan und die Claim-Texte passen sich an. */
export const PHASE = 1;

/** Master-Palette (Blueprint G) */
export const MASTER = {
  leinen: '#F0EBE3', sand: '#E3D8C8', kalk: '#FBF8F5',
  tinte: '#1C1712', stein: '#5E5852',
  npOrange: '#CE5D17', orangeText: '#A34A0D', glut: '#F08A4B', ocker: '#C99A3E',
  nacht: '#14100C', kohle: '#2E2822', asche: '#B5AB9F',
  hoverToenung: '#ECDACB', fehler: '#A3271D', erfolg: '#2E6A4B',
};

/** @type {World[]} Die zehn Welten (Blueprint F). `built` richtet sich nach der Bauphase. */
export const WORLDS = [
  { nr: '01', slug: 'baeckerei', name: 'Korn & Kruste', branche: 'Bäckerei', anchor: 'baeckerei', branchPage: '/branchenloesungen/baeckerei',
    palette: { ground: '#F7F0E4', text: '#3B2618', accent: '#8B5A2B', accent2: '#5E2B4A', tone: 'light' },
    notiz: 'Eine Bäckerei verkauft Duft. Darum trägt hier die Fotografie, nicht der Text.',
    built: true, source: 'neu', leistung: 'Bildkonzept und Fotobriefing' },
  { nr: '02', slug: 'friseur-barber', name: 'Herrenzimmer', branche: 'Barbershop', anchor: 'barbershop', branchPage: '/branchenloesungen/friseur-barber',
    palette: { ground: '#121010', text: '#EDE6D8', accent: '#C9A24A', accent2: '#7A2433', tone: 'dark' },
    notiz: 'Ein Barbershop verkauft Atmosphäre. Die Wartemarke macht Warten zum Teil des Erlebnisses.',
    built: true, source: 'demo', leistung: 'Online-Terminbuchung und Markenwirkung' },
  { nr: '03', slug: 'handwerker', name: 'Steiner Bau', branche: 'Bauunternehmen', anchor: 'bau', branchPage: '/branchenloesungen/handwerker',
    palette: { ground: '#F3F1EA', text: '#1C2A38', accent: '#2B5C8A', accent2: '#B23A2E', tone: 'light' },
    notiz: 'Bauherren wollen Klarheit. Darum ist jede Leistung ein Bauteil mit Maß.',
    built: true, source: 'demo', leistung: 'Konzeption und Seitenstruktur' },
  { nr: '04', slug: 'kanzlei', name: 'Haas & Sternfeld', branche: 'Kanzlei', anchor: 'kanzlei', branchPage: '/branchenloesungen/kanzlei',
    palette: { ground: '#FAF8F3', text: '#111111', accent: '#A3122A', accent2: '#6E6E66', tone: 'light' },
    built: false, source: 'neu', leistung: 'Texte und Inhaltsstruktur' },
  { nr: '05', slug: 'kfz-werkstatt', name: 'Chromwerk', branche: 'Oldtimer-Werkstatt', anchor: 'oldtimer', branchPage: '/branchenloesungen/kfz-werkstatt',
    palette: { ground: '#0E0F11', text: '#E8EAED', accent: '#D2203F', accent2: '#8C939B', tone: 'dark' },
    built: false, source: 'neu', leistung: 'Animation und Interaktion' },
  { nr: '06', slug: 'beratung-coaching', name: 'Jana Ahrens', branche: 'Coaching', anchor: 'coaching', branchPage: '/branchenloesungen/beratung-coaching',
    palette: { ground: '#F6EFEA', text: '#35292A', accent: '#8A5470', accent2: '#C9B6D9', tone: 'light' },
    built: false, source: 'demo', leistung: 'Nutzerführung' },
  { nr: '07', slug: 'industrie', name: 'NAABTEC', branche: 'Industrie', anchor: 'industrie', branchPage: '/branchenloesungen/industrie',
    palette: { ground: '#15191D', text: '#E6EAEE', accent: '#F2C230', accent2: '#5A6A78', tone: 'dark' },
    built: false, source: 'neu', leistung: 'Performance und Technik' },
  { nr: '08', slug: 'physiotherapie', name: 'Praxis am Weiher', branche: 'Physiotherapie', anchor: 'physiotherapie', branchPage: '/branchenloesungen/physiotherapie',
    palette: { ground: '#F4F8F6', text: '#1E2D2A', accent: '#2F6B57', accent2: '#CFE6DC', tone: 'light' },
    built: false, source: 'neu', leistung: 'Barrierefreiheit und Terminbuchung' },
  { nr: '09', slug: 'gastronomie-hotel', name: 'Gut Weidenstein', branche: 'Landgasthof', anchor: 'landgasthof', branchPage: '/branchenloesungen/gastronomie-hotel',
    palette: { ground: '#13212A', text: '#ECE6DA', accent: '#A9BC93', accent2: '#6F8796', tone: 'dark' },
    built: false, source: 'neu', leistung: 'Conversion-Struktur' },
  { nr: '10', slug: 'labor', name: 'NP Labor', branche: 'Labor', anchor: 'labor', branchPage: '/',
    palette: { ground: '#FFFFFF', text: '#000000', accent: '#0000EE', accent2: '#551A8B', tone: 'light' },
    built: false, source: 'neu', leistung: 'Sauberer Code, keine Baukasten-Abhängigkeit' },
];

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
  heroSecondary: `${ZAHL[n]} Welten ansehen`,
  nextWorld: `Welt ${String(n + 1).padStart(2, '0')}`,
};

/** Übergänge mit eigenem Staffelstab statt des Standard-Fadens. Schlüssel: `von>nach`. Die Länge bleibt in der Konfiguration. */
export const TRANSITION_VARIANTS = {
  'welt-01>welt-02': 'bon', // Bon „Nr. 07“ dreht sich um und wird als goldene Wartemarke neu gedruckt
  'welt-02>welt-03': 'goldlinie', // Goldlinie wird Maßlinie, Millimeterpapier schiebt sich darunter hoch
};

/** Standard-Übergang: der orange Faden zieht eine Linie quer über den Viewport, dahinter wischt die neue Welt herein */
export const TRANSITION_DEFAULT = { desktop: 60, mobile: 40 };

/**
 * Reihenfolge der Reise in dieser Bauphase (Blueprint T.3, gekürzt auf die gebauten Teile).
 * kind: opening | world | interlude | transition | finale | contact | faq
 */
export const journey = (() => {
  /** @type {any[]} */
  const seq = [
    // Opening: Hero (100) + Expansion (150, gepinnt) + Werkplan (80) bilden eine Bühne
    // t00 (Werkplan → Welt 01, 60/40vh) läuft auf derselben Bühne: Die Zelle wächst auf Viewport-Größe
    { id: 'opening', kind: 'opening', anchor: 'werkplan', hero: { d: 100, m: 100 }, expansion: { d: 150, m: 100 }, plan: { d: 80, m: 80 }, grow: { d: 60, m: 40 }, ground: MASTER.leinen, tone: 'light' },
    { id: 'welt-01', kind: 'world', world: '01', d: 160, m: 140 },
    { id: 'welt-02', kind: 'world', world: '02', d: 140, m: 120 },
    { id: 'welt-03', kind: 'world', world: '03', d: 140, m: 120 },
    { id: 'warum', kind: 'interlude', anchor: 'warum', title: 'Warum individuell', d: 120, m: 100, ground: MASTER.nacht, tone: 'dark' },
    { id: 'arbeitsweise', kind: 'interlude', anchor: 'arbeitsweise', title: 'Arbeitsweise', d: 160, m: 160, ground: MASTER.leinen, tone: 'light', pin: true },
    { id: 'ueber-mich', kind: 'interlude', anchor: 'ueber-mich', title: 'Über mich', d: 120, m: 110, ground: MASTER.leinen, tone: 'light' },
    { id: 'finale', kind: 'finale', anchor: 'finale', d: 120, m: 100, ground: MASTER.leinen, tone: 'light' },
    { id: 'kontakt', kind: 'contact', anchor: 'kontakt', d: 150, m: 200, ground: MASTER.leinen, tone: 'light' },
    { id: 'faq', kind: 'faq', anchor: 'faq', d: 160, m: 230, ground: MASTER.kalk, tone: 'light' },
  ];

  const groundOf = (s) => (s.kind === 'world' ? WORLDS.find((w) => w.nr === s.world).palette.ground : s.ground);
  const toneOf = (s) => (s.kind === 'world' ? WORLDS.find((w) => w.nr === s.world).palette.tone : s.tone);

  // Übergänge zwischen den Abschnitten einfügen (nicht vor/nach dem Opening-Ende zum FAQ: dort keine Inszenierung)
  const out = [];
  seq.forEach((s, i) => {
    out.push(s);
    const next = seq[i + 1];
    if (!next || next.kind === 'faq' || s.kind === 'opening') return;
    out.push({
      id: `t-${s.id}-${next.id}`, kind: 'transition', from: s.id, to: next.id,
      fromGround: groundOf(s), toGround: groundOf(next), fromTone: toneOf(s), toTone: toneOf(next),
      d: TRANSITION_DEFAULT.desktop, m: TRANSITION_DEFAULT.mobile,
      variant: TRANSITION_VARIANTS[`${s.id}>${next.id}`] || null,
    });
  });
  return out;
})();

/** Welt-Eintrag zu einer Reise-Zeile */
export const worldOf = (row) => WORLDS.find((w) => w.nr === row.world);

/** Kleine Hilfen für Tests und Abnahme */
export const totals = () => ({
  desktop: journey.reduce((sum, r) => sum + (r.kind === 'opening' ? r.hero.d + r.expansion.d + r.plan.d + r.grow.d : r.d), 0),
  mobile: journey.reduce((sum, r) => sum + (r.kind === 'opening' ? r.hero.m + r.expansion.m + r.plan.m + r.grow.m : r.m), 0),
});
