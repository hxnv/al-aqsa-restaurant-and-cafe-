import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Plate } from '../art/Plates';
import { Reveal, WordReveal } from '../components/Reveal';
import { SectionLabel } from '../components/SectionLabel';
import { allEntries, notes } from '../data';
import type { ArtKind } from '../data/types';
import { useApp } from '../lib/app';

const WORDS = ['Alliteration', 'Kenning', 'Caesura', 'Elegy', 'Hubris', 'Wyrd', 'Comitatus', 'Soliloquy', 'Metaphor', 'Litotes', 'Thesis', 'Juxtaposition', 'Anagnorisis'];

function Counter({ to, label }: { to: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - start) / 1600);
        setN(Math.round((1 - Math.pow(1 - k, 4)) * to));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <div ref={ref} className="border-t border-cream/20 pt-5">
      <div className="font-display text-6xl font-extralight tabular-nums md:text-7xl">{n.toLocaleString()}</div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-cream/60">{label}</div>
    </div>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-30%', '0%']);

  return (
    <section ref={ref} id="manifesto" className="relative overflow-hidden bg-ink py-28 text-cream grain-light md:py-44">
      <div className="relative z-10 mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal>
          <SectionLabel index="00" label="Editor’s Letter" className="text-coral" />
        </Reveal>
        <p className="mt-12 max-w-[22ch] font-display text-[clamp(2.2rem,5.6vw,5.4rem)] font-light leading-[1.04] tracking-[-0.02em] md:mt-16">
          <WordReveal text="This semester I read about monsters and kings, learned to build an argument clause by clause, and found that a poem written a thousand years ago can still sound like a voice in the room." />
        </p>
        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12">
          <Reveal className="md:col-span-4 md:col-start-2">
            <p className="font-accent text-2xl italic leading-snug text-cream/80">
              What follows is a working archive of notes, analyses, drafts and reflections: the record of a term spent learning how literature works, and how to write about it.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 gap-8 md:col-span-6 md:col-start-7 md:grid-cols-4">
            <Counter to={allEntries.length} label="Entries" />
            <Counter to={notes.length} label="Lessons" />
            <Counter to={4} label="Major texts" />
            <Counter to={3182} label="Lines of Beowulf" />
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-24 space-y-3 md:mt-36" aria-hidden>
        <motion.div style={{ x: x1 }} className="flex gap-10 whitespace-nowrap font-display text-[clamp(3rem,9vw,8rem)] font-light italic leading-none">
          {[...WORDS, ...WORDS].map((w, i) => (
            <span key={i} className={i % 3 === 0 ? 'text-coral' : i % 3 === 1 ? 'text-outline text-cream/70' : 'text-cream'}>
              {w}
              <span className="ml-10 text-lilac not-italic">✦</span>
            </span>
          ))}
        </motion.div>
        <motion.div style={{ x: x2 }} className="flex gap-12 whitespace-nowrap font-mono text-sm uppercase tracking-[0.4em] text-cream/40">
          {Array.from({ length: 4 }).map((_, k) => (
            <span key={k}>Beowulf · Macbeth · Sir Gawain and the Green Knight · Grammar · Rhetoric · Essay · Reflection ·</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const CONTENTS: { id: string; num: string; title: string; desc: string; art: ArtKind; bg: string; fg: string; accent: string }[] = [
  { id: 'literature', num: 'I', title: 'Literature', desc: 'Beowulf, themes, character, symbol and structure.', art: 'dragon', bg: '#0a0d18', fg: '#efe3c4', accent: '#d4ad57' },
  { id: 'language', num: 'II', title: 'Language & Writing', desc: 'Grammar, vocabulary, syntax, rhetoric and the essay.', art: 'tree', bg: '#ff6b4a', fg: '#1b0d0a', accent: '#0b1230' },
  { id: 'notes', num: 'III', title: 'Class Notes', desc: 'A chronological notebook of ten lessons.', art: 'book', bg: '#f4ecdc', fg: '#0b1230', accent: '#3d5afe' },
  { id: 'analysis', num: 'IV', title: 'Literary Analysis', desc: 'Close readings, comparisons and interpretations.', art: 'lens', bg: '#2a1b6e', fg: '#efeaff', accent: '#c3b5ff' },
  { id: 'reflections', num: 'V', title: 'Reflections', desc: 'Assignments, drafts, activities and responses.', art: 'quill', bg: '#f6d5c6', fg: '#2a1020', accent: '#7b5cff' },
];

export function Contents() {
  const { scrollTo } = useApp();
  const [hover, setHover] = useState<number | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 25 });
  const sy = useSpring(my, { stiffness: 200, damping: 25 });

  return (
    <section className="relative overflow-hidden bg-cream py-24 text-ink grain md:py-36">
      <div className="relative z-10 mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-20">
          <Reveal>
            <SectionLabel index="§" label="Table of Contents" />
            <h2 className="mt-6 font-display text-[clamp(3rem,8vw,7.5rem)] font-light leading-[0.9] tracking-[-0.03em]">
              In this <em className="font-accent">issue</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-ink/70">Five chapters, each with its own visual voice. Hover to preview, click to jump.</p>
          </Reveal>
        </div>

        <div
          ref={box}
          className="relative"
          onPointerMove={(e) => {
            const r = box.current!.getBoundingClientRect();
            mx.set(e.clientX - r.left);
            my.set(e.clientY - r.top);
          }}
          onPointerLeave={() => setHover(null)}
        >
          {CONTENTS.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.05} y={30}>
              <button
                onClick={() => scrollTo(`#${c.id}`)}
                onPointerEnter={() => setHover(i)}
                data-cursor="Jump"
                className="group relative grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 border-t border-ink/20 py-6 text-left md:grid-cols-[6rem_1fr_22rem_4rem] md:py-9"
              >
                <span className="font-mono text-xs text-ink/50">{c.num}</span>
                <span className="font-display text-[clamp(2rem,5.5vw,5rem)] font-light leading-none tracking-[-0.02em] transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-4 group-hover:italic md:group-hover:translate-x-8">
                  {c.title}
                </span>
                <span className="hidden text-sm leading-relaxed text-ink/60 md:block">{c.desc}</span>
                <ArrowUpRight className="justify-self-end transition-transform duration-500 group-hover:rotate-45" size={28} strokeWidth={1.2} />
                <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-ink transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
              </button>
            </Reveal>
          ))}
          <div className="border-t border-ink/20" />

          <motion.div className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block" style={{ x: sx, y: sy }}>
            <AnimatePresence>
              {hover !== null && (
                <motion.div
                  key={hover}
                  initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: -4 }}
                  exit={{ opacity: 0, scale: 0.7, rotate: 4 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="-translate-x-1/2 -translate-y-1/2 p-5 shadow-2xl"
                  style={{ background: CONTENTS[hover].bg, width: 240, height: 300, ['--plate-fg' as string]: CONTENTS[hover].fg, ['--plate-accent' as string]: CONTENTS[hover].accent, ['--plate-soft' as string]: 'transparent' }}
                >
                  <div className="flex h-full flex-col justify-between" style={{ color: CONTENTS[hover].fg }}>
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] opacity-70">Chapter {CONTENTS[hover].num}</span>
                    <Plate art={CONTENTS[hover].art} className="mx-auto w-[85%]" />
                    <span className="font-display text-xl italic">{CONTENTS[hover].title}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
