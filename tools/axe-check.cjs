#!/usr/bin/env node
/*
 * Automatische Barrierefreiheits-Prüfung (axe-core, WCAG 2.2 AA) auf der gebauten Seite (dist).
 * Prüft die Startseite in den drei Modi, an jeder gebauten Welt (nach dem Scrollen dorthin) und alle Unterseiten.
 * Aufruf:  AXE=/pfad/zu/axe.min.js NODE_PATH=$(npm root -g) node tools/axe-check.cjs
 * axe-core gehört nicht zur Website; es wird nur lokal geladen und bei jeder Prüfung mit CSP-Ausnahme eingespielt.
 */
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', 'dist');
const AXE = fs.readFileSync(process.env.AXE || require.resolve('axe-core/axe.min.js'), 'utf8');
const T = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webp': 'image/webp', '.jpg': 'image/jpeg' };
const srv = http.createServer((q, r) => {
  let u = q.url.split('?')[0]; if (u === '/') u = '/index.html';
  let f = path.join(ROOT, u); if (!path.extname(f) && fs.existsSync(f + '.html')) f += '.html';
  if (fs.existsSync(f) && fs.statSync(f).isFile()) { r.writeHead(200, { 'content-type': T[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); } else { r.writeHead(404); r.end(); }
});
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];

srv.listen(0, async () => {
  const base = `http://127.0.0.1:${srv.address().port}`;
  const { builtWorlds } = await import(path.join(ROOT, '..', 'src/config/journey.js'));
  const pages = fs.readdirSync(path.join(ROOT, 'branchenloesungen')).map((f) => '/branchenloesungen/' + f.replace(/\.html$/, ''));
  const desktop = { viewport: { width: 1440, height: 900 } };
  const mobile = { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true };
  const runs = [
    ['index', '/', desktop, 'desktop-start', null],
    ['index', '/', desktop, 'desktop-werkplan', '#werkplan'],
    ...builtWorlds.map((w) => ['index', '/', desktop, `desktop-welt-${w.nr}`, '#' + w.anchor]),
    ['index', '/', desktop, 'desktop-finale', '#finale'],
    ['index', '/', desktop, 'desktop-kontakt', '#kontakt'],
    ['index', '/', mobile, 'mobil-start', null],
    ...builtWorlds.map((w) => ['index', '/', mobile, `mobil-welt-${w.nr}`, '#' + w.anchor]),
    ['index', '/', { viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }, 'ruhig', null],
    ['leistungen', '/leistungen', desktop, 'seite', null],
    ['impressum', '/impressum', mobile, 'seite-mobil', null],
    ['datenschutz', '/datenschutz', desktop, 'seite', null],
    ['404', '/404', desktop, 'seite', null],
    ...pages.flatMap((p) => [[p.split('/').pop(), p, desktop, 'seite', null], [p.split('/').pop(), p, mobile, 'seite-mobil', null]]),
  ];
  const b = await chromium.launch();
  let total = 0;
  for (const [name, url, opts, label, anchor] of runs) {
    const ctx = await b.newContext({ ...opts, bypassCSP: true });
    const p = await ctx.newPage(); await p.goto(base + url); await p.waitForTimeout(2000);
    if (anchor) { await p.evaluate((a) => scrollTo(0, document.querySelector(a).getBoundingClientRect().top + scrollY), anchor); await p.waitForTimeout(1300); }
    await p.addScriptTag({ content: AXE });
    const res = await p.evaluate(async (tags) => await axe.run(document, { runOnly: { type: 'tag', values: tags } }), TAGS);
    total += res.violations.length;
    console.log(`axe ${name} [${label}]: ${res.violations.length} Verstöße, ${res.passes.length} bestanden`);
    for (const v of res.violations) console.log('   -', v.id, `(${v.impact})`, v.nodes.length + 'x', v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | '), '::', v.help);
    await ctx.close();
  }
  await b.close(); srv.close();
  console.log(total ? `\n✗ ${total} Verstöße` : '\n✓ axe: keine Verstöße');
  process.exit(total ? 1 : 0);
});
