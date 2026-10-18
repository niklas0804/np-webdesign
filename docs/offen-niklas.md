# Offene Punkte für Niklas

Stand: 18. Oktober 2026. Erledigtes steht unten unter „Erledigt“. Arbeitsstand: Branch `claude/phase-3`; nach `main` kommt nur, was Niklas ausdrücklich freigibt (danach baut die GitHub Action den Branch `deploy`, den Hostinger übernimmt).

## 1. Kontaktformular (läuft, Rest offen)
- [ ] **Zugangsdaten sichern:** `np-config.php` einen Ordner **über** `public_html` anlegen (Vorlage `public/api/config.sample.php`, Block `smtp` für das IONOS-Postfach). Sie übersteht jedes Neuladen per Git oder ZIP; `api/config.php` bleibt als zweiter Ort möglich. Eine Kopie lokal aufbewahren, nie ins Repository, nie in den Chat.
- [ ] **Autofill-Test auf dem Live-Server** in Safari, Chrome und Firefox (Kontaktkarte mit Website-Eintrag): Mail muss ohne „[Spam-Verdacht]“ ankommen. Der Honeypot heißt jetzt `np_hp_field`; Verdachtsfälle werden nicht mehr verworfen, sondern im Betreff markiert.
- [ ] **Auffälligkeiten entscheiden** (Bericht vom 18. Oktober): globales Mengenlimit (jetzt 40 pro Stunde, gilt für alle zusammen), Absender gleich Empfänger, `config.sample.php` nicht auf den Server laden. (Das stille „Danke“ bei Links und Honeypot ist behoben.)
- [ ] **SPF, DKIM, DMARC** für np-webdesign.de prüfen (Werte aus der Hilfe von IONOS und Hostinger übernehmen).
- [ ] PHP-Version auf dem Server mindestens 8.0 prüfen.

## 2. Vor dem Livegang (Pflicht)
- [ ] **Logfile-Speicherdauer:** In `src/content/datenschutz.html` steht ein sichtbarer Platzhalter. Hostinger-Support fragen und eintragen. Das ist der einzige sichtbare `[PLATZHALTER]` auf der gebauten Seite.
- [ ] **Datenschutz ergänzen:** beim Eintrag `np-calm` (localStorage) die Laufzeit nennen („bleibt gespeichert, bis Sie ihn löschen“).
- [ ] **`.htaccess` auf dem echten Hostinger-Server testen:** HTTPS, HSTS, saubere Adressen (`/leistungen`), Sicherheits-Header, 404-Seite, `/api/kontakt.php`.
- [ ] **Cookie- und Speicherprüfung live** mit dem Web-Inspektor (Reiter „Speicher“ und „Netzwerk“) auf Start, `/welten` und `/datenschutz`. Befund lokal: keine Cookies, nur `np-calm` nach Klick auf „Ruhige Ansicht“, keine Fremd-Requests; der Live-Server ist nicht geprüft.
- [ ] **Markenrecherche** für die Studiennamen (Halmberg, Messingstuhl, Wittgenfeld Bau, Haas & Sternfeld, Chromwerk, Jana Ahrens, TORQUEL) und für „NP Webdesign“. Namen bleiben bis dahin.
- [ ] **Rechtsprüfung** mit `docs/rechtspruefung.md` (inklusive Branchenseiten Kanzlei, Oldtimer-Werkstatt, Physiotherapie, Gastronomie/Hotel).
- [ ] **Werbeaussagen der Branchenseiten:** Kanzlei/Steuerberater (Berufsrecht), Physio (Heilmittelwerbung, Gesundheitsdaten bei echter Buchung) und Gastro/Hotel (Preisangaben, Allergene) prüfen lassen.
- [ ] **GitHub Pages abschalten** (Repository-Einstellungen → Pages), damit nichts Halbes veröffentlicht wird.

## 3. Inhalte und Bilder
- [ ] **Fotos besorgen:** 21 offene Fotos laut `docs/fotoliste.md` (Rechte und Abbildungsrechte vorab klären, keine erkennbaren Personen, keine Herstellerlogos).
- [ ] **Bäckerei-Branchenseite** und die neuen Branchenseiten (Kanzlei, Oldtimer-Werkstatt, Physiotherapie, Gastronomie/Hotel) inhaltlich lesen und freigeben; sie sind nicht aus deinen Vorlagen.
- [ ] **Werdegang** („Ich komme aus der Technik …“) nach eigener Prüfung anpassen. Wird erst gebraucht, wenn „Über mich“ zurückkommt.
- [ ] **Social-Vorschaubilder** ansehen (`public/images/social/`).

## 4. Tests, die nur Niklas machen kann
- [ ] Echte Geräte (iPhone, Android, Tablet): Adressleiste und `svh`/`lvh` beim Scrollen, Slider „Der Unterschied“, Musterkoffer.
- [ ] **Lighthouse mobil** (Ziel ≥ 90) auf `/` und `/welten`. Lokal nicht gelaufen. Die Ladewerte (LCP ≤ 2,0 s, INP ≤ 150 ms, CLS ≤ 0,05, erste Ansicht ≤ 350 KB) sind nicht gemessen.
- [ ] VoiceOver (iOS/macOS), NVDA (Windows), Tastatur-Runde, 200 % Zoom.
- [ ] Testversion auf einer Subdomain hochladen und durchklicken (`docs/testversion-hostinger.md`).
- [ ] **Rundes beiges Element im Kontakt:** konnte nicht nachgestellt werden. Falls es wieder auftaucht: Browser und Fenstergröße melden.

## 5. Hinweise
- **Über mich ist abgeschaltet** (`SITE_FLAGS.ueberMich`). Das Porträt liegt in `assets-parked/ueber-mich/` und geht nicht an Hostinger. Kommt die Seite zurück: Rechte am Foto, Datenschutzerklärung und Werdegang-Text neu prüfen.
- **Kein Einwilligungsbanner nötig**, solange nichts außer `np-calm` gespeichert wird und keine Fremddienste eingebunden werden. Matomo oder andere Statistik gibt es nicht; sie bräuchten vorher ein eigenes Konzept und Rechtsprüfung.
- **Bei jeder Änderung neu prüfen:** Cookies, Speicher, Fremd-Requests (Vorschlag: Prüfskript `tools/inventur.cjs`, optional automatisch nach jedem Deploy).

## Erledigt
- [x] Welt 01: Laib-Zeichnung durch Foto-Platzhalter ersetzt (9. Oktober 2026).
- [x] Name Welt 07 bleibt TORQUEL (9. Oktober 2026).
- [x] Demo-Code der Welten 02, 03 und 06 liegt nicht vor, die Welten bleiben Entwürfe nach der Blueprint (9. Oktober 2026).
- [x] Hostinger-Partner-Badge liegt als SVG selbst gehostet unter `public/images/`.
- [x] Mail-Zustellung des Formulars läuft (18. Oktober 2026, von Niklas bestätigt).
