import { analysis } from './analysis';
import { language } from './language';
import { literature } from './literature';
import { notes } from './notes';
import { reflections } from './reflections';
import type { Block, Entry, Kind, ThemeKey } from './types';

export { analysis, language, literature, notes, reflections };
export type { Entry, Kind, ThemeKey };

export const allEntries: Entry[] = [...literature, ...language, ...notes, ...analysis, ...reflections];

export const entryById = new Map(allEntries.map((e) => [e.id, e]));

export interface Theme {
  bg: string;
  fg: string;
  accent: string;
  soft: string;
  line: string;
  display: 'medieval' | 'serif';
}

export const themes: Record<ThemeKey, Theme> = {
  beowulf: { bg: '#0a0d18', fg: '#efe3c4', accent: '#d4ad57', soft: '#1a1a24', line: 'rgba(212,173,87,0.25)', display: 'medieval' },
  ember: { bg: '#ff6b4a', fg: '#1b0d0a', accent: '#0b1230', soft: '#ff8a6e', line: 'rgba(27,13,10,0.2)', display: 'serif' },
  violet: { bg: '#2a1b6e', fg: '#efeaff', accent: '#c3b5ff', soft: '#3a2a8a', line: 'rgba(195,181,255,0.25)', display: 'serif' },
  electric: { bg: '#3d5afe', fg: '#f4f6ff', accent: '#ffd36b', soft: '#5670ff', line: 'rgba(244,246,255,0.25)', display: 'serif' },
  cream: { bg: '#f4ecdc', fg: '#0b1230', accent: '#ff6b4a', soft: '#ebe0ca', line: 'rgba(11,18,48,0.15)', display: 'serif' },
  moss: { bg: '#1f4239', fg: '#ecf0e4', accent: '#e8c46a', soft: '#2a5248', line: 'rgba(236,240,228,0.2)', display: 'serif' },
  plum: { bg: '#3b1638', fg: '#fbe9ef', accent: '#ff8e72', soft: '#4d2049', line: 'rgba(251,233,239,0.2)', display: 'serif' },
  navy: { bg: '#0b1230', fg: '#f4ecdc', accent: '#7b8cff', soft: '#162055', line: 'rgba(244,236,220,0.18)', display: 'serif' },
  blush: { bg: '#f6d5c6', fg: '#2a1020', accent: '#7b5cff', soft: '#f0c3b0', line: 'rgba(42,16,32,0.15)', display: 'serif' },
};

export const kindLabel: Record<Kind, string> = {
  literature: 'Literature',
  language: 'Language & Writing',
  note: 'Class Notes',
  analysis: 'Analysis',
  reflection: 'Reflections',
};

const blockText = (b: Block): string => {
  switch (b.type) {
    case 'p':
    case 'callout':
      return b.text;
    case 'quote':
      return `${b.text} ${b.cite ?? ''}`;
    case 'list':
      return b.items.join(' ');
    case 'concepts':
      return b.items.map((i) => `${i.term} ${i.def}`).join(' ');
    case 'table':
      return [...b.head, ...b.rows.flat()].join(' ');
    case 'plate':
      return b.caption;
  }
};

export const searchIndex = allEntries.map((e) => ({
  entry: e,
  title: e.title.toLowerCase(),
  meta: `${e.kicker} ${e.subtitle} ${e.tags.join(' ')} ${kindLabel[e.kind]}`.toLowerCase(),
  body: `${e.intro} ${e.sections.map((s) => `${s.heading} ${s.blocks.map(blockText).join(' ')}`).join(' ')}`
    .replace(/\*/g, '')
    .toLowerCase(),
}));

export function search(query: string) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return searchIndex
    .map((row) => {
      let score = 0;
      for (const t of terms) {
        const inTitle = row.title.includes(t);
        const inMeta = row.meta.includes(t);
        const inBody = row.body.includes(t);
        if (!inTitle && !inMeta && !inBody) return null;
        score += (inTitle ? 10 : 0) + (inMeta ? 4 : 0) + (inBody ? 1 : 0);
      }
      let snippet = '';
      const idx = row.body.indexOf(terms[0]);
      if (idx >= 0) {
        const raw = `${row.entry.intro} ${row.entry.sections.map((s) => s.blocks.map(blockText).join(' ')).join(' ')}`.replace(/\*/g, '');
        const start = Math.max(0, idx - 60);
        snippet = (start > 0 ? '…' : '') + raw.slice(start, idx + 110).trim() + '…';
      }
      return { entry: row.entry, score, snippet };
    })
    .filter((r): r is { entry: Entry; score: number; snippet: string } => r !== null)
    .sort((a, b) => b.score - a.score);
}

export function formatDate(iso: string, style: 'long' | 'short' = 'long') {
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('en-GB', style === 'long' ? { day: 'numeric', month: 'long', year: 'numeric' } : { day: '2-digit', month: 'short' });
}
