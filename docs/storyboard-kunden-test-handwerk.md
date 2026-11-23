# Storyboard „Der Kunden-Test“, zweiter Fall „Handwerk“

Stand: 23. November 2026. **Entwurf, wartet auf Freigabe von Niklas.** Gebaut wird erst nach seinem Okay (Auftrag vom 13. November 2026, 3.7).

Standbilder: `docs/screens/kunden-test-handwerk/` (`uebersicht.png`, `m1.png` bis `m4.png`). Sie sind echtes HTML und CSS (Quelle `scripts/storyboard/kunden-test-handwerk.html`) und gelten für Desktop und Handy gleichermaßen, weil der Fall ein Handy-Fall ist. Auf dem Desktop läuft er in zwei Handykarten nebeneinander (wie „Am Handy“ beim Barbershop).

## Der Fall
Samstagabend, 18:40. Die Heizung ist kalt. Der Kunde sucht den Notdienst und hat nur das Handy in der Hand. Der Betrieb ist **erfunden und ohne Kunstnamen**: „Heizung & Sanitär · Studie“, überall als **Simulation** gekennzeichnet. Telefonnummern sind erkennbar ausgedacht (`01234 …`), kein Tipp wählt wirklich.

Umschalter über der Demo: **Barbershop | Handwerk**. Der Barbershop bleibt unverändert und ist der Start. Beide Fälle laufen mit derselben Mechanik wie `src/motion/home/kundentest.js`.

## Ablauf (eine Handykarte, Szenen nacheinander)

| Zeit | Szene | Zähler |
|---|---|---|
| 0 bis 2 s | Baukasten lädt träge (Platzhalter), ein Cookie-Banner steht davor, der Zeiger tippt „Alle akzeptieren“ | Taps 1 · Scrollen 0 × |
| 2 bis 6 s | Menü, „Service“, „Notfall“, Scrollen bis zum Seitenende: Die Notdienstnummer steht klein, rot umrandet, über der Daumenzone. Label „Nummer erst nach fünf Schritten.“ | Taps 5 · Scrollen 4 × |
| 6 bis 6,6 s | Übergang: Die Baukasten-Seite zerfällt in Blöcke und ordnet sich zur Maßarbeit neu (gestaffelt, nur transform und opacity, höchstens 600 ms) | |
| 6,6 bis 8 s | Maßarbeit: „Heizung kalt? Wir sind da.“, ein großer Knopf „Notdienst anrufen“ in der Daumenzone, ein Tipp. Label „Ein Tipp. Ein Anruf.“ | Taps 1 · Scrollen 0 × |
| danach | Auflösung: „5 Taps“ gegen „1 Tap“ und ein Satz | |

Zählregel (nur für diese beiden Demo-Fassungen): „Taps“ zählt jeden Tipp, „Scrollen“ jede Wischbewegung. Die Zahlen beschreiben nur diese Simulation und sagen nichts über echte Betriebe.

## Regeln (wie beim Barbershop)
- Nur `transform` und `opacity`. Kein Scroll-Hijacking, kein ScrollTrigger. Start einmal bei Annäherung (Sichtbarkeit), Schrift erst dann laden.
- Pause-Knopf, „Nochmal“, Tastaturbedienung, `aria-live` je Szene, Zielgrößen mindestens 44 px.
- Ruhige Ansicht und „Bewegung reduzieren“: die Standbilder der Endzustände mit Labels und Zählern.
- Platz vorab reservieren (festes Seitenverhältnis), damit nichts springt. Kein horizontaler Überlauf ab 320 px.
- Keine Fremdanfragen, nichts gespeichert, kein Cookie. Das Cookie-Banner im Baukasten ist nur ein Bild der Simulation.

## Offene Entscheidungen (bitte bestätigen oder ändern)
1. **Umschalter-Beschriftung** „Barbershop | Handwerk“ und Startfall Barbershop.
2. **Fünf Taps** im Baukasten (Banner, Menü, Service, Notfall, Seitenende). Die Zahl ist eine Annahme, damit der Weg glaubhaft lang ist. Sie gilt nur für die Demo.
3. **Kein Kundenzitat, keine Kennzahl** zu echten Betrieben im Auflösungssatz. Vorschlag: „Wer bei kalter Heizung sucht, ruft den an, bei dem die Nummer sofort da ist. Alle Zahlen beschreiben nur diese beiden Demo-Fassungen.“
4. **Fiktive Zeiten** („Rückmeldung in Minuten“, „auch am Wochenende“) stehen nur in der Simulation und sind dort als solche gekennzeichnet. Alternative: ganz weglassen.
5. **Auf dem Desktop** zwei Handykarten (Baukasten links, Maßarbeit rechts), nicht nacheinander. Auf dem Handy eine Karte, Szenen nacheinander.

## Technischer Plan (nach Freigabe)
- `src/home/KundenTest.astro`: zweiter Fall als eigene Szene (`KtBaseHandwerk`, `KtMassHandwerk`), Umschalter; Texte in einer Datei, nicht im Markup.
- `src/motion/home/kundentest.js`: Szenenliste je Fall; gleiche Steuerung (Pause, Nochmal).
- Prüfungen: `check-site`, `axe`, `check-transitions`, Aufnahmen Desktop und Handy in `docs/screens/phase-3/`.
