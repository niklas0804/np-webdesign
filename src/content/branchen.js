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

};

export const BRANCHEN_LIST = Object.values(BRANCHEN);
