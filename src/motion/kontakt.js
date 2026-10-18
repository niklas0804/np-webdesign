/**
 * Welt 11 · Formular und Live-Vorschau (Blueprint L, Q2).
 * Alles bleibt im Browser, bis abgeschickt wird: keine Zwischenspeicherung, kein Mitschneiden einzelner Eingaben.
 * Der Firmenname wird nur als Text eingesetzt (textContent), nie als HTML.
 */
import { $, $$, mode } from './base.js';
import { fitElement } from './fit.js';

const MAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function initKontakt() {
  const section = $('[data-kontakt]');
  const form = $('[data-form]', section || document);
  if (!section || !form) return;
  const main = form.closest('.k-main');
  const title = $('[data-pv-title]', section);
  const text = $('[data-pv-text]', section);
  const cursor = $('[data-cursor]', section);
  const company = $('[data-company]', form);
  const status = $('[data-status]', form);
  const submit = $('[data-submit]', form);
  const submitLabel = $('[data-submit-label]', form);
  const done = $('[data-done]', section);
  const doneTitle = $('[data-done-title]', section);
  const within = form.dataset.within || '';
  const DEFAULT = 'Ihr Unternehmen';

  form.setAttribute('novalidate', '');
  /* Zeitpunkt des Seitenaufrufs für die Zeitprüfung im Endpunkt (Spamschutz, wird nicht gespeichert) */
  const ts = $('[data-ts]', form);
  if (ts) ts.value = String(Date.now());

  /* Live-Vorschau */
  const frame = title.closest('.k-pv-frame');
  const body = $('[data-pv-body]', section);
  const faden = $('[data-pv-faden]', section);
  const mark = $('[data-pv-mark]', section);
  const guides = $$('[data-pv-guide]', section);
  const crops = $$('.k-pv-crop', section);
  /** Hilfslinien, Unterstreichung und Schnittmarken an den eingesetzten Namen legen (alles nur Lage und Breite, nichts wird gespeichert) */
  const layout = () => {
    const r = document.createRange(); r.selectNodeContents(text);
    const b = r.getBoundingClientRect(); const bb = body.getBoundingClientRect(); const tb = title.getBoundingClientRect();
    const w = Math.max(0, b.width);
    faden.style.width = `${w}px`; faden.style.top = `${tb.bottom - bb.top + 2}px`;
    guides[0].style.top = `${tb.top - bb.top + tb.height * 0.12}px`; guides[1].style.top = `${tb.bottom - bb.top - tb.height * 0.1}px`;
    const x0 = -8; const x1 = w + 8 - 9; const y0 = tb.top - bb.top - 6; const y1 = tb.bottom - bb.top + 12 - 9;
    const at = [[x0, y0], [x1, y0], [x0, y1], [x1, y1]];
    crops.forEach((c, i) => { c.style.left = `${at[i][0]}px`; c.style.top = `${at[i][1]}px`; });
  };
  let snapTimer;
  const setTitle = (animate) => {
    const v = company.value.trim();
    text.textContent = v || DEFAULT;
    title.classList.toggle('is-empty', !v);
    mark.textContent = v ? v.slice(0, 18) : '–';
    fitElement(title);
    layout();
    frame.classList.toggle('is-built', !!v);
    if (animate && v && mode !== 'calm') {
      frame.classList.remove('is-snap'); void frame.offsetWidth; frame.classList.add('is-snap');
      clearTimeout(snapTimer); snapTimer = setTimeout(() => frame.classList.remove('is-snap'), 400);
    }
  };
  company.addEventListener('input', () => setTitle(true));
  setTitle(false);
  window.addEventListener('resize', () => { clearTimeout(snapTimer); snapTimer = setTimeout(() => setTitle(false), 150); });

  /* Der Cursor blinkt sechsmal, sobald die Vorschau im Bild ist, und steht danach still (WCAG 2.2.2) */
  const blink = () => {
    if (mode === 'calm') return;
    cursor.classList.remove('is-blink');
    void cursor.offsetWidth;
    cursor.classList.add('is-blink');
  };
  const io = new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) { blink(); io.disconnect(); } }, { threshold: 0.4 });
  io.observe($('[data-preview]', section));
  company.addEventListener('focus', blink);

  /* Auswahlchips: ein zweiter Klick nimmt die Auswahl zurück (freiwilliges Feld) */
  const radios = $$('.k-chip input', form);
  radios.forEach((r) => r.addEventListener('click', () => {
    if (r.dataset.was === '1') { r.checked = false; r.dataset.was = '0'; } else { radios.forEach((o) => { o.dataset.was = '0'; }); r.dataset.was = '1'; }
  }));

  /* Prüfung beim Verlassen eines Feldes; Fehler als Text mit Symbol */
  const rules = {
    name: (v) => v.trim().length > 0,
    email: (v) => MAIL.test(v.trim()),
    nachricht: (v) => v.trim().length >= 10,
  };
  const check = (field, show) => {
    const rule = rules[field.name];
    if (!rule) return true;
    const ok = rule(field.value);
    const err = document.getElementById(field.getAttribute('aria-describedby'));
    if (show) {
      field.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (err) err.hidden = ok;
    }
    return ok;
  };
  Object.keys(rules).forEach((n) => {
    const f = form.elements[n];
    f.addEventListener('blur', () => check(f, true));
    f.addEventListener('input', () => { if (f.getAttribute('aria-invalid') === 'true') check(f, true); });
  });

  const fail = (msg) => { main.classList.add('is-failed'); status.textContent = msg || ''; };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    main.classList.remove('is-failed');
    status.textContent = '';
    const bad = Object.keys(rules).map((n) => form.elements[n]).filter((f) => !check(f, true));
    if (bad.length) {
      status.textContent = bad.length === 1 ? 'Bitte prüfen Sie das markierte Feld.' : 'Bitte prüfen Sie die markierten Felder.';
      bad[0].focus();
      return;
    }
    submit.disabled = true;
    submit.setAttribute('aria-busy', 'true');
    submitLabel.textContent = 'Wird gesendet …';
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        const first = form.elements.name.value.trim().split(/\s+/)[0];
        doneTitle.textContent = `Danke, ${first}. Ich melde mich ${within}.`;
        main.classList.add('is-sent');
        section.classList.add('is-sent');
        form.reset();
        done.focus({ preventScroll: true });
        return;
      }
      fail(res.status === 422 ? 'Bitte prüfen Sie Ihre Angaben.' : '');
    } catch {
      fail('');
    } finally {
      submit.disabled = false;
      submit.removeAttribute('aria-busy');
      submitLabel.textContent = 'Anfrage senden';
    }
  });
}
