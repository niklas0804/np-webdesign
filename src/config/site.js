/**
 * Seiten-Daten (Blueprint N): Kontakt, Preise – die einzige Stelle für Preise.
 * Fehlende Angaben stehen als sichtbarer Platzhalter, nie erfunden (Blueprint T.1, Punkt 10).
 */
export const SITE = {
  name: 'NP Webdesign',
  owner: 'Niklas Prüfling',
  url: 'https://np-webdesign.de',
  city: 'Schwandorf',
  timeZone: 'Europe/Berlin',
  email: 'kontakt@np-webdesign.de',
  /** Telefon (Auftrag 13. November 2026): Anzeige und `tel:`-Ziel. Die Nummer entspricht dem Impressum (`src/content/impressum.html`). */
  phone: '+49 15231 702321',
  phoneHref: 'tel:+4915231702321',
  /** Erreichbarkeit: wörtlich von Niklas festgelegt, keine Uhrzeiten, kein Arbeitgeber */
  phoneNote: 'Am besten erreichen Sie mich am späten Nachmittag und abends. Wenn ich nicht abhebe, rufe ich zurück – spätestens am nächsten Werktag.',
  /** Bestätigung der Rückrufbitte */
  callbackDone: 'Danke. Ich rufe Sie zurück – spätestens am nächsten Werktag.',
  /** Kapazität: höchstens so viele Projekte gleichzeitig (Niklas arbeitet nebenberuflich) */
  maxProjekte: 2,
  /** Antwortzeit-Zusage (Niklas: 2 Werktage) */
  responseWithin: 'innerhalb von 2 Werktagen',
  responseTime: 'Antwort innerhalb von 2 Werktagen',
  /** Hostinger-Partner-Badge (Niklas ist offizieller Partner). Die SVG-Datei liegt selbst gehostet unter public/images/, nie von einem Fremdserver.
   *  Ohne Link und ohne Tracking. Wird daraus ein Empfehlungslink, muss `label` „Werbung“ setzen und der Datenschutz angepasst werden. */
  partnerBadge: { file: 'hostinger-partner.svg', alt: 'Hostinger Partner', label: null, width: 80, height: 30 },
};

/**
 * Schalter. „Über mich“ ist seit dem 13. November 2026 wieder an, bis das Porträt da ist als reiner Text ohne Bild und ohne Platzhalter.
 * `portrait`: erst einschalten, wenn die Bilddateien in `public/images/` liegen (geparkt in `assets-parked/ueber-mich/`, siehe dortige README).
 */
export const SITE_FLAGS = { ueberMich: true, portrait: false };

/**
 * Fakten zu Ablauf und Kosten (Festlegungen von Niklas, 13. November 2026). Preise stehen in PACKAGES, alles andere hier;
 * Seiten und FAQ beziehen ihre Zahlen von dort.
 */
export const SERVICE = {
  wochen: { von: 4, bis: 10 },
  nachLaunchWochen: 2,
  hostingMaxProMonat: 30,
  terminbuchungPreis: '300 €',
  korrekturschleifen: { starter: 2, professional: 3, premium: 3 },
  dauerText: 'Planen Sie mit 4 bis 10 Wochen, je nach Umfang und danach, wie schnell Texte und Bilder vorliegen.',
      websiteCheck: 'Nennen Sie mir Ihre jetzige Adresse, dann schicke ich Ihnen innerhalb einer Woche drei konkrete Punkte dazu. Kostenlos, auch wenn daraus nichts wird.',
};

/** Zahl als Wort für Fließtext (nur die hier gebrauchten Zahlen) */
export const zahlwort = (n) => ({ 1: 'ein', 2: 'zwei', 3: 'drei', 4: 'vier' })[n] ?? String(n);
const gross = (t) => t.charAt(0).toUpperCase() + t.slice(1);

const korr = (id) => `${SERVICE.korrekturschleifen[id]} Korrekturschleifen`;
const NICHT_TEXTE = 'Texte: Sie liefern sie. Auf Wunsch schreibe ich sie gegen Aufpreis.';
const NICHT_FOTOS = 'Fotos: Ich vermittle Ihnen einen Fotografen aus meinem Netzwerk.';
const NICHT_HOSTING = 'Hosting und Domain (laufende Kosten, siehe unten)';
const NICHT_KORREKTUR = 'Weitere Korrekturschleifen: nach Aufwand';
const NICHT_BUCHUNG = `Online-Terminbuchung in Echtzeit: ${SERVICE.terminbuchungPreis} einmalig zusätzlich`;
const DANACH = [
  `${gross(zahlwort(SERVICE.nachLaunchWochen))} Wochen Fehlerbehebung und kleine Anpassungen ohne Aufpreis`,
  'Danach arbeiten wir nach Absprache weiter',
  `Hosting und Domain: je nach Anbieter höchstens rund ${SERVICE.hostingMaxProMonat} € im Monat, der Vertrag läuft auf Sie`,
];

