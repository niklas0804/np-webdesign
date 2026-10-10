/**
 * Welt 10 · NP Labor – Inhalte. Das ist keine Kundenstudie, sondern NPs eigene Spielwiese: die nackte Website.
 * Das Gerüst von Welt 01 (Halmberg) wird für den Rohbau-Schalter aus den Daten der Welt erzeugt, damit es nie veraltet.
 */
import { BACKPLAN, BROTE, ZEITEN } from '../01-halmberg/data.js';

export const KURZ = 'Alles, was Sie gesehen haben, besteht aus diesem Rohmaterial: Text, Überschriften, Links und Bedienelemente, die der Browser selbst mitbringt.';

/** Gerüst der Welt 01 als Baum: Tag, Text, Kinder. Nur die Struktur, keine Gestaltung. */
export const GERUEST = [
  { tag: 'h2', text: 'Halmberg' },
  { tag: 'p', text: 'Brot, das Zeit hatte.' },
  { tag: 'h3', text: 'Backplan' },
  { tag: 'ul', kinder: BACKPLAN.slice(0, 3).map((d) => ({ tag: 'li', text: `${d.tag}: ${d.brote.map((k) => BROTE[k].name).join(', ')}` })) },
  { tag: 'h3', text: 'Öffnungszeiten' },
  { tag: 'dl', kinder: ZEITEN.flatMap(([t, z]) => [{ tag: 'dt', text: t }, { tag: 'dd', text: z }]) },
];

export const BESCHREIBUNG = 'Das Gerüst der Welt 01 besteht aus einer Überschrift der zweiten Ebene (Halmberg), einem Absatz, zwei Überschriften der dritten Ebene (Backplan, Öffnungszeiten), einer Liste mit den Broten der ersten Wochentage und einer Definitionsliste mit den Öffnungszeiten.';
