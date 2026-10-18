#!/usr/bin/env node
/*
 * Aufnahmen zur Abnahme der Korrekturen vom 17. Oktober 2026 (Feedback zum Live-Stand 613ce9e) nach docs/screens/feedback/.
 * Je Punkt Einzelbilder und Bildfolgen für Desktop (1440 × 900) und Mobil (390 × 844).
 * Voraussetzung: npm run build (Ordner dist), Playwright mit Chromium, ImageMagick (convert).
 * Aufruf:  NODE_PATH=$(npm root -g) node scripts/feedback-shots.cjs [kontakt zusammenarbeit stapel start torquel logo vergleich]
 */
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..', 'dist');
const OUT = path.resolve(__dirname, '..', 'docs', 'screens', 'feedback');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.png': 'image/png' };
const srv = http.createServer((q, r) => {
  let u = q.url.split('?')[0]; if (u === '/') u = '/index.html';
  let f = path.join(ROOT, u); if (!path.extname(f) && fs.existsSync(f + '.html')) f += '.html';
  if (fs.existsSync(f) && fs.statSync(f).isFile()) { r.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); } else { r.writeHead(404); r.end(); }
});

/** y-Position: pin = Anteil der Pinlänge, trans = Anteil eines Übergangs (L = 200 + len), top = Abschnittsanfang plus Versatz in Bildschirmhöhen (vh) */
const yOf = (page, w) => page.evaluate((w) => {
  const svh = (() => { const d = document.createElement('div'); d.style.cssText = 'position:absolute;height:100svh;width:0'; document.body.append(d); const u = d.offsetHeight / 100; d.remove(); return u; })();
  const abs = (e) => e.getBoundingClientRect().top + scrollY;
  if (w.k === 'top') return abs(document.querySelector(w.sel)) + (w.vh || 0) * 100 * svh + (w.px || 0);
  if (w.k === 'pin') { const e = document.querySelector(w.sel); return abs(e) + w.f * (e.offsetHeight - 100 * svh); }
  if (w.k === 'trans') { const t = document.querySelector(`[data-section="${w.id}"]`); const len = parseFloat(getComputedStyle(t).getPropertyValue('--len')) || 60; return abs(t) + w.f * (200 + len) * svh; }
  return w.y || 0;
}, w);
const strip = (files, out, h) => { execFileSync('convert', [...files, '-resize', `x${h}`, '-quality', '82', '+append', out]); files.forEach((f) => fs.unlinkSync(f)); };

