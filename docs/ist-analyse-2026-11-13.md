# NP Webdesign – Ist-Analyse und Bewertung

Stand: 13. November 2026 · Gegenstand: Branch `claude/premium-feinschliff` (Commit `9f0cfe9`), Vergleich mit `main` (`3c61de4`)

**Wie geprüft wurde.** Repo geklont und gelesen. `npm ci` scheiterte, weil diese Umgebung die npm-Registry nicht erreicht; ich habe deshalb die von der CI gebauten Stände benutzt: `vorschau-build` (exakt `9f0cfe9`) und `deploy` (Build von `main`). Beide lokal ausgeliefert (PHP-Server mit sauberen Adressen) und in Headless-Chromium angesehen: 1440×900 und 390×844 (Touch) vollständig, 320×640 und 768×1024 nur auf Überlauf, dazu „Bewegung reduzieren“ und ohne JavaScript. Rund 180 Bildschirmaufnahmen der Startseite und von `/welten`, eigene Messskripte, `tools/axe-check.cjs` selbst ausgeführt.

Belegkürzel: **[Browser]** selbst im lokalen Build gesehen · **[Messung]** selbst gemessen · **[Code]** im Quelltext gelesen · **[Doku]** nur aus der Projektdoku, nicht bestätigt.

---

## 1. Urteil in fünf Sätzen

1. Die Seite ist handwerklich weit über dem, was Webdesigner in der Region zeigen, aber sie verkauft das Falsche: Sie beweist mit enormem Aufwand, dass du neun verschiedene Websites bauen kannst, und lässt offen, wer du bist, ob schon jemand bei dir gekauft hat und wie man dich anruft.
2. Größte Stärke: die Startseite als System – klare Aussage in fünf Sekunden, eigene Typografie, 203 KB Ladegewicht, null Fremdanfragen, null Cookies, ein Formular, das besser gebaut ist als bei den meisten Agenturen.
3. Größtes Problem: kein Gesicht, keine echte Referenz, keine Telefonnummer – und ein Schaufenster (`/welten`), das 64 Handy-Bildschirme lang ist, 21 Bildplatzhalter mit sichtbarem Fotografen-Briefing zeigt und in vier von neun Welten die falsche Überschriftenschrift lädt.
4. Technisch ist der Stand livefähig; als Verkaufsseite ist er es nicht, solange der Platzhalter in der Datenschutzerklärung steht, die Foto-Briefings öffentlich sind und Vertrauen nur behauptet wird.
5. Wichtigster nächster Schritt: aufhören, Übergänge zu polieren, und in dieser Reihenfolge liefern – „Über mich“ mit Foto einschalten, Telefon und Rückruf anbieten, `/welten` auf die fertigen Welten kürzen, drei echte Pilotkunden gewinnen.

---

## 2. Scorecard

| Bereich | Note | Begründung in einer Zeile | Tendenz `main` → Feinschliff |
| --- | --- | --- | --- |
| A Strategie und Positionierung | **4** | Aussage klar, Beweis fehlt: keine Person (`site.js:26`), keine Referenz, kein Telefon (`site.js:13`) | unverändert |
| B Informationsarchitektur und Conversion | **6** | Formular und mobile Anfrage-Leiste gut; Kontakt erst ab Bildschirm 12–14, Branchenseiten abgehängt, dort `mailto:` | leicht besser (Leistungen führt jetzt ins Formular statt `mailto:`) |
| C Design und Markenidentität | **6** | Startseite eigenständig (7–8); `/welten` durch Platzhalter und Schriftfehler in Welt 06–09 beschädigt (4–5) | leicht besser (Touch, Kontakt, Leistungen) |
| D Motion und Interaktion | **5** | Einzelne Übergänge stark, in Summe 13–15 Bildschirme reine Übergangsstrecke auf `/welten`; ruhige Ansicht funktioniert | leicht besser (N-Blende mobil kürzer, P-Iris ohne Halt) |
| E Technik, Performance, Barrierefreiheit, SEO | **8** | Lighthouse 98/100/99, axe 0, kein Überlauf ab 320 px, 0 Cookies; `/welten` 76 und hohe Komplexität | besser (`/welten` erstes Bild) |
| F Recht und Risiken | **6** | Studien sauber gekennzeichnet, Formular datensparsam; offener Platzhalter, keine Prüfung, Namensrecherche offen | unverändert |
| G Prozess und Projektzustand | **4** | Aufwand an der falschen Stelle; Abschluss hängt an 21 Fotos für erfundene Firmen; Doku widerspricht sich | unverändert |

Belege zu jeder Note stehen in Abschnitt 4 (jeweils mindestens zwei).

---

## 3. Die drei Personen-Durchläufe

### Elektromeister, 54, abends am Handy

1. **Hero (0–5 s):** versteht sofort, was das ist. „Websites, die nach Ihrem Unternehmen aussehen“, „Betriebe in der Oberpfalz“, oranger Knopf. Überzeugungspunkt. [Browser 390 px]
2. **Warum (Bildschirm 1–3):** drei große Sätze auf Schwarz, verständlich.
3. **N-Blende (Bildschirm 3–4,5):** gut 1,3 Bildschirme nur orange Diagonalen ohne Text. Er wischt und sieht nichts. Erster Moment „ist die Seite kaputt?“. [Messung]
4. **Kunden-Test:** Handy-Demo „Anrufen. Wie lange dauert das?“ mit dem Schluss „Ein Tipp. Ein Anruf.“ Das Argument sitzt. Dann sucht er deine Nummer – und findet keine. Die Seite widerlegt sich hier selbst. [Browser, `site.js:13`]
5. **Neun Beispiele:** Bäckerei, Barbershop, Kanzlei, Oldtimer, Coaching. Kein Elektriker, kein Heizungsbauer. Am nächsten ist „Wittgenfeld Bau“. Tippt er auf Halmberg, landet er vor zwei gestreiften Flächen mit „Motiv: Ein rundes Landbrot … mindestens 2400 × 1800 px“. Wirkt unfertig. [Browser]
6. **Wer ist das?** Kein Foto, kein „Über mich“, Name nur im Footer.
7. **Kontakt:** die Leiste „Projekt anfragen“ ist immer da (gut), aber ein Pflichtfeld „Ihr Vorhaben in ein paar Sätzen“ tippt er abends nicht ins Handy. Er will morgen um sieben anrufen.

**Ausstieg:** fehlende Telefonnummer, fehlende Person. **Überzeugt hätte ihn:** Hero, Handy-Demo, Festpreise.

### Friseurin, 38, vergleicht drei Anbieter

