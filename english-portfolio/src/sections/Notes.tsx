import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Plate } from '../art/Plates';
import { Reveal, SplitHeading } from '../components/Reveal';
import { SectionLabel } from '../components/SectionLabel';
import { notes, themes } from '../data';
import { useApp } from '../lib/app';

const MONTHS = [
  { key: 'all', label: 'All lessons' },
  { key: '09', label: 'September' },
  { key: '10', label: 'October' },
  { key: '11', label: 'November' },
];

export function Notes() {
  const { open } = useApp();
  const [month, setMonth] = useState('all');
  const [hover, setHover] = useState<string | null>(null);
  const list = useMemo(() => (month === 'all' ? notes : notes.filter((n) => n.date!.slice(5, 7) === month)), [month]);
  const preview = notes.find((n) => n.id === hover) ?? list[0];

  return (
    <section id="notes" className="relative overflow-clip bg-cream text-ink grain">
      <div className="rule-lines pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute bottom-0 left-[4.5rem] top-0 w-px bg-coral/50 md:left-[7.5rem]" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 pb-28 pt-28 md:px-10 md:pb-40 md:pt-40">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-2">
            <Reveal>
              <div className="font-display text-[8rem] font-extralight italic leading-[0.8] text-electric md:text-[11rem]">III</div>
            </Reveal>
          </div>
          <div className="md:col-span-10">
            <h2 className="font-display text-[clamp(3.2rem,9.5vw,10rem)] font-light leading-[0.85] tracking-[-0.04em]">
              <SplitHeading lines={[<>The <em className="font-accent text-electric">Notebook</em></>]} />
            </h2>
          </div>
        </div>

        <div className="mt-14 grid gap-8 md:mt-20 md:grid-cols-12">
          <Reveal className="md:col-span-4 md:col-start-3">
            <SectionLabel index="III" label="Class Notes · Chronological" />
            <p className="mt-6 text-lg leading-relaxed text-ink/75">Ten lessons, one term. Filter by month, hover to preview, open any page to read the full notes and takeaways.</p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-6">
            <LayoutGroup>
              <div className="flex flex-wrap gap-x-1 gap-y-2 md:justify-end">
                {MONTHS.map((m) => (
                  <button key={m.key} onClick={() => setMonth(m.key)} className="relative px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em]">
                    {month === m.key && <motion.span layoutId="month" className="absolute inset-0 bg-ink" transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} />}
                    <span className={`relative transition-colors duration-300 ${month === m.key ? 'text-cream' : 'text-ink/70 hover:text-ink'}`}>{m.label}</span>
                  </button>
                ))}
              </div>
            </LayoutGroup>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <ol className="md:col-span-8" onPointerLeave={() => setHover(null)}>
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map((n) => {
                const d = new Date(n.date! + 'T12:00:00');
                const th = themes[n.theme];
                return (
                  <motion.li
                    key={n.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      onClick={() => open(n.id)}
                      onPointerEnter={() => setHover(n.id)}
                      onFocus={() => setHover(n.id)}
                      data-cursor="Open"
                      className="group relative grid w-full grid-cols-[4rem_1fr] gap-4 border-b border-ink/15 py-7 text-left md:grid-cols-[7rem_1fr_auto] md:gap-8 md:py-9"
                    >
                      <span className="absolute inset-0 origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" style={{ background: th.bg }} />
                      <span className="relative transition-colors duration-500" style={{ color: hover === n.id ? th.accent : undefined }}>
                        <span className="block font-display text-5xl font-light leading-none md:text-6xl">{d.getDate()}</span>
                        <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">{d.toLocaleDateString('en-GB', { month: 'short' })}</span>
                      </span>
                      <span className="relative transition-colors duration-500" style={{ color: hover === n.id ? th.fg : undefined }}>
                        <span className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.22em] opacity-70">
                          <span>{n.kicker}</span>
                          <span>{n.tags.slice(0, 2).join(' · ')}</span>
                        </span>
                        <span className="mt-2 block font-display text-[clamp(1.6rem,3vw,2.6rem)] font-normal leading-tight tracking-[-0.01em] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] md:group-hover:translate-x-3">
                          {n.title}
                        </span>
                        <span className="mt-2 block max-w-xl text-[0.95rem] leading-relaxed opacity-75">{n.subtitle}</span>
                      </span>
                      <span className="relative hidden self-center md:block" style={{ color: hover === n.id ? th.fg : undefined }}>
                        <ArrowUpRight size={28} strokeWidth={1.2} className="transition-transform duration-500 group-hover:rotate-45" />
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ol>

          {/* sticky preview */}
          <aside className="hidden md:col-span-4 md:block">
            <div className="sticky top-28">
              <AnimatePresence mode="wait">
                {preview && (
                  <motion.div
                    key={preview.id}
                    initial={{ opacity: 0, y: 20, rotate: 1.5 }}
                    animate={{ opacity: 1, y: 0, rotate: -1.5 }}
                    exit={{ opacity: 0, y: -10, rotate: -3 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative p-7 shadow-[0_30px_60px_-20px_rgba(11,18,48,0.4)]"
                    style={{ background: themes[preview.theme].bg, color: themes[preview.theme].fg, ['--plate-fg' as string]: themes[preview.theme].fg, ['--plate-accent' as string]: themes[preview.theme].accent, ['--plate-soft' as string]: themes[preview.theme].soft }}
                  >
                    <span className="absolute -top-3 left-8 h-6 w-20 bg-goldlight/80 mix-blend-multiply" aria-hidden />
                    <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.22em] opacity-70">
                      <span>{preview.kicker}</span>
                      <span>{new Date(preview.date! + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}</span>
                    </div>
                    <Plate art={preview.art} className="mx-auto my-6 w-[60%]" />
                    <div className="font-display text-2xl leading-tight">{preview.title}</div>
                    <p className="mt-3 text-sm leading-relaxed opacity-80">{preview.intro}</p>
                    {preview.takeaways && (
                      <div className="mt-5 border-t pt-4" style={{ borderColor: themes[preview.theme].line }}>
                        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: themes[preview.theme].accent }}>
                          Key takeaway
                        </div>
                        <p className="font-accent text-lg italic leading-snug">{preview.takeaways[0]}</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
