# Stand der Website np-webdesign.de (Übergabe)

Stand: 8. Oktober 2026 · Branch `claude/phase-1`, am 8. Oktober 2026 per Fast-Forward nach `main` übernommen · Inhaber: Niklas Prüfling, NP Webdesign, Schwandorf

## 1. Worum es geht
Relaunch von np-webdesign.de als statische Astro-Seite „Die Journey“: eine durchgehende Scroll-Reise vom NP-Logo über einen Werkplan durch verkettete Branchenwelten bis in einen Kontaktrahmen. Maßgebend ist die `BLUEPRINT.md` (liegt **nicht** im Repository; Niklas hat sie hochgeladen und muss sie bei Bedarf erneut liefern). Gebaut wird phasenweise; jede Phase endet mit einer Zusammenfassung „fertig / von Niklas nötig“.

## 2. Repository und Branches
- Der Wurzelordner des Repositorys ist der Astro-Projektordner (`src/`, `public/`, `scripts/`, `docs/`, `package.json`). Die alte Seite (`index.html`, `css/`, `js/` usw.) wurde am 8. Oktober 2026 entfernt; es gibt nur noch den Relaunch.
- `main`: aktueller Stand des Quellcodes.
- `deploy`: die fertig gebaute Seite, so wie sie auf den Webspace gehört (Inhalt direkt ins Hauptverzeichnis laden). Sie wird von der GitHub Action `.github/workflows/deploy.yml` bei jedem Push auf `main` neu erzeugt.
- `claude/phase-1`: früherer Arbeitsbranch, inhaltlich wie `main`.
- `CNAME` wurde von Niklas gelöscht (Umzug auf Hostinger, kein GitHub Pages mehr).

## 3. Bauen und prüfen
- `npm install && npm run build` (Ausgabe `dist`). Astro 7, GSAP 3.15 + ScrollTrigger, Lenis (nur Desktop), kein UI-Framework.
- Abnahme: `NODE_PATH=$(npm root -g) node tools/check-site.cjs dist` und `AXE=… node tools/axe-check.cjs` (Playwright: keine Fremdanfragen, keine Cookies/Browser-Speicher, keine Konsolenfehler/CSP-Verstöße, kein seitliches Scrollen ab 320 px, keine Endlos-Animationen, Inhalt ohne JavaScript). Letzter Lauf: 11 Seiten × 5 Viewports (davon zwei mit Touch und normaler Bewegung, also Modus „mobile“ mit gepinnten Szenen) + ohne JavaScript, **0 Befunde**.
- axe-core (WCAG 2.2 AA, an Startseite, jeder Welt in Desktop und Mobil, Ruhig und allen Unterseiten): **0 Verstöße**. Dabei gefunden und behoben: Nach dem Scrollen verschwand die H1 aus dem Accessibility-Tree. Außerdem gefunden (Welt 05): Mobile Browser weiteten die Seitenbreite auf die wischbare Bildstrecke aus; `contain: paint` hält sie im Rahmen, und check-site prüft jetzt auch den Touch-Modus.
- Formular lokal testen: `php -S 127.0.0.1:8098 -t dist` mit `sendmail_path` auf ein Skript, das die Mail in eine Datei schreibt.