1. **Preis:** findet ihn schnell (Hero „Direkt zu: Pakete und Preise“, Menü). 999 / 1.899 / ab 2.999 € sind klar. Überzeugungspunkt.
2. **Was bekomme ich dafür?** „On-Page SEO Grundlagen“, „Conversion-Optimierung“, „DSGVO-orientierte Umsetzung“ – Fachsprache. Offen bleibt alles, was sie wissen will: Texte und Fotos dabei? Terminbuchung dabei? Was kostet es danach im Monat? Wie viele Änderungsrunden? [Browser `/leistungen`, `site.js:30–36`]
3. **Messingstuhl:** ihre Branche, mit Wartemarke und Preisliste. Stärkster Moment für sie – der Kunden-Test spielt genau ihren Fall.
4. **Vergleich:** Die beiden anderen Anbieter zeigen echte Salons und Google-Bewertungen. Du zeigst einen erfundenen Barbershop. Die Branchenseite „Friseur & Barber“ findet sie nicht, weil sie nur aus der Werkstattnotiz in Welt 02 verlinkt ist. [Messung interne Links]

**Ausstieg:** beim Vertrauensvergleich. Sie fragt an, wenn dein Preis der niedrigste ist – also aus dem Grund, über den du nicht verkaufen willst.

### Geschäftsführer, 40 Mitarbeiter, am Desktop

1. **Erster Eindruck:** hochwertig, eigenständig. Der Kunden-Test als Rennen zweier Browserfenster ist ein kluger Moment.
2. **Beim Scrollen verschwindet die Kopfzeile** (Logo, Menü, Anfrage-Knopf) und kommt nur beim Zurückscrollen wieder. Am Desktop ist über weite Strecken kein NP-Zeichen und kein Knopf im Bild. [Browser, `rahmen.js:68–70`]
3. **TORQUEL (Industrie):** für ihn relevant. Er landet mitten in einer 64 Bildschirme langen Seite, sieht Überschriften in der NP-Hausschrift, zwei Bildplatzhalter und „Angebot anfragen (Demo)“.
4. **Seriositätsprüfung:** Impressum – Einzelunternehmen, Kleinunternehmer nach § 19 UStG, Mobilnummer. Keine Referenz, kein Profil, kein Team. Größtes Paket „ab 2.999 €“.

**Ausstieg:** Impressum plus fehlende Referenzen. Er ist nicht dein Kunde, und die Seite sollte auch nicht so tun. Siehe Grundsatzfrage 5.

---

## 4. Befunde nach Bereich

Format: **Schwere** · Belegt durch · Sicherheit · Empfehlung · Aufwand (S unter 2 h, M halber bis ganzer Tag, L mehrere Tage).

### A. Strategie und Positionierung – Note 4

**5-Sekunden-Test Startseite: bestanden.** Was, für wen, nächster Schritt und Niveau sind sofort klar. „Warum anders“ bleibt Behauptung („Ohne Baukasten, ohne Vorlage“). [Browser 390 und 1440 px]

**5-Sekunden-Test `/welten`: nicht bestanden.** Der erste Bildschirm zeigt neun Firmennamen und den Satz „Neun Betriebe. Neun Websites. Keine sieht aus wie die andere.“ Kein Wort, wer NP ist, dass es Studien sind (am Handy erst unterhalb), was man tun soll. Wer von Google direkt hier landet, hält es für ein Branchenverzeichnis oder für echte Kunden. [Browser 390 px]

**A1 · Kritisch · Kein Mensch, keine Referenz, kein Beleg.**
Belegt durch: `src/config/site.js:26` (`ueberMich: false`), Porträt liegt ungenutzt in `assets-parked/`; auf keiner Seite ein echtes Projekt [Browser]. Sicherheit: hoch.
Ein Einzelunternehmer verkauft sich selbst. Das Strategie-Audit vom September nannte deinen Werdegang (Mechatroniker, IT-Systembetrieb) ausdrücklich als stärkstes Vertrauensargument und lieferte den fertigen Text; die Kurskorrektur vom 11. Oktober hat genau das abgeschaltet. Das war ein Fehler.
Empfehlung: „Über mich“ als Abschnitt zwischen Zusammenarbeit und Kontakt einschalten: Foto, vier Sätze Werdegang, ein Satz dazu, dass du nebenberuflich arbeitest und was der Kunde davon hat (siehe H3). Aufwand: S bis M.

**A2 · Kritisch · Keine Telefonnummer – während die Seite „Ein Tipp. Ein Anruf.“ predigt.**
Belegt durch: `site.js:13` (`phone: null`, Kommentar „Entschieden“), Kunden-Test Handy-Szene [Browser]; die Nummer steht nur im Impressum. Sicherheit: hoch.
Handwerker telefonieren. Die Entscheidung gegen das Telefon widerspricht deinem eigenen Hauptargument und der Zielgruppe.
Empfehlung: Nummer mit Zeiten („Mo–Fr ab 17 Uhr, Sa 9–13 Uhr“) in Kontakt und Footer; am Handy „Anrufen“ neben „Projekt anfragen“; zusätzlich Kurzformular „Rückruf“ (Name, Telefon, wann). Aufwand: S.

**A3 · Hoch · Das Schaufenster ist öffentlich unfertig.**
Belegt durch: 21 Bildplatzhalter (`src/content/fotos.js`: 21 × `status: 'fehlt'`), jeder zeigt dem Besucher das interne Briefing (`BildPlatzhalter.astro:16–17`, „Motiv: …“, „Format: … mindestens 2400 × 1030 px“). Chromwerk ist am Desktop 7,7 Bildschirme lang, auf fünf von acht Aufnahmen dominieren gestreifte Flächen; bei Gut Weidenstein sind es vier Bildschirme am Stück [Browser 1440 px]. Sicherheit: hoch.
Welt 01 trägt die Notiz „Darum trägt hier die Fotografie, nicht der Text“ – über zwei leeren Rahmen. Ein Webdesigner, dessen Musterseiten Baustellen sind, verliert genau den Qualitätsbeweis, für den die Seite gebaut wurde.
Empfehlung sofort: Briefingtext nie ausliefern (neutrale Fläche oder gar nichts); Welten 05 und 09 aus `/welten`, Werkplan und Startseite nehmen, bis sie fertig sind. Aufwand: S.

**A4 · Hoch · Die Fotostrategie ist eine Sackgasse.**
Belegt durch: `docs/fotoliste.md` verlangt u. a. einen restaurierten Roadster (Baujahr um 1960) im Studio, denselben Wagen vorher und nachher aus identischem Winkel, zwölf Drehansichten eines Frästeils, einen See zu drei Tageszeiten vom selben Standpunkt. Sicherheit: mittel (ob du Zugang zu solchen Motiven hast, weiß ich nicht).
Das sind Aufträge für einen Fotografen – für Firmen, die es nicht gibt. Stockfotos wären der Ausweg, aber die Startseite wirbt mit „Eigene Bilder statt Stockfoto“. Die Fertigstellung von sechs Welten hängt an etwas, das realistisch nicht kommt.
Empfehlung: Welten nach Fotobedarf sortieren. 02, 03 und 06 brauchen keine und sind fertig. 04 und 07 kommen mit je zwei Bildern aus oder ohne (Typografie und Daten tragen). 01 braucht zwei Brotfotos – machbar beim Bäcker um die Ecke. 05, 08 und 09 streichen oder auf fotofreie Konzepte umbauen. Aufwand: M.

