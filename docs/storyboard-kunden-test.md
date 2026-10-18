# Storyboard „Der Kunden-Test“ (Startseite, Sektion „Der Unterschied“)

Stand: 18. Oktober 2026. **Zur Freigabe, noch nichts umgesetzt.** Die Sektion auf der Seite ist weiter der bisherige Slider.

Die Standbilder liegen in `docs/screens/kunden-test/` (Desktop 1440 px, Mobil 390 px). Sie sind echtes HTML und CSS mit den vorhandenen Fassungen aus `src/home/Vergleich.astro` (Baukasten `vg-base`/`bk-*`, Maßarbeit `vg-mass`/`ms-*`) und lassen sich mit `NODE_PATH=$(npm root -g) node scripts/storyboard-shots.cjs` neu erzeugen (Quelle: `scripts/storyboard/kunden-test.html`).

| Datei | Inhalt |
|---|---|
| `uebersicht-desktop.png`, `uebersicht-mobil.png` | alle Standbilder mit Zeitangabe |
| `desktop-1.png` … `desktop-5.png` | Start, Hürde, Maßarbeit fertig, Baukasten gescheitert, Auflösung |
| `desktop-am-handy.png` | Desktop mit dem Umschalter „Am Handy“ (zwei Handykarten) |
| `mobil-1.png` … `mobil-5.png` | Start, Hürde, Nummer gefunden, Maßarbeit fertig, Auflösung |
| `pruefprotokoll.txt` | horizontale Überbreite je Standbild (überall 0 px) |

## Ablauf

**Desktop (Rennen, beide Fenster starten zugleich)**

| Zeit | Baukasten | Maßarbeit |
|---|---|---|
| 0 s | Platzhalterblöcke, Bild rutscht nach, Layout springt einmal | Seite ist sofort da, Zeiger wandert zu „Termin“ |
| etwa 1 s | geladen, Cookie-Hinweis erscheint | Klick „Termin“, Zeitfenster öffnen sich (Klicks 1) |
| etwa 2 s | Klick auf „Alle akzeptieren“ (Klicks 1) | Klick „Heute 17:15“, „Gebucht“, Label „Zwei Klicks. Termin steht.“ (Klicks 2 · Seiten 1) |
| 3 bis 7 s | Zeiger sucht im Menü, Kachel „Unser Angebot“, zurück, „Kontakt“, Formularfelder: Klicks 6 · Seiten 3 | wartet mit „Gebucht“ |
| etwa 7 s | Kontaktseite ohne Termine, Label „Kein Termin buchbar. Kunde schreibt eine Mail. Oder geht.“ | |
| danach | Auflösung: „6 Klicks“ gegen „2 Klicks“, darunter der Satz zur Konkurrenz | |

**Mobil (der Anruf, eine Karte, Szenen nacheinander)**

| Zeit | Szene |
|---|---|
| 0 bis 2 s | Baukasten lädt träge (Platzhalter) |
| 2 bis 6 s | Fingerpunkt scrollt durch Stockfoto, „Willkommen bei …“, Kacheln, „Über uns“, tippt einmal daneben, scrollt bis zum Footer; die Nummer steht klein und über der Daumenzone, rot umrandet; Label „Telefon erst ganz unten.“ (Taps 4 · Scrollen 3 ×) |
| 6 bis 6,6 s | Übergang: die Baukasten-Seite zerfällt in Blöcke und ordnet sich zur Maßarbeit neu (gestaffelt, transform und opacity, höchstens 600 ms) |
| 6,6 bis 8 s | Maßarbeit: großer Button „Anrufen“ in der Daumenzone, ein Tipp, Label „Ein Tipp. Ein Anruf.“ (Taps 1 · Scrollen 0 ×) |
| danach | Auflösung: „4 Taps“ gegen „1 Tap“ und der Satz zur Konkurrenz |

Zählregel (nur für die beiden Demo-Fassungen): Desktop „Klicks“ zählt jeden Mausklick, „Seiten“ die verschiedenen Seiten (Start, Angebot, Kontakt). Mobil „Taps“ zählt jeden Tipp, „Scrollen“ jede Wischbewegung.

## Entscheidungen im Entwurf (bitte bestätigen oder ändern)
1. **Reihenfolge der Desktop-Standbilder** nach Zeit: Hürde, Maßarbeit fertig (2 s), Baukasten gescheitert (7 s), Auflösung. Dein Auftrag nannte „gefunden/gescheitert“ vor „Maßarbeit fertig“; das passt nur zum Handy, wo die Szenen nacheinander laufen.
2. **Daumenzone** als untere 38 Prozent der Handykarte, grün getönt mit gestrichelter Kante und Beschriftung „Daumenzone“. Kontrast des Beschriftungschips ≥ 4,5:1 (weiße Schrift auf Dunkelgrün).
3. **Handyübergang** (Baukasten zerfällt, Maßarbeit setzt sich zusammen) ist als Standbild nicht dargestellt; er läuft als eigener Schritt von höchstens 600 ms.
4. **Auflösung** steht unter den Fenstern bzw. unter der Handykarte, nicht darüber; die Fenster bleiben im Endzustand sichtbar.
5. **„Am Handy“ auf dem Desktop** zeigt zwei Handykarten (je 300 px breit) mit den Endzuständen; die Szenen laufen dort wie auf dem Handy, nur nebeneinander.
6. Der Kontaktseiten-Weg im Baukasten (Kachel, Logo, Kontakt, zwei Felder) ist eine Annahme, damit 6 Klicks und 3 Seiten stimmen. Die Zahlen beschreiben nur diese Demo.

## Technischer Plan (nach Freigabe)
- Neu: `src/home/Vergleich.astro` wird zu „Der Kunden-Test“, Bausteine als eigene Komponente; JS (`src/motion/home/vergleich.js`) wird ersetzt und erst bei Annäherung geladen. Kein ScrollTrigger, nur Zeitleisten mit transform und opacity, Start einmal bei 60 Prozent Sichtbarkeit.
- Entfernt: Trennlinie, Griff, Range-Regler, Marker, nummerierte Listen samt CSS (`vg-divider`, `vg-handle`, `vg-range`, `vg-marker`, `vg-notes`, `vg-list`) und `Vergleich`-Texte `BASE`/`MASS`.
- Platz vorab reservieren (festes Seitenverhältnis, `aspect-ratio` und `min-height`), damit es keinen Layout-Shift gibt.
- Ruhige Ansicht und `prefers-reduced-motion`: die Standbilder der Endzustände beider Fassungen mit Labels und Zählern.
- Steuerung: Segmented Control „Baukasten | Maßarbeit | Nochmal“ (44 px), Pause-Button, aria-live je Szene; kein Scroll-Hijacking.
- Darunter „Warum sich das lohnt“ (drei Aussagen) mit zeichnender Linie, dann „Projekt anfragen“ und „Alle neun Beispiele ansehen“.
- Prüfungen: `check-site`, `check-transitions`, `axe`, Bildschirmaufnahmen Desktop und Mobil.
