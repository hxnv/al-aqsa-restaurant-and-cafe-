import { motion } from 'framer-motion';
import { Move } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Plate } from '../art/Plates';
import { Reveal, SplitHeading } from '../components/Reveal';
import { SectionLabel } from '../components/SectionLabel';
import { formatDate, reflections, type Entry } from '../data';
import { useApp } from '../lib/app';

const get = (id: string) => reflections.find((r) => r.id === id)!;

function Meta({ e, className = '' }: { e: Entry; className?: string }) {
  return (
    <div className={`flex justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.22em] opacity-70 ${className}`}>
      <span>{e.kicker}</span>
      <span>{formatDate(e.date!, 'short')}</span>
    </div>
  );
}

/* Each desk object has its own material */
const PIECES: { id: string; pos: string; rot: number; w: string; render: (e: Entry) => ReactNode }[] = [
  {
    id: 'assignment-essay',
    pos: 'left-[3%] top-[6%]',
    rot: -3,
    w: 'w-[24rem]',
    render: (e) => (
      <div className="relative bg-paper p-8 text-ink shadow-[0_25px_50px_-12px_rgba(11,18,48,0.35)]">
        <Meta e={e} />
        <div className="mt-6 font-display text-3xl leading-tight">{e.title}</div>
        <p className="mt-4 text-sm leading-relaxed text-ink/70">{e.subtitle}</p>
        <div className="mt-6 space-y-2" aria-hidden>
          {[100, 92, 97, 60].map((w, i) => (
            <div key={i} className="h-1.5 bg-ink/10" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="absolute -right-5 -top-6 flex h-24 w-24 rotate-12 items-center justify-center rounded-full border-[3px] border-coral font-display text-4xl italic text-coral">
          A−
        </div>
        <div className="mt-6 font-mono text-[9px] uppercase tracking-[0.22em] text-coral">{e.status}</div>
      </div>
    ),
  },
  {
    id: 'activity-mead-hall',
    pos: 'left-[33%] top-[2%]',
    rot: 4,
    w: 'w-[17rem]',
    render: (e) => (
      <div className="bg-white p-3 pb-6 text-ink shadow-[0_25px_50px_-12px_rgba(11,18,48,0.4)]" style={{ ['--plate-fg' as string]: '#efe3c4', ['--plate-accent' as string]: '#d4ad57', ['--plate-soft' as string]: '#1a1a24' }}>
        <div className="aspect-square bg-[#0a0d18] p-4">
          <Plate art="mead-hall" className="h-full w-full" />
        </div>
        <div className="mt-4 px-1 font-accent text-xl italic leading-tight">{e.title}</div>
        <Meta e={e} className="mt-2 px-1" />
      </div>
    ),
  },
  {
    id: 'activity-socratic',
    pos: 'left-[56%] top-[10%]',
    rot: -6,
    w: 'w-[15rem]',
    render: (e) => (
      <div className="aspect-square bg-[#ffd96b] p-6 text-ink shadow-[0_20px_40px_-12px_rgba(11,18,48,0.35)]">
        <Meta e={e} />
        <div className="mt-5 font-accent text-[1.7rem] italic leading-[1.1]">{e.title}</div>
        <div className="mt-4 text-xs leading-snug opacity-75">Inner/outer circle. Spoke 3×. Built on the Cain point.</div>
      </div>
    ),
  },
  {
    id: 'reflection-personal',
    pos: 'left-[75%] top-[4%]',
    rot: 3,
    w: 'w-[19rem]',
    render: (e) => (
      <div className="relative bg-blush p-7 text-[#2a1020] shadow-[0_25px_50px_-12px_rgba(11,18,48,0.35)]">
        <span className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-2 bg-white/60" aria-hidden />
        <Meta e={e} />
        <div className="mt-5 font-display text-3xl italic leading-tight">{e.title}</div>
        <p className="mt-4 font-accent text-lg italic leading-snug opacity-80">“Reading slowly is not reading less. It is reading more of what is there.”</p>
      </div>
    ),
  },
  {
    id: 'response-macbeth',
    pos: 'left-[14%] top-[54%]',
    rot: 2,
    w: 'w-[21rem]',
    render: (e) => (
      <div className="rule-lines relative bg-[#fbfaf5] p-7 pl-12 text-ink shadow-[0_25px_50px_-12px_rgba(11,18,48,0.35)]">
        <span className="absolute bottom-0 left-8 top-0 w-px bg-coral/60" aria-hidden />
        {[30, 50, 70].map((t) => (
          <span key={t} className="absolute left-2.5 h-3 w-3 rounded-full bg-cream shadow-inner" style={{ top: `${t}%` }} aria-hidden />
        ))}
        <Meta e={e} />
        <div className="mt-5 font-display text-2xl leading-tight">{e.title}</div>
        <p className="mt-3 text-sm leading-[2rem] text-ink/75">The witches never tell him to kill. They simply name a future…</p>
      </div>
    ),
  },
  {
    id: 'draft-comparative',
    pos: 'left-[50%] top-[50%]',
    rot: -2,
    w: 'w-[24rem]',
    render: (e) => (
      <div className="relative bg-paper p-8 text-ink shadow-[0_25px_50px_-12px_rgba(11,18,48,0.35)]">
        <Meta e={e} />
        <div className="mt-5 font-display text-2xl leading-tight">{e.title}</div>
        <p className="mt-4 text-sm leading-relaxed text-ink/75">
          While Beowulf measures courage by <span className="line-through decoration-coral decoration-2">what people see</span>{' '}
          <span className="font-accent text-base italic text-coral">the deeds an audience can witness</span>, Gawain relocates courage inside the conscience…
        </p>
        <div className="absolute -right-4 bottom-8 max-w-[9rem] rotate-6 font-accent text-sm italic leading-tight text-electric">← restructure point-by-point!</div>
        <div className="mt-5 inline-block border border-electric px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-electric">{e.status}</div>
      </div>
    ),
  },
];

function DeskPiece({ piece, z, onFront, bounds }: { piece: (typeof PIECES)[number]; z: number; onFront: () => void; bounds: React.RefObject<HTMLDivElement | null> }) {
  const { open } = useApp();
  const dragged = useRef(false);
  const e = get(piece.id);
  return (
    <motion.div
      drag
      dragConstraints={bounds}
      dragElastic={0.12}
      dragMomentum={false}
      onDragStart={() => {
        dragged.current = true;
        onFront();
      }}
      onPointerDown={() => {
        dragged.current = false;
        onFront();
      }}
      onClick={() => {
        if (!dragged.current) open(e.id);
      }}
      whileHover={{ scale: 1.03, rotate: 0 }}
      whileDrag={{ scale: 1.06, rotate: 0, cursor: 'grabbing' }}
      initial={{ opacity: 0, y: 80, rotate: piece.rot * 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: piece.rot }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      style={{ zIndex: z }}
      className={`absolute ${piece.pos} ${piece.w} cursor-grab touch-none select-none`}
      data-cursor="Drag · Open"
      role="button"
      tabIndex={0}
      aria-label={`Open ${e.title}`}
      onKeyDown={(ev) => ev.key === 'Enter' && open(e.id)}
    >
      {piece.render(e)}
    </motion.div>
  );
}

export function Reflections() {
  const { open } = useApp();
  const bounds = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState(PIECES.map((p) => p.id));
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const f = () => setWide(mq.matches);
    f();
    mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, []);

  return (
    <section id="reflections" className="relative overflow-hidden bg-bone text-ink grain">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{ backgroundImage: 'linear-gradient(rgba(11,18,48,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(11,18,48,0.07) 1px, transparent 1px)', backgroundSize: '48px 48px' }}
      />
      <div className="relative z-10 mx-auto max-w-[1600px] px-5 pb-12 pt-28 md:px-10 md:pt-40">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-2">
            <Reveal>
              <div className="font-display text-[8rem] font-extralight italic leading-[0.8] text-violet md:text-[11rem]">V</div>
            </Reveal>
          </div>
          <h2 className="font-display text-[clamp(3.2rem,9.5vw,10rem)] font-light leading-[0.85] tracking-[-0.04em] md:col-span-10">
            <SplitHeading lines={[<>Reflections</>, <span key="a" className="text-[0.55em]">&amp; <em className="font-accent text-violet">Assignments</em></span>]} />
          </h2>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-12">
          <Reveal className="md:col-span-5 md:col-start-3">
            <SectionLabel index="V" label="The Desk" />
            <p className="mt-6 text-lg leading-relaxed text-ink/75">Essays, drafts, activities and private thoughts, left on the desk as they were. Rearrange them, then pick one up to read.</p>
          </Reveal>
          <Reveal delay={0.1} className="self-end md:col-span-4 md:col-start-9">
            <div className="hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/60 lg:flex">
              <Move size={14} /> Drag to rearrange · click to open
            </div>
          </Reveal>
        </div>
      </div>

      {wide ? (
        <div ref={bounds} className="relative z-10 mx-auto h-[54rem] max-w-[1600px] px-10 pb-24">
          {PIECES.map((p) => (
            <DeskPiece
              key={p.id}
              piece={p}
              bounds={bounds}
              z={order.indexOf(p.id) + 1}
              onFront={() => setOrder((o) => [...o.filter((x) => x !== p.id), p.id])}
            />
          ))}
        </div>
      ) : (
        <div className="relative z-10 grid gap-10 px-5 pb-28 pt-6 sm:grid-cols-2">
          {PIECES.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.08}>
              <button onClick={() => open(p.id)} className="block w-full text-left" style={{ transform: `rotate(${p.rot * 0.6}deg)` }}>
                {p.render(get(p.id))}
              </button>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