**A5 · Hoch · Preise stimmen, ihre Darstellung nicht.**
Belegt durch: `site.js:30–36` (Pakettexte), `site.js:59–60` (FAQ „Das hängt vom Umfang ab“, „innerhalb weniger Wochen“), `/leistungen` ohne Abgrenzung [Browser]. Sicherheit: hoch.
999 bis 2.999 € passt zu „hochwertig, nicht elitär“ für diese Zielgruppe. Aber die Seite heißt „Transparente Preise, klare Leistungen“ und beantwortet nicht: Texte, Fotos, Hosting, Domain, Änderungsrunden, Dauer, Betreuung danach. „Monatliches Reporting“ im Einmalpreis Premium ist unklar. Die im Audit vorgeschlagenen Fragen „Was, wenn mir der Entwurf nicht gefällt?“ und „Brauche ich fertige Texte und Bilder?“ fehlen.
Empfehlung: je Paket „Enthalten / Nicht enthalten / Kosten danach“, FAQ mit Zahlen. Aufwand: M.

**A6 · Mittel · Die Seite wirkt wie ein Studio, nicht wie eine Person.**
Belegt durch: Ich-Form im Text, aber kein Bild und kein Name oberhalb des Footers; Sprache der Maßschicht („Konstruktion · Schrägstrich, N, P“, „← 274 px →“) [Browser]. Sicherheit: mittel.
Das ist für die Zielgruppe nicht gut: Der direkte Draht ist dein Vorteil gegenüber Agenturen, und er ist unsichtbar. Die Maß-Anmerkungen sind ein Insider-Witz für Designer; sie schaden nicht, verkaufen aber auch nichts.

### B. Informationsarchitektur und Conversion – Note 6

**B1 · Hoch · Der Kontakt liegt sehr tief, davor liegen leere Strecken.**
Belegt durch [Messung]: Startseite 17,0 Bildschirme (Desktop) und 16,6 (Handy); Kontakt beginnt bei 14,0 bzw. 12,1. Davon sind 3,8 (Desktop) bzw. 2,8 (Handy) Bildschirme Übergang ohne lesbaren Inhalt (N-Blende 1,8/1,3; P-Iris 2,0/1,5). Sicherheit: hoch.
Die Anfrage-Leiste am Handy und die Sprunglinks im Hero fangen das teilweise auf.
Empfehlung: beide Übergänge auf höchstens einen halben Bildschirm kürzen (`journey.js:191 ff.`). Aufwand: S bis M.

**B2 · Hoch · Am Desktop verschwindet der Anfrage-Knopf beim Scrollen.**
Belegt durch: `rahmen.js:68–70` (Kopfzeile aus beim Abwärtsscrollen); in den Aufnahmen bei 1440 px ist beim Abwärtsscrollen ab dem zweiten Bildschirm kein Logo und kein Knopf mehr zu sehen, auf `/welten` über 60 Bildschirme hinweg [Browser]. Sicherheit: hoch.
Empfehlung: Kopfzeile am Desktop stehen lassen (schmal) oder den Knopf fest in die Ecke setzen. Aufwand: S.

**B3 · Hoch · Branchenseiten sind abgehängt und enden in `mailto:`.**
Belegt durch [Messung]: `index.html` und `leistungen.html` enthalten keinen einzigen Link auf `/branchenloesungen/…`; erreichbar nur über die Werkstattnotiz je Welt und untereinander. CTA dort ist `mailto:` (`[slug].astro:16, 169`) – genau der Weg, den das Audit als größte Reibung benannt hat. Sicherheit: hoch.
Empfehlung: Abschnitt „Für Ihre Branche“ auf Startseite und Leistungen; CTA ins Formular mit vorbelegter Branche (der Mechanismus `?paket=` existiert schon). Aufwand: M.

**B4 · Mittel · Aufteilung Startseite / `/welten` ist richtig, der Rückweg fehlt.**
Belegt durch: am Desktop in den Welten kein Kontaktweg im Bild (B2); die Welten haben eigene Knöpfe („Erstgespräch anfragen“, „Angebot anfragen (Demo)“, „Anfrage vormerken“), die wie deine aussehen können [Browser]. In Welt 09 liegen am Handy zwei feste Leisten übereinander (Buchung der Studie und deine Anfrage). Sicherheit: mittel.
Empfehlung: nach jeder Welt eine NP-Zeile „So etwas für Ihren Betrieb? → Anfragen“, klar im NP-Stil.

**B5 · Mittel · Formular: gut, mit zwei Bremsen.**
Belegt durch [Browser, Formular durchgespielt]: sechs Felder, drei Pflicht; verständliche Fehlermeldung am Feld; `/?paket=professional#kontakt` springt an die richtige Stelle und füllt die Nachricht; im Fehlerfall erscheint die E-Mail-Adresse als Ausweg. Ohne JavaScript läuft es laut Code über `:target` (nicht selbst abgeschickt). Sicherheit: hoch.
Bremsen: (1) Pflichtfeld Freitext mit mindestens 10 Zeichen – ersetzbar durch die drei Chips als ausreichende Angabe. (2) Am Handy steht die Vorschau-Box „Welt 10 · Ihr Unternehmen“ rund 230 px hoch vor dem ersten Feld; „Welt 10“ versteht niemand, der `/welten` nicht kennt.
Kleinigkeit: Die Fehlermeldung bricht bei 390 px zweispaltig um, die Adresse steht abgetrennt daneben. Aufwand: S.

**B6 · Niedrig · 404 führt nur zum Werkplan.**
Belegt durch `src/pages/404.astro:8`. Empfehlung: Startseite und Kontakt ergänzen. Aufwand: S.

### C. Visuelles Design und Markenidentität – Note 6

**C1 · Hoch · In vier von neun Welten laden die Überschriften in der NP-Hausschrift.**
Belegt durch [Messung, berechnete Schrift aller h2/h3 je Welt, beide Branches]: Welt 06 (Figtree), 07 (Geist), 08 (Atkinson), 09 (Cormorant) – alle Überschriften rendern in „Archivo NP“. Ursache: `src/styles/base.css:37` (`h1, h2, h3 { font-family: var(--sans) }`), in diesen vier `world.css` fehlt die Rücksetzung; die Blueprint verlangt die Weltschrift für „Display und Text“. Sichtbar z. B. an „Gut Weidenstein“ in Grotesk über Cormorant-Fließtext. Sicherheit: hoch.
Damit sieht fast die Hälfte der „neun völlig verschiedenen Websites“ in der Überschrift gleich aus – und zwar wie NP. `main` hat denselben Fehler.
Empfehlung: Schrift in `.w06`–`.w09` für h2/h3 setzen; danach prüfen, ob die reduzierten Schriftdateien alle Überschriften-Zeichen enthalten (Subset-Skripte neu laufen lassen). Aufwand: S.

