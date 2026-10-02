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
  /** Offen (Blueprint K): Telefonnummer im Rahmen ja oder nein. Im Impressum steht sie bereits. */
  phone: null,
  /** Offen (Blueprint K): Antwortzeit-Zusage, die neben dem Vollzeitjob verlässlich zu halten ist */
  responseTime: null,
  /** Hostinger-Partner-Badge (Niklas ist offizieller Partner). Die SVG-Datei liegt selbst gehostet unter public/images/, nie von einem Fremdserver.
   *  Solange file null ist, erscheint im Footer ein sichtbarer Platzhalter. Kennzeichnung als Werbung: bei Bedarf über `label`. */
  partnerBadge: { file: null, alt: 'Hostinger Partner', label: null, width: 80, height: 30 },
  placeholder: {
    responseTime: '[PLATZHALTER: Antwortzeit-Zusage]',
    portrait: '[PLATZHALTER: Porträtfoto von Niklas]',
    logo: '[PLATZHALTER: Logo als sauberes SVG]',
    phone: '[PLATZHALTER: Telefonnummer ja/nein]',
  },
};

/** Pakete – laut Audit kanonisch; Preise im Licht der neuen Positionierung noch prüfen (Blueprint K, S) */
export const PACKAGES = [
  { id: 'starter', name: 'Starter', price: '899 €', note: 'einmalig · Endpreis gem. §19 UStG',
    features: ['Professioneller OnePager für Unternehmen', 'Responsives Design', 'Kontaktformular', 'On-Page SEO Grundlagen', 'DSGVO-orientierte Umsetzung'] },
  { id: 'professional', name: 'Professional', price: '1.799 €', note: 'einmalig · Endpreis gem. §19 UStG', featured: true,
    features: ['Unternehmenswebsite mit bis zu 5 Unterseiten', 'Premium Design & Animationen', 'Erweiterte On-Page SEO', 'Conversion-Optimierung', 'DSGVO-orientierte Umsetzung'] },
  { id: 'premium', name: 'Premium', price: '2.999 €', note: 'ab · individuell · Endpreis gem. §19 UStG',
    features: ['Individuelle Unternehmenswebsite', 'Individuelle Funktionen & CMS', 'Performance-Optimierung', 'Monatliches Reporting', 'Prioritäts-Support', 'Laufende Betreuung möglich', 'DSGVO-orientierte Umsetzung'] },
];

/** Arbeitsweise – Copy-Deck Blueprint K */
export const STEPS = [
  { nr: '01', title: 'Kennenlernen', text: 'Wir sprechen über Ihren Betrieb, Ihre Kunden und Ihre Ziele. Kostenlos und unverbindlich.' },
  { nr: '02', title: 'Konzeption', text: 'Ich entwickle Struktur, Inhalte und Nutzerführung.' },
  { nr: '03', title: 'Design', text: 'Ihre Website bekommt eine eigene Gestaltung, passend zu Ihrem Betrieb.' },
  { nr: '04', title: 'Entwicklung', text: 'Ich setze sie als schnelle Website für jedes Gerät um.' },
  { nr: '05', title: 'Launch', text: 'Veröffentlichung, technische Einrichtung, letzte Optimierungen.' },
  { nr: '06', title: 'Betreuung', text: 'Nach dem Launch bin ich für einen vereinbarten Zeitraum für Sie da.' },
];

/** FAQ – Preise stehen nur auf /leistungen */
export const FAQ = [
  { q: 'Was kostet eine Website?', a: 'Das hängt vom Umfang ab. Die Pakete mit Leistungen und Preisen stehen auf der Seite Leistungen und Preise.', link: { href: '/leistungen', label: 'Leistungen und Preise' } },
  { q: 'Wie lange dauert die Erstellung?', a: 'Die meisten Websites werden innerhalb weniger Wochen fertiggestellt.' },
  { q: 'Ist SEO enthalten?', a: 'Bereits im Starter-Paket sind grundlegende SEO-Maßnahmen enthalten.' },
  { q: 'Gibt es laufende Kosten?', a: 'Die Website selbst wird zum Festpreis erstellt. Laufende Kosten entstehen lediglich für Hosting, Domain oder optionale Wartung.' },
  { q: 'Warum NP Webdesign?', a: 'Jedes Projekt wird individuell umgesetzt. Keine Standardvorlagen, keine Baukastensysteme und kein Massenprodukt. Der Fokus liegt auf hochwertigen Websites, die professionell wirken und Ergebnisse liefern.' },
];
