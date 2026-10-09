#!/usr/bin/env python3
"""
Schriften für Welt 06 (Figtree), Welt 07 (Geist und Geist Mono), Welt 08 (Atkinson Hyperlegible Next) und Welt 09 (Cormorant), auf Latein plus deutsche Satzzeichen reduziert
(Blueprint H, Budget: Weltschrift bis 30 KB je Welt). Gewicht bleibt variabel, aber begrenzt:
  Figtree 400–600 (Welt 06: Text 400, Überschriften und Pillen 600)
  Geist 400–700 (Welt 07: Überschriften und Text)
  Geist Mono 400–500 (Welt 07: Daten)
  Atkinson Hyperlegible Next 400–700 (Welt 08: Text 400, Überschriften und Bedienung 700)
  Cormorant 300–500 (Welt 09: Display 300 und 500, Text 500)

Quellen: fonts-src/*.woff2 (SIL Open Font License, Lizenztexte in public/fonts/)
Aufruf:  python3 scripts/subset-figtree-geist.py   (braucht fontTools und brotli)
"""
import io
import pathlib
import string

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

root = pathlib.Path(__file__).resolve().parent.parent
chars = string.ascii_letters + string.digits + ' .,;:!?()„“‚‘’–—·%/-+&@§ÄÖÜäöüß€→←↗×°µ²³±Ø'

def build(src, name, wght):
    font = TTFont(str(root / 'fonts-src' / src))
    font = instancer.instantiateVariableFont(font, {'wght': wght})
    buf = io.BytesIO(); font.flavor = None; font.save(buf); buf.seek(0); font = TTFont(buf)
    o = subset.Options()
    o.flavor = 'woff2'; o.layout_features = ['kern', 'liga', 'tnum', 'lnum']; o.hinting = False; o.desubroutinize = True
    s = subset.Subsetter(o); s.populate(text=chars); s.subset(font)
    out = root / 'public' / 'fonts' / name
    font.flavor = 'woff2'; font.save(str(out))
    print(f'{name}: {out.stat().st_size / 1024:.1f} KB')

build('figtree-latin-wght-normal.woff2', 'figtree-06.woff2', (400, 600))
build('geist-latin-wght-normal.woff2', 'geist-07.woff2', (400, 700))
build('geist-mono-latin-wght-normal.woff2', 'geist-mono-07.woff2', (400, 500))
build('atkinson-hyperlegible-next-latin-wght-normal.woff2', 'atkinson-08.woff2', (400, 700))
build('cormorant-latin-wght-normal.woff2', 'cormorant-09.woff2', (300, 500))
