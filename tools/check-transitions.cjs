#!/usr/bin/env node
/*
 * Übergangs-Prüfung (Auftrag Teil A5). Läuft gegen die gebaute Seite (dist) und findet:
 *   1. Leerbilder:   Bildschirm ohne Rahmen-Ebene fast einfarbig, gemessen in Schritten von 5 % der Bildschirmhöhe.
 *                    Abnahme: in keinem Übergang mehr als 10 % Bildschirmhöhe am Stück.
 *   2. Überdeckung:  sichtbarer Inhaltstext schneidet Monogramm, Menü, Anfrage-Knopf oder Zähler, solange diese sichtbar sind
 *                    (ausgenommen: die Kopfzeile trägt eine deckende Fläche, dann ist der Text dahinter verdeckt, nicht überlagert).
 *   3. Zustandstreue: dasselbe Bild an derselben Scrollposition, ob man von oben oder von unten kommt (Zurückscrollen),
 *                    und nach schnellem Wischen (CDP Input.synthesizeScrollGesture).
 *   4. Leistung:     mit vierfacher CPU-Drosselung durch die Seite scrollen: Long Tasks über 50 ms, Layout-Shifts.
 * Ausgabe: Kontaktbögen in docs/screens/check/ (JPG), report-<label>.json, Zusammenfassung auf der Konsole.
 *
 * Aufruf:  NODE_PATH=$(npm root -g) node tools/check-transitions.cjs [--label vorher|nachher] [--view mobil,schmal,desktop]
 *                                                                    [--step 5] [--no-fast] [--no-back] [--perf] [--path /]
 * Voraussetzung: npm run build (Ordner dist), Playwright mit Chromium. Nichts davon ist Teil der Website.
 */
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');

const args = process.argv.slice(2);
const opt = (name, fallback) => { const i = args.indexOf('--' + name); return i < 0 ? fallback : (args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true); };
const LABEL = opt('label', 'aktuell');
const ONLY = String(opt('view', 'mobil,schmal,desktop')).split(',');
const STEP = Number(opt('step', 5)) / 100;
const WITH_FAST = !args.includes('--no-fast');
const WITH_BACK = !args.includes('--no-back');
const WITH_PERF = args.includes('--perf');
const PAGE = opt('path', '/');
const SECTION = opt('section', null); // nur einen Übergang prüfen (id, z. B. t-welt-01-welt-02)
const RANGE = String(opt('range', '0,1')).split(',').map(Number); // Anteil der Seite
const WAIT = Number(opt('wait', 110));
const BLANK_STD = Number(opt('blank-std', 3));      // Standardabweichung der Helligkeit (0–255), darunter gilt ein Bild als leer
const BLANK_DOM = Number(opt('blank-dom', 0.985));  // oder: so viel Anteil der Pixel in der häufigsten Farbe (≥ 98,5 % = fast einfarbig, nur Rand und Zeilen)
const isBlank = (a) => a.std < BLANK_STD || a.dominant >= BLANK_DOM;
const MAX_BLANK = 0.10;                              // Abnahme: Leerstrecke in Bildschirmhöhen
const DIFF_LIMIT = Number(opt('diff', 6));           // mittlere Abweichung (0–255) zwischen Hin- und Rückweg
const ROOT = path.resolve(opt('dist', path.join(__dirname, '..', 'dist')));
const OUT = path.resolve(opt('out', path.join(__dirname, '..', 'docs', 'screens', 'check')));

