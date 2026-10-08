import { defineConfig } from 'astro/config';

// Statische Ausgabe, kein UI-Framework (Blueprint N).
// Strikte CSP: nichts darf inline ausgeliefert werden → Styles und Skripte immer als Datei.
// NP_TEST=1 (scripts/build-test.sh): Testversion für eine Subdomain, eigener Ausgabeordner, auf jeder Seite noindex.
const TEST = process.env.NP_TEST === '1';

export default defineConfig({
  site: 'https://np-webdesign.de',
  outDir: TEST ? './dist-test' : './dist',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'never' },
  vite: { build: { assetsInlineLimit: 0 } },
  devToolbar: { enabled: false },
});
