# Offene Punkte für Niklas

Diese Liste wird bei jedem Schritt fortgeschrieben. Erledigtes bleibt als „erledigt“ stehen, bis Niklas es streicht.

## Vor dem Livegang (Pflicht)
- [ ] **Logfile-Speicherdauer:** In `src/content/datenschutz.html` steht ein sichtbarer Platzhalter. Hostinger-Support fragen, wie lange Server-Logfiles gespeichert werden, und eintragen.
- [ ] **IONOS-Postfach und Formular:** Zugangsdaten für `kontakt@np-webdesign.de` in `api/config.php` auf dem Server hinterlegen (Vorlage `public/api/config.sample.php`), danach eine echte Testanfrage senden. SMTP wurde nur gegen einen lokalen Testserver geprüft.
- [ ] **`.htaccess` auf dem echten Hostinger-Server testen:** HTTPS, HSTS, saubere Adressen (`/leistungen`), Header, `/api/kontakt.php`.
- [ ] **Markenrecherche** für die Studiennamen (Halmberg, Messingstuhl, Wittgenfeld Bau, Haas & Sternfeld, Chromwerk, Jana Ahrens, NAABTEC bzw. TORQUEL …) und für „NP Webdesign“ vor dem Livegang. Namen bleiben bis dahin.
- [ ] **Rechtsprüfung** mit `docs/rechtspruefung.md` (inklusive der Nachträge zu den Branchenseiten Kanzlei, Oldtimer-Werkstatt und weiteren).
- [ ] **Einwilligungsbanner und Matomo:** erst nach der Antwort des Rechtsprüfers bauen.
- [ ] **GitHub Pages abschalten** (Settings → Pages), damit nichts Halbes veröffentlicht wird.
- [ ] **Werbeaussagen der Branchenseiten:** Kanzlei/Steuerberater (Berufsrecht) und Medizin/Physio (Heilmittelwerbung) prüfen lassen, sobald diese Seiten stehen.

## Inhalte und Bilder
- [ ] **Fotos besorgen:** siehe `docs/fotoliste.md` (wird mit jeder Welt länger). Rechte und Abbildungsrechte vorab klären, keine erkennbaren Personen, keine Herstellerlogos.
- [ ] **Frage zu Welt 01:** Das gezeichnete Laib-Motiv durch einen Foto-Platzhalter ersetzen? (Die Zeichnung ist von dir abgenommen, bleibt bis zu deiner Antwort.)
- [ ] **Bäckerei-Branchenseite** inhaltlich prüfen (neu geschrieben, nicht aus deinen Vorlagen). Ebenso die neuen Seiten Kanzlei, Oldtimer-Werkstatt und die folgenden.
- [ ] **Werdegang** („Ich komme aus der Technik …“) nach eigener Prüfung anpassen.
- [ ] **Name Welt 07:** In der Blueprint heißt die Studie NAABTEC, auf der Seite steht der früher umbenannte Name TORQUEL. Bleibt es dabei?
- [ ] **Demo-Code der Welten 02, 03 und 06:** Der Originalcode deiner alten Demos lag mir nie vor; die drei Welten sind Entwürfe nach der Blueprint. Wenn du die Originale nutzen willst, bitte liefern.
- [ ] **Social-Vorschaubilder** ansehen (`public/images/social/`); sie entstehen aus den gebauten Seiten.

## Tests, die nur du machen kannst
- [ ] Echte Geräte (iPhone, Android, Tablet), Lighthouse (Ziel Mobil ≥ 90), VoiceOver (iOS/macOS) und NVDA (Windows), Tastatur-Runde, 200 % Zoom.
- [ ] Testversion auf der Subdomain hochladen und durchklicken (`docs/testversion-hostinger.md`).

## Ablauf
- [ ] `claude/phase-1` nach `main` mergen, wann immer du willst (Claude darf nicht selbst auf `main` pushen). Danach baut die GitHub Action den Branch `deploy`.
