# NP Webdesign · Relaunch „Die Journey“

Statische Astro-Seite (Blueprint Abschnitt N/T). Kein UI-Framework, kein WebGL, kein Lottie, keine Fremdserver.
Der Quellcode liegt im Wurzelverzeichnis; die fertige Seite entsteht beim Bauen (`dist/`, im Branch `deploy`).

## Befehle

```bash
npm install
npm run dev        # Entwicklung
npm run build      # erzeugt dist/ (nur Dateien, nichts Inline)
npm run preview    # dist/ lokal ansehen

# Datenschutz- und Qualitäts-Abnahme (Blueprint Q2 / T.4), braucht Playwright mit Chromium
NODE_PATH=$(npm root -g) node tools/check-site.cjs dist
# Barrierefreiheit (axe-core, WCAG 2.2 AA) an Startseite, jeder Welt und allen Unterseiten
AXE=/pfad/zu/axe.min.js NODE_PATH=$(npm root -g) node tools/axe-check.cjs

# Vorschaubilder (Werkplan, Finale, Branchenseiten, Social 1200×630) aus der gebauten Seite rendern.
# Nach jeder sichtbaren Änderung an einer Welt neu ausführen; ImageMagick und Playwright nötig. Die Bilder liegen im Repo.
npm run build && NODE_PATH=$(npm root -g) node scripts/render-previews.cjs
```

## Aufbau

| Pfad | Inhalt |
| --- | --- |
| `src/config/journey.js` | **Einzige Quelle** für Reihenfolge, Längen (vh), Paletten, Welten, Claim-Texte. Aktuelle Bauphase: `PHASE` |
| `src/config/site.js` | Kontakt, Pakete und Preise (einzige Preisstelle), FAQ, Arbeitsweise, sichtbare Platzhalter |
| `src/pages/` | `index.astro` (Startseite, vorläufig bis Teil C), `welten.astro` (Werkplan → Welten 01–09 → Finale), `leistungen`, Branchenseiten, `impressum`, `datenschutz`, 404 |
| `src/pages/journey.css.js` | erzeugt `/journey.css` aus der Konfiguration (Längen, Paletten) |
| `src/content/branchen.js` | Texte der Branchenseiten (aus den Beispielkonzepten Friseur & Barber, Handwerker, Beratung & Coaching), Vorlage `src/pages/branchenloesungen/[slug].astro` |
| `src/components/` | Rahmen, Menü, Opening (Werkplan-Szene), Werkplan, Übergang, Finale, Kontakt, FAQ, Footer; vorläufig Kopf der Startseite, Warum, Arbeitsweise; abgeschaltet: Über mich |
| `src/motion/` | GSAP-Module: Grundgerüst/Modi, Rahmen, Opening (t00), Übergänge, Staffelstab-Technik (`baton.js`), Finale, Satz nach Maß, Menü |
| `src/styles/` | Tokens, Grundstile, Rahmen, Opening, Sektionen, Unterseiten |
| `public/mode-init.js` | setzt vor dem ersten Paint `data-js` und `data-mode` (`desktop`, `mobile`, `calm`) |

## Modi

`desktop` (ab 1024 px, feiner Zeiger, normale Bewegung), `mobile`, `calm` (Bewegung reduzieren oder Schalter „Ruhige Ansicht“).
Ohne JavaScript und im Modus `calm` gibt es keine Pins: eine lange, ruhige Seite in Lesereihenfolge. Beim Wechsel des Modus lädt die Seite einmal neu.

## Regeln, die der Build einhält

- Strikte CSP als Meta-Tag (`default-src 'self'`): kein Inline-Skript, kein Inline-Style, keine Fremdquellen. `tools/check-site.cjs` prüft das.
- Längen und Farben stehen nie im Modul. Eine Szene pro Abschnitt, keine Gesamt-Timeline, kein Scroll-Jacking.
- Fehlende Inhalte erscheinen als sichtbarer `[PLATZHALTER: …]`, nie erfunden.
- Orange gehört NP: Welt-Paletten nutzen keine Farbtöne von 10–35° mit mehr als 55 % Sättigung.
- Weltpaletten stehen nur in `src/config/journey.js` (Rechenhilfen in `src/config/color.js`). Der NP-Modus (hell, mittel, dunkel) wird aus dem Grund berechnet, nie von Hand gesetzt. `scripts/check-palettes.mjs` prüft Farbabstand (ΔE ≥ 10), Kontraste und den Orange-Schutz und läuft vor jedem Build (`npm run check:palettes`); bei einem Verstoß bricht der Build ab.

## Welten

