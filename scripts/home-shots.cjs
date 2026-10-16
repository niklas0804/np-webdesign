#!/usr/bin/env node
/*
 * Bildschirmfotos und Bildfolgen der Startseite (Auftrag 11. Oktober 2026, Teil C) nach docs/screens/home/.
 * Einzelbilder je Abschnitt (Desktop 1440×900, Mobil 390×844) und eine Bildfolge je Signatur-Moment (Streifen aus mehreren Bildern).
 * Voraussetzung: npm run build (Ordner dist), Playwright mit Chromium, ImageMagick (convert).
 * Aufruf:  NODE_PATH=$(npm root -g) node scripts/home-shots.cjs [Abschnitt …]    (ohne Angabe: alle; sonst z. B. s1 s2 s3)
 */
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..', 'dist');
const OUT = path.resolve(__dirname, '..', 'docs', 'screens', 'home');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.png': 'image/png' };
const srv = http.createServer((q, r) => {
  let u = q.url.split('?')[0]; if (u === '/') u = '/index.html';
  let f = path.join(ROOT, u); if (!path.extname(f) && fs.existsSync(f + '.html')) f += '.html';
  if (fs.existsSync(f) && fs.statSync(f).isFile()) { r.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); } else { r.writeHead(404); r.end(); }
});

/** Orte: pin = Anteil der Pinlänge eines Abschnitts (Spur), t = Anteil eines Übergangs (L = 200 + len Bildschirmhöhen), top = Abschnittsanfang */
const P = (sel, f) => ({ k: 'pin', sel, f });
const TR = (id, f) => ({ k: 'trans', id, f });
const TOP = (sel, off = 0) => ({ k: 'top', sel, off });
const SHOTS = {
  s1: { still: [['s1-hero', { k: 'y', y: 0 }]], seq: { name: 's1-sequenz-logo', anim: [150, 500, 850, 1200, 1500, 1900] } },
  s2: { still: [['s2-warum-satz1', P('.warum', 0.12)], ['s2-warum-satz2', P('.warum', 0.5)], ['s2-warum-satz3', P('.warum', 0.9)]],
    seq: { name: 's2-sequenz-saetze', at: [P('.warum', 0), P('.warum', 0.18), P('.warum', 0.34), P('.warum', 0.5), P('.warum', 0.7), P('.warum', 0.88)] } },
  s3: { still: [['s3-vergleich-anfang', P('[data-vg-track]', 0)], ['s3-vergleich-mitte', P('[data-vg-track]', 0.5)], ['s3-vergleich-ende', P('[data-vg-track]', 1)], ['s3-nutzen', TOP('.vg-after', -80)]],
    seq: { name: 's3-sequenz-trennlinie', at: [P('[data-vg-track]', 0.05), P('[data-vg-track]', 0.25), P('[data-vg-track]', 0.45), P('[data-vg-track]', 0.65), P('[data-vg-track]', 0.85), P('[data-vg-track]', 1)] } },
  t23: { still: [], seq: { name: 's2-s3-uebergang-n-blende', at: [TR('t-warum-vergleich', 0.18), TR('t-warum-vergleich', 0.34), TR('t-warum-vergleich', 0.42), TR('t-warum-vergleich', 0.5), TR('t-warum-vergleich', 0.58), TR('t-warum-vergleich', 0.72), TR('t-warum-vergleich', 0.86), TR('t-warum-vergleich', 0.97)] } },
};

const posOf = (w) => ([w]) => 0;
async function yOf(page, w) {
  return page.evaluate((w) => {
    const svh = (() => { const d = document.createElement('div'); d.style.cssText = 'position:absolute;height:100svh;width:0'; document.body.append(d); const u = d.offsetHeight / 100; d.remove(); return u; })();
    const abs = (e) => e.getBoundingClientRect().top + scrollY;
    if (w.k === 'y') return w.y;
    if (w.k === 'top') return abs(document.querySelector(w.sel)) + w.off;
    if (w.k === 'pin') { const e = document.querySelector(w.sel); return abs(e) + w.f * (e.offsetHeight - 100 * svh); }
    if (w.k === 'trans') { const t = document.querySelector(`[data-section="${w.id}"]`); const len = parseFloat(getComputedStyle(t).getPropertyValue('--len')) || 60; return abs(t) + w.f * (200 + len) * svh; }
    return 0;
  }, w);
}

srv.listen(0, async () => {
  const base = `http://127.0.0.1:${srv.address().port}`;
  fs.mkdirSync(OUT, { recursive: true });
  const want = process.argv.slice(2);
  const keys = Object.keys(SHOTS).filter((k) => !want.length || want.includes(k) || (k === 't23' && want.includes('s2')) || (k === 't23' && want.includes('s3')));
  const browser = await chromium.launch();
  for (const [view, vp, opts] of [['d', { width: 1440, height: 900 }, {}], ['m', { width: 390, height: 844 }, { hasTouch: true, isMobile: true }]]) {
    const ctx = await browser.newContext({ viewport: vp, ...opts });
    const page = await ctx.newPage();
    await page.goto(base + '/'); await page.waitForSelector('html[data-ready]', { timeout: 20000 }).catch(() => {}); await page.waitForTimeout(2000);
    for (const key of keys) {
      const def = SHOTS[key];
      for (const [name, where] of def.still) {
        await page.evaluate((v) => scrollTo(0, v), Math.round(await yOf(page, where))); await page.waitForTimeout(1000);
        await page.screenshot({ path: path.join(OUT, `${name}-${view}.png`) });
      }
      const seq = def.seq; const frames = [];
      if (seq.at) {
        for (const [i, where] of seq.at.entries()) {
          await page.evaluate((v) => scrollTo(0, v), Math.round(await yOf(page, where))); await page.waitForTimeout(900);
          const f = path.join(OUT, `.f-${view}-${i}.png`); await page.screenshot({ path: f }); frames.push(f);
        }
      } else if (seq.anim) {
        const p2 = await ctx.newPage(); await p2.goto(base + '/', { waitUntil: 'domcontentloaded' }); await p2.waitForTimeout(300);
        for (const [i, t] of seq.anim.entries()) {
          await p2.evaluate((t) => document.getAnimations().forEach((a) => { a.pause(); a.currentTime = t; }), t); await p2.waitForTimeout(150);
          const f = path.join(OUT, `.f-${view}-${i}.png`); await p2.screenshot({ path: f }); frames.push(f);
        }
        await p2.close();
      }
      if (frames.length) {
        const h = view === 'd' ? 300 : 520;
        execFileSync('convert', [...frames, '-resize', `x${h}`, '-quality', '82', '+append', path.join(OUT, `${seq.name}-${view}.jpg`)]);
        frames.forEach((f) => fs.unlinkSync(f));
      }
    }
    await ctx.close();
  }
  await browser.close(); srv.close();
  console.log('fertig: docs/screens/home/');
});
