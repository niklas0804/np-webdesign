/**
 * Welt 03 · Steiner Bau – Inhalte der Studie. Fiktiv: keine echte Firma, keine Adresse, keine Telefonnummer, keine Domain.
 * Maße und Beschriftungen gehören zur Demo-Zeichnung.
 */
export const LEISTUNGEN = [
  { id: 'dach', name: 'Dach', text: 'Dachstuhl, Dämmung und Eindeckung. Das Haus bekommt seinen Schutz von oben.' },
  { id: 'rohbau', name: 'Rohbau', text: 'Fundament, Mauerwerk und Decken. Das Tragwerk steht, bevor der Ausbau beginnt.' },
  { id: 'sanierung', name: 'Sanierung', text: 'Bestand prüfen, Schäden beheben und das Gebäude für die nächsten Jahre herrichten.' },
];

export const SCHRIFTFELD = {
  projekt: 'Studie Steiner Bau (fiktiv)',
  massstab: '1 : 50',
  gezeichnet: 'NP Webdesign',
  // Datum der Zeichnung = Datum des Builds
  datum: new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' }),
};