Neun Welten (Stand Kurskorrektur 11. Oktober 2026: NP Labor entfällt, die Welten wohnen auf `/welten`). Jede Welt ist ein Modul unter `src/worlds/<nr>-<name>/` (Markup, CSS, Bewegung, Daten).
Die Bewegungsmodule sind klein (1–3 KB) und werden beim Start in Dokumentreihenfolge geladen und eingerichtet (`src/motion/index.js`, `WORLD_MODULES`); es gibt genau einen `ScrollTrigger.refresh()`, nie mehr während des Scrollens.

| Welt | Stand und Übergänge |
| --- | --- |
| 01 Halmberg | gebaut (Studie, Demo-Daten). Davor t00: Die Zelle im Werkplan wächst auf Viewport-Größe. Ausgang: Der Bon „Nr. 07“ wird abgeholt (t01) |
| 02 Messingstuhl | gebaut als Entwurf nach Blueprint. Eingang: der Bon wird zur goldenen Wartemarke. Ausgang: die Messingschiene am Ende wird zur Maßlinie (t02) |
| 03 Wittgenfeld Bau | gebaut als Entwurf nach Blueprint. Eingang: Maßlinie im Kopf. Ausgang: der rote Prüfvermerk am Ende wird gesetzt und zur roten Linie der Kanzlei (neu) |
| 04 Haas & Sternfeld | gebaut nach Blueprint. Eingang: rote Linie unter der Schlagzeile. Ausgang: die rote Schlusslinie wird zur Zierlinie von Chromwerk |
| 05 Chromwerk | gebaut nach Blueprint (Querfahrt, Datenblatt, Vorher/Nachher). Eingang: Zierlinie im Kopf. Ausgang: der Scheinwerfer am Ende glüht auf |
| 06 Jana Ahrens | gebaut als Entwurf nach Blueprint. Eingang: der Scheinwerfer wird zur Farbkugel. Ausgang: die Kreise der Kugel werden zu Messkreisen (neu) |
| 07 TORQUEL | gebaut nach Blueprint. Eingang: Messkreise im Kopf, die Laserlinie tastet sie ab (neu). Ausgang: die 35 Zellen des Messrasters ordnen sich zum Kalender |
| 08 Praxis am Weiher | gebaut nach Blueprint (Atkinson Hyperlegible Next, Buchung per Tastatur). Eingang: Kalender im Kopf, jede Zelle landet auf ihrer Zelle. Ausgang: das Weiherbild zoomt aus und wird zum See |
| 09 Gut Weidenstein | gebaut nach Blueprint (die langsamste Welt). Eingang: See im Kopf. Ausgang: das erleuchtete Fenster am Ende wächst zum Fenster im zehnten Platz des Werkplans (Finale, neu) |

Weltschriften werden auf die benutzten Zeichen reduziert: `scripts/subset-fraunces.py` (Welt 01, zwei Dateien, 29,2 KB), `scripts/subset-bodoni.py` (Welt 02, eine Datei, 20,5 KB), `scripts/subset-barlow.py` (Welt 03, zwei Dateien, 15 KB), `scripts/subset-figtree-geist.py` (Welt 06 Figtree 9,9 KB, Welt 07 Geist 11,5 KB plus Geist Mono 8 KB, Welt 08 Atkinson 11,4 KB, Welt 09 Cormorant 17,7 KB), `scripts/subset-michroma.py` (Welt 05, eine Datei, 4,3 KB, nur Versalien) und `scripts/subset-newsreader.py` (Welt 04, zwei Dateien, 30,6 KB: Display opsz 72 / 500 und Text opsz 16 / 400–600; eine Datei mit beiden Achsen wäre 47 KB groß, Kapitälchen entstehen im Browser, weil die Schrift keine echten mitbringt).
Das Finale (`src/components/Finale.astro`, `src/motion/finale.js`, `src/styles/finale.css`) ist eine gepinnte Bühne: Der zehnte Platz „Ihr Betrieb“ füllt sie mit dem erleuchteten Fenster, die Kamera fährt auf den ganzen Werkplan zurück, die Einladung „Neun Welten. Die zehnte gehört Ihnen.“ erscheint; der Knopf führt zum Kontakt auf der Startseite. Ruhig und ohne JavaScript bleibt nur die Einladung. Seine Länge steht in `journey.js` (200/140 vh statt 120/100 im Blueprint, weil Rückzoom und Sprung dazukommen).
Übergänge mit eigenem Staffelstab stehen in `TRANSITION_VARIANTS` (`src/config/journey.js`), die Szenen in `src/motion/transitions.js`, die Technik (Abbild echter Elemente, Landung auf dem Gegenstück) in `src/motion/baton.js`. Aufbau, Messungen und Gründe: `docs/troubleshooting-uebergaenge.md`. Prüfwerkzeug: `tools/check-transitions.cjs`.