**C2 · Hoch · Platzhalter prägen den Gesamteindruck.** Siehe A3. Auf `/welten` ist der häufigste wiederkehrende Baustein nicht dein Orange, sondern die gestreifte Fläche.

**C3 · Mittel · Die NP-Identität ist auf der Startseite stark, auf `/welten` kaum da.**
Belegt durch: Startseite – Archivo mit Breitenachse, Maßschicht, Orange, Schnittmarken ergeben ein eigenes Bild [Browser]. `/welten` am Desktop – nur Lineal rechts und eine Mono-Zeile unten links; Kopfzeile weg (B2). Sicherheit: mittel.

**C4 · Niedrig · Drei Orangetöne.**
Belegt durch: `tokens.css:33` `#CE5D17`, `Logo.astro:14` `#E8601C`, im Auftrag und in den PDFs `#E4572E`. Das Logo ist sichtbar heller als der Knopf daneben. Empfehlung: einen Wert festlegen. Aufwand: S.

**Wirkt etwas wie ein KI-Template?** Die Startseite nicht. Generisch sind: die Texte der drei älteren Branchenseiten („Wie modernes Webdesign Vertrauen schafft.“, Kärtchen „Auf jedem Gerät klar“, „Bewegung mit Funktion“), die FAQ-Antwort „Warum NP Webdesign?“ und die Feature-Listen der Pakete. Welt 06 ist die austauschbarste Gestaltung (Pastell, Kugel, runde Knöpfe).

**Rangliste der Welten** [Browser, beide Viewports]

| Rang | Welt | Urteil |
| --- | --- | --- |
| 1 | 03 Wittgenfeld Bau | Fertig, braucht kein Foto, Idee (Bauzeichnung, Schnitt, Prüfstempel) trägt und trifft die Zielgruppe |
| 2 | 02 Messingstuhl | Fertig, Wartemarke bleibt hängen, Bodoni sitzt |
| 3 | 04 Haas & Sternfeld | Typografie führt wie versprochen; funktioniert auch ohne die zwei Bilder; am Handy mit 6,7 Bildschirmen zu lang |
| 4 | 06 Jana Ahrens | Fertig und stimmig, aber am ehesten Vorlage; Überschriften in falscher Schrift |
| 5 | 07 TORQUEL | Datenästhetik gut; falsche Überschriftenschrift; Dreh-Ansicht ist ohne die zwölf Fotos eine leere Bedienung |
| 6 | 01 Halmberg | Schönste Schrift, Bon-Idee gut; die eigene These ist Fotografie, und die fehlt |
| 7 | 08 Praxis am Weiher | Richtiger Gedanke (Barrierefreiheit), gestalterisch die blasseste; drei Platzhalter |
| 8 | 05 Chromwerk | Konzept hängt vollständig an sieben Fotos; derzeit eine weitgehend leere Hülle, 7,7 Bildschirme lang |
| 9 | 09 Gut Weidenstein | „Langsamste Welt“ heißt hier: vier Bildschirme überblendete Platzhalter; Titel in falscher Schrift; Buchungsleiste liegt über Inhalt |

### D. Motion und Interaktion – Note 5

**D1 · Hoch · `/welten` ist zu lang, und ein Fünftel davon ist Übergang.**
Belegt durch [Messung]: 64,6 Bildschirmhöhen am Handy (54.549 px bei 844 px Höhe), 63,9 am Desktop; Abstände zwischen Weltende und Weltanfang summieren sich auf rund 13 (Handy) bzw. 15 (Desktop) Bildschirme. Ruhige Ansicht: 48,4. Sicherheit: hoch.
Niemand aus der Zielgruppe scrollt das. Wer über den Werkplan in eine Welt springt, landet mitten in einer Kette, die er nicht braucht.
Empfehlung: siehe Grundsatzfrage 1 (Galerie plus Einzelseiten). Wenn die Kette bleibt: Übergänge mobil auf 20 statt 40 (`journey.js:131`).

**D2 · Mittel · Welche Übergänge tragen, welche nicht.**
Tragen die Geschichte [Browser]: Bon → Wartemarke (01 → 02), Prüfstempel → rote Linie (03 → 04), Messraster → Kalender (07 → 08), Werkplan-Zelle wächst (Opening), Finale mit Rückzoom auf „Ihr Betrieb“.
Streichen oder zum einfachen Wechsel machen: Goldlinie → Maßlinie, Zierlinie, Wasser (ohne Fotos zoomt ein Platzhalter in einen Platzhalter), N-Blende und P-Iris der Startseite in ihrer jetzigen Länge.
Der Staffelstab ist eine Idee für Leute, die Übergänge bemerken. Der Elektromeister bemerkt nur, dass es dauert.

**D3 · Mittel · Zustände mitten im Übergang.**
Belegt durch [Browser, Standbilder]: Welt 08 Eingang – Kalenderzellen liegen über dem Einleitungstext (390 px, Bildschirm 44); Welt 05 Ausgang – Scheinwerfer liegt über der Studienzeile; Welt 09 Kopf – Buchungsleiste liegt über der Bildfläche (1440 px, Bildschirm 51). Sicherheit: mittel (Standbilder aus gescrubbtem Scrollen; am echten Gerät prüfen).

**D4 · Gut gelöst.** Kein Scroll-Jacking; ruhige Ansicht und `prefers-reduced-motion` ergeben eine vollständige Seite (Startseite 13,0 Bildschirme); ohne JavaScript 13,1 Bildschirme, alle Abschnitte da; Kunden-Test mit Pause-Knopf und Tabs; Wischleiste in Welt 05 weitet die Seite nicht auf. [Messung, Browser]

### E. Technik, Performance, Barrierefreiheit, SEO – Note 8

**Bestätigt (alles selbst gemessen):**
- Kein horizontaler Überlauf bei 320, 390, 768 und 1440 px auf neun geprüften Adressen, auch während des Scrollens.
- 0 Fremdanfragen, 0 Cookies, 0 Speicher-Einträge nach vollständigem Durchscrollen von `/` und `/welten`.
- Ladegewicht (gzip gerechnet): Startseite rund 203 KB in 11 Anfragen; `/welten` rund 490 KB in 43 Anfragen, davon 275 KB Schrift.
- axe-core (WCAG 2.2 AA) über Startseite, alle Welten, Modi und Unterseiten: 0 Verstöße.
- Lighthouse mobil laut abgelegten Berichten im Branch `vorschau-build`: Startseite 98, Leistungen 100, Bäckerei 99, `/welten` 76 (die Doku nennt 73 als Median); Accessibility, Best Practices, SEO jeweils 100. `/welten` simuliert: LCP 3,9 s, TBT 440 ms.

