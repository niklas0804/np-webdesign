#!/usr/bin/env node
/*
 * Platzhalter-Inventur: listet nach dem Build alle SICHTBAREN „[PLATZHALTER: …]“ im Ausgabeordner (dist) auf.
 * Sichtbar heißt: im Text der Seite, nicht in Kommentaren, Skripten oder Stilen. Der Build bricht NICHT ab (Niklas entscheidet vor dem Livegang);
 * der Exit-Code bleibt 0, mit `--strict` ist er 1, sobald ein Platzhalter vorkommt.
 * Aufruf: node scripts/placeholder-inventory.mjs [dist] [--strict]   (läuft automatisch hinter `npm run build`)
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const root = resolve(args.find((a) => !a.startsWith('--')) || 'dist');
const found = [];

const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    if (!name.endsWith('.html')) continue;
    const text = readFileSync(p, 'utf8')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, '');
    const body = text.replace(/<[^>]+>/g, ' ');
    for (const m of body.matchAll(/\[PLATZHALTER:[^\]]*\]/g)) found.push({ file: relative(root, p), text: m[0].replace(/\s+/g, ' ') });
  }
};

try { walk(root); } catch (e) { console.error(`Platzhalter-Inventur: ${root} nicht lesbar (${e.code || e.message})`); process.exit(0); }

if (!found.length) console.log('Platzhalter-Inventur: keine sichtbaren [PLATZHALTER: …] im Ausgabeordner.');
else {
  console.log(`\nPlatzhalter-Inventur: ${found.length} sichtbare[r] Platzhalter vor dem Livegang ersetzen:`);
  found.forEach((f) => console.log(`  · ${f.file}: ${f.text}`));
}
process.exit(strict && found.length ? 1 : 0);
