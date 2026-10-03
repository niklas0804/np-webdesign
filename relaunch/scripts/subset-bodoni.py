#!/usr/bin/env python3
"""
Bodoni Moda für Welt 02, auf die tatsächlich benutzten Zeichen reduziert (Blueprint H, Budget: Weltschrift bis 30 KB).
Eine Datei: optische Größe 11–96 und Gewicht 400–700 bleiben variabel. Versalien werden mit abgedeckt, weil die Welt
Überschriften per CSS in Versalien setzt.

Quelle: fonts-src/bodoni-moda-latin-standard-normal.woff2 (SIL Open Font License, Lizenztext in public/fonts/)
Aufruf:  .venv/bin/python scripts/subset-bodoni.py
"""
import io
import pathlib
import re

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

root = pathlib.Path(__file__).resolve().parent.parent
world = root / 'src' / 'worlds' / '02-herrenzimmer'
src = root / 'fonts-src' / 'bodoni-moda-latin-standard-normal.woff2'
out = root / 'public' / 'fonts' / 'bodoni-02.woff2'

def visible_text(path):
    s = path.read_text(encoding='utf-8')
    if path.suffix == '.astro':
        s = re.sub(r'^---.*?---', '', s, flags=re.S)
        s = re.sub(r'<style.*?</style>|<script.*?</script>', '', s, flags=re.S)
        s = re.sub(r'<[^>]+>', ' ', s)
        s = re.sub(r'[{}]', ' ', s)
    return s

data = (world / 'data.js').read_text(encoding='utf-8')
chars = set('0123456789.,;:!?()„“‚‘’–—·%/-+&@ ÄÖÜäöüß€')
chars |= set(' '.join(re.findall(r"'((?:[^'\\]|\\.)*)'", data)))
chars |= set(visible_text(world / 'World.astro'))
chars |= set(' '.join(re.findall(r'`([^`]*)`', (world / 'motion.js').read_text(encoding='utf-8'))))
# Texte aus der Konfiguration, die in der Welt erscheinen (Notiz steht in der NP-Schrift, nicht hier)
chars |= {u for c in chars for u in c.upper()} | {u for c in chars for u in c.lower()}
# Das Euro-Zeichen bleibt draußen: Seine Querstriche sind in Bodoni Haarlinien und verschwinden bei Textgrößen.
# Es fällt auf die Ersatzschrift (Georgia, Times) zurück und bleibt lesbar.
chars.discard('€')
chars = ''.join(sorted(c for c in chars if c.isprintable() and ord(c) > 31))

font = TTFont(str(src))
font = instancer.instantiateVariableFont(font, {'opsz': (11, 96), 'wght': (400, 700)})
buf = io.BytesIO(); font.flavor = None; font.save(buf); buf.seek(0); font = TTFont(buf)
o = subset.Options()
o.flavor = 'woff2'; o.layout_features = ['kern', 'liga', 'lnum', 'tnum']; o.hinting = False; o.desubroutinize = True
s = subset.Subsetter(o); s.populate(text=chars); s.subset(font)
font.flavor = 'woff2'; font.save(str(out))
print(f'{len(chars)} Zeichen → {out.relative_to(root)} ({out.stat().st_size / 1024:.1f} KB, Budget 30 KB)')
