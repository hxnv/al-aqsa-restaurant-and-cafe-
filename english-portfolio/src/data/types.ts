export type Kind = 'literature' | 'language' | 'note' | 'analysis' | 'reflection';

export type ArtKind =
  | 'mead-hall'
  | 'dragon'
  | 'manuscript'
  | 'eye'
  | 'mask'
  | 'arc'
  | 'quill'
  | 'quotes'
  | 'lens'
  | 'venn'
  | 'tree'
  | 'compass'
  | 'book'
  | 'wave'
  | 'sun'
  | 'grid';

export type ThemeKey = 'beowulf' | 'ember' | 'violet' | 'electric' | 'cream' | 'moss' | 'plum' | 'navy' | 'blush';

export type Block =
  | { type: 'p'; text: string }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'concepts'; items: { term: string; def: string }[] }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'callout'; label: string; text: string }
  | { type: 'plate'; art: ArtKind; caption: string };

export interface Section {
  heading: string;
  blocks: Block[];
}

export interface Entry {
  id: string;
  kind: Kind;
  title: string;
  kicker: string;
  subtitle: string;
  date?: string;
  tags: string[];
  theme: ThemeKey;
  art: ArtKind;
  intro: string;
  sections: Section[];
  takeaways?: string[];
  status?: string;
}

export const p = (text: string): Block => ({ type: 'p', text });
export const q = (text: string, cite?: string): Block => ({ type: 'quote', text, cite });
export const ul = (...items: string[]): Block => ({ type: 'list', items });
export const ol = (...items: string[]): Block => ({ type: 'list', items, ordered: true });
export const concepts = (...items: [string, string][]): Block => ({
  type: 'concepts',
  items: items.map(([term, def]) => ({ term, def })),
});
export const table = (head: string[], ...rows: string[][]): Block => ({ type: 'table', head, rows });
export const callout = (label: string, text: string): Block => ({ type: 'callout', label, text });
export const plate = (art: ArtKind, caption: string): Block => ({ type: 'plate', art, caption });
