#!/usr/bin/env node
/*
 * Prüfung und Bildfolgen zum Vergleichs-Regler „Der Unterschied“ (Startseite, Abschnitt S3) nach docs/screens/slider/.
 * Die Trennlinie bewegt sich nur über den Regler. Der Test misst die Position vor und nach dem Scrollen, nach dem Ziehen am Griff
 * (Maus am Desktop, Touch mobil per CDP), nach Pfeiltasten und prüft, dass senkrechtes Wischen über der Grafik scrollt und die Linie stehen lässt.
 * Voraussetzung: npm run build, Playwright mit Chromium, ImageMagick (convert).
 * Aufruf:  NODE_PATH=$(npm root -g) node scripts/slider-shots.cjs
 */
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..', 'dist');
const OUT = path.resolve(__dirname, '..', 'docs', 'screens', 'slider');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.png': 'image/png' };
const srv = http.createServer((q, r) => {
  let u = q.url.split('?')[0]; if (u === '/') u = '/index.html';
  let f = path.join(ROOT, u); if (!path.extname(f) && fs.existsSync(f + '.html')) f += '.html';
  if (fs.existsSync(f) && fs.statSync(f).isFile()) { r.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); } else { r.writeHead(404); r.end(); }
});
const log = [];
const say = (s) => { log.push(s); console.log(s); };

srv.listen(0, async () => {
  const base = `http://127.0.0.1:${srv.address().port}`;
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  for (const [view, vp, opts, h] of [['d', { width: 1440, height: 900 }, {}, 300], ['m', { width: 390, height: 844 }, { hasTouch: true, isMobile: true }, 560]]) {
    const ctx = await browser.newContext({ viewport: vp, ...opts });
    const page = await ctx.newPage();
    const errs = []; page.on('pageerror', (e) => errs.push(e.message));
    await page.goto(base + '/'); await page.waitForSelector('html[data-ready]'); await page.waitForTimeout(1800);
    const val = () => page.evaluate(() => ({ regler: +document.querySelector('[data-vg-range]').value, linie: document.querySelector('[data-vg-divider]').style.left }));
    const handleBox = () => page.evaluate(() => { const r = document.querySelector('[data-vg-handle]').getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
    const viewBox = () => page.evaluate(() => { const r = document.querySelector('[data-vg-view]').getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
    const frames = []; const shot = async (wait = 500) => { await page.waitForTimeout(wait); const f = path.join(OUT, `.s-${view}-${frames.length}.png`); await page.screenshot({ path: f }); frames.push(f); };
    // in Sicht bringen (Abschnitt oben, Rahmen mittig)
    await page.evaluate(() => { const e = document.querySelector('.vg-compare'); scrollTo(0, e.getBoundingClientRect().top + scrollY - innerHeight * 0.18); }); await page.waitForTimeout(900);
    const y0 = await page.evaluate(() => Math.round(scrollY));
    say(`[${view}] Start: ${JSON.stringify(await val())}`); await shot();
    // 1 · Scrollen verändert die Linie nicht
    await page.evaluate(() => scrollBy(0, 600)); await page.waitForTimeout(500); const a = await val();
    await page.evaluate(() => scrollBy(0, -1200)); await page.waitForTimeout(400); const b = await val();
    await page.evaluate((y) => scrollTo(0, y), y0); await page.waitForTimeout(500);
    say(`[${view}] Scrollen (+600, −1200, zurück): ${JSON.stringify(a)} / ${JSON.stringify(b)} → unverändert: ${a.regler === 50 && b.regler === 50}`);
    // 2 · Ziehen am Griff
    const dragTo = async (frac) => {
      const hb = await handleBox(); const vb = await viewBox(); const tx = vb.x + vb.w * frac;
      if (view === 'd') { await page.mouse.move(hb.x, hb.y); await page.mouse.down(); await page.mouse.move((hb.x + tx) / 2, hb.y, { steps: 6 }); await page.mouse.move(tx, hb.y, { steps: 6 }); await page.mouse.up(); }
      else {
        const cdp = await ctx.newCDPSession(page); const pt = (x, y) => [{ x, y, id: 1 }];
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: pt(hb.x, hb.y) });
        for (let i = 1; i <= 12; i += 1) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: pt(hb.x + ((tx - hb.x) * i) / 12, hb.y + 2) });
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await cdp.detach();
      }
      await page.waitForTimeout(500);
    };
    await dragTo(0.18); say(`[${view}] Ziehen am Griff nach links (Ziel 18 % von links, Regler soll 18 zeigen): ${JSON.stringify(await val())}`); await shot();
    await dragTo(0.82); say(`[${view}] Ziehen am Griff nach rechts (Ziel 82 % von links, Regler soll 82 zeigen): ${JSON.stringify(await val())}`); await shot();
    // 3 · Tastatur
    await page.focus('[data-vg-range]'); const k0 = (await val()).regler;
    for (let i = 0; i < 20; i += 1) await page.keyboard.press('ArrowRight');
    const k1 = (await val()).regler; for (let i = 0; i < 45; i += 1) await page.keyboard.press('ArrowLeft'); const k2 = (await val()).regler;
    say(`[${view}] Pfeiltasten: Start ${k0}, 20 × → (Linie wandert nach rechts) ergibt ${k1}, dann 45 × ← ergibt ${k2}`); await shot();
    // 4 · mobil: senkrechtes Wischen über der Grafik scrollt, die Linie bleibt
    if (view === 'm') {
      await page.evaluate((y) => scrollTo(0, y), y0); await page.waitForTimeout(500);
      const before = await val(); const sy0 = await page.evaluate(() => scrollY); const vb = await viewBox();
      const cdp = await ctx.newCDPSession(page); const x = vb.x + vb.w * 0.3; const y1 = vb.y + vb.h * 0.8;
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y: y1, id: 1 }] });
      for (let i = 1; i <= 12; i += 1) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + 3, y: y1 - i * 22, id: 1 }] });
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await cdp.detach(); await page.waitForTimeout(700);
      const after = await val(); const sy1 = await page.evaluate(() => scrollY);
      say(`[m] Senkrechtes Wischen über der Grafik: Seite scrollt um ${Math.round(sy1 - sy0)} px, Regler ${before.regler} → ${after.regler} (soll gleich sein)`);
    }
    say(`[${view}] Skriptfehler: ${errs.length ? errs.join('; ') : 'keine'}`);
    execFileSync('convert', [...frames, '-resize', `x${h}`, '-quality', '82', '+append', path.join(OUT, `slider-${view}.jpg`)]); frames.forEach((f) => fs.unlinkSync(f));
    await ctx.close();
  }
  fs.writeFileSync(path.join(OUT, 'pruefprotokoll.txt'), log.join('\n') + '\n');
  await browser.close(); srv.close();
  console.log('fertig: docs/screens/slider/');
});