**E1 · Hoch · Wartbarkeit: Das kannst du allein kaum pflegen.**
Belegt durch [Code]: 2.829 Zeilen Bewegungscode; `transitions.js` 548 Zeilen (39 KB) mit eigenem Prüfwerkzeug (412 Zeilen) und eigenem Fehlerhandbuch (241 Zeilen); `BLUEPRINT.md` 1.493 Zeilen, deren Abschnitte B–T laut eigener Kurskorrektur „in diesem Sinn zu lesen“ sind. Sicherheit: mittel.
Die Struktur ist sauber (eine Konfiguration, Welten als Module, Palettenprüfung vor dem Build). Aber jede sichtbare Änderung an einer Welt verlangt neue Vorschaubilder, Schrift-Subsets und einen Übergangstest. Das ist ein System, das ein Entwickler-Agent pflegt, nicht ein Nebenberufler am Abend.

**E2 · Mittel · Performance-Risiko liegt allein auf `/welten`.**
Belegt durch [Messung]: 2.814 DOM-Elemente, 15 Schriftfamilien, 16 Schriftschnitte gleich beim Start geladen; TBT 440 ms schon ohne Fotos. Sicherheit: mittel.
Mit 21 Fotos in Breiten bis 2.560 px wird die Seite mehrere Megabyte schwer; `content-visibility` hilft beim ersten Bild, nicht beim Speicher älterer Handys. Die Startseite ist davon nicht betroffen. Ein weiterer Grund für Einzelseiten je Welt.

**E3 · Mittel · SEO: sauber gebaut, lokal zu schwach.**
Belegt durch [Messung, Code]: Titel der Startseite gut („Webdesign aus Schwandorf – Websites für Betriebe“). Branchenseiten heißen „Website-Konzept Handwerker – NP Webdesign“; in den drei geprüften (Handwerker, Friseur, Bäckerei) kommt im Hauptteil kein Ortsname vor. 430–770 Wörter je Seite, 14–25 % davon wortgleich auf mindestens einer weiteren. `ProfessionalService` in `index.astro:31` ohne `telephone` und Straße, obwohl beides im Impressum steht. Sicherheit: hoch.
Empfehlung: Titel nach Muster „Webdesign für Handwerker in Schwandorf und der Oberpfalz“; je Seite ein Absatz mit echtem regionalem Bezug; strukturierte Daten vervollständigen; Google-Unternehmensprofil anlegen, falls noch nicht geschehen. Aufwand: M.

**E4 · Mittel · Was axe nicht findet.**
- Tastatur [Messung, automatischer Tab-Durchlauf, grob]: Fokus bleibt überwiegend sichtbar; auf `/welten` 6 von 168 Stopps außerhalb des Bildes und zwei Rücksprünge in der Scrollposition, auf der Startseite Fokus auf Beispielkarten, die im gefächerten Stapel verdeckt sind. Sicherheit: niedrig – von Hand nachprüfen.
- Screenreader: neun Welten mit je eigenem Kopf, Demo-Formularen und Demo-Knöpfen hintereinander; 51 Überschriften auf einer Seite. Formal korrekt, als Erlebnis vermutlich verwirrend. Nicht geprüft.
- H1 der Startseite [Code, Messung]: Im gebauten HTML stehen die vier Zeilen ohne Leerzeichen hintereinander, und die Maßzahlen liegen als Kindelement in der H1 (`Hero.astro`, `aria-hidden`). Für Screenreader unkritisch, für Suchmaschinen-Snippets unschön. Aufwand: S.

### F. Recht und Risiken – Note 6

Keine Rechtsberatung. Wo „Anwalt“ steht, reicht meine Einschätzung nicht.

**F1 · Kritisch · Sichtbarer Platzhalter in der Datenschutzerklärung.**
Belegt durch `src/content/datenschutz.html:164` („[PLATZHALTER: Speicherdauer Logfiles laut Hostinger]“), im Build sichtbar. Wenn `main` live ist, steht das öffentlich. Empfehlung: Wert bei Hostinger erfragen und eintragen. Aufwand: S.

**F2 · Hoch · Rechtstexte ungeprüft.**
Belegt durch `docs/offen-niklas.md` Abschnitt 2 [Doku]. Die Prüfliste `docs/rechtspruefung.md` ist gut vorbereitet; einmalige Prüfung durch eine fachkundige Stelle vor aktiver Werbung. Anwalt.

**F3 · Mittel · Studiennamen.**
Kennzeichnung ist vorbildlich: jede Welt trägt „Studie · fiktives Unternehmen“, jede Demo-Aktion „Demo · es wird nichts gesendet“ [Browser]. Offen ist die Namensrecherche (DPMA, EUIPO, Handelsregister, Google) für alle neun [Doku]. Ich habe keine Recherche durchgeführt. Risiko mittel bei Kunstnamen wie TORQUEL und Chromwerk, weil sie wie echte Marken klingen. Bei Treffern: Anwalt oder umbenennen.

**F4 · Mittel · Branchenseiten Kanzlei, Physio, Gastro.**
Die Texte versprechen nichts Heikles; Physio enthält ausdrücklich den Hinweis auf Heilmittelwerbung, Kanzlei formuliert Ziele statt Zusagen („Mehr passende Mandatsanfragen“ als Projektziel) [Messung Textsuche]. Risiko gering, solange es Konzepte bleiben. Sobald ein echter Mandant aus diesen Berufen kommt: dessen Kammer- und Werberecht ist dann Thema. Anwalt.

**F5 · Niedrig · Formular.**
Belegt durch `public/api/kontakt.php` [Code]: Honeypot, Zeitprüfung, Linkfilter, Herkunftsprüfung, Reply-To statt fremdem Absender, kein Inhalt in Logs, keine IP-Speicherung, Zugangsdaten außerhalb des Web-Ordners vorgesehen. Sauber. Zwei Punkte: (1) Das Stundenlimit zählt alle Absender zusammen (40) – ein Bot kann echte Anfragen für eine Stunde blockieren. (2) Der Absender bekommt keine Bestätigungs-Mail; für Handwerker ein Vertrauenssignal, datenschutzrechtlich unproblematisch, wenn kurz. Zugangsdaten habe ich weder gesucht noch gelesen.

**F6 · Niedrig · `np-calm` im Datenschutz ohne Laufzeit** (`datenschutz.html:197`), steht schon in deiner offenen Liste.

**F7 · Niedrig · Kunden-Test als Vergleich.** „Baukasten“ ist kein benannter Wettbewerber, die Darstellung ist als Simulation gekennzeichnet. Risiko gering. Der Vergleich ist aber ein Strohmann (träge, Cookie-Banner, kein Termin); wer eine ordentliche Baukasten-Seite hat, fühlt sich nicht gemeint.

