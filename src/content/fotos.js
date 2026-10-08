/**
 * Fotos, die Niklas besorgen muss (Schritt „Bilder“). Jeder Eintrag erscheint als klar markierter Bildplatzhalter mit
 * Motivbeschreibung (src/components/BildPlatzhalter.astro) – keine gezeichneten Ersatzgrafiken. Die Liste für Niklas entsteht
 * mit `node scripts/list-photos.mjs` (docs/fotoliste.md). Ein Foto ersetzen heißt: Datei nach public/images/welten/ legen
 * und den Platzhalter im Weltmodul durch ein <img> ersetzen; der Eintrag hier bekommt dann `status: 'da'`.
 *
 * ratio: Seitenverhältnis des Rahmens ('3-2', '4-3', '21-9', '4-5', '1-1', '16-9')
 */
export const FOTOS = {
  'w04-architektur': {
    welt: '04', ratio: '21-9', status: 'fehlt',
    titel: 'Architektur in Schwarzweiß',
    motiv: 'Treppenhaus oder Fassade eines älteren Geschäftshauses in der Oberpfalz, von unten gegen das Licht, strenge Linien. Schwarzweiß, hoher Kontrast, kein Mensch im Bild, keine lesbaren Schilder oder Firmennamen.',
    format: 'sehr breit 21:9, mindestens 2400 × 1030 px',
    einsatz: 'Welt 04, breiter Streifen unter dem Leitartikel; später Branchenseite Kanzlei',
    alt: 'Schwarzweißaufnahme einer Treppe in einem Geschäftshaus von unten gesehen',
    rechte: 'eigene Aufnahme oder lizenziert; Nutzungsrecht und Abbildungsrechte vorher klären',
  },
  'w04-dokumente': {
    welt: '04', ratio: '4-5', status: 'fehlt',
    titel: 'Dokumente und Schreibtisch',
    motiv: 'Nahaufnahme von Akten, Füller und einem aufgeschlagenen Gesetzbuch auf hellem Holz, Streiflicht von links. Schwarzweiß. Die Texte auf den Seiten dürfen nicht lesbar sein; keine Hände, keine Gesichter.',
    format: 'hoch 4:5, mindestens 1600 × 2000 px',
    einsatz: 'Welt 04, Marginalspalte neben dem Themenregister',
    alt: 'Schwarzweißaufnahme von Akten, Füller und aufgeschlagenem Buch auf einem Schreibtisch',
    rechte: 'eigene Aufnahme oder lizenziert; keine fremden Dokumente abbilden',
  },
};
