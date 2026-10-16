# Bildschirmfotos (Stand Teil B der Kurskorrektur vom 11. Oktober 2026)

Desktop 1440 × 900 (`*-d.png`) und Mobil 390 × 844 (`*-m.png`), erzeugt mit `scripts/screenshots.cjs` aus dem Produktions-Build (`dist`).
Neu erzeugen: `npm run build && NODE_PATH=$(npm root -g) node scripts/screenshots.cjs`
(mit `ONLY='uebergang-bon'` nur passende Aufnahmen, ohne etwas zu löschen).

**`/welten`** (neun Welten, Werkplan 4 × 3 mit dem zehnten Platz „Ihr Betrieb“, Finale):

| Nr. | Moment |
| --- | --- |
| `01-werkplan` | Werkplan mit neun Studien, Zentrum über zwei Spalten, Platz „Ihr Betrieb“ mit Cursor |
| `02-t00-zelle-waechst` | Die Zelle von Welt 01 wächst auf Viewport-Größe |
| `03-welt01-einstieg` … `19-welt09-einstieg` (ungerade Nummern ab 03) | Einstieg in Welt 01 bis 09 |
| `04`, `06`, `08`, `10`, `12`, `14`, `16`, `18`, `20` mit `-anfang`, `b-…-mitte`, `c-…-landung` | Die neun Übergänge an drei Stellen: Bon, Goldlinie, Prüfstempel → rote Linie, Zierlinie, Scheinwerfer, Kreise → Messkreise, Messraster → Kalender, Wasser, Fenster → zehnter Platz |
| `21-finale-zehnter-platz`, `22-finale-rueckzoom`, `23-finale-einladung` | Finale: Fenster im zehnten Platz, Rückzoom, „Neun Welten. Die zehnte gehört Ihnen.“ |

**Startseite** (`a-start-*`): derzeit die Zwischenfassung (Hero, Warum, Arbeitsweise, Kontakt, FAQ); sie wird in Teil C ersetzt.

Unterordner `check/`: Kontaktbögen und Messwerte von `tools/check-transitions.cjs` (Teil A, vorher/nachher).
