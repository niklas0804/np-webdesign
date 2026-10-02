import { defineConfig } from 'astro/config';

// Statische Ausgabe, kein UI-Framework (Blueprint N).
// Strikte CSP: nichts darf inline ausgeliefert werden → Styles und Skripte immer als Datei.
export default defineConfig({
  site: 'https://np-webdesign.de',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'never' },
  vite: { build: { assetsInlineLimit: 0 } },
  devToolbar: { enabled: false },
});
