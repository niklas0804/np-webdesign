/**
 * Welt 04 · Haas & Sternfeld – Inhalte der Studie. Fiktiv: keine echte Kanzlei, keine Adresse, keine Telefonnummer, keine Domain,
 * keine erfundenen Personen mit Gesicht. Beträge und Fristen sind Beispielwerte und keine Rechtsauskunft.
 */
export const SCHLAGZEILE = 'Nichts dem Zufall überlassen.';
export const UNTERZEILE = 'Erbfolge, Gesellschaftsverträge und Steuern: gründlich geprüft, verständlich erklärt.';

/** Fußnoten: Nummer im Text, Marginalie rechts daneben (öffnet per Klick, Tippen oder Tastatur) */
export const MARGINALIEN = [
  { id: 'm1', text: 'Pflichtteile und Freibeträge hängen vom Einzelfall ab. Zahlen in dieser Studie sind Beispielwerte und keine Rechtsauskunft.' },
  { id: 'm2', text: 'Beispiel für ein Erstgespräch: 45 Minuten, schriftliche Zusammenfassung am selben Tag. Alle Angaben dieser Studie sind erfunden.' },
  { id: 'm3', text: 'Eine Erläuterung gehört bei Haas & Sternfeld zu jedem Entwurf: kurz, ohne Fachwörter, mit den Punkten, bei denen Sie entscheiden müssen.' },
];

/** Leitartikel in drei Spalten. `fn` verweist auf eine Marginalie. */
export const LEITARTIKEL = {
  titel: 'Wer rechtzeitig regelt, entscheidet selbst.',
  absaetze: [
    { initiale: true, text: 'enn ein Betrieb übergeben wird, entscheidet nicht der Zufall, wer was bekommt, sondern das, was vorher geregelt wurde. Das gilt für die Nachfolge im Familienunternehmen ebenso wie für die Gesellschafterliste oder die Steuererklärung des kommenden Jahres.', fn: 'm1' },
    { text: 'Haas & Sternfeld begleitet Unternehmerinnen und Unternehmer in der Oberpfalz bei Erbfolge, Gesellschaftsverträgen und Steuern. Die Beratung beginnt mit einem Gespräch und einer Bestandsaufnahme: Was ist geregelt, was ist offen, was kostet das Nichtstun?', fn: 'm2' },
    { text: 'Wir schreiben in ganzen Sätzen. Ein Vertragsentwurf kommt mit einer Erläuterung, die man ohne Wörterbuch versteht, und einer Liste der Punkte, bei denen Sie entscheiden müssen.', fn: 'm3' },
    { text: 'Viele Konflikte entstehen nicht aus bösem Willen, sondern aus Lücken: ein Gesellschaftsvertrag, der den Tod eines Partners nicht kennt, ein Testament, das zur Gesellschaft nicht passt, eine Schenkung ohne Blick auf die Steuer.' },
    { text: 'Deshalb betrachten wir Recht und Steuern gemeinsam. Eine gute Regelung hält vor dem Gesetz, vor dem Finanzamt und am Küchentisch der Familie.' },
  ],
};

export const ZITAT = { text: 'Ein Vertrag ist dann gut, wenn ihn alle Beteiligten verstehen, auch Jahre später.', quelle: 'Haas & Sternfeld, Leitsatz der Studie' };

/** Themenregister = Inhaltsverzeichnis. Seitenzahlen gehören zur Zeitungs-Anmutung (fiktiv). */
export const THEMEN = [
  { id: 'erbrecht', name: 'Erbrecht', seite: 3,
    text: 'Testament, Erbvertrag und vorweggenommene Erbfolge. Wir klären, wer Pflichtteile verlangen kann, und gestalten die Übergabe so, dass der Betrieb dabei nicht auseinanderbricht.',
    fragen: ['Wann ist ein Testament wirksam?', 'Was bleibt für den Betrieb, wenn Pflichtteile fällig werden?', 'Schenken oder vererben?'] },
  { id: 'gesellschaftsrecht', name: 'Gesellschaftsrecht', seite: 5,
    text: 'GmbH, GbR und Personengesellschaft: Gesellschaftsverträge, Gesellschafterwechsel und Nachfolgeklauseln. Verträge, die auch den schwierigen Fall regeln.',
    fragen: ['Was passiert, wenn ein Gesellschafter ausscheidet?', 'Wie wird der Anteil bewertet?', 'Wer entscheidet im Streitfall?'] },
  { id: 'steuern', name: 'Steuern', seite: 8,
    text: 'Einkommen-, Umsatz- und Erbschaftsteuer, Jahresabschluss und Betriebsprüfung. Wir planen vorausschauend und erklären, was die Zahlen für Ihre Entscheidungen bedeuten.',
    fragen: ['Welche Frist gilt für meine Erklärung?', 'Wie wirkt sich die Übergabe steuerlich aus?', 'Was erwartet mich bei einer Prüfung?'] },
];
