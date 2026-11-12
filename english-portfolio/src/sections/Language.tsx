import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, RotateCw } from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';
import { Plate } from '../art/Plates';
import { Reveal, SplitHeading } from '../components/Reveal';
import { SectionLabel } from '../components/SectionLabel';
import { language, themes } from '../data';
import { useApp } from '../lib/app';

/* ---------------- Sentence anatomy ---------------- */

type Mode = 'speech' | 'clauses' | 'devices';
const TOKENS: { w: string; speech: string; clauses: string; devices: string }[] = [
  { w: 'Although', speech: 'conj', clauses: 'sub', devices: '-' },
  { w: 'the', speech: 'det', clauses: 'sub', devices: '-' },
  { w: 'hall', speech: 'noun', clauses: 'sub', devices: 'image' },
  { w: 'fell', speech: 'verb', clauses: 'sub', devices: 'image' },
  { w: 'silent,', speech: 'adj', clauses: 'sub', devices: 'image' },
  { w: 'the', speech: 'det', clauses: 'main', devices: '-' },
  { w: 'young', speech: 'adj', clauses: 'main', devices: '-' },
  { w: 'warrior', speech: 'noun', clauses: 'main', devices: 'allit' },
  { w: 'waited,', speech: 'verb', clauses: 'main', devices: 'allit' },
  { w: 'sword', speech: 'noun', clauses: 'abs', devices: 'abs' },
  { w: 'in', speech: 'prep', clauses: 'abs', devices: 'abs' },
  { w: 'hand,', speech: 'noun', clauses: 'abs', devices: 'abs' },
  { w: 'for', speech: 'prep', clauses: 'prep', devices: '-' },
  { w: 'the', speech: 'det', clauses: 'prep', devices: 'fore' },
  { w: 'shadow', speech: 'noun', clauses: 'prep', devices: 'fore' },
  { w: 'at', speech: 'prep', clauses: 'prep', devices: 'fore' },
  { w: 'the', speech: 'det', clauses: 'prep', devices: 'fore' },
  { w: 'door.', speech: 'noun', clauses: 'prep', devices: 'fore' },
];
const GROUPS: Record<Mode, Record<string, { label: string; color: string; note: string }>> = {
  speech: {
    conj: { label: 'Conjunction', color: '#7b5cff', note: 'Subordinating conjunction: makes the clause dependent.' },
    det: { label: 'Determiner', color: '#0b1230', note: 'Introduces and limits a noun.' },
    noun: { label: 'Noun', color: '#f4ecdc', note: 'A person, place, thing or idea.' },
    verb: { label: 'Verb', color: '#3d5afe', note: 'The action or state of being.' },
    adj: { label: 'Adjective', color: '#ffd36b', note: 'Modifies a noun.' },
    prep: { label: 'Preposition', color: '#23493f', note: 'Shows relationship in space or time.' },
  },
  clauses: {
    sub: { label: 'Subordinate clause', color: '#7b5cff', note: 'Cannot stand alone. It sets up tension before the main action.' },
    main: { label: 'Main clause', color: '#0b1230', note: 'The independent core: subject + verb.' },
    abs: { label: 'Absolute phrase', color: '#3d5afe', note: 'Noun + modifier that adds a vivid detail to the whole sentence.' },
    prep: { label: 'Prepositional phrase', color: '#23493f', note: 'Delays the final noun, building suspense.' },
  },
  devices: {
    image: { label: 'Auditory imagery', color: '#7b5cff', note: 'Silence becomes something you can hear.' },
    allit: { label: 'Alliteration', color: '#0b1230', note: '“warrior waited”: the repeated w slows the pace.' },
    abs: { label: 'Asyndeton', color: '#3d5afe', note: 'A clipped phrase without conjunctions feels tense and ready.' },
    fore: { label: 'Foreshadowing', color: '#23493f', note: 'The “shadow at the door” hints at the threat to come.' },
    '-': { label: '', color: 'transparent', note: '' },
  },
};

