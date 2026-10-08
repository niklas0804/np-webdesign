# Prüfliste für die rechtliche Prüfung (np-webdesign.de, Relaunch)

Stand: 7. Oktober 2026 · Verantwortlicher: Niklas Prüfling, Einzelunternehmen, Friedrich-Ebert-Straße 60, 92421 Schwandorf
Quelle der Texte: `src/content/impressum.html`, `src/content/datenschutz.html`, `src/components/*`, `public/api/kontakt.php`.
Diese Liste ist keine Rechtsberatung. Sie sagt, was die Seite tut, und fragt, was geprüft werden soll.

## 1. Was die Seite technisch tut (Grundlage der Prüfung)

| Vorgang | Daten | Empfänger | Stand |
| --- | --- | --- | --- |
| Seitenaufruf | IP-Adresse, Zeitpunkt, Seite, Browserkennung (Server-Logfiles) | HOSTINGER operations, UAB, Vilnius (Auftragsverarbeiter), dessen Unterauftragnehmer (u. a. AWS, Google Cloud) | läuft |
| Kontaktformular | Name, E-Mail, Nachricht; freiwillig Unternehmen, Telefon, Anliegen | Hostinger (Entgegennahme, Versand), IONOS SE (Postfach) | gebaut |
| Direkte E-Mail oder Anruf | was der Absender mitteilt | IONOS SE (Postfach), Telefonanbieter | läuft |
| „Ruhige Ansicht“ | ein Eintrag im Browser (localStorage `np-calm`), erst nach Klick | niemand, bleibt im Browser | läuft |
| Statistik (Matomo, eigener Server) | Seitenaufrufe, Scrolltiefe, Klicks, gekürzte IP, Besucherkennung im Cookie | eigene Installation bei Hostinger | **geplant, noch nicht gebaut** |
| Einwilligungsbanner | Entscheidung im Browser | niemand | **geplant, noch nicht gebaut** |
| Schriften, Skripte, Bilder, Logo, Partner-Badge | keine Übermittlung, alles vom eigenen Server | niemand | läuft |

Technisch abgesichert (Prüfskript `tools/check-site.cjs`): null Anfragen an fremde Hosts, keine Cookies, kein Browser-Speicher vor einer Handlung, strikte Content-Security-Policy ohne Inline-Code.

## 2. Impressum (`impressum.html`)

- [ ] Pflichtangaben nach § 5 DDG vollständig (Name, Anschrift, E-Mail, zweiter schneller Kontaktweg: Telefon im Impressum, Kontaktformular auf der Seite)?
- [ ] Telefonnummer im Impressum belassen oder genügt Formular plus E-Mail?
- [ ] Hinweis Kleinunternehmer § 19 UStG korrekt formuliert? Keine USt-IdNr. nötig?
- [ ] Verbraucherstreitbeilegung (§ 36 VSBG): Formulierung „nehme nicht teil“ passend, wenn nur Unternehmer als Kunden angesprochen werden?
- [ ] Haftungsausschluss und Urheberrechtstext: zeitgemäß, nichts Überflüssiges oder Abmahnträchtiges?
- [ ] Berufsrechtliche Angaben nötig? (Webdesign: voraussichtlich nein.)

## 3. Datenschutzerklärung (`datenschutz.html`)

**Hoster und Unterauftragnehmer**
- [ ] Vertragspartner: HOSTINGER operations, UAB, Švitrigailos str. 34, 03230 Vilnius, Litauen (laut Rechnung). Ist das der richtige Verantwortliche/Auftragsverarbeiter für das Webhosting?
- [ ] Auftragsverarbeitung nach Art. 28 DSGVO: Hostingers Data Processing Addendum ist Teil der Nutzungsbedingungen. Reicht das, oder ist ein gesondert unterzeichneter Vertrag nötig? Liegt eine Kopie vor?
- [ ] **Unterauftragnehmer:** Hostinger setzt u. a. Amazon Web Services und Google Cloud ein. Stimmt die Beschreibung im Text? Aktuelle Unterauftragnehmerliste von Hostinger abgleichen.
- [ ] **Drittlandübermittlung:** Der Text sagt, Übermittlungen außerhalb EU/EWR sind über EU-Standardvertragsklauseln abgesichert (Art. 46 Abs. 2 lit. c DSGVO). Genügt das ohne weitere Prüfung (Transfer Impact Assessment, Datenschutzrahmen EU–USA, Zugriff durch US-Anbieter auf Hostinger-Infrastruktur)?
- [ ] Der Text behauptet bewusst nicht, dass ausschließlich in Deutschland verarbeitet wird. Der Server steht in einem Rechenzentrum in Deutschland (im hPanel bestätigt). Ist die Formulierung ausreichend genau?
- [ ] **Logfiles:** Speicherdauer bei Hostinger ist offen (Anfrage beim Support läuft). Im Text steht ein sichtbarer Platzhalter `[PLATZHALTER: Speicherdauer Logfiles laut Hostinger]`. Vor dem Livegang ersetzen. Welche Dauer ist vertretbar (Blueprint: so kurz wie möglich, z. B. 7 Tage)?
- [ ] Rechtsgrundlage Logfiles Art. 6 Abs. 1 lit. f DSGVO: Begründung ausreichend?

