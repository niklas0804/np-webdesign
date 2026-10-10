# Offene Punkte für Niklas

Diese Liste wird bei jedem Schritt fortgeschrieben. Erledigtes bleibt als „erledigt“ stehen, bis Niklas es streicht.

## Vor dem Livegang (Pflicht)
- [ ] **Logfile-Speicherdauer:** In `src/content/datenschutz.html` steht ein sichtbarer Platzhalter. Hostinger-Support fragen, wie lange Server-Logfiles gespeichert werden, und eintragen.
- [ ] **IONOS-Postfach und Formular:** Zugangsdaten für `kontakt@np-webdesign.de` in `api/config.php` auf dem Server hinterlegen (Vorlage `public/api/config.sample.php`), danach eine echte Testanfrage senden. SMTP wurde nur gegen einen lokalen Testserver geprüft.
- [ ] **`.htaccess` auf dem echten Hostinger-Server testen:** HTTPS, HSTS, saubere Adressen (`/leistungen`), Header, `/api/kontakt.php`.
- [ ] **Markenrecherche** für die Studiennamen (Halmberg, Messingstuhl, Wittgenfeld Bau, Haas & Sternfeld, Chromwerk, Jana Ahrens, TORQUEL, Praxis am Weiher, Gut Weidenstein, NP Labor) und für „NP Webdesign“ vor dem Livegang. Namen bleiben bis dahin.
- [ ] **Rechtsprüfung** mit `docs/rechtspruefung.md` (inklusive der Nachträge zu allen neuen Branchenseiten).
- [ ] **Einwilligungsbanner und Matomo:** erst nach der Antwort des Rechtsprüfers bauen.
- [ ] **GitHub Pages abschalten** (Settings → Pages), damit nichts Halbes veröffentlicht wird.
- [ ] **Werbeaussagen der Branchenseiten:** Kanzlei/Steuerberater (Berufsrecht), Physio (Heilmittelwerbung, Gesundheitsdaten bei echter Buchung) und Gastro/Hotel (Preisangaben, Allergene) prüfen lassen; die Punkte stehen in `docs/rechtspruefung.md`.

## Inhalte und Bilder
- [ ] **Fotos besorgen:** siehe `docs/fotoliste.md` (21 offene Fotos, alle zehn Welten sind gebaut). Rechte und Abbildungsrechte vorab klären, keine erkennbaren Personen, keine Herstellerlogos.
- [x] **Welt 01:** Laib-Zeichnung durch Foto-Platzhalter ersetzt (entschieden am 9. Oktober 2026); die Fotos stehen in `docs/fotoliste.md`.
- [ ] **Bäckerei-Branchenseite** inhaltlich prüfen (neu geschrieben, nicht aus deinen Vorlagen). Ebenso die neuen Seiten Kanzlei, Oldtimer-Werkstatt, Industrie, Physiotherapie und Gastro/Hotel.
- [ ] **Werdegang** („Ich komme aus der Technik …“) nach eigener Prüfung anpassen.
- [x] **Name Welt 07:** bleibt TORQUEL (entschieden am 9. Oktober 2026).
- [x] **Demo-Code der Welten 02, 03 und 06:** liegt nicht vor (bestätigt am 9. Oktober 2026), die drei Welten bleiben Entwürfe nach der Blueprint.
- [ ] **Social-Vorschaubilder** ansehen (`public/images/social/`); sie entstehen aus den gebauten Seiten.

## Tests, die nur du machen kannst
- [ ] Echte Geräte (iPhone, Android, Tablet), Lighthouse (Ziel Mobil ≥ 90), VoiceOver (iOS/macOS) und NVDA (Windows), Tastatur-Runde, 200 % Zoom.
- [ ] Testversion auf der Subdomain hochladen und durchklicken (`docs/testversion-hostinger.md`).

## Ablauf
- [x] `claude/phase-1` nach `main` gemergt (Pull Request #2, 10. Oktober 2026).
- [ ] Unter Actions prüfen, dass der Lauf „Seite bauen und Deploy-Branch aktualisieren“ grün ist (Branch `deploy` entsteht).
