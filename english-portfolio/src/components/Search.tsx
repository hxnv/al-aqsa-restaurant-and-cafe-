import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, CornerDownLeft, Search as SearchIcon, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { allEntries, kindLabel, search, themes, type Kind } from '../data';
import { useApp } from '../lib/app';
import { EASE } from './Reveal';

const SUGGESTIONS = ['Beowulf', 'kenning', 'thesis', 'Macbeth', 'symbolism', 'rhetoric', 'Grendel', 'semicolon'];
const FILTERS: (Kind | 'all')[] = ['all', 'literature', 'language', 'note', 'analysis', 'reflection'];

export function Search() {
  const { searchOpen, setSearchOpen } = useApp();
  return <AnimatePresence>{searchOpen && <SearchPanel onClose={() => setSearchOpen(false)} />}</AnimatePresence>;
}

function Highlight({ text, q }: { text: string; q: string }) {
  const terms = q.trim().split(/\s+/).filter(Boolean).map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (!terms.length) return <>{text}</>;
  const re = new RegExp(`(${terms.join('|')})`, 'gi');
  return (
    <>
      {text.split(re).map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="bg-coral/90 px-0.5 text-ink">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const { open } = useApp();
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState<Kind | 'all'>('all');
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const base = q.trim() ? search(q) : [];
    return filter === 'all' ? base : base.filter((r) => r.entry.kind === filter);
  }, [q, filter]);

  const browse = useMemo(() => (filter === 'all' ? [] : allEntries.filter((e) => e.kind === filter)), [filter]);
  const shown = q.trim() ? results : browse.map((entry) => ({ entry, score: 0, snippet: entry.subtitle }));

  useEffect(() => {
    setTimeout(() => input.current?.focus(), 80);
  }, []);
  useEffect(() => setSel(0), [q, filter]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSel((s) => Math.min(s + 1, shown.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSel((s) => Math.max(s - 1, 0));
      }
      if (e.key === 'Enter' && shown[sel]) open(shown[sel].entry.id);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [shown, sel, open, onClose]);

  useEffect(() => {
    list.current?.querySelector<HTMLElement>(`[data-i="${sel}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [sel]);

  return (
    <motion.div className="fixed inset-0 z-[130] flex items-start justify-center p-0 md:p-8 md:pt-[8vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <motion.div className="absolute inset-0 bg-midnight/70 backdrop-blur-md" onClick={onClose} />
      <motion.div
        role="dialog"
        aria-label="Search"
        className="relative flex h-full w-full max-w-4xl flex-col overflow-hidden bg-paper text-ink shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)] md:h-auto md:max-h-[80vh]"
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="flex items-center gap-4 border-b border-ink/15 px-5 py-5 md:px-8">
          <SearchIcon size={22} strokeWidth={1.4} className="shrink-0 text-coral" />
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search notes, topics, quotations…"
            className="w-full bg-transparent font-display text-2xl font-light placeholder:text-ink/30 focus:outline-none md:text-3xl"
            aria-label="Search query"
          />
          <button onClick={onClose} className="flex h-10 w-10 shrink-0 items-center justify-center border border-ink/15 transition-colors hover:bg-ink hover:text-paper" aria-label="Close search">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-ink/10 px-5 py-3 md:px-8">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${filter === f ? 'bg-ink text-paper' : 'text-ink/60 hover:text-ink'}`}
            >
              {f === 'all' ? 'Everything' : kindLabel[f]}
            </button>
          ))}
        </div>

        <div ref={list} data-lenis-prevent className="thin-scrollbar min-h-0 flex-1 overflow-y-auto">
          {!q.trim() && filter === 'all' ? (
            <div className="grid gap-10 p-5 md:grid-cols-2 md:p-8">
              <div>
                <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50">Try searching for</div>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button key={s} onClick={() => setQ(s)} className="border border-ink/15 px-3 py-2 font-display text-lg italic transition-colors hover:border-coral hover:bg-coral hover:text-paper">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50">Featured</div>
                {['beowulf', 'analysis-compare', 'essay-writing', 'note-07'].map((id) => {
                  const e = allEntries.find((x) => x.id === id)!;
                  return (
                    <button key={id} onClick={() => open(id)} className="group flex w-full items-center justify-between border-b border-ink/10 py-3 text-left">
                      <span>
                        <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-ink/50">{kindLabel[e.kind]}</span>
                        <span className="font-display text-xl transition-colors group-hover:text-coral">{e.title}</span>
                      </span>
                      <ArrowUpRight size={18} className="opacity-40 transition-all group-hover:rotate-45 group-hover:opacity-100" />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : shown.length === 0 ? (
            <div className="p-10 text-center md:p-16">
              <div className="font-display text-4xl font-light italic">Nothing found.</div>
              <p className="mt-3 text-sm text-ink/60">No notes match “{q}”. Try a character, a device or a lesson topic.</p>
            </div>
          ) : (
            <ul className="py-2">
              <li className="px-5 pb-2 pt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50 md:px-8">
                {shown.length} result{shown.length === 1 ? '' : 's'}
              </li>
              {shown.map((r, i) => {
                const th = themes[r.entry.theme];
                return (
                  <li key={r.entry.id}>
                    <button
                      data-i={i}
                      onMouseEnter={() => setSel(i)}
                      onClick={() => open(r.entry.id)}
                      className={`grid w-full grid-cols-[2.5rem_1fr_auto] items-start gap-4 px-5 py-4 text-left transition-colors md:px-8 ${sel === i ? 'bg-ink text-paper' : ''}`}
                    >
                      <span className="mt-1 flex h-9 w-9 items-center justify-center font-display text-lg italic" style={{ background: th.bg, color: th.accent }}>
                        {r.entry.title.charAt(0)}
                      </span>
                      <span className="min-w-0">
                        <span className={`block font-mono text-[9px] uppercase tracking-[0.2em] ${sel === i ? 'text-paper/60' : 'text-ink/50'}`}>
                          {kindLabel[r.entry.kind]} · {r.entry.kicker}
                        </span>
                        <span className="mt-0.5 block font-display text-xl leading-tight md:text-2xl">
                          <Highlight text={r.entry.title} q={q} />
                        </span>
                        {r.snippet && (
                          <span className={`mt-1 line-clamp-2 block text-sm ${sel === i ? 'text-paper/70' : 'text-ink/60'}`}>
                            <Highlight text={r.snippet} q={q} />
                          </span>
                        )}
                      </span>
                      <CornerDownLeft size={16} className={`mt-2 transition-opacity ${sel === i ? 'opacity-80' : 'opacity-0'}`} />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="hidden items-center gap-6 border-t border-ink/10 px-8 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50 md:flex">
          <span>↑↓ Navigate</span>
          <span>↵ Open</span>
          <span>Esc Close</span>
          <span className="ml-auto">{allEntries.length} entries indexed</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
