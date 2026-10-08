#!/usr/bin/env node
/*
 * Vorschaubilder aus den GEBAUTEN Seiten (nichts davon ist von Hand gemalt):
 *   public/images/werkplan/   Zellen im Werkplan, im Finale und die Wachstumsebene von Welt 01 (t00)
 *   public/images/branche/    Konzeptbild auf den Branchenseiten
 *   public/images/social/     Vorschaubilder für Social Media, 1200 × 630 (JPG)
 * Voraussetzung: npm run build (Ordner dist), Playwright mit Chromium, ImageMagick (convert).
 * Aufruf:  NODE_PATH=$(npm root -g) node scripts/render-previews.cjs
 * Die Bilder liegen im Repository, weil der Deploy-Build kein Chromium hat. Nach Änderungen an einer Welt neu erzeugen.
 */
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const { execFileSync } = require('child_process');

const REPO = path.resolve(__dirname, '..');
const DIST = path.join(REPO, 'dist');
const PUB = path.join(REPO, 'public', 'images');
const TMP = process.env.PREVIEW_TMP || path.join(require('os').tmpdir(), 'np-previews');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.png': 'image/png' };

/** Auf Mobil zeigt die Zelle den Streifen ab dieser Höhe (Viewport-px), dort steht die Überschrift der Welt */
const FOCUS_M = 120;

let cardHtml = '';
const srv = http.createServer((q, r) => {
  let u = q.url.split('?')[0]; if (u === '/') u = '/index.html';
  if (u === '/__card.html') { r.writeHead(200, { 'content-type': TYPES['.html'] }); return r.end(cardHtml); }
  let f = path.join(DIST, u); if (!path.extname(f) && fs.existsSync(f + '.html')) f += '.html';
  if (fs.existsSync(f) && fs.statSync(f).isFile()) { r.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); } else { r.writeHead(404); r.end(); }
});

const convert = (...args) => execFileSync('convert', args);
const webp = (src, out, w, q, crop) =>
  convert(src, ...(crop ? ['-crop', crop, '+repage'] : []), '-resize', `${w}x`, '-quality', String(q), '-define', 'webp:method=6', out);
const kb = (f) => (fs.statSync(f).size / 1024).toFixed(1);