## Stand (Teil B der Kurskorrektur vom 11. Oktober 2026)

- `/welten`: Werkplan (4 × 3, Zentrum über zwei Spalten, zehnter Platz „Ihr Betrieb“) → Welten 01–09 mit Übergängen → Finale. Titel „Neun Welten · Studien von NP Webdesign“, indexiert, Sitemap.
- `/`: **vorläufige** Startseite (Kopf, Warum, Arbeitsweise, Kontakt, FAQ). Teil C ersetzt sie durch die neue Startseite.
- Übergänge: Bühne unter den Welten, Staffelstab als Abbild eines echten Elements der alten Welt, Landung auf dem Gegenstück der neuen Welt (neun Übergänge, drei neu: Stempel → rote Linie, Messkreise mit Laser, Fenster → Werkplan).
- Entfernt: NP Labor (Welt 10), Zwischenspiele auf `/welten`, Übergänge `ausziehen` und `rohbau`. „Über mich“ ist per Schalter in `src/config/site.js` aus, das Porträt liegt geparkt in `assets-parked/` und wird nicht ausgeliefert.
- Noch offen: Teil C (neue Startseite), Teil D (Abnahme, Übergabe), Einwilligungsbanner mit Matomo (erst nach rechtlicher Klärung), Prüfung von Impressum und Datenschutz durch eine fachkundige Stelle, 21 Fotos (`docs/fotoliste.md`).

## Rechtliche Prüfung

`docs/rechtspruefung.md` listet alle Punkte, die ein Prüfer ansehen soll (Hoster und Unterauftragnehmer, Formular, Banner, Badge, Inhalte, Lizenzen).
`public/.htaccess` enthält HTTPS, Header und saubere Adressen für Hostinger (nicht lokal testbar).

## Kontaktformular (Startseite)

- Markup `src/components/Kontakt.astro`, Stil `src/styles/kontakt.css`, Verhalten `src/motion/kontakt.js` (Live-Vorschau, Prüfung beim Verlassen eines Feldes, Senden per `fetch`, nichts wird zwischengespeichert).
- Ohne JavaScript sendet das Formular normal an `/api/kontakt.php`; die Antwort zeigt die Seite über `#anfrage-erhalten` bzw. `#anfrage-fehler` (`:target`).
- Endpunkt `public/api/kontakt.php` (PHP 8): Honeypot (Feld `np_hp_field`, ohne Bezug zu Autofill-Namen), Zeitprüfung (unter 3 s, Feld `np_ts`), Linkfilter, Verdachtsfälle werden zugestellt mit Betreff „[Spam-Verdacht]“ (verworfen nur, wenn alle drei anschlagen), serverseitige Prüfung, Mengenbegrenzung (Gesamtzahl pro Stunde, ohne IP-Adressen), Versand per `mail()`, kein Inhalt in Logs.
- Auf dem Server optional eine Konfiguration anlegen (Vorlage `config.sample.php`; Empfänger, Absender, SMTP). Empfohlen als `np-config.php` einen Ordner ÜBER `public_html` (außerhalb des Web-Ordners, übersteht jedes Neuladen per Git oder ZIP); alternativ `api/config.php` neben der Datei. Beides kommt nie ins Repository.
- Das Postfach liegt bei IONOS, die Website bei Hostinger. Empfohlen: in `config.php` den Eintrag `smtp` setzen (Vorlage liegt bei), dann geht die Anfrage über das IONOS-Postfach selbst (STARTTLS, Anmeldung) und Absender und SPF passen zusammen. Ohne `smtp` nutzt der Endpunkt `mail()` von Hostinger; dann SPF-Eintrag der Domain für Hostinger prüfen.
- Nach dem Hochladen einmal eine Testanfrage senden.
- Lokal testen: `php -S 127.0.0.1:8098 -t dist` (mit `sendmail_path` auf ein Skript, das die Mail in eine Datei schreibt).

## Bilder und Platzhalter

Wo eine Welt ein Foto braucht, steht ein klar markierter **Bildplatzhalter** mit Motivbeschreibung (`src/components/BildPlatzhalter.astro`), nie eine gezeichnete Ersatzgrafik. Die Einträge stehen in `src/content/fotos.js`; `node scripts/list-photos.mjs` erzeugt daraus `docs/fotoliste.md` (was Niklas besorgen muss). Die Vorschaubilder im Werkplan, im Finale, auf den Branchenseiten und für Social Media dagegen sind echte Aufnahmen der gebauten Seite (`scripts/render-previews.cjs`).
