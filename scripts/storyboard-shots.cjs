#!/usr/bin/env node
/*
 * Rendert die Standbilder des Storyboards „Der Kunden-Test“ nach docs/screens/kunden-test/ (Desktop 1440 px, Mobil 390 px)
 * und je eine Übersicht. Voraussetzung: npm run build (liest dist/ für Stile und Schriften), Playwright mit Chromium.
 * Aufruf:  NODE_PATH=$(npm root -g) node scripts/storyboard-shots.cjs
 */
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', 'dist');
const OUT = path.resolve(__dirname, '..', 'docs', 'screens', 'kunden-test');
const PAGE = path.resolve(__dirname, 'storyboard', 'kunden-test.html');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.png': 'image/png' };
const srv = http.createServer((q, r) => {
  const u = q.url.split('?')[0];
  if (u === '/storyboard.html') { r.writeHead(200, { 'content-type': TYPES['.html'] }); return fs.createReadStream(PAGE).pipe(r); }
  const f = path.join(ROOT, u);
  if (fs.existsSync(f) && fs.statSync(f).isFile()) { r.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); } else { r.writeHead(404); r.end(); }
});
const DESK = [['d1', '1 · Start', '0 s'], ['d2', '2 · Hürde', 'etwa 1 s'], ['d3', '3 · Maßarbeit fertig', 'etwa 2 s'], ['d4', '4 · Baukasten gescheitert', 'etwa 7 s'], ['d5', '5 · Auflösung', 'danach']];
const MOB = [['m1', '1 · Start', '0 s'], ['m2', '2 · Hürde', 'etwa 3 s'], ['m3', '3 · Nummer gefunden', 'etwa 6 s'], ['m4', '4 · Maßarbeit fertig', 'etwa 8 s'], ['m5', '5 · Auflösung', 'danach']];
srv.listen(0, async () => {
  const base = `http://127.0.0.1:${srv.address().port}`;
  fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch();
  const shot = async (id, w, h, name) => {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    const p = await ctx.newPage();
    await p.goto(`${base}/storyboard.html?f=${id}`, { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    const over = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    await p.screenshot({ path: path.join(OUT, name), fullPage: true });
    await ctx.close();
    return over;
  };
  const rows = [];
  for (const [id, t] of DESK) { const o = await shot(id, 1440, 900, `desktop-${id.slice(1)}.png`); rows.push(`desktop ${id}: Überbreite ${o}px`); }
  await shot('d6', 1440, 900, 'desktop-am-handy.png');
  for (const [id] of MOB) { const o = await shot(id, 390, 844, `mobil-${id.slice(1)}.png`); rows.push(`mobil ${id}: Überbreite ${o}px`); }
  // Übersichten
  const sheet = async (list, prefix, w, cols, name, extra) => {
    const html = `<body style="margin:0;background:#1C1712;font-family:Arial,sans-serif;color:#F0EBE3"><div style="display:grid;grid-template-columns:repeat(${cols},${w}px);gap:28px;padding:28px">
      ${list.map(([id, t, s], i) => `<figure style="margin:0"><figcaption style="font:600 18px Arial;margin-bottom:10px">${t} <span style="font-weight:400;opacity:.7"> · ${s}</span></figcaption><img style="width:${w}px;display:block;border:1px solid #5E5852" src="file://${OUT}/${prefix}-${i + 1}.png"></figure>`).join('')}${extra || ''}</div></body>`;
    const f = path.join(OUT, '_sheet.html'); fs.writeFileSync(f, html);
    const ctx = await b.newContext({ viewport: { width: cols * w + (cols + 1) * 28, height: 800 } }); const p = await ctx.newPage();
    await p.goto('file://' + f); await p.waitForTimeout(500);
    await p.screenshot({ path: path.join(OUT, name), fullPage: true }); await ctx.close(); fs.unlinkSync(f);
  };
  await sheet(DESK, 'desktop', 640, 2, 'uebersicht-desktop.png', `<figure style="margin:0"><figcaption style="font:600 18px Arial;margin-bottom:10px">Zusatz · Umschalter „Am Handy“ <span style="font-weight:400;opacity:.7"> · Endzustand</span></figcaption><img style="width:640px;display:block;border:1px solid #5E5852" src="file://${OUT}/desktop-am-handy.png"></figure>`);
  await sheet(MOB, 'mobil', 300, 5, 'uebersicht-mobil.png');
  fs.writeFileSync(path.join(OUT, 'pruefprotokoll.txt'), rows.join('\n') + '\n');
  console.log(rows.join('\n'));
  await b.close(); srv.close();
});
