/**
 * Messwerte der Fallstudie 00 (Auftrag 13. November 2026, 2.8). Nur gemessene Zahlen, jede mit Methode.
 * Vor jeder Änderung der Seite neu messen und `stand` anpassen. Niemals Zahlen von Hand schätzen.
 * Quellen: Ladegewicht und Fremdanfragen/Cookies aus `node tools/check-site.cjs dist` (lokaler Build, Chromium),
 * Lighthouse aus der CI-Vorschau (Median aus drei Läufen, Branch `vorschau-build`, Commit 06e2527).
 */
export const MESSWERTE = {
  stand: '13. November 2026',
  zeilen: [
    { was: 'Ladegewicht Startseite', wert: '529 KB', methode: 'Seite, CSS, JavaScript und Schriften beim ersten Aufruf, unkomprimiert, Fenster 1440 px (tools/check-site.cjs)' },
    { was: 'Ladegewicht Leistungen', wert: '150 KB', methode: 'wie oben' },
    { was: 'Ladegewicht Beispiele (/welten)', wert: '828 KB', methode: 'wie oben' },
    { was: 'Lighthouse Leistung, Handy, Startseite', wert: '99 von 100', methode: 'Median aus drei Läufen, Lighthouse 12, simuliertes Handy, GitHub-Actions-Rechner' },
    { was: 'Lighthouse Leistung, Handy, Leistungen', wert: '100 von 100', methode: 'wie oben' },
    { was: 'Lighthouse Leistung, Handy, Beispiele (/welten)', wert: '85 von 100', methode: 'wie oben; die Seite schwankt zwischen Läufen (frühere Messungen: 73 bis 81)' },
    { was: 'Lighthouse Barrierefreiheit, Best Practices, SEO', wert: 'je 100 von 100', methode: 'wie oben, auf Startseite, Leistungen und /welten' },
    { was: 'Größter sichtbarer Inhalt (LCP), Startseite', wert: '2,1 s', methode: 'wie oben, simuliertes Handy mit gedrosseltem Netz' },
    { was: 'Anfragen an fremde Server', wert: '0', methode: 'alle 16 Seiten in 5 Ansichten (Desktop, Handy, 320 px, Touch) und ohne JavaScript geprüft (tools/check-site.cjs)' },
    { was: 'Cookies', wert: '0', methode: 'wie oben' },
    { was: 'Verstöße gegen Barrierefreiheitsregeln', wert: '0', methode: 'axe-core (WCAG 2.2 AA) auf Startseite, Beispielen, jeder Welt und allen Unterseiten (tools/axe-check.cjs)' },
    { was: 'Seitliches Scrollen', wert: 'keines', methode: 'ab 320 px Breite geprüft (tools/check-site.cjs)' },
  ],
  nichtGemessen: [
    'Echte Geräte, Safari und Firefox: Ich habe nur mit einem Chromium-Browser geprüft.',
    'Bedienung mit Screenreader (VoiceOver, NVDA): steht noch aus.',
    'Besucherzahlen und Anfragen: Ich erhebe sie nicht und kann deshalb keine Wirkung belegen.',
  ],
};
