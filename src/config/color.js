/**
 * Farbrechnung für die Reise-Konfiguration und die Palettenprüfung (scripts/check-palettes.mjs).
 * Keine Abhängigkeiten. Alle Funktionen nehmen Hex-Werte wie '#E9C46A'.
 */
export const rgb = (hex) => {
  const h = hex.replace('#', '');
  const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
};

/** Relative Luminanz nach WCAG 2.x */
export const luminance = (hex) => {
  const [r, g, b] = rgb(hex).map((v) => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** Kontrastverhältnis nach WCAG 2.x (1 bis 21) */
export const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

/** CIE-Lab (D65) */
export const lab = (hex) => {
  const lin = rgb(hex).map((v) => { const c = v / 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; });
  const [r, g, b] = lin;
  const x = (0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / 0.95047;
  const y = 0.2126729 * r + 0.7151522 * g + 0.072175 * b;
  const z = (0.0193339 * r + 0.119192 * g + 0.9503041 * b) / 1.08883;
  const f = (t) => (t > 216 / 24389 ? Math.cbrt(t) : (24389 / 27 * t + 16) / 116);
  const [fx, fy, fz] = [f(x), f(y), f(z)];
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
};

/** Farbabstand ΔE (CIE76) */
export const deltaE = (a, b) => {
  const [l1, a1, b1] = lab(a); const [l2, a2, b2] = lab(b);
  return Math.hypot(l1 - l2, a1 - a2, b1 - b2);
};

/** Farbton (0–360°), Sättigung und Helligkeit (0–100 %) im HSL-Modell */
export const hsl = (hex) => {
  const [r, g, b] = rgb(hex).map((v) => v / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  let h = 0;
  if (d) h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return { h: (h * 60 + 360) % 360, s: s * 100, l: l * 100 };
};

/** Liegt die Farbe im geschützten Orange-Bereich (Farbton 10–35°, Sättigung über 55 %)? */
export const isProtectedOrange = (hex) => { const { h, s } = hsl(hex); return h >= 10 && h <= 35 && s > 55; };