### G. Prozess und Projektzustand – Note 4

**G1 · Kritisch · Der Aufwand ging an die falsche Stelle.**
Belegt durch: Das Strategie-Audit vom 11. September empfahl „Evolution, kein Neustart“, in wenigen Wochen, mit Formular, „Über mich“, Werdegang und ehrlichen FAQ als Kern. Gebaut wurde ein Neubau: 105 Commits im Repo, 88 davon seit dem 2. Oktober; in den Commit-Betreffs kommen Übergänge, Staffelstab und Finale 29-mal vor, „Über mich“, Referenzen, Leistungen, Preise und FAQ zusammen 3-mal (Stichwortzählung, grob). Das Vertrauenskapitel wurde währenddessen abgeschaltet. Sicherheit: hoch für die Richtung, niedrig für die genaue Zahl.
Die Kurskorrektur vom 11. Oktober (Startseite verkauft, Welten ziehen um) war richtig. Danach ging es mit N-Blende, P-Iris und Feinschliff weiter in dieselbe Richtung.

**G2 · Hoch · Der Abschluss hängt an etwas, das nicht kommt.** Siehe A4. Dazu offen laut eigener Liste [Doku]: echte Geräte, Screenreader, Hostinger-`.htaccess`, SPF/DKIM, Rechtsprüfung, Namensrecherche.

**G3 · Mittel · Die Doku widerspricht sich.**
Belegt durch `docs/stand-uebergabe.md`: Abschnitt 0a nennt Lighthouse-Werte, Abschnitt 6 und 7 sagen „Lighthouse nie gelaufen“; Abschnitt 7 nennt den Claim „Zehn Welten. Die elfte gehört Ihnen.“; `README.md` nennt die Startseite „vorläufig bis Teil C“. Wer das als Arbeitsauftrag an Claude Code gibt, bekommt Arbeit auf veraltetem Stand.
Empfehlung: `stand-uebergabe.md` auf eine Seite kürzen, Verlauf in eine Archivdatei. Aufwand: S.

**Wie weit vom Livegang?** Technisch: zwei bis drei Abende (F1, C1, A3, B2). Als Seite, die Anfragen bringt: so weit, wie du brauchst, um Foto, Telefon und die erste echte Referenz zu liefern.

---

## 5. Was richtig gut ist und bleiben muss

- **Hero der Startseite:** Aussage, Ortsbezug, zwei Knöpfe, Sprunglinks zu Preisen und Kontakt. Nicht mehr anfassen.
- **Datenschutz als Bauprinzip:** strikte CSP, alles selbst gehostet, kein Banner nötig. Gemessen: null Fremdanfragen, null Cookies. Das ist ein Verkaufsargument, das auf der Seite selbst fast nicht vorkommt (siehe H6).
- **Das Kontaktformular samt Endpunkt:** Validierung, Fehlertexte, Paket-Übergabe, Betrieb ohne JavaScript, Spam-Schutz ohne Captcha.
- **Die mobile Anfrage-Leiste.**
- **Der Kunden-Test als Idee:** ein Kunde, ein Ziel, zwei Seiten. Das einzige Stück der Seite, das Nutzen statt Gestaltung zeigt.
- **Welten 02 und 03, die Bon-Idee aus 01, die Typografie von 04.**
- **Die Kennzeichnung der Studien** – ehrlich, sichtbar, durchgängig.
- **Ruhige Ansicht und die Seite ohne JavaScript.**
- **Eine Konfiguration als Quelle** (`journey.js`, `site.js`), Palettenprüfung vor dem Build, CI-Vorschau mit Lighthouse-Median.
- **Die Regel „nichts erfinden“.** Sie hat verhindert, dass falsche Kundenstimmen auf der Seite stehen. Sie darf nur nicht dazu führen, dass gar kein Beweis da ist.

---

## 6. Grundsatzfragen zum Konzept

**1. `/welten`: Reise oder Galerie?**

| Variante | Dafür | Dagegen |
| --- | --- | --- |
| A · Reise behalten, Fotos beschaffen | Kein Umbau; der Staffelstab bleibt als Kunststück | 64 Bildschirme, 21 Fotos, schwer zu pflegen; niemand aus der Zielgruppe sieht das Ende |
| B · Reise auf die fertigen Welten kürzen (02, 03, 06, dazu 04 und 07 ohne Bildflächen) | In ein bis zwei Tagen machbar; nichts Unfertiges mehr sichtbar; Claim wird „Fünf Betriebe …“ | Übergänge müssen neu verkettet werden; Bäckerei und Gastro fehlen vorerst |
| C · Galerie plus eine eigene Adresse je Studie (`/studien/messingstuhl`) | Jede Studie sieht aus wie eine echte Website, lädt schnell, lässt sich einzeln verschicken („So könnte Ihre Bäckerei aussehen“); Übergänge entfallen; Fotos nur noch pro Studie nötig | Größter Umbau (L); der Staffelstab, in den Wochen geflossen sind, fällt weg |

Meine Empfehlung: **jetzt B, danach C.** Dass der Staffelstab gebaut ist, ist kein Grund, ihn zu behalten.

**2. Womit beweist du Qualität: mit Studien oder mit Kunden?**
Studien zeigen, dass du gestalten kannst. Sie zeigen nicht, dass ein Betrieb mit dir zufrieden war. Alternative: drei Pilotprojekte in der Region zu einem reduzierten Festpreis gegen Fallstudie, Foto und Bewertung (H2). Nachteil: kostet dich Marge und acht bis zehn Wochen. Ohne das bleibt die Seite ein Portfolio ohne Kunden.

**3. Person zeigen oder nicht?**
Dagegen spricht nur, dass du nebenberuflich arbeitest und das nicht ausstellen willst. Dafür: Es steht ohnehin im Impressum (Einzelunternehmen, § 19), und verschwiegen wirkt es schlechter als erklärt. Empfehlung: zeigen.

**4. Telefon ja oder nein?**
Dagegen: Du bist tagsüber im Hauptberuf. Lösung: feste Zeiten nennen und Rückruf anbieten. Empfehlung: ja.

**5. Den Mittelständler bedienen oder bewusst nicht?**
Die Seite deutet es mit TORQUEL und „Premium ab 2.999 €“ an, kann die Prüfung eines Geschäftsführers aber nicht bestehen. Entweder Industrie-Welt und Premium-Versprechen zurücknehmen und klar „für Betriebe bis etwa 20 Leute“ sagen, oder später mit echten Referenzen nachziehen. Empfehlung: jetzt bewusst nicht.

---

## 7. Kreative Vorschläge (Bereich H)

Alles in diesem Abschnitt ist **Idee**, keine belegte Bewertung. Sortiert nach erwarteter Wirkung auf Anfragen.