function SentenceAnatomy() {
  const [mode, setMode] = useState<Mode>('clauses');
  const [hover, setHover] = useState<string | null>(null);
  const groups = GROUPS[mode];
  const active = hover && groups[hover] && groups[hover].label ? groups[hover] : null;

  return (
    <div className="relative">
      <div className="mb-10 flex flex-wrap gap-2">
        {(['speech', 'clauses', 'devices'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              setHover(null);
            }}
            className={`border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] transition-colors duration-300 ${mode === m ? 'border-ink bg-ink text-coral' : 'border-ink/30 hover:border-ink'}`}
          >
            {m === 'speech' ? 'Parts of speech' : m === 'clauses' ? 'Clauses & phrases' : 'Literary devices'}
          </button>
        ))}
      </div>
      <p className="font-display text-[clamp(1.9rem,4.4vw,4.2rem)] font-light leading-[1.35] tracking-[-0.01em]" onPointerLeave={() => setHover(null)}>
        {TOKENS.map((t, i) => {
          const key = t[mode];
          const g = groups[key];
          const lit = hover === key && g?.label;
          const dim = hover && hover !== key;
          return (
            <motion.span
              key={i}
              onPointerEnter={() => setHover(key)}
              onClick={() => setHover(key)}
              className="relative mr-[0.28em] inline-block cursor-pointer"
              animate={{ opacity: dim ? 0.3 : 1, y: lit ? -4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {t.w}
              <motion.span
                className="absolute -bottom-1 left-0 h-[5px] w-[calc(100%+0.28em)]"
                style={{ background: g?.color ?? 'transparent' }}
                initial={false}
                animate={{ scaleX: g?.label ? 1 : 0, opacity: g?.label ? (lit ? 1 : 0.55) : 0 }}
                transition={{ duration: 0.5, delay: i * 0.015 }}
              />
            </motion.span>
          );
        })}
      </p>
      <div className="mt-10 grid min-h-[5.5rem] gap-6 border-t border-ink/25 pt-6 md:grid-cols-[1fr_2fr]">
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {Object.entries(groups)
            .filter(([, g]) => g.label)
            .map(([k, g]) => (
              <button key={k} onPointerEnter={() => setHover(k)} onClick={() => setHover(k)} className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-opacity ${hover && hover !== k ? 'opacity-40' : ''}`}>
                <span className="h-2.5 w-2.5" style={{ background: g.color, outline: '1px solid rgba(11,18,48,.4)' }} />
                {g.label}
              </button>
            ))}
        </div>
        <motion.div key={active?.label ?? 'none'} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="font-accent text-2xl italic leading-snug">
          {active ? (
            <>
              <span className="not-italic font-display">{active.label}.</span> {active.note}
            </>
          ) : (
            <span className="opacity-60">Hover or tap any word to see how the sentence is built.</span>
          )}
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------- Horizontal topic track ---------------- */

function TopicTrack() {
  const { open } = useApp();
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);

  useLayoutEffect(() => {
    const calc = () => {
      if (!track.current) return;
      setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const cards = language.map((e, i) => {
    const th = themes[e.theme];
    return (
      <button
        key={e.id}
        onClick={() => open(e.id)}
        data-cursor="Read"
        className={`group relative flex h-[68vh] min-h-[28rem] w-[82vw] shrink-0 snap-start flex-col justify-between overflow-hidden p-7 text-left sm:w-[26rem] md:p-10 ${i % 2 ? 'md:mt-16' : ''}`}
        style={{ background: th.bg, color: th.fg, ['--plate-fg' as string]: th.fg, ['--plate-accent' as string]: th.accent, ['--plate-soft' as string]: th.soft }}
      >
        <div className="flex items-start justify-between">
          <span className="font-display text-7xl font-extralight italic leading-none opacity-90">{String(i + 1).padStart(2, '0')}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-70">{e.kicker}</span>
        </div>
        <div className="pointer-events-none mx-auto w-[78%] transition-transform duration-[1.1s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-3 group-hover:scale-105">
          <Plate art={e.art} className="w-full" />
        </div>
        <div>
          <div className="font-display text-4xl font-light leading-none tracking-[-0.02em] md:text-5xl">{e.title}</div>
          <p className="mt-3 text-sm leading-snug opacity-80">{e.subtitle}</p>
          <div className="mt-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em]">
            <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-16" /> Open notes <ArrowUpRight size={14} />
          </div>
        </div>
      </button>
    );
  });

  return (
    <>
      {/* desktop: scroll-driven horizontal */}
      <div ref={wrap} className="relative hidden md:block" style={{ height: `calc(100vh + ${dist}px)` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div ref={track} style={{ x }} className="flex gap-6 pl-10 pr-[10vw]">
            <div className="flex w-[28rem] shrink-0 flex-col justify-center pr-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em]">II.ii · Seven units</span>
              <div className="mt-6 font-display text-7xl font-light leading-[0.9] tracking-[-0.03em]">
                The writer’s
                <br />
                <em className="font-accent">workshop</em>
              </div>
              <p className="mt-6 max-w-xs leading-relaxed opacity-75">Keep scrolling to move through the units. Each one opens into full notes.</p>
              <div className="mt-8 h-px w-40 bg-ink/30">
                <motion.div className="h-px origin-left bg-ink" style={{ scaleX: scrollYProgress }} />
              </div>
            </div>
            {cards}
          </motion.div>
        </div>
      </div>
      {/* mobile: native swipe */}
      <div className="md:hidden">
        <div className="px-5 pb-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em]">II.ii · Seven units · swipe →</span>
        </div>
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-10" data-lenis-prevent-touch>
          {cards}
        </div>
      </div>
    </>
  );
}

/* ---------------- Vocabulary flip cards ---------------- */

const VOCAB = [
  { word: 'Elegiac', ipa: '/ˌel.əˈdʒaɪ.ək/', pos: 'adjective', def: 'Expressing sorrow or lament for something lost or past.', use: 'The final scene of Beowulf is elegiac: a pyre, a lament, a kingdom about to fall.', root: 'Greek elegeia, “song of mourning”' },
  { word: 'Hubris', ipa: '/ˈhjuː.brɪs/', pos: 'noun', def: 'Excessive pride or self-confidence that invites downfall.', use: 'Macbeth’s hubris convinces him that no man born of woman can harm him.', root: 'Greek hybris, “insolence”' },
  { word: 'Juxtaposition', ipa: '/ˌdʒʌk.stə.pəˈzɪʃ.ən/', pos: 'noun', def: 'Placing two contrasting things side by side for effect.', use: 'The poet juxtaposes the song in Heorot with Grendel’s misery in the dark.', root: 'Latin juxta, “next to” + positio' },
];

function FlipCard({ v, i }: { v: (typeof VOCAB)[number]; i: number }) {
  const [flip, setFlip] = useState(false);
  const bgs = ['bg-ink text-cream', 'bg-electric text-paper', 'bg-paper text-ink'];
  return (
    <Reveal delay={i * 0.1} className={i === 1 ? 'md:mt-20' : ''}>
      <button onClick={() => setFlip((f) => !f)} className="group block h-[25rem] w-full [perspective:1400px]" data-cursor={flip ? 'Back' : 'Flip'} aria-label={`Flip card: ${v.word}`}>
        <motion.div className="relative h-full w-full [transform-style:preserve-3d]" animate={{ rotateY: flip ? 180 : 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <div className={`absolute inset-0 flex flex-col justify-between p-8 text-left [backface-visibility:hidden] ${bgs[i]}`}>
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] opacity-70">
              <span>Word {String(i + 1).padStart(2, '0')}</span>
              <RotateCw size={14} className="transition-transform duration-700 group-hover:rotate-180" />
            </div>
            <div>
              <div className="font-display text-[clamp(2.6rem,4.5vw,4rem)] font-light italic leading-none tracking-[-0.02em]">{v.word}</div>
              <div className="mt-4 font-mono text-xs opacity-70">
                {v.ipa} · <em>{v.pos}</em>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 flex flex-col justify-between bg-coral p-8 text-left text-ink [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em]">{v.root}</div>
            <div>
              <p className="font-display text-2xl leading-snug">{v.def}</p>
              <p className="mt-5 border-t border-ink/25 pt-4 font-accent text-lg italic leading-snug opacity-85">“{v.use}”</p>
            </div>
          </div>
        </motion.div>
      </button>
    </Reveal>
  );
}

export function Language() {
  return (
    <section id="language" className="relative bg-coral text-ink">
      <div className="relative overflow-hidden px-5 pb-20 pt-28 grain md:px-10 md:pb-28 md:pt-40">
        <div className="relative z-10 mx-auto max-w-[1600px]">
          <div className="grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-2">
              <Reveal>
                <div className="font-display text-[8rem] font-extralight italic leading-[0.8] text-paper md:text-[11rem]">II</div>
              </Reveal>
            </div>
            <h2 className="font-display text-[clamp(3.2rem,9.5vw,10rem)] font-light leading-[0.85] tracking-[-0.04em] md:col-span-10">
              <SplitHeading lines={['Language', <span key="w">&amp; <em className="font-accent text-paper">Writing</em></span>]} />
            </h2>
          </div>
          <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-12">
            <div className="md:col-span-3">
              <Reveal>
                <SectionLabel index="II.i" label="Sentence Anatomy" />
                <p className="mt-6 text-lg leading-relaxed text-ink/80">Grammar isn’t a rulebook. It’s architecture. Switch lenses to see the same sentence as parts, structure, or craft.</p>
              </Reveal>
            </div>
            <div className="md:col-span-9">
              <Reveal delay={0.1}>
                <SentenceAnatomy />
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-blush">
        <TopicTrack />
      </div>

      <div className="relative overflow-hidden bg-blush px-5 pb-28 pt-10 grain md:px-10 md:pb-40 md:pt-28">
        <div className="relative z-10 mx-auto max-w-[1600px]">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <SectionLabel index="II.iii" label="Lexicon · Words of the Semester" />
              </Reveal>
              <h3 className="mt-6 font-display text-[clamp(2.6rem,6vw,5.5rem)] font-light leading-[0.92] tracking-[-0.03em]">
                <SplitHeading lines={[<>Precise words,</>, <>precise <em className="font-accent text-violet">thought</em>.</>]} />
              </h3>
            </div>
            <Reveal>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/60">Tap a card to turn it over</span>
            </Reveal>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {VOCAB.map((v, i) => (
              <FlipCard key={v.word} v={v} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