const VIEWS = {
  mobil: { name: 'mobil', width: 390, height: 844, touch: true },
  schmal: { name: 'schmal', width: 375, height: 667, touch: true },
  desktop: { name: 'desktop', width: 1440, height: 900, touch: false },
};
const T = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.avif': 'image/avif', '.json': 'application/json', '.txt': 'text/plain', '.xml': 'application/xml' };
const srv = http.createServer((q, r) => {
  let u = decodeURIComponent(q.url.split('?')[0]); if (u.endsWith('/')) u += 'index.html';
  let f = path.join(ROOT, u); if (!path.extname(f) && fs.existsSync(f + '.html')) f += '.html';
  if (fs.existsSync(f) && fs.statSync(f).isFile()) { r.writeHead(200, { 'content-type': T[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); } else { r.writeHead(404); r.end(); }
});

/* ---------- Bildanalyse in einer leeren Seite (kein Bildmodul nötig) ---------- */
const ANALYZE = `async ({ b64, thumbW }) => {
  const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
  const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
  const g = c.getContext('2d', { willReadFrequently: true }); g.drawImage(img, 0, 0);
  const d = g.getImageData(0, 0, c.width, c.height).data;
  let s = 0, s2 = 0; const n = c.width * c.height;
  const hist = new Map();
  for (let i = 0; i < d.length; i += 4) {
    const y = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]; s += y; s2 += y * y;
    const k = ((d[i] >> 3) << 10) | ((d[i + 1] >> 3) << 5) | (d[i + 2] >> 3); hist.set(k, (hist.get(k) || 0) + 1);
  }
  const mean = s / n; const std = Math.sqrt(Math.max(0, s2 / n - mean * mean));
  let top = 0; hist.forEach((v) => { if (v > top) top = v; });
  const tw = thumbW, th = Math.round(img.height * tw / img.width);
  const t = document.createElement('canvas'); t.width = tw; t.height = th; const tg = t.getContext('2d', { willReadFrequently: true });
  tg.drawImage(img, 0, 0, tw, th);
  const td = tg.getImageData(0, 0, tw, th).data; const thumb = new Array(tw * th * 3);
  for (let i = 0, j = 0; i < td.length; i += 4) { thumb[j++] = td[i]; thumb[j++] = td[i + 1]; thumb[j++] = td[i + 2]; }
  return { std, mean, dominant: top / n, tw, th, thumb };
}`;
const SHEET = `async ({ items, cols, cell, label }) => {
  const lab = 34, rows = Math.ceil(items.length / cols);
  const c = document.createElement('canvas'); c.width = cols * cell.w; c.height = rows * (cell.h + lab) + 30;
  const g = c.getContext('2d'); g.fillStyle = '#222'; g.fillRect(0, 0, c.width, c.height);
  g.font = '12px monospace'; g.fillStyle = '#fff'; g.fillText(label, 8, 18);
  for (let i = 0; i < items.length; i++) {
    const it = items[i]; const x = (i % cols) * cell.w, y = 30 + Math.floor(i / cols) * (cell.h + lab);
    const img = new Image(); img.src = 'data:image/jpeg;base64,' + it.b64; await img.decode();
    g.drawImage(img, x + 2, y + lab, cell.w - 4, cell.h);
    g.fillStyle = it.flag ? '#ff5a3c' : '#bbb'; g.font = '11px monospace';
    g.fillText(it.l1, x + 4, y + 13); g.fillText(it.l2 || '', x + 4, y + 27);
    if (it.flag) { g.strokeStyle = '#ff5a3c'; g.lineWidth = 2; g.strokeRect(x + 2, y + lab, cell.w - 4, cell.h); }
  }
  return c.toDataURL('image/jpeg', 0.72).split(',')[1];
}`;

/* ---------- im Seitenkontext ---------- */
const PAGE_STATE = `() => {
  const vh = innerHeight, vw = innerWidth;
  const ids = [];
  let inTransition = null, center = null;
  document.querySelectorAll('[data-section]').forEach((s) => {
    const r = s.getBoundingClientRect();
    if (r.bottom > 0 && r.top < vh) {
      if (s.classList.contains('transition')) inTransition = s.dataset.section;
      if (r.top <= vh / 2 && r.bottom > vh / 2) center = s.dataset.section;
    }
  });
  // Rahmenelemente: nur zählen, wenn sichtbar
  const vis = (el) => {
    if (!el) return false;
    const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden') return false;
    let o = 1; for (let e = el; e && e !== document.documentElement; e = e.parentElement) o *= parseFloat(getComputedStyle(e).opacity);
    const r = el.getBoundingClientRect(); return o > 0.1 && r.width > 0 && r.bottom > 0 && r.top < vh;
  };
  const frameEls = ['.frame-logo', '.frame-menu-btn', '.frame-cta', '.frame-counter-long', '.frame-counter-short', '.frame-live'].map((s) => document.querySelector(s)).filter(vis);
  const rects = frameEls.map((e) => { const r = e.getBoundingClientRect(); return { n: e.className.split(' ')[0], l: r.left, t: r.top, r: r.right, b: r.bottom }; });
  // deckende Fläche der Kopfzeile?
  const strip = document.querySelector('.frame-strip');
  let stripBottom = 0;
  if (strip && vis(strip)) {
    const cs = getComputedStyle(strip); const m = cs.backgroundColor.match(/[\\d.]+/g) || [];
    const alpha = m.length > 3 ? parseFloat(m[3]) : 1; const r = strip.getBoundingClientRect();
    if (alpha >= 0.95) stripBottom = r.bottom;
  }
  // Inhaltstext, der einen Rahmenrechteck schneidet
  const hits = [];
  if (rects.length) {
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: (n) => {
      if (!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const p = n.parentElement; if (!p || p.closest('.frame, .menu, .skiplinks, script, style, noscript, .visually-hidden, [hidden]')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT; } });
    const range = document.createRange();
    for (let n = w.nextNode(); n; n = w.nextNode()) {
      range.selectNodeContents(n);
      for (const q of range.getClientRects()) {
        if (q.width < 2 || q.height < 2) continue;
        for (const f of rects) {
          if (q.left < f.r && q.right > f.l && q.top < f.b && q.bottom > f.t && !(stripBottom && q.bottom <= stripBottom + 1)) {
            const p = n.parentElement; const cs = getComputedStyle(p);
            let o = 1; for (let e = p; e && e !== document.documentElement; e = e.parentElement) o *= parseFloat(getComputedStyle(e).opacity);
            if (cs.visibility === 'hidden' || o < 0.15) continue;
            hits.push({ text: n.nodeValue.trim().slice(0, 40), frame: f.n, cls: (p.className && p.className.baseVal === undefined ? p.className : '').toString().slice(0, 40) });
          }
        }
      }
    }
  }
  // Weltzähler: stimmt er mit dem Abschnitt bei 55 % der Bildschirmhöhe überein (Regel in rahmen.js)? Nahe der Grenze keine Wertung.
  let counter = null;
  const ce = document.querySelector('[data-frame-counter]'), cs = document.querySelector('[data-frame-counter-short]');
  const shown = ce && getComputedStyle(ce.parentElement).display !== 'none' && getComputedStyle(ce).display !== 'none' ? ce : cs;
  document.querySelectorAll('[data-section][data-counter]').forEach((s) => {
    const r = s.getBoundingClientRect();
    if (r.top <= vh * 0.55 && r.bottom > vh * 0.55 && r.top < vh * 0.47 && r.bottom > vh * 0.63) {
      const want = shown === ce ? s.dataset.counter : s.dataset.counterShort;
      if (shown && want && shown.textContent.trim() !== want.trim()) counter = { want, got: shown.textContent.trim(), section: s.dataset.section };
    }
  });
  return { counter, y: Math.round(scrollY), max: document.documentElement.scrollHeight - vh, inTransition, center, hits: hits.slice(0, 6), hitCount: hits.length, frameVisible: rects.map((r) => r.n), stripBottom };
}`;

function pad(s, n) { return String(s).padEnd(n); }

async function run(browser, base, view) {
  const ctx = await browser.newContext({ viewport: { width: view.width, height: view.height }, hasTouch: view.touch, isMobile: view.touch, deviceScaleFactor: 1, bypassCSP: true });
  const page = await ctx.newPage();
  const tool = await ctx.newPage(); await tool.goto('about:blank');
  const longtasks = [];
  await page.addInitScript(() => {
    window.__lt = []; window.__cls = [];
    try { new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push([Math.round(e.startTime), Math.round(e.duration), Math.round(scrollY)]))).observe({ type: 'longtask', buffered: true }); } catch (e) {}
    try { new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (!e.hadRecentInput) window.__cls.push([Math.round(scrollY), +e.value.toFixed(4)]); })).observe({ type: 'layout-shift', buffered: true }); } catch (e) {}
  });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 160)));
  await page.goto(base + PAGE);
  await page.waitForSelector('html[data-ready]', { timeout: 20000 }).catch(() => errors.push('html[data-ready] nie gesetzt'));
  await page.waitForTimeout(1500);
  await page.addStyleTag({ content: 'html.np-test-noframe .frame, html.np-test-noframe .menu, html.np-test-noframe .skiplinks { visibility: hidden !important; } .frame *, .frame { transition: none !important; }' });
  const mode = await page.evaluate(() => document.documentElement.dataset.mode);

  const vh = view.height;
  const cell = { w: view.touch ? 150 : 240, h: Math.round((view.touch ? 150 : 240) * vh / view.width) };
  const analyzeShot = async (png) => tool.evaluate(`(${ANALYZE})(${JSON.stringify({ b64: png.toString('base64'), thumbW: 48 })})`);

  const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const shot = async (hideFrame) => {
    if (hideFrame) await page.evaluate(() => document.documentElement.classList.add('np-test-noframe'));
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
    const png = await page.screenshot({ type: 'png' });
    if (hideFrame) await page.evaluate(() => document.documentElement.classList.remove('np-test-noframe'));
    return png;
  };
  const jpg = async (png, w) => { // verkleinertes JPG für Kontaktbögen
    const small = await tool.evaluate(`(async () => { const img = new Image(); img.src = 'data:image/png;base64,${png.toString('base64')}'; await img.decode(); const c = document.createElement('canvas'); c.width = ${w}; c.height = Math.round(img.height * ${w} / img.width); c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); return c.toDataURL('image/jpeg', 0.7).split(',')[1]; })()`);
    return small;
  };

  const sample = async (y, keepShot) => {
    await page.evaluate((v) => scrollTo(0, v), y);
    await page.waitForTimeout(WAIT);
    const st = await page.evaluate(`(${PAGE_STATE})()`);
    const png = await shot(true);
    const a = await analyzeShot(png);
    return { y: st.y, st, a, jpg: keepShot ? await jpg(png, cell.w * 2) : null };
  };

  const frames = []; // Vorwärts, langsam
  const stepPx = Math.max(8, Math.round(vh * STEP));
  let y0 = Math.round(total * RANGE[0]), y1 = Math.round(total * RANGE[1]);
  if (SECTION) {
    const r = await page.evaluate((id) => { const e = document.querySelector(`[data-section="${id}"]`); const b = e.getBoundingClientRect(); return [b.top + scrollY, b.bottom + scrollY]; }, SECTION);
    y0 = Math.max(0, Math.round(r[0] - vh * 0.3)); y1 = Math.min(total, Math.round(r[1] + vh * 0.3));
  }
  const ys = []; for (let y = y0; y <= y1; y += stepPx) ys.push(y); if (ys[ys.length - 1] !== y1) ys.push(y1);
  process.stdout.write(`  ${view.name} (${view.width}×${vh}, Modus ${mode}): ${ys.length} Schritte vorwärts `);
  for (const y of ys) {
    const f = await sample(y, true);
    f.blank = isBlank(f.a);
    f.thumb = f.a.thumb; delete f.a.thumb;
    frames.push(f);
    if (frames.length % 50 === 0) process.stdout.write('.');
  }
  process.stdout.write('\n');

  /* Leerstrecken */
  const runs = [];
  let cur = null;
  frames.forEach((f, i) => {
    if (f.blank) { if (!cur) cur = { from: i, to: i }; cur.to = i; } else if (cur) { runs.push(cur); cur = null; }
  });
  if (cur) runs.push(cur);
  const blankRuns = runs.map((r) => {
    const seg = frames.slice(r.from, r.to + 1);
    const inT = seg.filter((f) => f.st.inTransition).length;
    return { y0: frames[r.from].y, y1: frames[r.to].y, steps: seg.length, vhs: +(seg.length * stepPx / vh).toFixed(2), transition: inT > 0 ? (seg.find((f) => f.st.inTransition).st.inTransition) : null, inTransitionSteps: inT, meanColor: frames[r.from].a.mean.toFixed(0) };
  });
  const blankInTransition = blankRuns.filter((r) => r.transition && r.vhs > MAX_BLANK + 1e-6);
  const blankElsewhere = blankRuns.filter((r) => !r.transition && r.vhs > MAX_BLANK + 1e-6);

  /* Überdeckungen */
  const overlaps = frames.filter((f) => f.st.hitCount > 0).map((f) => ({ y: f.y, section: f.st.center, hits: f.st.hits, n: f.st.hitCount }));

  const counterBad = frames.filter((f) => f.st.counter).map((f) => ({ y: f.y, ...f.st.counter }));

  /* Rückweg langsam: gleiche Positionen von unten */
  let backDiffs = [];
  const backFrames = [];
  if (WITH_BACK) {
    for (let i = ys.length - 1; i >= 0; i -= 1) {
      const f = await sample(ys[i], true);
      f.blank = isBlank(f.a); f.thumb = f.a.thumb; delete f.a.thumb;
      backFrames.push(f);
    }
    backFrames.reverse();
    backFrames.forEach((b, i) => {
      const a = frames[i]; let s = 0; for (let k = 0; k < a.thumb.length; k++) s += Math.abs(a.thumb[k] - b.thumb[k]);
      const d = s / a.thumb.length; if (d > DIFF_LIMIT) backDiffs.push({ y: a.y, diff: +d.toFixed(1), section: a.st.center, i });
    });
  }

  /* Schnelles Wischen (Touch) bzw. großer Radschritt (Desktop), danach beruhigen und prüfen */
  const fast = { blank: [], overlap: [], diff: [], samples: 0 };
  if (WITH_FAST) {
    await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(500);
    const cdp = await ctx.newCDPSession(page);
    const dist = Math.round(vh * 0.62);
    let guard = 0;
    while (guard++ < 400) {
      const before = await page.evaluate(() => Math.round(scrollY));
      if (view.touch) {
        await cdp.send('Input.synthesizeScrollGesture', { x: Math.round(view.width / 2), y: Math.round(vh * 0.8), yDistance: -dist, speed: 4500, gestureSourceType: 'touch', preventFling: true });
      } else {
        await page.mouse.move(view.width / 2, vh / 2); await page.mouse.wheel(0, dist * 1.6);
      }
      let last = -1; for (let k = 0; k < 20; k++) { await page.waitForTimeout(90); const y = await page.evaluate(() => Math.round(scrollY)); if (y === last) break; last = y; }
      const st = await page.evaluate(`(${PAGE_STATE})()`);
      const png = await shot(true); const a = await analyzeShot(png);
      fast.samples++;
      if (isBlank(a) && st.inTransition) fast.blank.push({ y: st.y, section: st.inTransition, std: +a.std.toFixed(1) });
      if (st.hitCount) fast.overlap.push({ y: st.y, section: st.center, hits: st.hits });
      // Vergleich mit dem langsamen Weg an der nächstgelegenen gemessenen Position (nur wenn sie ≤ 12 px entfernt liegt)
      const j = ys.findIndex((v) => Math.abs(v - st.y) <= 12);
      if (j >= 0) { let s = 0; const A = frames[j].thumb, B = a.thumb; for (let k = 0; k < A.length; k++) s += Math.abs(A[k] - B[k]); const d = s / A.length; if (d > DIFF_LIMIT) fast.diff.push({ y: st.y, diff: +d.toFixed(1), section: st.center }); }
      if (st.y >= total - 2 || st.y === before) break;
    }
  }

  /* Leistung mit vierfacher CPU-Drosselung */
  let perf = null;
  if (WITH_PERF) {
    await page.evaluate(() => { scrollTo(0, 0); window.__lt.length = 0; window.__cls.length = 0; }); await page.waitForTimeout(500);
    const cdp = await ctx.newCDPSession(page); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await page.evaluate(() => { window.__lt.length = 0; window.__cls.length = 0; });
    const speed = Math.round(vh * 0.55); // Pixel pro Sekunde-Schritt: gleichmäßiges Weiterscrollen
    const res = await page.evaluate(async ({ per, total }) => {
      await new Promise((resolve) => {
        let y = 0; let last = performance.now();
        const tick = (t) => { y += per * Math.min(48, t - last) / 16.7; last = t; scrollTo(0, Math.min(total, y)); if (y >= total) resolve(); else requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
      });
      await new Promise((r) => setTimeout(r, 400));
      return { lt: window.__lt.slice(), cls: window.__cls.slice() };
    }, { per: speed / 6, total });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
    const tlist = res.lt.filter((e) => e[1] > 50);
    perf = { longTasks: tlist.length, worst: tlist.sort((a, b) => b[1] - a[1]).slice(0, 8), clsTotal: +res.cls.reduce((s, e) => s + e[1], 0).toFixed(4), clsEvents: res.cls.slice(0, 8) };
  }

  /* Kontaktbögen */
  fs.mkdirSync(OUT, { recursive: true });
  const flagged = new Set();
  blankRuns.filter((r) => r.vhs > MAX_BLANK + 1e-6).forEach((r) => frames.forEach((f, i) => { if (f.y >= r.y0 && f.y <= r.y1) flagged.add(i); }));
  overlaps.forEach((o) => { const i = frames.findIndex((f) => f.y === o.y); if (i >= 0) flagged.add(i); });
  backDiffs.forEach((b) => flagged.add(b.i));
  const mk = async (idxs, label, file) => {
    const items = [];
    for (const i of idxs) {
      const f = frames[i];
      items.push({ b64: f.jpg, l1: `${f.y}px ${f.st.inTransition ? 'T' : ''}`, l2: `${(f.st.center || '').replace('t-', '').slice(0, 22)} σ${f.a.std.toFixed(0)} ${(f.a.dominant * 100).toFixed(0)}%${f.st.hitCount ? ' ÜBER' : ''}`, flag: flagged.has(i) });
    }
    if (!items.length) return null;
    const cols = Math.min(items.length, view.touch ? 10 : 6);
    const b64 = await tool.evaluate(`(${SHEET})(${JSON.stringify({ items, cols, cell, label })})`);
    const out = path.join(OUT, file); fs.writeFileSync(out, Buffer.from(b64, 'base64')); return path.relative(path.join(__dirname, '..'), out);
  };
  const sheets = {};
  const fl = [...flagged].sort((a, b) => a - b);
  sheets.befunde = await mk(fl.slice(0, 120), `${LABEL} · ${view.name} · markierte Bilder (${fl.length})`, `befunde-${LABEL}-${view.name}.jpg`);
  // Übersicht: jeder zweite Schritt innerhalb von Übergängen (10 % Schritte)
  const ov = frames.map((f, i) => i).filter((i) => frames[i].st.inTransition && i % Math.round(0.10 / STEP) === 0);
  sheets.uebersicht = await mk(ov.slice(0, 160), `${LABEL} · ${view.name} · Übergänge im 10-%-Raster`, `uebergaenge-${LABEL}-${view.name}.jpg`);
  await ctx.close();

  return {
    view: view.name, mode, total, stepPx, steps: frames.length,
    stdMin: +Math.min(...frames.map((f) => f.a.std)).toFixed(1),
    stdHistogram: [0, 1, 2, 3, 4, 6, 10, 20].map((t) => [t, frames.filter((f) => f.a.std < t).length]),
    blankRuns, blankInTransition, blankElsewhere, overlaps: { steps: overlaps.length, first: overlaps.slice(0, 12) },
    counterBad, backDiffs, fast: { ...fast, blank: fast.blank.slice(0, 20), overlap: fast.overlap.slice(0, 10), diff: fast.diff.slice(0, 20) },
    perf, errors, sheets,
  };
}