**H1 · „Ihr Betrieb in einer Minute“ – die Live-Vorschau ernst nehmen.** Die Vorschau im Kontakt setzt heute nur den Firmennamen in ein Raster. Ausbau: Besucher tippt Namen und wählt die Branche; der Name erscheint im Kopf der passenden Studie (Schrift, Farbe, Aufbau von Messingstuhl oder Wittgenfeld). Darunter: „Diesen Entwurf mit Niklas besprechen“ – Branche und Name gehen mit der Anfrage mit. Wirkt, weil der Elektromeister zum ersten Mal *seinen* Namen in gut sieht. Aufwand M bis L. Risiko: lange Namen, Sonderzeichen (`fit.js` löst das schon teilweise). Passt zum Bestehenden.

**H2 · Drei Pilotkunden aus dem Landkreis.** Offen ausgeschrieben auf der Seite: „Ich suche drei Betriebe aus dem Landkreis Schwandorf. Festpreis reduziert, dafür darf ich das Projekt zeigen.“ Mit sichtbarem Zähler „noch 2 Plätze“. Ergebnis: echte Fallstudien nach dem Muster Ausgangslage, Idee, Ergebnis, dazu Bewertungen. Aufwand L (geschäftlich, kaum technisch). Risiko: Marge, Zeit. Größte Einzelwirkung überhaupt.

**H3 · „Über mich“ als Versprechen statt als Lebenslauf.** Foto, dann: „Tagsüber halte ich als IT-Systemtechniker Netze am Laufen. Abends und samstags baue ich Websites – höchstens zwei gleichzeitig. Deshalb bekommen Sie mich und niemanden sonst.“ Macht aus dem Nebenberuf ein Argument (begrenzte Plätze, technischer Ernst). Aufwand S. Die Zahl „zwei“ ist ein Platzhalter für deine echte Kapazität.

**H4 · Persönlicher Website-Check statt Automat.** Feld im Formular „Ihre jetzige Website (falls vorhanden)“. Zusage: „Ich schaue sie mir an und schicke Ihnen drei konkrete Punkte – kostenlos, auch wenn daraus nichts wird.“ Kein Fremddienst, kein Tracking, passt zu deiner Datenschutzlinie und gibt dem Erstkontakt einen Gegenwert. Aufwand S technisch, je Anfrage 20 Minuten. Risiko: Zeit bei vielen Anfragen – ein gutes Problem.

**H5 · Kunden-Test mit Handwerker-Fall.** Zweites Szenario neben dem Barbershop: „Samstagabend, Heizung kalt. Wie schnell findet der Kunde den Notdienst?“ Umschalter Barbershop / Handwerk. Trifft die größte Zielgruppe direkt. Aufwand M (Mechanik steht in `kundentest.js`).

**H6 · Fallstudie 00: diese Website.** Dein einziges echtes Projekt mit echten Zahlen: 203 KB, 0 Cookies, kein Banner, Lighthouse 98, kein Baukasten. Als kurze Fallstudie „Was ich für mich selbst gebaut habe“ mit dem Angebot „Messen Sie Ihre eigene Seite dagegen“. Aufwand S. Zahlen vor Veröffentlichung auf dem Live-Server nachmessen.

**H7 · Risiko umdrehen.** „Sie sehen den ersten Entwurf, bevor Sie etwas zahlen. Gefällt er nicht, trennen wir uns ohne Rechnung.“ Senkt die Hürde für jemanden ohne Vergleichsmöglichkeit stärker als jedes Design. Aufwand S auf der Seite; kaufmännisch deine Entscheidung, vorher mit den AGB abgleichen.

**H8 · Laufendes Paket.** „Hosting, Pflege, kleine Änderungen: fester Monatsbetrag.“ Beantwortet die Frage „und danach?“, nutzt die Hostinger-Partnerschaft und bringt wiederkehrenden Umsatz. Aufwand S auf der Seite. Wird aus dem Badge ein Empfehlungslink, braucht er die Kennzeichnung „Werbung“ (steht schon in `site.js`).

**H9 · Fototermin als Paketbestandteil.** Das größte Inhaltsproblem kleiner Betriebe sind Bilder. „Ich komme vorbei und fotografiere Betrieb, Team und Arbeit“ als Teil von Professional. Löst nebenbei dein Platzhalterproblem: Die ersten echten Fotos kommen aus Pilotprojekten, nicht aus erfundenen Welten. Aufwand: geschäftlich.

**H10 · Akquise mit Einzelstudien.** Sobald Studien eigene Adressen haben (Grundsatzfrage 1, Variante C): Postkarte oder kurze Mail an zehn Bäckereien im Umkreis mit QR-Code auf die Bäckerei-Studie. Die Website arbeitet dann als Werkzeug im Vertrieb, statt auf Besucher zu warten.

### Gegenposition: bei null anfangen

Wenn nur „Anfragen kleiner Betriebe aus der Region“ zählt, baue ich **eine Seite und drei Studien**, in vier Tagen aus vorhandenen Teilen.

Oben ein Foto von dir neben dem Satz „Ich baue Websites für Betriebe im Landkreis Schwandorf. Festpreis ab 999 €.“ Darunter zwei gleich große Knöpfe: Anrufen und Schreiben. Kein Übergang, kein Pin, sechs Bildschirme.

Dann drei Studien als Karten – Bau, Barbershop, Bäckerei –, jede öffnet als eigene kleine Website. Darunter der Kunden-Test mit dem Handwerker-Fall, weil er als Einziges Nutzen zeigt. Dann Preise mit „drin / nicht drin / danach“, vier Schritte Ablauf, acht echte Fragen, das Formular mit Rückruf-Option.

Die Gestaltung bleibt die der jetzigen Startseite: Archivo, Leinen, Orange, Maßlinien. Was wegfällt, ist alles, was Zeit kostet und niemand vermisst: 64 Bildschirme, neun Übergänge, sechs unfertige Welten.

Dazu außerhalb der Seite: Google-Unternehmensprofil, drei Pilotkunden, deren Bewertungen dort landen. Die Seite wäre weniger beeindruckend für Designer und deutlich wirksamer für den Elektromeister.

---

## 8. Livegang-Check

**Muss vor Livegang (oder sofort, falls `main` schon live ist)**
- Platzhalter Logfile-Dauer in der Datenschutzerklärung ersetzen (F1)
- Fotografen-Briefing aus allen Bildplatzhaltern entfernen; Welten 05 und 09 ausblenden (A3)
- Überschriftenschrift Welt 06–09 reparieren (C1)
- `.htaccess`, HTTPS, Header und Formularversand auf dem echten Server testen [aus deiner Liste, von mir nicht prüfbar]
- GitHub Pages abschalten [aus deiner Liste]
- Namensrecherche für die Studiennamen, die sichtbar bleiben (F3)

