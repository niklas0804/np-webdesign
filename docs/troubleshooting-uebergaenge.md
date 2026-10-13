# Übergänge: Befund, Ursachen, Recherche, Lösung

Stand 13. Oktober 2026, Branch `claude/phase-3`, Teil A des Auftrags „Übergänge reparieren“.
Prüfwerkzeug: `tools/check-transitions.cjs` (dauerhaft im Repo). Kontaktbögen: `docs/screens/check/`.

> **Ehrlicher Hinweis zur Recherche.** In dieser Arbeitsumgebung sind die Dokumentationsseiten (gsap.com, MDN) nicht direkt abrufbar
> (kein DNS-Zugang), nur Suchergebnisse mit Zusammenfassungen. Wo unten „Quelle: GSAP-Code“ steht, habe ich das Verhalten im
> mitgelieferten Quelltext `node_modules/gsap/ScrollTrigger.js` (Version 3.15) nachgelesen, das ist verbindlicher als jede Zusammenfassung.
> Alles, was nur auf Suchzusammenfassungen beruht, ist als solches markiert. Vor dem Live-Gang sollte ein Mensch die Punkte mit „(prüfen)“
> gegen die Originalseiten lesen.

---

## 1 · Befund (Vorher, Build vom 10. Oktober)

Niklas: „Bei Halmberg sieht man die Seite, scrollt man weiter, wird alles gelb, scrollt man weiter, sieht man wieder die Seite.“

Die Messung mit dem neuen Werkzeug (siehe Abschnitt 5) bestätigt das Muster; die genauen Zahlen für alle drei Ansichten stehen in Abschnitt 6.

Kurz: Jeder Übergang bestand aus drei hintereinander liegenden Strecken: eine Bildschirmhöhe, in der die leere Bühne in der
Grundfarbe der alten Welt von unten hereinfährt; die eigentliche Szene (`--len` svh); eine Bildschirmhöhe, in der die Bühne in der
Zielfarbe nach oben hinausfährt, bevor die neue Welt von unten kommt. Zwei von drei Strecken zeigten also nur Farbe.

## 2 · Ursachen: bestätigt oder widerlegt

| Nr. | Vermutung aus dem Auftrag | Ergebnis |
| --- | --- | --- |
| A2.1 | Leere Bühne beim Hineinscrollen: Timeline startet erst bei `top top`, davor steht der Staffelstab auf `autoAlpha: 0` | **bestätigt.** Die Bühne (`.t-stage`, `background: var(--from)`) war eine volle Bildschirmhöhe sichtbar, während die Timeline auf Fortschritt 0 stand. Betraf jeden Übergang. |
| A2.2 | Leere Bühne beim Hinausscrollen: am Ende steht die Zielfarbe ohne Inhalt, danach erst schiebt sich die neue Welt herein | **bestätigt.** Gleiche Ursache in Gegenrichtung: Die Bühne (Endzustand = Zielfarbe) lief nach oben hinaus, bevor die neue Welt unter ihr hervorkam. |
| A2.3 | Kopfzeile überdeckt Inhalt auf dem Handy | **bestätigt.** `.frame` hatte weder Fläche noch Ausblenden. Der Test findet bei 390 × 844 hunderte Positionen, an denen Text unter Monogramm, Zähler und „Menü“ liegt (Abschnitt 6). |
| A2.4 | Nachladen der Weltmodule verschiebt die Seite beim Scrollen (`loadWorlds()` → `ScrollTrigger.refresh()`) | **bestätigt, messbar.** Beim Scrollen verschob sich der gesamte Rest der Seite: **+268 px** (Handy) bzw. **+302 px** (Desktop) sobald das Modul von Welt 01 geladen war, später **−377 px** / **−252 px** (Welt 09/10), dazu Sprünge von 9–44 px bei Welt 07/08 und −14/−23 px im Finale. Gemessen mit `probe-shift`: Dokumentposition aller Abschnitte vor und nach jedem Scrollschritt. Das ist Springen mitten im Scrollen, und es verschiebt Start und Ende jeder Szene darunter. |
| A2.5 | „WERKPLAN“ statt „WELT 01“ am Ende von Welt 01 (Desktop) | **nicht reproduzierbar.** Weder beim langsamen Durchscrollen noch beim Sprung ans Ende der Welten 01, 03, 05, 09 (Handy und Desktop) zeigt der Zähler etwas anderes als den richtigen Wert. Vermutlich ein Testartefakt (Screenshot während der Lenis-Glättung). Der Test prüft jetzt dauerhaft, ob der Zähler zum Abschnitt bei 55 % der Bildschirmhöhe passt, damit es auffällt, falls es doch auftritt. |

