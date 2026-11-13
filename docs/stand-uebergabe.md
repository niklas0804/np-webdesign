# Stand der Website np-webdesign.de (Übergabe)

Stand: 13. November 2026 (nach Phase 2 des Auftrags „Vertrauen, Leistungen, Welten kürzen“, Branch `claude/vertrauen-und-welten`) · Inhaber: Niklas Prüfling, NP Webdesign, Schwandorf · `main` enthält `claude/premium-feinschliff` (Commit `9f0cfe9`) und, sobald Niklas sie mergt, Phase 1 und 2.
Der ausführliche Verlauf bis zum 13. November steht unverändert in `docs/archiv/stand-uebergabe-2026-10-bis-11-13.md` (enthält teils Überholtes: zehn Welten, „Lighthouse nie gelaufen“, Welt 10). Maßgebend für Aufträge ist `docs/ist-analyse-2026-11-13.md` zusammen mit diesem Blatt.

## 1. Was die Seite ist
Statische Astro-Seite (Astro 7, GSAP 3.15 mit ScrollTrigger, Lenis nur Desktop), gehostet bei Hostinger, Postfach bei IONOS. Zwei Seiten tragen die Reise:
- **`/` Startseite „Maßarbeit“:** Hero · Warum (drei Sätze) · Der Kunden-Test (Barbershop, Handy-Fall „Anrufen“) · Beispiele · Über mich (Text ohne Bild) · Zusammenarbeit (Faden endet im NP-Logo) · Kontakt (Telefon, Rückruf, Anfrageformular) · FAQ · Footer. Zwei Übergänge mit Staffelstab: N-Blende (Warum → Kunden-Test) und P-Iris (Zusammenarbeit → Kontakt).
- **`/welten`:** Opening, Werkplan (4×3 mit Platz „Ihr Betrieb“), neun Studien-Welten, Finale. Erfundene Betriebe, überall als „Studie · fiktives Unternehmen“ und „Demo“ gekennzeichnet: 01 Halmberg (Bäckerei), 02 Messingstuhl (Barbershop), 03 Wittgenfeld Bau, 04 Haas & Sternfeld (Kanzlei), 05 Chromwerk (Oldtimer-Werkstatt), 06 Jana Ahrens (Coaching), 07 TORQUEL (Industrie), 08 Praxis am Weiher (Physiotherapie), 09 Gut Weidenstein (Gasthof).
- Weiter: `/leistungen` (Starter 999 €, Professional 1.899 €, Premium ab 2.999 €, Endpreise nach § 19 UStG; je Paket „Enthalten · Nicht enthalten · Danach“), `/projekte/np-webdesign` (Fallstudie 00: Eigenprojekt mit Messwerten aus `src/content/messwerte.js`), `/impressum`, `/datenschutz`, 404, neun Branchenseiten unter `/branchenloesungen/` (Bäckerei, Friseur & Barber, Handwerker, Beratung & Coaching, Kanzlei, Kfz-Werkstatt, Industrie, Physiotherapie, Gastronomie & Hotel).
- **„Über mich“** steht auf der Startseite zwischen Beispiele und Zusammenarbeit, bis das Porträt da ist ohne Bild. `SITE_FLAGS.portrait = true` schaltet das Bild zu, sobald die Dateien aus `assets-parked/ueber-mich/` in `public/images/` liegen.
- **Telefon** (`SITE.phone`) steht im Kontaktbereich, im Footer, im Menü und in der mobilen Leiste („Anrufen“ und „Projekt anfragen“). Zeiten und Fristen: `SITE` und `SERVICE` in `src/config/site.js`.

## 2. Quellen der Wahrheit
- `src/config/site.js`: Kontaktdaten, Preise, Schritte, FAQ, Schalter. Preise, Fristen, Telefon, Kapazität stehen nur dort.
- `src/config/journey.js`: Reihenfolge, Längen, Paletten, Übergangsvarianten, Welten-Sichtbarkeit.
- `src/content/fotos.js`: Foto-Briefings (nie ausliefern), `docs/fotoliste.md`: Liste für Niklas.
- `src/home/*.astro` und `src/motion/home/` (Startseite), `src/worlds/NN-name/` (Welten), `src/motion/` (Szenen, Übergänge), `src/styles/` (Stile).

## 3. Betriebsarten
`desktop` (ab 1024 px, Maus), `mobile`, `calm` (Bewegung reduzieren oder Schalter „Ruhige Ansicht“, speichert erst nach Klick `np-calm` im localStorage), ohne JavaScript = vollständige, ruhige Seite.

