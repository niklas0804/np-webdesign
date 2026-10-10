#!/usr/bin/env node
/*
 * Erzeugt docs/fotoliste.md aus src/content/fotos.js: alle Fotos, die Niklas noch besorgen muss.
 * Aufruf:  node scripts/list-photos.mjs
 */
import { writeFileSync } from 'node:fs';
import { FOTOS } from '../src/content/fotos.js';
import { WORLDS } from '../src/config/journey.js';

const welt = (nr) => { const w = WORLDS.find((x) => x.nr === nr); return `Welt ${nr} · ${w.name} (${w.branche})`; };
const offen = Object.entries(FOTOS).filter(([, f]) => f.status !== 'da');
const byWelt = {};
for (const [id, f] of offen) (byWelt[f.welt] ||= []).push([id, f]);

let md = `# Fotoliste: was Niklas besorgen muss\n\nErzeugt mit \`node scripts/list-photos.mjs\` aus \`src/content/fotos.js\`. Auf der Seite stehen für jedes Foto ein klar markierter Bildplatzhalter mit Motivbeschreibung.\nOffen: **${offen.length}** Foto${offen.length === 1 ? '' : 's'}.\n\n`;
md += `Allgemein: keine erkennbaren Personen (erfundene Betriebe, keine Gesichter für fiktive Menschen), keine lesbaren Firmennamen oder Schilder, Nutzungs- und Abbildungsrechte vorab klären, Dateiformat JPG oder PNG in voller Größe, ich erzeuge daraus AVIF/WebP in den Breiten aus Blueprint O.\n\n`;
for (const nr of Object.keys(byWelt).sort()) {
  md += `## ${welt(nr)}\n\n`;
  for (const [id, f] of byWelt[nr]) {
    md += `### ${f.titel} (\`${id}\`)\n\n- **Motiv:** ${f.motiv}\n- **Format:** ${f.format}\n- **Einsatz:** ${f.einsatz}\n- **Alternativtext:** ${f.alt}\n- **Rechte:** ${f.rechte}\n\n`;
  }
}
writeFileSync(new URL('../docs/fotoliste.md', import.meta.url), md);
console.log(`docs/fotoliste.md: ${offen.length} offene Fotos`);
