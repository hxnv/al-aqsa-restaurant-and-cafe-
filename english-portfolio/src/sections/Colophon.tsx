import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useRef } from 'react';
import { Reveal } from '../components/Reveal';
import { NAV_ITEMS } from '../components/Nav';
import { useApp } from '../lib/app';

export function Colophon() {
  const { scrollTo, setSearchOpen } = useApp();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const y = useTransform(scrollYProgress, [0, 1], ['40%', '0%']);
  const spacing = useTransform(scrollYProgress, [0, 1], ['0.2em', '-0.04em']);

  return (
    <footer ref={ref} className="relative overflow-hidden bg-midnight text-cream grain-light">
      <div className="relative z-10 mx-auto max-w-[1600px] px-5 pt-28 md:px-10 md:pt-40">
        <div className="grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-coral">To be continued</div>
            <p className="mt-6 font-display text-4xl font-light leading-[1.1] md:text-5xl">
              Semester II begins in January, with <em className="font-accent">Frankenstein</em>, the Romantics, and a research essay.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 gap-10 md:col-span-6 md:col-start-7">
            <Reveal delay={0.05}>
              <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-cream/50">Chapters</div>
              <ul className="space-y-2">
                {NAV_ITEMS.map((n) => (
                  <li key={n.id}>
                    <button onClick={() => scrollTo(`#${n.id}`)} className="group flex items-center gap-2 text-lg text-cream/80 transition-colors hover:text-cream">
                      <span className="h-px w-0 bg-coral transition-all duration-500 group-hover:w-5" />
                      {n.label}
                    </button>
                  </li>
                ))}
                <li>
                  <button onClick={() => setSearchOpen(true)} className="group flex items-center gap-2 text-lg text-coral">
                    <span className="h-px w-0 bg-coral transition-all duration-500 group-hover:w-5" />
                    Search ⌘K
                  </button>
                </li>
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-cream/50">Colophon</div>
              <dl className="space-y-4 text-sm text-cream/70">
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-cream/40">Display</dt>
                  <dd className="font-display text-lg italic text-cream">Fraunces &amp; Instrument Serif</dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-cream/40">Text</dt>
                  <dd className="text-lg text-cream">Inter Tight</dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-cream/40">Heroic Age</dt>
                  <dd className="font-medieval text-lg text-goldlight">Cinzel</dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-cream/40">Note</dt>
                  <dd>Design preview. All entries are placeholder content until the final notes are added.</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-20 overflow-hidden md:mt-28">
        <motion.div style={{ y, letterSpacing: spacing }} className="whitespace-nowrap text-center font-display text-[30vw] font-light italic leading-[0.78] font-display-soft">
          Fin<span className="text-coral">.</span>
        </motion.div>
      </div>

      <div className="relative z-10 border-t border-cream/10">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-5 py-6 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/50 md:px-10">
          <span>English — First Semester · Grade 12 · 2026</span>
          <button onClick={() => scrollTo(0)} className="group flex items-center gap-3 text-cream/80 hover:text-cream" data-cursor="Top">
            Back to top
            <span className="flex h-9 w-9 items-center justify-center border border-cream/30 transition-colors group-hover:bg-cream group-hover:text-ink">
              <ArrowUp size={14} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
