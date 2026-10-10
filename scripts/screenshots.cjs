#!/usr/bin/env node
/*
 * Bildschirmfotos der Reise (Desktop 1440×900, Mobil 390×844) nach docs/screens/.
 * Voraussetzung: npm run build (Ordner dist), Playwright mit Chromium.
 * Aufruf:  NODE_PATH=$(npm root -g) node scripts/screenshots.cjs
 *          ONLY='welt04' NODE_PATH=... node scripts/screenshots.cjs   (nur Aufnahmen, deren Name passt; löscht nichts)
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

/** Position innerhalb einer gepinnten Szene (Bruchteil der Scrolllänge) oder Abschnittsanfang */
const at = {
  top: (sel, off = 0) => ({ sel, off, kind: 'top' }),
  prog: (sel, p) => ({ sel, p, kind: 'prog' }),
  opening: (p) => ({ p, kind: 'opening' }),
  js: (fn) => ({ fn, kind: 'js' }),
};
const SHOTS = [
  ['hero', at.js(() => 0)],
  ['werkplan', at.js(() => { const e = document.getElementById('werkplan'); return e.getBoundingClientRect().top + scrollY; })],
  ['t00-zelle-waechst', at.opening(0.5)],
  ['welt01-einstieg', at.top('#baeckerei')],
  ['welt01-backplan', at.top('.w01-plan', -80)],
  ['t01-bon', at.prog('[data-section="t-welt-01-welt-02"]', 0.55)],
  ['welt02-einstieg', at.top('#barbershop')],
  ['welt02-preise', at.top('.w02-preise', -120)],
  ['t02-goldlinie', at.prog('[data-section="t-welt-02-welt-03"]', 0.55)],
  ['welt03-einstieg', at.top('#bau')],
  ['welt03-schnitt', at.top('.w03-sheet', -36)],
  ['t03-pruefstempel', at.prog('[data-section="t-welt-03-warum"]', 0.5)],
  ['zwischenspiel1-warum', at.top('#warum')],
  ['t04-n-blende-strich', at.prog('[data-section="t-warum-welt-04"]', 0.3)],
  ['t04-n-blende-fuellung', at.prog('[data-section="t-warum-welt-04"]', 0.55)],
  ['t04-n-blende-zufall', at.prog('[data-section="t-warum-welt-04"]', 0.82)],
  ['welt04-einstieg', at.top('#kanzlei')],
  ['welt04-leitartikel', at.top('.w04-paper', -100)],
  ['welt04-register', at.top('.w04-register-wrap', -100)],
  ['t05-zierlinie-gerade', at.prog('[data-section="t-welt-04-welt-05"]', 0.28)],
  ['t05-zierlinie-kurve', at.prog('[data-section="t-welt-04-welt-05"]', 0.6)],
  ['welt05-einstieg', at.top('#oldtimer')],
  ['welt05-querfahrt-anfang', at.prog('[data-fahrt]', 0.12)],
  ['welt05-querfahrt-mitte', at.prog('[data-fahrt]', 0.62)],
  ['welt05-datenblatt', at.top('.w05-daten', -100)],
  ['welt05-vorher-nachher', at.top('.w05-vn-wrap', -100)],
  ['t06-scheinwerfer-ring', at.prog('[data-section="t-welt-05-welt-06"]', 0.22)],
  ['t06-scheinwerfer-waechst', at.prog('[data-section="t-welt-05-welt-06"]', 0.62)],
  ['welt06-einstieg', at.top('#coaching')],
  ['welt06-haltung', at.top('.w06-haltung', -100)],
  ['welt06-fragen', at.top('.w06-fragen', -100)],
  ['welt06-termin', at.top('.w06-termin', -100)],
  ['t07-kreise-ellipsen', at.prog('[data-section="t-welt-06-arbeitsweise"]', 0.3)],
  ['t07-kreise-linie', at.prog('[data-section="t-welt-06-arbeitsweise"]', 0.7)],

  ['zwischenspiel2-arbeitsweise', at.prog('#arbeitsweise', 0.5)],
  ['t08-strahl-gluehen', at.prog('[data-section="t-arbeitsweise-welt-07"]', 0.45)],
  ['t08-strahl-laser', at.prog('[data-section="t-arbeitsweise-welt-07"]', 0.8)],
  ['welt07-einstieg', at.top('#industrie')],
  ['welt07-scan', at.top('.w07-scan', -60)],
  ['welt07-dreher', at.top('.w07-dreher', -100)],
  ['welt07-anfrage', at.top('.w07-anfrage', -100)],
  ['t09-messraster-streut', at.prog('[data-section="t-welt-07-welt-08"]', 0.22)],
  ['t09-messraster-kalender', at.prog('[data-section="t-welt-07-welt-08"]', 0.85)],
  ['welt08-einstieg', at.top('#physiotherapie')],
  ['welt08-buchung', at.top('.w08-layout', -80)],
  ['t10-wasser-weiher', at.prog('[data-section="t-welt-08-welt-09"]', 0.2)],
  ['t10-wasser-see', at.prog('[data-section="t-welt-08-welt-09"]', 0.7)],
  ['welt09-einstieg', at.top('#landgasthof')],
  ['welt09-abend', at.prog('[data-tag]', 0.12)],
  ['welt09-nacht', at.prog('[data-tag]', 0.92)],
  ['welt09-speisekarte', at.top('.w09-speise', -100)],
  ['t11-fenster-licht', at.prog('[data-section="t-welt-09-ueber-mich"]', 0.3)],
  ['t11-fenster-waechst', at.prog('[data-section="t-welt-09-ueber-mich"]', 0.65)],
  ['zwischenspiel3-ueber-mich', at.top('#ueber-mich')],
  ['t12-ausziehen-farben', at.prog('[data-section="t-ueber-mich-welt-10"]', 0.3)],
  ['t12-ausziehen-schrift', at.prog('[data-section="t-ueber-mich-welt-10"]', 0.5)],
  ['t12-ausziehen-abstaende', at.prog('[data-section="t-ueber-mich-welt-10"]', 0.7)],
  ['t12-ausziehen-layout', at.prog('[data-section="t-ueber-mich-welt-10"]', 0.92)],
  ['welt10-einstieg', at.top('#labor')],
  ['welt10-geruest', at.top('.w10-geruest', -80)],
  ['welt10-bruch', at.top('.w10-bruch', -60)],
  ['welt10-ende', at.top('.w10-ende', -200)],
  ['t13-rohbau-liste', at.prog('[data-section="t-welt-10-finale"]', 0.18)],
  ['t13-rohbau-ordnet', at.prog('[data-section="t-welt-10-finale"]', 0.6)],
  ['t13-rohbau-werkplan', at.prog('[data-section="t-welt-10-finale"]', 0.86)],
  ['finale', at.prog('#finale', 0.72)],
  ['finale-sprung-in-kontakt', at.prog('#finale', 0.9)],
  ['kontakt', at.top('#kontakt')],
];
SHOTS.forEach((s, i) => { s[0] = String(i + 1).padStart(2, '0') + '-' + s[0]; });