## 4. Was gebaut ist (Phase 1, ohne Matomo-Banner)
- **Reise:** Opening (Hero, Rückzoom, Werkplan) → Welt 01 → t01 → Welt 02 → t02 → Welt 03 → t03 → Zwischenspiele I–III (Warum individuell, Arbeitsweise, Über mich) mit Standard-Übergängen → Finale → Kontakt → FAQ → Footer. Reihenfolge, Längen und Paletten stehen nur in `src/config/journey.js`.
- **Drei Studien-Welten (erfundene Unternehmen, als Demo gekennzeichnet):** 01 **Halmberg** (Bäckerei, Fraunces, Backplan, Teigführung, Vorbestell-Bon), 02 **Messingstuhl** (Barbershop, Bodoni Moda, Wartemarke, Terminanfrage-Demo), 03 **Wittgenfeld Bau** (Bauunternehmen, Planblätter Grundriss/Schnitt/Ansicht, Schnitt baut sich beim Scrollen auf, Prüfstempel, Bauteil-Explosion). Welt 02 und 03 sind Entwürfe nach der Blueprint (der Demo-Code liegt nicht vor).
- **Phase 2, Welt 04 (9. Oktober 2026):** **Haas & Sternfeld** (Kanzlei und Steuerberatung, Newsreader in zwei Dateien, Zeitungskopf, Schlagzeile mit roter Linie, dreispaltiger Leitartikel mit Initiale, Fußnoten als Marginalien, Pull-Quote, Themenregister mit Rubriken, zwei Bildplatzhalter). Reihenfolge laut Blueprint: Welt 03 → Zwischenspiel I (Warum) → **Welt 04** → Zwischenspiel II. Eingangs-Übergang **N-Blende** (`TRANSITION_VARIANTS['warum>welt-04']`). Branchenseite `/branchenloesungen/kanzlei` (mit Checkliste und 3 FAQ, berufsrechtliche Hinweise vor Livegang prüfen lassen). Der Werkplan und das Finale arbeiten bei vier Studien mit vier Spalten (`data-count`); für fünf und sechs Studien ist das Raster in den nächsten Sitzungen anzupassen. Welt 06 folgt.
- **Phase 2, Welt 05:** **Chromwerk** (Oldtimer-Werkstatt, Michroma nur für Versalien-Display in 4,3 KB, Fließtext Systemschrift). Eingangs-Übergang **Zierlinie** (`TRANSITION_VARIANTS['welt-04>welt-05']`: rote Linie verlängert sich, wird zur Kurve und wechselt von Siegelrot zu Elfenbein, Reinweiß wird Racing Green; Pfad-Morph ohne Plugin). **Querfahrt**: am Desktop gepinnt (Länge `scene` in `journey.js`, 260 vh), vertikales Scrollen fährt die Bildstrecke seitwärts, Lichtreflex, Neigung bis 4° und wieder gerade, wenn das Scrollen aufhört; mobil und ruhig eine wischbare Leiste mit Einrasten. Datenblatt (erfundenes Fahrzeug), Ablauf in fünf Kapiteln, Vorher-Nachher-Regler (Maus, Touch, Pfeiltasten, `aria-valuetext`). Alle sieben Fotos sind Bildplatzhalter. Branchenseite `/branchenloesungen/kfz-werkstatt`. Werkplan und Finale: je nach Zahl der Studien 3, 4 oder 5 Spalten; je nach Zahl der Studien 3 bis 5 Spalten am Desktop (mobil ab acht Studien drei Spalten, ab sechs ohne Beschriftungen); für zehn Studien ist das Raster noch anzupassen (`data-count`).
- **Phase 2, Welt 06:** **Jana Ahrens** (Coaching, Figtree). Farbkugel aus Radialverlauf mit drei Ringen statt Foto, atmet an das Scrollen gebunden (0,9 bis 1,05). Statt „Zitatkarten“ mit erfundenen Kundenstimmen stehen **Haltungssätze** der fiktiven Beraterin (keine Bewertungen). „Drei Fragen“ färben die Kugel (Mittelwert der Antworten), nichts wird gespeichert; Erstgespräch in zwei Klicks (Demo). Übergang hinein **Scheinwerfer** (Radialverlauf statt Unschärfe), hinaus **Kreise → Linie mit sechs Stationen**. Branchenseite `/branchenloesungen/beratung-coaching` (Texte aus Niklas’ Vorlage, unverändert).
- **Phase 2, Welt 07:** **TORQUEL** (Industrie; die Blueprint nennt die Studie NAABTEC, in der Konfiguration steht der umbenannte Name; Geist und Geist Mono). 8-px-Raster mit Koordinatenachsen, Kennzahlen zählen einmal hoch, Laserlinie scannt (Scrub) und das Messprotokoll mit Toleranzanzeige entsteht dahinter, **Bauteil drehen** per Ziehen, Scrollen, Regler und Tasten (12 Ansichten, mobil 6; die Bilder sind ein Bildplatzhalter, die Bedienung läuft schon), Anfrage für Zeichnungen als Demo (nichts gesendet, keine Datei gelesen). Übergang hinein **Strahl** (Zwischenspiel II → 07; Leuchten nur am Desktop). Branchenseite `/branchenloesungen/industrie`. Die Reihenfolge ist jetzt: … 05 → 06 → Zwischenspiel II (Arbeitsweise) → 07 → Zwischenspiel III → Finale. 
- **Phase 2, Welt 08:** **Praxis am Weiher** (Physiotherapie, Atkinson Hyperlegible Next). Eine Inhaltsspalte plus Seitenleiste mit Terminbuchung (Behandlung, Tag, Uhrzeit als Radiogruppen mit Pfeiltasten, Klickflächen ≥ 48 px, Demo ohne Versand), Schalter „Große Schrift“ (24 px Grundschrift) und „Hoher Kontrast“ (Schwarz auf Weiß) wirken nur in der Welt und werden nicht gespeichert. Bewegung: nur kurze Einblendungen. Übergang hinein **Messraster → Kalender**. Branchenseite `/branchenloesungen/physiotherapie` (keine Heilversprechen, Heilmittelwerbung und Gesundheitsdaten vor Livegang prüfen lassen).
- **Phase 2, Welt 09:** **Gut Weidenstein** (Landgasthof und Hotel, Cormorant). Die langsamste Welt: drei Seebilder (Platzhalter) überblenden gepinnt über 120 vh plus Verweilen (`scene` in `journey.js`), eine Farbschicht kühlt von Abend zu Nacht ab; Zimmerkarten, Speisekarte Mittag/Abend als Reiter (WAI-ARIA-Tabs), **fixierte Buchungsleiste** am unteren Rand der Welt (Datum, Personen, Demo ohne Versand; mobil über der Navigation). Übergang hinein **Wasser** (80/50 vh, Weiher-Platzhalter wird See-Platzhalter, Wasserlinie), hinaus **erleuchtetes Fenster** zum Porträt. Branchenseite `/branchenloesungen/gastronomie-hotel`. Es fehlt nur noch Welt 10 (NP Labor) mit ihrem Übergang und dem Rückzoom ins Finale.
- **Welt 01:** Die gezeichneten Laibe sind durch zwei Bildplatzhalter ersetzt (Foto folgt); die ovale Laib-Maske kommt zurück, sobald echte Fotos da sind (`.w01-loaf-ph` entfernen).
- **Offene Punkte für Niklas** stehen gesammelt in `docs/offen-niklas.md` (wird bei jedem Schritt fortgeschrieben).
- **Übergänge mit eigenem Staffelstab:** t00 Zelle wächst, t01 Bon wird Wartemarke, t02 Goldlinie wird Maßlinie, t03 Prüfstempel wird NP-Siegel und öffnet als P-Iris (`TRANSITION_VARIANTS`).
- **Finale:** gepinnte Bühne mit Rückzoom auf den Werkplan, Logo als Signatur, leeres Zentrum mit Cursor, Einladung, Sprung in den Kontakt. Länge 200/140 vh (Blueprint: 120/100), bewusst länger.
- **Kontakt:** Formular (Name, Unternehmen, E-Mail, Telefon, Anliegen-Chips, Nachricht) mit neutraler Live-Vorschau des Firmennamens, Siegel „Anfrage erhalten“, Fakten. Läuft auch ohne JavaScript.
- **Seiten:** `/leistungen` (Pakete: Starter 999 €, Professional 1.899 €, Premium ab 2.999 €, Endpreise nach § 19 UStG), `/impressum`, `/datenschutz`, 404, vier Branchenseiten unter `/branchenloesungen/` (Bäckerei neu geschrieben mit Checkliste und 3 FAQ; Friseur & Barber, Handwerker, Beratung & Coaching wörtlich aus Niklas’ Vorlagen).
- **Betriebsarten:** `desktop` (≥ 1024 px, Maus, normale Bewegung), `mobile`, `calm` (Bewegung reduzieren oder Schalter „Ruhige Ansicht“, speichert erst nach Klick `np-calm` im localStorage), ohne JavaScript = ruhige Seite.
- **Datenschutz technisch:** keine Fremdanfragen, keine Cookies, strikte CSP als Meta-Tag (kein Inline-Code), alle Schriften/Skripte/Bilder selbst gehostet (Weltschriften auf benutzte Zeichen reduziert, ≤ 30 KB je Welt, Skripte in `scripts/`), Logo, Hostinger-Partner-Badge (ohne Link) und Porträt (ohne Metadaten) lokal.
- **Server-Teil:** `public/api/kontakt.php` (Honeypot, Prüfung, Mengenbegrenzung ohne IP, kein Inhalt in Logs, Versand per `mail()` oder optional per SMTP über das IONOS-Postfach), `public/.htaccess` (HTTPS, HSTS, Header, saubere Adressen). Zugangsdaten nur in `api/config.php` auf dem Server (Vorlage `config.sample.php`, in `.gitignore`).

