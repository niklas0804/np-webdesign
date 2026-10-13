# Kontaktbögen der Übergangs-Prüfung

Erzeugt von `tools/check-transitions.cjs` (siehe `docs/troubleshooting-uebergaenge.md`).

- `uebergaenge-<stand>-<ansicht>.jpg`: alle Bilder, auf denen die Übergangsbühne sichtbar ist, im Raster von 10 % der Bildschirmhöhe. `σ` ist die Standardabweichung der Helligkeit, die Prozentzahl der Anteil der häufigsten Farbe. Unter σ 10 oder ab 99,5 % gilt ein Bild als leer.
- `befunde-<stand>-<ansicht>.jpg`: alle markierten Bilder (leer, Text unter dem Rahmen, Hin ≠ Rück), rot umrandet. Aufnahmen ohne Rahmen-Ebene.
- `report-<stand>-<ansicht>.json`: alle Messwerte.

Stand `vorher` = `main` nach PR #2, `nachher` = Branch `claude/phase-3`. Ansichten: `mobil` 390 × 844, `schmal` 375 × 667, `desktop` 1440 × 900.
