/* Markiert früh, dass JavaScript läuft. Erst dann werden Einblend-Zustände und zugeklappte FAQ-Antworten aktiv;
   ohne JavaScript bleibt der gesamte Inhalt sichtbar. (Eigene Datei statt Inline-Skript wegen strikter CSP.) */
document.documentElement.classList.add('js');