const JOBS = {
  // 1 · Kontakt: nach dem Übergang bleibt nichts stehen (normal, schnell, zurück, Reload mitten drin, Anker)
  async kontakt(page, base, view, h, ctx) {
    const frames = [];
    const shot = async (name, wait = 900) => { await page.waitForTimeout(wait); const f = path.join(OUT, `.k-${view}-${frames.length}.png`); await page.screenshot({ path: f }); frames.push(f); };
    const T = 't-arbeitsweise-kontakt';
    for (const f of [0.82, 0.9, 0.96, 1.0, 1.15]) { await page.evaluate((v) => scrollTo(0, v), Math.round(await yOf(page, { k: 'trans', id: T, f }))); await shot(`n${f}`); }
    strip(frames.splice(0), path.join(OUT, `kontakt-normal-${view}.jpg`), h);
    // schnell hindurch und zurück
    for (let i = 0; i < 5; i++) { await page.evaluate(() => scrollBy(0, 3000)); await page.waitForTimeout(50); }
    await page.evaluate(async (y) => scrollTo(0, y), Math.round(await yOf(page, { k: 'top', sel: '#kontakt', px: 200 }))); await shot('schnell', 1200);
    await page.evaluate(async (y) => scrollTo(0, y), Math.round(await yOf(page, { k: 'trans', id: T, f: 0.6 }))); await page.waitForTimeout(500);
    await page.evaluate(async (y) => scrollTo(0, y), Math.round(await yOf(page, { k: 'top', sel: '#kontakt', px: 200 }))); await shot('zurueck', 1200);
    // Reload mitten auf der Seite und Sprung per Anker
    await page.reload(); await page.waitForSelector('html[data-ready]'); await shot('reload', 1500);
    const p2 = await ctx.newPage(); await p2.goto(base + '/#kontakt'); await p2.waitForSelector('html[data-ready]'); await p2.waitForTimeout(1500);
    const fa = path.join(OUT, `.k-${view}-${frames.length}.png`); await p2.screenshot({ path: fa }); frames.push(fa); await p2.close();
    strip(frames.splice(0), path.join(OUT, `kontakt-schnell-zurueck-reload-anker-${view}.jpg`), h);
  },
  // 2 · Zusammenarbeit: erst alles lesbar, dann geht es weiter
  async zusammenarbeit(page, base, view, h) {
    const frames = [];
    const pts = view === 'd' ? [0.4, 0.55, 0.7, 0.85, 1.0] : [0.2, 0.5, 0.8, 1.0];
    for (const f of pts) {
      const w = view === 'd' ? { k: 'pin', sel: '[data-zs-track]', f } : { k: 'top', sel: '.zs-stage', vh: -0.5 + f * (view === 'd' ? 0 : 1.7) };
      await page.evaluate((v) => scrollTo(0, v), Math.round(await yOf(page, w))); await page.waitForTimeout(900);
      const fl = path.join(OUT, `.z-${view}-${frames.length}.png`); await page.screenshot({ path: fl }); frames.push(fl);
    }
    // Danach beginnt der Übergang erst: 0 %, 10 %, 20 % des Übergangs
    for (const f of [0.02, 0.1, 0.2]) { await page.evaluate((v) => scrollTo(0, v), Math.round(await yOf(page, { k: 'trans', id: 't-arbeitsweise-kontakt', f }))); await page.waitForTimeout(900); const fl = path.join(OUT, `.z-${view}-${frames.length}.png`); await page.screenshot({ path: fl }); frames.push(fl); }
    strip(frames, path.join(OUT, `zusammenarbeit-lesezeit-${view}.jpg`), h);
  },
  // 3 · Musterkoffer: zeitgesteuerte Auffächerung (Bilder nach 0,1 / 0,4 / 0,8 / 1,2 / 2 Sekunden)
  async stapel(page, base, view, h) {
    if (view === 'm') return;
    const frames = [];
    await page.evaluate((v) => scrollTo(0, v), Math.round(await yOf(page, { k: 'top', sel: '[data-bsp-track]', vh: -0.45 }))); await page.waitForTimeout(900);
    const f0 = path.join(OUT, `.s-${view}-0.png`); await page.screenshot({ path: f0 }); frames.push(f0);
    await page.evaluate((v) => scrollTo(0, v), Math.round(await yOf(page, { k: 'top', sel: '[data-bsp-track]', vh: -0.34 })));
    let t = 0;
    for (const at of [150, 450, 800, 1250, 2200]) { await page.waitForTimeout(at - t); t = at; const f = path.join(OUT, `.s-${view}-${frames.length}.png`); await page.screenshot({ path: f }); frames.push(f); }
    strip(frames, path.join(OUT, `musterkoffer-auffaechern-${view}.jpg`), h);
  },
  // 4 · /welten: Start (die erste Bewegung beginnt nach höchstens einer halben Bildschirmhöhe)
  async start(page, base, view, h) {
    const frames = [];
    for (const vh of [0, 0.2, 0.35, 0.5, 0.7, 1.0]) { await page.evaluate((v) => scrollTo(0, v), Math.round(await yOf(page, { k: 'top', sel: '#opening', vh }))); await page.waitForTimeout(900); const f = path.join(OUT, `.w-${view}-${frames.length}.png`); await page.screenshot({ path: f }); frames.push(f); }
    strip(frames, path.join(OUT, `welten-start-${view}.jpg`), h);
  },
  // 5 · Torquel: Laserlinie blendet weich ein und aus (beide Richtungen)
  async torquel(page, base, view, h) {
    const frames = [];
    const pos = await page.evaluate(() => { const s = document.querySelector('[data-scan]'); const y = s.getBoundingClientRect().top + scrollY; const vh = innerHeight; return { a: y - 0.7 * vh, b: y + s.offsetHeight - 0.55 * vh }; });
    for (const f of [0.01, 0.04, 0.5, 0.96, 0.99, 1.02]) {
      const y = pos.a + (pos.b - pos.a) * f; await page.evaluate((v) => scrollTo(0, v), Math.round(y)); await page.waitForTimeout(900);
      const fl = path.join(OUT, `.t-${view}-${frames.length}.png`); await page.screenshot({ path: fl }); frames.push(fl);
    }
    strip(frames, path.join(OUT, `torquel-laser-${view}.jpg`), h);
  },
  // 6 · Logo am Ende: Linien der Welten → NP-Logo → Rückzoom
  async logo(page, base, view, h) {
    const frames = [];
    for (const f of [0.34, 0.4, 0.46, 0.52, 0.58, 0.66, 0.8]) { await page.evaluate((v) => scrollTo(0, v), Math.round(await yOf(page, { k: 'trans', id: 't-welt-09-finale', f }))); await page.waitForTimeout(900); const fl = path.join(OUT, `.l-${view}-${frames.length}.png`); await page.screenshot({ path: fl }); frames.push(fl); }
    strip(frames.splice(0), path.join(OUT, `logo-uebergang-${view}.jpg`), h);
    for (const f of [0.0, 0.2, 0.4, 0.6, 1.0]) { await page.evaluate((v) => scrollTo(0, v), Math.round(await yOf(page, { k: 'pin', sel: '[data-finale]', f }))); await page.waitForTimeout(900); const fl = path.join(OUT, `.l-${view}-${frames.length}.png`); await page.screenshot({ path: fl }); frames.push(fl); }
    strip(frames, path.join(OUT, `logo-rueckzoom-${view}.jpg`), h);
  },
  // 7 · Vergleich mit Messingstuhl: siehe scripts/slider-shots.cjs (die Linie bewegt sich nur über den Regler)
  async vergleich(page, base, view, h) {
    await page.evaluate((v) => scrollTo(0, v), Math.round(await yOf(page, { k: 'top', sel: '[data-vergleich]' }))); await page.waitForTimeout(900);
    await page.screenshot({ path: path.join(OUT, `vergleich-messingstuhl-ende-${view}.png`) });
  },
};
const PAGE = { kontakt: '/', zusammenarbeit: '/', stapel: '/', start: '/welten', torquel: '/welten', logo: '/welten', vergleich: '/' };

srv.listen(0, async () => {
  const base = `http://127.0.0.1:${srv.address().port}`;
  fs.mkdirSync(OUT, { recursive: true });
  const want = process.argv.slice(2); const keys = Object.keys(JOBS).filter((k) => !want.length || want.includes(k));
  const browser = await chromium.launch();
  for (const [view, vp, opts, h] of [['d', { width: 1440, height: 900 }, {}, 300], ['m', { width: 390, height: 844 }, { hasTouch: true, isMobile: true }, 520]]) {
    const ctx = await browser.newContext({ viewport: vp, ...opts });
    for (const key of keys) {
      const page = await ctx.newPage();
      await page.goto(base + PAGE[key]); await page.waitForSelector('html[data-ready]', { timeout: 20000 }).catch(() => {}); await page.waitForTimeout(1800);
      if (key === 'torquel') await page.evaluate(() => { const e = document.querySelector('[data-scan]'); scrollTo(0, e.getBoundingClientRect().top + scrollY - 800); });
      await JOBS[key](page, base, view, h, ctx);
      await page.close();
    }
    await ctx.close();
  }
  await browser.close(); srv.close();
  console.log('fertig: docs/screens/feedback/');
});
