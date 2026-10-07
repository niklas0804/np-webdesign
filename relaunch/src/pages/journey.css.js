/**
 * Erzeugt /journey.css aus der zentralen Reise-Konfiguration.
 * Längen und Paletten stehen nur in src/config/journey.js (Blueprint N). Eine Datei statt Inline-Styles → strikte CSP.
 */
import { journey, WORLDS } from '../config/journey.js';

export function GET() {
  const desktop = [];
  const mobile = [];
  for (const r of journey) {
    const sel = `[data-section="${r.id}"]`;
    if (r.kind === 'opening') {
      desktop.push(`${sel}{--expansion:${r.expansion.d};--plan:${r.plan.d};--grow:${r.grow.d}}`);
      mobile.push(`${sel}{--expansion:${r.expansion.m};--plan:${r.plan.m};--grow:${r.grow.m}}`);
    } else {
      desktop.push(`${sel}{--len:${r.d}}`);
      mobile.push(`${sel}{--len:${r.m}}`);
    }
    if (r.kind === 'transition') desktop.push(`${sel}{--from:${r.fromGround};--to:${r.toGround}${r.fromAccent ? `;--from-accent:${r.fromAccent}` : ''}${r.toAccent ? `;--to-accent:${r.toAccent}` : ''}}`);
    else if (r.ground) desktop.push(`${sel}{--ground:${r.ground}}`);
  }
  const worlds = WORLDS.map((w) =>
    `[data-world="${w.nr}"]{--ground:${w.palette.ground};--text:${w.palette.text};--accent:${w.palette.accent};--accent2:${w.palette.accent2}${w.palette.accent3 ? `;--accent3:${w.palette.accent3}` : ''}}`);

  const css = [
    '/* Aus src/config/journey.js erzeugt – nicht von Hand ändern. */',
    ...desktop,
    '@media (max-width:1023px),(pointer:coarse){',
    ...mobile.map((l) => '  ' + l),
    '}',
    ...worlds,
    '',
  ].join('\n');
  return new Response(css, { headers: { 'Content-Type': 'text/css; charset=utf-8' } });
}