Zusätzlich gefunden: Zwischen Finale und Kontakt lag ein eigener Standard-Übergang (Bühne mit 1,5 px Linie), obwohl das Finale selbst in
den Kontakt hineinwächst. Das war eine volle Bildschirmhöhe Leere ohne Inhalt (Messung: 1,0 Bildschirmhöhen am Handy). Der Übergang ist entfernt.

## 3 · Recherche

### GSAP ScrollTrigger

- **`pin` gegenüber CSS-`sticky`.** `pin` setzt das Element während des Bereichs auf `position: fixed` und legt einen Platzhalter
  (Spacer) an; die Seite wird dadurch um die Pin-Länge länger (`pinSpacing`). `sticky` bleibt im Dokumentfluss und braucht
  keinen Spacer, hängt aber an der Höhe des Elternelements und bricht, wenn ein Vorfahre `overflow: hidden|auto|scroll` hat.
  Diese Seite nutzt durchgehend `sticky`; es gibt kein GSAP-`pin` und damit keine Spacer, die nachträglich entstehen und Höhen verschieben.
- **`pinSpacing`** (Standard `true`): Spacer, der den folgenden Inhalt nach unten schiebt. `false` oder `"margin"` verändern das.
  Hier nicht verwendet, weil die Überlappung mit negativen Rändern geregelt ist.
- **`anticipatePin`** (Standard 0): lässt den Pin bei schnellem Scrollen etwas früher greifen, gegen kurzes Aufblitzen des ungepinnten Elements.
  Quelle: GSAP-Code, Zeilen um 1672. Nur für `pin`, hier nicht relevant (nur `sticky`).
- **`refreshPriority`** und **`ScrollTrigger.sort()`**: Beim Refresh werden Trigger nach `refreshPriority` (höher zuerst), dann nach
  Startposition sortiert (Quelle: GSAP-Code, `ScrollTrigger.sort`, `_sortY`). Wer alle Trigger beim Start in Dokumentreihenfolge anlegt, braucht
  das fast nie; ein einmaliges `ScrollTrigger.sort()` vor dem ersten Refresh stellt die Reihenfolge sicher. **Umgesetzt.**
- **`invalidateOnRefresh`**: Werte, die als Funktion angegeben sind, werden bei jedem Refresh neu berechnet. Alle Übergangs-Timelines nutzen das,
  Start und Ende sind Funktionen der gemessenen Bühnenhöhe.
- **`ScrollTrigger.config({ ignoreMobileResize: true })`**: Die Größenänderung durch ein- und ausfahrende Adressleiste löst keinen Refresh aus.
  Ist gesetzt. Nebenwirkung laut Forum (Suche, prüfen): Start/Ende können minimal ungenau sein, dafür springt nichts.
- **`ScrollTrigger.normalizeScroll(true)`**: verlagert das Scrollen auf den JavaScript-Thread, verhindert das Ein-/Ausfahren der
  Adressleiste und Überscrollen, hält Pins ruhig. Nebenwirkungen auf iOS laut Foren (Suche, prüfen): weicht vom nativen Gefühl ab, Probleme im
  Stromsparmodus, bei Eingabefeldern und beim Ziehen zum Aktualisieren. **Nicht eingesetzt**: Die Seite hat Formulare, und die Lösung braucht es nicht.
- **`fastScrollEnd`** und **`preventOverlaps`** (seit 3.8): Beide räumen Animationen auf, die beim Springen oder schnellem Scrollen hängen
  bleiben (Quelle: GSAP-Code, Zeilen um 1699 und 1781). Die Übergänge sind `scrub`-Timelines (Fortschritt = Scrollposition), die bei jedem
  Sprung sofort in den richtigen Zustand springen. Beide Optionen betreffen ausgelöste (nicht gescrubbte) Animationen und sind hier nicht nötig.
- **Trigger in Dokumentreihenfolge anlegen**: Nur Pins und Spacer verändern Höhen. Weil hier nichts pinnt, genügt eine Reihenfolge, die Messung und Refresh
  nur einmal macht, bevor `data-ready` gesetzt wird.

