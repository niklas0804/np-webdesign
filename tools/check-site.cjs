#!/usr/bin/env node
/*
 * Datenschutz- und Qualitäts-Abnahme (Blueprint Q2 „Datenschutz-Abnahme vor jedem Deploy“, T „Abnahme jeder Phase“).
 *
 * Startet einen lokalen Server für den Repo-Ordner, öffnet jede HTML-Seite in drei Viewports
 * und prüft:
 *   1. null Anfragen an fremde Hosts
 *   2. keine Cookies, kein localStorage/sessionStorage ohne Klick
 *   3. keine Konsolenfehler und keine CSP-Verstöße
 *   4. kein seitliches Scrollen (ab 320 px)
 *   5. keine Endlos-Animationen (WCAG 2.2.2) bei „Bewegung reduzieren“
 *   6. Inhalt ohne JavaScript sichtbar
 *   7. Content-Security-Policy je Seite gesetzt, ohne 'unsafe-*' und ohne Fremdhosts
 *   8. kein HTML-Verweis auf fremde Hosts außer normalen Links (<a href>)
 *
 * Aufruf:  NODE_PATH=$(npm root -g) node tools/check-site.cjs [Ordner]
 *          (ohne Ordner: Repo-Wurzel; für die gebaute Seite: dist)
 * Voraussetzung: Playwright mit Chromium (nur lokal nötig, nicht Teil der Website).
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.resolve(process.argv[2] || path.join(__dirname, '..'));
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.txt': 'text/plain', '.xml': 'application/xml', '.json': 'application/json', '.jpg': 'image/jpeg', '.png': 'image/png', '.mp4': 'video/mp4' };
const VIEWPORTS = [{ name: 'desktop', width: 1440, height: 900 }, { name: 'mobil', width: 390, height: 844 }, { name: 'schmal', width: 320, height: 640 }];
/* Elemente, die ohne JavaScript sichtbar sein müssen (nur geprüft, wenn vorhanden) */
const NOJS_VISIBLE = ['h1', '.hero-title', '.hero-sub', '.hero-lead', '.pkg', '.pstep', '.krow', '.contact-box', '.faq-answer p', '.ueber-title', '.fact',
  '.wp-cell', '.wp-statement h2', '.world-title', '.statement', '.step', '.faq-item summary', '.note', '.window-frame', '.finale h2', '.kontakt h2'];

const failures = [];
const notes = [];
const fail = (page, msg) => failures.push(`${page}: ${msg}`);

function serve() {
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p.endsWith('/')) p += 'index.html';
    const file = path.join(ROOT, p);
    let resolved = file;
    if (!path.extname(file) && fs.existsSync(file + '.html')) resolved = file + '.html'; // /leistungen → leistungen.html
    if (!resolved.startsWith(ROOT) || !fs.existsSync(resolved) || fs.statSync(resolved).isDirectory()) {
      const nf = path.join(ROOT, '404.html');
      res.writeHead(404, { 'content-type': TYPES['.html'] });
      return res.end(fs.existsSync(nf) ? fs.readFileSync(nf) : 'Not found');
    }
    res.writeHead(200, { 'content-type': TYPES[path.extname(resolved)] || 'application/octet-stream' });
    fs.createReadStream(resolved).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

