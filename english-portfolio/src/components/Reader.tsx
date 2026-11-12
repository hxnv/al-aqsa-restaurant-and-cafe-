import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { allEntries, formatDate, kindLabel, themes, type Entry } from '../data';
import { Plate } from '../art/Plates';
import { useApp } from '../lib/app';
import { BlockView } from './Blocks';
import { EASE } from './Reveal';
import { RichText } from './RichText';

const wordsIn = (e: Entry) =>
  (e.intro + JSON.stringify(e.sections)).split(/\s+/).length;

export function Reader() {
  const { active, close } = useApp();
  return <AnimatePresence mode="wait">{active && <ReaderView key={active.id} entry={active} onClose={close} />}</AnimatePresence>;
}

function ReaderView({ entry, onClose }: { entry: Entry; onClose: () => void }) {
  const { open } = useApp();
  const t = themes[entry.theme];
  const scroller = useRef<HTMLDivElement>(null);
  const { scrollYProgress, scrollY } = useScroll({ container: scroller });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const artY = useTransform(scrollY, [0, 800], [0, 160]);
  const artRot = useTransform(scrollY, [0, 800], [0, -12]);
  const titleY = useTransform(scrollY, [0, 600], [0, -80]);
  const [current, setCurrent] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const siblings = useMemo(() => allEntries.filter((e) => e.kind === entry.kind), [entry.kind]);
  const idx = siblings.findIndex((e) => e.id === entry.id);
  const prev = siblings[(idx - 1 + siblings.length) % siblings.length];
  const next = siblings[(idx + 1) % siblings.length];
  const minutes = Math.max(2, Math.round(wordsIn(entry) / 200));
  const medieval = t.display === 'medieval';

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (items) => {
        items.forEach((it) => {
          if (it.isIntersecting) setCurrent(Number((it.target as HTMLElement).dataset.idx));
        });
      },
      { root, rootMargin: '-30% 0px -60% 0px' }
    );
    sectionRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [entry.id]);

  const jump = (i: number) => {
    const el = sectionRefs.current[i];
    const root = scroller.current;
    if (el && root) root.scrollTo({ top: el.offsetTop - 90, behavior: 'smooth' });
  };

  const vars = {
    '--t-bg': t.bg,
    '--t-fg': t.fg,
    '--t-accent': t.accent,
    '--t-soft': t.soft,
    '--t-line': t.line,
    '--plate-fg': t.fg,
    '--plate-accent': t.accent,
    '--plate-soft': t.soft,
    background: t.bg,
    color: t.fg,
  } as React.CSSProperties;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={entry.title}
      className="fixed inset-0 z-[120]"
      style={vars}
      initial={{ clipPath: 'inset(100% 0 0 0)' }}
      animate={{ clipPath: 'inset(0% 0 0 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <div className={`pointer-events-none absolute inset-0 ${medieval || ['violet', 'navy', 'moss', 'plum'].includes(entry.theme) ? 'grain-light' : 'grain'}`} />

      {/* top bar */}
      <div className="absolute inset-x-0 top-0 z-20 border-b backdrop-blur-md" style={{ borderColor: 'var(--t-line)', background: `color-mix(in oklab, ${t.bg} 82%, transparent)` }}>
        <div className="flex items-center justify-between gap-4 px-5 py-3.5 md:px-10">
          <button onClick={onClose} className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em]" data-cursor="Close">
            <span className="flex h-9 w-9 items-center justify-center border transition-colors duration-300 group-hover:bg-[var(--t-fg)] group-hover:text-[var(--t-bg)]" style={{ borderColor: 'var(--t-line)' }}>
              <X size={16} strokeWidth={1.5} />
            </span>
            <span className="hidden sm:inline">Close</span>
            <kbd className="hidden border px-1.5 py-0.5 text-[9px] opacity-60 md:inline" style={{ borderColor: 'var(--t-line)' }}>ESC</kbd>
          </button>
          <span className="truncate font-mono text-[10px] uppercase tracking-[0.25em] opacity-70">
            {kindLabel[entry.kind]} <span className="mx-2 opacity-50">/</span> {entry.title}
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => open(prev.id)} aria-label={`Previous: ${prev.title}`} className="flex h-9 w-9 items-center justify-center border transition-colors hover:bg-[var(--t-fg)] hover:text-[var(--t-bg)]" style={{ borderColor: 'var(--t-line)' }}>
              <ArrowLeft size={15} strokeWidth={1.5} />
            </button>
            <button onClick={() => open(next.id)} aria-label={`Next: ${next.title}`} className="flex h-9 w-9 items-center justify-center border transition-colors hover:bg-[var(--t-fg)] hover:text-[var(--t-bg)]" style={{ borderColor: 'var(--t-line)' }}>
              <ArrowRight size={15} strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <motion.div className="h-[2px] origin-left" style={{ scaleX: progress, background: 'var(--t-accent)' }} />
      </div>

      <div ref={scroller} data-lenis-prevent className="thin-scrollbar relative z-10 h-full overflow-y-auto overscroll-contain">
        {/* header */}
        <header className="relative mx-auto grid min-h-[92svh] max-w-[1500px] items-end gap-10 px-5 pb-16 pt-28 md:grid-cols-12 md:px-10 md:pb-24">
          <motion.div className="relative z-10 md:col-span-8" style={{ y: titleY }}>
            <motion.div
              className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.25em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
            >
              <span style={{ color: 'var(--t-accent)' }}>{entry.kicker}</span>
              {entry.date && <span className="opacity-70">{formatDate(entry.date)}</span>}
              <span className="flex items-center gap-1.5 opacity-70">
                <Clock size={12} /> {minutes} min read
              </span>
              {entry.status && <span className="border px-2 py-1 opacity-90" style={{ borderColor: 'var(--t-accent)', color: 'var(--t-accent)' }}>{entry.status}</span>}
            </motion.div>
            <h1
              className={`text-balance leading-[0.9] ${
                medieval
                  ? 'font-medieval text-[clamp(3.4rem,11vw,10rem)] font-semibold tracking-[0.04em]'
                  : 'font-display text-[clamp(3rem,8.5vw,8.5rem)] font-light tracking-[-0.03em] font-display-soft'
              }`}
              style={medieval ? { backgroundImage: 'linear-gradient(180deg,#f7e3a8 0%,#d4ad57 45%,#8a6a2a 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' } : undefined}
            >
              {entry.title.split(' ').map((w, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ delay: 0.35 + i * 0.07, duration: 1.1, ease: EASE }}
                  >
                    {w}&nbsp;
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              className={`mt-8 max-w-2xl text-xl leading-snug opacity-85 md:text-2xl ${medieval ? 'font-accent italic' : 'font-display font-light italic'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.85, y: 0 }}
              transition={{ delay: 0.7, duration: 0.9, ease: EASE }}
            >
              {entry.subtitle}
            </motion.p>
          </motion.div>
          <motion.div
            className="pointer-events-none absolute right-[-10%] top-20 w-[75vw] max-w-[620px] opacity-30 md:relative md:right-0 md:top-0 md:col-span-4 md:w-full md:opacity-100"
            style={{ y: artY, rotate: artRot }}
          >
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 1.4, ease: EASE }}>
              <Plate art={entry.art} className={`w-full ${medieval ? 'animate-flicker' : ''}`} />
            </motion.div>
          </motion.div>
        </header>

        {/* intro */}
        <section className="mx-auto max-w-[1500px] px-5 md:px-10">
          <div className="grid gap-10 border-t pt-14 md:grid-cols-12" style={{ borderColor: 'var(--t-line)' }}>
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] opacity-60 md:col-span-3">Introduction</div>
            <p className="text-[1.35rem] leading-[1.55] md:col-span-8 md:text-[1.7rem]">
              <span
                className={`float-left mr-3 mt-1 text-[5.2rem] leading-[0.75] md:text-[6.5rem] ${medieval ? 'font-medieval' : 'font-display italic'}`}
                style={{ color: 'var(--t-accent)' }}
              >
                {entry.intro.charAt(0)}
              </span>
              {entry.intro.slice(1)}
            </p>
          </div>
          {entry.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] opacity-60 md:ml-[25%]">
              {entry.tags.map((tag) => (
                <span key={tag}>#{tag.replace(/\s+/g, '-')}</span>
              ))}
            </div>
          )}
        </section>

        {/* body */}
        <section className="mx-auto mt-20 grid max-w-[1500px] gap-12 px-5 pb-24 md:mt-28 md:grid-cols-12 md:px-10">
          <aside className="hidden md:col-span-3 md:block">
            <nav className="sticky top-28" aria-label="Sections">
              <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] opacity-60">On this page</div>
              <ol className="space-y-1">
                {entry.sections.map((s, i) => (
                  <li key={s.heading}>
                    <button onClick={() => jump(i)} className="group flex w-full items-baseline gap-3 py-1.5 text-left">
                      <span className="font-mono text-[10px] transition-colors" style={{ color: current === i ? 'var(--t-accent)' : undefined, opacity: current === i ? 1 : 0.5 }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className={`text-sm leading-snug transition-all duration-300 ${current === i ? 'translate-x-1 opacity-100' : 'opacity-55 group-hover:opacity-90'}`}>{s.heading}</span>
                    </button>
                  </li>
                ))}
                {entry.takeaways && (
                  <li>
                    <button onClick={() => jump(entry.sections.length)} className="flex w-full items-baseline gap-3 py-1.5 text-left">
                      <span className="font-mono text-[10px]" style={{ color: current === entry.sections.length ? 'var(--t-accent)' : undefined, opacity: current === entry.sections.length ? 1 : 0.5 }}>
                        ✦
                      </span>
                      <span className={`text-sm transition-opacity ${current === entry.sections.length ? 'opacity-100' : 'opacity-55'}`}>Key takeaways</span>
                    </button>
                  </li>
                )}
              </ol>
              <div className="mt-8 h-24 w-px overflow-hidden" style={{ background: 'var(--t-line)' }}>
                <motion.div className="w-full origin-top" style={{ height: '100%', scaleY: progress, background: 'var(--t-accent)' }} />
              </div>
            </nav>
          </aside>

          <div className="space-y-24 md:col-span-9 md:space-y-32">
            {entry.sections.map((s, i) => (
              <article key={s.heading} ref={(el) => { sectionRefs.current[i] = el; }} data-idx={i} className="scroll-mt-28">
                <div className="mb-10 flex items-end gap-5 border-b pb-6" style={{ borderColor: 'var(--t-line)' }}>
                  <span className={`text-[4.5rem] leading-[0.8] md:text-[6rem] ${medieval ? 'font-medieval' : 'font-display font-extralight italic'}`} style={{ color: 'var(--t-accent)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className={`pb-1 text-[1.8rem] leading-tight md:text-[2.6rem] ${medieval ? 'font-medieval tracking-wide' : 'font-display font-normal tracking-tight'}`}>{s.heading}</h2>
                </div>
                <div className="space-y-10">
                  {s.blocks.map((b, j) => (
                    <BlockView key={j} block={b} display={t.display} />
                  ))}
                </div>
              </article>
            ))}

            {entry.takeaways && (
              <article ref={(el) => { sectionRefs.current[entry.sections.length] = el; }} data-idx={entry.sections.length} className="relative overflow-hidden p-8 md:p-14" style={{ background: 'var(--t-accent)', color: t.bg }}>
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em]">Key takeaways</span>
                  <span className="font-display text-5xl italic leading-none">✦</span>
                </div>
                <ol className="grid gap-x-10 gap-y-6 md:grid-cols-2">
                  {entry.takeaways.map((k, i) => (
                    <li key={i} className="flex gap-4 border-t pt-4" style={{ borderColor: `color-mix(in oklab, ${t.bg} 30%, transparent)` }}>
                      <span className="font-mono text-xs">{String(i + 1).padStart(2, '0')}</span>
                      <span className={`text-xl leading-snug ${medieval ? 'font-accent' : 'font-display'}`}>
                        <RichText text={k} />
                      </span>
                    </li>
                  ))}
                </ol>
              </article>
            )}
          </div>
        </section>

        {/* next */}
        <button
          onClick={() => {
            open(next.id);
          }}
          data-cursor="Next"
          className="group relative block w-full overflow-hidden border-t text-left"
          style={{ borderColor: 'var(--t-line)', background: themes[next.theme].bg, color: themes[next.theme].fg }}
        >
          <div className="mx-auto flex max-w-[1500px] flex-col gap-6 px-5 py-16 md:flex-row md:items-end md:justify-between md:px-10 md:py-24">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] opacity-70">Next in {kindLabel[next.kind]}</span>
              <div className="mt-4 font-display text-[clamp(2.4rem,7vw,6.5rem)] font-light leading-[0.92] tracking-tight transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-4">
                {next.title}
              </div>
            </div>
            <ArrowUpRight size={64} strokeWidth={1} className="transition-transform duration-700 group-hover:-translate-y-2 group-hover:translate-x-2 group-hover:rotate-45" />
          </div>
        </button>
      </div>
    </motion.div>
  );
}
