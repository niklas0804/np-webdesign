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

## Stand (Phase 1, Schritt 1: Fundament)

Gebaut: Reise-Konfiguration, Tokens, Rahmen (Monogramm, Lebenszeichen, Weltzähler, Lineal, Schnittmarken, Mobile-Leiste), Menü,
Opening mit Rückzoom auf den Werkplan, Standard-Übergänge, Zwischenspiele I–III (Copy-Deck), Finale-Rahmen, FAQ, Footer,
`/leistungen`, `/impressum`, `/datenschutz`, 404, drei Branchenseiten (Friseur & Barber, Handwerker, Beratung & Coaching), Ruhig-Modus, Betrieb ohne JavaScript.

Noch Platzhalter: Welten 01–03 (je ein eigener Bauschritt), Kontaktformular mit Live-Vorschau und Endpunkt, Finale-Rückzoom,
Einwilligungsbanner mit Matomo, Branchenseite Bäckerei, Screenshots und Live-Demos der Branchenseiten, Social-Vorschaubilder, Logo (Signet ist ein Platzhalter).
