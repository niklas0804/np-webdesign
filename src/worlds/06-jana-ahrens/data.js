/**
 * Welt 06 · Jana Ahrens – Inhalte der Studie. Fiktiv: keine echte Person, keine Adresse, keine Telefonnummer, keine Domain, kein Foto
 * (Kugel statt Foto). Die Sätze sind erfundene Haltungen der Studie, keine Kundenstimmen und keine Bewertungen.
 */
export const KICKER = 'Coaching und Beratung';
export const SATZ = 'Klarheit beginnt mit einer guten Frage.';
export const UNTER = 'Für Menschen, die etwas verändern wollen und noch nicht wissen, wo sie anfangen sollen.';

/** Haltungssätze (statt Zitatkarten mit erfundenen Kundenstimmen) */
export const HALTUNG = [
  { satz: 'Ich gebe keine Antworten vor. Ich helfe, die eigenen zu finden.', tag: 'Haltung' },
  { satz: 'Ein Gespräch darf leise sein. Auch Pausen sind Arbeit.', tag: 'Methode' },
  { satz: 'Ziele, die zu groß sind, zerlegen wir, bis der erste Schritt klein genug ist.', tag: 'Weg' },
];

/** Der Prozess als konzentrische Kreise, von innen nach außen */
export const KREISE = [
  { nr: '01', name: 'Ausgangspunkt', text: 'Wo stehen Sie gerade, und was beschäftigt Sie wirklich?' },
  { nr: '02', name: 'Reflexion', text: 'Wir sortieren Gedanken, Gefühle und Möglichkeiten, ohne zu bewerten.' },
  { nr: '03', name: 'Ziel', text: 'Sie formulieren, was sich verändern soll und woran Sie es merken.' },
  { nr: '04', name: 'Umsetzung', text: 'Kleine Schritte, regelmäßige Gespräche, ehrliche Rückschau.' },
];

/** „Drei Fragen“ (Demo): Antworten verschieben die Farben der Kugel; nichts wird gespeichert oder gesendet */
export const FRAGEN = [
  { frage: 'Wie fühlt sich Ihr Alltag gerade an?', antworten: [['Hektisch', 0], ['Ausgewogen', 1], ['Leer', 2]] },
  { frage: 'Was wünschen Sie sich am meisten?', antworten: [['Ruhe', 0], ['Richtung', 1], ['Energie', 2]] },
  { frage: 'Wie weit ist der erste Schritt?', antworten: [['Noch fern', 0], ['In Sicht', 1], ['Schon begonnen', 2]] },
];
export const ERGEBNISSE = [
  { titel: 'Eine ruhige Kugel', text: 'Sie suchen vor allem Ruhe. Ein erstes Gespräch könnte klären, was gerade am meisten Platz einnimmt.' },
  { titel: 'Eine klare Kugel', text: 'Sie wissen ungefähr, wohin es gehen soll. Im Gespräch machen wir daraus einen ersten Schritt.' },
  { titel: 'Eine Kugel in Bewegung', text: 'Sie sind schon unterwegs. Wir schauen gemeinsam, was Sie trägt und was Sie bremst.' },
];

export const TERMINE = ['Dienstag, vormittags', 'Mittwoch, nachmittags', 'Donnerstag, abends'];