**Kontaktformular und E-Mail**
- [ ] Rechtsgrundlage Art. 6 Abs. 1 lit. b DSGVO, hilfsweise lit. f: richtig, wenn auch Anfragen von Interessenten ohne konkreten Vertragswunsch eingehen?
- [ ] Information nach Art. 13 DSGVO am Formular: Der Hinweis „Ihre Angaben verwende ich nur, um Ihre Anfrage zu beantworten“ mit Link zur Erklärung. Keine Pflicht-Checkbox (so im Audit empfohlen). Reicht das?
- [ ] Postfach bei IONOS SE: Auftragsverarbeitungsvertrag vorhanden? Firmenname und Sitz im Text (IONOS SE, Montabaur) gegen den Vertrag abgleichen.
- [ ] Transportverschlüsselung: Formular per HTTPS; Versand entweder über den Mailserver von Hostinger (`mail()`) oder per authentifiziertem SMTP zum Postfach (`config.php`). Genügt das als technisch-organisatorische Maßnahme (Art. 32 DSGVO)? Empfehlung: SMTP über das IONOS-Postfach mit STARTTLS.
- [ ] Speicherdauer „bis zur abschließenden Bearbeitung, bei Auftrag gesetzliche Fristen“: konkret genug? Fristen für Geschäftsbriefe (§ 257 HGB, § 147 AO) richtig zugeordnet?
- [ ] Spamschutz ohne Personenbezug (Honeypot, Mengenbegrenzung nach Gesamtzahl pro Stunde, ohne IP-Speicherung): Darstellung im Text richtig und ausreichend?
- [ ] Hinweis, dass der Formularinhalt bis zum Absenden im Browser bleibt (Live-Vorschau lokal): sinnvoll oder überflüssig?

**Browser-Speicher**
- [ ] „Ruhige Ansicht“ speichert erst nach Klick einen Eintrag im Browser und stützt sich auf § 25 Abs. 2 Nr. 2 TDDDG (unbedingt erforderlich für den vom Nutzer gewünschten Dienst). Trägt diese Einordnung?
- [ ] Opening-Animation merkt sich bewusst nicht, ob sie schon lief (kein Speichern ohne Handlung).

**Allgemeiner Teil**
- [ ] Verantwortlicher, Betroffenenrechte, Beschwerderecht (BayLDA, Ansbach), Löschung und Aufbewahrung, Rechtsgrundlagen: aktuell und vollständig?
- [ ] Der Text beschreibt nur, was die Seite tut. Keine Absätze über Dienste, die nicht laufen. Gegenprüfen nach jeder technischen Änderung (Pflegeregel).
- [ ] Verzeichnis von Verarbeitungstätigkeiten (Art. 30 DSGVO) vorhanden? Löschkonzept? Datenschutzbeauftragter nicht nötig (Einzelunternehmer, wenige Personen)?

## 4. Einwilligungsbanner und Statistik (geplant)

Noch nicht gebaut. Bitte das Konzept bewerten, bevor es gebaut wird (Blueprint Abschnitt Q2):
- [ ] Ist ohne Statistik kein Banner nötig, wenn nur Notwendiges gespeichert wird? (Aktueller Stand: ja, kein Banner.)
- [ ] Matomo auf dem eigenen Server bei Hostinger, nur nach Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG): Ist das so zulässig, oder reicht eine cookielose, anonymisierte Messung ohne Einwilligung?
- [ ] Banner-Gestaltung: „Akzeptieren“ und „Ablehnen“ gleichwertig, keine vorab gesetzten Häkchen, Widerruf jederzeit über „Datenschutz-Einstellungen“ im Footer, Speicherdauer der Entscheidung (12 Monate), Cookie-Laufzeit höchstens 6 Monate, IP-Adresse gekürzt.
- [ ] Nachweis der Einwilligung nötig? Wie dokumentiert (nur im Browser, ohne Server-Protokoll)?
- [ ] Matomo-Auftragsverarbeitung: gleicher Hoster, daher dieselbe Kette wie in Abschnitt 3?

