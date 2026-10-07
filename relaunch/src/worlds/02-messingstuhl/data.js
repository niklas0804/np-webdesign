/**
 * Welt 02 · Messingstuhl – Inhalte der Studie.
 * Alles hier ist erfunden und als „Demo“ gekennzeichnet: kein echter Salon, keine Adresse, keine Telefonnummer,
 * keine Domain (Blueprint F, Q2). Die Preise sind Beispielpreise dieser Studie, nicht die Preise von NP Webdesign.
 */
export const PREISE = {
  haar: { titel: 'Haar', posten: [['Haarschnitt', '28 €'], ['Maschinenschnitt', '20 €'], ['Kinderhaarschnitt', '18 €']] },
  bart: { titel: 'Bart', posten: [['Bart trimmen', '15 €'], ['Rasur mit Heißtuch', '25 €'], ['Haarschnitt und Bart', '40 €']] },
};

/** Wartemarke (Demo-Daten): aufgerufen wird Nr. 5, jede Marke davor kostet etwa zwölf Minuten */
export const WARTE = { aufgerufen: 5, start: 7, max: 12, minProMarke: 12 };

export const TERMINE = ['Heute, 16:30 Uhr', 'Heute, 17:15 Uhr', 'Morgen, 9:00 Uhr'];

export const pad = (n) => String(n).padStart(2, '0');
export const wartezeit = (nr) => Math.max(0, nr - WARTE.aufgerufen) * WARTE.minProMarke;