**Sollte bald danach**
- „Über mich“ einschalten (A1), Telefon und Rückruf (A2)
- Kopfzeile am Desktop sichtbar halten (B2)
- Übergänge der Startseite kürzen (B1)
- Leistungen und FAQ ausbauen (A5)
- Branchenseiten anbinden, Formular statt `mailto:` (B3)
- Rechtsprüfung der Texte (F2)
- Test auf zwei echten Handys, einmal mit VoiceOver

**Kann warten**
- Fotos für Welt 01, 04, 07
- Studien als Einzelseiten (Grundsatzfrage 1, Variante C)
- Orange vereinheitlichen (C4), H1-Leerzeichen (E4), 404 (B6)
- Statistik mit Einwilligung

---

## 9. Top-10-Maßnahmen nach Wirkung auf Anfragen

| Nr. | Maßnahme | Aufwand |
| --- | --- | --- |
| 1 | „Über mich“ einschalten: Foto, Werdegang, Nebenberuf als Versprechen (A1, H3) | S–M |
| 2 | Telefonnummer mit Zeiten, „Anrufen“ am Handy, Kurzformular Rückruf (A2) | S |
| 3 | `/welten` aufräumen: kein Briefingtext, nur fertige Welten zeigen, Claim anpassen (A3, A4, Grundsatzfrage 1 B) | M |
| 4 | Drei Pilotkunden ausschreiben und als Fallstudien zeigen (H2) | L |
| 5 | Leistungen: „drin / nicht drin / danach“, FAQ mit Zahlen, Entwurf-vor-Zahlung prüfen (A5, H7) | M |
| 6 | Übergänge kürzen: N-Blende und P-Iris auf höchstens einen halben Bildschirm; mobil auf `/welten` halbieren (B1, D1) | M |
| 7 | Überschriftenschrift Welt 06–09 (C1) | S |
| 8 | Branchenseiten: Einstieg von Startseite und Leistungen, Formular statt `mailto:`, Ort in Titel und Text (B3, E3) | M |
| 9 | Kopfzeile oder Anfrage-Knopf am Desktop dauerhaft sichtbar (B2) | S |
| 10 | Kunden-Test um den Handwerker-Fall erweitern (H5) | M |

---

## 10. Merge-Empfehlung

**Ja, `claude/premium-feinschliff` nach `main` mergen.**

Begründung: 33 Dateien (ohne Screenshots), 372 Zeilen dazu, 95 weg; keine Strukturänderung. Jede Änderung, die ich nachvollziehen konnte, ist eine Verbesserung: Leistungen führt ins Formular statt in `mailto:`, lange Firmennamen brechen sauber, Touch-Verhalten, `/welten` zeigt den Werkplan sofort, N-Blende mobil kürzer. Seitenlänge und Abschnittspositionen sind gegenüber `main` praktisch gleich (Startseite mobil 16,6 statt 16,8 Bildschirme, `/welten` 64,6 in beiden). axe 0 Verstöße, kein Überlauf.

Bedingungen: keine, die den Merge aufhalten. Die Punkte F1, A3 und C1 betreffen `main` genauso; sie gehören in einen direkt folgenden Commit, nicht vor den Merge. Vor dem Push einmal `tools/check-site.cjs dist` vollständig laufen lassen – bei mir lief es in das Zeitlimit meiner Umgebung und ist deshalb nicht bestätigt.

---

## 11. Nicht geprüft

| Was | Warum | So holst du es nach |
| --- | --- | --- |
| Live-Seite np-webdesign.de, HTTP-Header, HSTS, `Set-Cookie` | Domain aus dieser Umgebung nicht erreichbar | `curl -I https://np-webdesign.de` und securityheaders.com |
| Welcher Stand wirklich live ist | wie oben | Seitenquelltext live mit Branch `deploy` vergleichen |
| Eigener Build (`npm ci && npm run build`) | npm-Registry gesperrt; geprüft wurden die CI-Builds | lokal bauen; CI tut es ohnehin |
| `tools/check-site.cjs`, `tools/check-transitions.cjs` | check-site lief ins Zeitlimit; check-transitions nicht gestartet | lokal ausführen |
| Echte Geräte: Adressleiste, `svh`/`lvh`, Ruckeln, Daumenzone, Wischen in Welt 05 | nur Headless-Chromium | iPhone und ein günstiges Android, `/` und `/welten` |
| Safari und Firefox | nur Chromium | je einmal durchscrollen |
| Screenreader (VoiceOver, NVDA) | kein Zugriff | Startseite und zwei Welten vorlesen lassen |
| Zoom 200 % | nur über schmale Viewports angenähert | Browser-Zoom am Desktop |
| Tablet-Layout (768 px) | nur auf Überlauf gemessen, nicht angesehen | iPad oder Browserfenster auf 768 px |
| Lighthouse selbst | nicht ausgeführt; Werte aus `vorschau-build` übernommen | PageSpeed Insights auf der Live-Adresse |
| INP, Felddaten | brauchen echte Nutzer | Search Console nach einigen Wochen |
| Mail-Zustellung, SPF/DKIM/DMARC | lokal schlägt der Versand erwartungsgemäß fehl (502, Fehlermeldung erscheint korrekt) | Testanfrage live, Header der Mail ansehen |
| Markenrecherche, rechtliche Bewertung | nicht meine Aufgabe und nicht durchgeführt | DPMA-Register, EUIPO, Handelsregister; Texte zum Anwalt |
| Screenshots unter `docs/screens/` | durch eigene Aufnahmen ersetzt | – |
| Google-Unternehmensprofil, Sichtbarkeit in der Suche | nicht geprüft | Suche nach „Webdesign Schwandorf“ |

---

## 12. Fragen an Niklas

1. Gibt es schon ein bezahltes oder fertiges Projekt, das du zeigen dürftest? Mit einer echten Referenz steigt A sofort um zwei Noten, und Punkt 4 der Top 10 wird kleiner.
2. Läuft `main` tatsächlich öffentlich – mit Datenschutz-Platzhalter und Bildplatzhaltern? Dann sind F1 und A3 keine Aufgaben vor dem Livegang, sondern für heute Abend.
3. Zu welchen Zeiten bist du telefonisch erreichbar, und wie viele Projekte schaffst du parallel? Davon hängen A2, H3 und die Zusage „2 Werktage“ ab.
4. Hast du realistischen Zugang zu den Motiven der Fotoliste (Oldtimer-Werkstatt, Frästeil, Landgasthof am See)? Wenn ja, ändert sich A4 und die Rangliste der Welten.
5. Ist der Mittelständler mit 40 Mitarbeitern ein Kunde, den du willst? Wenn ja, braucht es eine andere Seite für ihn; wenn nein, kann TORQUEL gehen.

---

**Würde ich als Handwerksbetrieb aus der Region über diese Seite eine Anfrage stellen? Nein – ich sähe gute Gestaltung, aber weder den Menschen, dem ich den Auftrag gebe, noch einen Betrieb, bei dem es schon geklappt hat, noch eine Nummer, die ich anrufen kann.**