## 5. Hostinger-Partner-Badge und Werbung

- [ ] Das Badge (Hostinger-Partnerprogramm) liegt als Bilddatei auf dem eigenen Server, ohne Link und ohne Tracking. Ist es als Eigenwerbung/Vertrauenssiegel unbedenklich oder als Werbung zu kennzeichnen (§ 5a UWG, § 6 DDG)?
- [ ] Nutzungsbedingungen der Marke Hostinger für das Badge eingehalten (Größe, Abstand, Änderungsverbot)?
- [ ] Sollte später ein Empfehlungslink dazukommen: Kennzeichnung „Werbung“ und Anpassung der Datenschutzerklärung (Klick auf externen Link, ggf. Tracking durch Hostinger).

## 6. Inhalte und Wettbewerbsrecht

- [ ] **Studien-Welten:** Die Welten zeigen erfundene Unternehmen (Halmberg, Messingstuhl, Wittgenfeld Bau, geplant u. a. Haas & Sternfeld, Chromwerk, Jana Ahrens, TORQUEL, Praxis am Weiher, Gut Weidenstein, NP Labor). Sie sind als „Studie“ und „Demo“ gekennzeichnet. Reicht die Kennzeichnung? Markenrecherche (DPMAregister, EUIPO) macht Niklas selbst vor dem Livegang; Namen bleiben bis dahin. Ergebnis hier eintragen: ______
- [ ] **Demo-Daten:** Preise, Zeiten, Maße in den Welten sind erfunden und im Text als Demo bezeichnet (z. B. „Beispielpreise dieser Studie, nicht die Preise von NP Webdesign“). Ausreichend deutlich?
- [ ] **Preisangaben** auf `/leistungen` (Starter 999 €, Professional 1.899 €, Premium ab 2.999 €, jeweils „Endpreis gem. § 19 UStG“): Pflichtangaben nach PAngV, falls Verbraucher angesprochen werden; Zielgruppe ist überwiegend gewerblich.
- [ ] **Antwortzeit:** „Antwort innerhalb von 2 Werktagen“ ist eine verbindliche Zusage. Haftungs- oder Irreführungsrisiko? Eher „in der Regel“?
- [ ] **Werbeaussagen** („individuell, keine Standardvorlagen, keine Baukastensysteme“, „DSGVO-orientierte Umsetzung“, „schnelle Website“) belegbar und nicht irreführend (UWG)?
- [ ] **Branchenseite Bäckerei** (`/branchenloesungen/baeckerei`, neu geschrieben, mit Checkliste und drei FAQ): Aussagen wie „Ein Redaktionssystem gehört zum Premium-Paket“, „Bildrechte klären wir vorher“ und der Hinweis auf geprüfte Allergenangaben sachlich und rechtlich unbedenklich? Die drei anderen Branchenseiten sind wörtlich aus den vorhandenen Beispielkonzepten übernommen.
- [ ] **Werdegang** (Über mich): „gelernter Mechatroniker, heute IT-Systemtechniker“. Berufsbezeichnungen richtig verwendet?
- [ ] **Porträtfoto:** Niklas ist selbst abgebildet, Rechte beim Fotografen/Urheber geklärt (falls nicht Selbstaufnahme)?

## 7. Lizenzen Dritter

- [ ] Schriften (Archivo, IBM Plex Mono, Fraunces, Bodoni Moda, Barlow) stehen unter der SIL Open Font License. Lizenztexte liegen unter `public/fonts/LICENSE-*.txt`. Reicht die Beilage der Lizenztexte, und ist das Reduzieren der Schriften auf benutzte Zeichen (Subsetting) zulässig? Bei Fraunces/Bodoni ggf. Reserved Font Names prüfen.
- [ ] GSAP und Lenis (Animation, lokal ausgeliefert): Lizenzbedingungen für den gewerblichen Einsatz prüfen.
- [ ] Logo: Rechte liegen bei Niklas.

## 8. Barrierefreiheit

- [ ] Barrierefreiheitsstärkungsgesetz (BFSG): Gilt es für dieses Angebot (Kleinstunternehmen, keine Verbraucher-Dienstleistung per E-Commerce)? Ist eine Barrierefreiheitserklärung nötig?
- [ ] Stand: axe-core 0 Verstöße (WCAG 2.2 AA, drei Ansichten), Tastaturbedienung, „Ruhige Ansicht“, Bewegung reduzieren. Echte Screenreader-Tests (VoiceOver, NVDA) stehen noch aus.

## 9. Technische Schutzmaßnahmen (Art. 32 DSGVO)

