/**
 * Welt 09 · Gut Weidenstein – Inhalte der Studie. Fiktiv: kein echter Betrieb, keine Adresse, keine Telefonnummer, keine Domain.
 * Preise und Gerichte sind Beispielwerte. Fotos stehen als Bildplatzhalter (src/content/fotos.js).
 */
export const KICKER = 'Landgasthof und Hotel am See · Studie, fiktives Unternehmen';
export const SATZ = 'Ein Abend am See, der nicht endet, wenn die Sonne untergeht.';

/** Die Tageszeit wandert von Abend zu Nacht: drei Bilder, drei Stimmungen */
export const ZEITEN = [
  { id: 'abend', foto: 'w09-see-abend', name: 'Abend', text: 'Das Licht liegt flach auf dem Wasser. Auf der Terrasse wird gedeckt.' },
  { id: 'daemmerung', foto: 'w09-see-daemmerung', name: 'Dämmerung', text: 'Der Himmel färbt sich. In der Gaststube gehen die ersten Kerzen an.' },
  { id: 'nacht', foto: 'w09-see-nacht', name: 'Nacht', text: 'Der See wird still. Im Haus brennt noch ein Fenster, für Sie.' },
];

export const ZIMMER = [
  { name: 'Seezimmer', text: 'Fensterblick auf das Wasser, Leinenwäsche, Holzboden.', preis: 'ab 148 €' },
  { name: 'Gartenzimmer', text: 'Ruhig zur Wiese, eigener Sitzplatz.', preis: 'ab 118 €' },
  { name: 'Suite am Schilf', text: 'Zwei Räume, Badewanne mit Blick, Frühstück am Fenster.', preis: 'ab 238 €' },
];

export const KARTE = {
  mittag: { titel: 'Mittag', zeit: '12:00 bis 14:30 Uhr', posten: [
    ['Kartoffelsuppe mit Majoran', '7,50 €'], ['Saibling aus dem See, Kräuterbutter', '19,80 €'], ['Gemüsepfanne, Hofkäse', '14,50 €'], ['Apfelkuchen, Sahne', '5,90 €'] ] },
  abend: { titel: 'Abend', zeit: '17:30 bis 21:30 Uhr', posten: [
    ['Vorspeise: Rote Bete, Meerrettich, Walnuss', '11,50 €'], ['Zander auf Wurzelgemüse, Weißweinsoße', '28,50 €'], ['Rehrücken, Pfifferlinge, Knödel', '34,00 €'], ['Zwetschgenröster, Vanilleeis', '8,50 €'] ] },
};

export const PERSONEN = [1, 2, 3, 4, 5, 6];
