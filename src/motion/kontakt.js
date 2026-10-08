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

  /* Live-Vorschau */
  const setTitle = () => {
    const v = company.value.trim();
    text.textContent = v || DEFAULT;
    title.classList.toggle('is-empty', !v);
    fitElement(title);
  };
  company.addEventListener('input', setTitle);
  setTitle();

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
