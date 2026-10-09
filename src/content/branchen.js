/**
 * Branchenseiten (Blueprint K, Q): Texte der drei vorhandenen Beispielkonzepte, wörtlich übernommen
 * aus den Seiten Friseur & Barber, Handwerker, Beratung & Coaching.
 * Die Seite Bäckerei ist neu geschrieben (Oktober 2026) nach dem Aufbau der Welt 01 und der Blueprint; sie hat zusätzlich
 * eine Checkliste und drei Branchen-FAQ (Blueprint Q). Texte vor dem Livegang von Niklas prüfen lassen.
 * Geändert nur: keine Fremdschrift, kein Fremd-Badge, E-Mail-Adresse aus site.js.
 * Screenshots und Live-Demos bleiben vorerst weg (Entscheidung von Niklas).
 */
const COMMON = {
  tech: [
    { tag: 'Responsive Design' }, { tag: 'GSAP-Animationen' }, { tag: 'Datenschutz' }, { tag: 'Performance & SEO' },
  ],
  cta: { eyebrow: 'Ihr Projekt', h2: 'Bereit für eine moderne Website?', button: 'Kostenloses Erstgespräch' },
};

export const BRANCHEN = {
  baeckerei: {
    slug: 'baeckerei',
    world: '01',
    title: 'Website-Konzept Bäckerei',
    description: 'Beispielkonzept: Wie eine Website für eine Handwerksbäckerei Frische, Handwerk und Öffnungszeiten sichtbar macht und die Vorbestellung erleichtert.',
    eyebrow: 'Beispielkonzept · Bäckerei',
    h1: 'Eine Bäckerei verkauft <em>Duft.</em>',
    lead: 'Ein Website-Konzept für eine Handwerksbäckerei: Fotografie statt Floskeln, ein Backplan, der zeigt, was wann frisch ist, und ein kurzer Weg zur Vorbestellung.',
    meta: [['Branche', 'Handwerksbäckerei'], ['Leistung', 'Konzept, Bildkonzept, Entwicklung'], ['Schwerpunkt', 'Bildsprache & Vorbestellung'], ['Umsetzung', 'Responsive HTML, CSS & GSAP']],
    visual: null, // Screenshot des Konzepts: folgt mit der Demo
    ausgangssituation: [
      'Viele Bäckereien zeigen sich online vor allem über ein Google-Profil und soziale Netzwerke. Dort stehen Öffnungszeiten, Sortiment und Bilder nebeneinander, aber ohne eigene Handschrift. Wo es eine Website gibt, besteht sie oft aus austauschbaren Stockfotos, und die Öffnungszeiten stehen irgendwo im Kleingedruckten.',
      'Dabei verkauft eine Bäckerei Duft, Frische und Handwerk — und das lässt sich schlecht in Worten erklären. <strong>Die Website muss es zeigen, bevor jemand den Laden betritt.</strong>',
      'Das Konzept setzt deshalb auf Fotografie statt Text: Makroaufnahmen von Krume, Mehlstaub und Händen tragen die Aussage. Ein Backplan von Montag bis Samstag zeigt, was wann frisch ist, die Teigführung macht die Arbeit hinter dem Brot sichtbar, und ein Vorbestell-Bon führt kurz zur Anfrage.',
    ],
    ziele: { h2: 'Klarer Fokus auf <em>Frische.</em>', items: [
      ['Handwerk sichtbar machen', 'Bildsprache'], ['Mehr Vorbestellungen', 'Conversion'], ['Backplan und Öffnungszeiten sofort auffindbar', 'Information'],
      ['Überzeugende mobile Nutzung', 'Mobile First'], ['Saubere Grundlage für lokale Auffindbarkeit', 'SEO'], ['Wiedererkennbare Marke vor Ort und online', 'Marke'] ] },
    design: { h2: 'Eine Gestaltung, die <em>nach Backstube aussieht.</em>', items: [
      ['01 · Farbwelt', 'Mehl, Kruste, Roggen', 'Ein warmer, mehlig heller Grund, krustenbrauner Text und ein Roggenton als Akzent erzeugen Nähe und Wärme. Ein Zwetschgenviolett erscheint nur dort, wo es saisonal passt.'],
      ['02 · Typografie', 'Weiche Serifenschrift mit Charakter', 'Eine variable Serifenschrift wirkt handgemacht. Beim Eintritt wird sie weicher, so wie Teig aufgeht. Die Fließschrift bleibt ruhig und gut lesbar.'],
      ['03 · Nutzerführung', 'Zeigen vor Sagen', 'Die Seite führt vom Produkt über Backplan und Öffnungszeiten zur Vorbestellung. Die Texte bleiben kurz, die Fotos tragen die Aussage.'] ] },
    tech: [
      ['Responsive Design', 'Auf jedem Gerät klar', 'Flexible Raster und skalierende Typografie halten Backplan, Öffnungszeiten und Bilder auf Smartphone, Tablet und Desktop verständlich.'],
      ['GSAP-Animationen', 'Bewegung mit Funktion', 'Bilder gehen beim Eintritt sanft auf und unterstreichen den Gedanken des Aufgehens, ohne vom Sortiment abzulenken.'],
      ['Datenschutz', 'Bewusst reduziert', 'Das Konzept vermeidet unnötige Tracking- und Marketing-Skripte. Externe Dienste würden bei einer produktiven Umsetzung passend zur tatsächlichen Nutzung geprüft und dokumentiert.'],
      ['Performance & SEO', 'Saubere Grundlage', 'Bilder in passender Größe, semantische Struktur und klar ausgezeichnete Öffnungszeiten schaffen eine gute Basis für schnelle Ladezeiten und die lokale Suche.'] ],
    nutzen: [
      ['Appetit auf den ersten Blick', 'Eigene Fotografie weckt Vertrauen und Lust auf den Besuch, bevor ein Wort gelesen wird.'],
      ['Weniger Rückfragen', 'Öffnungszeiten, Backplan und Sortiment sind dort zu finden, wo Besucher sie erwarten.'],
      ['Einfachere Vorbestellung', 'Ein kurzer, klarer Weg zur Anfrage senkt die Hürde, größere Bestellungen aufzugeben.'],
      ['Wiedererkennbare Marke', 'Farbe, Schrift und Bildsprache ergeben einen eigenständigen Auftritt, der sich von Ketten und Stockfoto-Seiten abhebt.'],
      ['Bessere Auffindbarkeit', 'Eine saubere technische Grundlage unterstützt die Sichtbarkeit in der lokalen Suche.'],
      ['Zeitgemäße Außenwirkung', 'Der digitale Auftritt unterstützt die Positionierung als Betrieb mit Handwerk und Anspruch.'] ],
    vergleich: [
      { eyebrow: 'Typischer Ausgangspunkt', h3: 'Stockfotos und versteckte Öffnungszeiten.', li: ['Austauschbare Bilder statt eigener Fotos', 'Öffnungszeiten und Sortiment schwer zu finden', 'Vorbestellung nur per Anruf', 'Mobile Darstellung nur mitgedacht'] },
      { eyebrow: 'NP Webdesign Konzept', h3: 'Ein Auftritt, der Frische sichtbar macht.', li: ['Eigene Bildsprache aus der Backstube', 'Backplan und Öffnungszeiten auf einen Blick', 'Klarer Weg zur Vorbestellung', 'Responsive Nutzung von Anfang an'] },
    ],
    checkliste: { h2: 'Was eine Bäckerei-Website <em>leisten muss.</em>', intro: 'Eine kurze Checkliste für den Start, unabhängig davon, wer die Seite baut.', items: [
      'Öffnungszeiten, Adresse und Telefonnummer stehen ohne Klick auf der Startseite und stimmen überall überein: Website, Google-Profil, Verzeichnisse.',
      'Das Sortiment zeigt echte Fotos der eigenen Backwaren, keine Stockbilder.',
      'Wechselnde Angebote wie Saisonware und Tagesbrote lassen sich einfach pflegen.',
      'Vorbestellungen und Anfragen für größere Mengen haben einen kurzen, klaren Weg.',
      'Pflichtangaben wie Allergenhinweise sind geprüft und dort zu finden, wo sie gebraucht werden.',
      'Die Seite lädt auf dem Smartphone schnell, auch bei schwachem Netz.',
      'Karten, Videos und Social-Feeds laden nicht ungefragt Inhalte von Dritten, sondern erst nach einem Klick oder als normaler Link.',
    ] },
    faq: [
      ['Braucht eine Bäckerei eine eigene Website, wenn es ein Google-Profil gibt?', 'Das Profil zeigt das Wichtigste, aber keine Handschrift. Die eigene Website ist der Ort, an dem Bilder, Backplan, Vorbestellung und die Geschichte des Betriebs so erscheinen, wie Sie es wollen. Und sie gehört Ihnen.'],
      ['Kann ich Tagesangebote und Öffnungszeiten selbst ändern?', 'Das legen wir im Konzept fest. Für Inhalte, die sich oft ändern, planen wir von Anfang an einen einfachen Weg ein. Ein Redaktionssystem gehört zum Premium-Paket.'],
      ['Wie kommen die Fotos zustande?', 'Fotos sind das Herz einer Bäckerei-Seite. Ich erstelle vorab ein Bildkonzept und ein Briefing für das Fotografieren: Motive, Licht und Details wie Krume und Mehlstaub. Aufgenommen werden die Bilder von Ihnen oder einem Fotografen; die Bildrechte klären wir vorher.'],
    ],
    cta: { ...COMMON.cta, text: 'Gemeinsam entwickeln wir einen Webauftritt, der Ihr Handwerk sichtbar macht und die Vorbestellung leichter macht.', subject: 'Projektanfrage Bäckerei-Website', body: 'Hallo Niklas,\n\nich interessiere mich für eine Website für meine Bäckerei.\n\nMein Projekt:\n\nViele Grüße' },
  },

  'friseur-barber': {
    slug: 'friseur-barber',
    world: '02',
    title: 'Website-Konzept Friseur & Barber',
    description: 'Beispielkonzept: Wie eine moderne Website für einen hochwertigen Friseur- und Barbershop Vertrauen schafft und Terminanfragen erhöht.',
    eyebrow: 'Beispielkonzept · Friseur & Barber',
    h1: 'Wie modernes Webdesign <em>Vertrauen</em> schafft.',
    lead: 'Ein Website-Konzept für einen hochwertigen Barbershop mit Fokus auf Markenwirkung, klaren Kontaktwegen und überzeugender Nutzung auf mobilen Geräten.',
    meta: [['Branche', 'Friseur & Barber'], ['Leistung', 'Konzept, Design, Entwicklung'], ['Schwerpunkt', 'Markenwirkung & Nutzerführung'], ['Umsetzung', 'Responsive HTML, CSS & GSAP']],
    visual: null, // Screenshot des Konzepts: folgt mit der Demo
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
    visual: null, // Screenshot des Konzepts: folgt mit der Demo
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
    visual: null, // Screenshot des Konzepts: folgt mit der Demo
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
  kanzlei: {
    slug: 'kanzlei',
    world: '04',
    title: 'Website-Konzept Kanzlei und Steuerberatung',
    description: 'Beispielkonzept: Wie eine Website für Kanzlei und Steuerberatung mit Typografie, klarer Struktur und verständlichen Texten Urteilsvermögen zeigt und Mandate anbahnt.',
    eyebrow: 'Beispielkonzept · Kanzlei und Steuerberatung',
    h1: 'Eine Kanzlei verkauft <em>Urteilsvermögen.</em>',
    lead: 'Ein Website-Konzept für Kanzlei und Steuerberatung: Typografie wie in einer guten Wirtschaftszeitung, ein Themenregister statt Leistungsfloskeln und Texte, die man ohne Wörterbuch versteht.',
    meta: [['Branche', 'Kanzlei und Steuerberatung'], ['Leistung', 'Konzept, Texte, Inhaltsstruktur, Entwicklung'], ['Schwerpunkt', 'Typografie & Verständlichkeit'], ['Umsetzung', 'Responsive HTML, CSS & GSAP']],
    visual: null, // Konzeptbild kommt aus der gebauten Welt (public/images/branche)
    ausgangssituation: [
      'Viele Kanzleien und Steuerberatungen zeigen sich online mit einer Liste von Rechtsgebieten, einem Foto vom Besprechungstisch und dem Satz, man sei „kompetent und engagiert“. Das stimmt vermutlich, unterscheidet aber niemanden von den Kollegen nebenan.',
      'Dabei verkaufen diese Betriebe kein Produkt, sondern Urteilsvermögen — und das lässt sich nicht behaupten, sondern nur zeigen. <strong>Die Website muss Sorgfalt erkennen lassen, bevor das erste Gespräch stattfindet.</strong>',
      'Das Konzept setzt deshalb auf Typografie und Text: ein ruhiger Satzspiegel, ein einziger Farbakzent, Fußnoten für Details und ein Themenregister, das Besucher direkt zu ihrer Frage führt. Das Layout nimmt die Haltung der Beratung vorweg.',
    ],
    ziele: { h2: 'Klarer Fokus auf <em>Verständlichkeit.</em>', items: [
      ['Sorgfalt und Seriosität sichtbar machen', 'Vertrauen'], ['Mehr passende Mandatsanfragen', 'Conversion'], ['Themen und Zuständigkeiten sofort auffindbar', 'Struktur'],
      ['Komplexes verständlich erklären', 'Inhalt'], ['Saubere Grundlage für lokale Auffindbarkeit', 'SEO'], ['Überzeugende mobile Nutzung', 'Mobile First'] ] },
    design: { h2: 'Gestaltung, die <em>nach Sorgfalt aussieht.</em>', items: [
      ['01 · Farbwelt', 'Schwarz auf Weiß, ein Rot', 'Reinweißer Grund, druckschwarze Schrift und genau ein Rot für die Linie unter der Schlagzeile. Wo alles ruhig ist, fällt das Wichtige auf.'],
      ['02 · Typografie', 'Zeitungssatz mit Haltung', 'Eine Serifenschrift für Schlagzeile und Fließtext, Kapitälchen für Rubriken, ein dreispaltiger Leitartikel mit Initiale und Randnotizen für die Details.'],
      ['03 · Nutzerführung', 'Vom Thema zur Frage', 'Ein Themenregister führt wie ein Inhaltsverzeichnis zu Erbrecht, Gesellschaftsrecht und Steuern. Jede Rubrik nennt typische Fragen, damit Besucher sich wiederfinden.'] ] },
    tech: [
      ['Responsive Design', 'Auf jedem Gerät klar', 'Der Satzspiegel wechselt von drei Spalten auf zwei und eine. Randnotizen rücken unter den Text, ohne dass etwas verloren geht.'],
      ['GSAP-Animationen', 'Bewegung mit Funktion', 'Die Zeilen setzen sich wie Druckzeilen, die rote Linie zieht sich auf. Das ist Rhythmus, keine Show; mit „Bewegung reduzieren“ steht alles sofort da.'],
      ['Datenschutz', 'Bewusst reduziert', 'Das Konzept vermeidet unnötige Tracking- und Marketing-Skripte. Externe Dienste würden bei einer produktiven Umsetzung passend zur tatsächlichen Nutzung geprüft und dokumentiert.'],
      ['Performance & SEO', 'Saubere Grundlage', 'Schlanke Schriftdateien, semantische Überschriften und ein klar gegliedertes Themenregister schaffen eine gute Basis für schnelle Ladezeiten und die lokale Suche.'] ],
    nutzen: [
      ['Sorgfalt auf den ersten Blick', 'Ein ruhiger, präziser Auftritt zeigt die Arbeitsweise, bevor jemand anruft.'],
      ['Passendere Anfragen', 'Das Themenregister und typische Fragen führen Besucher zu der Rubrik, die zu ihrem Anliegen passt.'],
      ['Weniger Erklärbedarf im Erstgespräch', 'Verständliche Texte beantworten die häufigsten Fragen vorab.'],
      ['Wiedererkennbare Marke', 'Satzspiegel, Schrift und das eine Rot ergeben einen eigenständigen Auftritt, der sich von Standardseiten abhebt.'],
      ['Bessere Auffindbarkeit', 'Eine saubere technische Grundlage unterstützt die Sichtbarkeit in der lokalen Suche.'],
      ['Zeitgemäße Außenwirkung', 'Der digitale Auftritt unterstützt die Positionierung als moderne, vertrauenswürdige Beratung.'] ],
    vergleich: [
      { eyebrow: 'Typischer Ausgangspunkt', h3: 'Rechtsgebiete in einer Liste.', li: ['Austauschbare Floskeln statt klarer Aussagen', 'Zuständigkeiten schwer zu finden', 'Fachsprache ohne Erklärung', 'Mobile Darstellung nur mitgedacht'] },
      { eyebrow: 'NP Webdesign Konzept', h3: 'Ein Auftritt, der Sorgfalt zeigt.', li: ['Typografie als Ausdruck der Haltung', 'Themenregister als Wegweiser', 'Verständliche Texte mit Randnotizen', 'Responsive Nutzung von Anfang an'] },
    ],
    checkliste: { h2: 'Was eine Kanzlei-Website <em>leisten muss.</em>', intro: 'Eine kurze Checkliste für den Start, unabhängig davon, wer die Seite baut. Sie ersetzt keine berufsrechtliche Prüfung.', items: [
      'Berufsbezeichnung, zuständige Kammer, berufsrechtliche Regelungen und weitere Pflichtangaben stehen vollständig im Impressum. Was genau gilt, klärt der Betrieb mit seiner Kammer.',
      'Aussagen zu Leistungen und Erfolgen sind berufsrechtlich zulässig und belegbar; Werbeaussagen prüft der Betrieb vor der Veröffentlichung.',
      'Themen und Zuständigkeiten sind ohne Fachwörter beschrieben und von der Startseite aus mit einem Klick erreichbar.',
      'Ein kurzer, klarer Weg zum Erstgespräch: ein Formular, das nur abfragt, was gebraucht wird, und eine verständliche Datenschutzinformation dazu.',
      'Mandantendaten gehören nicht in ein Kontaktformular ohne Verschlüsselung; die Seite weist darauf hin und nennt einen sicheren Weg für Unterlagen.',
      'Die Seite lädt auf dem Smartphone schnell, auch bei schwachem Netz.',
      'Karten, Videos und Social-Feeds laden nicht ungefragt Inhalte von Dritten, sondern erst nach einem Klick oder als normaler Link.',
    ] },
    faq: [
      ['Darf eine Kanzlei oder Steuerberatung mit solchen Aussagen werben?', 'Für Rechtsanwälte und Steuerberater gelten berufsrechtliche Grenzen für Werbung. Ich gestalte Struktur, Texte und Auftritt; ob eine Aussage zulässig ist, prüft der Betrieb mit seiner Kammer oder einer fachkundigen Stelle, bevor die Seite online geht.'],
      ['Kann die Kanzlei Fachbeiträge selbst veröffentlichen?', 'Das legen wir im Konzept fest. Für Beiträge, die regelmäßig erscheinen, planen wir von Anfang an einen einfachen Weg ein. Ein Redaktionssystem gehört zum Premium-Paket.'],
      ['Warum kein Foto vom Team?', 'Ein gutes Teamfoto ist ein Gewinn, aber kein Muss. Es wird nur verwendet, wenn die abgebildeten Personen einwilligen und die Rechte geklärt sind. Bis dahin tragen Typografie, Texte und Architektur den Auftritt.'],
    ],
    cta: { ...COMMON.cta, text: 'Gemeinsam entwickeln wir einen Webauftritt, der Sorgfalt zeigt und passende Mandate anbahnt.', subject: 'Projektanfrage Kanzlei-Website', body: 'Hallo Niklas,\n\nich interessiere mich für eine Website für meine Kanzlei oder Steuerberatung.\n\nMein Projekt:\n\nViele Grüße' },
  },

  'kfz-werkstatt': {
    slug: 'kfz-werkstatt',
    world: '05',
    title: 'Website-Konzept Oldtimer-Werkstatt',
    description: 'Beispielkonzept: Wie eine Website für eine Oldtimer-Werkstatt mit Bewegung, Studiofotografie und einem Vorher-Nachher-Regler Handwerk und Vertrauen zeigt.',
    eyebrow: 'Beispielkonzept · Oldtimer-Werkstatt',
    h1: 'Ein Oldtimer ist <em>Bewegung.</em>',
    lead: 'Ein Website-Konzept für eine Oldtimer-Werkstatt: eine Bildstrecke, die quer durchs Fahrzeug fährt, ein Datenblatt statt Werbesprache und ein Regler, der den Wert der Arbeit zeigt.',
    meta: [['Branche', 'Oldtimer-Werkstatt'], ['Leistung', 'Konzept, Animation, Interaktion, Entwicklung'], ['Schwerpunkt', 'Bewegung & Bildsprache'], ['Umsetzung', 'Responsive HTML, CSS & GSAP']],
    visual: null, // Konzeptbild kommt aus der gebauten Welt (public/images/branche)
    ausgangssituation: [
      'Viele Werkstätten für Oldtimer und Youngtimer leben von Empfehlungen und von Fotos auf Social-Media-Kanälen. Eine eigene Website zeigt oft nur Leistungsliste und Telefonnummer, obwohl das eigentliche Argument sichtbar wäre: was aus einem Fahrzeug geworden ist.',
      'Wer einen Oldtimer in die Hände eines Betriebs gibt, vertraut ihm etwas an, das Geld und Gefühl zugleich wert ist. <strong>Die Website muss Sorgfalt und Können zeigen, bevor das erste Gespräch stattfindet.</strong>',
      'Das Konzept setzt deshalb auf Bewegung und Fotografie: Eine Bildstrecke fährt beim Scrollen seitwärts durch das Fahrzeug, ein Datenblatt nennt Zahlen statt Versprechen, und ein Vorher-Nachher-Regler macht 1.000 Stunden Arbeit in einer Geste sichtbar.',
    ],
    ziele: { h2: 'Klarer Fokus auf <em>Handwerk.</em>', items: [
      ['Qualität der Arbeit sichtbar machen', 'Beweisführung'], ['Mehr qualifizierte Anfragen für Restaurierungen', 'Conversion'], ['Leistungen und Ablauf verständlich darstellen', 'Struktur'],
      ['Emotionale Nähe zum Fahrzeug erzeugen', 'Marke'], ['Saubere Grundlage für lokale Auffindbarkeit', 'SEO'], ['Überzeugende mobile Nutzung', 'Mobile First'] ] },
    design: { h2: 'Gestaltung, die <em>nach Werkstatt und Lack aussieht.</em>', items: [
      ['01 · Farbwelt', 'Grüner Lack, Chrom, Elfenbein', 'Ein tiefes Grün als Grund, Chrom für den Text und Elfenbein für die Zierlinie. Die Farbwelt stammt vom Fahrzeug, nicht aus einem Baukasten.'],
      ['02 · Typografie', 'Breit und technisch', 'Eine breite, technische Versalienschrift für Titel und Kapitel, dazu eine schlichte Systemschrift für den Text. Das hält die Seite schnell und die Zahlen lesbar.'],
      ['03 · Nutzerführung', 'Zeigen, dann erklären', 'Erst die Bilder, dann das Datenblatt, dann der Ablauf in Kapiteln. Wer sich entscheiden will, findet den Weg zur Anfrage an jeder Stelle.'] ] },
    tech: [
      ['Responsive Design', 'Auf jedem Gerät klar', 'Am Desktop fährt die Bildstrecke gepinnt seitwärts, auf dem Smartphone ist sie eine wischbare Leiste mit Einrasten. Beide Wege zeigen dieselben Inhalte.'],
      ['GSAP-Animationen', 'Bewegung mit Funktion', 'Die Querfahrt folgt dem Scrollen. Mit „Bewegung reduzieren“ entfällt der Pin, und die Seite bleibt vollständig bedienbar.'],
      ['Datenschutz', 'Bewusst reduziert', 'Das Konzept vermeidet unnötige Tracking- und Marketing-Skripte. Externe Dienste würden bei einer produktiven Umsetzung passend zur tatsächlichen Nutzung geprüft und dokumentiert.'],
      ['Performance & SEO', 'Saubere Grundlage', 'Bilder in passender Größe, eine kleine Schriftdatei und klar ausgezeichnete Leistungen schaffen eine gute Basis für schnelle Ladezeiten und die lokale Suche.'] ],
    nutzen: [
      ['Vertrauen durch Beweise', 'Ein Vorher-Nachher-Regler und ein Datenblatt belegen die Arbeit, statt sie zu behaupten.'],
      ['Passendere Anfragen', 'Ablauf, Dauer und Aufwand sind vorab klar; wer anfragt, weiß, worauf er sich einlässt.'],
      ['Emotion mit Substanz', 'Studiofotos wecken Lust auf das Fahrzeug, das Datenblatt liefert die Zahlen dazu.'],
      ['Wiedererkennbare Marke', 'Lackgrün, Chrom und die Zierlinie ergeben einen eigenständigen Auftritt.'],
      ['Bessere Auffindbarkeit', 'Eine saubere technische Grundlage unterstützt die Sichtbarkeit in der lokalen Suche.'],
      ['Zeitgemäße Außenwirkung', 'Der digitale Auftritt unterstützt die Positionierung als Betrieb mit Anspruch.'] ],
    vergleich: [
      { eyebrow: 'Typischer Ausgangspunkt', h3: 'Leistungsliste statt Beweis.', li: ['Wenige oder unscharfe Fotos', 'Leistungen ohne Ablauf und Aufwand', 'Referenzen nur auf Social Media', 'Mobile Darstellung nur mitgedacht'] },
      { eyebrow: 'NP Webdesign Konzept', h3: 'Ein Auftritt, der Handwerk zeigt.', li: ['Bildstrecke und Studiofotografie', 'Datenblatt und Ablauf in Kapiteln', 'Vorher-Nachher als Beweis', 'Responsive Nutzung von Anfang an'] },
    ],
    checkliste: { h2: 'Was eine Oldtimer-Werkstatt-Website <em>leisten muss.</em>', intro: 'Eine kurze Checkliste für den Start, unabhängig davon, wer die Seite baut.', items: [
      'Leistungen, Öffnungszeiten, Adresse und Anfahrt stehen ohne Klick auf der Startseite und stimmen überall überein: Website, Google-Profil, Verzeichnisse.',
      'Die Fotos zeigen eigene Arbeiten; Fahrzeughalter haben der Veröffentlichung zugestimmt, Kennzeichen sind unkenntlich gemacht.',
      'Ablauf und Aufwand einer Restaurierung sind verständlich beschrieben, ohne feste Preise zu versprechen, die sich nicht halten lassen.',
      'Vorher-Nachher-Bilder haben denselben Ausschnitt und denselben Kamerastandpunkt, damit der Vergleich ehrlich bleibt.',
      'Ein kurzer, klarer Weg zur Anfrage mit den Angaben, die das Erstgespräch braucht (Fahrzeug, Baujahr, Zustand).',
      'Die Seite lädt auf dem Smartphone schnell, auch bei schwachem Netz, und bleibt ohne Animation vollständig bedienbar.',
      'Karten, Videos und Social-Feeds laden nicht ungefragt Inhalte von Dritten, sondern erst nach einem Klick oder als normaler Link.',
    ] },
    faq: [
      ['Sind Bildstrecke und Regler nur Show?', 'Beides hat eine Aufgabe: Die Strecke zeigt Sorgfalt im Detail, der Regler beweist das Ergebnis. Wer Bewegung nicht mag, schaltet sie ab; dann stehen alle Bilder untereinander da.'],
      ['Brauche ich Studiofotos?', 'Für diesen Auftritt lohnen sie sich, denn die Bilder tragen die Aussage. Ich erstelle ein Briefing mit Motiven, Licht und Ausschnitt; aufgenommen wird von Ihnen oder einem Fotografen, die Bildrechte klären wir vorher.'],
      ['Kann ich neue Projekte selbst einstellen?', 'Das legen wir im Konzept fest. Für Projekte, die regelmäßig dazukommen, planen wir von Anfang an einen einfachen Weg ein. Ein Redaktionssystem gehört zum Premium-Paket.'],
    ],
    cta: { ...COMMON.cta, text: 'Gemeinsam entwickeln wir einen Webauftritt, der Ihr Handwerk in Bewegung zeigt und passende Restaurierungsprojekte anzieht.', subject: 'Projektanfrage Werkstatt-Website', body: 'Hallo Niklas,\n\nich interessiere mich für eine Website für meine Werkstatt.\n\nMein Projekt:\n\nViele Grüße' },
  },

  industrie: {
    slug: 'industrie',
    world: '07',
    title: 'Website-Konzept Industrie und Präzisionsfertigung',
    description: 'Beispielkonzept: Wie eine Website für Fertigung und Zulieferer mit Messprotokoll, schneller Technik und auffindbaren Zahlen Einkäufer überzeugt und Anfragen für Zeichnungen erleichtert.',
    eyebrow: 'Beispielkonzept · Industrie und Präzisionsfertigung',
    h1: 'Einkäufer prüfen genau. Die Seite <em>auch.</em>',
    lead: 'Ein Website-Konzept für einen Fertigungsbetrieb: ein Messprotokoll statt Werbesprache, jede Zahl auffindbar, ein drehbares Bauteil und ein Anfrageweg für Zeichnungen.',
    meta: [['Branche', 'Industrie, Zulieferer, Fertigung'], ['Leistung', 'Konzept, Performance, Technik, Entwicklung'], ['Schwerpunkt', 'Belegbare Zahlen & Geschwindigkeit'], ['Umsetzung', 'Responsive HTML, CSS & GSAP']],
    visual: null, // Konzeptbild kommt aus der gebauten Welt (public/images/branche)
    ausgangssituation: [
      'Viele Fertigungsbetriebe und Zulieferer zeigen sich online mit einem Maschinenpark als Bilderreihe, ein paar Zertifikatslogos und dem Satz, man liefere „höchste Qualität“. Einkäufer und Konstrukteure suchen etwas anderes: Toleranzen, Materialien, Losgrößen, Lieferzeiten.',
      'Wer Zeichnungen anfragt, vergleicht mehrere Anbieter in kurzer Zeit. <strong>Die Website muss belegen, was ein Betrieb kann, und das Wichtigste in Sekunden auffindbar machen.</strong>',
      'Das Konzept setzt deshalb auf Daten statt Behauptungen: Kennzahlen, ein Messprotokoll mit Toleranzanzeige, ein drehbares Bauteil als Bildfolge und ein Anfrageformular, das die Angaben für ein Angebot gleich mitnimmt.',
    ],
    ziele: { h2: 'Klarer Fokus auf <em>Belegbarkeit.</em>', items: [
      ['Fähigkeiten mit Zahlen belegen', 'Beweisführung'], ['Mehr qualifizierte Anfragen mit Zeichnung', 'Conversion'], ['Technische Daten schnell auffindbar', 'Struktur'],
      ['Sehr kurze Ladezeiten', 'Performance'], ['Saubere Grundlage für Auffindbarkeit', 'SEO'], ['Überzeugende mobile Nutzung', 'Mobile First'] ] },
    design: { h2: 'Gestaltung, die <em>nach Messtechnik aussieht.</em>', items: [
      ['01 · Farbwelt', 'Stahlschiefer und Signalgelb', 'Ein kühler, dunkler Grund, helle Schrift und ein einziges Signalgelb für Messwerte und die Laserlinie. Das Raster bleibt als feine Struktur im Hintergrund sichtbar.'],
      ['02 · Typografie', 'Klar, technisch, tabellentauglich', 'Eine neutrale Groteskschrift für Text und eine Mono-Schrift für Daten. Ziffern stehen tabellarisch, damit Werte in Spalten sauber untereinander stehen.'],
      ['03 · Nutzerführung', 'Von der Zahl zur Anfrage', 'Kennzahlen, Messprotokoll und Bauteil führen zum Anfragewerkzeug. Wer eine Zeichnung hat, soll sie in wenigen Schritten senden können.'] ] },
    tech: [
      ['Responsive Design', 'Auf jedem Gerät klar', 'Tabellen bleiben lesbar, auf dem Smartphone entfallen nachrangige Spalten, und die Bildfolge des Bauteils zeigt sechs statt zwölf Ansichten.'],
      ['GSAP-Animationen', 'Bewegung mit Funktion', 'Die Laserlinie erklärt, wie das Protokoll entsteht. Mit „Bewegung reduzieren“ steht alles sofort da, und jede Zahl bleibt auffindbar.'],
      ['Datenschutz', 'Bewusst reduziert', 'Das Konzept vermeidet unnötige Tracking- und Marketing-Skripte. Hochgeladene Zeichnungen würden bei einer produktiven Umsetzung verschlüsselt übertragen und der Umgang damit in der Datenschutzerklärung dokumentiert.'],
      ['Performance & SEO', 'Saubere Grundlage', 'Kleine Schriftdateien, Bildfolgen erst bei Bedarf und semantische Tabellen schaffen eine gute Basis für schnelle Ladezeiten und die Suche nach Fertigungsleistungen.'] ],
    nutzen: [
      ['Vertrauen durch Zahlen', 'Toleranzen, Losgrößen und Lieferzeiten stehen offen da, statt hinter Kontaktformularen.'],
      ['Schnellere Angebote', 'Die Anfrage nimmt Material, Stückzahl und Zeichnung gleich mit; Rückfragen werden seltener.'],
      ['Weniger unpassende Anfragen', 'Wer die Möglichkeiten sieht, fragt gezielter an.'],
      ['Eigenständige Wirkung', 'Messraster, Laserlinie und Signalgelb unterscheiden den Auftritt von Standardseiten der Branche.'],
      ['Bessere Auffindbarkeit', 'Eine saubere technische Grundlage unterstützt die Sichtbarkeit bei der Suche nach Fertigungsleistungen.'],
      ['Zeitgemäße Außenwirkung', 'Der digitale Auftritt unterstützt die Positionierung als moderner, verlässlicher Zulieferer.'] ],
    vergleich: [
      { eyebrow: 'Typischer Ausgangspunkt', h3: 'Maschinenpark statt Beleg.', li: ['Bilder von Maschinen statt Kennzahlen', 'Toleranzen und Materialien schwer zu finden', 'Anfrage nur per E-Mail ohne Struktur', 'Mobile Darstellung nur mitgedacht'] },
      { eyebrow: 'NP Webdesign Konzept', h3: 'Ein Auftritt, der Zahlen zeigt.', li: ['Kennzahlen und Messprotokoll', 'Bauteil drehbar als Bildfolge', 'Anfrage mit Zeichnung und Stückzahl', 'Responsive Nutzung von Anfang an'] },
    ],
    checkliste: { h2: 'Was eine Fertigungs-Website <em>leisten muss.</em>', intro: 'Eine kurze Checkliste für den Start, unabhängig davon, wer die Seite baut.', items: [
      'Fertigungsverfahren, Materialien, Toleranzen und Losgrößen stehen auf einer Seite, die ohne Anmeldung erreichbar ist.',
      'Zertifikate und Normen werden nur genannt, wenn sie aktuell gültig und belegbar sind; Logos nur mit Berechtigung.',
      'Kundennamen und Referenzen erscheinen nur mit schriftlicher Freigabe der Kunden; Zeichnungen und Bauteile Dritter werden nicht abgebildet.',
      'Der Weg zur Anfrage nennt, welche Unterlagen gebraucht werden (Zeichnung, Material, Stückzahl, Termin).',
      'Hochgeladene Zeichnungen werden verschlüsselt übertragen; die Seite sagt, wie mit vertraulichen Unterlagen umgegangen wird.',
      'Die Seite lädt auch auf dem Smartphone in der Halle schnell und bleibt ohne Animation vollständig bedienbar.',
      'Karten, Videos und Social-Feeds laden nicht ungefragt Inhalte von Dritten, sondern erst nach einem Klick oder als normaler Link.',
    ] },
    faq: [
      ['Sind Kennzahlen auf der Website nicht riskant?', 'Nur, wenn sie nicht stimmen. Ich nehme ausschließlich Werte auf, die Sie belegen können, und markiere Beispielwerte in Studien deutlich als solche.'],
      ['Wie werden Zeichnungen sicher übertragen?', 'Bei einer produktiven Umsetzung läuft der Upload verschlüsselt über Ihren eigenen Server, mit Hinweisen zur Vertraulichkeit. In der Studie ist die Anfrage eine Demo und sendet nichts.'],
      ['Brauchen wir ein 3D-Modell des Bauteils?', 'Nein. Eine Bildfolge aus zwölf Fotos reicht und ist schneller als jede 3D-Ansicht. Ich erstelle ein Briefing mit Ausschnitt, Licht und Winkel; aufgenommen wird von Ihnen oder einem Fotografen.'],
    ],
    cta: { ...COMMON.cta, text: 'Gemeinsam entwickeln wir einen Webauftritt, der Ihre Fähigkeiten belegt und Anfragen mit Zeichnung erleichtert.', subject: 'Projektanfrage Industrie-Website', body: 'Hallo Niklas,\n\nich interessiere mich für eine Website für meinen Fertigungsbetrieb.\n\nMein Projekt:\n\nViele Grüße' },
  },

  'physiotherapie': {
    slug: 'physiotherapie',
    world: '08',
    title: 'Website-Konzept Physiotherapie',
    description: 'Beispielkonzept: Wie eine Website für eine Physiotherapie-Praxis mit großer Schrift, Tastaturbedienung und einfacher Terminbuchung für alle Patienten nutzbar wird.',
    eyebrow: 'Beispielkonzept · Physiotherapie',
    h1: 'Patienten sind nicht immer fit. Die Website <em>darf es sein.</em>',
    lead: 'Ein Website-Konzept für eine Physiotherapie-Praxis: Barrierefreiheit als Gestaltungsprinzip, ein Buchungsmodul in drei Schritten und Schalter für große Schrift und hohen Kontrast.',
    meta: [['Branche', 'Physiotherapie und Heilmittel'], ['Leistung', 'Konzept, Barrierefreiheit, Terminbuchung, Entwicklung'], ['Schwerpunkt', 'Barrierefreiheit & Buchung'], ['Umsetzung', 'Responsive HTML, CSS & GSAP']],
    visual: null, // Konzeptbild kommt aus der gebauten Welt (public/images/branche)
    ausgangssituation: ['Viele Praxen verlassen sich bei Terminen auf Telefon und einen Buchungsdienst, der als Fremdkomponente eingebunden wird. Wer schlecht sieht, motorisch eingeschränkt oder schlicht erschöpft ist, scheitert oft an kleinen Schaltflächen, zu schwachen Kontrasten oder an Formularen, die sich nur mit der Maus bedienen lassen.', 'Dabei besteht die Zielgruppe einer Praxis zu großen Teilen aus Menschen, die genau darauf angewiesen sind. <strong>Die Website muss barrierearm sein, bevor sie schön ist.</strong>', 'Das Konzept setzt deshalb auf eine große, klare Schrift, Klickflächen ab 48 Pixel, vollständige Tastaturbedienung und eine Terminbuchung in drei Schritten. Schalter für große Schrift und hohen Kontrast sind direkt in der Seite, ohne Einstellungen im Browser suchen zu müssen.'],
    ziele: {'h2': 'Klarer Fokus auf <em>Zugänglichkeit.</em>', 'items': [['Für alle Patienten bedienbar', 'Barrierefreiheit'], ['Mehr Online-Buchungen', 'Conversion'], ['Behandlungen und Zeiten klar auffindbar', 'Struktur'], ['Weniger Rückfragen am Telefon', 'Entlastung'], ['Saubere Grundlage für lokale Auffindbarkeit', 'SEO'], ['Überzeugende mobile Nutzung', 'Mobile First']]},
    design: {'h2': 'Gestaltung, die <em>niemanden ausschließt.</em>', 'items': [['01 · Farbwelt', 'Ruhiges Mint, tiefes Grün', 'Ein heller, ruhiger Grund mit dunkler Schrift in hohem Kontrast. Der Akzent ist kräftig genug für Text. Auf Wunsch schaltet die Seite auf Schwarz auf Weiß.'], ['02 · Typografie', 'Für Lesbarkeit entwickelt', 'Eine Schrift, die Verwechslungen ähnlicher Zeichen vermeidet, im Grundtext mit 19 bis 20 Pixeln. Die Schalter für „Große Schrift“ vergrößern sie weiter, ohne dass etwas bricht.'], ['03 · Nutzerführung', 'Drei Schritte zum Termin', 'Behandlung, Tag, Uhrzeit: jede Auswahl ist eine große Fläche, alles geht mit der Tastatur, und die Bestätigung wird laut angesagt.']]},
    tech: [['Responsive Design', 'Auf jedem Gerät klar', 'Layout und Bedienflächen passen sich an, ohne dass etwas kleiner wird als nötig. Zoom bis 200 Prozent bleibt nutzbar.'], ['GSAP-Animationen', 'Bewegung nur als Hilfe', 'Kurze Einblendungen, sonst nichts. Wer „Bewegung reduzieren“ eingestellt hat, sieht gar keine Bewegung.'], ['Datenschutz', 'Bewusst reduziert', 'Das Konzept bindet keinen externen Buchungsdienst ein. Bei einer echten Umsetzung würde die Buchung über den eigenen Server laufen und die Verarbeitung von Gesundheitsdaten datenschutzrechtlich geprüft und dokumentiert.'], ['Performance & SEO', 'Saubere Grundlage', 'Eine kleine Schriftdatei, semantische Überschriften und klar ausgezeichnete Öffnungszeiten schaffen eine gute Basis für schnelle Ladezeiten und die lokale Suche.']],
    nutzen: [['Zugang für alle', 'Große Schrift, hoher Kontrast und Tastaturbedienung erreichen auch Menschen, die andere Seiten abbrechen.'], ['Weniger Anrufe', 'Die Buchung in drei Schritten nimmt der Rezeption Routineanfragen ab.'], ['Vertrauen durch Ruhe', 'Eine ruhige, klare Seite passt zu einer Praxis, die Sicherheit geben will.'], ['Eigenständige Marke', 'Mint, Wasserlinie und ein klarer Aufbau unterscheiden den Auftritt von Standardseiten.'], ['Bessere Auffindbarkeit', 'Eine saubere technische Grundlage unterstützt die Sichtbarkeit in der lokalen Suche.'], ['Zeitgemäße Außenwirkung', 'Der digitale Auftritt unterstützt die Positionierung als moderne, zugewandte Praxis.']],
    vergleich: [{'eyebrow': 'Typischer Ausgangspunkt', 'h3': 'Kleine Schrift, Fremdbuchung.', 'li': ['Schwache Kontraste und kleine Schaltflächen', 'Buchung über eine Fremdkomponente', 'Formulare nur mit der Maus bedienbar', 'Mobile Darstellung nur mitgedacht']}, {'eyebrow': 'NP Webdesign Konzept', 'h3': 'Eine Seite, die für alle funktioniert.', 'li': ['Große Schrift und hoher Kontrast auf Knopfdruck', 'Eigene Buchung in drei Schritten', 'Vollständig per Tastatur bedienbar', 'Responsive Nutzung von Anfang an']}],
    checkliste: {'h2': 'Was eine Praxis-Website <em>leisten muss.</em>', 'intro': 'Eine kurze Checkliste für den Start, unabhängig davon, wer die Seite baut. Sie ersetzt keine rechtliche Prüfung.', 'items': ['Behandlungen, Öffnungszeiten, Anfahrt und Parkmöglichkeiten stehen ohne Klick auf der Startseite und stimmen überall überein.', 'Der Zugang ist beschrieben: Stufen, Aufzug, Behindertenparkplätze, Haltestelle.', 'Alle Bedienelemente sind mit der Tastatur erreichbar und mindestens 48 Pixel groß.', 'Texte und Kontraste sind so gewählt, dass sie auch bei Sehschwäche lesbar sind (WCAG 2.2, Stufe AA).', 'Aussagen zu Behandlungen versprechen keine Heilung und erfüllen die Vorgaben der Heilmittelwerbung; der Betrieb lässt sie vor der Veröffentlichung prüfen.', 'Eine Terminanfrage fragt nur ab, was gebraucht wird; Gesundheitsdaten gehören nicht in ein einfaches Kontaktformular, und die Datenschutzinformation erklärt, was passiert.', 'Karten, Videos und Social-Feeds laden nicht ungefragt Inhalte von Dritten, sondern erst nach einem Klick oder als normaler Link.']},
    faq: [['Muss eine Praxis-Website barrierefrei sein?', 'Das hängt von Betrieb und Rechtslage ab; eine Pflicht ist nicht in jedem Fall gegeben. Für die Zielgruppe einer Praxis ist Barrierefreiheit aber ein echter Vorteil, und die Umsetzung nach WCAG 2.2 AA ist der anerkannte Maßstab.'], ['Kann die Praxis Termine online vergeben?', 'Ja. In der Studie ist die Buchung eine Demo. Bei einer echten Umsetzung läuft sie über Ihren eigenen Server, sodass keine Daten an einen Fremddienst gehen. Die rechtliche Einordnung von Gesundheitsdaten prüfen wir vorher.'], ['Dürfen auf der Seite Behandlungserfolge stehen?', 'Für Heilmittel gelten enge Grenzen für Werbeaussagen. Ich gestalte Struktur und Texte; welche Aussagen zulässig sind, klärt der Betrieb mit einer fachkundigen Stelle, bevor die Seite online geht.']],
    cta: { ...COMMON.cta, text: 'Gemeinsam entwickeln wir einen Webauftritt, der für alle Patienten funktioniert und die Terminvergabe entlastet.', subject: 'Projektanfrage Praxis-Website', body: 'Hallo Niklas,\n\nich interessiere mich für eine Website für meine Praxis.\n\nMein Projekt:\n\nViele Grüße' },
  },

  'gastronomie-hotel': {
    slug: 'gastronomie-hotel',
    world: '09',
    title: 'Website-Konzept Landgasthof und Hotel',
    description: 'Beispielkonzept: Wie eine Website für Landgasthof und Hotel mit Bildstrecke, Speisekarte und fixierter Buchungsleiste Gefühl vermittelt und Anfragen ohne Hürde ermöglicht.',
    eyebrow: 'Beispielkonzept · Landgasthof und Hotel',
    h1: 'Gäste buchen ein <em>Gefühl.</em>',
    lead: 'Ein Website-Konzept für einen Landgasthof mit Hotel am See: Bilder, die den Tag vom Abend bis in die Nacht erzählen, eine Speisekarte in einer schmalen Spalte und eine Anfrage, die immer erreichbar ist.',
    meta: [['Branche', 'Gastronomie und Hotellerie'], ['Leistung', 'Konzept, Conversion-Struktur, Entwicklung'], ['Schwerpunkt', 'Atmosphäre & Anfrage'], ['Umsetzung', 'Responsive HTML, CSS & GSAP']],
    visual: null, // Konzeptbild kommt aus der gebauten Welt (public/images/branche)
    ausgangssituation: ['Viele Gasthöfe und Hotels zeigen auf der Website eine Bildergalerie, ein PDF mit der Speisekarte und ein Buchungsportal eines Drittanbieters. Das Gefühl, das Gäste suchen, geht dabei verloren, und die Anfrage ist ein Sprung auf eine fremde Seite.', 'Dabei buchen Gäste kein Zimmer und keinen Tisch, sondern einen Abend am See, ein Frühstück am Fenster, einen Ort, an dem Zeit vergeht. <strong>Die Anfrage darf erst kommen, wenn das Gefühl da ist, und dann muss sie ohne Hürde möglich sein.</strong>', 'Das Konzept erzählt deshalb einen Tag: Bilder blenden langsam vom Abend in die Nacht, die Farbe der Seite kühlt dabei ab. Die Speisekarte steht als schmale Spalte mit Reitern für Mittag und Abend, und eine Leiste am unteren Rand hält Datum und Personenzahl jederzeit bereit.'],
    ziele: {'h2': 'Klarer Fokus auf <em>Stimmung und Anfrage.</em>', 'items': [['Atmosphäre vor der Buchung vermitteln', 'Marke'], ['Mehr Zimmer- und Tischanfragen', 'Conversion'], ['Speisekarte ohne PDF lesbar', 'Struktur'], ['Anfrage jederzeit erreichbar', 'UX'], ['Saubere Grundlage für lokale Auffindbarkeit', 'SEO'], ['Überzeugende mobile Nutzung', 'Mobile First']]},
    design: {'h2': 'Gestaltung, die <em>nach Abendlicht aussieht.</em>', 'items': [['01 · Farbwelt', 'Dämmerungsviolett, Leinen, Schilf', 'Ein dunkler, warmer Grund, Leinenweiß für die Schrift und ein Schilfgrün als Akzent. Eine Farbschicht wandert vom Abend zur Nacht und kühlt die Seite ab.'], ['02 · Typografie', 'Ruhig und großzügig', 'Eine feine Serifenschrift, sehr groß für Titel und in lesbarer Größe für den Text. Viel Abstand, kleine Textinseln, Vollbild-Bilder.'], ['03 · Nutzerführung', 'Erst das Gefühl, dann die Anfrage', 'Die Seite erzählt, zeigt Zimmer und Karte, und die Buchungsleiste ist die ganze Zeit da, ohne zu drängen.']]},
    tech: [['Responsive Design', 'Auf jedem Gerät klar', 'Die Buchungsleiste sitzt auf dem Smartphone über der Navigation; die Speisekarte bleibt eine schmale, gut lesbare Spalte.'], ['GSAP-Animationen', 'Die langsamste Welt', 'Bildüberblendungen über 120 Prozent der Bildschirmhöhe, an das Scrollen gebunden. Mit „Bewegung reduzieren“ stehen die Bilder untereinander.'], ['Datenschutz', 'Bewusst reduziert', 'Das Konzept bindet keine Karte, kein Video und keinen Buchungsdienst von Dritten ein. Bei einer echten Umsetzung würde die Anfrage über Ihren eigenen Server laufen.'], ['Performance & SEO', 'Saubere Grundlage', 'Bilder in passender Größe, eine Schriftdatei und eine echte, indexierbare Speisekarte statt eines PDFs schaffen eine gute Basis für schnelle Ladezeiten und die lokale Suche.']],
    nutzen: [['Gefühl vor dem Besuch', 'Bilder und Ruhe vermitteln, wie sich ein Aufenthalt anfühlt.'], ['Mehr Anfragen', 'Die immer erreichbare Leiste senkt die Hürde, Datum und Personen anzugeben.'], ['Speisekarte, die gefunden wird', 'Gerichte als Text sind lesbar, suchbar und auf dem Smartphone nutzbar.'], ['Eigenständige Marke', 'Dämmerung, Schilf und Fenster ergeben einen unverwechselbaren Auftritt.'], ['Bessere Auffindbarkeit', 'Eine saubere technische Grundlage unterstützt die Sichtbarkeit in der lokalen Suche.'], ['Zeitgemäße Außenwirkung', 'Der digitale Auftritt unterstützt die Positionierung als Haus mit Anspruch.']],
    vergleich: [{'eyebrow': 'Typischer Ausgangspunkt', 'h3': 'Galerie, PDF, Fremdportal.', 'li': ['Bildergalerie ohne Dramaturgie', 'Speisekarte als PDF', 'Buchung auf einer fremden Seite', 'Mobile Darstellung nur mitgedacht']}, {'eyebrow': 'NP Webdesign Konzept', 'h3': 'Ein Auftritt, der einen Abend erzählt.', 'li': ['Bildüberblendung vom Abend zur Nacht', 'Speisekarte als Text mit Reitern', 'Anfrage in der Seite, ohne Umweg', 'Responsive Nutzung von Anfang an']}],
    checkliste: {'h2': 'Was eine Gasthof-Website <em>leisten muss.</em>', 'intro': 'Eine kurze Checkliste für den Start, unabhängig davon, wer die Seite baut.', 'items': ['Öffnungszeiten, Küchenzeiten, Ruhetage und Anfahrt stehen ohne Klick auf der Startseite und stimmen überall überein: Website, Google-Profil, Verzeichnisse.', 'Die Speisekarte steht als Text auf der Seite, nicht nur als PDF; Preise sind aktuell, Allergene und Zusatzstoffe sind nach den geltenden Regeln gekennzeichnet.', 'Fotos zeigen die eigenen Räume und Gerichte; Gäste und Mitarbeitende sind nur mit Einwilligung zu sehen.', 'Zimmerpreise werden mit „ab“ und dem Hinweis auf Nebenkosten (z. B. Kurtaxe) angegeben, soweit das für Ihr Haus gilt.', 'Eine Anfrage fragt nur Datum, Personen und Kontaktweg ab; die Datenschutzinformation erklärt, was damit geschieht.', 'Die Seite lädt auch bei schwachem Netz schnell, und die Buchungsleiste verdeckt auf dem Smartphone keine Inhalte.', 'Karten, Videos und Social-Feeds laden nicht ungefragt Inhalte von Dritten, sondern erst nach einem Klick oder als normaler Link.']},
    faq: [['Brauchen wir weiter ein Buchungsportal?', 'Das entscheiden Sie. Das Konzept zeigt, wie eine Anfrage direkt über die eigene Seite laufen kann. Portale können zusätzlich bestehen bleiben, die Seite ist dann der Ort, an dem Gäste direkt und ohne Provision anfragen.'], ['Warum keine Speisekarte als PDF?', 'Ein Text auf der Seite ist schneller, lesbar auf dem Smartphone, durchsuchbar und lässt sich leichter pflegen. Wer ein PDF möchte, bekommt es zusätzlich als Download.'], ['Wie entstehen die Bilder?', 'Ich erstelle ein Briefing: dieselbe Perspektive vom Abend bis in die Nacht, Zimmer mit Fensterblick, Tellerdetails. Aufgenommen wird von Ihnen oder einem Fotografen; die Bildrechte klären wir vorher.']],
    cta: { ...COMMON.cta, text: 'Gemeinsam entwickeln wir einen Webauftritt, der ein Gefühl vermittelt und Anfragen ohne Hürde ermöglicht.', subject: 'Projektanfrage Gasthof-Website', body: 'Hallo Niklas,\n\nich interessiere mich für eine Website für mein Haus.\n\nMein Projekt:\n\nViele Grüße' },
  },

};

export const BRANCHEN_LIST = Object.values(BRANCHEN);