/**
 * Pakete (Preise unverändert, Festlegung 13. November 2026). Jedes Paket in drei Blöcken: enthalten, nicht enthalten, danach.
 * „Monatliches Reporting“ und „Prioritäts-Support“ sind gestrichen.
 */
export const PACKAGES = [
  { id: 'starter', name: 'Starter', price: '999 €', note: 'einmalig · Endpreis gem. §19 UStG',
    enthalten: ['Eine Seite für Ihren Betrieb (OnePager)', 'Gestaltung für Handy, Tablet und Computer', 'Terminanfrage per Formular',
      'Grundlagen, damit Suchmaschinen Ihre Seite finden: Titel, Beschreibung, saubere Struktur', 'Datenschutzfreundlich umgesetzt (DSGVO-orientiert)', korr('starter')],
    nichtEnthalten: [NICHT_TEXTE, NICHT_FOTOS, NICHT_HOSTING, NICHT_BUCHUNG, NICHT_KORREKTUR],
    danach: DANACH },
  { id: 'professional', name: 'Professional', price: '1.899 €', note: 'einmalig · Endpreis gem. §19 UStG', featured: true,
    enthalten: ['Website mit bis zu 5 Unterseiten', 'Eigene Gestaltung mit Animationen', 'Terminanfrage per Formular',
      'Ausführlichere Optimierung für Suchmaschinen, auf jeder Seite', 'Aufbau, der Besucher zur Anfrage führt', 'Datenschutzfreundlich umgesetzt (DSGVO-orientiert)', korr('professional')],
    nichtEnthalten: [NICHT_TEXTE, NICHT_FOTOS, NICHT_HOSTING, NICHT_BUCHUNG, NICHT_KORREKTUR],
    danach: DANACH },
  { id: 'premium', name: 'Premium', price: '2.999 €', note: 'ab · individuell · Endpreis gem. §19 UStG',
    enthalten: ['Individuelle Website nach Ihrem Bedarf', 'Eigene Funktionen und ein Redaktionssystem (CMS), mit dem Sie Inhalte selbst ändern',
      'Gezielt auf schnelle Ladezeiten optimiert', 'Terminanfrage per Formular', 'Online-Terminbuchung in Echtzeit: Ich binde einen Buchungsdienst ein',
      'Datenschutzfreundlich umgesetzt (DSGVO-orientiert)', korr('premium')],
    nichtEnthalten: [NICHT_TEXTE, NICHT_FOTOS, NICHT_HOSTING, `Laufende Gebühren des Buchungsdienstes: Sie zahlen sie an den Anbieter`, NICHT_KORREKTUR],
    danach: [...DANACH, 'Laufende Betreuung ist nach Absprache möglich'] },
];

/** Zusatzleistungen (Leistungen und Preise) */
export const ZUSATZ = [
  { name: 'Texte schreiben lassen', text: 'Sie liefern die Texte. Auf Wunsch schreibe ich sie gegen Aufpreis. Den Betrag nenne ich Ihnen im Angebot, er richtet sich nach dem Umfang.' },
  { name: 'Online-Terminbuchung in Echtzeit', text: `Ich binde einen Buchungsdienst ein: im Premium enthalten, sonst ${SERVICE.terminbuchungPreis} einmalig. Laufende Gebühren des Dienstes zahlen Sie an den Anbieter.` },
  { name: 'Fotos', text: 'Fotos sind nicht enthalten. Ich vermittle Ihnen einen Fotografen aus meinem Netzwerk.' },
];

/**
 * Leistungen im Überblick (Kontaktbereich der Startseite): einzelne, nicht doppelte Begriffe. Ersetzt ab 18. Oktober 2026 die Verkettung der Felder `leistung`
 * aller Welten: Diese Felder sind Kurztexte „Leistung im Einsatz“ je Studie, mit „und“ verbunden und teils doppelt (Terminbuchung in Welt 02 und 08).
 */
export const LEISTUNGEN = [
  'Konzeption', 'Seitenstruktur', 'Inhaltsstruktur', 'Texte', 'Bildkonzept', 'Fotobriefing', 'Nutzerführung', 'Animation', 'Interaktion',
  'Online-Terminbuchung', 'Conversion-Struktur', 'Markenwirkung', 'Barrierefreiheit', 'Performance', 'Technik',
];

