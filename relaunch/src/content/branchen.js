/**
 * Branchenseiten (Blueprint K, Q): Texte der drei vorhandenen Beispielkonzepte, wörtlich übernommen
 * aus den Seiten Friseur & Barber, Handwerker, Beratung & Coaching.
 * Geändert nur: keine Fremdschrift, kein Fremd-Badge, E-Mail-Adresse aus site.js.
 * Fehlt (sichtbarer Platzhalter): Screenshot und Live-Demo je Konzept.
 */
const COMMON = {
  tech: [
    { tag: 'Responsive Design' }, { tag: 'GSAP-Animationen' }, { tag: 'Datenschutz' }, { tag: 'Performance & SEO' },
  ],
  cta: { eyebrow: 'Ihr Projekt', h2: 'Bereit für eine moderne Website?', button: 'Kostenloses Erstgespräch' },
};

export const BRANCHEN = {
  'friseur-barber': {
    slug: 'friseur-barber',
    world: '02',
    title: 'Website-Konzept Friseur & Barber',
    description: 'Beispielkonzept: Wie eine moderne Website für einen hochwertigen Friseur- und Barbershop Vertrauen schafft und Terminanfragen erhöht.',
    eyebrow: 'Beispielkonzept · Friseur & Barber',
    h1: 'Wie modernes Webdesign <em>Vertrauen</em> schafft.',
    lead: 'Ein Website-Konzept für einen hochwertigen Barbershop mit Fokus auf Markenwirkung, klaren Kontaktwegen und überzeugender Nutzung auf mobilen Geräten.',
    meta: [['Branche', 'Friseur & Barber'], ['Leistung', 'Konzept, Design, Entwicklung'], ['Schwerpunkt', 'Markenwirkung & Nutzerführung'], ['Umsetzung', 'Responsive HTML, CSS & GSAP']],
    visual: { alt: 'Screenshot des Barbershop-Website-Konzepts von NP Webdesign', file: 'demo-friseur.webp' },
    ausgangssituation: [
      'Viele Friseur- und Barberbetriebe verlassen sich bei ihrem digitalen Auftritt hauptsächlich auf soziale Netzwerke. Dort stehen aktuelle Beiträge im Vordergrund, während grundlegende Informationen wie Öffnungszeiten, Leistungen, Preise und Kontaktmöglichkeiten schnell in den Hintergrund geraten.',
      'Für neue Interessenten entsteht dadurch kein klar geführter erster Kontakt. Gerade bei einem hochwertigen Salon muss die Website jedoch bereits vor dem Besuch vermitteln, <strong>welchen Anspruch, Stil und welches Erlebnis der Betrieb bietet.</strong>',
      'Das Konzept setzt deshalb nicht nur auf eine ansprechende Oberfläche, sondern auf eine klare Informationsarchitektur: relevante Inhalte werden schnell auffindbar, die Markenwelt bleibt konsistent und der Weg zur Kontaktaufnahme ist jederzeit verständlich.',
    ],
    ziele: { h2: 'Klarer Fokus auf <em>Wirkung.</em>', items: [
      ['Hochwertiger Markenauftritt', 'Positionierung'], ['Mehr qualifizierte Terminanfragen', 'Conversion'], ['Überzeugende mobile Nutzung', 'Mobile First'],
      ['Kurze und nachvollziehbare Ladewege', 'Performance'], ['Saubere Grundlage für Auffindbarkeit', 'SEO'], ['Klare Führung durch Leistungen und Kontakt', 'UX'] ] },
    design: { h2: 'Eine visuelle Sprache mit <em>Charakter.</em>', items: [
      ['01 · Farbwelt', 'Dunkel, warm, hochwertig', 'Die dunkle Grundfläche erzeugt Ruhe und Wertigkeit. Gold- und Messingakzente führen den Blick gezielt zu Angeboten, Preisen und Handlungsaufforderungen, ohne den Auftritt dekorativ zu überladen.'],
      ['02 · Typografie', 'Handwerk trifft Präzision', 'Die markante Headline-Typografie greift die selbstbewusste Atmosphäre klassischer Barbershops auf. Eine zurückhaltende Leseschrift sorgt dafür, dass Leistungs- und Kontaktinformationen schnell erfasst werden können.'],
      ['03 · Nutzerführung', 'Vertrauen vor Aktion', 'Die Seite führt vom ersten Markenversprechen über Leistungen und Preise bis zum Kontakt — bevor der Nutzer gezielt zur Terminvereinbarung geführt wird.'] ] },
    tech: [
      ['Responsive Design', 'Auf jedem Gerät klar', 'Flexible Raster, skalierende Typografie und angepasste Abstände halten Inhalte auf Smartphone, Tablet und Desktop verständlich.'],
      ['GSAP-Animationen', 'Bewegung mit Funktion', 'Dezente Reveals unterstützen die visuelle Hierarchie, statt Aufmerksamkeit vom Angebot abzuziehen.'],
      ['Datenschutz', 'Bewusst reduziert', 'Das Konzept vermeidet unnötige Tracking- und Marketing-Skripte. Externe Dienste würden bei einer produktiven Umsetzung passend zur tatsächlichen Nutzung geprüft und dokumentiert.'],
      ['Performance & SEO', 'Saubere Grundlage', 'Semantische Struktur, aussagekräftige Metadaten und schlanke Frontend-Technik schaffen eine gute Basis für schnelle Ladezeiten und Suchmaschinen.'] ],
    nutzen: [
      ['Professioneller erster Eindruck', 'Die Gestaltung vermittelt bereits vor dem ersten Termin einen klaren Qualitätsanspruch.'],
      ['Höhere Glaubwürdigkeit', 'Leistungen, Preise und Kontaktinformationen erscheinen strukturiert und nachvollziehbar.'],
      ['Bessere Nutzerführung', 'Besucher finden schnell die Informationen, die für ihre Entscheidung wichtig sind.'],
      ['Leichtere Kontaktaufnahme', 'Klare Handlungsaufforderungen reduzieren unnötige Wege bis zur Anfrage.'],
      ['Stärkere Markenwirkung', 'Farbe, Typografie und Sprache ergeben einen eigenständigen, wiedererkennbaren Auftritt.'],
      ['Moderne Außenwirkung', 'Der digitale Auftritt unterstützt die Positionierung eines zeitgemäßen, qualitätsbewussten Salons.'] ],
    vergleich: [
      { eyebrow: 'Typischer Ausgangspunkt', h3: 'Informationen ohne klare Markenwirkung.', li: ['Leistungen schwer vergleichbar', 'Kontaktweg nicht priorisiert', 'Uneinheitliche visuelle Sprache', 'Mobile Darstellung nur mitgedacht'] },
      { eyebrow: 'NP Webdesign Konzept', h3: 'Ein Auftritt, der Qualität sichtbar macht.', li: ['Klare Struktur für Leistungen und Preise', 'Gezielte Führung zur Terminanfrage', 'Eigenständige Markenwelt', 'Responsive Nutzung von Anfang an'] },
    ],
    cta: { ...COMMON.cta, text: 'Gemeinsam entwickeln wir einen professionellen Webauftritt, der Ihre Marke stärkt und neue Kunden überzeugt.', subject: 'Projektanfrage Friseur-Website', body: 'Hallo Niklas,\n\nich interessiere mich für eine Website für meinen Salon.\n\nMein Projekt:\n\nViele Grüße' },
  },

  handwerker: {
    slug: 'handwerker',
    world: '03',
    title: 'Website-Konzept Handwerker',
    description: 'Beispielkonzept: Wie eine moderne Website für einen Handwerksbetrieb Vertrauen aufbaut und Anfragen über Referenzen und klare Leistungen erhöht.',
    eyebrow: 'Beispielkonzept · Handwerker',
    h1: 'Solides Handwerk <em>sichtbar</em> gemacht.',
    lead: 'Ein Website-Konzept für einen Handwerksbetrieb mit Fokus auf Vertrauen durch Referenzen, eine klare Leistungsübersicht und einen kurzen Weg zur Anfrage.',
    meta: [['Branche', 'Handwerksbetrieb'], ['Leistung', 'Konzept, Design, Entwicklung'], ['Schwerpunkt', 'Vertrauen & Referenzen'], ['Umsetzung', 'Responsive HTML, CSS & GSAP']],
    visual: { alt: 'Screenshot des Handwerker-Website-Konzepts von NP Webdesign', file: 'demo-handwerker.webp' },
    ausgangssituation: [
      'Handwerksbetriebe leben von Empfehlungen und sichtbarer Arbeitsqualität — doch viele Websites der Branche zeigen davon wenig. Häufig fehlen Referenzprojekte, die Leistungsübersicht ist unübersichtlich, und ein direkter Kontaktweg ist schwer zu finden.',
      'Interessenten, die online nach einem Betrieb suchen, entscheiden oft innerhalb von Sekunden, ob sie Vertrauen fassen. <strong>Genau dieses Vertrauen muss die Website in kurzer Zeit vermitteln können.</strong>',
      'Das Konzept setzt deshalb auf eine technisch anmutende, präzise Bildsprache — angelehnt an Bauzeichnungen — die Sorgfalt und Fachkompetenz sofort erkennbar macht, kombiniert mit einer klaren Struktur aus Leistungen, Referenzen und Kontakt.',
    ],
    ziele: { h2: 'Klarer Fokus auf <em>Vertrauen.</em>', items: [
      ['Sichtbare Referenzprojekte', 'Beweisführung'], ['Mehr qualifizierte Anfragen', 'Conversion'], ['Verständliche Leistungsübersicht', 'Struktur'],
      ['Direkter, kurzer Kontaktweg', 'UX'], ['Saubere Grundlage für Auffindbarkeit', 'SEO'], ['Überzeugende mobile Nutzung', 'Mobile First'] ] },
    design: { h2: 'Präzision als <em>Gestaltungsprinzip.</em>', items: [
      ['01 · Bildsprache', 'Technische Zeichnung statt Stockfoto', 'Feine Linien, Maßangaben und eine Bauplan-Ästhetik übersetzen handwerkliche Präzision direkt in die Gestaltung — ohne auf austauschbare Baustellenfotos zurückzugreifen.'],
      ['02 · Typografie', 'Klar, technisch, gut lesbar', 'Eine reduzierte, technisch wirkende Typografie unterstützt die Wahrnehmung von Fachkompetenz und Genauigkeit.'],
      ['03 · Nutzerführung', 'Referenzen vor Versprechen', 'Die Seite zeigt Referenzprojekte prominent, bevor sie zur Kontaktaufnahme führt — Vertrauen entsteht durch Belege, nicht durch Behauptungen.'] ] },
    tech: [
      ['Responsive Design', 'Auf jedem Gerät klar', 'Flexible Raster und angepasste Abstände halten Referenzprojekte und Leistungen auf jedem Bildschirm verständlich.'],
      ['GSAP-Animationen', 'Bewegung mit Funktion', 'Dezente Reveals unterstützen die visuelle Hierarchie, statt vom Inhalt abzulenken.'],
      ['Datenschutz', 'Bewusst reduziert', 'Das Konzept vermeidet unnötige Tracking- und Marketing-Skripte. Externe Dienste würden bei einer produktiven Umsetzung passend zur tatsächlichen Nutzung geprüft und dokumentiert.'],
      ['Performance & SEO', 'Saubere Grundlage', 'Semantische Struktur und schlanke Frontend-Technik schaffen eine gute Basis für schnelle Ladezeiten und lokale Auffindbarkeit.'] ],
    nutzen: [
      ['Sofort sichtbare Fachkompetenz', 'Referenzprojekte belegen die Arbeitsqualität, statt sie nur zu behaupten.'],
      ['Weniger unpassende Anfragen', 'Eine klare Leistungsübersicht filtert Anfragen vor, die nicht zum Angebot passen.'],
      ['Kürzerer Weg zur Anfrage', 'Ein direkter, gut sichtbarer Kontaktweg reduziert Abbrüche.'],
      ['Eigenständige Markenwirkung', 'Die Bauplan-Ästhetik unterscheidet den Auftritt sichtbar von generischen Handwerker-Websites.'],
      ['Bessere Auffindbarkeit', 'Saubere technische Grundlage unterstützt die lokale Sichtbarkeit in Suchmaschinen.'],
      ['Zeitgemäße Außenwirkung', 'Der digitale Auftritt unterstützt die Positionierung als moderner, verlässlicher Betrieb.'] ],
    vergleich: [
      { eyebrow: 'Typischer Ausgangspunkt', h3: 'Leistungen ohne sichtbare Beweise.', li: ['Keine oder schwer auffindbare Referenzen', 'Leistungsumfang unklar', 'Kontaktweg versteckt', 'Mobile Darstellung nur mitgedacht'] },
      { eyebrow: 'NP Webdesign Konzept', h3: 'Ein Auftritt, der Vertrauen belegt.', li: ['Referenzprojekte im Zentrum', 'Klare, vergleichbare Leistungsübersicht', 'Direkter Kontaktweg', 'Responsive Nutzung von Anfang an'] },
    ],
    cta: { ...COMMON.cta, text: 'Gemeinsam entwickeln wir einen professionellen Webauftritt, der Ihre Arbeit sichtbar macht und neue Aufträge bringt.', subject: 'Projektanfrage Handwerker-Website', body: 'Hallo Niklas,\n\nich interessiere mich für eine Website für meinen Betrieb.\n\nMein Projekt:\n\nViele Grüße' },
  },

  'beratung-coaching': {
    slug: 'beratung-coaching',
    world: '06',
    title: 'Website-Konzept Beratung & Coaching',
    description: 'Beispielkonzept: Wie eine ruhige, klar positionierte Website für Beratung und Coaching Expertise vermittelt und Erstgespräche generiert.',
    eyebrow: 'Beispielkonzept · Beratung & Coaching',
    h1: 'Klarheit, die <em>Vertrauen</em> schafft.',
    lead: 'Ein Website-Konzept für Beratung und Coaching mit Fokus auf klare Positionierung, eine ruhige Bildsprache und einen niedrigschwelligen Weg zum Erstgespräch.',
    meta: [['Branche', 'Beratung & Coaching'], ['Leistung', 'Konzept, Design, Entwicklung'], ['Schwerpunkt', 'Positionierung & Klarheit'], ['Umsetzung', 'Responsive HTML, CSS & GSAP']],
    visual: { alt: 'Screenshot des Beratungs- und Coaching-Website-Konzepts von NP Webdesign', file: 'demo-beratung.webp' },
    ausgangssituation: [
      'Beratungs- und Coaching-Angebote sind oft schwer greifbar — Interessenten wissen häufig nicht genau, wofür eine Person steht und für wen das Angebot wirklich gedacht ist. Websites der Branche verlieren sich dadurch schnell in allgemeinen Aussagen statt einer klaren Positionierung.',
      'Gerade bei einer Dienstleistung, die stark von der beratenden Person abhängt, muss die Website <strong>innerhalb weniger Sekunden Klarheit über Haltung, Methode und Zielgruppe schaffen.</strong>',
      'Das Konzept setzt deshalb auf eine ruhige, reduzierte Bildsprache mit einem wiederkehrenden Kreis-Motiv, das den Beratungsprozess visuell nachvollziehbar macht, statt ihn nur zu beschreiben.',
    ],
    ziele: { h2: 'Klarer Fokus auf <em>Positionierung.</em>', items: [
      ['Eindeutige fachliche Positionierung', 'Klarheit'], ['Mehr angefragte Erstgespräche', 'Conversion'], ['Nachvollziehbarer Beratungsprozess', 'Struktur'],
      ['Persönliche, glaubwürdige Wirkung', 'Vertrauen'], ['Saubere Grundlage für Auffindbarkeit', 'SEO'], ['Überzeugende mobile Nutzung', 'Mobile First'] ] },
    design: { h2: 'Ruhe als <em>Gestaltungsprinzip.</em>', items: [
      ['01 · Farbwelt', 'Warm, zurückhaltend, persönlich', 'Weiche, warme Farbverläufe erzeugen Nähe und Ruhe — passend zu einer Dienstleistung, die auf Vertrauen und persönlichem Austausch beruht.'],
      ['02 · Bildsprache', 'Der Prozess als Kreis', 'Ein wiederkehrendes Kreis-Motiv macht den Beratungsablauf — Ausgangspunkt, Reflexion, Ziel, Umsetzung — visuell nachvollziehbar, statt ihn nur in Textform zu erklären.'],
      ['03 · Nutzerführung', 'Positionierung vor Angebot', 'Die Seite klärt zunächst Haltung und Zielgruppe, bevor sie konkrete Angebote und das Erstgespräch in den Vordergrund stellt.'] ] },
    tech: [
      ['Responsive Design', 'Auf jedem Gerät klar', 'Flexible Raster und ruhige Übergänge halten die Positionierung auf jedem Bildschirm klar erkennbar.'],
      ['GSAP-Animationen', 'Bewegung mit Funktion', 'Sanfte Reveals unterstreichen den ruhigen Charakter des Auftritts, statt Aufmerksamkeit vom Inhalt abzuziehen.'],
      ['Datenschutz', 'Bewusst reduziert', 'Das Konzept vermeidet unnötige Tracking- und Marketing-Skripte. Externe Dienste würden bei einer produktiven Umsetzung passend zur tatsächlichen Nutzung geprüft und dokumentiert.'],
      ['Performance & SEO', 'Saubere Grundlage', 'Semantische Struktur und schlanke Frontend-Technik schaffen eine gute Basis für schnelle Ladezeiten und Auffindbarkeit.'] ],
    nutzen: [
      ['Sofortige Klarheit', 'Besucher verstehen innerhalb von Sekunden, für wen das Angebot gedacht ist.'],
      ['Höhere Passgenauigkeit der Anfragen', 'Klare Positionierung filtert Anfragen vor, die nicht zur Zielgruppe passen.'],
      ['Nachvollziehbarer Ablauf', 'Der visualisierte Beratungsprozess nimmt Unsicherheit vor dem ersten Kontakt.'],
      ['Persönlichere Wirkung', 'Die ruhige Bildsprache unterstützt eine glaubwürdige, nahbare Außendarstellung.'],
      ['Bessere Auffindbarkeit', 'Saubere technische Grundlage unterstützt die Sichtbarkeit in Suchmaschinen.'],
      ['Zeitgemäße Außenwirkung', 'Der digitale Auftritt unterstützt die Positionierung als moderne, vertrauenswürdige Anlaufstelle.'] ],
    vergleich: [
      { eyebrow: 'Typischer Ausgangspunkt', h3: 'Angebot ohne klare Zielgruppe.', li: ['Allgemeine Aussagen ohne Positionierung', 'Beratungsprozess unklar', 'Erstgespräch schwer zu finden', 'Mobile Darstellung nur mitgedacht'] },
      { eyebrow: 'NP Webdesign Konzept', h3: 'Ein Auftritt, der Haltung zeigt.', li: ['Klare fachliche Positionierung', 'Visualisierter Beratungsprozess', 'Direkter Weg zum Erstgespräch', 'Responsive Nutzung von Anfang an'] },
    ],
    cta: { ...COMMON.cta, text: 'Gemeinsam entwickeln wir einen professionellen Webauftritt, der Ihre Positionierung schärft und mehr Erstgespräche bringt.', subject: 'Projektanfrage Beratung-Coaching-Website', body: 'Hallo Niklas,\n\nich interessiere mich für eine Website für meine Praxis.\n\nMein Projekt:\n\nViele Grüße' },
  },
};

export const BRANCHEN_LIST = Object.values(BRANCHEN);
