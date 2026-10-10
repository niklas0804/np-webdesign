#!/usr/bin/env python3
"""
Newsreader für Welt 04 (Haas & Sternfeld) und den Eingangs-Übergang, auf Latein plus deutsche Satzzeichen reduziert
(Blueprint H, Budget: Weltschrift bis 30 KB, zusammen). Zwei Dateien, beide mit fester optischer Größe:
Display (opsz 72, Gewicht 500, Schlagzeile und Zeitungskopf) und Text (opsz 16, Gewicht 400–600, Fließtext, Rubriken, Marginalien).
Eine Datei mit beiden Achsen wäre 47 KB groß. Kursiv entfällt. Die Datei bringt keine echten Kapitälchen mit (kein smcp/c2sc);
die Welt setzt Rubriken mit `font-variant-caps: all-small-caps` (vom Browser synthetisiert) und weiter Laufweite.

Quelle: fonts-src/newsreader-latin-standard-normal.woff2 (SIL Open Font License, Lizenztext in public/fonts/)
Aufruf:  python3 scripts/subset-newsreader.py   (braucht fontTools und brotli)
"""
import io
import pathlib
import string

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

root = pathlib.Path(__file__).resolve().parent.parent
src = root / 'fonts-src' / 'newsreader-latin-standard-normal.woff2'
chars = string.ascii_letters + string.digits + ' .,;:!?()„“‚‘’–—·%/-+&@§ÄÖÜäöüß'

def build(name, location):
    font = TTFont(str(src))
    font = instancer.instantiateVariableFont(font, location)
    buf = io.BytesIO(); font.flavor = None; font.save(buf); buf.seek(0); font = TTFont(buf)
    o = subset.Options()
    o.flavor = 'woff2'; o.layout_features = ['kern', 'liga']; o.hinting = False; o.desubroutinize = True
    s = subset.Subsetter(o); s.populate(text=chars); s.subset(font)
    out = root / 'public' / 'fonts' / name
    font.flavor = 'woff2'; font.save(str(out))
    print(f'{len(chars)} Zeichen → {out.relative_to(root)} ({out.stat().st_size / 1024:.1f} KB)')

build('newsreader-04-display.woff2', {'opsz': 72, 'wght': 500})
build('newsreader-04-text.woff2', {'opsz': 16, 'wght': (400, 600)})