## 4. Bauen und prüfen
- `npm ci && npm run build` (Ausgabe `dist`; am Ende listet die Platzhalter-Inventur alle sichtbaren `[PLATZHALTER: …]`, `npm run check:platzhalter` bricht dann ab).
- Abnahme: `node tools/check-site.cjs dist`, `AXE=<Pfad zu axe.min.js> node tools/axe-check.cjs`, bei geänderten Übergängen `node tools/check-transitions.cjs --path /` (und `--path /welten`). Alles mit `NODE_PATH=$(npm root -g)` (Playwright, Chromium). Aufnahmen: `scripts/home-shots.cjs`, `scripts/screenshots.cjs`, `scripts/kundentest-shots.cjs`.
- CI: `.github/workflows/vorschau.yml` baut jeden `claude/**`-Branch, misst Lighthouse (Median aus drei Läufen) und legt das Ergebnis im Branch `vorschau-build` ab. `deploy.yml` baut bei jedem Push auf `main` den Branch `deploy` (der Inhalt gehört direkt ins Hauptverzeichnis des Webspace).

## 5. Gemessene Werte (Stand `9f0cfe9`, CI-Vorschau und eigene Läufe)
- Startseite rund 203 KB gzip in 11 Anfragen, `/welten` rund 490 KB in 43 Anfragen; 0 Fremdanfragen, 0 Cookies, kein Banner.
- Lighthouse mobil (Median aus 3): Startseite 98, Leistungen 100, Bäckerei 99, `/welten` 73 bis 76; Accessibility, Best Practices, SEO je 100.
- axe 0 Verstöße, kein horizontaler Überlauf ab 320 px, `check-site` und `check-transitions` ohne Befund beim letzten Lauf.
- `/welten` ist 64,6 Bildschirmhöhen am Handy lang, 21 Bildplatzhalter sind offen (Phase 3 des Auftrags vom 13. November kürzt das).

## 6. Formular und Server
`public/api/kontakt.php` (PHP ab 8.1): zwei Arten, Anfrage (Name, E-Mail, Chip oder Text mindestens 10 Zeichen; freiwillig Unternehmen, Telefon, jetzige Website) und Rückruf (`art=rueckruf`, nur Name und Telefon Pflicht, Wunschzeit freiwillig; ohne JavaScript landet man auf `#rueckruf-erhalten` bzw. `#rueckruf-fehler`). Schutz: Honeypot `np_hp_field`, Zeitprüfung (unter 3 s), Linkfilter, Herkunftsprüfung, Stundenlimit (40, nur Zeitpunkte, ohne IP), Verdacht wird zugestellt und im Betreff markiert, kein Inhalt in Logs. Versand per SMTP über das IONOS-Postfach (oder `mail()` ohne Konfiguration). Zugangsdaten stehen nur auf dem Server in `np-config.php` (Ordner über `public_html`) oder `api/config.php`; nie lesen, nie committen. `public/.htaccess`: HTTPS, HSTS, Header, saubere Adressen.

## 7. Entscheidungen von Niklas (verbindlich)
- Repository ist der maßgebliche Stand. E-Mail `kontakt@np-webdesign.de`. Antwortzeit „innerhalb von 2 Werktagen“.
- Hostinger (Vertragspartner laut Rechnung: HOSTINGER operations, UAB, Vilnius), Rechenzentrum Deutschland, Hostinger-Partner-Badge ohne Link. Postfach bei IONOS.
- NP hat noch kein Kundenprojekt abgeschlossen: kein Text darf Erfahrung mit Kundenprojekten behaupten. Nichts erfinden (keine Kunden, Bewertungen, Kennzahlen, Preise, Fristen).
- Nichts auf `main` ohne ausdrückliches Okay von Niklas.

## 8. Offen
Die gepflegte Liste für Niklas steht in `docs/offen-niklas.md`. Wichtigste Punkte: Logfile-Speicherdauer bei Hostinger (Platzhalter in `datenschutz.html`), Porträtfoto, Fotos laut Fotoliste, Markenrecherche, Rechtsprüfung, Tests auf echten Geräten, VoiceOver, `.htaccess` und Mailversand auf dem Live-Server, AGB an Korrekturschleifen (2/3/3) und zwei Wochen Betreuung angleichen. Orange ist entschieden: überall `--np-orange` `#CE5D17`.

## 9. Einschränkungen (ehrlich)
Geprüft wird nur in Headless-Chromium; keine echten Geräte, kein Safari und Firefox, keine Screenreader-Tests. Rechtstexte sind nicht anwaltlich geprüft. Die Doku `docs/BLUEPRINT.md` ist lang (1.493 Zeilen) und teils überholt; ihre Abschnitte B–T sind laut Kurskorrektur „in diesem Sinn zu lesen“.
