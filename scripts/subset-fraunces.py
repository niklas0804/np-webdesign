#!/usr/bin/env python3
"""
Fraunces für Welt 01, auf die tatsächlich benutzten Zeichen reduziert (Blueprint H: „beim Build auf genau die
benutzten Zeichen reduziert“, Budget: Weltschrift bis 30 KB, höchstens zwei Dateien je Welt).

Zwei Dateien, weil die Achse für die optische Größe den Großteil des Gewichts trägt:
  fraunces-01-display.woff2  opsz 144, wght 650, WONK 1, SOFT 0–100 (die Schrift „geht auf“)   → Überschriften
  fraunces-01-text.woff2     opsz 14, wght 400–600, SOFT 0, WONK 0                                  → Fließtext, Reiter, Knöpfe

Quelle: fonts-src/fraunces-latin-full-normal.woff2 (SIL Open Font License, Lizenztext in public/fonts/)

Aufruf (einmalig und nach Textänderungen in der Welt):
    python3 -m venv .venv && .venv/bin/pip install fonttools brotli
    .venv/bin/python scripts/subset-fraunces.py
"""
import io
import pathlib
import re

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

root = pathlib.Path(__file__).resolve().parent.parent
world = root / 'src' / 'worlds' / '01-halmberg'
src = root / 'fonts-src' / 'fraunces-latin-full-normal.woff2'
out_dir = root / 'public' / 'fonts'

BASE = '0123456789.,;:!?()„“‚‘’–—·%/-+&@ ÄÖÜäöüß'


def visible_text(path: pathlib.Path) -> str:
    """Nur sichtbarer Text: ohne Frontmatter, Tags und Code-Ausdrücke"""
    s = path.read_text(encoding='utf-8')
    if path.suffix == '.astro':
        s = re.sub(r'^---.*?---', '', s, flags=re.S)
        s = re.sub(r'<style.*?</style>|<script.*?</script>', '', s, flags=re.S)
        s = re.sub(r'<[^>]+>', ' ', s)
        s = re.sub(r'[{}]', ' ', s)
    return s


data = (world / 'data.js').read_text(encoding='utf-8')
strings = ' '.join(re.findall(r"'((?:[^'\\]|\\.)*)'", data))
text_chars = set(BASE) | set(strings) | set(visible_text(world / 'World.astro'))
# Texte, die motion.js zusammensetzt („auf den Bon gelegt“ usw.)
text_chars |= set(' '.join(re.findall(r'`([^`]*)`', (world / 'motion.js').read_text(encoding='utf-8'))))

display_chars = set('Halmberg Brot, das Zeit hatte. Backplan Öffnungszeiten Nr. 07 0123456789')
display_chars |= set(''.join(re.findall(r"name: '([^']+)'", data))) | set(''.join(re.findall(r"tag: '([^']+)'", data)))


def clean(chars):
    return ''.join(sorted(c for c in chars if c.isprintable() and ord(c) > 31))


def build(limits, chars, name):
    font = TTFont(str(src))
    font = instancer.instantiateVariableFont(font, limits)
    buf = io.BytesIO(); font.flavor = None; font.save(buf); buf.seek(0); font = TTFont(buf)
    o = subset.Options()
    o.flavor = 'woff2'; o.layout_features = ['kern', 'liga']; o.hinting = False; o.desubroutinize = True
    s = subset.Subsetter(o); s.populate(text=chars); s.subset(font)
    out = out_dir / name
    font.flavor = 'woff2'; font.save(str(out))
    print(f'{name}: {len(chars)} Zeichen, {out.stat().st_size / 1024:.1f} KB')
    return out.stat().st_size


total = build({'WONK': 1, 'opsz': 144, 'wght': 650, 'SOFT': (0, 100)}, clean(display_chars), 'fraunces-01-display.woff2')
total += build({'WONK': 0, 'opsz': 14, 'wght': (400, 600), 'SOFT': 0}, clean(text_chars), 'fraunces-01-text.woff2')
print(f'Summe: {total / 1024:.1f} KB (Budget 30 KB)')
