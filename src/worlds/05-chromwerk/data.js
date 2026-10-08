/**
 * Welt 05 · Chromwerk – Inhalte der Studie. Fiktiv: keine echte Werkstatt, keine Adresse, keine Telefonnummer, keine Domain,
 * kein echter Fahrzeughersteller (Fahrzeug und Daten sind erfunden). Fotos stehen als Bildplatzhalter (src/content/fotos.js).
 */
export const UNTERZEILE = 'Oldtimer-Werkstatt · Restaurierung und Instandhaltung';
export const KOPFTEXT = 'Ein Oldtimer ist kein Neuwagen mit Patina. Wir erhalten, was original ist, und ersetzen nur, was nicht mehr zu retten ist.';

/** Die Bildstrecke der Querfahrt: vier Bänder, jedes mit Kapitelnummer */
export const STRECKE = [
  { nr: '01', foto: 'w05-strecke-1', titel: 'Front', text: 'Scheinwerfer, Stoßstange, Kühlergrill: Wir beginnen dort, wo der erste Blick hinfällt.' },
  { nr: '02', foto: 'w05-strecke-2', titel: 'Emblem', text: 'Chrom wird nicht ersetzt, sondern neu aufgebaut. Jedes Teil bekommt seine Lichtkante zurück.' },
  { nr: '03', foto: 'w05-strecke-3', titel: 'Cockpit', text: 'Instrumente werden zerlegt, gereinigt und justiert. Der Zeiger läuft wieder, wie er sollte.' },
  { nr: '04', foto: 'w05-strecke-4', titel: 'Naht', text: 'Leder wird von Hand genäht. Das Garn ist heller als das Leder, so wie es damals war.' },
];

/** Datenblatt des erfundenen Beispielfahrzeugs */
export const DATENBLATT = {
  titel: 'Datenblatt · Beispielfahrzeug',
  hinweis: 'Demo · erfundenes Fahrzeug, Beispieldaten',
  zeilen: [
    ['Fahrzeug', 'Roadster, zweisitzig'],
    ['Baujahr', '1962'],
    ['Hubraum', '1.991 cm³'],
    ['Zylinder', '4, Reihe'],
    ['Leistung', '77 PS (57 kW)'],
    ['Arbeitsstunden', '1.240'],
    ['Dauer', '14 Monate'],
    ['Lack', 'Grün, zweischichtig, handpoliert'],
  ],
};

/** Der Ablauf in Kapiteln (Kapitelnummern als UI-Element der Welt) */
export const ABLAUF = [
  ['01', 'Befund', 'Wir dokumentieren den Zustand Schraube für Schraube und schätzen den Aufwand ehrlich.'],
  ['02', 'Zerlegen', 'Alles wird beschriftet, fotografiert und sortiert. Nichts geht verloren.'],
  ['03', 'Instandsetzen', 'Blech, Mechanik und Elektrik: reparieren vor ersetzen.'],
  ['04', 'Lack und Chrom', 'Aufbau in Schichten, Politur von Hand, Chrom mit Lichtkante.'],
  ['05', 'Übergabe', 'Probefahrt, Dokumentation und eine Mappe mit allen Arbeitsschritten.'],
];

export const VORHER_NACHHER = {
  titel: 'Vorher und Nachher',
  text: 'Schieben Sie den Regler: links der Zustand bei der Ankunft, rechts nach 1.240 Stunden Arbeit.',
  regler: 'Regler: Anteil des Vorher-Bildes',
};