### GSAP Flip

`Flip.getState(elemente)` merkt Position, Größe, Drehung; nach einer DOM-Änderung bringt `Flip.from(state)` die Elemente optisch an die alte
Stelle zurück und animiert zur neuen (`absolute`, `scale`, `nested` regeln Layout und Skalierung). Das taugt für die Übergabe von echten Elementen
(Staffelstab). Im Plugin-Paket, das in `node_modules/gsap` liegt, ist Flip enthalten und wird von der Seite nur bei Bedarf geladen
(Teil B/C: Musterkoffer, Staffelstäbe der Übergänge). In Teil A ist es noch nicht im Einsatz.

### MDN: `position: sticky` und `overflow`

Ein sticky-Element klebt am nächsten Vorfahren mit Scroll-Mechanismus (`overflow` ungleich `visible`, auch `hidden`). Setzt man `overflow: hidden`
auf einen Vorfahren, bricht `sticky`. Abhilfe: `overflow: clip`, das nicht scrollt und keinen Scroll-Container erzeugt.
Das Element klebt nur innerhalb seines Containers: Ist der Container so hoch wie das Element, gibt es keinen Weg. Die Seite nutzt `overflow: clip` für
Abschnitte mit klebender Bühne (siehe `.interlude`). (Quelle: Suchzusammenfassungen, prüfen.)

### MDN: `svh`, `lvh`, `dvh`

`svh` ist die kleine Viewport-Höhe (Adressleiste eingeblendet), `lvh` die große (eingefahren, entspricht dem alten `vh`), `dvh` die dynamische, die
sich beim Ein-/Ausfahren fortlaufend ändert. Für Layouts, die beim Scrollen nicht springen dürfen, ist `svh` richtig; `dvh` löst Layout-Änderungen
während des Scrollens aus. Die Seite rechnet durchgängig mit `svh`, die Übergangsbühne misst ihre eigene Höhe (= 100 svh) und leitet daraus die
Scrollstrecken ab, nicht aus `innerHeight`, das sich mit der Adressleiste ändert. Unterstützung: Safari ab 15.4, Chrome ab 108, Firefox ab 101 (Suche, prüfen).

### Cross-Document View Transitions

`@view-transition { navigation: auto; }` im CSS beider Seiten lässt den Browser bei gleich-originären Navigationen eine Überblendung zeichnen;
`view-transition-name` verbindet Elemente über beide Seiten; `pageswap` und `pagereveal` sind die Ereignisse zum Feinsteuern. Es gibt keinen
JavaScript-Aufruf, der sie startet. Stand der Unterstützung laut Suche: Chrome/Edge ab 126, Safari ab 18.2, Firefox: nicht unterstützt
(Stand der gefundenen Quellen; 2026-Angaben für Firefox konnte ich nicht finden, **prüfen**). Ohne Unterstützung navigiert der Browser normal, es ist
reine Verbesserung. Das gehört zu Teil C (Klick auf eine Musterkoffer-Karte → `/welten#anker`).