function staticChecks(name, html) {
  const csp = html.match(/<meta[^>]+http-equiv=["']Content-Security-Policy["'][^>]*content=["']([^"']+)["']/i);
  if (!csp) fail(name, 'keine Content-Security-Policy (meta) gefunden');
  else {
    if (/unsafe-(inline|eval)/.test(csp[1])) fail(name, `CSP enthält unsafe-*: ${csp[1]}`);
    if (/https?:\/\//.test(csp[1])) fail(name, `CSP enthält Fremdhost: ${csp[1]}`);
  }
  const embeds = html.match(/<(link|script|img|source|iframe|video|audio|embed|object)\b[^>]*(src|href)=["'](https?:)?\/\/[^"']+["'][^>]*>/gi) || [];
  for (const tag of embeds) {
    if (/<link\b[^>]*rel=["']?(canonical|alternate)/i.test(tag)) continue; // Kanonische Adresse ist keine Anfrage
    fail(name, `HTML bindet Fremdhost ein: ${tag.slice(0, 120)}`);
  }
  if (/rel=["']?(preconnect|dns-prefetch|prefetch)/i.test(html)) fail(name, 'preconnect/dns-prefetch gefunden');
  // Strikte CSP: kein Inline-Code (Datenblöcke wie JSON-LD sind erlaubt)
  const inline = (html.match(/<script\b(?![^>]*\bsrc=)(?![^>]*type=["']application\/ld\+json["'])[^>]*>/gi) || []);
  if (inline.length) fail(name, `Inline-<script> gefunden: ${inline[0]}`);
  if (/<style[\s>]/i.test(html)) fail(name, 'Inline-<style> gefunden');
  if (/\sstyle=["']/i.test(html)) fail(name, 'style-Attribut im HTML gefunden');
  if (/\son(click|load|error|change|submit)=/i.test(html)) fail(name, 'Inline-Event-Handler gefunden');
}

async function run() {
  const server = await serve();
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  // alle HTML-Seiten, auch in Unterordnern (z. B. branchenloesungen/)
  const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (e.name === 'node_modules' || e.name === 'tools' || e.name.startsWith('.')) return [];
    const full = path.join(dir, e.name);
    return e.isDirectory() ? walk(full) : e.name.endsWith('.html') ? [path.relative(ROOT, full)] : [];
  });
  const pages = walk(ROOT).sort();

  for (const file of pages) {
    staticChecks(file, fs.readFileSync(path.join(ROOT, file), 'utf8'));

    for (const vp of VIEWPORTS) {
      const label = `${file} [${vp.name} ${vp.width}px]`;
      const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, reducedMotion: vp.name === 'desktop' ? 'no-preference' : 'reduce' });
      const page = await ctx.newPage();
      const external = new Set();
      page.on('request', (r) => {
        const u = r.url();
        if (u.startsWith('data:') || u.startsWith('blob:')) return;
        if (new URL(u).origin !== origin) external.add(u);
      });
      page.on('console', (m) => { if (m.type() === 'error' || /content security policy/i.test(m.text())) fail(label, `Konsole: ${m.text().slice(0, 160)}`); });
      page.on('pageerror', (e) => fail(label, `JS-Fehler: ${e.message.slice(0, 160)}`));

      await page.goto(`${origin}/${file}`, { waitUntil: 'load' });
      await page.waitForTimeout(2200);
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < height; y += vp.height * 0.8) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(60); }
      await page.waitForTimeout(400);

      for (const u of external) fail(label, `Anfrage an Fremdhost: ${u}`);
      const cookies = await ctx.cookies();
      if (cookies.length) fail(label, `Cookies gesetzt: ${cookies.map((c) => c.name).join(', ')}`);
      const store = await page.evaluate(() => ({ ls: localStorage.length, ss: sessionStorage.length }));
      if (store.ls || store.ss) fail(label, `Browser-Speicher belegt (localStorage ${store.ls}, sessionStorage ${store.ss})`);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 0) fail(label, `seitliches Scrollen: ${overflow}px Überlauf`);
      if (vp.name !== 'desktop') {
        const endless = await page.evaluate(() => document.getAnimations().filter((a) => a.effect && a.effect.getComputedTiming().iterations === Infinity && a.playState === 'running').length);
        if (endless) fail(label, `${endless} Endlos-Animation(en) trotz „Bewegung reduzieren“`);
      }
      if (vp.name === 'desktop') {
        const endless = await page.evaluate(() => document.getAnimations().filter((a) => a.effect && a.effect.getComputedTiming().iterations === Infinity && a.playState === 'running').length);
        if (endless) fail(label, `${endless} Endlos-Animation(en) (WCAG 2.2.2)`);
        const bytes = await page.evaluate(() => performance.getEntriesByType('resource').reduce((n, e) => n + (e.encodedBodySize || 0), 0) + (performance.getEntriesByType('navigation')[0]?.encodedBodySize || 0));
        notes.push(`${label}: ${(bytes / 1024).toFixed(0)} KB unkomprimiert geladen (Seite + CSS + JS + Schriften)`);
      }
      await ctx.close();
    }

    /* Ohne JavaScript */
    const nctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
    const npage = await nctx.newPage();
    await npage.goto(`${origin}/${file}`, { waitUntil: 'load' });
    await npage.waitForTimeout(2200);
    const hidden = await npage.evaluate((sels) => {
      const out = [];
      for (const sel of sels) {
        document.querySelectorAll(sel).forEach((el, i) => {
          el.scrollIntoView({ block: 'center', behavior: 'instant' });
          const r = el.getBoundingClientRect();
          if (!r.width || !r.height) { out.push(`${sel}[${i}] ohne Fläche`); return; }
          let o = 1; for (let n = el; n; n = n.parentElement) o *= parseFloat(getComputedStyle(n).opacity);
          const hit = document.elementFromPoint(Math.min(Math.max(r.left + r.width / 2, 1), innerWidth - 1), Math.min(Math.max(r.top + r.height / 2, 1), innerHeight - 1));
          if (o < 0.5 || getComputedStyle(el).visibility === 'hidden' || !hit || !(el === hit || el.contains(hit) || hit.contains(el))) out.push(`${sel}[${i}] nicht sichtbar`);
        });
      }
      return out;
    }, NOJS_VISIBLE);
    for (const h of hidden) fail(`${file} [ohne JavaScript]`, h);
    await nctx.close();
  }

  await browser.close();
  server.close();
  notes.forEach((n) => console.log('  · ' + n));
  if (failures.length) {
    console.log(`\n✗ ${failures.length} Befund(e):`);
    failures.forEach((f) => console.log('  - ' + f));
    process.exit(1);
  }
  console.log(`\n✓ Alle Prüfungen bestanden (${pages.length} Seiten × ${VIEWPORTS.length} Viewports + ohne JavaScript).`);
}

run().catch((e) => { console.error(e); process.exit(2); });
