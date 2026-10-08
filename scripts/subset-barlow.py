#!/usr/bin/env python3
"""
Barlow Condensed 600 (Überschriften) und Barlow 400 (Text) für Welt 03, auf die benutzten Zeichen reduziert
(Blueprint H, Budget: Weltschrift bis 30 KB, höchstens zwei Dateien je Welt). Statische Schnitte, keine Variationsachsen.

Quellen: fonts-src/barlow-condensed-latin-600-normal.woff2, fonts-src/barlow-latin-400-normal.woff2 (SIL OFL, Lizenztext in public/fonts/)
Aufruf:  .venv/bin/python scripts/subset-barlow.py
"""
import pathlib
import re

from fontTools import subset
from fontTools.ttLib import TTFont

root = pathlib.Path(__file__).resolve().parent.parent
world = root / 'src' / 'worlds' / '03-wittgenfeld'
out_dir = root / 'public' / 'fonts'


def visible_text(path):
    s = path.read_text(encoding='utf-8')
    if path.suffix == '.astro':
        s = re.sub(r'^---.*?---', '', s, flags=re.S)
        s = re.sub(r'<style.*?</style>|<script.*?</script>', '', s, flags=re.S)
        s = re.sub(r'<[^>]+>', ' ', s)
        s = re.sub(r'[{}]', ' ', s)
    return s


strings = ''
for name in ('data.js', 'plan.js', 'motion.js'):
    strings += ' '.join(re.findall(r"['`]((?:[^'`\\]|\\.)*)['`]", (world / name).read_text(encoding='utf-8')))
# Das Datum im Schriftfeld entsteht erst beim Build: alle deutschen Monatsnamen mitnehmen
MONATE = 'Januar Februar März April Mai Juni Juli August September Oktober November Dezember'
chars = set('0123456789.,;:!?()„“‚‘’–—·%/-+&@ ÄÖÜäöüß') | set(strings) | set(MONATE)
for f in world.glob('*.astro'):
    chars |= set(visible_text(f))
chars |= {u for c in chars for u in c.upper()} | {u for c in chars for u in c.lower()}  # Überschriften stehen in Versalien
chars = ''.join(sorted(c for c in chars if c.isprintable() and ord(c) > 31))


def build(src, name):
    o = subset.Options()
    o.flavor = 'woff2'; o.layout_features = ['kern', 'liga']; o.hinting = False; o.desubroutinize = True
    font = subset.load_font(str(root / 'fonts-src' / src), o)
    s = subset.Subsetter(o); s.populate(text=chars); s.subset(font)
    out = out_dir / name
    subset.save_font(font, str(out), o)
    print(f'{name}: {len(chars)} Zeichen, {out.stat().st_size / 1024:.1f} KB')
    return out.stat().st_size


total = build('barlow-condensed-latin-600-normal.woff2', 'barlow-condensed-03.woff2')
total += build('barlow-latin-400-normal.woff2', 'barlow-03.woff2')
print(f'Summe: {total / 1024:.1f} KB (Budget 30 KB)')
