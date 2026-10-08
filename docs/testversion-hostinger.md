# Testversion auf Hostinger (Subdomain test.np-webdesign.de)

Die Live-Seite bleibt unberührt: Alles liegt in einem eigenen Unterordner der Subdomain.

## Was du hochlädst
Die Datei **`deploy/np-webdesign-test.zip`**. Ihr Inhalt gehört direkt in den Ordner der Subdomain (kein zusätzlicher Unterordner). Darin sind die fertige Seite, `.htaccess` (Passwortschutz, X-Robots-Tag), `.htpasswd`, `robots.txt` (alles gesperrt) und `api/kontakt.php`.

## Schritt für Schritt (hPanel)
1. **Subdomain anlegen:** hPanel → Websites → np-webdesign.de „Verwalten“ → **Domains → Subdomains**. Name `test` eingeben, Ordner `public_html/test` (so wird er meist vorgeschlagen), anlegen. Das SSL-Zertifikat für die Subdomain legt Hostinger automatisch an. Das kann einige Minuten dauern.
2. **Datei-Manager öffnen:** hPanel → **Dateien → Datei-Manager**, Ordner `public_html/test` öffnen. Liegt dort eine Platzhalterdatei (z. B. `default.php`), löschen. **Nur diesen Ordner anfassen**, nicht `public_html` selbst.
3. **ZIP hochladen:** Oben rechts „Hochladen“ → `np-webdesign-test.zip` wählen. Danach Rechtsklick auf die ZIP → **Entpacken** → in den aktuellen Ordner (`public_html/test`). Die ZIP danach löschen.
4. **Versteckte Dateien anzeigen:** Im Datei-Manager Einstellungen (Zahnrad) → „Versteckte Dateien anzeigen“. Jetzt sind `.htaccess` und `.htpasswd` sichtbar.
5. **Pfad für den Passwortschutz eintragen:** Öffne `.htaccess` (Rechtsklick → Bearbeiten) und suche die Zeile `AuthUserFile /home/uXXXXXXXXX/domains/np-webdesign.de/public_html/test/.htpasswd`. Ersetze `uXXXXXXXXX` durch deine Hosting-Kennung (steht in hPanel unter **Dateien → FTP-Konten** als Benutzername, z. B. `u123456789`). Der Rest muss zum Ordnerpfad passen: `/home/<Kennung>/domains/np-webdesign.de/public_html/test/.htpasswd`. Speichern.
   - **Einfacher Weg ohne Pfad:** hPanel → **Erweitert → Passwortgeschützte Verzeichnisse** (Password Protect Directories), Ordner `public_html/test` wählen, Benutzer und Passwort setzen. Dann in der `.htaccess` den Block zwischen „NUR TESTVERSION“ und „ENDE TESTVERSION“ bis auf die `Header`-Zeile löschen und die Datei `.htpasswd` entfernen, damit nichts doppelt schützt.
6. **Anmeldung:** Benutzername und Passwort stehen in der Antwort im Chat. Ändern kannst du das Passwort, indem du die Zeile in `.htpasswd` durch eine neue ersetzt (Erzeugung: `openssl passwd -apr1 NeuesPasswort`) oder indem du das Skript `scripts/build-test.sh` mit eigenem Passwort neu laufen lässt.
7. **Prüfen:**
   - `https://test.np-webdesign.de` öffnen: Es muss eine Anmeldung kommen, danach die neue Seite.
   - `https://test.np-webdesign.de/robots.txt` zeigt `Disallow: /`.
   - Header prüfen (nach Anmeldung): Browser-Entwicklertools → Netzwerk → Antwortheader enthält `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`.
   - `https://np-webdesign.de` zeigt weiter die bisherige Seite.
8. **Kontaktformular:** Eine Testanfrage landet im echten Postfach `kontakt@np-webdesign.de`, solange keine `api/config.php` existiert. Für den SMTP-Versand und einen anderen Empfänger `api/config.sample.php` als `config.php` kopieren und ausfüllen.

## Wenn etwas nicht klappt
- **500-Fehler:** Meist der `AuthUserFile`-Pfad. Pfad prüfen oder den einfachen Weg über „Passwortgeschützte Verzeichnisse“ nehmen.
- **Kein Passwort-Fenster:** Datei heißt genau `.htaccess` (mit Punkt) und liegt direkt in `public_html/test`.
- **Zertifikatswarnung:** Beim ersten Aufruf nach dem Anlegen der Subdomain noch ein paar Minuten warten.
- **Die bisherige Seite verändert sich:** Dann wurde etwas außerhalb von `public_html/test` überschrieben. Den Ordner `public_html` nicht anfassen.

## Aufräumen
Nach dem Test die Subdomain im hPanel löschen und den Ordner `public_html/test` entfernen.

## Neu bauen
`sh scripts/build-test.sh` (Passwort wird neu erzeugt und angezeigt). Optional vorher `NP_TEST_PATH=/home/u123456789/domains/np-webdesign.de/public_html/test` setzen, dann steht der richtige Pfad schon in der `.htaccess`.
