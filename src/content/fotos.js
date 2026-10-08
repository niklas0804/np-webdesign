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
  'w05-kopf': {
    welt: '05', ratio: '21-9', status: 'fehlt',
    titel: 'Gesamtansicht im Studio',
    motiv: 'Ein restaurierter Roadster, Baujahr um 1960, seitlich im Studio auf dunkelgrünem Hintergrund, weiches Streiflicht entlang der Karosserie, Chrom spiegelt die Lichtkante. Kein Kennzeichen, keine Personen, kein sichtbarer Herstellername.',
    format: 'sehr breit 21:9, mindestens 2560 × 1100 px',
    einsatz: 'Welt 05, Kopfbild unter dem Titel',
    alt: 'Restaurierter Oldtimer-Roadster im Studio vor dunkelgrünem Hintergrund',
    rechte: 'eigene Aufnahme; Fahrzeughalter und Abbildungsrechte vorher klären',
  },
  'w05-strecke-1': {
    welt: '05', ratio: '21-9', status: 'fehlt',
    titel: 'Querfahrt 01 · Front und Scheinwerfer',
    motiv: 'Frontpartie im Dreiviertelblick: runder Scheinwerfer, Chromstoßstange, Kühlergrill. Dunkelgrüner Studiohintergrund, Reflexe auf dem Lack. Kein Kennzeichen, kein Herstellername.',
    format: 'sehr breit 21:9, mindestens 2400 × 1030 px',
    einsatz: 'Welt 05, Bildstrecke der Querfahrt, Band 01',
    alt: 'Frontpartie eines Oldtimers mit rundem Scheinwerfer und Chromstoßstange',
    rechte: 'eigene Aufnahme oder lizenziert; Abbildungsrechte klären',
  },
  'w05-strecke-2': {
    welt: '05', ratio: '21-9', status: 'fehlt',
    titel: 'Querfahrt 02 · Emblem',
    motiv: 'Nahaufnahme eines Chromemblems oder einer Kühlerfigur, geringe Schärfentiefe, Lichtkante auf dem Chrom. Das Emblem darf keinem echten Hersteller gehören (neutrales oder eigenes Zeichen verwenden oder unkenntlich machen).',
    format: 'sehr breit 21:9, mindestens 2400 × 1030 px',
    einsatz: 'Welt 05, Bildstrecke der Querfahrt, Band 02',
    alt: 'Nahaufnahme eines verchromten Emblems auf grünem Lack',
    rechte: 'eigene Aufnahme; Markenrechte am Emblem beachten',
  },
  'w05-strecke-3': {
    welt: '05', ratio: '21-9', status: 'fehlt',
    titel: 'Querfahrt 03 · Tacho und Armaturenbrett',
    motiv: 'Rundinstrumente, Tacho mit elfenbeinfarbenem Zifferblatt, Chromringe, Holz oder Lack des Armaturenbretts. Warmes Licht, dunkles Umfeld. Keine lesbaren Herstellerlogos.',
    format: 'sehr breit 21:9, mindestens 2400 × 1030 px',
    einsatz: 'Welt 05, Bildstrecke der Querfahrt, Band 03',
    alt: 'Rundinstrumente und Tacho im Armaturenbrett eines Oldtimers',
    rechte: 'eigene Aufnahme; keine fremden Logos abbilden',
  },
  'w05-strecke-4': {
    welt: '05', ratio: '21-9', status: 'fehlt',
    titel: 'Querfahrt 04 · Ledernaht',
    motiv: 'Nahaufnahme einer handgenähten Naht an einem Ledersitz oder einer Türverkleidung, Kontrastgarn in Elfenbein, Streiflicht betont das Korn des Leders.',
    format: 'sehr breit 21:9, mindestens 2400 × 1030 px',
    einsatz: 'Welt 05, Bildstrecke der Querfahrt, Band 04',
    alt: 'Handgenähte Naht an einem Ledersitz mit elfenbeinfarbenem Garn',
    rechte: 'eigene Aufnahme; keine Personen im Bild',
  },
  'w05-vorher': {
    welt: '05', ratio: '16-9', status: 'fehlt',
    titel: 'Vorher: Fahrzeug vor der Restaurierung',
    motiv: 'Dasselbe Fahrzeug wie „Nachher“, vor der Arbeit: matter, stellenweise durchgerosteter Lack, Staub, ausgeblichene Chromteile. Gleicher Kamerastandpunkt und gleiche Brennweite wie das Nachher-Bild, Werkstatthalle als Hintergrund.',
    format: 'quer 16:9, mindestens 2000 × 1125 px, identischer Ausschnitt wie „Nachher“',
    einsatz: 'Welt 05, Vorher-Nachher-Schieber, linke Seite',
    alt: 'Oldtimer vor der Restaurierung mit mattem, rostigem Lack',
    rechte: 'eigene Aufnahme; Fahrzeughalter und Abbildungsrechte klären',
  },
  'w05-nachher': {
    welt: '05', ratio: '16-9', status: 'fehlt',
    titel: 'Nachher: Fahrzeug nach der Restaurierung',
    motiv: 'Dasselbe Fahrzeug wie „Vorher“ mit identischem Kamerastandpunkt: frischer grüner Lack, polierter Chrom, saubere Fugen. Gleicher Hintergrund (Werkstatthalle) wie beim Vorher-Bild.',
    format: 'quer 16:9, mindestens 2000 × 1125 px, identischer Ausschnitt wie „Vorher“',
    einsatz: 'Welt 05, Vorher-Nachher-Schieber, rechte Seite',
    alt: 'Derselbe Oldtimer nach der Restaurierung mit glänzendem grünem Lack',
    rechte: 'eigene Aufnahme; Fahrzeughalter und Abbildungsrechte klären',
  },
};