srv.listen(0, async () => {
  const base = `http://127.0.0.1:${srv.address().port}/`;
  fs.mkdirSync(OUT, { recursive: true });
  if (!process.env.ONLY) fs.readdirSync(OUT).filter((f) => f.endsWith('.png')).forEach((f) => fs.unlinkSync(path.join(OUT, f)));
  const browser = await chromium.launch();
  for (const [label, vp, opts] of [
    ['desktop', { width: 1440, height: 900 }, {}],
    ['mobile', { width: 390, height: 844 }, { hasTouch: true, isMobile: true }],
  ]) {
    const ctx = await browser.newContext({ viewport: vp, ...opts });
    const page = await ctx.newPage();
    const errs = []; page.on('pageerror', (e) => errs.push(e.message));
    await page.goto(base); await page.waitForTimeout(2500);
    for (const [name, pos] of SHOTS.filter(([n]) => !process.env.ONLY || new RegExp(process.env.ONLY).test(n))) {
      const y = await page.evaluate(({ pos, fn }) => {
        const H = innerHeight;
        const tops = (s) => document.querySelector(s).getBoundingClientRect().top + scrollY;
        if (pos.kind === 'top') return tops(pos.sel) + pos.off;
        if (pos.kind === 'prog') { const e = document.querySelector(pos.sel); const len = e.offsetHeight - H; return tops(pos.sel) + len * pos.p; }
        if (pos.kind === 'opening') {
          const s = document.getElementById('opening'); const css = (n) => parseFloat(getComputedStyle(s).getPropertyValue(n));
          return tops('#opening') + ((css('--expansion') + css('--plan')) / 100 + (css('--grow') / 100) * pos.p) * H;
        }
        return 0;
      }, { pos: pos.kind === 'js' ? { kind: 'js' } : pos, fn: null }).catch(() => null);
      const target = pos.kind === 'js' ? await page.evaluate(`(${pos.fn.toString()})()`) : y;
      await page.evaluate((v) => scrollTo(0, v), target);
      await page.waitForTimeout(1400);
      await page.screenshot({ path: path.join(OUT, `${name}-${label}.png`) });
    }
    console.log(label, 'Fehler:', errs.length ? errs : 'keine');
    await ctx.close();
  }
  await browser.close(); srv.close();
});
