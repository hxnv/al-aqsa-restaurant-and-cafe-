import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { Plate } from '../art/Plates';
import { Reveal, SplitHeading } from '../components/Reveal';
import { SectionLabel } from '../components/SectionLabel';
import { literature, themes } from '../data';
import { useApp } from '../lib/app';

const RUNES = 'ᚻᚹᚫᛏ · ᚹᛖ · ᚷᚪᚱ·ᛞᛖᚾᚪ · ᛁᚾ · ᚷᛠᚱᛞᚪᚷᚢᛗ · ᚦᛠᛞᚳᚣᚾᛁᚾᚷᚪ · ᚦᚱᛁᛗ · ᚷᛖᚠᚱᚢᚾᚩᚾ · ';

const BATTLES = [
  { n: 'I', name: 'Grendel', place: 'Heorot · the mead-hall', line: 'Youth: strength proven bare-handed, for glory alone.', art: 'eye' as const },
  { n: 'II', name: 'Grendel’s Mother', place: 'The mere · beneath the lake', line: 'Maturity: the code of revenge, and the failure of human weapons.', art: 'wave' as const },
  { n: 'III', name: 'The Dragon', place: 'The barrow · edge of the kingdom', line: 'Old age: a king wins, dies, and leaves his people exposed.', art: 'dragon' as const },
];