srv.listen(0, async () => {
  const base = `http://127.0.0.1:${srv.address().port}`;
  fs.mkdirSync(TMP, { recursive: true });
  for (const d of ['werkplan', 'branche', 'social']) fs.mkdirSync(path.join(PUB, d), { recursive: true });
  const { builtWorlds, WORLDS, TEXT } = await import(path.join(REPO, 'src/config/journey.js'));
  const { BRANCHEN_LIST } = await import(path.join(REPO, 'src/content/branchen.js'));
  const browser = await chromium.launch();
  const report = [];

  /* ---- 1 · Erster Blick jeder gebauten Welt, Desktop und Mobil ---- */
  const shots = {};
  for (const [label, vp, opts] of [
    ['d', { width: 1440, height: 900 }, { deviceScaleFactor: 1 }],
    ['m', { width: 390, height: 844 }, { hasTouch: true, isMobile: true, deviceScaleFactor: 2 }],
  ]) {
    const ctx = await browser.newContext({ viewport: vp, ...opts });
    const page = await ctx.newPage();
    await page.goto(base + '/'); await page.waitForTimeout(2500);
    // Der NP-Rahmen gehört nicht zur Studie: ausblenden
    await page.evaluate(() => document.querySelectorAll('.frame,.menu,.skiplinks').forEach((e) => e.style.setProperty('display', 'none', 'important')));
    for (const w of builtWorlds) {
      const y = await page.evaluate((a) => document.getElementById(a).getBoundingClientRect().top + scrollY, w.anchor);
      await page.evaluate((v) => scrollTo(0, v), y);
      await page.waitForTimeout(1600);
      const f = path.join(TMP, `welt-${w.nr}-${label}.png`);
      await page.screenshot({ path: f });
      shots[`${w.nr}-${label}`] = f;
    }
    await ctx.close();
  }

  /* ---- 2 · Werkplan-Zellen, Wachstumsebene, Branchenbild ---- */
  for (const w of builtWorlds) {
    const D = shots[`${w.nr}-d`], M = shots[`${w.nr}-m`];
    for (const width of [320, 480, 640]) {
      const out = path.join(PUB, 'werkplan', `welt-${w.nr}-d-${width}.webp`);
      webp(D, out, width, width === 640 ? 62 : 68); report.push([out, kb(out)]);
    }
    // Mobil: Streifen ab FOCUS_M (Bildschirmpunkte, Aufnahme mit Faktor 2)
    for (const width of [320, 480]) {
      const out = path.join(PUB, 'werkplan', `welt-${w.nr}-m-${width}.webp`);
      webp(M, out, width, 68, `780x${Math.round(780 * 0.62)}+0+${FOCUS_M * 2}`); report.push([out, kb(out)]);
    }
    const bild = path.join(PUB, 'branche', `welt-${w.nr}-1200.webp`);
    webp(D, bild, 1200, 72); report.push([bild, kb(bild)]);
  }
  // Wachstumsebene von Welt 01: ganzer erster Blick, Desktop 1280, Mobil 585 breit
  const first = builtWorlds[0].nr;
  const gd = path.join(PUB, 'werkplan', `welt-${first}-grow-d.webp`); webp(shots[`${first}-d`], gd, 1280, 62); report.push([gd, kb(gd)]);
  const gm = path.join(PUB, 'werkplan', `welt-${first}-grow-m.webp`); webp(shots[`${first}-m`], gm, 585, 62); report.push([gm, kb(gm)]);

  /* ---- 3 · Social-Vorschaubilder 1200 × 630 ---- */
  const b64 = (f) => 'data:image/' + (f.endsWith('.png') ? 'png' : 'webp') + ';base64,' + fs.readFileSync(f).toString('base64');
  const logo = 'data:image/svg+xml;base64,' + fs.readFileSync(path.join(PUB, 'logo-np-webdesign.svg')).toString('base64');
  const css = `
    @font-face{font-family:Archivo;src:url(/fonts/archivo-latin-wdth-wght.woff2) format('woff2');font-weight:100 900;font-stretch:62% 125%}
    @font-face{font-family:'Plex Mono';src:url(/fonts/ibm-plex-mono-latin-500-normal.woff2) format('woff2');font-weight:500}
    *{box-sizing:border-box;margin:0}
    html,body{width:1200px;height:630px;background:#F0EBE3;color:#1C1712;font-family:Archivo,sans-serif;overflow:hidden}
    .card{position:relative;width:1200px;height:630px;padding:56px 64px;border-top:6px solid #CE5D17}
    .mono{font-family:'Plex Mono',monospace;font-size:17px;letter-spacing:.08em;text-transform:uppercase;color:#5E5852}
    .brand{display:flex;align-items:center;gap:16px}.brand img{height:50px}
    h1{font-weight:760;font-stretch:90%;letter-spacing:-.02em;line-height:1.04}
    .frame{background:#FBF8F5;border:1px solid #cfc6bb;overflow:hidden;box-shadow:0 18px 40px rgba(28,23,18,.12)}
    .bar{display:flex;align-items:center;gap:6px;height:28px;padding:0 12px;border-bottom:1px solid #cfc6bb}
    .bar i{width:8px;height:8px;border-radius:50%;background:#B5AB9F}.bar span{margin-left:auto}
    .frame img{display:block;width:100%;object-fit:cover;object-position:top}
    .note{color:#A34A0D}
  `;
  const frame = (img, nr, w, h) =>
    `<div class="frame" style="width:${w}px"><div class="bar mono" style="font-size:13px"><i></i><i></i><i></i><span>Studie ${nr}</span></div><img src="${img}" style="height:${h}px"></div>`;
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const cards = {
    // Startseite: alle gebauten Welten nebeneinander
    start: `<div class="card"><div class="brand"><img src="${logo}"><span class="mono">NP Webdesign · Schwandorf</span></div>
      <h1 style="font-size:54px;margin:34px 0 0;max-width:980px">${esc(TEXT.statement)}</h1>
      <div style="position:absolute;left:64px;right:64px;bottom:50px;display:flex;gap:30px">${builtWorlds.map((w) => frame(b64(shots[`${w.nr}-d`]), w.nr, 340, 213)).join('')}</div></div>`,
    // Leistungen und Preise: ohne Welt, nur Marke
    leistungen: `<div class="card"><div class="brand"><img src="${logo}"><span class="mono">NP Webdesign · Schwandorf</span></div>
      <h1 style="font-size:96px;margin-top:150px;max-width:900px">Leistungen und Preise</h1>
      <p class="mono note" style="margin-top:30px;font-size:22px">Starter · Professional · Premium</p></div>`,
  };
  for (const b of BRANCHEN_LIST) {
    const w = WORLDS.find((x) => x.nr === b.world);
    const kopf = `<div class="brand"><img src="${logo}"><span class="mono">NP Webdesign · Schwandorf</span></div>`;
    const titel = esc(b.title.replace(/ – .*$/, ''));
    if (w.built) {
      cards[`branche-${b.slug}`] = `<div class="card">${kopf}
        <h1 style="font-size:60px;margin-top:70px;width:470px">${titel}</h1>
        <p class="mono note" style="margin-top:28px;width:460px">Studie ${w.nr} · ${esc(w.name)}<br>${esc(w.branche)}</p>
        <div style="position:absolute;right:64px;top:112px">${frame(b64(shots[`${w.nr}-d`]), w.nr, 580, 363)}</div></div>`;
    } else {
      cards[`branche-${b.slug}`] = `<div class="card">${kopf}
        <h1 style="font-size:84px;margin-top:130px;max-width:960px">${titel}</h1>
        <p class="mono note" style="margin-top:30px;font-size:20px">Studie ${w.nr} · ${esc(w.name)} · ${esc(w.branche)}</p></div>`;
    }
  }
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 } });
  const page = await ctx.newPage();
  for (const [name, html] of Object.entries(cards)) {
    cardHtml = `<!doctype html><meta charset="utf-8"><style>${css}</style>${html}`;
    await page.goto(base + '/__card.html'); await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(250);
    const png = path.join(TMP, `social-${name}.png`);
    await page.screenshot({ path: png });
    const out = path.join(PUB, 'social', `${name}.jpg`);
    convert(png, '-quality', '84', '-sampling-factor', '4:2:0', '-strip', out); report.push([out, kb(out)]);
  }
  await browser.close(); srv.close();
  for (const [f, s] of report) console.log(s.padStart(7), 'KB ', path.relative(REPO, f));
});
