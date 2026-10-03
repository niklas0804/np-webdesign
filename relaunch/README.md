# NP Webdesign · Relaunch „Die Journey“

Statische Astro-Seite (Blueprint Abschnitt N/T). Kein UI-Framework, kein WebGL, kein Lottie, keine Fremdserver.
Die laufende Seite im Repo-Wurzelverzeichnis bleibt bis zum Umzug unberührt.

## Befehle

```bash
cd relaunch
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

## Welten

Jede Welt ist ein Modul unter `src/worlds/<nr>-<name>/` (Markup, CSS, Bewegung, Daten). Nicht gebaute Welten zeigen `WorldStub`.
Das Bewegungsmodul einer Welt lädt erst 1,5 Bildschirmhöhen vor der Welt (`src/motion/index.js`, `WORLD_MODULES`).

| Welt | Stand |
| --- | --- |
| 01 Korn & Kruste | gebaut (Studie, Demo-Daten); Eingangs-Übergang t00 läuft auf der Opening-Bühne |
| 02 Herrenzimmer | gebaut als Entwurf nach Blueprint (Demo-Code liegt nicht vor); Eingangs-Übergang t01 (Bon wird Wartemarke) |
| 03 Steiner Bau | Platzhalter, wird nach Blueprint gebaut |

Weltschriften werden auf die benutzten Zeichen reduziert: `scripts/subset-fraunces.py` (Welt 01, zwei Dateien, 29,6 KB) und `scripts/subset-bodoni.py` (Welt 02, eine Datei, 20,5 KB).
Übergänge mit eigenem Staffelstab stehen in `TRANSITION_VARIANTS` (`src/config/journey.js`), die Szenen in `src/motion/transitions.js`.

## Stand (Phase 1)

Gebaut: Reise-Konfiguration, Tokens, Rahmen, Menü, Opening mit Rückzoom und Werkplan, Eingangs-Übergänge t00 und t01, Welten 01 und 02,
Standard-Übergänge, Zwischenspiele I–III, Finale-Rahmen, FAQ, Footer, `/leistungen`, `/impressum`, `/datenschutz`, 404,
drei Branchenseiten, Ruhig-Modus, Betrieb ohne JavaScript.

Noch Platzhalter: Welt 03, Kontaktformular mit Live-Vorschau und Endpunkt, Finale-Rückzoom, Einwilligungsbanner mit Matomo,
Branchenseite Bäckerei, Hostinger-Partner-Badge (Datei liefern), Logo (das Signet ist ein Platzhalter), Social-Vorschaubilder.
