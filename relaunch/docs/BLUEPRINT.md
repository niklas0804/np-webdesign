# NP Webdesign — Creative Direction „Die Journey“

Sep 30, 2026 · @Niklas Prüfling

## Vorbemerkung: Referenz, Ausgangslage, Kurskorrekturen

Dieses Konzept beschreibt den großen Relaunch von np-webdesign.de: eine durchgehende Scroll-Reise durch zehn Website-Welten. Gebaut ist sie für die Unternehmen, die NP Webdesign tatsächlich gewinnen will. Es baut auf dem Strategie-Audit und dem Sonnet-Master-Prompt vom 11.09.2026 auf und ersetzt deren Designteil.

**Grundlage:** das Briefing (alle 20 Punkte), die Projektbeschreibung, das Strategie-Audit samt Logo-Analyse und die Referenz hiro-amberg.de. Die Referenz habe ich über Quelltext und Seitenstruktur analysiert. Das Bewegungsverhalten ist daraus abgeleitet (Framer-Bau, doppelte Textebenen, Wiederholungsbänder), nicht im Browser beobachtet. Alle Kontrastwerte sind nach der WCAG-Formel nachgerechnet, Schriftachsen und Lizenzen an den Quellen geprüft.

### hiro-amberg.de: was die Seite lehrt

| Prinzip | Beobachtung bei HIRO SAKAO | Übertragung auf NP |
| --- | --- | --- |
| Wiederholung als Rhythmus | Die drei Wörter Sushi, Japanische Küche, Izakaya laufen mehrfach als Band durch die Seite | Ein Band mit den zehn Branchennamen verbindet die Welten — gesteuert vom Scrollen, nicht als Endlos-Autoplay |
| Zweite Schriftebene als Textur | Japanische Schriftzeichen begleiten die lateinischen Versalien | Die **NP-Maßschicht**: Bemaßungslinien, Koordinaten und Mono-Notizen in Orange liegen über jeder Welt |
| Stimmung vor Fakten | Erst „Ein Ort, der verbindet. Ein Erlebnis, das bleibt.“, dann Öffnungszeiten | Jede Welt öffnet mit Bild und Typografie, die Begründung folgt als Werkstattnotiz |
| Lebendiger Status | Live-Öffnungsstatus „Amberg, geschlossen“ im Kopf | „Schwandorf · 14:32“ plus Antwortzeit als lebendiger Marker im Rahmen |
| Fakten bleiben schlicht | Info & Kontakt: Adresse, Telefon, Zeiten — ohne Effekte | Kontakt, Preis-Link und FAQ stehen ohne Inszenierung |
| Rollender Hover | Jeder Menüpunkt steht zweimal im Code und rollt beim Hover | Übernehmen, aber mit einer echten Textebene und einer für Screenreader versteckten Kopie |
| Wenige Wörter, sehr groß | Versalien in kurzen Zeilen über die volle Breite | Statements, die exakt auf die Viewport-Breite gesetzt werden |

**Nicht übernehmen:** Bei HIRO steht der Inhalt pro Breakpoint mehrfach im Code. Screenreader und Suchmaschinen sehen dadurch Dopplungen, und die Kopien driften auseinander: In einer Variante steht „Japanisches Küche“. Für NP gilt deshalb ein einziges DOM, responsive nur über CSS. Außerdem tragen Bildstreifen ohne Text dort Stimmung, aber keine Argumente — NP muss verkaufen, also bekommt jede Welt einen Satz Begründung.

### Wo ich das Briefing bewusst ändere

| Briefing-Idee | Problem | Entscheidung |
| --- | --- | --- |
| Welten für Luxus, Fashion, SaaS, Kreativagentur | Diese Branchen kaufen nicht bei NP. Ein Bäckermeister sieht dort „nicht für mich“. | Zehn Welten aus der eigenen Zielgruppe: Bäckerei, Bau, Kanzlei, Werkstatt, Praxis, Gastgewerbe. Die Bandbreite bleibt, der Bezug kommt dazu. |
| Fiktive Welten als Portfolio | Erfundene Projekte als Referenz auszugeben wäre irreführend | Jede Welt trägt sichtbar „Studie · fiktives Unternehmen“. Echte Projekte bekommen eigene Fallstudien. |
| Drei vorhandene Demos (Herrenzimmer, Steiner Bau, Jana Ahrens) | Bisher nur angeteasert | Sie werden Welt 02, 03 und 06: weniger Neubau, mehr Substanz |
| Logo-Intro in drei Phasen vor dem Inhalt | Ein Intro vor der Botschaft kostet Absprünge — das Audit streicht deshalb den Loader | Phase 1 und 2 dauern zusammen 1,6 s und enden in einem vollständigen Hero. Phase 3 läuft nur, wenn gescrollt wird. |
| „Explosion“ aus dem Logo | Effekt ohne Aufgabe | Rückzoom auf den **Werkplan**: alle zehn Welten auf einen Blick — Inhaltsverzeichnis und Navigation zugleich |
| Ganze Seite als eine Animation, Scroll-Jacking | Gekaperte Scrollrad-Steuerung bricht Bedienung, Barrierefreiheit und Mobile | Kein Scroll-Jacking. Nur gepinnte Szenen, die dem Scrollen 1:1 folgen. |
| Zehn gleich lange Welten | Monotonie und Ermüdung | Lange und kurze Welten im Wechsel, dazu drei ruhige Zwischenspiele: Warum, Arbeitsweise, Über mich |
| „Agentur“, „wir“ | NP ist ein Einzelunternehmen; „wir“ wirkt größer, aber unpersönlicher | Ich-Form. Der direkte Draht zu Niklas ist das stärkste Argument gegen Agenturen. |
| „Let’s build something different“ | Englisch schafft Distanz zur regionalen Zielgruppe | Deutscher Claim, Varianten in Abschnitt L |
| Poppins (PDFs), Playfair Display (Website), Orange #E4572E (PDFs) | Poppins und Playfair sind typische Vorlagen-Schriften. Die PDFs nutzen ein anderes Orange als das Logo (#CE5D17). | Archivo und IBM Plex Mono. Markenorange ist das Logo-Orange; Rechnung und Briefing-PDF ziehen nach. |
| WebGL und Lottie als Option | Gewicht ohne Mehrwert | Nicht einsetzen. SVG, CSS und GSAP decken jede Szene in diesem Konzept ab. |

### Verhältnis zum Strategie-Audit