srv.listen(0, '127.0.0.1', async () => {
  const base = `http://127.0.0.1:${srv.address().port}`;
  const browser = await chromium.launch();
  const report = { label: LABEL, blankStd: BLANK_STD, step: STEP, views: [] };
  let bad = 0;
  console.log(`check-transitions [${LABEL}] ${PAGE}  (leer: σ < ${BLANK_STD} oder ≥ ${BLANK_DOM * 100} % eine Farbe, Abnahme ≤ ${MAX_BLANK * 100} % Bildschirmhöhe am Stück)`);
  for (const key of ONLY) {
    const view = VIEWS[key]; if (!view) continue;
    const r = await run(browser, base, view); report.views.push(r);
    const n = r.blankInTransition.length + r.overlaps.steps + r.counterBad.length + r.backDiffs.length + r.fast.blank.length + r.fast.overlap.length + r.fast.diff.length + (r.perf ? r.perf.longTasks + (r.perf.clsTotal > 0.05 ? 1 : 0) : 0);
    bad += n;
    console.log(`  → Leerstrecken über ${MAX_BLANK * 100} % in Übergängen: ${r.blankInTransition.length}  (außerhalb: ${r.blankElsewhere.length}, σ-Minimum ${r.stdMin})`);
    r.blankInTransition.forEach((b) => console.log(`      ${pad(b.transition, 34)} ${b.y0}–${b.y1} px = ${b.vhs} Bildschirmhöhen`));
    r.blankElsewhere.forEach((b) => console.log(`      (außerhalb) ${b.y0}–${b.y1} px = ${b.vhs} Bildschirmhöhen`));
    console.log(`  → Überdeckungen: ${r.overlaps.steps} Schritte mit Text unter Rahmenelementen`);
    r.overlaps.first.slice(0, 4).forEach((o) => console.log(`      ${o.y} px ${pad(o.section || '', 24)} ${o.hits.map((h) => `„${h.text}“→${h.frame}`).join(', ')}`));
    console.log(`  → Weltzähler: ${r.counterBad.length} Positionen mit falschem Zähler`);
    r.counterBad.slice(0, 4).forEach((c) => console.log(`      ${c.y} px ${c.section}: soll „${c.want}“, steht „${c.got}“`));
    if (WITH_BACK) console.log(`  → Hin- gegen Rückweg: ${r.backDiffs.length} Positionen weichen ab`);
    if (WITH_FAST) console.log(`  → Schnelles Wischen (${r.fast.samples} Stopps): leer ${r.fast.blank.length}, Überdeckung ${r.fast.overlap.length}, Abweichung zum langsamen Weg ${r.fast.diff.length}`);
    if (r.perf) console.log(`  → Leistung 4× CPU: Long Tasks > 50 ms: ${r.perf.longTasks}, Layout-Shift gesamt ${r.perf.clsTotal}`);
    if (r.errors.length) console.log('  → Seitenfehler:', r.errors.join(' | '));
    Object.values(r.sheets).filter(Boolean).forEach((s) => console.log('    Kontaktbogen:', s));
  }
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, `report-${LABEL}-${ONLY.join("+")}.json`), JSON.stringify(report, null, 1));
  await browser.close(); srv.close();
  console.log(bad ? `\n✗ ${bad} Befunde` : '\n✓ Übergänge: keine Befunde');
  process.exit(bad ? 1 : 0);
});
