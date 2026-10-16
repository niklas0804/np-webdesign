# Geparkte Dateien (werden nicht ausgeliefert)

`ueber-mich/`: Porträt von Niklas für die Komponente `src/components/UeberMich.astro`.
„Über mich“ ist vorerst abgeschaltet (`SITE_FLAGS.ueberMich` in `src/config/site.js`, Auftrag vom 11. Oktober 2026).
Die Bilder liegen deshalb **außerhalb von `public/`** und kommen nicht in den Build.

Zum Wiedereinschalten: Schalter auf `true` setzen, die vier Dateien nach `public/images/` zurückkopieren,
Menü-Eintrag und Seitenabschnitt erscheinen dann wieder, und die Datenschutzerklärung muss um den Hinweis auf das Foto ergänzt werden.
