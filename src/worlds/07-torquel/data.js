/**
 * Welt 07 · TORQUEL – Inhalte der Studie. Fiktiv: kein echter Betrieb, keine Adresse, keine Telefonnummer, keine Domain,
 * keine Kunden, keine Zertifikate. Alle Werte sind Beispielwerte. Fotos stehen als Bildplatzhalter (src/content/fotos.js).
 */
export const KICKER = 'Präzisionsfertigung · Studie, fiktives Unternehmen';
export const UNTER = 'Frästeile und Drehteile nach Zeichnung, vom Einzelstück bis zur Serie.';

/** Kennzahlen, zählen beim Eintritt einmal hoch. `zahl` ist der Endwert, `dec` die Nachkommastellen. */
export const KENNZAHLEN = [
  { zahl: 0.005, dec: 3, pre: '± ', einheit: 'mm', label: 'Toleranz, Standard' },
  { zahl: 14, dec: 0, pre: '', einheit: '', label: 'Bearbeitungszentren' },
  { zahl: 5000, dec: 0, pre: '1 – ', einheit: 'Stück', label: 'Losgröße' },
  { zahl: 10, dec: 0, pre: '', einheit: 'Arbeitstage', label: 'Lieferzeit, Standard' },
];

/** Messprotokoll: Soll, Toleranz (±), Ist. Die Abweichung steuert die Toleranzanzeige (−1 bis +1 = Rand des Toleranzbands). */
export const PROTOKOLL = {
  titel: 'Messprotokoll · Beispielteil',
  zeilen: [
    { merkmal: 'Bohrung Ø', soll: 12.0, tol: 0.005, ist: 12.002, einheit: 'mm', dec: 3 },
    { merkmal: 'Lochabstand', soll: 45.0, tol: 0.01, ist: 45.003, einheit: 'mm', dec: 3 },
    { merkmal: 'Taschentiefe', soll: 8.5, tol: 0.01, ist: 8.496, einheit: 'mm', dec: 3 },
    { merkmal: 'Wandstärke', soll: 2.0, tol: 0.02, ist: 2.011, einheit: 'mm', dec: 3 },
    { merkmal: 'Winkel', soll: 90.0, tol: 0.05, ist: 89.99, einheit: '°', dec: 2 },
    { merkmal: 'Planparallelität', soll: 0.0, tol: 0.01, ist: 0.004, einheit: 'mm', dec: 3 },
  ],
  hinweis: 'Demo · Beispielwerte, erfundenes Teil',
};

export const MATERIALIEN = ['Aluminium (EN AW-6082)', 'Edelstahl (1.4301)', 'Stahl (S355)', 'Messing (CuZn39Pb3)', 'Kunststoff (POM)'];

export const BAUTEIL = { ansichten: 12, schritt: 30 };
export const f = (n, dec) => n.toLocaleString('de-DE', { minimumFractionDigits: dec, maximumFractionDigits: dec });