In `public/.htaccess` hinterlegt (noch nicht auf dem Server getestet): HTTPS erzwungen, HSTS (6 Monate), `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, `frame-ancestors 'none'`.
- [ ] Reichen diese Maßnahmen? Fehlt etwas Erwartbares?
- [ ] Zugangsdaten (SMTP-Passwort) liegen nur in `api/config.php` auf dem Server, nicht im Repository.

## 10. Offene Platzhalter und Entscheidungen vor dem Livegang

- [ ] Speicherdauer Logfiles (Hostinger-Support fragen).
- [ ] Markenrecherche der Studiennamen (Niklas).
- [ ] Ergebnis dieser Prüfung einarbeiten und Datenschutzerklärung neu datieren.

## Fragen an den Prüfer (kurz)

1. Genügt Hostingers Data Processing Addendum samt Standardvertragsklauseln für ein Webhosting mit Unterauftragnehmern in den USA, oder braucht es zusätzliche Maßnahmen?
2. Ist die Statistik mit Matomo ohne Einwilligung vertretbar, oder bleibt der Banner Pflicht?
3. Kann die Zusage „innerhalb von 2 Werktagen“ so stehen bleiben?
4. Ist das Hostinger-Badge ohne Kennzeichnung zulässig?
5. Ist die Kennzeichnung der erfundenen Studien-Unternehmen ausreichend, um Verwechslungen zu vermeiden?

## Nachtrag Phase 2: Branchenseite Kanzlei und Steuerberatung (Welt 04)

- Die Seite `/branchenloesungen/kanzlei` spricht Rechtsanwälte und Steuerberater an. Für diese Berufe gelten berufsrechtliche Grenzen für Werbung. Bitte prüfen, ob Aussagen wie „Urteilsvermögen“, „Sorgfalt“ und „Mandate anbahnen“ in Text, Checkliste und FAQ unbedenklich sind.
- Die Studie Haas & Sternfeld ist fiktiv. Prüfen, ob der Name Verwechslungsgefahr mit einer bestehenden Kanzlei oder Steuerberatung birgt (Markenrecherche macht Niklas selbst vor dem Livegang, Namen bleiben vorerst).
- Beträge, Fristen und Gesetzesbezüge in der Studie sind Beispielwerte und ausdrücklich keine Rechtsauskunft; die Marginalie 1 sagt das. Bitte prüfen, ob der Hinweis ausreicht.

## Nachtrag Phase 2: Branchenseite Oldtimer-Werkstatt (Welt 05)

- Die Studie Chromwerk und das Beispielfahrzeug sind fiktiv; Fahrzeugdaten sind erfunden und nennen keinen Hersteller. Bitte prüfen, ob der Name Verwechslungsgefahr mit einem bestehenden Betrieb birgt (Markenrecherche macht Niklas selbst vor dem Livegang).
- Die Checkliste der Branchenseite nennt Fahrzeughalter-Zustimmung, unkenntlich gemachte Kennzeichen und Markenrechte an Emblemen. Bitte auf Vollständigkeit prüfen. Die Foto-Platzhalter schließen erkennbare Hersteller-Logos aus.

## Nachtrag Phase 2: Branchenseiten Beratung/Coaching (Welt 06) und Industrie (Welt 07)

- Welt 06 zeigt nur erfundene Haltungssätze einer fiktiven Beraterin, keine Kundenstimmen und keine Bewertungen. Bitte prüfen, ob die Kennzeichnung („Studie · erfundene Aussagen“) ausreicht. Die Texte der Branchenseite stammen unverändert aus Niklas’ Vorlage.
- Beratung und Coaching: Bitte prüfen, ob Aussagen zur Wirkung des Coachings (Selbsttest „Drei Fragen“) heilkundliche oder therapeutische Erwartungen wecken könnten. Der Selbsttest ist eine Demo, speichert nichts und trifft keine Aussage über Personen.
- Welt 07 (Industrie): Kennzahlen, Toleranzen und das Messprotokoll sind erfundene Beispielwerte und als solche gekennzeichnet. Bitte prüfen, ob die Kennzeichnung („Demo · Beispielwerte, erfundenes Teil“) genügt und ob die Aussagen der Branchenseite zu Zertifikaten und Normen unbedenklich sind (es werden keine genannt).
- Die Demo-Anfrage mit Dateiauswahl liest und überträgt keine Datei. Bei einer echten Umsetzung wäre der Upload von Zeichnungen (vertrauliche Unterlagen) in der Datenschutzerklärung zu beschreiben.
- Namen der Studien TORQUEL und Jana Ahrens: Markenrecherche macht Niklas selbst vor dem Livegang.
