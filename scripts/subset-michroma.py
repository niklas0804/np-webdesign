#!/usr/bin/env python3
"""
Michroma für Welt 05 (Chromwerk): breite, technische Versalien-Schrift nur für Display (Blueprint F, H).
Reduziert auf Versalien, Ziffern und Satzzeichen, weil die Welt Michroma ausschließlich in Großbuchstaben setzt
(`text-transform: uppercase`). Fließtext steht in der Systemschrift.

Quelle: fonts-src/michroma-latin-400-normal.woff2 (SIL Open Font License, Lizenztext in public/fonts/)
Aufruf:  python3 scripts/subset-michroma.py   (braucht fontTools und brotli)
"""
import pathlib
import string

from fontTools import subset
from fontTools.ttLib import TTFont

root = pathlib.Path(__file__).resolve().parent.parent
src = root / 'fonts-src' / 'michroma-latin-400-normal.woff2'
out = root / 'public' / 'fonts' / 'michroma-05.woff2'

chars = string.ascii_uppercase + string.digits + ' .,;:!?()„“‚‘’–—·%/-+&@§ÄÖÜß°²³'
font = TTFont(str(src))
o = subset.Options()
o.flavor = 'woff2'; o.layout_features = ['kern']; o.hinting = False; o.desubroutinize = True
s = subset.Subsetter(o); s.populate(text=chars); s.subset(font)
font.flavor = 'woff2'; font.save(str(out))
print(f'{len(chars)} Zeichen → {out.relative_to(root)} ({out.stat().st_size / 1024:.1f} KB, Budget 30 KB)')
