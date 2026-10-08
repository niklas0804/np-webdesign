# NP Webdesign · Relaunch „Die Journey“

Statische Astro-Seite (Blueprint Abschnitt N/T). Kein UI-Framework, kein WebGL, kein Lottie, keine Fremdserver.
Die laufende Seite im Repo-Wurzelverzeichnis bleibt bis zum Umzug unberührt.

## Befehle

```bash
npm install
npm run dev        # Entwicklung
npm run build      # erzeugt dist/ (nur Dateien, nichts Inline)
npm run preview    # dist/ lokal ansehen

# Datenschutz- und Qualitäts-Abnahme (Blueprint Q2 / T.4), braucht Playwright mit Chromium
NODE_PATH=$(npm root -g) node ../tools/check-site.cjs dist
```

## Aufbau

| Pfad | Inhalt |
| --- | --- |
| `src/config/journey.js` | **Einzige Quelle** für Reihenfolge, Längen (vh), Paletten, Welten, Claim-Texte. Aktuelle Bauphase: `PHASE` |
| `src/config/site.js` | Kontakt, Pakete und Preise (einzige Preisstelle), FAQ, Arbeitsweise, sichtbare Platzhalter |
| `src/pages/journey.css.js` | erzeugt `/journey.css` aus der Konfiguration (Längen, Paletten) |
| `src/content/branchen.js` | Texte der Branchenseiten (aus den Beispielkonzepten Friseur & Barber, Handwerker, Beratung & Coaching), Vorlage `src/pages/branchenloesungen/[slug].astro` |
| `src/components/` | Rahmen, Menü, Opening, Werkplan, Übergang, Zwischenspiele, Finale, Kontakt, FAQ, Footer |
| `src/motion/` | GSAP-Module: Grundgerüst/Modi, Rahmen, Opening-Szene, Übergänge, Zwischenspiele, Satz nach Maß, Menü |
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

Jede Welt ist ein Modul unter `src/worlds/<nr>-<name>/` (Markup, CSS, Bewegung, Daten). Nicht gebaute Welten zeigen `WorldStub`.
Das Bewegungsmodul einer Welt lädt erst 1,5 Bildschirmhöhen vor der Welt (`src/motion/index.js`, `WORLD_MODULES`).

| Welt | Stand |
| --- | --- |
| 01 Halmberg | gebaut (Studie, Demo-Daten); Eingangs-Übergang t00 läuft auf der Opening-Bühne |
| 02 Messingstuhl | gebaut als Entwurf nach Blueprint (Demo-Code liegt nicht vor); Eingangs-Übergang t01 (Bon wird Wartemarke) |
| 03 Wittgenfeld Bau | gebaut als Entwurf nach Blueprint (Demo-Code liegt nicht vor); Eingangs-Übergang t02 (Goldlinie wird Maßlinie); Planblätter Grundriss/Schnitt/Ansicht, Schnitt baut sich beim Scrollen auf, Bauteil-Explosion mit Tastaturbedienung |

Weltschriften werden auf die benutzten Zeichen reduziert: `scripts/subset-fraunces.py` (Welt 01, zwei Dateien, 29,2 KB), `scripts/subset-bodoni.py` (Welt 02, eine Datei, 20,5 KB) und `scripts/subset-barlow.py` (Welt 03, zwei Dateien, 15 KB).
Das Finale (`src/components/Finale.astro`, `src/motion/finale.js`, `src/styles/finale.css`) ist eine gepinnte Bühne mit Zoom, Einladung und Sprung in den Kontakt; ruhig und ohne JavaScript bleibt nur die Einladung. Seine Länge steht in `journey.js` (200/140 vh statt 120/100 im Blueprint, weil Rückzoom und Sprung dazukommen).
Übergänge mit eigenem Staffelstab stehen in `TRANSITION_VARIANTS` (`src/config/journey.js`), die Szenen in `src/motion/transitions.js`.

## Stand (Phase 1)

Gebaut: Reise-Konfiguration, Tokens, Rahmen, Menü, Opening mit Rückzoom und Werkplan, Eingangs-Übergänge t00 bis t03 (t03: Prüfstempel wird NP-Siegel, P-Iris), Welten 01 bis 03,
Standard-Übergänge, Zwischenspiele I–III, Finale mit Rückzoom auf den Werkplan, leerem Zentrum und Sprung in den Kontakt, letzte Welt mit Kontaktformular und Live-Vorschau, FAQ, Footer, `/leistungen`, `/impressum`,
`/datenschutz`, 404, vier Branchenseiten (Bäckerei, Friseur & Barber, Handwerker, Beratung & Coaching), Ruhig-Modus, Betrieb ohne JavaScript, Logo (SVG), Hostinger-Partner-Badge (selbst gehostet), Porträt.

Noch offen: Einwilligungsbanner mit Matomo, Social-Vorschaubilder, Welten 04–10,
Prüfung von Impressum und Datenschutz durch eine fachkundige Stelle, Freigabe des Werdegang-Textes.

## Rechtliche Prüfung

`docs/rechtspruefung.md` listet alle Punkte, die ein Prüfer ansehen soll (Hoster und Unterauftragnehmer, Formular, Banner, Badge, Inhalte, Lizenzen).
`public/.htaccess` enthält HTTPS, Header und saubere Adressen für Hostinger (nicht lokal testbar).

## Kontaktformular (Welt 11)

- Markup `src/components/Kontakt.astro`, Stil `src/styles/kontakt.css`, Verhalten `src/motion/kontakt.js` (Live-Vorschau, Prüfung beim Verlassen eines Feldes, Senden per `fetch`, nichts wird zwischengespeichert).
- Ohne JavaScript sendet das Formular normal an `/api/kontakt.php`; die Antwort zeigt die Seite über `#anfrage-erhalten` bzw. `#anfrage-fehler` (`:target`).
- Endpunkt `public/api/kontakt.php` (PHP 8): Honeypot, serverseitige Prüfung, Mengenbegrenzung (Gesamtzahl pro Stunde, ohne IP-Adressen), Versand per `mail()`, kein Inhalt in Logs.
- Auf dem Server optional `api/config.php` neben der Datei anlegen (Vorlage `config.sample.php`; Empfänger und Absender). Sie steht in `.gitignore` und kommt nie ins Repository.
- Das Postfach liegt bei IONOS, die Website bei Hostinger. Empfohlen: in `config.php` den Eintrag `smtp` setzen (Vorlage liegt bei), dann geht die Anfrage über das IONOS-Postfach selbst (STARTTLS, Anmeldung) und Absender und SPF passen zusammen. Ohne `smtp` nutzt der Endpunkt `mail()` von Hostinger; dann SPF-Eintrag der Domain für Hostinger prüfen.
- Nach dem Hochladen einmal eine Testanfrage senden.
- Lokal testen: `php -S 127.0.0.1:8098 -t dist` (mit `sendmail_path` auf ein Skript, das die Mail in eine Datei schreibt).
