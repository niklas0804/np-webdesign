/**
 * Welt 01 · Halmberg – Inhalte der Studie.
 * Alles hier ist erfunden und als „Demo-Daten“ gekennzeichnet: Es gibt keine echte Bäckerei,
 * keine Adresse, keine Telefonnummer, keine Domain (Blueprint F, Q2).
 * Aufbau und Schnittstelle: Blueprint Weltmodul-Vertrag (Kennung, Palette, Schriften, Markup, Bewegung, Aufräumen).
 */
export const BROTE = {
  landbrot:  { name: 'Landbrot',        art: 'Weizen-Roggen-Sauerteig', stunden: 16, form: 'rund',  text: 'Lange, kühle Gare, damit die Kruste dunkel und die Krume saftig wird.' },
  roggen:    { name: 'Roggenlaib',      art: 'Roggen-Sauerteig',        stunden: 20, form: 'oval',  text: 'Der Sauerteig bekommt über Nacht Zeit. Das gibt den kräftigen, leicht säuerlichen Geschmack.' },
  dinkel:    { name: 'Dinkelkruste',    art: 'Dinkel mit Vorteig',      stunden: 14, form: 'rund',  text: 'Ein Vorteig am Vorabend, am Morgen wird geformt und gebacken.' },
  koerner:   { name: 'Körnerlaib',      art: 'Mischbrot mit Quellstück', stunden: 18, form: 'oval', text: 'Die Körner quellen über Nacht und halten das Brot lange frisch.' },
  brezen:    { name: 'Laugenbrezen',    art: 'Hefeteig',                stunden: 6,  form: 'brezel', text: 'Kurze, kühle Ruhe, dann in die Lauge und mit grobem Salz in den Ofen.' },
  datschi:   { name: 'Zwetschgendatschi', art: 'Hefeteig',    stunden: 3,  form: 'blech', text: 'Nur in der Saison: Hefeteig vom Blech mit frischen Zwetschgen.', saison: true },
};

/** Backplan Montag bis Samstag (Demo-Daten) */
export const BACKPLAN = [
  { tag: 'Montag',     kurz: 'Mo', brote: ['landbrot', 'roggen', 'brezen'] },
  { tag: 'Dienstag',   kurz: 'Di', brote: ['landbrot', 'dinkel', 'brezen'] },
  { tag: 'Mittwoch',   kurz: 'Mi', brote: ['roggen', 'koerner', 'brezen'] },
  { tag: 'Donnerstag', kurz: 'Do', brote: ['landbrot', 'dinkel', 'koerner'] },
  { tag: 'Freitag',    kurz: 'Fr', brote: ['landbrot', 'roggen', 'dinkel', 'brezen'] },
  { tag: 'Samstag',    kurz: 'Sa', brote: ['landbrot', 'roggen', 'koerner', 'brezen', 'datschi'] },
];

/** Öffnungszeiten-Tafel (Demo-Daten) */
export const ZEITEN = [
  ['Montag bis Freitag', '6:00 bis 18:00 Uhr'],
  ['Samstag', '6:00 bis 13:00 Uhr'],
  ['Sonntag', 'Ruhetag'],
];

export const BON_NR = '07';
