import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Plate } from '../art/Plates';
import { Reveal, SplitHeading } from '../components/Reveal';
import { SectionLabel } from '../components/SectionLabel';
import { RichText } from '../components/RichText';
import { analysis, themes } from '../data';
import { useApp } from '../lib/app';

const thesisOf = (id: string) => {
  const e = analysis.find((a) => a.id === id)!;
  const first = e.sections[0]?.blocks.find((b) => b.type === 'p' || b.type === 'quote');
  return first && 'text' in first ? first.text : e.intro;
};

export function Analysis() {
  const { open } = useApp();
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ['start end', 'end start'] });
  const bgShift = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const io = new IntersectionObserver(
      (items) => items.forEach((it) => it.isIntersecting && setActive(Number((it.target as HTMLElement).dataset.i))),
      { rootMargin: '-45% 0px -45% 0px' }
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  const cur = analysis[active];
  const th = themes[cur.theme];

  return (
    <section ref={section} id="analysis" className="relative overflow-clip bg-[#1a1050] text-[#efeaff] grain-light">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage: 'linear-gradient(160deg, #1a1050 0%, #2a1b6e 35%, #3d5afe 70%, #1a1050 100%)',
          backgroundSize: '100% 300%',
          backgroundPositionY: bgShift,
        }}
      />
      <div className="relative z-10 mx-auto max-w-[1600px] px-5 pb-16 pt-28 md:px-10 md:pt-40">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-2">
            <Reveal>
              <div className="font-display text-[8rem] font-extralight italic leading-[0.8] text-lilac md:text-[11rem]">IV</div>
            </Reveal>
          </div>
          <h2 className="font-display text-[clamp(3.2rem,9.5vw,10rem)] font-light leading-[0.85] tracking-[-0.04em] md:col-span-10">
            <SplitHeading lines={['Literary', <em key="a" className="font-accent text-lilac">Analysis</em>]} />
          </h2>
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1600px] gap-10 px-5 pb-28 md:grid-cols-12 md:px-10 md:pb-40">
        {/* sticky visual */}
        <div className="hidden md:col-span-5 md:block">
          <div className="sticky top-0 flex h-screen flex-col justify-center">
            <div className="relative aspect-square w-full" style={{ ['--plate-fg' as string]: '#efeaff', ['--plate-accent' as string]: th.accent === '#0b1230' ? '#ff6b4a' : th.accent, ['--plate-soft' as string]: 'rgba(255,255,255,0.06)' }}>
              <motion.div className="absolute inset-0 rounded-full border border-white/15" animate={{ rotate: active * 72 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
                {Array.from({ length: analysis.length }).map((_, i) => {
                  const a = (i / analysis.length) * Math.PI * 2 - Math.PI / 2;
                  return (
                    <span key={i} className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50" style={{ left: `${50 + Math.cos(a) * 50}%`, top: `${50 + Math.sin(a) * 50}%` }} />
                  );
                })}
              </motion.div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={cur.id}
                  className="absolute inset-[12%]"
                  initial={{ opacity: 0, scale: 0.8, rotate: -20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.1, rotate: 20, filter: 'blur(10px)' }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Plate art={cur.art} className="h-full w-full" />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-8 flex items-end justify-between border-t border-white/20 pt-5">
              <AnimatePresence mode="wait">
                <motion.span key={cur.kicker} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="font-mono text-[11px] uppercase tracking-[0.25em] text-lilac">
                  {cur.kicker}
                </motion.span>
              </AnimatePresence>
              <span className="font-display text-5xl font-extralight tabular-nums">
                {String(active + 1).padStart(2, '0')}
                <span className="text-2xl opacity-40">/{String(analysis.length).padStart(2, '0')}</span>
              </span>
            </div>
          </div>
        </div>

        {/* scrolling list */}
        <div className="md:col-span-6 md:col-start-7">
          <Reveal>
            <SectionLabel index="IV" label="Five ways of reading" className="mb-10 text-lilac md:mb-0" />
          </Reveal>
          {analysis.map((a, i) => (
            <article
              key={a.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-i={i}
              className="flex min-h-[80vh] flex-col justify-center border-b border-white/10 py-16 md:min-h-screen"
            >
              <motion.div
                animate={{ opacity: active === i ? 1 : 0.35 }}
                transition={{ duration: 0.6 }}
                className="max-md:!opacity-100"
              >
                <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-lilac">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <span className="h-px w-10 bg-current" />
                  <span>{a.kicker}</span>
                </div>
                <h3 className="mt-6 font-display text-[clamp(2.4rem,4.6vw,4.4rem)] font-light leading-[0.98] tracking-[-0.02em]">{a.title}</h3>
                <p className="mt-6 font-accent text-2xl italic leading-snug text-white/80">{a.subtitle}</p>
                <div className="mt-8 border-l-2 border-lilac/60 pl-6">
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">Thesis</div>
                  <p className="text-lg leading-relaxed text-white/85">
                    <RichText text={thesisOf(a.id)} markClass="bg-[linear-gradient(transparent_60%,rgba(195,181,255,0.35)_60%)]" />
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                  {a.tags.slice(0, 4).map((t) => (
                    <span key={t}>#{t.replace(/\s+/g, '-')}</span>
                  ))}
                </div>
                <button
                  onClick={() => open(a.id)}
                  data-cursor="Read"
                  className="group mt-10 inline-flex items-center gap-4 border-b border-white/40 pb-2 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors hover:border-lilac hover:text-lilac"
                >
                  Read the full analysis <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
                </button>
              </motion.div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
