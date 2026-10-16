#!/usr/bin/env node
/*
 * Bildschirmfotos von /welten (und der Startseite) in Desktop 1440×900 und Mobil 390×844 nach docs/screens/.
 * Voraussetzung: npm run build (Ordner dist), Playwright mit Chromium.
 * Aufruf:  NODE_PATH=$(npm root -g) node scripts/screenshots.cjs
 *          ONLY='t-welt-03' NODE_PATH=... node scripts/screenshots.cjs   (nur Aufnahmen, deren Name passt; löscht nichts)
 * Die Übergänge werden an fünf Stellen ihrer Länge aufgenommen (Anteil von L = 200 + len Bildschirmhöhen, siehe docs/troubleshooting-uebergaenge.md).
 */
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', 'dist');
const OUT = path.resolve(__dirname, '..', 'docs', 'screens');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.png': 'image/png' };
const srv = http.createServer((q, r) => {
  let u = q.url.split('?')[0]; if (u === '/') u = '/index.html';
  let f = path.join(ROOT, u); if (!path.extname(f) && fs.existsSync(f + '.html')) f += '.html';
  if (fs.existsSync(f) && fs.statSync(f).isFile()) { r.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); } else { r.writeHead(404); r.end(); }
});

/** Orte auf /welten: Abschnittsanfang, Anteil einer gepinnten Szene, Anteil eines Übergangs */
const top = (sel, off = 0) => ({ kind: 'top', sel, off });
const trans = (id, f) => ({ kind: 'trans', id, f });
const opening = (f) => ({ kind: 'opening', f });
const finale = (f) => ({ kind: 'finale', f });
const WELTEN = [
  ['01-werkplan', top('#werkplan')],
  ['02-t00-zelle-waechst', opening(0.42)],
  ['03-welt01-einstieg', top('#baeckerei', 4)],
  ...[['04', 't-welt-01-welt-02', 'bon'], ['06', 't-welt-02-welt-03', 'goldlinie'], ['08', 't-welt-03-welt-04', 'stempel'], ['10', 't-welt-04-welt-05', 'zierlinie'],
    ['12', 't-welt-05-welt-06', 'scheinwerfer'], ['14', 't-welt-06-welt-07', 'messkreise'], ['16', 't-welt-07-welt-08', 'messraster'], ['18', 't-welt-08-welt-09', 'wasser'], ['20', 't-welt-09-finale', 'fensterplan']]
    .flatMap(([n, id, name]) => [[`${n}-uebergang-${name}-anfang`, trans(id, 0.18)], [`${n}b-uebergang-${name}-mitte`, trans(id, 0.45)], [`${n}c-uebergang-${name}-landung`, trans(id, 0.72)]]),
  ['05-welt02-einstieg', top('#barbershop', 4)], ['07-welt03-einstieg', top('#bau', 4)], ['09-welt04-einstieg', top('#kanzlei', 4)], ['11-welt05-einstieg', top('#oldtimer', 4)],
  ['13-welt06-einstieg', top('#coaching', 4)], ['15-welt07-einstieg', top('#industrie', 4)], ['17-welt08-einstieg', top('#physiotherapie', 4)], ['19-welt09-einstieg', top('#landgasthof', 4)],
  ['21-finale-zehnter-platz', finale(0.02)], ['22-finale-rueckzoom', finale(0.3)], ['23-finale-einladung', finale(0.9)],
];
const START = [['start-oben', top('#start')], ['start-kontakt', top('#kontakt')], ['start-faq', top('#faq')]];

srv.listen(0, async () => {
  const base = `http://127.0.0.1:${srv.address().port}`;
  const only = process.env.ONLY ? new RegExp(process.env.ONLY) : null;
  if (!only) for (const f of fs.readdirSync(OUT)) if (/\.(png|jpg)$/.test(f)) fs.unlinkSync(path.join(OUT, f));
  const browser = await chromium.launch();
  const list = [];
  for (const [view, vp, opts] of [['d', { width: 1440, height: 900 }, {}], ['m', { width: 390, height: 844 }, { hasTouch: true, isMobile: true }]]) {
    const ctx = await browser.newContext({ viewport: vp, ...opts });
    for (const [pageUrl, shots, prefix] of [['/welten', WELTEN, ''], ['/', START, 'a-']]) {
      const page = await ctx.newPage();
      await page.goto(base + pageUrl); await page.waitForSelector('html[data-ready]', { timeout: 20000 }).catch(() => {}); await page.waitForTimeout(1800);
      for (const [name, where] of shots) {
        const file = `${prefix}${name}-${view}.png`;
        if (only && !only.test(file)) continue;
        const y = await page.evaluate(([w, vh]) => {
          const abs = (e) => e.getBoundingClientRect().top + scrollY;
          const svh = (() => { const d = document.createElement('div'); d.style.cssText = 'position:absolute;height:100svh;width:0'; document.body.append(d); const u = d.offsetHeight / 100; d.remove(); return u; })();
          const css = (e, n) => parseFloat(getComputedStyle(e).getPropertyValue(n)) || 0;
          if (w.kind === 'top') { const e = document.querySelector(w.sel); return abs(e) + w.off; }
          if (w.kind === 'trans') { const t = document.querySelector(`[data-section="${w.id}"]`); return abs(t) + w.f * (200 + css(t, '--len')) * svh; }
          if (w.kind === 'opening') { const o = document.getElementById('opening'); return abs(o) + (css(o, '--plan') + w.f * css(o, '--grow')) * svh; }
          if (w.kind === 'finale') { const f = document.querySelector('[data-finale]'); return abs(f) + w.f * css(f, '--len') * svh; }
          return 0;
        }, [where, vp.height]);
        await page.evaluate((v) => scrollTo(0, v), Math.round(y));
        await page.waitForTimeout(900);
        await page.screenshot({ path: path.join(OUT, file) });
        list.push(file);
      }
      await page.close();
    }
    await ctx.close();
  }
  await browser.close(); srv.close();
  console.log(list.length + ' Bilder in docs/screens/');
});
