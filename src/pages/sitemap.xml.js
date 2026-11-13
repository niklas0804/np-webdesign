/**
 * Sitemap, erzeugt aus den Seiten selbst (statt einer Hand-Liste in public/): Startseite, /welten, Unterseiten, Fallstudie und alle Branchenseiten.
 */
import { SITE } from '../config/site.js';
import { BRANCHEN_LIST } from '../content/branchen.js';

export function GET() {
  const paths = ['/', '/welten', '/leistungen', '/projekte/np-webdesign', '/impressum', '/datenschutz', ...BRANCHEN_LIST.map((b) => `/branchenloesungen/${b.slug}`)];
  const xml = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...paths.map((p) => `  <url><loc>${SITE.url}${p}</loc></url>`), '</urlset>', ''].join('\n');
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