function BeowulfFeature() {
  const { open } = useApp();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const titleScale = useTransform(scrollYProgress, [0.1, 0.5], [1.12, 1]);
  const titleY = useTransform(scrollYProgress, [0, 1], ['-10%', '20%']);
  const hallY = useTransform(scrollYProgress, [0, 1], ['15%', '-15%']);
  const glow = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.2, 0.9, 0.3]);
  const [hover, setHover] = useState(0);
  const [reveal, setReveal] = useState(false);

  return (
    <div ref={ref} className="relative overflow-hidden bg-[#0a0d18] text-[#efe3c4] grain-light" style={{ ['--plate-fg' as string]: '#efe3c4', ['--plate-accent' as string]: '#d4ad57', ['--plate-soft' as string]: '#141522' }}>
      {/* atmosphere */}
      <motion.div style={{ opacity: glow }} className="pointer-events-none absolute left-1/2 top-[30%] h-[80vw] w-[80vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,173,87,0.35),rgba(212,173,87,0)_60%)] md:h-[60vw] md:w-[60vw]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-paper/0 to-transparent" />

      {/* runic band */}
      <div className="relative z-10 overflow-hidden border-y border-[#d4ad57]/20 py-3" aria-hidden>
        <div className="animate-marquee-slow flex w-max whitespace-nowrap font-mono text-sm tracking-[0.5em] text-[#d4ad57]/70">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i}>{RUNES}</span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 pt-20 md:px-10 md:pt-32">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <Reveal>
            <SectionLabel index="I.i" label="Feature · The Heroic Age" className="text-[#d4ad57]" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="text-right font-mono text-[10px] uppercase tracking-[0.25em] text-[#efe3c4]/50">
              Anonymous · c. 700–1000 CE
              <br />
              Old English · 3,182 lines
            </div>
          </Reveal>
        </div>

        <motion.h3 style={{ scale: titleScale, y: titleY }} className="relative mt-10 origin-center text-center md:mt-6">
          <span
            className="block font-medieval text-[14.5vw] font-bold leading-[0.85] tracking-[0.02em] md:text-[16.5vw]"
            style={{ backgroundImage: 'linear-gradient(180deg,#fbe9b5 0%,#d4ad57 40%,#7a5a20 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
          >
            Beowulf
          </span>
        </motion.h3>

        <div className="relative mt-6 grid items-center gap-12 pb-20 md:grid-cols-12 md:pb-28">
          <motion.div style={{ y: hallY }} className="md:col-span-5">
            <Plate art="mead-hall" className="animate-flicker mx-auto w-full max-w-md" />
          </motion.div>
          <div className="md:col-span-6 md:col-start-7">
            <button
              className="group block w-full text-left"
              onPointerEnter={() => setReveal(true)}
              onPointerLeave={() => setReveal(false)}
              onClick={() => setReveal((r) => !r)}
              data-cursor="Translate"
              aria-label="Toggle translation of the opening line"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#d4ad57]">Line 1 · hover to translate</span>
              <span className="mt-4 grid">
                <motion.span animate={{ opacity: reveal ? 0 : 1, y: reveal ? -16 : 0, filter: reveal ? 'blur(6px)' : 'blur(0px)' }} transition={{ duration: 0.6 }} className="font-medieval text-4xl leading-tight [grid-area:1/1] md:text-5xl">
                  Hwæt! We Gardena in geardagum…
                </motion.span>
                <motion.span initial={false} animate={{ opacity: reveal ? 1 : 0, y: reveal ? 0 : 16, filter: reveal ? 'blur(0px)' : 'blur(6px)' }} transition={{ duration: 0.6 }} className="font-accent text-4xl italic leading-tight text-[#ecd18c] [grid-area:1/1] md:text-5xl">
                  “Listen! We have heard of the glory of the Spear-Danes in days of old…”
                </motion.span>
              </span>
            </button>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#efe3c4]/80">
              A warrior crosses the whale-road to free a king from a monster, follows the monster’s mother beneath a lake, and fifty winters later dies killing a dragon. It is a poem less about winning than about what remains after: a name, a mound by the sea, a song.
            </p>
            <button
              onClick={() => open('beowulf')}
              data-cursor="Enter"
              className="group mt-10 inline-flex items-center gap-5 border border-[#d4ad57]/60 py-4 pl-6 pr-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[#ecd18c] transition-colors duration-500 hover:bg-[#d4ad57] hover:text-[#0a0d18]"
            >
              Enter the poem
              <span className="flex h-9 w-9 items-center justify-center bg-[#d4ad57] text-[#0a0d18] transition-transform duration-500 group-hover:rotate-45 group-hover:bg-[#0a0d18] group-hover:text-[#d4ad57]">
                <ArrowUpRight size={16} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Three battles: expanding columns */}
      <div className="relative z-10 border-t border-[#d4ad57]/20">
        <div className="mx-auto max-w-[1600px] px-5 py-6 font-mono text-[10px] uppercase tracking-[0.25em] text-[#efe3c4]/50 md:px-10">The three battles · youth, maturity, old age</div>
        <div className="flex flex-col md:h-[70vh] md:flex-row">
          {BATTLES.map((b, i) => {
            const on = hover === i;
            return (
              <motion.button
                key={b.n}
                onPointerEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onClick={() => open('beowulf')}
                data-cursor="Read"
                layout
                transition={{ layout: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
                className={`group relative flex min-h-[22rem] flex-col justify-between overflow-hidden border-t border-[#d4ad57]/20 p-6 text-left md:min-h-0 md:border-l md:border-t-0 md:p-10 ${on ? 'md:flex-[2.4]' : 'md:flex-1'}`}
                style={{ background: on ? '#11131f' : 'transparent' }}
              >
                <div className="flex items-start justify-between">
                  <span className="font-medieval text-6xl text-[#d4ad57] md:text-7xl">{b.n}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#efe3c4]/50">{b.place}</span>
                </div>
                <motion.div
                  className="pointer-events-none absolute right-[-10%] top-1/2 w-[70%] -translate-y-1/2 md:w-[45%]"
                  animate={{ opacity: on ? 0.9 : 0.15, rotate: on ? 0 : -12, scale: on ? 1 : 0.8 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Plate art={b.art} className="w-full" />
                </motion.div>
                <div className="relative">
                  <div className="font-medieval text-3xl leading-tight md:text-5xl">{b.name}</div>
                  <motion.p animate={{ opacity: on ? 1 : 0.5 }} className="mt-4 max-w-sm font-accent text-xl italic leading-snug text-[#efe3c4]/85">
                    {b.line}
                  </motion.p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** Asymmetric editorial grid of the other literature topics. */
const LAYOUT = [
  'md:col-span-7 md:row-span-2 min-h-[30rem] md:min-h-[44rem]',
  'md:col-span-5 min-h-[22rem]',
  'md:col-span-5 min-h-[22rem]',
  'md:col-span-4 min-h-[26rem]',
  'md:col-span-4 min-h-[26rem] md:translate-y-16',
  'md:col-span-4 min-h-[26rem]',
];

function TopicGrid() {
  const { open } = useApp();
  const topics = literature.filter((e) => e.id !== 'beowulf');
  return (
    <div className="relative bg-paper py-24 text-ink grain md:py-36">
      <div className="relative z-10 mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-16 grid gap-8 md:mb-24 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <SectionLabel index="I.ii" label="Literary Study" />
            </Reveal>
            <h3 className="mt-6 font-display text-[clamp(2.8rem,7vw,6.5rem)] font-light leading-[0.92] tracking-[-0.03em]">
              <SplitHeading lines={[<>The anatomy</>, <>of a <em className="font-accent text-coral">story</em>.</>]} />
            </h3>
          </div>
          <Reveal delay={0.15} className="self-end md:col-span-4 md:col-start-9">
            <p className="text-lg leading-relaxed text-ink/70">Six lenses for reading any text. Each opens into a full set of notes with key concepts, quotations and worked examples.</p>
          </Reveal>
        </div>

        <div className="grid gap-4 md:grid-cols-12 md:gap-5">
          {topics.map((t, i) => {
            const th = themes[t.theme];
            return (
              <Reveal key={t.id} delay={(i % 3) * 0.08} className={LAYOUT[i]}>
                <button
                  onClick={() => open(t.id)}
                  data-cursor="Read"
                  className="group relative flex h-full w-full flex-col justify-between overflow-hidden p-6 text-left md:p-9"
                  style={{ background: th.bg, color: th.fg, ['--plate-fg' as string]: th.fg, ['--plate-accent' as string]: th.accent, ['--plate-soft' as string]: th.soft }}
                >
                  <div className="relative z-10 flex items-start justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-70">
                      {String(i + 2).padStart(2, '0')} · {t.kicker}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center border transition-all duration-500 group-hover:rotate-45" style={{ borderColor: th.line }}>
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <div
                    className={`pointer-events-none absolute transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110 group-hover:rotate-[-6deg] ${
                      i === 0 ? 'right-[-6%] top-[-2%] w-[64%]' : 'right-[-6%] top-[-10%] w-[40%] opacity-90'
                    }`}
                  >
                    <Plate art={t.art} className="w-full" />
                  </div>
                  <div className="relative z-10">
                    <div className={`font-display font-light leading-[0.95] tracking-[-0.02em] ${i === 0 ? 'text-[clamp(2.6rem,5vw,4.8rem)]' : 'text-[clamp(2rem,3vw,2.8rem)]'}`}>{t.title}</div>
                    <p className={`mt-4 max-w-[34ch] leading-snug opacity-80 ${i === 0 ? 'font-accent text-2xl italic' : 'text-sm'}`}>{t.subtitle}</p>
                    <span className="mt-6 block h-px w-full origin-left scale-x-[0.15] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" style={{ background: th.fg }} />
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Literature() {
  return (
    <section id="literature" className="relative">
      <div className="relative bg-paper px-5 pb-14 pt-28 text-ink grain md:px-10 md:pb-20 md:pt-40">
        <div className="relative z-10 mx-auto grid max-w-[1600px] items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-2">
            <Reveal>
              <div className="font-display text-[8rem] font-extralight italic leading-[0.8] text-coral md:text-[11rem]">I</div>
            </Reveal>
          </div>
          <h2 className="font-display text-[clamp(3.6rem,11vw,11rem)] font-light leading-[0.85] tracking-[-0.04em] md:col-span-10">
            <SplitHeading lines={['Literature']} />
          </h2>
        </div>
      </div>
      <BeowulfFeature />
      <TopicGrid />
    </section>
  );
}