- **Gültig bleiben:** alle Bugfixes, die Rechtstexte, die Kontrastregeln, kein Tracking ohne Einwilligung, lokale Fonts, Preise an genau einer Stelle (/leistungen), keine erfundenen Kunden.
- **Ersetzt werden:** die Design Direction (Playfair/DM Sans, „Evolution statt Neustart“) und der Homepage-Blueprint.
- **Korrektur:** Das Audit nennt 4,75:1 für Tinte auf Orange. Nachgerechnet sind es 4,41:1 (#1C1712 auf #CE5D17) — knapp unter AA. Button-Text auf Orange deshalb in Nacht #14100C (4,69:1).
- **Reihenfolge:** Die Bugfixes aus dem Audit jetzt auf der laufenden Seite umsetzen. Der Relaunch dauert neben einem Vollzeitjob Monate; die aktuelle Seite muss bis dahin korrekt sein.

## A. Creative Direction

**Leitsatz: NP Webdesign baut den Rahmen — die Marke des Kunden ist der Inhalt.** Die Website beweist das, indem sie zehn völlig verschiedene Unternehmen in zehn völlig verschiedenen Websites zeigt. Nur ein Element bleibt immer gleich: der NP-Rahmen mit seiner orangen Maßschicht.

**Nordstern für jede Entscheidung:** Eine Inhaberin aus der Oberpfalz scrollt durch die Seite, findet ihre Branche und denkt: „So könnte unsere aussehen.“ Was diesem Moment nicht dient, fliegt raus — egal wie gut es aussieht.

**Haltung: Werkstatt, nicht Galerie.** Präzise wie eine Bauzeichnung, warm wie eine Werkbank, selbstbewusst ohne Agentur-Pose. Die Seite zeigt nicht nur fertige Ergebnisse, sondern auch das Handwerk dahinter: Konstruktionslinien, Maße, Entscheidungen.

### Drei Spannungen und ihre Auflösung

| Spannung | Gefahr | Auflösung |
| --- | --- | --- |
| Spektakel gegen Nähe | Ein Award-Showreel wirkt auf Handwerksbetriebe teuer und fremd | Das Spektakel zeigt ihre eigenen Branchen. Zwischen den Welten spricht ein Mensch in Ich-Form. |
| Vielfalt gegen Wiedererkennung | Zehn Stile zerfasern die Marke | Der NP-Rahmen (Monogramm, Maßschicht, Orange, Archivo) bleibt in jeder Welt sichtbar. Orange gehört ausschließlich NP. |
| Showreel gegen Verkauf | Besucher staunen und gehen | Der erste Bildschirm erklärt Angebot, Zielgruppe und nächsten Schritt. Der Anfrage-Button erscheint mit der H1 und bleibt danach immer sichtbar. Jede Welt verkauft eine Leistung. |

### Wie es sich anfühlen soll

| Moment | Gefühl | Gedanke des Besuchers |
| --- | --- | --- |
| Erste 5 Sekunden | Ruhe, Klarheit, Präzision | „Hier arbeitet jemand sehr genau.“ |
| Werkplan (nach ca. 10 % Scroll) | Überblick, Neugier | „Zehn Websites — und eine ist meine Branche.“ |
| Mitte der Reise | Überraschung, Tempo, Staunen | „Das ist alles von einer Person?“ |
| Rohbau (Welt 10) | Aha-Moment | „Alles echtes Handwerk, kein Baukasten.“ |
| Finale | Ankommen, Einladung | „Und jetzt meine.“ |

**Stimmungswörter:** präzise, warm, handgemacht, ruhig-selbstbewusst, überraschend. **Gegenwörter:** verspielt, laut, futuristisch-kühl, elitär, beliebig.

## B. Core Concept

**„Maßarbeit“ — zehn Welten, ein Rahmen, und die elfte ist Ihre.** Die Reise beginnt mit einer einzigen Linie am NP-Logo und endet in einem leeren Rahmen, in den der Besucher den Namen seines Unternehmens tippt. Dazwischen liegen zehn Websites für zehn fiktive Betriebe aus der Region, jede in einer eigenen Gestaltungssprache.

Die Welten sind nicht gestapelt, sondern verkettet. Jeder Übergang übergibt ein Objekt wie einen **Staffelstab**: Der Bon der Bäckerei wird zur Wartemarke des Barbershops, die Goldlinie des Barbershops zur Maßlinie der Bauzeichnung. So entsteht keine einzige harte Abschnittsgrenze.

### Drei Akte

| Akt | Scroll (Desktop) | Inhalt | Funktion |
| --- | --- | --- | --- |
| I · Konstruktion | 0–10 % | Logo, Konstruktionslinien, Hero-Botschaft, Rückzoom auf den Werkplan | Wer, was, für wen — und ein Überblick über alles, was kommt |
| II · Zehn Welten | 10–87 % | Neun Kundenwelten und der NP-Rohbau, verkettet per Staffelstab, unterbrochen von drei Zwischenspielen | Beweis der Bandbreite; Warum, Arbeitsweise und Person im Takt dazwischen |
| III · Welt 11 | 87–100 % | Rückbau zum Werkplan, leeres Zentrum, Sprung in den Kontaktrahmen mit Live-Vorschau, Fakten, FAQ | Abschluss als Einladung: Die nächste Welt ist die des Besuchers |

### Vier Bausteine

1. **Der Rahmen (NP-Schicht).** Fest am Viewport: Monogramm, Weltzähler, Lineal-Fortschritt, Anfrage-Button und die orange Maßschicht. Er liegt über jeder Welt und hält die Marke zusammen.
2. **Der Werkplan.** Ein Raster aus zehn Weltrahmen um ein Zentrum. Er erscheint nach dem Opening, dient als Inhaltsverzeichnis und kehrt im Finale zurück — dann ist das Zentrum leer.
3. **Der Staffelstab.** Jeder Übergang verwandelt genau ein Objekt der alten Welt in ein Element der neuen. Keine Blende ohne Objekt.
4. **Die Werkstattnotiz.** In jeder Welt eine kleine Karte der NP-Schicht: Aufgabe des Betriebs, Gestaltungsidee, eingesetzte Leistung, Link zur Branchenseite. Hier wird aus Zeigen Verkaufen.

### Die zehn Welten im Überblick

| Nr. | Fiktive Marke | Branche | Register | Herkunft |
| --- | --- | --- | --- | --- |
| 01 | Korn & Kruste | Handwerksbäckerei | Weizengold, warm, organisch | neu |
| 02 | Herrenzimmer | Barbershop | dunkel, Gold und Bordeaux, Wartemarke | vorhandene Demo |
| 03 | Steiner Bau | Bauunternehmen | Bauzeichnung auf Millimeterpapier, Planblau-Weiß | vorhandene Demo |
| 04 | Haas & Sternfeld | Kanzlei und Steuerberatung | editorial, Reinweiß, Schwarz, Siegelrot | neu |
| 05 | Chromwerk | Oldtimer-Werkstatt | Premium Automotive, British Racing Green lackiert | neu |
| 06 | Jana Ahrens | Coaching und Beratung | weich, Flieder, Farbkugel, konzentrische Kreise | vorhandene Demo |
| 07 | NAABTEC | Präzisionsfertigung | Stahlschiefer, technisch, Daten | neu |
| 08 | Praxis am Weiher | Physiotherapie | ruhig, Mint, barrierearm, Terminbuchung | neu |
| 09 | Gut Weidenstein | Landgasthof und Hotel am See | stille Eleganz, Dämmerungsviolett, Abendlicht | neu |
| 10 | NP Labor | NP selbst | Rohbau, brutalistisch, experimentell | neu |

Alle Markennamen der Welten 01, 04, 05, 07, 08 und 09 sind erfunden. Vor dem Launch prüfen, dass kein echter Betrieb in der Region so heißt.

**Unterscheidbarkeit (Designentscheidung 7. Oktober 2026):** Jede Beispielseite soll komplett anders aussehen, auch farblich. Keine zwei Welten teilen Grundfarbe, Schrift, Akzentfarbe oder Layoutprinzip. Die hellen Welten hatten fast denselben cremeweißen Grund wie das NP-Leinen, die dunklen fast dasselbe Schwarz; deshalb gelten die neuen Paletten in Abschnitt G, und ein Build-Skript prüft die Abstände (Abschnitt R, Regel 16).

*Hinweis zum Stand im Code:* Im Code heißen die Welten 01, 02, 03 und 07 derzeit Halmberg, Messingstuhl, Wittgenfeld Bau und TORQUEL (Namenswahl Oktober 2026, weil die Namen in dieser Liste als reale Betriebe vorkommen). Die Markenrecherche steht aus.

## C. Brand Experience

**NP bleibt in jeder Sekunde erkennbar, weil eine feste Markenschicht über allen Welten liegt.** Sie ist klein, ruhig und immer an derselben Stelle. Die große Marke tritt dagegen nur an den Akt-Grenzen auf — Seltenheit macht sie stark.

### Die NP-Schicht (immer sichtbar)

| Element | Gestalt | Position | Aufgabe |
| --- | --- | --- | --- |
| Monogramm | Logo-Signet, 32 px hoch (Mobile 28 px) | oben links, fest | Marke; Klick führt zum Werkplan |
| Anfrage-Button | Kantiger Button „Projekt anfragen“, NP-Orange mit Nacht-Text | oben rechts, fest | Primärer CTA, sichtbar ab 1,4 s |
| Lebenszeichen | „Schwandorf · 14:32“ in Plex Mono, live aktualisierte Ortszeit | oben rechts, links neben dem Button (nur Desktop) | Nähe und Echtheit, angelehnt an den Live-Status bei HIRO |
| Weltzähler | „WELT 04 / 10 · KANZLEI“, Plex Mono 12 px, Versalien | unten links | Orientierung |
| Lineal | Vertikale Skala mit zehn Hauptstrichen, Fortschrittsmarke in Orange; Mobile: 2-px-Linie am oberen Rand | rechter Rand | Fortschritt und Sprungnavigation |
| Schnittmarken | Vier feine Eckwinkel, 16 px, 1 px Linie | Viewport-Ecken | Gefühl eines Druckbogens: Alles liegt in einem Rahmen |
| Maßschicht | Bemaßungslinien, Koordinaten, Schrift- und Farbangaben der aktuellen Welt | an Elementen der jeweiligen Welt | Zeigt das Handwerk; Signatur in jeder Welt |
| Abspann | „Studie · Korn & Kruste (fiktiv) · Gestaltung und Code: NP Webdesign“ | Ende jeder Welt | Urheberschaft wie im Filmabspann; macht die Kennzeichnung als Studie selbstverständlich |

### Wiedererkennung: alle Optionen bewertet

| Option | Urteil | Einsatz |
| --- | --- | --- |
| Riesige NP-Typografie | Ja, sparsam | Nur im Opening und im Finale. Überall sonst würde sie die Welten erschlagen. |
| Wiederkehrendes Monogramm | Ja | Fest oben links und als kleiner Stempel im Abspann jeder Welt |
| Logo als grafisches Objekt | Ja | Opening: Das Logo wird konstruiert. Finale: Es rückt aus dem Zentrum und macht Platz für Welt 11. |
| NP als Muster | Nein | Initialen-Tapete ist ein Modelabel-Klischee und wirkt schnell billig |
| NP als Übergang | Ja, genau zweimal | **P-Iris:** Der runde Bauch des P öffnet als Kreisblende. **N-Blende:** Die Diagonale des N wischt als Schrägblende. Beide nur an Akt-Grenzen. |
| „NP Webdesign“ als typografischer Anker | Ja | Im Abspann jeder Welt und als große Signatur im Footer |
| Dezentes Sticky Branding | Ja | Der Rahmen oben |
| Kleine Brand-Marker | Ja | Schnittmarken und orange Maßschicht |
| Der orange Faden | Ja, das Leitmotiv | Eine 1,5-px-Linie in NP-Orange taucht in jedem Übergang als Werkzeug auf: Sie zeichnet den Staffelstab nach, bemaßt, unterstreicht. Das Sprichwort vom roten Faden wird zum orangen Faden. |

### Markenregeln

1. **Orange gehört NP.** Keine Welt nutzt gesättigtes Orange (Farbton 10–35°, Sättigung ab 55 %). So bleibt jedes orange Element als NP lesbar.
2. **Die Maßschicht wechselt nur den Modus.** Drei Modi, nicht von Hand gesetzt, sondern aus dem Grund berechnet: **hell** (Maßschicht-Text Orange-Text #A34A0D, Rahmenelemente Tinte), **dunkel** (Glut #F08A4B, Rahmenelemente Leinen) und **mittel** (Welten 01 und 06: NP-Orange erreicht auf dem Grund keine 3:1; Maßschicht-Text und Rahmenelemente in Tinte #1C1712, der Anfrage-Button bekommt einen 1,5-px-Rand in Nacht #14100C, Orange-Linien nur noch als Dekor). Berechnung: Kontrast NP-Orange zu Grund unter 3:1 und Grund hell ergibt mittel. Nachgerechnet liegt der Kontrast der Maßschicht in allen zehn Welten bei mindestens 4,6:1.
3. **NP spricht nur in eigenen Schriften.** Notizen in IBM Plex Mono, Statements in Archivo. Nie eine Schrift einer Welt.
4. **Rahmen bleibt, Maßschicht weicht.** Während eines Staffelstab-Übergangs blendet die Maßschicht aus und kommt danach zurück. Monogramm, Button, Zähler und Lineal bleiben stehen; der Zähler springt in der Mitte des Übergangs.

## D. Opening / Logo Animation

**Das Opening dauert 1,6 Sekunden und endet in einem vollständigen Hero.** Wer nicht scrollt, hat nach 1,6 s Logo, Botschaft und Button vor sich. Länger darf es nicht dauern: Die H1 ist das größte Textelement im ersten Bild und bestimmt die Ladekennzahl LCP — jede Zehntelsekunde Intro verschiebt sie. Erst das Scrollen löst den Rückzoom aus: Die Kamera fährt vom Logo weg und entdeckt den Werkplan mit allen zehn Welten.

### Ablauf

| Zeit / Scroll | Phase | Was passiert | Technik |
| --- | --- | --- | --- |
| 0–0,4 s | 1 · Ruhe | Leinen-Fläche, Logo-Signet zentriert (Mitte bei 50 % / 42 %, 96 px hoch, Mobile 72 px), vier Schnittmarken in den Viewport-Ecken. Sonst nichts. | Logo als Inline-SVG im HTML: sichtbar beim ersten Paint, kein Ladebildschirm |
| 0,4–1,0 s | 2 · Konstruktion | Vier Hilfslinien zeichnen sich vom Logo zu den Viewport-Rändern (Ober-, Unterkante, linke, rechte Kante). NP-Orange, 1 px, Deckkraft 60 %. | Linien zeichnen, 600 ms, power2.out, Versatz 80 ms |
| 0,6–1,2 s | 2 · Konstruktion | Konstruktion am Signet: Kreisbogen am Bauch des P, Diagonale am N, Bemaßungen mit echten Werten aus dem Logo (Höhe, Winkel, #CE5D17) | Linien zeichnen, 500 ms; Werte in Plex Mono 11 px |
| 0,7–1,4 s | 2 · Botschaft | Kicker, H1, Unterzeile, zwei Buttons, Scroll-Hinweis; gleichzeitig erscheint der Anfrage-Button im Rahmen | Zeilen-Maske (Text fährt aus 100 % nach 0 %), 700 ms, expo.out, Versatz 90 ms |
| 0,9–1,6 s | 2 · Raster | Punktraster (24 px) blendet radial vom Logo aus ein, Deckkraft 0 auf 12 %. Acht Notiz-Fragmente erscheinen auf Rasterpunkten: „Archivo 900“, „Ag“, „1fr 2fr“, „h1“, „16 px“, „ease: out“, „#CE5D17“, „Welt 01–10“. | Deckkraft und 6 px Versatz, Versatz nach Abstand zum Logo; für Screenreader verborgen |
| ab 1,6 s | Ruhezustand | Vollständiger Hero, keine Daueranimation | Phase 1–2 laufen als CSS-Animation und warten nicht auf JavaScript |
| 0–25 % von 150vh | 3 · Expansion | Hero-Text gleitet nach oben aus (40 px, Deckkraft 0), Fragmente verblassen | Gepinnte Szene, folgt dem Scrollen 1:1 |
| 15–85 % | 3 · Rückzoom | Die Kamera fährt zurück. Die Schnittmarken lösen sich von den Viewport-Ecken — sie waren die Ecken der Zentrumszelle. Rundherum erscheinen die zehn Weltrahmen. Die Hilfslinien des Logos laufen als Rasterfugen des Werkplans weiter. | Werkplan-Ebene skaliert von 1 auf ca. 0,28; Rahmen blenden ein, sobald sie ins Bild kommen |
| 85–100 % | 3 · Werkplan | Statement erscheint, darunter die Kennzeichnung als Studien | Zeilen-Maske |

### Komposition und Text

- **Desktop (1440 × 900):** Logo in der Mitte. H1 unten links (6vw vom Rand, 12vh vom Boden, max. 60vw breit). Buttons unten rechts auf Höhe der letzten H1-Zeile. Scroll-Hinweis unten mittig.
- **Mobile (390 × 844):** Logo bei 30 % Höhe. H1 linksbündig darunter, 16 px Rand. Primärer Button volle Breite unten.
- **Kicker:** „NP Webdesign · Schwandorf“
- **H1:** „Websites, die nach Ihrem Unternehmen aussehen.“
- **Unterzeile:** „Individuell entworfen und gebaut für Betriebe in der Oberpfalz und darüber hinaus — von Niklas Prüfling, ohne Baukasten.“
- **Buttons:** „Projekt anfragen“ (primär) · „Zehn Welten ansehen“ (sekundär, scrollt zum Werkplan)
- **Scroll-Hinweis:** „Weiter — zehn Welten“ mit kleiner Linealmarke, die einmal nach unten läuft
- **Statement am Werkplan:** „Zehn Betriebe. Zehn Websites. Keine sieht aus wie die andere.“ Darunter in Mono: „Alle zehn sind Studien: erfundene Unternehmen, echte Gestaltung.“

### Der Werkplan

Vier Spalten, drei Reihen. Die Zentrumszelle spannt in Reihe 2 über zwei Spalten und trägt das Logo. Jede Weltzelle hat das Format 16:10 mit einer schmalen Browserleiste (drei Punkte, Label „Studie 01“ — bewusst keine erfundene Domain, die es real geben könnte). Darin ein Standbild der Welt, darunter in Mono „01 · Korn & Kruste · Bäckerei“. Jede Zelle ist ein Link zur Welt. Mobile: zwei Spalten, sechs Reihen, Zentrum in Reihe 3 über beide Spalten.

&#91;embedded content: Werkplan Desktop · 10 Weltzellen um ein Zentrum\]

Die Weltzellen lesen sich zeilenweise von 01 bis 10; das Zentrum wechselt seine Rolle zwischen Opening und Finale.

### Sonderfälle

- **Frühes Scrollen:** Scrollt jemand vor 1,6 s, läuft Phase 2 mit vierfachem Tempo in ca. 300 ms zu Ende; dann übernimmt das Scrollen.
- **Wiederkehr:** Phase 1–2 laufen bei jedem Aufruf; dafür wird nichts im Browser gespeichert (siehe Q2). Beim Laden mitten in der Seite (Anker, Neuladen) steht sofort der Endzustand.
- **Reduzierte Bewegung:** Endzustand sofort, kein Pin. Der Werkplan steht als normale Sektion unter dem Hero.
- **Bildschärfe:** Die Werkplan-Ebene wird in ihrer größten Darstellung gebaut und nur verkleinert. Hochskalierte Ebenen werden im Browser unscharf.
- **Voraussetzung Logo:** Das Logo muss als sauberes SVG vorliegen, Signet und Wortmarke als getrennte Gruppen, Farben über Variablen steuerbar. Liegt nur eine Pixeldatei vor, wird es von Hand nachgezeichnet, nicht automatisch vektorisiert.

## E. Complete Scroll Dramaturgy

**Die Reise ist rund 3.440vh lang (Desktop, etwa 31.000 px bei 900 px Viewport) und hat zwei Tempo-Höhepunkte, drei Ruhepunkte und ein Finale.** Hell und dunkel wechseln fast immer ab, damit jede neue Welt als Kontrast ankommt. Mobile ist die Strecke rund 2.910vh lang, weil gepinnte Szenen kürzer werden.

&#91;embedded content: Gestaltungsvorgabe · Längen aus der Reise-Konfiguration (Abschnitt T), Intensität 1–5\]

Auf die Querfahrt von Chromwerk folgt die stillste Welt (Jana Ahrens), auf NAABTEC die Praxis, auf das Finale der ruhige Kontaktrahmen. Die Grundfarben-Leiste zeigt, wo Hell und Dunkel abwechseln — und wo zwei helle Abschnitte bewusst ineinanderlaufen.

### Phase für Phase

| Scroll (Desktop) | Phase | Zustand und Inhalt | Bewegung und Übergang | Nutzerfokus | Wirkung |
| --- | --- | --- | --- | --- | --- |
| 0–3 % | Hero | Leinen, Logo mit Konstruktion, H1, zwei Buttons | Opening Phase 1–2 als CSS-Animation, 1,6 s | H1 lesen, Button | Klarheit, Präzision |
| 3–7 % | Expansion | Vom Hero zum Werkplan | Rückzoom, gepinnt 150vh | Überblick entsteht | Staunen, Orientierung |
| 7–10 % | Werkplan | Zehn Weltrahmen, Statement, Studien-Hinweis | Ruhig, Hover auf Zellen. Dann Sprung in Rahmen 01: Die Zelle wächst auf Viewport-Größe, die Browserleiste löst sich auf. | Welt wählen oder weiter | Neugier: „Wo ist meine Branche?“ |
| 10–16 % | Welt 01 · Korn & Kruste | Weizengold, Krustenbraun, Zwetschge, Makrofotos, Fraunces | Bilder gehen auf (Skalierung 0,96 auf 1), Parallaxe. Raus: Der Bon „Nr. 07“ bleibt, Ladenschluss dunkelt von Weizengold zu #121010 ab. | Bilder, Produkte | Wärme, Vertrautheit |
| 16–22 % | Welt 02 · Herrenzimmer | Dunkel, Gold, Bordeaux, Wartemarke | Die Wartemarke druckt sich. Raus: Goldlinie wird Maßlinie. | Atmosphäre | Kontrastschock: „Der kann auch ganz anders.“ |
| 22–28 % | Welt 03 · Steiner Bau | Planblau-Weiß mit Millimeterraster, Tusche, Blaupause, Bemaßung, Prüfstempel | Linien zeichnen sich, ein Bauteil zerlegt sich zur Explosionszeichnung. Raus: Prüfstempel wird NP-Siegel (P-Iris). | Präzision, Leistungen | Vertrauen |
| 28–33 % | Zwischenspiel I · Warum individuell | Nacht, riesige Archivo-Statements, Glut | Wörter auf Viewport-Breite, Branchenband. Raus: „Kein Zufall.“ wird Schlagzeile (N-Blende). | Argument lesen | Überzeugung, Ruhe |
| 33–38 % | Welt 04 · Haas & Sternfeld | Reinweiß, Schwarz, Siegelrot, Spaltensatz | Initiale, Spalten bauen sich auf, Fußnoten. Raus: rote Linie wird Zierlinie. | Lesen | Seriosität |
| 38–45 % | Welt 05 · Chromwerk | British Racing Green, Chrom, Elfenbein, Querfahrt | Horizontale Fahrt (gepinnt), Lichtreflex wandert über den grünen Lack. Raus: Scheinwerfer wird Farbkugel. | Bewegung, Details | Tempo-Höhepunkt 1 |
| 45–50 % | Welt 06 · Jana Ahrens | Flieder, Farbkugel Pfirsich bis Flieder, konzentrische Kreise | Kugel atmet mit dem Scrollen, Kreise wachsen. Raus: Kreise werden Weg. | Durchatmen | Ruhe nach dem Tempo |
| 50–57 % | Zwischenspiel II · Arbeitsweise | Leinen, ein Strahl mit sechs Stationen | Strahl zeichnet sich, Stationen klappen auf. Raus: Weg wird Laserlinie. | Ablauf verstehen | Sicherheit |
| 57–63 % | Welt 07 · NAABTEC | Stahlschiefer, Signalgelb, Raster, Mono, Daten | Laserlinie scannt ein Bauteil, Zahlen zählen hoch. Raus: Messraster wird Terminkalender. | Daten, Präzision | Tempo-Höhepunkt 2 |
| 63–68 % | Welt 08 · Praxis am Weiher | Mint, Salbei, Buchungsmodul | Kalender als bedienbare Demo, weiche Übergänge. Raus: Weiher wird See. | Funktion, Barrierefreiheit | Erleichterung |
| 68–75 % | Welt 09 · Gut Weidenstein | Dämmerungsviolett, Schilfgrün, große Landschaft | Sehr langsame Überblendungen, die Tageszeit wandert. Raus: Ein beleuchtetes Fenster rahmt das Porträt. | Bilder | Stille, Eleganz |
| 75–80 % | Zwischenspiel III · Über mich | Leinen, Porträt von Niklas, Ich-Text | Porträt im Fensterrahmen, Text Zeile für Zeile. Raus: Die Seite zieht sich aus. | Person kennenlernen | Nähe |
| 80–87 % | Welt 10 · NP Labor | Rohbau: Weiß, Times, Linkblau, dann brutalistisch | Stile fallen ab, Rohelemente experimentieren. Raus: Der Rohbau setzt sich zu NP zusammen. | Aha-Moment | „Alles Handarbeit.“ |
| 87–91 % | Finale · Werkplan | Leinen, alle zehn Rahmen gefüllt, Zentrum leer | Rückzoom, Logo rückt nach oben, „Welt 11“ erscheint | Einladung lesen | Ankommen |
| 91–95 % | Welt 11 · Kontakt | Leerer Rahmen mit Live-Vorschau, Formular, Fakten | Sprung ins Zentrum; der getippte Firmenname erscheint live im Rahmen | Formular | Handeln |
| 95–100 % | FAQ und Footer | Kalk und Nacht, Akkordeon, Kontaktdaten schlicht | Keine Inszenierung | Fragen klären | Sicherheit |

**Taktregeln:** Jede Welt beginnt mit ihrem Eingangs-Übergang (60–100vh gepinnt) und läuft danach normal weiter. Auf jeden Tempo-Höhepunkt folgt eine ruhige Welt oder ein Zwischenspiel. Die Gesamtlänge ist ein Richtwert: Zeigt der Test, dass weniger als ein Drittel der Besucher Welt 05 erreicht, wird auf sieben Welten gekürzt — die Architektur erlaubt das ohne Umbau.

## F. Die 10 Designwelten

**Jede Welt ist eine eigenständige Website für einen Betrieb aus der Zielgruppe — und jede übergibt der nächsten ein Objekt.** Die Kette unten ist das Rückgrat der Seite. In jedem Übergang zeichnet zuerst der orange Faden die Kontur des Staffelstabs nach (ca. 150 ms Vorlauf); erst dann verwandelt sich das Objekt.

### Die Staffelstab-Kette

| Übergang | Staffelstab | Verwandlung | Technik | Länge Desktop / Mobile |
| --- | --- | --- | --- | --- |
| Werkplan → 01 | Zelle 01 | Die Zelle wächst auf Viewport-Größe, die Browserleiste löst sich auf | Layout-Übergang (Flip), Ausschnitt-Maske | 60 / 40vh |
| 01 → 02 | Bon „Nr. 07“ | Ladenschluss: Hintergrund dunkelt, der Bon dreht sich und wird als goldene Wartemarke neu gedruckt | Hintergrund-Tween (Weizengold zu #121010), Drehung um die Hochachse, Kreuzblende | 60 / 40vh |
| 02 → 03 | Goldlinie | Die Linie streckt sich über die Breite, wird tuscheblau, bekommt Maßpfeile; Millimeterpapier in Planblau-Weiß schiebt sich darunter hoch | Linie zeichnen, Farb-Tween, vertikale Wischblende | 60 / 40vh |
| 03 → Zwischenspiel I | Prüfstempel | Der Stempel wird orange, sein Text wechselt zu „Geprüft: kein Baukasten“, der Ring öffnet sich als P-Iris | Kreis-Maske wächst über den Viewport | 60 / 40vh |
| Zwischenspiel I → 04 | Wort „Zufall“ | N-Blende diagonal von Nacht zu Reinweiß; „Kein Zufall.“ fließt in die Schlagzeile „Nichts dem Zufall überlassen.“ | Diagonale Polygon-Maske, Flip des gemeinsamen Wortes | 60 / 40vh |
| 04 → 05 | Rote Linie | Die Linie unter der Schlagzeile verlängert sich und biegt sich zur Zierlinie auf der Karosserie | Pfad-Morph gerade zu Kurve, Hintergrund Reinweiß zu British Racing Green, Linie Siegelrot zu Elfenbein | 60 / 40vh |
| 05 → 06 | Scheinwerfer | Der runde Scheinwerfer glüht warm auf, wächst über den Viewport und wird zur Farbkugel | Radialverlauf und Skalierung | 60 / 40vh |
| 06 → Zwischenspiel II | Konzentrische Kreise | Die Kreise rollen sich zu einer Linie mit sechs Stationen ab | Pfad-Morph Kreis zu Linie | 60 / 40vh |
| Zwischenspiel II → 07 | Prozessstrahl | Der Strahl glüht auf und wird zur Laserlinie; der Hintergrund dunkelt | Farb-Tween, Leuchten nur Desktop | 60 / 40vh |
| 07 → 08 | Messraster | Die Rasterzellen ordnen sich zum Monatskalender; eine Zelle leuchtet als gebuchter Termin | Layout-Übergang (Flip) | 60 / 40vh |
| 08 → 09 | Wasserfläche | Das Bild des Weihers zoomt aus und wird zum See in der Abenddämmerung | Skalierung, Farbüberlagerung, Kreuzblende | 80 / 50vh |
| 09 → Zwischenspiel III | Erleuchtetes Fenster | Der Fensterrahmen wird zur Maske, hinter der das Porträt erscheint | Rechteck-Maske wächst auf Vollbild | 60 / 40vh |
| Zwischenspiel III → 10 | Die Seite selbst | Stile fallen in Stufen ab: Farben, Schrift, Abstände, Layout | Klassenwechsel an Scroll-Schwellen | 100 / 70vh |
| 10 → Finale | Rohe Elemente | Sie setzen sich zu NP zusammen; Rückzoom zum Werkplan | Klassenwechsel, Flip, Skalierung | 140 / 90vh |

**Für alle Welten gilt:** Kennzeichnung „Studie · fiktives Unternehmen“ im Weltzähler und im Abspann. Keine Gesichter für erfundene Personen (Architektur, Hände, Details statt Porträts). Keine echten Siegel, Zertifikate oder Bewertungen. Jede Demo-Bedienung ist als „Demo“ beschriftet und sendet nichts. Die Farbwerte aller Welten sind seit dem 7. Oktober 2026 verbindlich (Abschnitt G); bei den drei vorhandenen Demos übernimmt die Studie Aufbau und Gestaltung, nicht die alten Farbwerte (Welt 03: nur Grundfarbe und Millimeterraster angeglichen, Welt 02 unverändert). Keine zwei Welten teilen Grundfarbe, Schrift, Akzentfarbe oder Layoutprinzip.

### Welt 01 — Korn & Kruste · Handwerksbäckerei (neu)

| Feld | Festlegung |
| --- | --- |
| Look & Feel | Morgens um fünf in der Backstube: warm, mehlig, sinnlich, ehrlich. Viel Licht, weiche Formen, nah am Produkt. |
| Farben | Weizengold #E9C46A (Grund) · Kruste #3B2618 (Text, 8,5:1) · Zwetschge #5E2B4A (Akzent, 6,5:1) · Roggen #8B5A2B (nur Grafik, nie Text) · NP-Modus mittel |
| Typografie | Fraunces, variabel. Headlines 650, opsz 144, SOFT 100, WONK an. Fließtext Fraunces 400, opsz 14. |
| Layout | Asymmetrisches Zwei-Spalten-Raster, randabfallende Bilder, schmale Textspalten, ovale Bildmasken in Laibform |
| Hauptanimation | „Aufgehen“: Bilder skalieren beim Eintritt von 0,96 auf 1 und runden ihre Ecken wie Teig. Die Headline wird über die SOFT-Achse von 0 auf 100 weich — die Schrift geht auf. |
| Interaktion | Backplan Montag bis Samstag als Reiter; Tippen auf ein Brot zeigt die Teigführung (Stunden Gare) |
| Bildsprache | Makrofotos: Krume, Mehlstaub im Gegenlicht, Hände. Warm entwickelt, sichtbares Korn. Keine lächelnden Stock-Bäcker. |
| UI-Elemente | Vorbestell-Bon mit Nummer, Backplan-Reiter, Öffnungszeiten-Tafel, runde Buttons |
| Signatur | Der Bon mit gezacktem Abriss |
| Leistung im Einsatz | Bildkonzept und Fotobriefing. Notiz: „Eine Bäckerei verkauft Duft. Darum trägt hier die Fotografie, nicht der Text.“ |
| Übergang hinein | Sprung aus dem Werkplan: Zelle 01 wächst zum Viewport |
| Übergang hinaus | Ladenschluss: Der Grund dunkelt, nur der Bon „Nr. 07“ bleibt im Licht und wandert zur Mitte |

### Welt 02 — Herrenzimmer · Barbershop (vorhandene Demo)

| Feld | Festlegung |
| --- | --- |
| Look & Feel | Abends im Salon: Leder, Messing, Ruhe. Art-Déco-Anmutung, die Wartemarke als Leitidee aus der bestehenden Demo. |
| Farben | Grund #121010 (unverändert) · Text #EDE6D8 (15,3:1) · Gold #C9A24A (7,9:1) · Bordeaux #7A2433 (nur Flächen, 1,9:1) · NP-Modus dunkel |
| Typografie | Aus der Demo übernehmen. Falls neu: Bodoni Moda (Didone) in Versalien mit weiter Laufweite, ab 18 px auch für Text |
| Layout | Symmetrisch um eine schmale Mittelachse wie ein Spiegel, Goldlinien als Trenner |
| Hauptanimation | Die Wartemarke druckt sich aus einem Schlitz (Maske von oben), die Nummer zählt von 05 auf 07 |
| Interaktion | „Wartemarke ziehen“ zeigt eine geschätzte Wartezeit (Demo-Daten); Preisliste mit Goldlinie beim Hover |
| Bildsprache | Low-Key-Fotografie, warmes Streiflicht, Schwarzweiß mit Goldtonung |
| UI-Elemente | Wartemarke, Preisliste mit Punktlinien, Termin-Button in Gold mit dunkler Schrift |
| Signatur | Die Wartemarke |
| Leistung im Einsatz | Online-Terminbuchung und Markenwirkung. Notiz: „Ein Barbershop verkauft Atmosphäre. Die Wartemarke macht Warten zum Teil des Erlebnisses.“ |
| Übergang hinein | Der Bon aus Welt 01 dreht sich um und wird als goldgeprägte Wartemarke „Nr. 07“ neu gedruckt |
| Übergang hinaus | Die Goldlinie unter der Preisliste zieht sich über die volle Breite, wird tuscheblau, bekommt Maßpfeile und den Wert „12.400“ |

### Welt 03 — Steiner Bau · Bauunternehmen (vorhandene Demo)

| Feld | Festlegung |
| --- | --- |
| Look & Feel | Bauzeichnung auf Millimeterpapier mit Bemaßung und Prüfstempel (aus der Demo). Sachlich, präzise, bodenständig. |
| Farben | Planblau-Weiß #DCE8F1 (Grund, dazu das Millimeterraster) · Tusche #1C2A38 (11,7:1) · Blaupause #2B5C8A (5,6:1) · Prüfrot #B23A2E (4,8:1) · NP-Modus hell |
| Typografie | Aus der Demo übernehmen. Falls neu: Barlow Condensed 600 in Versalien für Überschriften, Barlow 400 für Text |
| Layout | Strenges Raster auf Millimeterteilung; Schriftfeld unten rechts wie auf echten Plänen (Projekt, Maßstab, Datum) |
| Hauptanimation | „Bauen mit dem Scrollen“: Ein Hausquerschnitt baut sich Schicht für Schicht auf, vom Fundament bis zum Dach; die Linien zeichnen sich mit |
| Interaktion | Explosionszeichnung der Leistungen: Bauteil antippen, es hebt sich heraus und wird beschriftet (Rohbau, Dach, Sanierung) |
| Bildsprache | Linienzeichnung statt Foto; ein bis zwei Baustellenfotos als aufgeklebte Abzüge |
| UI-Elemente | Schriftfeld, Bemaßungsketten, Prüfstempel, Plan-Reiter (Grundriss, Schnitt, Ansicht) |
| Signatur | Der rote Prüfstempel |
| Leistung im Einsatz | Konzeption und Seitenstruktur. Notiz: „Bauherren wollen Klarheit. Darum ist jede Leistung ein Bauteil mit Maß.“ |
| Übergang hinein | Goldlinie wird Maßlinie, das Papier schiebt sich von unten über das Dunkel |
| Übergang hinaus | Der Stempel wird gesetzt (Skalierung 1,15 auf 1 in 180 ms), färbt sich NP-Orange, wird zum NP-Siegel und öffnet als P-Iris |

### Welt 04 — Haas & Sternfeld · Kanzlei und Steuerberatung (neu)

| Feld | Festlegung |
| --- | --- |
| Look & Feel | Wirtschaftszeitung am Sonntag: seriös, klug, ruhig. Viel Weißraum, schwarze Schrift, ein einziges Rot. |
| Farben | Reinweiß #FFFFFF (Grund) · Druckschwarz #111111 (18,9:1) · Siegelrot #A3122A (7,8:1) · Grau #6E6E66 (Linien und Meta, 5,1:1) · NP-Modus hell |
| Typografie | Newsreader, variabel. Display opsz 72, 500. Text opsz 16, 400. Kapitälchen für Rubriken. |
| Layout | 12-Spalten-Satzspiegel, dreispaltiger Text, Initiale, Rubrikenleisten, Marginalien |
| Hauptanimation | Die Spalten setzen sich Zeile für Zeile wie Druckzeilen; die Initiale wächst aus dem Statement heraus |
| Interaktion | Fußnoten öffnen sich als Marginalie; Themenregister (Erbrecht, Gesellschaftsrecht, Steuern) als Inhaltsverzeichnis |
| Bildsprache | Architektur und Dokumente in Schwarzweiß, keine Porträts erfundener Partner |
| UI-Elemente | Rubrikenleiste, Fußnoten, Pull-Quote, Themenregister |
| Signatur | Die rote Linie unter der Schlagzeile |
| Leistung im Einsatz | Texte und Inhaltsstruktur. Notiz: „Eine Kanzlei verkauft Urteilsvermögen. Darum führt hier die Typografie.“ |
| Übergang hinein | N-Blende von Nacht zu Reinweiß; „Kein Zufall.“ fließt in „Nichts dem Zufall überlassen.“ |
| Übergang hinaus | Die rote Linie verlängert sich, die Seite dunkelt von Reinweiß zu British Racing Green, die Linie biegt sich zur Zierlinie und wird dabei elfenbeinfarben |

### Welt 05 — Chromwerk · Oldtimer-Werkstatt (neu)

| Feld | Festlegung |
| --- | --- |
| Look & Feel | Premium Automotive, aber ehrliche Werkstatt: grüner Lack, Chrom, Fahrt. Kinoformat. |
| Farben | British Racing Green #13382B (Grund) · Chrom #E8EAED (10,7:1) · Elfenbein #EFE6D2 (Akzent, 10,4:1) · Chromgrau #8C939B (nur Linien und große Schrift, 4,2:1); Kirschrot entfällt · NP-Modus dunkel |
| Typografie | Michroma (breit, technisch) nur für Versalien-Display mit weiter Laufweite; Fließtext in der Systemschrift |
| Layout | Bildbänder im Format 21:9, horizontale Galerie, Datenblatt-Tabellen |
| Hauptanimation | Querfahrt: Vertikales Scrollen bewegt die Bildstrecke seitwärts (Desktop, gepinnt). Ein Lichtreflex wandert synchron über den Lack. Bei schnellem Scrollen neigt sich die Strecke um bis zu 4°. |
| Interaktion | Vorher-Nachher-Schieber für eine Restaurierung, per Maus, Touch und Pfeiltasten |
| Bildsprache | Studiofotos auf dunklem Grün: Reflexe, Embleme, Tacho, Nähte |
| UI-Elemente | Datenblatt (Baujahr, Hubraum, Restaurierungsstunden), Vorher-Nachher-Schieber, Kapitelnummern |
| Signatur | Die elfenbeinfarbene Zierlinie |
| Leistung im Einsatz | Animation und Interaktion. Notiz: „Ein Oldtimer ist Bewegung. Darum fährt diese Seite quer.“ |
| Übergang hinein | Die rote Linie der Kanzlei wird zur Zierlinie der Karosserie und wechselt dabei von Siegelrot zu Elfenbein |
| Übergang hinaus | Die Kamera fährt auf den runden Scheinwerfer zu; er glüht warm auf und wächst über den Viewport |

### Welt 06 — Jana Ahrens · Coaching und Beratung (vorhandene Demo)

| Feld | Festlegung |
| --- | --- |
| Look & Feel | Ruhig, warm, offen. Farbkugel und konzentrische Kreise als Bild für einen Beratungsprozess (aus der Demo). |
| Farben | Flieder #DCD1EA (Grund) · Text #35292A (9,6:1) · Malve #8A5470 (nur große Schrift und Grafik, 4,0:1) · Kugelverlauf Pfirsich #F1C9B5 bis Flieder #C9B6D9 (nur Fläche) · NP-Modus mittel |
| Typografie | Aus der Demo übernehmen. Falls neu: Figtree 400 und 600 |
| Layout | Zentriert um die Kugel, eine Spalte, kurze Absätze, viel Luft |
| Hauptanimation | Die Kugel atmet mit dem Scrollen (Skalierung 0,9 bis 1,05), die Kreise wachsen nach außen wie Ringe im Wasser |
| Interaktion | „Drei Fragen“-Selbsttest als Demo ohne Datenspeicherung; die Kugel färbt sich je nach Antwort |
| Bildsprache | Kugel statt Foto. Falls die Demo ein Porträt zeigt: nur mit Nutzungsrecht und als fiktive Person gekennzeichnet. |
| UI-Elemente | Weiche Pillen-Buttons, Zitatkarten, Terminanfrage |
| Signatur | Farbkugel mit konzentrischen Kreisen |
| Leistung im Einsatz | Nutzerführung (UX). Notiz: „Beratung beginnt mit Vertrauen. Darum ist hier nichts laut — und der Weg zur Anfrage ist zwei Klicks kurz.“ |
| Übergang hinein | Der Scheinwerfer aus Welt 05 wird zur Farbkugel, British Racing Green wird Pfirsich und läuft in Flieder aus |
| Übergang hinaus | Die Kreise rollen sich zu einer Linie mit sechs Stationen ab: Zwischenspiel II beginnt |

### Welt 07 — NAABTEC · Präzisionsfertigung (neu)

| Feld | Festlegung |
| --- | --- |
| Look & Feel | Hightech aus der Oberpfalz: dunkel, kühl, exakt. Fräsmaschinen, Messprotokolle, Toleranzen. Futuristisch, aber glaubwürdig industriell. |
| Farben | Stahlschiefer #2B3642 (Grund) · Text #E6EAEE (10,2:1) · Signalgelb #F2C230 (7,3:1) · Rastergrau #5A6A78 (nur Dekor) · NP-Modus dunkel |
| Typografie | Geist 400–700 für Überschriften und Text, Geist Mono für Daten |
| Layout | Sichtbares 8-px-Raster, Messprotokoll-Tabellen, Koordinatenachsen, großer Schnitt eines Bauteils |
| Hauptanimation | Eine Laserlinie scannt das Bauteil horizontal, dahinter entsteht das Messprotokoll; Kennzahlen zählen einmal hoch |
| Interaktion | Bauteil drehen per Ziehen oder Scrollen: 12 vorberechnete Ansichten als Bildfolge, kein WebGL |
| Bildsprache | Makros von Metall und Laserlicht, kühl entwickelt, CAD-Linien |
| UI-Elemente | Messprotokoll, Toleranzanzeige, Anfrageformular für Zeichnungen (Demo) |
| Signatur | Laserlinie und Messraster |
| Leistung im Einsatz | Performance und Technik. Notiz: „Einkäufer prüfen genau. Darum ist hier jede Zahl auffindbar und die Seite schnell.“ |
| Übergang hinein | Der Prozessstrahl aus Zwischenspiel II glüht auf und wird zur Laserlinie, der Grund wechselt zu Stahlschiefer |
| Übergang hinaus | Die Messraster-Zellen ordnen sich zum Monatskalender, eine Zelle leuchtet als Termin, Stahlschiefer wird Mint |

### Welt 08 — Praxis am Weiher · Physiotherapie (neu)

| Feld | Festlegung |
| --- | --- |
| Look & Feel | Ruhig, hell, freundlich, barrierearm. Wie ein gut gelüfteter Behandlungsraum mit Blick aufs Wasser. |
| Farben | Mint #CDE8DA (Grund) · Tiefgrün #1E2D2A (11,1:1) · Salbei #2F6B57 (4,8:1) · Hellmint #CFE6DC (nur Flächen) · NP-Modus hell |
| Typografie | Atkinson Hyperlegible Next 400 und 700 (für Lesbarkeit entwickelt); Grundtext 19–20 px |
| Layout | Eine klare Inhaltsspalte plus Seitenleiste mit Terminbuchung; Klickflächen mindestens 48 px |
| Hauptanimation | Bewusst zurückhaltend: kurze Einblendungen (Deckkraft und 8 px). Die ruhigste Welt der Reise. |
| Interaktion | Terminbuchung als Demo: Behandlung, Tag, Uhrzeit — vollständig per Tastatur. Schalter „Große Schrift“ und „Hoher Kontrast“ direkt in der Welt. |
| Bildsprache | Helle Räume, Hände bei der Behandlung ohne erkennbare Gesichter, Wasserfläche |
| UI-Elemente | Buchungsmodul, Behandlungskarten, Anfahrt und Parken, Öffnungszeiten |
| Signatur | Kalender mit markiertem Termin; die Wasserlinie |
| Leistung im Einsatz | Barrierefreiheit und Online-Terminbuchung. Notiz: „Patienten sind nicht immer fit. Darum ist hier alles groß, klar und mit der Tastatur bedienbar.“ |
| Übergang hinein | Messraster wird Terminkalender |
| Übergang hinaus | Die Kamera schwenkt vom Kalender auf das Foto des Weihers, das Bild zoomt aus: Der Weiher wird zum See bei Abenddämmerung |

### Welt 09 — Gut Weidenstein · Landgasthof und Hotel am See (neu)

| Feld | Festlegung |
| --- | --- |
| Look & Feel | Stille Eleganz: Abendlicht über dem See, Leinen, Holz, Zeit. Luxus durch Ruhe, nicht durch Gold. |
| Farben | Dämmerungsviolett #2A1F33 (Grund) · Leinenweiß #ECE6DA (12,6:1) · Schilf #A9BC93 (7,7:1) · Wasser #6F8796 (nur Linien, 4,2:1) · NP-Modus dunkel |
| Typografie | Cormorant, variabel: Display 300 und 500 sehr groß; Text 500 ab 20 px mit Zeilenhöhe 1,6 |
| Layout | Vollbild-Landschaften, Text in kleinen Inseln, Speisekarte als schmale Spalte |
| Hauptanimation | Die langsamste Welt: Bildüberblendungen über 120vh, die Tageszeit wandert als Farbtemperatur-Schicht von Abend zu Nacht |
| Interaktion | Zimmer- und Tischanfrage als Demo (Datum, Personen); Speisekarte wechselt zwischen Mittag und Abend |
| Bildsprache | Seeufer, Zimmer mit Fensterblick, Tellerdetails; natürliches Abendlicht |
| UI-Elemente | In der Welt fixierte Buchungsleiste, Speisekarte, Zimmerkarten |
| Signatur | Das erleuchtete Fenster |
| Leistung im Einsatz | Conversion-Struktur. Notiz: „Gäste buchen ein Gefühl. Darum kommt die Anfrage erst, wenn es da ist — und dann ohne Hürde.“ |
| Übergang hinein | Der Weiher wird zum See; Mint kippt in Dämmerungsviolett |
| Übergang hinaus | Die Kamera fährt auf ein erleuchtetes Fenster zu; sein Rahmen wird zur Maske für das Porträt in Zwischenspiel III |

### Welt 10 — NP Labor · Rohbau (NP selbst)

| Feld | Festlegung |
| --- | --- |
| Look & Feel | Die nackte Website. Erst ungestyltes HTML wie 1995, dann radikal experimentell: brutalistisch, riesig, roh. NPs eigene Spielwiese. |
| Farben | Weiß #FFFFFF (unverändert) · Schwarz #000000 (21:1) · Linkblau #0000EE (9,4:1) · Besucht-Lila #551A8B; am Ende NP-Orange · NP-Modus hell |
| Typografie | Browser-Standards Times, Arial, Courier (0 KB). Zum Schluss Archivo in Extrembreiten (wdth 62 bis 125). |
| Layout | Erst Dokumentfluss ohne Gestaltung (Blöcke untereinander, blaue unterstrichene Links), dann Brüche: Überlagerungen, 90°-Drehungen, Riesenschrift. Alles bleibt innerhalb der Sektion beschnitten, nie horizontaler Überlauf. |
| Hauptanimation | Archivo-Buchstaben dehnen sich über die Breitenachse mit der Scrollgeschwindigkeit; Elemente rasten ins Raster ein |
| Interaktion | „Rohbau-Schalter“: zeigt das HTML-Gerüst einer früheren Welt mit sichtbaren Überschriften-Ebenen — so sieht semantisches HTML aus |
| Bildsprache | Keine Fotos. Ein einziges Bild fehlt absichtlich, sein Alt-Text erscheint: „Hier stünde ein Foto, wenn es eins bräuchte.“ |
| UI-Elemente | Ungestylte Standard-Bedienelemente (Button, Checkbox, Auswahlliste): „Jedes Bedienelement beginnt so.“ |
| Signatur | Der blaue Standardlink, der am Ende orange wird |
| Leistung im Einsatz | Handwerk und sauberer Code. Notiz: „Alles, was Sie gesehen haben, besteht aus diesem Rohmaterial. Kein Baukasten, keine Vorlage.“ |
| Übergang hinein | Zwischenspiel III zieht sich aus: Farben, Schrift, Abstände, Layout fallen in vier Stufen |
| Übergang hinaus | Die Rohelemente bekommen ihren Stil zurück, diesmal NP: Links werden orange, Times wird Archivo, die Blöcke ordnen sich zum Werkplan |

### Die drei Zwischenspiele

| Zwischenspiel | Grund | Inhalt | Form |
| --- | --- | --- | --- |
| I · Warum individuell | Nacht #14100C | „Kein Baukasten. Keine Vorlage. Kein Zufall.“ Dazu drei Nutzensätze und das Branchenband | Drei Zeilen, jede exakt auf Viewport-Breite gesetzt; Glut-Akzente |
| II · Arbeitsweise | Leinen #F0EBE3 | Sechs Schritte: Kennenlernen, Konzeption, Design, Entwicklung, Launch, Betreuung | Ein Strahl mit sechs Stationen, die beim Scrollen aufklappen; Desktop quer, Mobile senkrecht |
| III · Über mich | Leinen #F0EBE3 | Porträt von Niklas, Werdegang in drei Sätzen, Zusage des direkten Drahts | Porträt im Fensterrahmen, Text Zeile für Zeile |

## G. Farbpalette

**Die Master-Palette ist warm, zurückhaltend und auf das echte Logo-Orange #CE5D17 gebaut; die zehn Welten bringen eigene Farben, aber nie Orange, und keine zwei Welten gleichen sich.** Alle Kontraste sind nach der WCAG-Formel nachgerechnet. Gründe und Hintergründe übernehmen die Werte der bestehenden Seite und des Logos, damit Website, Logo und PDFs zusammenpassen.

### Master Brand Palette

| Rolle | Name | HEX | RGB | Verwendung | Kontrast |
| --- | --- | --- | --- | --- | --- |
| Primary Background | Leinen | #F0EBE3 | 240, 235, 227 | Seitengrund von NP, Werkplan, Zwischenspiele II und III | Tinte 15,0:1 |
| Secondary Background | Sand | #E3D8C8 | 227, 216, 200 | Flächen, geöffnete Akkordeons, Faktenblock | Tinte 12,6:1 · Stein 5,0:1 |
| Light Surface | Kalk | #FBF8F5 | 251, 248, 245 | Formularfelder, Werkplan-Zellen, FAQ (identisch mit dem Logo-Hintergrund) | Tinte 16,8:1 |
| Primary Text | Tinte | #1C1712 | 28, 23, 18 | Text und Überschriften auf Hell | 15,0:1 auf Leinen |
| Secondary Text | Stein | #5E5852 | 94, 88, 82 | Unterzeilen, Meta-Angaben, Notizen auf Hell | 5,9:1 Leinen · 5,0:1 Sand |
| Brand Color | NP-Orange | #CE5D17 | 206, 93, 23 | Logo, oranger Faden, Linien, Button-Fläche, Schrift ab 24 px | 3,4:1 auf Leinen: nur Grafik und große Schrift |
| Brand Text | Orange-Text | #A34A0D | 163, 74, 13 | Orange als Fließtext, Link oder Mono-Notiz auf Hell | 5,0:1 Leinen · 5,6:1 Kalk · auf Sand nur ab 24 px (4,2:1) |
| Accent 1 | Glut | #F08A4B | 240, 138, 75 | Orange auf Dunkel: Maßschicht, Links, Fokusring | 7,6:1 Nacht · 5,9:1 Kohle |
| Accent 2 | Ocker | #C99A3E | 201, 154, 62 | Zweite Maßfarbe, nur auf Dunkel: Maßzahlen, aktive Linealmarke, Hervorhebung in Zwischenspiel I | 7,4:1 Nacht · nie auf Hell (2,2:1) |
| Dark Contrast | Nacht | #14100C | 20, 16, 12 | Zwischenspiel I, Footer, Schrift auf orangen Buttons | Leinen 16,0:1 · auf NP-Orange 4,7:1 |
| Dark Surface | Kohle | #2E2822 | 46, 40, 34 | Anthrazit aus dem Logo: Menü-Overlay, Flächen auf Nacht | Leinen 12,3:1 |
| Secondary Text Dark | Asche | #B5AB9F | 181, 171, 159 | Sekundärtext auf Dunkel | 8,4:1 Nacht · 6,4:1 Kohle |

### Hover- und Interaktionsfarben

| Zustand | Festlegung | Kontrast |
| --- | --- | --- |
| Button primär | Fläche NP-Orange, Schrift Nacht | 4,7:1 |
| Button primär, Hover und gedrückt | Fläche Tinte, Schrift Leinen, Pfeil in Glut; gedrückt zusätzlich Skalierung 0,98 | 15,0:1 |
| Button sekundär | Rahmen 1,5 px Tinte, Schrift Tinte; Hover: Fläche Sand | 12,6:1 |
| Link | Tinte mit 1,5-px-Unterstreichung in NP-Orange (3 px Abstand); Hover: Schrift Orange-Text, Unterstreichung 3 px | 5,0:1 |
| Hover-Tönung | #ECDACB (NP-Orange 12 % auf Leinen) für Zeilen, Zellen, Menüpunkte | Tinte 13,1:1 · Stein 5,2:1 |
| Fokus | 2 px Tinte mit 2 px Abstand auf Hell, 2 px Glut auf Dunkel | 15,0:1 · 7,6:1 |
| Textauswahl | Fläche NP-Orange, Schrift Nacht | 4,7:1 |
| Fehler | #A3271D (RGB 163, 39, 29) plus Symbol und Wort „Fehler“, nie Farbe allein | 6,2:1 Leinen |
| Erfolg | #2E6A4B (RGB 46, 106, 75) plus Symbol | 5,4:1 Leinen |

**Abstimmung mit den PDFs:** Rechnung und Briefing-Formular nutzen #E4572E. Das ist ein helleres, röteres Orange als das Logo. Beide PDFs auf #CE5D17 umstellen, damit es nur ein Markenorange gibt.

### System: Master Palette → Welt-Paletten

1. **Vier Farbwerte pro Welt.** Grund, Text, Akzent, Akzent 2. Dazu bestimmt der Grund automatisch den NP-Modus der Welt (nie von Hand): hell → Orange-Text, dunkel → Glut, mittel → Tinte (Markenregel 2). Alle Werte stehen in der zentralen Reise-Konfiguration, nie im Weltmodul.
2. **Geschützter Farbbereich.** Keine Welt nutzt Farbtöne zwischen 10° und 35° mit mehr als 55 % Sättigung. Dieser Bereich gehört NP.
3. **Atmosphäre statt Kanten.** Ein globaler Regler blendet die Hintergrundfarbe der Seite während jedes Übergangs von Grund zu Grund. Es gibt nie eine sichtbare Farbkante zwischen zwei Abschnitten.
4. **Akzent 2 ist oft nur Fläche.** Werte unter 3:1 (Bordeaux, Kugelverlauf, Hellmint) dürfen nie Text oder Bedienelement tragen; Chromgrau, Wasser und Rastergrau nur für Linien, große Schrift oder Dekor, Roggen nur für Grafik, Malve nur für große Schrift und Grafik (4,0:1).
5. **Unterscheidbarkeit ist eine Prüfung.** Das Skript scripts/check-palettes.mjs liest die Reise-Konfiguration; der Build bricht ab, wenn eine Regel verletzt ist: Farbabstand ΔE (CIE76) zwischen den Gründen aller Welten paarweise mindestens 10, ebenso zwischen jeder Welt und Leinen #F0EBE3 (Ausnahmen: 04 und 10 teilen bewusst das Weiß und liegen in der Reise weit auseinander; Weiß liegt bei ΔE 8,1 zu Leinen); Text auf Grund mindestens 4,5:1; Akzente als Text mindestens 4,5:1, sonst nur große Schrift oder Grafik; kein Grund und kein Akzent im geschützten Orange-Bereich; keine zwei Welten mit gleicher Akzentfarbe. Als Designregel gilt zusätzlich: Keine zwei Welten teilen Grundfarbe, Schrift, Akzentfarbe oder Layoutprinzip.

| Welt | Grund | Text | Akzent | Akzent 2 (eingeschränkt) | Text / Grund | Akzent / Grund | NP-Modus und Maßschicht |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 01 Korn & Kruste | #E9C46A Weizengold | #3B2618 | #5E2B4A Zwetschge | #8B5A2B Roggen (nur Grafik) | 8,5:1 | 6,5:1 | mittel · Tinte 10,6:1 |
| 02 Herrenzimmer | #121010 | #EDE6D8 | #C9A24A Gold | #7A2433 Bordeaux (nur Fläche) | 15,3:1 | 7,9:1 | dunkel · Glut 7,6:1 |
| 03 Steiner Bau | #DCE8F1 Planblau-Weiß | #1C2A38 | #2B5C8A Blaupause | #B23A2E Prüfrot | 11,7:1 | 5,6:1 | hell · Orange-Text 4,8:1 |
| 04 Haas & Sternfeld | #FFFFFF Reinweiß | #111111 | #A3122A Siegelrot | #6E6E66 Grau (Linien, Meta) | 18,9:1 | 7,8:1 | hell · Orange-Text 5,9:1 |
| 05 Chromwerk | #13382B British Racing Green | #E8EAED Chrom | #EFE6D2 Elfenbein | #8C939B Chromgrau (nur Linien, große Schrift) | 10,7:1 | 10,4:1 | dunkel · Glut 5,2:1 |
| 06 Jana Ahrens | #DCD1EA Flieder | #35292A | #8A5470 Malve (nur große Schrift, Grafik) | #F1C9B5 → #C9B6D9 Kugelverlauf (nur Fläche) | 9,6:1 | 4,0:1 | mittel · Tinte 12,2:1 |
| 07 NAABTEC | #2B3642 Stahlschiefer | #E6EAEE | #F2C230 Signalgelb | #5A6A78 Rastergrau (nur Dekor) | 10,2:1 | 7,3:1 | dunkel · Glut 4,9:1 |
| 08 Praxis am Weiher | #CDE8DA Mint | #1E2D2A | #2F6B57 Salbei | #CFE6DC Hellmint (nur Fläche) | 11,0:1 | 4,8:1 | hell · Orange-Text 4,6:1 |
| 09 Gut Weidenstein | #2A1F33 Dämmerungsviolett | #ECE6DA | #A9BC93 Schilf | #6F8796 Wasser (nur Linien) | 12,6:1 | 7,7:1 | dunkel · Glut 6,3:1 |
| 10 NP Labor | #FFFFFF | #000000 | #0000EE Linkblau | #551A8B Besucht | 21,0:1 | 9,4:1 | hell · Orange-Text 5,9:1 |

Alle Werte gelten seit dem 7. Oktober 2026 und ersetzen die früheren Weltpaletten. Welt 02 bleibt unverändert; bei Welt 03 sind nur Grundfarbe und Millimeterraster angeglichen, die Gestaltung der Demo bleibt. Die Prüfung (Systemregel 5) rechnet die Kontraste, Farbabstände und den NP-Modus aus der Konfiguration nach; kleinster Abstand zweier Gründe: ΔE 10,6 (Welt 03 und 04).

## H. Typografie

**NP spricht in einer einzigen variablen Schrift — Archivo — und einer Mono für die Maßschicht.** Display, Headline und Fließtext sind drei Stimmen derselben Familie, gesteuert über Breite und Gewicht. Das spart Ladezeit und hält NP ruhig, während die Welten typografisch laut werden dürfen. Archivo ist eine Grotesk mit Wurzeln im späten 19. Jahrhundert und passt zu den blockigen, kantigen Formen des Logos.

### Die NP-Schriften

| Rolle | Schrift | Achsen und Schnitte | Einsatz | Lizenz |
| --- | --- | --- | --- | --- |
| Display | Archivo, variabel | Breite 62–125, Gewicht 800–900 | Einzelwörter und Statements, auf Viewport-Breite gesetzt | SIL Open Font License, selbst gehostet |
| Headline | Archivo, variabel | Breite 85–100, Gewicht 650–750 | H1 bis H3, Buttons, Navigation | wie oben (dieselbe Datei) |
| Body | Archivo, variabel | Breite 100, Gewicht 400 und 600 | Fließtext, Formular, FAQ | wie oben (dieselbe Datei) |
| Mono | IBM Plex Mono | 400 und 500 | Maßschicht, Weltzähler, Kicker, Lebenszeichen, Abspann | SIL Open Font License, selbst gehostet |

**Warum nicht Poppins, Playfair oder Inter:** Alle drei sind Standard in Vorlagen und KI-generierten Seiten. Eine Website, deren These „keine Vorlage“ ist, darf nicht in der Schrift der Vorlagen sprechen. Ebenfalls verboten: die Kombination aus Grotesk-Headline mit einem kursiven Serifen-Akzentwort — das Erkennungszeichen generischer Landingpages 2024–26.

### Schriftskala

| Stufe | Größe (flüssig) | ca. Desktop / Mobile | Zeilenhöhe | Laufweite | Gewicht | Breite | Einsatz |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Mega | auf Breite gesetzt; Rückfall clamp(4.5rem, 20vw, 22rem) | bis 288 / 78 px | 0,82 | −0,04 em | 850 | 62–125, berechnet | „NP“ im Opening und Finale, Zwischenspiel I |
| Display | clamp(3rem, 8.5vw, 9rem) | 122 / 48 px | 0,88 | −0,03 em | 780 | 85 | Statements |
| H1 | clamp(2.5rem, 5.6vw, 6rem) | 81 / 40 px | 0,95 | −0,025 em | 720 | 90 | Hero |
| H2 | clamp(2rem, 3.8vw, 3.75rem) | 55 / 32 px | 1,0 | −0,02 em | 700 | 95 | Werkplan, Zwischenspiele, Finale |
| H3 | clamp(1.375rem, 1.9vw, 1.75rem) | 27 / 22 px | 1,15 | −0,01 em | 650 | 100 | Notizen, FAQ-Fragen |
| Lead | clamp(1.125rem, 1.4vw, 1.375rem) | 20 / 18 px | 1,45 | 0 | 420 | 100 | Unterzeilen |
| Body | 17 px, ab 1024 px 18 px | 18 / 17 px | 1,6 | 0 | 400 | 100 | Fließtext, max. 66 Zeichen pro Zeile |
| Small | 0.875rem | 14 / 14 px | 1,5 | +0,005 em | 400 | 100 | Hinweise, Footer |
| Mono | 0.75rem, Versalien | 12 / 12 px | 1,35 | +0,08 em | 500 | — | Maßschicht mit Information, Zähler, Kicker |
| Mono XS | 0.6875rem, Versalien | 11 / 11 px | 1,3 | +0,08 em | 400 | — | Nur dekorative Notizen, für Screenreader verborgen |

### Satz nach Maß (die typografische Signatur)

Jede Display- und Mega-Zeile von NP läuft exakt von Rand zu Rand ihres Containers. Statt nur die Größe zu skalieren, passt ein kleines Skript zuerst die **Breitenachse** an: Die Buchstaben werden schmaler oder breiter, bis die Zeile sitzt. Erst wenn die Breite an ihre Grenze kommt (62 oder 125), ändert sich die Schriftgröße. Das ist die Idee „Maßarbeit“ in der Schrift selbst.

- Messen nach dem Laden der Schrift, bei jeder Container-Änderung neu (ResizeObserver, 150 ms entprellt).
- Zwei bis drei Messdurchläufe pro Zeile genügen; danach kein weiteres Messen beim Scrollen.
- Ohne Skript greifen die clamp()-Werte der Tabelle. Kein Layoutsprung: Gemessen wird, bevor die Zeile eingeblendet wird.

### Regeln für deutschen Satz

- **Lange Wörter:** Physiotherapie, Restaurierung, Steuerberatung brechen auf 320 px aus. Große Zeilen bekommen weiche Trennstellen von Hand und werden auf Breite gesetzt; ab H3 abwärts automatische Silbentrennung (Sprache Deutsch). Letzte Sicherung: Umbruch innerhalb des Wortes statt Überlauf.
- **Anführungszeichen** „deutsch“, Gedankenstrich mit Leerzeichen – wie hier, Zahlen mit Tausenderpunkt.
- **Ziffern:** Tabellenziffern in Zähler, Lineal, Preisen.
- **Versalien** nur in Mono und Display, nie im Fließtext.

### Schriften der Welten

| Welt | Schrift | Rolle |
| --- | --- | --- |
| 01 Korn & Kruste | Fraunces (Achsen: optische Größe 9–144, Gewicht 100–900, SOFT 0–100, WONK 0–1) | Display und Text |
| 02 Herrenzimmer | Schrift der Demo, sonst Bodoni Moda | Display, Text ab 18 px |
| 03 Steiner Bau | Schrift der Demo, sonst Barlow Condensed und Barlow | Display und Text |
| 04 Haas & Sternfeld | Newsreader (optische Größe, Gewicht) | Display und Text |
| 05 Chromwerk | Michroma, Text in Systemschrift | Display |
| 06 Jana Ahrens | Schrift der Demo, sonst Figtree | Display und Text |
| 07 NAABTEC | Geist und Geist Mono | Display, Text, Daten |
| 08 Praxis am Weiher | Atkinson Hyperlegible Next | Display und Text |
| 09 Gut Weidenstein | Cormorant | Display und Text |
| 10 NP Labor | Times, Arial, Courier (Systemschriften), am Ende Archivo | Rohbau |

Alle Weltschriften sind frei lizenziert (Google-Fonts-Katalog) und werden selbst gehostet, nie von einem Fremdserver geladen. Jede Welt lädt höchstens zwei Dateien. Weil die Display-Texte der Welten fest stehen, werden diese Dateien beim Build auf genau die benutzten Zeichen reduziert.

## I. Motion Design System

**Bewegung hat auf dieser Seite genau drei Aufgaben: verbinden, führen, erklären.** Verbinden heißt Staffelstab zwischen den Welten. Führen heißt den Blick auf das Nächste lenken. Erklären heißt zeigen, wie etwas entsteht — eine Maßlinie, ein Hausquerschnitt. Was keine der drei Aufgaben erfüllt, wird gestrichen.

### Bewegungs-Tokens

| Token | Wert | Einsatz |
| --- | --- | --- |
| Dauer XS | 120 ms | Farbwechsel, Fokus |
| Dauer S | 240 ms | Hover, Buttons, Links, Zähler |
| Dauer M | 480 ms | Einblendungen, Menü |
| Dauer L | 700 ms | Zeilen-Masken, Opening |
| Dauer XL | 1200 ms | Nur Welt 09 und Finale |
| Scroll-Szenen | Länge in vh statt Millisekunden | Alle Übergänge und gepinnten Szenen |
| Ausklang (Standard) | cubic-bezier(0.22, 1, 0.36, 1) | Alles, was erscheint |
| Werkzeug | cubic-bezier(0.65, 0, 0.35, 1) | Übergänge innerhalb einer Scroll-Szene |
| Stempel | Skalierung 1,15 auf 1 in 180 ms, leichter Überschwung | Nur Prüfstempel und Wartemarke |
| Versatz (Stagger) | 60–90 ms, höchstens 8 Elemente pro Gruppe | Listen, Zeilen, Fragmente |
| Scroll-Glättung | 0,6 s Nachlauf am Desktop, direkt auf Touch | Alle scrollgesteuerten Szenen |
| Verboten | Elastik, Federn, Hüpfen, Endlos-Schleifen | — |

### Micro Animations

| Element | Verhalten | Touch |
| --- | --- | --- |
| Button primär | Die Fläche wischt von links von Orange zu Tinte, der Pfeil rückt 4 px nach rechts, das Label rollt nach oben (rollender Hover nach HIRO-Prinzip). 240 ms, Ausklang. Kein magnetischer Effekt. | Sofortiger Druckzustand in Tinte |
| Links im Text | Unterstreichung wächst von 1,5 auf 3 px, Schrift wird Orange-Text. Kein Rollen im Fließtext. | Druckzustand gleich Hover |
| Menü | Kohle-Fläche fährt von oben ein (Maske), Einträge folgen mit 50 ms Versatz; Einträge rollen beim Hover | identisch, ohne Rollen |
| Cursor | Systemcursor bleibt immer. Einzige Ausnahme: Im Werkplan zeigt eine kleine Mono-Koordinate („x 0412 · y 0288“) neben dem Cursor, dass hier ein Plan liegt. | entfällt |
| Bilder | Im Werkplan: Zellbild 1 auf 1,03, Browserleiste wird orange. In den Welten nur die Bewegung der jeweiligen Welt, keine Standard-Hover. | Tippen öffnet direkt |
| Text | Überschriften erscheinen einmal per Zeilen-Maske; Fließtext nur mit Deckkraft und 12 px Versatz. Nie Buchstaben einzeln. | identisch |
| Weltzähler | Ziffern rollen beim Weltwechsel wie ein Kilometerzähler | identisch |
| Lineal | Die Marke gleitet mit; die Striche erreichter Welten färben sich orange | 2-px-Linie füllt sich |
| Formular | Fokus: Unterkante wächst von 1 auf 2 px in Orange. Fehler: Text und Symbol, kein Schütteln. | identisch |

### Macro Animations

| Technik | Wo | Regel |
| --- | --- | --- |
| Section Transitions | Alle 14 Übergänge der Staffelstab-Kette | Immer mit Objekt, gepinnt 60–150vh, folgt dem Scrollen |
| Zoom | Opening, Finale, Weiher zu See, Scheinwerfer | Ebenen in Endgröße bauen und verkleinern, nie hochskalieren; nur eine Zoom-Ebene gleichzeitig |
| Parallax | Bilder in Welt 01, 05, 09 | Höchstens zwei Ebenen, Versatz max. 15 % der Bildhöhe (Mobile 8 %); nie Text |
| Masking | P-Iris (Kreis), N-Blende (Diagonale), Fenster (Rechteck), Wischblenden | Hauptwerkzeug der Übergänge; nur einfache Formen bis 8 Eckpunkte |
| Morphing | Zierlinie, Kreise zu Weg | Nur Linien und Kreise, Pfade bis 200 Punkte, Mobile vereinfacht |
| Scale | Aufgehen (0,96 auf 1), Stempel, Werkplan | Text nie über Faktor 1,1 skalieren |
| Rotation | Bon (Hochachse 180°), Labor (90°) | Sonst keine Drehungen |
| Blur | Nur das Glühen des Scheinwerfers, Desktop | Max. 12 px, ein Element, aus auf Mobile und schwachen Geräten |
| Opacity | Überall für Nebensächliches | Standard für alles, was nicht Hauptfigur ist |
| Clip-path | siehe Masking | Animiert nur in gepinnten Szenen |
| Text transformations | Breitenachse (Satz nach Maß, Labor), SOFT-Achse (Welt 01), Zeilen-Masken, Wort-Flip („Zufall“) | Keine Buchstaben-Explosionen; Zeichen-Scramble nur einmal bei NAABTEC-Zahlen |

### Scroll-Verhalten

- **Langsames Scrollen** wird belohnt: Maßschicht-Notizen tippen sich Zeichen für Zeichen (höchstens 24 Zeichen), Bemaßungen zeichnen sich, Szenen laufen exakt mit.
- **Schnelles Scrollen** wird geglättet: 0,6 s Nachlauf verhindert Flackern. Ab etwa 2.500 px/s entfallen Unschärfe und Fragment-Animationen, Notizen stehen sofort, Zähler springen. Der Wert ist ein Startpunkt und wird auf echten Geräten justiert.
- **Reagiert auf Geschwindigkeit:** nur das Branchenband (Tempo und Neigung bis 4°), die Querfahrt in Welt 05 (Neigung), die Buchstaben im Labor (Breitenachse) und die Linealmarke (zieht kurz nach). Sonst nichts.
- **Sticky:** der Rahmen; jede Übergangsszene während ihrer Strecke; die Querfahrt in Welt 05 (Desktop); innerhalb ihrer Welt die Buchungsleiste von Welt 09 und die Seitenleiste von Welt 08.
- **Scroll-Jacking: nirgends.** Das Mausrad wird nie abgefangen, nichts rastet ein, nichts sperrt. Gepinnte Szenen bewegen sich exakt proportional zur Scrollstrecke; man kann jederzeit anhalten, zurückscrollen, springen.
- **Smooth Scroll:** Lenis nur am Desktop mit Maus oder Trackpad. Auf Touch bleibt das native Scrollen. Leertaste, Pfeiltasten, Bild ab und Anker funktionieren unverändert.

### Gegen Motion Fatigue

1. Nur eine Makrobewegung gleichzeitig im Bild.
2. Nach jedem Tempo-Höhepunkt eine ruhige Welt oder ein Zwischenspiel.
3. Keine Daueranimation: Wenn niemand scrollt, steht alles still. Einzige Ausnahme ist die Uhr im Lebenszeichen, einmal pro Minute.
4. Jede Übergangstechnik kommt höchstens zweimal vor (Ausnahme: der Werkplan-Zoom als Klammer am Anfang und Ende).
5. Gepinnte Strecken sind höchstens 150vh lang.
6. Schalter „Ruhige Ansicht“ im Menü; die Systemeinstellung „Bewegung reduzieren“ schaltet ihn automatisch ein.

## J. Navigation / UX

**Die Reise ist lang — deshalb ist niemand in ihr gefangen.** Drei Ausgänge sind jederzeit sichtbar: der Anfrage-Button, das Monogramm (springt zum Werkplan) und das Menü. Wer es eilig hat, erreicht Leistungen, Preise und Kontakt mit einem Klick aus dem Hero.

### Der Rahmen

| Element | Desktop | Mobile | Verhalten |
| --- | --- | --- | --- |
| Monogramm | oben links, 32 px | oben links, 28 px | Springt zum Werkplan, ohne das Opening erneut abzuspielen |
| Anfrage-Button | oben rechts, kantiger Button | Leiste unten in der Daumenzone: „Projekt anfragen“ plus Telefon-Symbol | Springt zum Formular in Welt 11. Mobile erscheint die Leiste nach dem Hero und verschwindet im Kontaktbereich. |
| Menü | Wort „Menü“ oben rechts, kein Hamburger-Symbol allein | oben rechts | Öffnet das Overlay |
| Lebenszeichen | oben, links neben dem Button | im Menü | Ortszeit Schwandorf, Antwortzeit |
| Weltzähler | unten links | Kopfzeile Mitte, nur „04 / 10“ | Zeigt Welt und Branche |
| Lineal | rechter Rand; Striche zeigen beim Hover den Weltnamen | 2-px-Linie am oberen Rand | Klick springt zur Welt (nur Maus; für Tastatur steht dieselbe Liste im Menü) |
| Kopfzeile | bleibt stehen | blendet beim Hinunterscrollen aus, beim Hinaufscrollen ein | Die Anfrage-Leiste unten bleibt immer |

Die Rahmenelemente haben keinen Hintergrundbalken. Sie wechseln ihre Farbe mit der Welt: Tinte auf hellen, Leinen auf dunklen Gründen, gesteuert über dieselbe Helligkeitsregel wie die Maßschicht. Der orange Button funktioniert auf beiden (Nacht-Schrift auf Orange 4,7:1).

### Menü

- Kohle-Fläche über den ganzen Viewport, zwei Spalten.
- Links „Die zehn Welten“: Nummer, Name, Branche; die aktuelle Welt ist markiert.
- Rechts: Leistungen und Preise (eigene Seite), Arbeitsweise, Über mich, FAQ, Kontakt, darunter Telefon, E-Mail und Lebenszeichen, ganz unten Impressum, Datenschutz und Datenschutz-Einstellungen.
- Unten der Schalter „Ruhige Ansicht“.
- Fokus bleibt im Menü, Escape schließt es, danach steht der Fokus wieder auf dem Menü-Button.

### Werkplan und Sprünge

- Jede Zelle im Werkplan ist ein Link zu ihrer Welt.
- Ein Sprung landet am Anfang des Weltinhalts, nicht vor dem Übergang. Bei Sprüngen über mehr als eine Welt blendet die Seite 200 ms aus, springt und blendet ein — niemand muss zwanzig Übergänge im Zeitraffer ansehen.
- Alle Szenen vor dem Sprungziel stehen danach im Endzustand.

### Anker und Links

| Ziel | Anker |
| --- | --- |
| Welten 01–10 | #baeckerei, #barbershop, #bau, #kanzlei, #oldtimer, #coaching, #industrie, #physiotherapie, #landgasthof, #labor |
| Zwischenspiele | #warum, #arbeitsweise, #ueber-mich |
| Ende | #kontakt, #faq |

Beim Weltwechsel aktualisiert die Seite den Anker in der Adresszeile ohne neuen Verlaufseintrag. So lässt sich jede Welt direkt teilen, und die Zurück-Taste verlässt die Seite wie erwartet.

### Wege für Eilige

- Unter den Hero-Buttons eine Textzeile: „Direkt zu: Leistungen und Preise · Kontakt“.
- Unsichtbare Sprunglinks am Seitenanfang, sichtbar bei Tastaturfokus: „Zum Inhalt springen“ und „Animationen überspringen, direkt zum Kontakt“.
- Mobile die feste Anfrage-Leiste.

### Tastatur, Fokus, Zustände

- **Reihenfolge:** Sprunglinks, dann Rahmen (Monogramm, Menü, Anfrage), dann Inhalt in Lesereihenfolge.
- **Fokus nie verdeckt:** Der Scroll-Abstand oben entspricht der Rahmenhöhe, damit ein fokussiertes Element nie unter dem Rahmen liegt.
- **Demo-Bedienelemente** in den Welten sind echte, beschriftete Elemente mit dem Hinweis „Demo“. Sie funktionieren lokal und senden nichts.
- **Ruhige Ansicht:** keine Pins, keine Übergänge; die Welten stehen als ruhige Kompositionen untereinander, mit einfachen Einblendungen. Der Inhalt ist identisch.
- **Ohne JavaScript:** eine lange, statische Seite in Lesereihenfolge. Das Opening läuft per CSS, das Formular sendet als normales Formular.
- **404-Seite:** im NP-Stil, „Diese Welt gibt es noch nicht.“, mit Link zum Werkplan.

## K. Content Strategy

**Die Seite verkauft in fester Reihenfolge: erst wer und für wen, dann der Beweis, dazwischen die Gründe, am Ende ein leichter nächster Schritt.** Keine Information steht als klassischer Corporate-Abschnitt da. Jede hat einen Ort in der Reise, an dem sie natürlich vorkommt.

### Stimme

- Ich-Form, Sie-Anrede, kurze Sätze.
- Jeder Satz muss überprüfbar sein und falsch werden können (Regel aus dem Audit). „Antwort innerhalb eines Werktags“ ja, „State of the Art“ nein.
- Verboten: innovativ, maßgeschneidert, auf das nächste Level, ganzheitlich, Leidenschaft. „Maßarbeit“ ist der Arbeitstitel dieses Konzepts, kein Claim auf der Seite.
- Nutzen vor Technik: „Termine kommen auch nachts rein“ statt „Online-Buchungssystem“.

### Wo welche Information lebt

| Information | Ort in der Reise | Form |
| --- | --- | --- |
| Wer NP Webdesign ist | Hero-Unterzeile, Zwischenspiel III, Abspann jeder Welt | Ich-Text, Porträt, Signatur |
| Was angeboten wird | Werkstattnotiz jeder Welt („Leistung im Einsatz“), Faktenblock in Welt 11, Seite /leistungen | Zehn Leistungen im Einsatz gezeigt, kompakte Liste am Ende |
| Welche Qualität | Die Welten selbst, der Rohbau in Welt 10 | Zeigen statt behaupten |
| Welche Websites möglich sind | Werkplan und Welten | Zehn Studien |
| Warum individuell | Zwischenspiel I | Drei Statements, drei Nutzen |
| Portfolio | Welten als Studien; echte Projekte unter /projekte | Klar getrennt |
| Kontakt | Rahmen-Button, Welt 11, Footer | Formular, Telefon, E-Mail |

### Leistungen in den Welten

| Welt | Leistung im Einsatz | Nutzen für den Kunden |
| --- | --- | --- |
| 01 Korn & Kruste | Bildkonzept und Fotobriefing | Ihre Produkte wirken so gut, wie sie sind. |
| 02 Herrenzimmer | Online-Terminbuchung und Markenwirkung | Termine kommen auch nachts rein. |
| 03 Steiner Bau | Konzeption und Seitenstruktur | Interessenten finden in Sekunden, was sie suchen. |
| 04 Haas & Sternfeld | Texte und Inhaltsstruktur | Ihre Kompetenz wird lesbar. |
| 05 Chromwerk | Animation und Interaktion | Ihre Website bleibt im Kopf. |
| 06 Jana Ahrens | Nutzerführung | Weniger Klicks bis zur Anfrage. |
| 07 NAABTEC | Performance und Technik | Schnell geladen, auch mit schlechtem Netz. |
| 08 Praxis am Weiher | Barrierefreiheit und Terminbuchung | Alle können Sie erreichen. |
| 09 Gut Weidenstein | Conversion-Struktur | Aus Besuchern werden Anfragen. |
| 10 NP Labor | Sauberer Code, keine Baukasten-Abhängigkeit | Ihre Website gehört Ihnen und wird gut gefunden. |

### Aufbau der Werkstattnotiz

1. Kopf in Mono: „WELT 04 · STUDIE · KANZLEI“
2. Aufgabe in einem Satz: was der Betrieb braucht
3. Idee in einem Satz: die Gestaltungsentscheidung
4. Leistung im Einsatz als kleines Etikett
5. Link zur Branchenseite, z. B. „Websites für Kanzleien“

Höchstens 45 Wörter. Studien bekommen nie ein „Ergebnis“ mit Zahlen — es gab keinen echten Kunden. Statt „Ergebnis“ steht „Was die Website leisten soll“.

### Copy-Deck der Kernmomente

| Stelle | Text |
| --- | --- |
| Hero | Siehe Abschnitt D |
| Werkplan | „Zehn Betriebe. Zehn Websites. Keine sieht aus wie die andere.“ · Mono: „Alle zehn sind Studien: erfundene Unternehmen, echte Gestaltung.“ |
| Zwischenspiel I, Statements | „Kein Baukasten.“ / „Keine Vorlage.“ / „Kein Zufall.“ |
| Zwischenspiel I, Text | „Eine Website von der Stange sieht aus wie hundert andere. Ihre Kunden merken das, meist ohne es benennen zu können.“ |
| Zwischenspiel I, Nutzen | „Vertrauen auf den ersten Blick: Wer Sie online findet, entscheidet in Sekunden, ob er anruft.“ · „Anfragen statt Absprünge: Jede Seite führt zu einem nächsten Schritt.“ · „Gefunden werden, wo Sie arbeiten: saubere Technik und klare Inhalte für Google und Ihre Region.“ |
| Zwischenspiel II, Titel | „So arbeiten wir zusammen.“ |
| Zwischenspiel II, Schritte | 01 Kennenlernen: „Wir sprechen über Ihren Betrieb, Ihre Kunden und Ihre Ziele. Kostenlos und unverbindlich.“ · 02 Konzeption: „Ich entwickle Struktur, Inhalte und Nutzerführung.“ · 03 Design: „Ihre Website bekommt eine eigene Gestaltung, passend zu Ihrem Betrieb.“ · 04 Entwicklung: „Ich setze sie als schnelle Website für jedes Gerät um.“ · 05 Launch: „Veröffentlichung, technische Einrichtung, letzte Optimierungen.“ · 06 Betreuung: „Nach dem Launch bin ich für einen vereinbarten Zeitraum für Sie da.“ |
| Zwischenspiel II, Abschluss | „Von Schritt 01 bis 06 ein Ansprechpartner: ich.“ |
| Zwischenspiel III | „Ich bin Niklas Prüfling.“ · „NP Webdesign ist mein Studio in Schwandorf. Bevor ich Websites gebaut habe, war ich Mechatroniker und im IT-Systembetrieb tätig. Geblieben ist die Haltung: erst verstehen, wie etwas funktionieren muss — dann bauen.“ · „Sie sprechen von der ersten Skizze bis nach dem Launch mit mir. Nicht mit einem Projektmanager.“ |
| Welt 10 | „Alles, was Sie gesehen haben, ist aus diesem Material gebaut.“ · „Kein Baukasten. Keine Vorlage. Nur HTML, CSS und Sorgfalt.“ |
| Abspann (Vorlage) | „Studie · \[Marke\] (fiktiv) · Gestaltung und Code: NP Webdesign“ |
| Finale und Formular | Siehe Abschnitt L |

### Branchenseiten

Jede Kundenwelt bekommt eine eigene, indexierbare Seite unter /branchenloesungen. Die drei vorhandenen Adressen aus dem Audit bleiben bestehen.

| Welt | Adresse |
| --- | --- |
| 01 | /branchenloesungen/baeckerei |
| 02 | /branchenloesungen/friseur-barber (vorhanden) |
| 03 | /branchenloesungen/handwerker (vorhanden) |
| 04 | /branchenloesungen/kanzlei |
| 05 | /branchenloesungen/kfz-werkstatt |
| 06 | /branchenloesungen/beratung-coaching (vorhanden) |
| 07 | /branchenloesungen/industrie |
| 08 | /branchenloesungen/physiotherapie |
| 09 | /branchenloesungen/gastronomie-hotel |

Aufbau jeder Seite: was eine Website in dieser Branche leisten muss, die Studie ausführlich (Ausgangslage, Ziel, Gestaltungsidee, Umsetzung, was die Website leisten soll), passende Leistungen, drei Branchen-FAQ, Anfrage.

### Was von Niklas noch fehlt

- [ ] Echtes, aktuelles Porträtfoto
- [ ] Logo als sauberes SVG
- [ ] Freigabe des Werdegang-Textes in Zwischenspiel III
- [ ] Antwortzeit-Zusage, die neben dem Vollzeitjob verlässlich zu halten ist
- [ ] Pakete und Preise für /leistungen (laut Audit kanonisch: 899 €, 1.799 €, ab 2.999 €) — prüfen, ob sie zum neuen Auftritt passen (siehe Risiken)
- [ ] Telefonnummer für Rahmen, Kontakt und Impressum, ja oder nein
- [ ] Impressumsdaten: Anschrift, USt-IdNr. oder Wirtschafts-Identifikationsnummer (keine Steuernummer)
- [ ] Deutschen Hoster auswählen und Auftragsverarbeitungsvertrag abschließen (Q2)
- [ ] Bildmaterial je Welt: Fotos mit Nutzungsrecht oder Fotoshooting
- [ ] Markenprüfung der Studiennamen
- [ ] Rechtliche Prüfung von Impressum, Datenschutzerklärung und Formular vor Launch
- [ ] Erste echte Projekte für /projekte

## L. CTA / Finale

**Empfehlung: „Zehn Welten. Die elfte gehört Ihnen.“** Das Finale schließt den Bogen zum Opening: Die Kamera fährt wieder auf den Werkplan zurück, alle zehn Rahmen sind gefüllt, nur das Zentrum ist leer. Der Besucher tritt in diesen leeren Rahmen und sieht beim Ausfüllen des Formulars den Namen seines Unternehmens als große Headline darin entstehen.

### Ablauf des Finales

1. **Zusammensetzen (Ende Welt 10):** Die rohen Elemente bekommen NP-Stil. Blaue Links werden orange, Times wird Archivo, die Blöcke rasten in ein Raster ein.
2. **Rückzoom (gepinnt):** Das Raster ist der Werkplan. Die Kamera fährt von Zelle 10 zurück, bis alle zehn Welten zu sehen sind. Im Zentrum steht wieder das NP-Logo.
3. **Das Logo rückt beiseite:** Es hebt sich aus dem Zentrum und setzt sich als Signatur über den Werkplan. Zurück bleibt eine leere Zelle mit blinkendem Textcursor und dem Label „Welt 11 · Ihr Unternehmen“. Der Cursor blinkt nur, solange die Szene im Bild ist.
4. **Einladung:** Headline „Zehn Welten. Die elfte gehört Ihnen.“, darunter der Button „Projekt anfragen“ und der Textlink „Lieber anrufen“ mit Nummer.
5. **Sprung in Welt 11:** Weiterscrollen oder Klick lässt die Zentrumszelle auf Viewport-Größe wachsen — das Spiegelbild des Sprungs in Welt 01. Darin liegt die Kontaktszene.

### Welt 11: die Kontaktszene

| Bereich | Desktop | Mobile |
| --- | --- | --- |
| Formular | linke Hälfte | volle Breite |
| Live-Vorschau | rechte Hälfte: ein leerer Website-Rahmen mit Konstruktionslinien, Raster und Schnittmarken. Was im Feld „Unternehmen“ steht, erscheint darin als Headline, live auf die Rahmenbreite gesetzt (Satz nach Maß). Leer zeigt er „Ihr Unternehmen“ mit Cursor. Darunter in Mono: „Ihr Entwurf beginnt mit einem Gespräch.“ | kompakter Streifen über dem Formular |
| Faktenblock | unter der Vorschau: Leistungen in einer Zeile, „Pakete und Preise“ (Link zu /leistungen), Ablauf in einem Satz, Antwortzeit, Telefon, E-Mail, Standort Schwandorf | unter dem Formular |

Die Vorschau ist bewusst neutral. Sie zeigt keine der zehn Welten als Stil zur Auswahl — das wäre genau die Vorlagenlogik, gegen die die Seite argumentiert. Was im Formular steht, bleibt bis zum Absenden im Browser: keine Zwischenspeicherung, kein Mitschneiden einzelner Eingaben.

### Formular

| Feld | Pflicht | Hinweis |
| --- | --- | --- |
| Ihr Name | ja | Autovervollständigung Name |
| Unternehmen | nein | Speist die Live-Vorschau; Eingabe wird nur als Text eingesetzt, nie als HTML |
| E-Mail | ja | Autovervollständigung E-Mail |
| Telefon | nein | Für Rückruf |
| Worum geht es? | nein | Drei Auswahlchips: Neue Website · Relaunch · Noch unsicher |
| Ihr Vorhaben in ein paar Sätzen | ja | Mehrzeilig, sichtbares Label statt Platzhaltertext |

- Button „Anfrage senden“. Darunter: Hinweis mit Link zur Datenschutzerklärung, keine Pflicht-Checkbox (laut Audit; vor Launch fachkundig bestätigen lassen).
- Unsichtbares Honeypot-Feld gegen Spam, kein Drittanbieter-Captcha.
- Prüfung beim Verlassen eines Feldes, Fehler als Text mit Symbol.
- Daneben immer sichtbar: E-Mail-Adresse als Link und Telefon — für alle, die kein Formular mögen.

**Nach dem Absenden:** Die Live-Vorschau bekommt das NP-Siegel „Anfrage erhalten“ (Stempel-Bewegung, 180 ms). Text: „Danke, \[Vorname\]. Ich melde mich innerhalb von \[Antwortzeit\]. Welt 11 ist angelegt.“ Dazu ein Link zurück zum Werkplan. Keine Weiterleitung auf eine leere Danke-Seite.

### Claim-Varianten

| Variante | Claim | Mechanik | Urteil |
| --- | --- | --- | --- |
| A · Welt 11 | „Zehn Welten. Die elfte gehört Ihnen.“ | Werkplan mit leerem Zentrum, Live-Vorschau | **Empfehlung.** Schließt den Bogen der ganzen Seite und wird persönlich, sobald jemand tippt. |
| B · Der orange Faden | „Alle Fäden laufen hier zusammen. Ziehen wir den nächsten.“ | Der orange Faden aus allen Übergängen sammelt sich und zeichnet das Logo | Elegant, aber abstrakter. Gute Alternative, wenn Welt 11 zu verspielt wirkt. |
| C · Rohbau | „Jede Website beginnt als Rohbau. Bauen wir Ihre.“ | Direkt aus Welt 10, ohne Rückzoom | Kürzer und handwerklich. Passt, falls die Seite auf sieben Welten gekürzt wird. |
| D · Maß | „Ihre Website. Nach Ihrem Maß.“ | Bemaßungslinien messen den leeren Rahmen aus | Klar, aber nah an der Floskel. Reserve. |
| E · Englisch | „Let’s build something different.“ | — | Nicht verwenden: schafft Distanz zur regionalen Zielgruppe. |

**Primärer CTA bleibt überall gleich beschriftet:** „Projekt anfragen“. Die Geschichte erzählt die Headline, nicht der Button. Sekundäre CTAs: „Zehn Welten ansehen“ (Hero), „Websites für \[Branche\]“ (Werkstattnotizen), „Lieber anrufen“ (Finale).

## M. Mobile Experience

**Mobile erzählt dieselbe Geschichte in eigener Regie: kürzere Szenen, senkrechte statt seitlicher Bewegung, Bedienung mit dem Daumen.** Reihenfolge, Staffelstäbe und Inhalte sind identisch — es gibt nur ein DOM. Was sich ändert, sind Bildausschnitte, Szenenlängen und die Art der Bewegung.

### Grundregeln

- Gepinnte Szenen sind 30–40 % kürzer (Längen in E und F).
- Gepinnte Szenen nutzen die kleinste Viewport-Höhe (100svh), damit die ein- und ausfahrende Adressleiste nichts verschiebt. Höhenänderungen durch die Adressleiste lösen kein Neuberechnen aus.
- Keine Unschärfe, Parallaxe höchstens 8 %, Pfad-Morphs höchstens 80 Punkte, höchstens 30 gleichzeitig animierte Elemente.
- Satz nach Maß bleibt — er ist die Signatur. Mega-Zeilen tragen höchstens zwei Wörter.
- Natives Scrollen, kein Smooth-Scroll-Skript.

### Desktop und Mobile im Vergleich

| Element | Desktop | Mobile |
| --- | --- | --- |
| Opening | Rückzoom auf den 4 × 3-Werkplan, 150vh | Rückzoom auf den 2 × 6-Werkplan, 100vh; 12 statt 40 Konstruktionslinien, 4 statt 8 Fragmente |
| Werkplan | Hover, Cursor-Koordinate | Namen immer sichtbar, Tippen öffnet die Welt |
| Übergänge | 60–150vh | 40–90vh, gleiche Objekte, einfachere Masken |
| 03 Steiner Bau | Hausquerschnitt in 6 Schichten | 4 Schichten |
| 04 Haas & Sternfeld | Drei Spalten, Fußnoten als Marginalie | Eine Spalte, Fußnoten als aufklappbare Hinweise |
| 05 Chromwerk | Gepinnte Querfahrt | Senkrechte Bildfolge plus Wisch-Galerie innerhalb ihres Rahmens; Vorher-Nachher mit dem Daumen |
| 07 NAABTEC | Bauteil per Ziehen drehen, leuchtende Laserlinie | Drehen per Wischen, Laserlinie ohne Leuchten |
| 08 Praxis am Weiher | Buchung in der Seitenleiste | Buchung Schritt für Schritt in einem Panel von unten |
| 09 Gut Weidenstein | Überblendungen über 120vh | 80vh, Bilder im Hochformat |
| 10 NP Labor | Breitenachse folgt der Scrollgeschwindigkeit | Breitenachse folgt der Scrollposition (ruhiger, stabiler) |
| Finale | Live-Vorschau neben dem Formular | Vorschau als Streifen über dem Formular |
| Rahmen | Lineal rechts, Zähler unten links | 2-px-Linie oben, Zähler in der Kopfzeile, Anfrage-Leiste unten |

### Die Welten auf dem Smartphone

Jede Welt bekommt eine eigene Hochformat-Komposition mit eigenen Bildausschnitten, keine verkleinerte Desktop-Ansicht. Pro Welt höchstens vier Bildschirmhöhen Inhalt. Werkstattnotizen stehen als ganze Karte im Fluss, nicht als schwebende Anmerkung.

### Touch und Bedienung

- Berührungsflächen mindestens 44 × 44 px, in Welt 08 48 px.
- Keine Information hängt an Hover. Maßschicht und Werkplan-Labels sind immer sichtbar.
- Wisch-Galerien scrollen nur innerhalb ihres Containers. Die Seite selbst scrollt nie seitlich — jede Sektion beschneidet ihren Inhalt, getestet ab 320 px Breite.
- Formular mit passenden Tastaturen (E-Mail, Telefon) und Autovervollständigung; der Absende-Button wird nie von der Bildschirmtastatur verdeckt.
- Primäre Aktionen liegen unten in der Daumenzone.

### Test vor dem Launch

Echte Geräte, nicht nur Browser-Simulation: ein kleines iPhone (375 px, Safari), ein aktuelles iPhone, ein drei Jahre altes Mittelklasse-Android (Chrome), ein Tablet hochkant und quer. Jede Welt einmal mit langsamem Netz (Drosselung auf 4G) und einmal mit „Bewegung reduzieren“.

## N. Technical Architecture für Sonnet

**Statisch, schlank, modular: Astro erzeugt reines HTML, GSAP steuert jede Szene, jede Welt ist ein austauschbares Modul.** Kein UI-Framework, kein WebGL, kein Lottie, kein CMS. Die Seite muss ohne JavaScript vollständig lesbar und das Formular absendbar sein.

### Stack

| Baustein | Entscheidung | Begründung |
| --- | --- | --- |
| Generator | Astro mit statischer Ausgabe, ohne React oder Vue | Komponenten mit eigenem CSS pro Welt, eingebaute Bildpipeline (AVIF, WebP, mehrere Breiten), Ausgabe ist reines HTML. Das Audit nannte 11ty; für zehn Weltmodule mit eigenen Styles und Bildern ist Astro die bessere Wahl. |
| Sprache | JavaScript als ES-Module mit JSDoc-Typen | Bleibt beim HTML/CSS/JS-Ansatz aus der Projektbeschreibung, gibt Sonnet trotzdem klare Schnittstellen |
| Animation | GSAP 3.15 mit ScrollTrigger, Flip, SplitText, DrawSVG, MorphSVG | Seit der Übernahme durch Webflow sind alle Plugins kostenlos, auch kommerziell. Der Kern wiegt 27 KB gzip (laut bundlephobia). Plugins nur dort laden, wo sie gebraucht werden. |
| Smooth Scroll | Lenis, nur Desktop mit Maus oder Trackpad, über den GSAP-Ticker synchronisiert | Ruhigere Scrubs am Desktop; Touch bleibt nativ |
| SVG | Logo, Linien, Stempel, Bemaßungen, Werkplan-Rahmen | Scharf in jeder Größe, animierbar, leicht |
| WebGL | Nein | Jede Szene ist zweidimensional. WebGL kostet Ladezeit, Akku und Barrierefreiheit, ohne hier etwas zu zeigen, was SVG nicht kann. |
| Lottie | Nein | SVG und GSAP decken alle Formen ab; Lottie bräuchte einen zusätzlichen Player und einen After-Effects-Workflow |
| Video | Zum Launch keins | Falls später (etwa Chromwerk): unter 1,5 MB, nur Desktop, mit Standbild, Laden erst bei Sichtbarkeit |
| Hosting | Deutscher Hoster mit Rechenzentrum in Deutschland und Auftragsverarbeitungsvertrag | Keine Datenübermittlung in ein Drittland, ein Vertragspartner für Seite, Formular und Mail (Begründung in Q2). Auslieferung per Pipeline von GitHub aus. |
| Formular | Kleiner Formular-Endpunkt beim selben Hoster, Versand über dessen Mailserver | Kein Drittdienst, keine Datenbank, kein Formularinhalt in Logs; Zugangsdaten nur serverseitig |
| Analyse | Matomo, selbst gehostet beim selben Hoster, nur nach Einwilligung | Misst, wie weit Besucher in die Reise kommen — Grundlage für die Entscheidung über sieben oder zehn Welten. Daten bleiben auf dem eigenen Server; Einwilligung über den eigenen Banner (Q2) |
| Schriften | Selbst gehostet, WOFF2, beim Build auf benutzte Zeichen reduziert | Kein Fremdserver, kleine Dateien |

### Ebenen der Seite

&#91;embedded content: Ebenen-Architektur · 5 Ebenen, Stapelreihenfolge von oben\]

Nur Inhalt, Rahmen und Overlay sind für Hilfstechnik sichtbar; fällt das JavaScript aus, bleibt die Inhaltsebene vollständig.

### Weltmodul-Vertrag

Jede Welt und jeder Übergang ist ein eigenes Modul. Sonnet baut sie nach demselben Vertrag, damit Welten hinzugefügt, entfernt oder umsortiert werden können, ohne den Rest anzufassen.

| Ein Weltmodul liefert | Inhalt |
| --- | --- |
| Kennung | Nummer, Anker, Name, Branche, Kennzeichen „Studie“ |
| Palette | Grund, Text, Akzent, Akzent 2, Helligkeit (bestimmt die NP-Farbe) |
| Schriften | Bis zu zwei Dateien, geladen ab 1,5 Bildschirmhöhen Abstand |
| Bilder | Desktop- und Mobile-Ausschnitte mit Breite und Höhe |
| Markup | Semantisches HTML: eine Sektion mit Weltnamen als H2, Werkstattnotiz, Abspann |
| Bewegung | Die Szenen im Inneren der Welt, je eine Variante für Desktop, Mobile, ruhig |
| Aufräumen | Beendet alle eigenen Szenen und Listener, wenn die Welt entladen wird |

| Ein Übergangsmodul liefert | Inhalt |
| --- | --- |
| Von und nach | Die beiden Welten, zwischen denen es liegt |
| Staffelstab | Das SVG-Objekt auf der Bühne |
| Szene | Die gepinnte, scrollgesteuerte Verwandlung |
| Ruhige Variante | Kreuzblende in 300 ms ohne Pin |
| Länge | Kommt aus der zentralen Konfiguration, nie im Modul selbst |

### Scroll-Orchestrierung

- **Eine Szene pro Abschnitt, keine Gesamt-Timeline.** Jede Welt und jeder Übergang hat eigene ScrollTrigger. Das erlaubt Nachladen, Debuggen und Kürzen einzelner Teile.
- **Drei Modi über Media Queries:** Desktop voll (ab 1024 px, feiner Zeiger, keine reduzierte Bewegung), Mobile (unter 1024 px oder Touch), Ruhig (reduzierte Bewegung oder Schalter). Ruhig erzeugt keine Pins.
- **Eine Quelle für Längen und Farben:** Eine zentrale Reise-Konfiguration enthält Reihenfolge, Pin-Längen (Desktop und Mobile) und Paletten. Die Tabelle in Abschnitt E ist ihr Inhalt.
- **Platzhalter mit fester Höhe:** Welten laden ihre Module per dynamischem Import, sobald sie 1,5 Bildschirmhöhen entfernt sind. Bis dahin hält ein Platzhalter die exakte Höhe aus der Konfiguration — nichts springt.
- **Neuberechnung** einmal nach dem Laden der Schriften und bei Größenänderung, nie während des Scrollens. Bilder tragen Breite und Höhe, damit sich nichts verschiebt.
- **Atmosphäre-Regler:** Ein globales Modul blendet Hintergrundfarbe und NP-Helligkeit über CSS-Variablen; jeder Übergang meldet nur Start- und Zielpalette.
- **Zähler und Anker** aktualisieren sich beim Betreten jeder Welt, vorwärts wie rückwärts.
- **Nur Transform, Deckkraft und Masken animieren.** Kein Animieren von Breite, Höhe, Abständen oder Schatten.

### Dateistruktur

- **src/pages:** Startseite, leistungen, ueber-mich, projekte, branchenloesungen (eine Vorlage für alle Branchen), impressum, datenschutz, 404
- **src/config:** Reise-Konfiguration (Reihenfolge, Längen, Paletten); Seiten-Daten (Kontakt, Preise — die einzige Stelle für Preise)
- **src/components:** Rahmen, Opening, Werkplan, Zwischenspiel, Finale, Kontaktformular, FAQ, Footer
- **src/worlds:** ein Ordner pro Welt (01-korn-und-kruste bis 10-np-labor) mit Markup, eigenem CSS, Bewegungsmodul, Bildern, Schriften
- **src/transitions:** ein Modul pro Übergang (t00-werkplan bis t13-rohbau)
- **src/motion:** Grundgerüst (GSAP, Media-Query-Modi, Lenis), Atmosphäre-Regler, Satz nach Maß, Zähler und Lineal
- **src/styles:** Tokens und Grundstile
- **functions:** der Formular-Endpunkt, der beim Hoster läuft
- **public:** Favicon, robots.txt

Die Bau-Reihenfolge mit Abnahmekriterien steht im Master Blueprint (Abschnitt T).

## O. Performance Strategy

**Der erste Bildschirm lädt höchstens 350 KB; alles Weitere kommt Welt für Welt nach, kurz bevor es gebraucht wird.** Die Grenzwerte unten sind Zielwerte dieses Konzepts. Sie werden vor jedem Deploy geprüft und gelten als Designvorgabe, nicht als Nachbesserung.

### Performance-Budget

| Messgröße | Ziel | Hinweis |
| --- | --- | --- |
| LCP, Mobil | höchstens 2,0 s | Google bewertet bis 2,5 s als gut; die H1 ist das LCP-Element (siehe D) |
| INP | höchstens 150 ms | Gut bis 200 ms |
| CLS | höchstens 0,05 | Gut bis 0,1; Platzhalter mit fester Höhe sichern das |
| Lighthouse Performance, Mobil | mindestens 90 | Startseite und zwei Branchenseiten |
| Blockierzeit beim Laden | höchstens 150 ms | Kein großes Skript vor dem ersten Paint |
| Erster Aufruf bis Hero fertig | höchstens 350 KB | HTML 30 KB, kritisches CSS inline 14 KB, Archivo 90 KB, Plex Mono 40 KB, Kern-JS 70 KB gzip (GSAP-Kern, ScrollTrigger, Lenis, eigener Code) |
| Werkplan-Vorschaubilder | 10 × höchstens 25 KB | Erst nach dem ersten Paint |
| Pro Welt nachgeladen | höchstens 350 KB Desktop, 220 KB Mobile | Bilder, Schriften bis 30 KB, Modul-JS bis 15 KB |
| Gesamte Reise | höchstens 3,5 MB Desktop, 2,5 MB Mobile | Zum Vergleich: Das Audit fand 26 MB Video auf der aktuellen Startseite |

### Maximale Animations-Komplexität

- Eine gepinnte Szene gleichzeitig, höchstens zwei laufende scrollgesteuerte Timelines (Szene plus Atmosphäre).
- Höchstens 60 gleichzeitig animierte Elemente am Desktop, 30 auf Mobile.
- Pfad-Morphs bis 200 Punkte; Unschärfe auf höchstens einem Element, nur Desktop.
- Hinweis an den Browser auf kommende Bewegung nur kurz vor und während einer Szene, danach wieder entfernen.
- Zeilen-Masken nur zeilenweise; Wortzerlegung nur bei Zeilen bis 12 Wörter; Zeichenzerlegung nur im Labor.
- Keine eigenen Scroll-Listener. Alles läuft über ScrollTrigger, gemessen wird nur beim Neuberechnen.

### Bildgrößen

| Bildtyp | Breiten | Format | Höchstgröße |
| --- | --- | --- | --- |
| Schlüsselbild einer Welt (Vollbild) | 640, 960, 1440, 1920, 2560 | AVIF, WebP als Rückfall | 180 KB bei 1920 px, 90 KB mobil |
| Inhaltsbild (halbe Breite) | 480, 800, 1200 | AVIF, WebP | 90 KB |
| Werkplan-Vorschau | 320, 480, 640 | AVIF, WebP | 25 KB |
| Bildfolge NAABTEC (12 Ansichten) | 960 Desktop, 640 Mobile | AVIF | 30 KB je Bild, geladen erst bei Interaktion |
| Porträt Niklas | 600, 1000 | AVIF, WebP | 80 KB |
| Vorschaubild für Social Media | 1200 × 630 | JPG | 150 KB |

Jedes Bild trägt Breite und Höhe, wird nie größer als doppelt so breit wie dargestellt geliefert und hat auf Mobile einen eigenen Ausschnitt.

### Ladestrategie

| Wann | Was |
| --- | --- |
| Sofort | HTML, kritisches CSS, Logo-SVG, Archivo (vorgeladen), Plex Mono, Kern-JS als Modul |
| Nach dem ersten Paint | Werkplan-Vorschaubilder |
| 1,5 Bildschirmhöhen vor einer Welt | Modul, Schriften und Bilder dieser Welt |
| Bei Bedarf | Seltene Plugins (MorphSVG nur für Übergang 04→05 und 06→II), Bildfolge NAABTEC beim ersten Ziehen, Formularlogik bei Welt 11, Statistik-Skript erst nach Zustimmung im Banner |
| Nie | Inhalte, die nur per JavaScript sichtbar werden |

### Geräteklassen und Fallbacks

| Stufe | Erkennung | Verhalten |
| --- | --- | --- |
| Voll | Desktop-Modus | Alles wie beschrieben |
| Leicht | Mobile-Modus, oder der Laufzeit-Wächter misst eine niedrige Bildrate. Keine Abfrage von Geräte- oder Verbindungsdaten (siehe Q2). | Kein Leuchten und keine Unschärfe, vereinfachte Pfade, keine Fragmente, Bildfolge mit 6 statt 12 Ansichten |
| Ruhig | Bewegung reduzieren oder Schalter „Ruhige Ansicht“ | Keine Pins, Kreuzblenden von 300 ms, Endzustände |
| Ohne JavaScript | — | Statische, vollständige Seite |

**Laufzeit-Wächter:** Während der ersten zwei Übergänge misst die Seite die Bildrate. Bleibt sie dauerhaft unter etwa 45 Bildern pro Sekunde, schaltet sie für den Rest der Reise auf „Leicht“. Die Schwelle wird auf den Testgeräten justiert.

### GPU-intensive Effekte und ihr Ersatz

| Effekt | Wo | Ersatz in „Leicht“ |
| --- | --- | --- |
| Unschärfe und Leuchten | Scheinwerfer (05→06), Laserlinie (07) | Radialer Verlauf ohne Unschärfe |
| Große Masken | P-Iris, N-Blende, Fenster | Kreuzblende |
| Große Skalierung | Werkplan, Weiher zu See | Bleibt, aber nur eine Ebene und in Endgröße gebaut |
| Mischmodi, animierte Schatten | — | Werden nirgends eingesetzt |

## P. Accessibility

**Ziel ist WCAG 2.2 Stufe AA — und dass ein Screenreader die Reise als vollständigen, linearen Text erlebt.** Die Inszenierung liegt auf eigenen, versteckten Ebenen. Alles, was der Besucher wissen muss, steht als echter Text in sinnvoller Reihenfolge im HTML.

| Bereich | Anforderung | Umsetzung |
| --- | --- | --- |
| Struktur | Eine H1, klare Landmarken, logische Überschriften | Kopf, Navigation, Hauptinhalt, Fuß. Jede Welt und jedes Zwischenspiel ist eine Sektion mit eigener H2. Der Werkplan ist eine Liste von zehn Links. |
| Lineares Lesen | Die Reise ohne Bilder verstehen | Pro Welt: Name, Branche, „Studie“, Werkstattnotiz, Beschreibung der Demo. Bühne, Fragmente, Lineal und Schnittmarken sind für Hilfstechnik verborgen. |
| Bewegung | Reduzierte Bewegung respektieren, Bewegung abschaltbar | Systemeinstellung schaltet „Ruhig“ ein; Schalter „Ruhige Ansicht“ im Menü, erst nach Klick im Browser gemerkt (siehe Q2) |
| Automatische Bewegung | Nichts bewegt sich länger als 5 s von selbst (2.2.2) | Opening 1,6 s; Branchenband nur scrollgesteuert; der Cursor im Finale blinkt höchstens 5 s, dann steht er |
| Blitze | Nichts blinkt öfter als dreimal pro Sekunde (2.3.1) | Farbwechsel der Atmosphäre sind weiche Übergänge, auch bei schnellem Scrollen; kein Stroboskop im Labor |
| Kontrast | Text 4,5:1, große Schrift und Bedienelemente 3:1 | Alle Werte in Abschnitt G nachgerechnet |
| Fokus | Sichtbar und nie verdeckt (2.4.7, 2.4.11) | Fokusring nach G; Scroll-Abstand in Höhe des Rahmens; Menü hält den Fokus, Escape schließt |
| Zielgröße | Mindestens 24 × 24 px (2.5.8) | Projektstandard 44 × 44 px, Welt 08 48 px |
| Ziehen | Jede Ziehbewegung hat eine Alternative (2.5.7) | Vorher-Nachher-Schieber und Bauteil-Drehung auch per Pfeiltasten und Schaltflächen |
| Farbe allein | Keine Information nur über Farbe (1.4.1) | Fehler, aktive Welt und Status immer mit Text oder Symbol |
| Text | Echter Text, vergrößerbar, umfließend (1.4.4, 1.4.10, 1.4.12) | Keine Schrift in Bildern; Zoom 200 % und 320 px Breite ohne Verlust; veränderte Zeilen- und Buchstabenabstände brechen nichts |
| Sprache | Seitensprache und Fremdwörter ausgezeichnet | Deutsch als Seitensprache, englische Begriffe gekennzeichnet |
| Formular | Labels, Autovervollständigung, Fehlerhinweise (1.3.5, 3.3.1, 3.3.3) | Sichtbare Labels, passende Autovervollständigung, Fehler als Text mit Lösungsvorschlag, Erfolgsmeldung wird angesagt |
| Demo-Elemente | Keine toten Bedienelemente | Beschriftet als „Demo“, lokal bedienbar, ohne Versand; wo keine Bedienung sinnvoll ist, inaktiv und für Hilfstechnik verborgen |
| Bilder | Aussagekräftige Alternativtexte | Inhaltsbilder beschrieben, dekorative leer |
| Lebende Elemente | Keine ständigen Ansagen | Uhr und Weltzähler werden nicht vorgelesen; die H2 der Welt gibt den Kontext |

**Prüfung vor Launch:** automatische Prüfung (axe, Lighthouse), komplette Tastatur-Runde, Screenreader-Runde mit VoiceOver (iOS, macOS) und NVDA (Windows), ein Durchgang mit „Bewegung reduzieren“, einer mit 200 % Zoom. Rechtlich ist NP laut Audit voraussichtlich nicht BFSG-pflichtig; AA ist trotzdem der Standard, weil Welt 08 genau damit verkauft.

## Q. SEO

**Die Startseite ist das Schaufenster — gefunden wird NP über die Branchenseiten, das lokale Profil und saubere Technik.** Eine einzelne lange Scroll-Seite rankt allein schwach, weil sie nur eine Adresse und ein Hauptthema hat. Deshalb bekommt jede Kundenwelt eine eigene, indexierbare Seite, die genau das Thema der Branche besetzt.

### Seiten und Suchabsicht

| Seite | Beispiel-Suchanfragen | Title-Muster |
| --- | --- | --- |
| Startseite | Webdesign Schwandorf, Website erstellen lassen Oberpfalz | „Webdesign aus Schwandorf – Websites für Betriebe |
| Branchenseiten (9) | Website für Bäckerei, Webdesign Handwerker Oberpfalz, Website Physiotherapie | „Website für Bäckereien – Studie und Leistungen |
| Leistungen und Preise | Website erstellen lassen Kosten | „Leistungen und Preise |
| Über mich | Niklas Prüfling Webdesign | „Niklas Prüfling – der Mensch hinter NP Webdesign“ |
| Projekte | echte Fallstudien, sobald vorhanden | „\[Kunde\] – Fallstudie |

Titel höchstens 60 Zeichen, Beschreibung höchstens 155 Zeichen, jede Seite einzigartig.

### Technische Grundlagen

- Der gesamte Inhalt steht im ausgelieferten HTML, nichts wird erst im Browser gerendert. Auch die Texte der Reise sind für Suchmaschinen lesbar.
- Eine H1 pro Seite; auf der Startseite eine H2 pro Welt.
- Kanonische Adressen, sitemap.xml, robots.txt, eigene 404-Seite (aus dem Audit).
- Interne Verlinkung: Jede Werkstattnotiz verlinkt ihre Branchenseite; jede Branchenseite verlinkt zurück in ihre Welt und auf zwei verwandte Branchen.
- Ladezeit-Kennzahlen nach Budget O — sie zählen für das Ranking mit.
- Bilder mit beschreibenden Dateinamen und Alternativtexten.
- Je Seite ein eigenes Vorschaubild für Social Media (Schlüsselbild der Welt im NP-Rahmen), beim Build erzeugt.
- Kein doppelter Inhalt: Die Startseite fasst jede Welt in wenigen Sätzen; ausführlich wird es nur auf der Branchenseite.

### Strukturierte Daten

| Seite | Typ | Inhalt |
| --- | --- | --- |
| Startseite | ProfessionalService (lokales Unternehmen) und WebSite | Name, Adresse Schwandorf, Einzugsgebiet Oberpfalz und Bayern, Gründer Niklas Prüfling, Kontakt, Preisspanne (das bestehende Schema aus dem Audit erweitern) |
| Branchenseiten | Service und Brotkrumen-Pfad | Leistungsart, z. B. „Webdesign für Bäckereien“, Anbieter NP Webdesign |
| Über mich | Person | Niklas Prüfling als Gründer |
| FAQ | FAQPage, optional | Google hat FAQ-Auszüge 2023 auf wenige Seitentypen beschränkt, vor allem Behörden und Gesundheit (Wissensstand, vor Umsetzung prüfen). Das Markup schadet nicht, ein Sonderauftritt ist nicht zu erwarten |

Keine Bewertungs-Auszeichnung ohne echte Bewertungen. Studien werden nie als Kundenprojekt ausgezeichnet.

### Lokal

- **Google-Unternehmensprofil** anlegen und pflegen: Kategorie Webdesigner, Standort Schwandorf, Einzugsgebiet, echte Fotos, Link zur Website. Das ist der stärkste Einzelhebel für regionale Suchen — und er liegt außerhalb der Website.
- Name, Adresse und Telefon überall identisch: Website, Impressum, Unternehmensprofil, Verzeichnisse.
- Nach den ersten Projekten aktiv um echte Bewertungen bitten.
- Regionale Bezüge im Text, wo sie stimmen (Schwandorf, Oberpfalz, Nachbarstädte). Keine austauschbaren Städte-Seiten, die nur den Ortsnamen wechseln.

### Inhalte

- Branchenseiten mit echtem Nutzen: was eine Website in dieser Branche leisten muss, eine kurze Checkliste, drei Branchen-FAQ.
- Echte Fallstudien unter /projekte, sobald es Projekte gibt — dort darf es ein echtes Ergebnis geben.
- Kein Blog zum Start; die Entscheidung aus dem Audit bleibt richtig.

## Q2. Datenschutz und Rechtssicherheit

**Datenschutz ist hier keine Textseite am Ende, sondern eine Bauentscheidung: Alles, was die Seite für ihren Betrieb braucht, kommt ohne Einwilligung und ohne Drittanbieter aus.** Die einzige optionale Verarbeitung — eine Statistik auf dem eigenen Server — startet erst nach Zustimmung im Banner. Server-Logs, Kontaktformular und E-Mail laufen bei einem Anbieter in Deutschland und sind lückenlos dokumentiert. Das ist keine Rechtsberatung: Vor dem Launch prüft eine fachkundige Stelle Impressum, Datenschutzerklärung, Banner und Formular.

### Datenfluss-Inventar

| Vorgang | Daten | Rechtsgrundlage | Empfänger | Speicherdauer | Einwilligung nötig? |
| --- | --- | --- | --- | --- | --- |
| Seitenaufruf | IP-Adresse, Zeitpunkt, aufgerufene Seite, Browserkennung (Server-Logs) | Art. 6 Abs. 1 lit. f DSGVO: Betrieb und Sicherheit | Hoster als Auftragsverarbeiter | So kurz wie möglich, z. B. 7 Tage, beim Hoster einstellen | Nein |
| Kontaktformular | Name, E-Mail, Nachricht; freiwillig Unternehmen, Telefon, Anliegen | Art. 6 Abs. 1 lit. b DSGVO: Anfrage, vorvertraglich | Hoster (Versand), Postfach von NP | Bis die Anfrage erledigt ist; wird ein Auftrag daraus, die gesetzlichen Fristen | Nein |
| E-Mail oder Anruf direkt | Was der Absender mitteilt | Art. 6 Abs. 1 lit. b DSGVO | E-Mail- bzw. Telefonanbieter | wie Formular | Nein |
| Schriften, Skripte, Bilder | Keine Übermittlung: alles kommt vom eigenen Server | — | niemand | — | Nein |
| Banner-Entscheidung, Schalter „Ruhige Ansicht“ | Je ein Eintrag im Browser; „Ruhige Ansicht“ erst nach Klick | § 25 Abs. 2 Nr. 2 TDDDG: für den gewünschten Dienst unbedingt erforderlich | niemand, bleibt im Browser | Entscheidung 12 Monate; Ansicht bis zurückgenommen | Nein |
| Statistik (Matomo, eigener Server) | Seitenaufrufe, erreichte Welten, Scrolltiefe, Klicks auf die Anfrage, gekürzte IP-Adresse, Besucherkennung im Cookie | Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG: Einwilligung | eigene Matomo-Installation beim Hoster | Cookies höchstens 6 Monate, Rohdaten 6 Monate | **Ja, über den Banner** |
| Bewegung reduzieren, Bildschirmbreite, Zeigerart | Nur per CSS-Medienabfrage berücksichtigt; nichts wird gespeichert oder gesendet | — | niemand | — | Nein |
| Werbung, Profilbildung, Weitergabe an Dritte | Findet nicht statt | — | — | — | — |

### Acht Bauentscheidungen für den Datenschutz

1. **Hosting in Deutschland statt Cloudflare oder Netlify.** Beide US-Anbieter sind über das EU-US Data Privacy Framework nutzbar. Das EU-Gericht hat es am 03.09.2025 bestätigt, das Rechtsmittel beim EuGH ist aber anhängig. Ein deutscher Hoster mit Rechenzentrum in Deutschland und Auftragsverarbeitungsvertrag macht diese Frage überflüssig: ein Vertragspartner für Seite, Formular und Mail, keine Datenübermittlung in ein Drittland.
2. **Null Anfragen an fremde Server.** GSAP, Lenis, Schriften, Bilder und Symbole werden mitgebaut und vom eigenen Server ausgeliefert. Kein CDN, keine Google Fonts.
3. **Keine Einbettungen.** Keine Karte, kein Video-Player, kein Social-Feed, kein Buchungs-Widget, kein Chat, kein Captcha. Wer eine Anfahrt braucht, bekommt einen normalen Link zu einem Kartendienst, der erst beim Klick öffnet.
4. **Kein Speichern im Browser** außer der Banner-Entscheidung und der Wahl „Ruhige Ansicht“; Statistik-Cookies erst nach Zustimmung. § 25 TDDDG erfasst nicht nur Cookies, sondern auch localStorage und sessionStorage; Speicherungen schon beim bloßen Aufruf, ohne Handlung des Nutzers, fallen nicht unter die Ausnahme. Deshalb merkt sich das Opening nicht mehr, ob es schon gelaufen ist.
5. **Keine Geräteabfragen.** Die Geräteklassen in Abschnitt O lesen weder Prozessorkerne noch Arbeitsspeicher noch Verbindungsdaten aus. Grundlage sind nur Medienabfragen und die gemessene Bildrate. Ob das Auslesen solcher Gerätedaten als Zugriff im Sinne von § 25 TDDDG zählt, ist nicht abschließend geklärt — der Verzicht kostet nichts.
6. **Formulareingaben bleiben im Browser, bis abgeschickt wird.** Die Live-Vorschau in Welt 11 arbeitet nur lokal. Keine Zwischenspeicherung, kein Mitschneiden einzelner Eingaben, keine Datenbank: Die Anfrage wird als E-Mail zugestellt, ihr Inhalt landet in keinem Server-Log.
7. **Demo-Bedienelemente** in den Welten senden und speichern nichts.
8. **Social Media und Google-Profil** sind normale Links, keine eingebetteten Plugins.

### Cookie- und Einwilligungsbanner

**Der Banner ist echt, keine Dekoration: Er steuert genau eine optionale Verarbeitung — eine selbst gehostete Statistik mit Matomo.** Sie zeigt, wie weit Besucher in die Reise kommen, und liefert damit die Daten für die Entscheidung zwischen sieben und zehn Welten (Abschnitt E). Ohne Zustimmung läuft sie nicht, und die Seite funktioniert vollständig ohne sie. Für den reinen Betrieb wäre kein Banner nötig; sinnvoll ist er, weil er etwas steuert, das NP nützt.

Der Banner erscheint automatisch, sobald mindestens eine optionale Kategorie aktiv ist. Wird die Statistik später abgeschaltet, bleibt nur der Link „Datenschutz-Einstellungen“ mit dem Hinweis, dass nichts Optionales läuft — kein Banner, der um eine Zustimmung bittet, die es nicht braucht.

| Kategorie | Was | Gespeichert | Standard | Dauer |
| --- | --- | --- | --- | --- |
| Notwendig | Banner-Entscheidung, Wahl „Ruhige Ansicht“ | Ein Eintrag im Browser (localStorage), nur dort | Immer aktiv, nicht abwählbar (§ 25 Abs. 2 Nr. 2 TDDDG) | Entscheidung 12 Monate |
| Statistik | Matomo auf dem eigenen Server beim Hoster: Seitenaufrufe, erreichte Welten, Scrolltiefe, Klick auf „Projekt anfragen“, Formular abgeschickt (ohne Inhalt) | Matomo-Cookies mit Besucherkennung, IP-Adresse gekürzt | Aus, bis „Akzeptieren“ oder der Schalter aktiv wird | Cookies höchstens 6 Monate, Rohdaten nach 6 Monaten gelöscht |

**Gestaltung im NP-Stil**

- **Desktop:** schmale, volle Leiste am unteren Rand, höchstens 88 px hoch, Kalk-Fläche, 1 px Haarlinie oben, Schnittmarken an den Enden — wie das Schriftfeld eines Plans. Links Kopf in Plex Mono „DATENSCHUTZ · IHRE WAHL“ und zwei Sätze, rechts die Bedienelemente. Die Leiste überdeckt weder die H1 (12vh über dem Rand) noch den Anfrage-Button oben.
- **Mobile:** Panel von unten, volle Breite, höchstens 45 % der Bildschirmhöhe. Es ersetzt die Anfrage-Leiste, bis entschieden ist. Buttons untereinander, gleich breit, 48 px hoch.
- **Buttons:** „Ablehnen“ und „Akzeptieren“ sind gleich groß, gleich geformt, gleich gefärbt (beide Tinte mit Leinen-Schrift) und stehen auf derselben Ebene. Kein Orange: Orange gehört dem Anfrage-Button, und eine farbige Zustimmung wäre genau das Lenken, das Gerichte beanstanden. Daneben der Textlink „Einstellungen“ für die Schalter je Kategorie.
- **Links:** Datenschutzerklärung und Impressum stehen im Banner und bleiben auch im Menü erreichbar.

**Text im Banner:** „Diese Seite funktioniert ohne Tracking. Wenn Sie zustimmen, misst eine Statistik auf meinem eigenen Server, wie weit Besucher durch die Welten scrollen — mit gekürzter IP-Adresse, ohne Werbung, ohne Weitergabe an Dritte. Ihre Wahl können Sie jederzeit unter ‚Datenschutz-Einstellungen‘ ändern.“ Bewusst nicht „anonym“: Mit Besucherkennung ist die Messung pseudonym.

**Verhalten**

1. Erscheint nach dem Opening (ab 1,6 s) oder beim ersten Scrollen, je nachdem, was früher kommt. Bis zur Entscheidung läuft nichts Optionales — die Verzögerung schützt das Opening und den LCP-Wert, ohne rechtlich etwas zu riskieren.
2. Nicht-modal: Die Seite bleibt lesbar und bedienbar, es gibt keine Cookie-Wall.
3. Kein Schließen-X. Wer weiterscrollt, ohne zu entscheiden, hat nicht eingewilligt. Nach dem Werkplan schrumpft der Banner zu einem kleinen Feld „Datenschutz-Einstellungen“ unten links, damit er die Welten nicht dauerhaft verdeckt; beim nächsten Besuch fragt er erneut.
4. „Ablehnen“ speichert die Entscheidung, lädt nichts und fragt 12 Monate nicht erneut.
5. „Akzeptieren“ lädt erst jetzt das Statistik-Skript vom eigenen Server.
6. „Einstellungen“ zeigt die Schalter; Statistik steht auf aus; „Auswahl speichern“ übernimmt.
7. **Widerruf so leicht wie die Zustimmung:** „Datenschutz-Einstellungen“ im Menü und im Footer öffnet denselben Dialog. Ein Widerruf beendet die Messung sofort und löscht die Statistik-Cookies.
8. **Versionierung:** Ändern sich Dienste oder Kategorien, steigt die Version in der Konfiguration, und der Banner fragt neu. Nach 12 Monaten fragt er ebenfalls neu.

**Rechtsanforderungen (Prüfliste)**

- [ ] Ablehnen auf der ersten Ebene, gleichwertig in Größe, Form, Farbe und Position (OLG Köln, 19.01.2024, 6 U 80/23)
- [ ] Eindeutige Beschriftung; keine Zustimmung, die an ein „X“ oder „Schließen“ gekoppelt ist (ebenda)
- [ ] Keine vorausgewählten Schalter
- [ ] Vor der Zustimmung: kein Statistik-Skript, kein Cookie, keine Anfrage an den Statistik-Server
- [ ] Zweck, Verantwortlicher, Speicherdauer und Widerruf im Banner oder in den Einstellungen genannt
- [ ] Widerruf jederzeit über „Datenschutz-Einstellungen“, so einfach wie die Zustimmung
- [ ] Impressum und Datenschutz nie verdeckt, Seite ohne Zustimmung vollständig nutzbar

**Technik**

- **Eigenbau statt Consent-Dienstleister.** Die meisten Fremd-Lösungen laden selbst von fremden Servern und verarbeiten dort IP-Adressen — genau das, was Q2 ausschließt. Der eigene Banner wiegt wenige Kilobyte.
- **Einwilligungs-Register** in der Seiten-Konfiguration: Kategorien, Dienste, Beschreibung, Speicherdauer, Version. Banner, Einstellungen und Datenschutzerklärung lesen aus derselben Quelle.
- **Blockieren vor dem Laden:** Optionale Skripte stehen nicht als aktives Skript im HTML, sondern werden erst nach Zustimmung eingesetzt. Die Content-Security-Policy erlaubt zusätzlich genau die eigene Statistik-Adresse, sonst nichts.
- **Ohne JavaScript** erscheint kein Banner — dann läuft auch keine Statistik.
- **Barrierefreiheit:** Der Banner ist ein beschrifteter Bereich direkt nach den Sprunglinks, per Tastatur erreichbar, ohne Fokusfalle. Schalter sind echte Bedienelemente mit Label, Kontraste nach G, Einblendung 240 ms und ohne Bewegung bei reduzierter Bewegung.
- **Matomo-Einstellungen:** IP-Adresse um zwei Bytes kürzen, keine Heatmaps oder Sitzungsaufzeichnungen, keine Nutzerkennung über Geräte hinweg, Zugriff nur für Niklas, Rohdaten nach 6 Monaten löschen. Matomo ist Open Source und läuft auf demselben deutschen Hoster; die Daten bleiben bei NP.
- **Warum trotzdem Einwilligung:** Das BayLDA hielt eine reine Reichweitenmessung mit Matomo ohne Einwilligung für zulässig; Fachleute halten das für nicht vereinbar mit der EuGH-Linie, und Matomo selbst empfiehlt für Deutschland eine Einwilligung. Die Einwilligung ist die sichere Seite.

### Hosting und Dienstleister

- **Anforderungen an den Hoster:** Sitz und Rechenzentrum in Deutschland, Auftragsverarbeitungsvertrag nach Art. 28 DSGVO, kurze oder einstellbare Log-Aufbewahrung, HTTPS mit automatischen Zertifikaten, eigene HTTP-Header, serverseitiger Formular-Endpunkt und Mailversand.
- **Auslieferung:** Der Code liegt auf GitHub (dort gibt es keine Besucherdaten). Eine automatische Pipeline lädt die gebauten Dateien zum Hoster. Astro als Generator bleibt richtig, weil die Ausgabe auf jedem Hoster läuft.

### Impressum nach § 5 DDG

- Vollständiger Name (Niklas Prüfling) mit Zusatz NP Webdesign, ladungsfähige Anschrift in Schwandorf, kein Postfach.
- E-Mail-Adresse und ein zweiter schneller Kontaktweg; Telefon empfohlen.
- USt-IdNr. oder Wirtschafts-Identifikationsnummer, falls vorhanden. **Keine Steuernummer** — sie ist nicht vorgeschrieben. Der offene Punkt aus dem Projekt (Steuernummer und USt-IdNr. bei Kleinunternehmerregelung) wird vor Launch geklärt.
- **Kein Link zur EU-Plattform für Online-Streitbeilegung:** Sie ist seit 20.07.2025 abgeschaltet. Alte Hinweise auch aus AGB, Angebots-PDF und Rechnungsvorlage entfernen.
- Hinweis auf Verbraucherschlichtung nach § 36 VSBG: entfällt, solange NP am 31.12. des Vorjahres höchstens zehn Personen beschäftigt.
- **Erreichbarkeit:** Das Impressum muss leicht erkennbar, unmittelbar erreichbar und ständig verfügbar sein; die IHK warnt ausdrücklich vor langem Scrollen. Bei einer Reise von 31.000 px reicht der Footer allein deshalb nicht. Links „Impressum“ und „Datenschutz“ stehen im Menü (ein Klick von jeder Stelle), im Footer, in der ruhigen Ansicht und auf jeder Unterseite einschließlich 404.

### Datenschutzerklärung

- Sie beschreibt genau, was die Seite tut — nicht mehr und nicht weniger. Auch kopierte Absätze über Dienste, die gar nicht laufen, sind falsch.
- Inhalt: Verantwortlicher; Hoster mit Name, Sitz und Auftragsverarbeitung; Server-Logs (Umfang, Zweck, Dauer); Kontaktformular und E-Mail (Daten, Zweck, Rechtsgrundlage, Speicherdauer); Speicherung der Banner-Entscheidung und der Wahl „Ruhige Ansicht“; Statistik mit Matomo auf eigenem Server nur nach Einwilligung (Daten, Zweck, Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, Speicherdauer, Widerruf über „Datenschutz-Einstellungen“); Hinweis, dass keine Werbung, keine Profilbildung und keine externen Dienste eingesetzt werden; Betroffenenrechte nach Art. 15–21 DSGVO; Beschwerderecht beim BayLDA; statisches Stand-Datum.
- Grundlage ist der bestehende, laut Audit solide Text. Er wird aktualisiert, nicht neu erfunden.
- **Pflegeregel:** Jede technische Änderung — neuer Dienst, neue Schrift, neues Formularfeld — löst vor dem Deploy eine Prüfung der Datenschutzerklärung aus.

### Technische Absicherung

| Maßnahme | Wirkung |
| --- | --- |
| HTTPS erzwungen, HSTS | Verschlüsselte Übertragung, auch des Formulars |
| Content-Security-Policy: nur eigene Quellen, einschließlich der eigenen Statistik-Adresse | Der Browser blockiert jeden versehentlich eingebauten Fremdinhalt. Das ist der technische Schutz gegen „mal eben ein Video einbinden“. |
| Referrer-Policy strict-origin-when-cross-origin | Externe Seiten sehen nur die Domain, nicht die genaue Unterseite |
| Permissions-Policy: Kamera, Mikrofon, Standort aus | Kein Zugriff auf Gerätefunktionen |
| Schutz vor Einbettung in fremde Seiten, kein MIME-Sniffing | Keine Klick-Fallen, keine Fehlinterpretation von Dateien |
| Formular: serverseitige Prüfung, Honeypot, Mengenbegrenzung, kein Inhalt in Logs | Schutz vor Spam und Missbrauch |
| Zugangsdaten nur serverseitig | Nichts Geheimes im ausgelieferten Code |

### Weitere Abmahnfallen außerhalb der DSGVO

| Thema | Risiko | Maßnahme |
| --- | --- | --- |
| Bildrechte | Fotos ohne Lizenz oder ohne vorgeschriebene Urhebernennung | Nur eigene oder lizenzierte Bilder; Lizenznachweis pro Datei im Projekt; Bildnachweis, wo die Lizenz ihn verlangt |
| Personen auf Fotos | Recht am eigenen Bild | Schriftliche Einwilligung; in Studien keine erkennbaren Gesichter |
| Namen der Studien | Marken- und Namensrechte | Vor Launch im Register des DPMA und im EU-Markenregister prüfen. „Herrenzimmer“ ist als Barbershop-Name verbreitet und braucht die genaueste Prüfung. |
| Schriften | Lizenzverstoß | Nur Schriften unter SIL Open Font License, Lizenztexte mitliefern; reduzierte Schriftdateien nur aus lizenzkonformen Quellen oder nach Prüfung der Namensregel der Lizenz |
| Werbeaussagen | Irreführung nach UWG | Studien gekennzeichnet; keine absoluten Aussagen wie „DSGVO-konform“ oder „100 %“; nur Zusagen, die gehalten werden (Antwortzeit) |
| Preise | Preisangabenverordnung gegenüber Verbrauchern | Endpreise mit Hinweis, dass nach § 19 UStG keine Umsatzsteuer berechnet wird; nie „zzgl. MwSt.“ |
| Referenz-Website | Nachahmung, Urheberrecht | Nur Prinzipien übernommen, kein Design (bereits Regel) |
| Fremde Logos und Siegel | Markenrecht | Keine (bereits Regel) |

### Interne Dokumentation

- [ ] Auftragsverarbeitungsvertrag mit dem Hoster (inklusive Mail)
- [ ] Kurzes Verzeichnis von Verarbeitungstätigkeiten: Website-Logs, Anfragen, Kundenprojekte
- [ ] Ordner mit Bild- und Schriftlizenzen
- [ ] Löschfrist für Anfragen ohne Auftrag festlegen
- [ ] Rechtliche Prüfung vor Launch; optional ein Rechtstexte-Dienst mit Aktualisierungsservice, damit Änderungen wie die Abschaltung der Streitbeilegungs-Plattform nicht durchrutschen

### Datenschutz-Abnahme vor jedem Deploy

- [ ] Netzwerkprüfung aller Seiten: null Anfragen an fremde Domains
- [ ] Vor der Banner-Entscheidung und nach „Ablehnen“: keine Cookies, kein Statistik-Skript, keine Anfrage an den Statistik-Server
- [ ] Nach „Akzeptieren“ nur die dokumentierten Matomo-Cookies; ein Widerruf löscht sie
- [ ] Prüfliste des Banners vollständig erfüllt
- [ ] Content-Security-Policy aktiv, keine Verstöße in der Konsole
- [ ] Impressum und Datenschutz von jeder Stelle mit höchstens zwei Klicks erreichbar
- [ ] Datenschutzerklärung deckt sich mit der tatsächlichen Technik und dem Einwilligungs-Register
- [ ] Kein Link zur Streitbeilegungs-Plattform
- [ ] Externer Scan (etwa mit Webbkoll) ohne Drittanbieter und mit gesetzten Sicherheits-Headern

## R. Design Principles

**Sechzehn verbindliche Regeln.** Bei jeder offenen Frage in der Umsetzung entscheidet die erste passende Regel.

1. **Der Rahmen bleibt, die Welt wechselt.** NP ist in jeder Sekunde sichtbar, aber nie im Weg.
2. **Jede Verwandlung übergibt etwas.** Kein Schnitt ohne Staffelstab.
3. **Bewegung hat einen Auftrag.** Verbinden, führen oder erklären — sonst wird sie gestrichen.
4. **Orange gehört NP.** Keine Welt leiht sich die Markenfarbe.
5. **Schrift ist Architektur.** Typografie trägt die Struktur; jede NP-Zeile sitzt auf Maß.
6. **Erst zeigen, dann sagen.** Der Beweis kommt vor dem Satz, der ihn erklärt.
7. **Fakten bleiben schlicht.** Preise, Kontakt und FAQ stehen ohne Inszenierung.
8. **Der Besucher führt die Kamera.** Kein gekapertes Scrollen, kein Warten länger als 1,6 s.
9. **Ruhe ist ein Gestaltungsmittel.** Eine große Bewegung zur Zeit, eine Pause nach jedem Höhepunkt.
10. **Ein Inhalt, ein DOM.** Mobile ist eigene Regie, kein zweiter Inhalt.
11. **Ehrlich zeigen.** Studien heißen Studien. Keine erfundenen Kunden, Zahlen, Siegel oder Bewertungen.
12. **Schnell ist schön.** Das Performance-Budget ist eine Designvorgabe.
13. **Der nächste Schritt ist immer sichtbar.** Von jeder Stelle ein Klick zur Anfrage.
14. **Nie wie eine Vorlage.** Was aussieht wie aus einem Baukasten, wird neu gezeichnet.
15. **Datenschutz ist eingebaut, nicht angehängt.** Was keine Daten braucht, bekommt keine; was von fremden Servern käme, kommt vom eigenen.
16. **Jede Welt sieht anders aus.** Keine zwei Welten teilen Grundfarbe, Schrift, Akzentfarbe oder Layoutprinzip; die Farbabstände prüft der Build (Abschnitt G, Systemregel 5).

### Was diese Seite nie tut

| Muster | Warum nicht |
| --- | --- |
| Ladebildschirm mit Prozentzähler | Wartezeit ohne Inhalt; das Audit hat ihn bereits gestrichen |
| Eigener Cursor statt Systemcursor | Bedienrisiko, Klischee |
| Kachelraster im Bento-Stil | Erkennungszeichen generischer Seiten 2023–26 |
| Glas-Effekte, lila-blaue Verläufe, Leucht-Blobs | Vorlagen-Ästhetik, zudem teuer für die Grafikkarte |
| Körnungs-Overlay über der ganzen Seite | Effekt ohne Auftrag |
| Grotesk-Headline mit kursivem Serifen-Akzentwort | Typisches Muster KI-generierter Landingpages |
| Endlos-Laufband mit Autoplay | Bewegung ohne Nutzerkontrolle (2.2.2); das Branchenband läuft nur mit dem Scrollen |
| Magnetische Buttons | Verspielt, auf Touch wirkungslos |
| Zähler mit Kennzahlen wie „100+ zufriedene Kunden“ | Nicht belegbar |
| Stockfotos von lächelnden Menschen am Laptop | Austauschbar |
| Emoji als Icons | Wirkt beliebig |
| Einrasten der ganzen Seite auf Abschnitte | Scroll-Jacking |
| Englische Claims | Distanz zur Zielgruppe |
| Eingebettete Karten, Videos, Social-Feeds, Buchungs-Widgets, Captchas | Datenübermittlung an Dritte, Einwilligungspflicht, Abmahnrisiko |
| Skripte, Schriften oder Bilder von fremden Servern | Jeder Aufruf würde die IP-Adresse an Dritte senden; alles wird selbst ausgeliefert |
| Banner mit Tricks: großes „Akzeptieren“, verstecktes Ablehnen, vorausgewählte Schalter, Zustimmung per X, Cookie-Wall | Unwirksame Einwilligung und Abmahnrisiko (OLG Köln, 6 U 80/23) |
| Consent-Dienst eines Drittanbieters | Lädt selbst von fremden Servern; der eigene Banner reicht |

## S. Risiken / mögliche Fehlentscheidungen

**Die zwei größten Risiken sind der Umfang neben einem Vollzeitjob und rechtliche Fehler, die eine Abmahnung auslösen.** Beides ist ins Konzept eingebaut: Bau in Phasen (Abschnitt T) und Datenschutz als Bauentscheidung (Abschnitt Q2). Die Tabelle ist nach Gewicht sortiert.

| Risiko | Woran man es merkt | Gegenmaßnahme |
| --- | --- | --- |
| Abmahnung wegen Datenschutz, Impressum, Bild-, Marken- oder Wettbewerbsrecht | Schreiben eines Anwalts oder Verbands, Kosten, Unterlassungserklärung | Alles aus Q2: keine Drittanbieter, kein Speichern ohne Klick, Hosting in Deutschland, vollständiges und erreichbares Impressum, passende Datenschutzerklärung, Lizenz- und Markenprüfung, rechtliche Prüfung vor Launch |
| Umfang übersteigt die verfügbare Zeit | Monate ohne Launch, die alte Seite mit ihren Bugs bleibt online | Audit-Bugfixes sofort auf der alten Seite. Relaunch in Phasen: Phase 1 ist mit drei Welten launchfähig, der Werkplan passt sich der Zahl der Welten an. |
| Erwartung passt nicht zum Preis | Interessenten erwarten für 899 € eine Seite wie diese — oder halten NP für zu teuer und fragen gar nicht an | Auf /leistungen konkret beschreiben, was jedes Paket enthält. Aufwendige Animation als eigene Leistung ausweisen. Die Preise im Licht der neuen Positionierung prüfen. |
| Studien wirken wie Ersatz für fehlende Kunden | Fragen wie „Für wen haben Sie denn schon gearbeitet?“ | Offen kennzeichnen. Parallel zwei bis drei echte Projekte gewinnen, etwa zu Sonderkonditionen gegen Freigabe als Fallstudie. |
| Datenschutz schleicht sich später zurück | Jemand baut „nur schnell“ ein Video, eine Karte oder eine Analyse ein | Die Content-Security-Policy blockiert Fremdquellen technisch; Pflegeregel und Datenschutz-Abnahme aus Q2 vor jedem Deploy |
| Bildmaterial | Stockfotos lassen die Welten nach Vorlage aussehen; KI-Bilder widersprechen der Positionierung | Welten typografie- und grafikgetrieben, zwei bis vier Bilder je Welt, Bildbudget einplanen, einheitliche Bildbearbeitung, Nutzungsrechte dokumentieren |
| Zu lange Reise | Viele Besucher sehen nur die ersten drei Welten | Vollständiger Hero, Werkplan als Sprungbrett, Anfrage immer sichtbar, Branchenseiten als direkter Einstieg; notfalls auf sieben Welten kürzen |
| Ruckeln auf schwachen Geräten | Bildrate bricht in Übergängen ein | Geräteklassen, Laufzeit-Wächter, Budget, Test auf echten Geräten |
| Sonnet baut eine große Gesamt-Timeline mit festen Pixelwerten | Jede Textänderung zerstört Szenen, Fehler sind kaum zu finden | Modulvertrag, zentrale Konfiguration, Bau in Phasen mit Abnahmekriterien |
| Wartung durch eine Person | Kleine Inhaltsänderungen brauchen Stunden | Längen und Texte zentral; Szenen messen ihren Inhalt statt fester Maße |
| Fiktive Betriebe wirken echt | Besucher wollen bei der „Praxis am Weiher“ einen Termin buchen | Demo-Kennzeichnung; fiktive Betriebe bekommen keine echt wirkenden Adressen, Telefonnummern oder Domains — die könnten realen Menschen gehören |
| Namens- oder Markengleichheit mit realen Betrieben | Ein echter Betrieb heißt wie eine Studie oder hat den Namen als Marke eingetragen | Vor Launch prüfen: Suchmaschine, Handelsregister, Google-Profile, Markenregister von DPMA und EU |
| Die Welten überstrahlen NP | Besucher erinnern sich an „die Bäckerei“, nicht an NP | Rahmenregeln, geschütztes Orange, Abspann, Zwischenspiele im NP-Stil |
| Barrierefreiheit leidet unter der Inszenierung | Screenreader liest Fragmente vor, Tastatur verliert den Fokus | Ebenen-Trennung, ruhige Ansicht, Screenreader- und Tastaturtest pro Phase |
| iOS-Safari-Eigenheiten | Springende gepinnte Szenen beim Ein- und Ausfahren der Adressleiste | Kleinste Viewport-Höhe, Adressleisten-Änderungen ignorieren, früh auf echten iPhones testen |
| Effekte altern | In zwei Jahren wirkt die Seite wie ein Trend von 2026 | Fundament aus zeitlosen Mitteln: Typografie, Linien, Raster. Effekte sind Module und austauschbar. |
| Lizenzen | Schrift oder Bild ohne Nutzungsrecht | Nur frei lizenzierte Schriften, selbst gehostet; Bildrechte je Datei dokumentiert |

### Fehlentscheidungen, die ich ausdrücklich nicht empfehle

- Mit allen zehn Welten gleichzeitig zu starten, statt mit drei fertigen.
- Die Welten als echte Referenzen auszugeben oder ihnen erfundene Ergebnisse zu geben.
- Das Opening länger als 1,6 s zu machen oder es vor die Botschaft zu stellen.
- WebGL, Lottie oder Video einzuführen, „weil es möglich ist“.
- Die Zielgruppe gegen Award-Jurys einzutauschen: Die Seite muss in Schwandorf verkaufen, nicht in einer Galerie gewinnen.

## T. Final Master Blueprint

**Auftrag für Sonnet in einem Satz:** Baue np-webdesign.de als statische Astro-Seite, auf der eine durchgehende Scroll-Reise vom NP-Logo über einen Werkplan durch bis zu zehn verkettete Branchenwelten in einen Kontaktrahmen „Welt 11“ führt — Phase für Phase, nach den Werten dieses Blueprints, ohne eigene Erfindungen.

### 1. Nicht verhandelbar

1. Ein DOM, echter Text in Lesereihenfolge; die Inszenierung liegt auf Bühne und Rahmen, für Hilfstechnik verborgen.
2. Kein Scroll-Jacking, kein Einrasten, keine Gesamt-Timeline. Eine Szene pro Abschnitt.
3. Opening per CSS-Animation, fertig nach 1,6 s; Hero vollständig ohne JavaScript.
4. Alle Längen, Paletten und die Reihenfolge stehen in einer zentralen Reise-Konfiguration.
5. Nur Transform, Deckkraft und Masken animieren.
6. Drei Modi: Desktop voll, Mobile, Ruhig. Ruhig hat keine Pins.
7. Orange nur für NP. Keine Welt nutzt Farbtöne von 10–35° mit mehr als 55 % Sättigung. Der NP-Modus (hell, mittel, dunkel) wird aus dem Grund berechnet, nie von Hand gesetzt.
8. Jede Studie ist als „Studie · fiktives Unternehmen“ gekennzeichnet; keine erfundenen Kunden, Zahlen, Siegel, Adressen, Telefonnummern oder Domains.
9. Kein WebGL, kein Lottie, kein Video, keine Fremdserver. Statistik nur selbst gehostet und nur nach Einwilligung über den eigenen Banner (Q2).
10. Fehlende Inhalte als sichtbarer Platzhalter „\[PLATZHALTER: …\]“, nie erfunden.
11. Datenschutz als Bauregel (Q2): null Anfragen an fremde Server, keine Einbettungen, kein Speichern im Browser außer Banner-Entscheidung und „Ruhige Ansicht“ (Statistik-Cookies erst nach Zustimmung), keine Abfrage von Geräte- oder Verbindungsdaten, Content-Security-Policy nur mit eigenen Quellen, Hosting in Deutschland.
12. Impressum und Datenschutz mit einem Klick aus dem Menü erreichbar, zusätzlich im Footer und auf jeder Unterseite; kein Link zur abgeschalteten Streitbeilegungs-Plattform.
13. Jede Welt sieht anders aus: Keine zwei Welten teilen Grundfarbe, Schrift, Akzentfarbe oder Layoutprinzip. Der Build prüft Farbabstand (ΔE mindestens 10), Kontraste und geschützten Orange-Bereich aus der Reise-Konfiguration und bricht bei einem Verstoß ab.

### 2. Design-Tokens

| Gruppe | Token | Wert |
| --- | --- | --- |
| Farbe | leinen, sand, kalk | #F0EBE3, #E3D8C8, #FBF8F5 |
| Farbe | tinte, stein | #1C1712, #5E5852 |
| Farbe | np-orange, orange-text, glut, ocker | #CE5D17, #A34A0D, #F08A4B, #C99A3E |
| Farbe | nacht, kohle, asche | #14100C, #2E2822, #B5AB9F |
| Farbe | hover-toenung, fehler, erfolg | #ECDACB, #A3271D, #2E6A4B |
| Linie | haarlinie, masslinie | 1 px Tinte mit 20 % Deckkraft; 1 px NP-Orange |
| Schrift | sans, mono | Archivo (variabel, Breite 62–125, Gewicht 100–900); IBM Plex Mono 400 und 500 |
| Schriftskala | mega bis mono-xs | Werte aus Abschnitt H |
| Abstände | 1 bis 11 | 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192 px |
| Abschnittsabstand | block | clamp(96px, 14vh, 192px) |
| Seitenrand | gutter | clamp(16px, 5vw, 80px) |
| Raster | Spalten, Fuge | 12 Spalten, Fuge clamp(16px, 2vw, 32px), Inhalt max. 1440 px, Text max. 66 Zeichen |
| Breakpoints | sm, md, lg, xl | 600, 1024, 1440, 1920 px (Basis ab 360 px) |
| Ecken | NP | 0 — kantig wie das Logo; Welten definieren eigene |
| Ebenen | atmosphäre, inhalt, bühne, rahmen, overlay | 0, 10, 20, 30, 40 |
| Bewegung | Dauern, Easings, Versatz | Werte aus Abschnitt I |

### 3. Reise-Konfiguration

Weltkörper sind Zielhöhen des Inhalts und nicht gepinnt (Ausnahme: Querfahrt in Welt 05 am Desktop). Übergänge sind gepinnt.

| Nr. | Abschnitt | Anker | Desktop | Mobile | Grund |
| --- | --- | --- | --- | --- | --- |
| 1 | Hero | — | 100vh | 100vh | Leinen |
| 2 | Opening-Expansion (Pin) | — | 150vh | 100vh | Leinen |
| 3 | Werkplan | #werkplan | 80vh | 80vh | Leinen |
| 4 | t00 Werkplan → 01 | — | 60vh | 40vh | — |
| 5 | Welt 01 Korn & Kruste | #baeckerei | 160vh | 140vh | #E9C46A |
| 6 | t01 Bon | — | 60vh | 40vh | — |
| 7 | Welt 02 Herrenzimmer | #barbershop | 140vh | 120vh | #121010 |
| 8 | t02 Goldlinie | — | 60vh | 40vh | — |
| 9 | Welt 03 Steiner Bau | #bau | 140vh | 120vh | #DCE8F1 |
| 10 | t03 P-Iris | — | 60vh | 40vh | — |
| 11 | Zwischenspiel I | #warum | 120vh | 100vh | Nacht |
| 12 | t04 N-Blende | — | 60vh | 40vh | — |
| 13 | Welt 04 Haas & Sternfeld | #kanzlei | 120vh | 110vh | #FFFFFF |
| 14 | t05 Zierlinie | — | 60vh | 40vh | — |
| 15 | Welt 05 Chromwerk | #oldtimer | 180vh | 120vh | #13382B |
| 16 | t06 Scheinwerfer | — | 60vh | 40vh | — |
| 17 | Welt 06 Jana Ahrens | #coaching | 120vh | 110vh | #DCD1EA |
| 18 | t07 Kreise zu Weg | — | 60vh | 40vh | — |
| 19 | Zwischenspiel II | #arbeitsweise | 160vh | 160vh | Leinen |
| 20 | t08 Laserlinie | — | 60vh | 40vh | — |
| 21 | Welt 07 NAABTEC | #industrie | 160vh | 120vh | #2B3642 |
| 22 | t09 Raster zu Kalender | — | 60vh | 40vh | — |
| 23 | Welt 08 Praxis am Weiher | #physiotherapie | 120vh | 110vh | #CDE8DA |
| 24 | t10 Weiher zu See | — | 80vh | 50vh | — |
| 25 | Welt 09 Gut Weidenstein | #landgasthof | 160vh | 130vh | #2A1F33 |
| 26 | t11 Fenster | — | 60vh | 40vh | — |
| 27 | Zwischenspiel III | #ueber-mich | 120vh | 110vh | Leinen |
| 28 | t12 Seite zieht sich aus | — | 100vh | 70vh | — |
| 29 | Welt 10 NP Labor | #labor | 120vh | 100vh | #FFFFFF |
| 30 | t13 Rohbau zu Werkplan (Finale) | — | 140vh | 90vh | Leinen |
| 31 | Welt 11 Kontakt | #kontakt | 150vh | 200vh | Leinen |
| 32 | FAQ und Footer | #faq | 160vh | 230vh | Kalk, Nacht |

Summe: 3.440vh Desktop, 2.910vh Mobile. Für Paare ohne eigenen Übergang (etwa in Phase 1) gibt es einen **Standard-Übergang**: Der orange Faden zieht eine Linie quer über den Viewport, dahinter wischt die neue Welt herein, 60 / 40vh.

### 4. Bauphasen mit Abnahme

| Phase | Umfang | Abnahme |
| --- | --- | --- |
| 0 · sofort | Bugfixes aus dem Audit auf der alten Seite | Audit-Checkliste erfüllt |
| 1 · Fundament und Launch | Tokens, Rahmen, Opening, Werkplan, Welten 01–03, Zwischenspiele I–III mit Standard-Übergängen, Finale mit Welt 11 und Formular, FAQ, Footer, /leistungen, /ueber-mich, drei Branchenseiten, Rechtstexte, 404, SEO-Grundlagen, Ruhig-Modus, Betrieb ohne JavaScript, Einwilligungsbanner mit selbst gehosteter Statistik | Alle Kriterien unten; Claim zählt mit: „Drei Welten. Die vierte gehört Ihnen.“ |
| 2 | Welten 04–06 mit ihren Übergängen, drei Branchenseiten, Werkplan mit sechs Zellen | wie unten |
| 3 | Welten 07–10 mit Übergängen, Rohbau-Finale, drei Branchenseiten, Werkplan mit zehn Zellen | wie unten |

**Abnahme jeder Phase:**

- [ ] Datenschutz-Abnahme aus Q2 bestanden: null Fremdanfragen, kein Browser-Speicher ohne Klick, Content-Security-Policy ohne Verstöße, Rechtstexte erreichbar und passend zur Technik
- [ ] Lighthouse Mobil mindestens 90; Budget aus O eingehalten
- [ ] Kein seitliches Scrollen ab 320 px Breite
- [ ] Tastatur-Runde und Screenreader-Runde (VoiceOver, NVDA) bestanden
- [ ] Ruhige Ansicht und Betrieb ohne JavaScript vollständig
- [ ] Getestet auf iPhone (Safari), Mittelklasse-Android (Chrome), Desktop (Chrome, Safari, Firefox)
- [ ] Jeder Übergang flüssig am Desktop; auf dem Android-Testgerät im Modus „Leicht“ ohne sichtbares Ruckeln
- [ ] Alle Texte aus dem Copy-Deck (K, L); jeder Platzhalter sichtbar markiert
- [ ] Jede Studie gekennzeichnet; Namen gegen reale Betriebe und Markenregister geprüft

### 5. Arbeitsregeln für Sonnet

- Vor jedem Schritt die Reise-Konfiguration lesen; Längen und Farben nie im Modul festschreiben.
- Pro Sitzung höchstens eine Welt mit ihrem Eingangs-Übergang bauen und danach gegen die Abnahme prüfen.
- Bei Widersprüchen gilt: Designprinzipien (R) vor Einzelangaben, Barrierefreiheit (P) und Budget (O) vor Effekten.
- Die drei vorhandenen Demos (Herrenzimmer, Steiner Bau, Jana Ahrens) zuerst lesen und ihre Gestaltung übernehmen; nur Farb- und Schriftwerte angleichen, wo Kontrast oder Lizenz es verlangen.
- Nichts erfinden: Fehlt ein Wert, ein Text oder ein Bild, Platzhalter setzen und in der Antwort auflisten.

### 6. Offene Entscheidungen für Niklas

Siehe Checkliste am Ende von Abschnitt K. Zusätzlich: einen deutschen Hoster nach den Anforderungen aus Q2 festlegen, Preise im Licht der neuen Positionierung prüfen, Claim-Variante bestätigen (Empfehlung A), Statistik bestätigen (ohne sie hat der Banner nichts zu steuern).

## Quellen

- [HIRO SAKAO Amberg](https://www.hiro-amberg.de) — Referenz; Quelltext und Struktur abgerufen am 01.10.2026
- [GSAP-README von GreenSock](https://cdn.jsdelivr.net/npm/gsap-trial@3.13.0/README.md) — alle Plugins kostenlos, auch kommerziell
- [bundlephobia: gsap](https://bundlephobia.com/api/size?package=gsap) — Version 3.15.0, 70,6 KB minifiziert, 27,4 KB gzip
- [Fraunces auf GitHub](https://github.com/undercasetype/Fraunces) — Achsen opsz 9–144, wght 100–900, SOFT 0–100, WONK 0–1; SIL Open Font License
- [Archivo auf GitHub](https://github.com/Omnibus-Type/Archivo) — Breiten von Extra Condensed bis Expanded; SIL Open Font License
- [Archivo im Google-Fonts-API](https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900) — Breitenachse 62–125, Gewicht 100–900
- [IHK Ostthüringen: EU-Plattform für Online-Streitbeilegung wird abgeschafft](https://www.ihk.de/gera/recht-und-steuern/aktuelles-rechtundsteuern/eu-plattform-fuer-online-streitbeteiligung-wird-abgeschafft-6505768) — Abschaltung zum 20.07.2025, Hinweise entfernen
- [Heuking: EuG bestätigt EU-US Data Privacy Framework](https://www.heuking.de/de/news-events/newsletter-fachbeitraege/artikel/eug-bestaetigt-wirksamkeit-des-eu-us-data-privacy-framework.html) — Urteil vom 03.09.2025
- [Captain Compliance: Latombe-Rechtsmittel veröffentlicht](https://captaincompliance.com/?p=10750) — Rechtsmittel zum EuGH, Amtsblatt 29.12.2025
- [IHK Köln: Impressum – Pflichtangaben auf Websites](https://www.ihk.de/koeln/hauptnavigation/recht-steuern/impressum-pflichtangaben-auf-websites-5271690) — Pflichtangaben nach § 5 DDG, keine Steuernummer, Erreichbarkeit
- [Dr. Datenschutz: Cookies und Datenschutz zwischen TDDDG und DSGVO](https://www.dr-datenschutz.de/cookies-und-datenschutz-zwischen-tdddg-und-dsgvo/) — § 25 TDDDG gilt auch für localStorage und sessionStorage
- [§ 36 VSBG](https://gesetze.legal/bund/vsbg/36) — Ausnahme bei höchstens zehn Beschäftigten
- [Plutte: OLG Köln – Cookie-Banner-Buttons müssen gleichwertig sein](https://www.ra-plutte.de/olg-koeln-cookie-banner-buttons-muessen-gleichwertig-sein) — Urteil vom 19.01.2024, 6 U 80/23
- [Matomo: Konfiguration für das TDDDG](https://matomo.org/faq/new-to-piwik/configure-matomo-analytics-for-tdddg-ttdsg-compliance/) — Einwilligung für Tracking in Deutschland empfohlen
- [IT-Recht Kanzlei: BayLDA und die Einwilligungspflicht bei Matomo](https://www.it-recht-kanzlei.de/baylda-inkonsequenz-cookie-einwilligungspflicht-matomo.html) — Auffassung des BayLDA und Kritik daran
- Strategie-Audit und Sonnet-Master-Prompt vom 11.09.2026 (Projektdokumente) — Logo-Farben, vorhandene Demos, Preise, Werdegang, Rechtslage
- Kontrastwerte: eigene Berechnung nach der WCAG-2-Formel für relative Luminanz
