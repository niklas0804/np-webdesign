# Auftrag für Opus: Recherche und Vorprüfung vor dem Livegang

Für Niklas Prüfling (NP Webdesign, Schwandorf). Quelle der Punkte: `docs/offen-niklas.md`, Abschnitt 2, und `docs/rechtspruefung.md`.

## Rahmen
- Website: np-webdesign.de, statisch (Astro), gehostet bei Hostinger; das E-Mail-Postfach `kontakt@np-webdesign.de` liegt bei IONOS. Geprüfter Stand: kein Cookie, `localStorage`-Eintrag `np-calm` nur nach Klick auf „Ruhige Ansicht“, keine Fremd-Requests.
- **Keine Rechtsberatung:** Alles, was du lieferst, ist eine Vorprüfung. Wo ein Anwalt nötig ist, sag es und formuliere die Fragen an ihn.
- **Quellen:** Zu jeder Aussage Link und Abrufdatum. Was du nicht findest oder nur aus dem Gedächtnis weißt, kennzeichnest du so. Nichts erfinden, keine Zahlen raten.
- **Geheimnisse:** Keine Passwörter oder Zugangsdaten abfragen oder aufschreiben. Nichts am Repository ändern, nichts auf `main` pushen.
- **Ergebnisformat:** je Punkt „Befund“, „Quelle“, „Sicherheit (hoch/mittel/niedrig)“, „Was Niklas noch tun muss“.

## Aufgaben

### 1. Logfile-Speicherdauer bei Hostinger (Datenschutz-Platzhalter)
Klären kannst du: Was steht in Hostingers öffentlicher Datenschutzerklärung, im Data Processing Addendum und in der Hilfe zu Server-Logfiles und Speicherdauer? Gibt es eine nennenswerte Angabe zu Rechenzentrumsstandort Deutschland und Unterauftragnehmern?
Nur Niklas kann: bei Hostinger-Support die verbindliche Zahl erfragen. **Liefere dafür einen kurzen Fragetext.** Danach fügt Niklas die Zahl in `src/content/datenschutz.html` ein.

### 2. SPF, DKIM, DMARC für np-webdesign.de
Klären kannst du: Welche DNS-Einträge verlangen IONOS (Versand über das Postfach per SMTP `smtp.ionos.de`, Port 587) und Hostinger (falls `mail()` genutzt wird)? Beispiel-Einträge mit Erklärung. Falls du Netzzugriff hast: aktuelle TXT-Einträge für `np-webdesign.de` und `_dmarc.np-webdesign.de` abfragen und bewerten.
Nur Niklas kann: Einträge im DNS-Verwalter setzen und eine Testmail an eine externe Adresse senden (z. B. mit Header-Prüfung).

### 3. Hostinger-Servertest von außen
Klären kannst du (nur mit Netzzugriff): `curl -I` auf `/`, `/leistungen`, `/impressum`, `/datenschutz`, `/api/kontakt.php`, eine nicht vorhandene Adresse und `/api/config.php`. Erwartung: HTTPS-Umleitung, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, keine `Set-Cookie`-Header, `/api/config.php` liefert 403 (nicht 404 und nicht Inhalt).
Zusätzlich: kein `Set-Cookie` und keine Fremd-Domain im Netzwerkverkehr (Browserlauf).
Nur Niklas kann: ohne Netzzugriff den Web-Inspektor in Safari prüfen.

### 4. Markenrecherche (Vorprüfung)
Namen: **NP Webdesign**, Halmberg, Messingstuhl, Wittgenfeld Bau, Haas & Sternfeld, Chromwerk, Jana Ahrens, TORQUEL. Relevante Klassen: vor allem 42 und 35, dazu je nach Studie die Branche (z. B. 30 Backwaren, 37 und 45 bei Kanzlei/Werkstatt, 40 und 7 Industrie, 44 Physiotherapie, 43 Gastronomie).
Klären kannst du: DPMAregister, EUIPO TMview und WIPO Global Brand Database auf identische und ähnliche Marken prüfen; Domains und Unternehmensnamen (Handelsregister, Google) auf Kollisionen ansehen. Trefferliste mit Einschätzung „unkritisch / prüfen / kritisch“.
Nur ein Anwalt oder Markenspezialist kann: verbindlich beurteilen, ob Verwechslungsgefahr besteht.

### 5. Rechtliche Vorprüfung
Grundlage ist `docs/rechtspruefung.md`. Klären kannst du:
- Datenschutz: Genügt die Beschreibung von `np-calm` unter § 25 Abs. 2 Nr. 2 TDDDG? Ist die Erklärung vollständig (Hostinger, IONOS, Formular)? Fehlt eine Aussage zur Transportverschlüsselung der Mail?
- Impressum: Pflichtangaben nach § 5 DDG prüfen (Hinweis zu Kleinunternehmer § 19 UStG, USt-ID nur falls vorhanden).
- Branchenseiten: Berufsrecht der Steuerberater und Rechtsanwälte (Werbung), Heilmittelwerbegesetz (Physiotherapie), Preisangabenverordnung und Allergenkennzeichnung (Gastro/Hotel). Welche Sätze auf den Seiten sind riskant, was ist unkritisch?
- Hinweis auf erfundene Betriebe: Muss auf der Seite gekennzeichnet sein, dass die Studien frei erfundene Beispiele sind?
Nur ein Anwalt kann: verbindlich freigeben. **Liefere als Ergebnis eine Fragenliste für einen auf IT-Recht spezialisierten Anwalt.**

### 6. KI-Bilder für die Fotoliste (optional)
Klären kannst du: Welche Bildgeneratoren erlauben die kommerzielle Nutzung, wie sind Urheberrecht und Kennzeichnung (EU-KI-Verordnung Art. 50, ab August 2026) geregelt, und was gilt für „Beispielbilder“ einer Studie mit erfundenem Betrieb? Welche Bilder der Liste `docs/fotoliste.md` sind mit KI machbar (gleicher Standpunkt bei drei Seebildern, Vorher/Nachher desselben Fahrzeugs, 12 Ansichten eines Bauteils)?
Nur Niklas entscheidet: ob er KI-Bilder einsetzt und wie er sie kennzeichnet.

## Rückgabe
Ein Dokument mit den sechs Ergebnissen, danach die Punkte, bei denen Niklas selbst handeln muss. Das Dokument gibt Niklas an Claude Code zurück; Änderungen am Repository macht Claude Code.
