#!/usr/bin/env node
/*
 * Prüfung und Aufnahmen zum „Kunden-Test“ (Startseite, Abschnitt S3) nach docs/screens/kunden-test/:
 * Bildfolge (Desktop 1440 px, Mobil 390 px, Desktop „Am Handy“), Bildschirmaufnahmen (.webm), Zählerwerte, Konsolenfehler,
 * Ruhige Ansicht und Seite ohne JavaScript (Standbilder). Voraussetzung: npm run build, Playwright mit Chromium.
 * Aufruf:  NODE_PATH=$(npm root -g) node scripts/kundentest-shots.cjs
 */
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', 'dist');
const OUT = path.resolve(__dirname, '..', 'docs', 'screens', 'kunden-test', 'umsetzung');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.png': 'image/png' };
const srv = http.createServer((q, r) => {
  let u = q.url.split('?')[0]; if (u === '/') u = '/index.html';
  let f = path.join(ROOT, u); if (!path.extname(f) && fs.existsSync(f + '.html')) f += '.html';
  if (fs.existsSync(f) && fs.statSync(f).isFile()) { r.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); } else { r.writeHead(404); r.end(); }
});
const log = [];
const say = (s) => { log.push(s); console.log(s); };
const counts = (p) => p.evaluate(() => [...document.querySelectorAll('[data-kt] [data-count]')].filter((e) => { const c = e.closest('.kt-phone,.kt-win'); const s = getComputedStyle(c); return e.offsetParent && s.visibility !== 'hidden' && +s.opacity > 0.5; }).map((e) => e.textContent).join(' | '));

srv.listen(0, async () => {
  const base = `http://127.0.0.1:${srv.address().port}`;
  fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch();
  const errs = [];
  const setups = [
    { name: 'desktop', o: { viewport: { width: 1440, height: 900 } }, times: [300, 1300, 2300, 4300, 5800, 8000, 9600], total: 12500 },
    { name: 'mobil', o: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }, times: [400, 2400, 4000, 6300, 7600, 9600, 11800], total: 13500 },
  ];
  for (const s of setups) {
    const vdir = path.join(OUT, `_video-${s.name}`);
    const ctx = await b.newContext({ ...s.o, recordVideo: { dir: vdir, size: s.o.viewport } });
    const p = await ctx.newPage();
    p.on('pageerror', (e) => errs.push(`${s.name}: ${e.message}`)); p.on('console', (m) => { if (m.type() === 'error') errs.push(`${s.name}: ${m.text()}`); });
    await p.goto(`${base}/`, { waitUntil: 'load' }); await p.waitForTimeout(1500);
    const over0 = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    await p.evaluate(() => { const d = document.querySelector('[data-kt-demo]'); const r = d.getBoundingClientRect(); window.scrollTo(0, scrollY + r.top - Math.max(60, (innerHeight - r.height) / 2 - 40)); });
    const t0 = Date.now(); let i = 0;
    for (const t of s.times) { const w = t - (Date.now() - t0); if (w > 0) await p.waitForTimeout(w); await p.screenshot({ path: path.join(OUT, `${s.name}-${++i}.png`) }); say(`${s.name} ${(t / 1000).toFixed(1)} s: ${await counts(p)}`); }
    const rest = s.total - (Date.now() - t0); if (rest > 0) await p.waitForTimeout(rest);
    say(`${s.name}: Überbreite ${over0} px, Endzustand ${await counts(p)}`);
    if (s.name === 'desktop') { // Umschalter „Am Handy“
      await p.click('[data-dev="phone"]'); await p.waitForTimeout(9500);
      await p.screenshot({ path: path.join(OUT, 'desktop-am-handy.png') }); say(`desktop Am Handy: ${await p.getAttribute('[data-kt]', 'data-view')} · ${await counts(p)}`);
    }
    await ctx.close();
    const vf = fs.readdirSync(vdir).find((f) => f.endsWith('.webm'));
    if (vf) fs.renameSync(path.join(vdir, vf), path.join(OUT, `aufnahme-${s.name}.webm`)); fs.rmSync(vdir, { recursive: true, force: true });
  }
  // Ruhige Ansicht, ohne JavaScript, schmale und mittlere Breiten: Standbilder und Überbreite
  const stat = [['ruhig-desktop', { viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }], ['ruhig-mobil', { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' }], ['ohne-js-desktop', { viewport: { width: 1440, height: 900 }, javaScriptEnabled: false }], ['ohne-js-mobil', { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, javaScriptEnabled: false }]];
  for (const [name, o] of stat) {
    const ctx = await b.newContext(o); const p = await ctx.newPage(); await p.goto(`${base}/`, { waitUntil: 'load' }); await p.waitForTimeout(1200);
    const el = await p.$('[data-kt]'); await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(600);
    await el.screenshot({ path: path.join(OUT, `${name}.png`) });
    say(`${name}: Überbreite ${await p.evaluate(() => document.documentElement.scrollWidth - innerWidth)} px`);
    await ctx.close();
  }
  for (const w of [320, 360, 390, 430, 768, 1024, 1440]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 800 }, isMobile: w < 1024, hasTouch: w < 1024 }); const p = await ctx.newPage(); await p.goto(`${base}/`, { waitUntil: 'load' }); await p.waitForTimeout(1500);
    await p.evaluate(() => document.querySelector('[data-kt]').scrollIntoView()); await p.waitForTimeout(1200);
    say(`Breite ${w}: Überbreite ${await p.evaluate(() => document.documentElement.scrollWidth - innerWidth)} px · Ansicht ${await p.getAttribute('[data-kt]', 'data-view')}`);
    await ctx.close();
  }
  say(`Konsolenfehler: ${errs.length ? errs.join(' / ') : 'keine'}`);
  fs.writeFileSync(path.join(OUT, 'pruefprotokoll.txt'), log.join('\n') + '\n');
  await b.close(); srv.close();
});