/** Arbeitsweise – Copy-Deck Blueprint K */
export const STEPS = [
  { nr: '01', title: 'Kennenlernen', text: 'Wir sprechen über Ihren Betrieb, Ihre Kunden und Ihre Ziele. Kostenlos und unverbindlich.' },
  { nr: '02', title: 'Konzeption', text: 'Ich entwickle Struktur, Inhalte und Nutzerführung.' },
  { nr: '03', title: 'Design', text: 'Ihre Website bekommt eine eigene Gestaltung, passend zu Ihrem Betrieb.' },
  { nr: '04', title: 'Entwicklung', text: 'Ich setze sie als schnelle Website für jedes Gerät um.' },
  { nr: '05', title: 'Launch', text: 'Veröffentlichung, technische Einrichtung, letzte Optimierungen.' },
  { nr: '06', title: 'Betreuung', text: `${gross(zahlwort(SERVICE.nachLaunchWochen))} Wochen lang behebe ich Fehler und nehme kleine Anpassungen vor, ohne Aufpreis. Danach nach Absprache.` },
];

/** FAQ (Startseite und Leistungen). Zahlen kommen aus PACKAGES und SERVICE. Kein Satz behauptet Erfahrung mit Kundenprojekten. */
const preisliste = PACKAGES.map((p) => `${p.name} ${p.id === 'premium' ? 'ab ' : ''}${p.price}`).join(', ');
const korrListe = PACKAGES.map((p) => `${p.name} ${SERVICE.korrekturschleifen[p.id]}`).join(', ');
export const FAQ = [
  { q: 'Was kostet eine Website?', a: `${preisliste}. Das sind Endpreise, einmalig. Als Kleinunternehmer nach § 19 UStG berechne ich keine Umsatzsteuer. Was in welchem Paket steckt, sehen Sie auf der Seite Leistungen und Preise.`, link: { href: '/leistungen', label: 'Leistungen und Preise' } },
  { q: 'Wie lange dauert die Erstellung?', a: SERVICE.dauerText },
  { q: 'Was ist nicht enthalten?', a: 'Texte und Fotos sind nicht enthalten, ebenso Hosting und Domain. Weitere Korrekturschleifen berechne ich nach Aufwand. Die Online-Terminbuchung in Echtzeit ist nur im Premium-Paket enthalten.' },
  { q: 'Gibt es laufende Kosten?', a: `Die Website selbst kostet einmalig den Paketpreis. Hosting und Domain kosten je nach Anbieter höchstens rund ${SERVICE.hostingMaxProMonat} € im Monat. Der Vertrag läuft auf Sie, ich richte alles für Sie ein.` },
  { q: 'Wie viele Korrekturschleifen sind dabei?', a: `${korrListe}. Weitere Korrekturschleifen berechne ich nach Aufwand.` },
  { q: 'Brauche ich fertige Texte und Bilder?', a: 'Die Texte liefern Sie. Wenn Sie lieber nicht schreiben möchten, schreibe ich sie auf Wunsch gegen Aufpreis. Den Betrag nenne ich Ihnen im Angebot. Fotos sind nicht enthalten, ich vermittle Ihnen aber einen Fotografen aus meinem Netzwerk.' },
  { q: 'Was passiert nach dem Launch?', a: `${gross(zahlwort(SERVICE.nachLaunchWochen))} Wochen lang behebe ich Fehler und nehme kleine Anpassungen ohne Aufpreis vor. Danach arbeiten wir nach Absprache weiter.` },
  { q: 'Können Kunden online Termine buchen?', a: `Eine Terminanfrage über ein Formular ist in jedem Paket dabei. Eine Online-Terminbuchung in Echtzeit binde ich über einen Buchungsdienst ein: im Premium-Paket enthalten, sonst ${SERVICE.terminbuchungPreis} einmalig. Laufende Gebühren des Dienstes zahlen Sie an den Anbieter.` },
  { q: 'Ist SEO enthalten?', a: 'Die Grundlagen sind in jedem Paket enthalten: sinnvolle Titel und Beschreibungen und eine saubere Struktur. Im Professional-Paket arbeite ich ausführlicher daran. Welche Platzierung Ihre Seite bei Google erreicht, kann ich nicht zusagen.' },
  { q: 'Warum NP Webdesign?', a: 'Sie haben einen Ansprechpartner: mich, von der ersten Nachricht bis nach dem Launch. Es gibt einen Festpreis laut Angebot. Ich baue ohne Baukasten, und Ihre Seite kommt ohne Cookies und ohne Fremdanfragen aus.' },
];