## 4a. Neue Weltpaletten (7. Oktober 2026)
Alle zehn Weltpaletten sind in `src/config/journey.js` ersetzt (Welt 01 Weizengold #E9C46A, 02 unverändert, 03 Planblau-Weiß #DCE8F1, 04 Reinweiß, 05 British Racing Green, 06 Flieder, 07 Stahlschiefer, 08 Mint, 09 Dämmerungsviolett, 10 Weiß). Dritter NP-Modus „mittel“ (Welten 01 und 06, Maßschicht und Rahmen in Tinte, Anfrage-Button mit Nacht-Rand). Prüfung: `npm run check:palettes` (läuft vor dem Build). Die Blueprint mit den neuen Werten liegt unter `docs/BLUEPRINT.md`, die Änderungsliste unter `docs/blueprint-aenderungen-paletten.md`.

## 5. Entscheidungen von Niklas (verbindlich)
- Repository ist der maßgebliche Stand; Altseite nur Beispiel. E-Mail überall `kontakt@np-webdesign.de`. Keine Telefonnummer im Rahmen, Kontakt über Formular (im Impressum steht sie weiter). Antwortzeit „innerhalb von 2 Werktagen“.
- Hoster Hostinger (Vertragspartner laut Rechnung: HOSTINGER operations, UAB, Vilnius), Rechenzentrum Deutschland bestätigt. Postfach bei IONOS. Hostinger-Partner-Badge bleibt (er ist offizieller Partner). Demos erst einmal weggelassen.
- Studiennamen vorerst wie jetzt (Halmberg, Messingstuhl, Wittgenfeld Bau, geplant TORQUEL u. a.); die bisherigen Namen gab es als reale Betriebe. Markenrecherche macht Niklas selbst vor dem Livegang. Werdegang-Text ist von Niklas freigegeben.
- Preise Starter und Professional um 100 € erhöht.

## 6. Offen
**Von Niklas:**
1. Speicherdauer der Logfiles bei Hostinger erfragen (Support) und den sichtbaren Platzhalter in `src/content/datenschutz.html` ersetzen.
2. IONOS-Angaben im Datenschutz (IONOS SE, Montabaur) gegen den Vertrag prüfen; Auftragsverarbeitungsvertrag bestätigen.
3. `api/config.php` mit IONOS-SMTP-Zugangsdaten auf dem Server anlegen; danach Testanfrage senden.
4. Markenrecherche der Studiennamen (DPMAregister, EUIPO).
5. Rechtsprüfung: Liste in `docs/rechtspruefung.md` (Hostinger-Unterauftragnehmer inkl. AWS/Google Cloud, Standardvertragsklauseln, Formular, Einwilligungsbanner/Matomo, Badge, Aussagen, Lizenzen, BFSG).
6. Livegang: `dist` bei Hostinger hochladen 
7. Bildmaterial und Demo-Code der Studien, falls später gewünscht.

**Entwicklung:**
- Einwilligungsbanner und Matomo auf eigenem Server: erst bauen, wenn der Rechtsprüfer die Statistikfrage beantwortet hat (ohne Statistik braucht die Seite keinen Banner).
- Social-Vorschaubilder (Open Graph).
- Phase-1-Abnahme: Lighthouse (Ziel ≥ 90 Mobil auf Startseite und zwei Branchenseiten), Tests auf echten Geräten, VoiceOver und NVDA.
- Danach Phase 2/3: Welten 04–10 (Haas & Sternfeld, Chromwerk, Jana Ahrens, TORQUEL, Praxis am Weiher, Gut Weidenstein, NP Labor) mit Übergängen, Branchenseiten, Werkplan mit mehr Zellen; Seite „Über mich“ und „Projekte“ laut Blueprint.
- Branchenseiten der drei übernommenen Seiten bei Wunsch um Checkliste und FAQ ergänzen.

## 7. Bekannte Einschränkungen und Risiken (ehrlich)
- Nur in Headless-Chromium (Playwright) geprüft. Keine echten Geräte, keine Screenreader-Tests, **Lighthouse nie gelaufen**.
- `.htaccess` und der SMTP-Versand über IONOS sind nicht auf dem echten Server getestet (SMTP nur gegen lokalen Testserver mit STARTTLS und Anmeldung).
- Rechtstexte sind nicht anwaltlich geprüft. Die Datenschutzerklärung enthält einen offenen Platzhalter (Logfile-Dauer) und Annahmen über Hostinger, die laut Niklas’ Angaben formuliert sind.
- Bodoni-Haarlinien (Welt 02) sind auf 1×-Bildschirmen bei kleinen Versalien dünn; große Schrift ist auf optische Größe 20 festgelegt.
- Die Zellen im Werkplan zeigen echte Bilder der gebauten Welten (`scripts/render-previews.cjs`, WebP, je 3–7 KB). Sie müssen nach sichtbaren Änderungen an einer Welt neu erzeugt werden; AVIF fehlt, weil ImageMagick hier nur lesen kann.
- Die Blueprint-Zahl „zehn Welten“ ist im Text dynamisch (aktuell „Drei Welten. Die vierte gehört Ihnen.“); die letzte Welt heißt im Kontakt „Welt 04“ und wird mit jeder neuen Welt automatisch weitergezählt.

## 8. Wichtige Dateien
- `README.md`: Struktur, Modi, Welten, Schriftskripte, Formular.
- `docs/rechtspruefung.md`: Prüfliste für den Rechtsprüfer.
- `src/config/journey.js` (Reise, Paletten, Längen, Übergangsvarianten), `site.js` (Kontaktdaten, Preise, Schritte, FAQ).
- `src/motion/*.js` (Szenen), `src/worlds/NN-name/` (Welt-Module: `World.astro`, `world.css`, `motion.js`, `data.js`).
- `tools/check-site.cjs` (Datenschutz- und Qualitätsabnahme), `tools/axe-check.cjs` (axe, WCAG 2.2 AA), `scripts/render-previews.cjs` (Vorschau- und Social-Bilder).

## 9. Regeln für die Weiterarbeit
- Keine Drittanbieter-Anfragen, keine Cookies, kein Browser-Speicher ohne Handlung; vor jeder technischen Änderung die Datenschutzerklärung prüfen (Pflegeregel der Blueprint).
- Fehlende Inhalte als sichtbarer `[PLATZHALTER: …]`, nie erfunden. Orange gehört NP: Welt-Paletten nutzen keine Farbtöne 10–35° mit mehr als 55 % Sättigung.
- Nach jeder Änderung `check-site.cjs` und axe laufen lassen; nichts auf `main` pushen, ohne dass Niklas es ausdrücklich sagt.