Quellen (Suchergebnisse dieser Sitzung):
[GSAP refresh()](https://gsap.com/docs/v3/Plugins/ScrollTrigger/refresh()),
[GSAP 3.8 Release Notes](https://gsap.com/blog/3-8/),
[GSAP 3.10 Release Notes (normalizeScroll)](https://www.gsap.com/blog/3-10/),
[GSAP Flip](https://gsap.com/docs/v3/Plugins/Flip),
[Chrome: View Transitions](https://developer.chrome.com/docs/web-platform/view-transitions?hl=en),
[Chrome: Cross-document](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document?hl=zh-cn),
[caniuse: sticky](https://caniuse.com/css-sticky).

## 4 · Lösung (Zielarchitektur)

**Leitregel: Es gibt keinen Moment, in dem der Bildschirm nur Grundfarbe zeigt.** Ein Übergang ist eine Überblendung zwischen zwei
Inhalten, kein Raum zwischen ihnen.

1. **Die Bühne liegt unter den Welten und wird von ihnen auf- und zugedeckt.**
   - `.transition` ist `(300 + len) svh` hoch und ragt per `margin-block: -100svh` je 100 svh in die letzte Seite der alten und die erste der neuen Welt.
   - Alle `main > section` bekommen `position: relative; z-index: 1` und decken die Bühne mit eigenem Grund ab; die Bühne (`sticky`, 100 svh) liegt bei `z-index: 0`.
   - Ablauf beim Scrollen: Die alte Welt füllt mit ihrer letzten Seite den Viewport und verdeckt die Bühne vollständig. Sie zieht nach oben weg und
     deckt die Bühne von unten her auf. Dann steht die Bühne `len` svh frei. Dann schiebt sich die neue Welt von unten darüber.
     In keiner Phase füllt nur die Bühne den Viewport in einer Farbe: davor und danach ist echter Inhalt zu sehen, in der Mitte läuft die Szene.
   - Der Abstand zwischen alter und neuer Welt im Dokument bleibt `100 + len` svh, die Seitenlänge ändert sich nicht.
2. **Die Szene läuft über den ganzen Bereich.** Start und Ende der Timeline liegen 30 svh vor dem freien Stehen und 30 svh danach
   (`LEAD`), also dann, wenn die alte Welt noch 30 svh oben deckt bzw. die neue schon 30 svh von unten. Es gibt keinen toten Fortschritt 0.
   Start und Ende sind Funktionen der Bühnenhöhe (`stage.offsetHeight / 100` = 1 svh), neu berechnet bei jedem Refresh.
3. **Alle Weltmodule werden beim Start geladen und in Dokumentreihenfolge eingerichtet.** Die Module sind 1–3 KB groß; das Nachladen war nicht der Nutzen,
   sondern die Ursache für die Verschiebung. Genau ein `ScrollTrigger.sort()` und ein `ScrollTrigger.refresh()` vor `data-ready`. SplitText von Welt 04 ist
   jetzt ein statischer Import. Die Refresh-Aufrufe beim Aufklappen (Welt 01, Brotdetails) bleiben, sie passieren nur auf Klick.
4. **Kopfzeile auf Handy und im ruhigen Modus.** Neue Fläche `.frame-strip` (60 px, Grundfarbe der Welt als `--strip`, Haarlinie).
   Beim Abwärtsscrollen (ab 90 px, ab 6 px Bewegung) blendet sie samt Monogramm, Zähler und Menü nach oben aus (`data-header="hidden"`),
   beim Aufwärtsscrollen kommt sie zurück. `rahmen.js` setzt `--strip` bei jedem Abschnittswechsel (auch in der Mitte eines Übergangs, wo der Rahmen die Farbe wechselt).
5. **Finale → Kontakt**: kein eigener Übergang mehr.

Was Teil A **nicht** tut: die inhaltliche Neugestaltung der einzelnen Übergänge (Staffelstab als echtes Element per Flip, neue Nachbarn). Das ist Teil B.
Die bestehenden Szenen laufen in der neuen Geometrie unverändert weiter, nur über einen längeren Bereich.

## 5 · Das Prüfwerkzeug

`NODE_PATH=$(npm root -g) node tools/check-transitions.cjs [--label …] [--view mobil,schmal,desktop] [--step 5] [--no-fast] [--no-back] [--perf] [--section t-welt-01-welt-02]`

- Ansichten 390 × 844, 375 × 667 (beide Touch, Modus „mobile“) und 1440 × 900 (Modus „desktop“).
- Schritte von 5 % der Bildschirmhöhe durch die ganze Seite, 110 ms Wartezeit, Aufnahme ohne Rahmen-Ebene (der Rahmen wird für die Aufnahme ausgeblendet).
- **Leer**: Standardabweichung der Helligkeit unter 3 **oder** mindestens 98,5 % der Pixel in einer Farbe. Kalibriert am Vorher-Lauf: Die Bilder, die Niklas
  „komplett leer“ nennt, liegen bei σ = 0–7 mit 99 % einer Farbe; der Schwellwert trennt sie sauber von Bildern mit einer Zeile Text.
  **Abnahme**: In keinem Übergang mehr als 10 % Bildschirmhöhe am Stück (mehr als zwei Schritte).
- **Überdeckung**: Jeder Textknoten im Inhalt wird gegen die Rechtecke von Monogramm, Menü, Anfrage-Knopf, Zähler getestet, solange diese sichtbar sind.
  Trägt die Kopfzeile eine deckende Fläche (`.frame-strip`), ist Text dahinter verdeckt und zählt nicht.
- **Zähler**: Der angezeigte Weltzähler muss zum Abschnitt bei 55 % der Bildschirmhöhe passen (ohne ±8 % Toleranz an den Grenzen).
- **Zurückscrollen**: dieselben Positionen von unten; mittlere Abweichung zum Hinweg über 6 (von 255) gilt als Zustandsfehler.
- **Schnelles Wischen**: Touch-Wisch mit Fling über CDP (`Input.dispatchTouchEvent`: 55 % Bildschirmhöhe in ~130 ms; `Input.synthesizeScrollGesture` bewegt mit Typ „touch“ in Headless-Chromium nichts), am Desktop große Radschritte; nach jedem Stopp dieselben Prüfungen und Vergleich mit dem langsamen Weg.
- **Leistung** (`--perf`): vierfache CPU-Drosselung, gleichmäßiges Durchscrollen, Long Tasks über 50 ms und Layout-Shifts.
- Ausgabe: `docs/screens/check/uebergaenge-<label>-<ansicht>.jpg` (Übergänge im 10-%-Raster), `befunde-<label>-<ansicht>.jpg` (alle markierten Bilder), `report-<label>-<ansicht>.json`.

## 6 · Vorher / Nachher

Gleiche Schwellen und gleiche Schritte (5 % der Bildschirmhöhe) für beide Stände. „Vorher“ ist der Build von `main` (PR #2), „Nachher“ der aktuelle
Stand von `claude/phase-3`. „Leerstrecke“ heißt: mehr als 10 % Bildschirmhöhe am Stück fast einfarbig, solange die Übergangsbühne sichtbar ist.

| Messung | 390 × 844 vorher | nachher | 375 × 667 vorher | nachher | 1440 × 900 vorher | nachher |
| --- | --- | --- | --- | --- | --- | --- |
| Leerstrecken in Übergängen | 2 | **1** ¹ | 2 | **0** | 21 | **5** ¹ |
| Längste Leerstrecke (Bildschirmhöhen) | 1,05 | 0,15 | 1,04 | – | 1,25 | 1,25 ¹ |
| Schritte mit Text unter Rahmenelementen | 756 | **0** | 982 | **0** | 600 | **0** |
| Zähler falsch | 0 | 0 | 0 | 0 | 0 | 0 |
| Hin- ≠ Rückweg in Übergängen | 24 | **1** | 23 | **0** | 0 | 0 |
| Schnelles Wischen: leer / Überdeckung / Abweichung zum selben Punkt langsam angefahren ² | 1 / 10 / 0 | **0 / 0 / 0** | 1 / 10 / 2 | **0 / 0 / 1** | 13 / 10 / 0 | **4 ¹ / 0 / 0** |

² Eigener Lauf mit dem endgültigen Vergleichsverfahren (einmal 300 px zurück, dann in einem Schritt zur selben Position). Handy: 75–102 Stopps je Ansicht.

¹ Alle verbleibenden Leerstrecken liegen in Übergängen, die in Teil B entfallen: `welt-03>warum`, `welt-06>arbeitsweise`, `arbeitsweise>welt-07`,
`welt-10>finale` (Zwischenspiele und Labor werden entfernt). Die Übergänge, die bleiben (Bon, Goldlinie, Zierlinie, Scheinwerfer, Messraster, Wasser), haben in allen
drei Ansichten keine Leerstrecke mehr. Außerhalb von Übergängen bleiben kurze Leerstellen im Einstieg (Hero 0,25 vh, Wachstum der Zelle 0,5 vh am Desktop) und am Ende
des Finales (0,2–0,25 vh). Beides sind Szenen, die Teil C ersetzt.

Weitere Zahlen:

- **Leistung** (vierfache CPU-Drosselung, gleichmäßiges Durchscrollen der ganzen Seite): Long Tasks über 50 ms **24 → 17** (Handy), **25 → 18** (Desktop);
  längster Block **681 ms → 294 ms**. **Das Ziel „keine Long Tasks über 50 ms“ ist damit nicht erreicht.** Der Rest verteilt sich über die ganze Seite
  (auch außerhalb der Übergänge) und stammt aus Weltmodulen und Rendern der Szenen; das gehört in die Optimierung von Teil D (Lighthouse).
- **Layout-Shift** beim Scrollen: **0,32 → 0,26** (Handy), **0,26 → 0,19** (Desktop). Die verbleibenden Verschiebungen kommen aus dem Zwischenspiel III
  (`.t-ex`, absichtliches „Auseinanderfallen“ der Seite) und Welt 10 (`w10-bruch`), beides entfällt in Teil B. Die Verschiebung in Welt 07 (Kennzahlen zählten hoch und
  brachen dabei um) ist behoben, ebenso die Seitenverschiebung durch nachladende Module (A2.4).
- **Seitenverschiebung durch Nachladen** (A2.4): vorher +268 px / +302 px nach dem ersten Weltmodul, danach −377 px / −252 px; nachher keine (alle Module beim Start, ein Refresh).
- `tools/check-site.cjs` (14 Seiten × 5 Ansichten, ohne JavaScript): bestanden. `tools/axe-check.cjs`: 0 Verstöße.

Kontaktbögen (im Ordner `docs/screens/check/`):

| Datei | Inhalt |
| --- | --- |
| `uebergaenge-vorher-mobil.jpg`, `-schmal`, `-desktop` | alle Übergänge im 10-%-Raster, Stand vorher |
| `uebergaenge-nachher-mobil.jpg`, `-schmal`, `-desktop` | dasselbe, Stand nachher |
| `befunde-vorher-*.jpg` / `befunde-nachher-*.jpg` | alle markierten Bilder (leer, Überdeckung, Hin ≠ Rück), rot umrandet |
| `report-vorher-*.json` / `report-nachher-*.json` | alle Messwerte |

## 7 · Zusätzlich gefunden und behoben

- **Hin ≠ Rück (Hysterese).** `invalidateOnRefresh` lässt ScrollTrigger bei jedem Refresh die Animation zurücksetzen (`animation.revert().invalidate()`)
  und nur Tweens mit *ausdrücklichem* `immediateRender` neu rendern (Quelle: GSAP-Code, `ScrollTrigger.js` um Zeile 1319). Alle Tweens, die später als bei 0 beginnen, standen danach
  im Grundzustand des CSS, bis der Scroll sie erreichte, und sprangen dann; beim Zurückscrollen standen sie richtig. Sichtbar zum Beispiel an den Kalenderzellen
  Welt 07 → 08: vorwärts stand der fertige Kalender da und fiel dann auseinander. Behoben mit `onRefresh: tl.progress(1).progress(p)`: einmal ganz durchspielen, damit alle Startzustände feststehen.
- **Messraster-Übergang (Desktop).** Beim Farbwechsel des Grundes fielen Rahmenlinie und Grund in einem Grau zusammen (Kontrast ≈ 0). Rahmen und Schrift gehen jetzt über Weiß.
- **Gewicht der Staffelstäbe.** Haarlinien auf einem 1440 × 900 großen Bildschirm gelten als leer. Goldlinie (Messingschiene 14 px), Zierlinie (10 px), Scheinwerferring (9 px),
  Kalenderzellen (3 px mit Füllung) und die Zahl „12.400“ sind kräftiger.

## 8 · Offen und nicht geprüft

- **Echte Geräte.** Alles Gemessene ist Headless-Chromium. Nicht geprüft: Safari/iOS (Adressleiste, Gummiband), Chrome Android mit eingefahrener Adressleiste. Die Bühne ist deshalb
  100 lvh hoch (deckt auch bei eingefahrener Leiste), die Ränder rechnen mit svh; ob das auf dem Telefon sauber aussieht, kann nur ein Telefon zeigen.
- **Ein Rest bei 375 × 667:** Beim schnellen Wischen weicht ein Bild im Übergang Bon (Position 5.770 px) um 13,6 von 255 vom Bild ab, das man beim langsamen Hinscrollen sieht.
  Der Hin-/Rückweg und alle anderen Stopps sind sauber; Ursache noch nicht gefunden (3D-Drehung des Bons mit Fling?). Wird beim Neubau des Bon-Übergangs in Teil B mitgeprüft.
- **Kopfzeilen-Fläche.** Beim Übergang ändert sich der Grund der Bühne stufenlos; die Fläche der Kopfzeile (und am Desktop das Zähler-Etikett) hat in dieser Zeit die Farbe der alten oder
  neuen Welt (Wechsel in der Mitte der Szene). Das ist sichtbar, wenn man mitten im Übergang aufwärts scrollt. Bewusste Entscheidung („Lesbarkeit geht vor“), aber ein Kompromiss.
- **Long Tasks** siehe oben, Ziel nicht erreicht.
