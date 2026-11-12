import type { Block } from '../data/types';
import { Plate } from '../art/Plates';
import { RichText } from './RichText';
import { Reveal } from './Reveal';

const mark = 'bg-[linear-gradient(transparent_58%,color-mix(in_oklab,var(--t-accent)_38%,transparent)_58%)]';

export function BlockView({ block, display }: { block: Block; display: 'medieval' | 'serif' }) {
  switch (block.type) {
    case 'p':
      return (
        <Reveal y={20}>
          <p className="max-w-[64ch] text-[1.07rem] leading-[1.8] opacity-90 text-pretty md:text-[1.15rem]">
            <RichText text={block.text} markClass={mark} />
          </p>
        </Reveal>
      );

    case 'quote':
      return (
        <Reveal y={30}>
          <figure className="relative my-4 border-y py-10 pl-10 md:pl-16" style={{ borderColor: 'var(--t-line)' }}>
            <span
              aria-hidden
              className="absolute -top-2 left-0 font-display text-[7rem] leading-none md:-left-2 md:text-[9rem]"
              style={{ color: 'var(--t-accent)' }}
            >
              “
            </span>
            <blockquote
              className={`text-[1.7rem] leading-[1.25] text-balance md:text-[2.3rem] ${display === 'medieval' ? 'font-accent italic' : 'font-display font-light italic font-display-soft'}`}
            >
              {block.text}
            </blockquote>
            {block.cite && (
              <figcaption className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] opacity-60">— {block.cite}</figcaption>
            )}
          </figure>
        </Reveal>
      );

    case 'list':
      return (
        <Reveal y={20}>
          <ol className="max-w-[64ch] space-y-0">
            {block.items.map((it, i) => (
              <li key={i} className="grid grid-cols-[3rem_1fr] items-baseline gap-2 border-b py-4 last:border-b-0" style={{ borderColor: 'var(--t-line)' }}>
                <span className="font-mono text-xs" style={{ color: 'var(--t-accent)' }}>
                  {block.ordered ? String(i + 1).padStart(2, '0') : '—'}
                </span>
                <span className="text-[1.05rem] leading-relaxed opacity-90">
                  <RichText text={it} markClass={mark} />
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      );

    case 'concepts':
      return (
        <dl className="grid gap-px overflow-hidden border sm:grid-cols-2" style={{ borderColor: 'var(--t-line)', background: 'var(--t-line)' }}>
          {block.items.map((c, i) => (
            <Reveal key={c.term} delay={i * 0.06} y={20} className="group relative p-6 transition-colors duration-500 md:p-7" >
              <div className="absolute inset-0 -z-0" style={{ background: 'var(--t-bg)' }} />
              <div className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" style={{ background: 'var(--t-soft)' }} />
              <div className="relative">
                <dt className={`mb-3 text-2xl leading-tight ${display === 'medieval' ? 'font-medieval tracking-wide' : 'font-display font-normal'}`} style={{ color: 'var(--t-accent)' }}>
                  {c.term}
                </dt>
                <dd className="text-[0.98rem] leading-relaxed opacity-85">{c.def}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      );

    case 'table':
      return (
        <Reveal y={20}>
          <div className="thin-scrollbar -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0" data-lenis-prevent>
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr>
                  {block.head.map((h, i) => (
                    <th key={i} className="border-b-2 pb-3 pr-6 font-mono text-[10px] font-normal uppercase tracking-[0.22em] opacity-70" style={{ borderColor: 'var(--t-fg)' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((r, i) => (
                  <tr key={i} className="group transition-colors">
                    {r.map((c, j) => (
                      <td
                        key={j}
                        className={`border-b py-4 pr-6 align-top leading-relaxed transition-colors duration-300 group-hover:bg-[var(--t-soft)] ${j === 0 ? 'font-display text-lg' : 'text-[0.97rem] opacity-90'}`}
                        style={{ borderColor: 'var(--t-line)' }}
                      >
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      );

    case 'callout':
      return (
        <Reveal y={20}>
          <aside className="relative grid gap-3 p-6 md:grid-cols-[10rem_1fr] md:p-8" style={{ background: 'var(--t-soft)' }}>
            <span className="absolute left-0 top-0 h-full w-1" style={{ background: 'var(--t-accent)' }} />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: 'var(--t-accent)' }}>
              {block.label}
            </span>
            <p className="text-[1.05rem] leading-relaxed">{block.text}</p>
          </aside>
        </Reveal>
      );

    case 'plate':
      return (
        <Reveal y={30}>
          <figure className="grid items-end gap-6 md:grid-cols-[1fr_14rem]">
            <div
              className="relative aspect-[4/3] overflow-hidden border"
              style={{ borderColor: 'var(--t-line)', background: 'var(--t-soft)', ['--plate-fg' as string]: 'var(--t-fg)', ['--plate-accent' as string]: 'var(--t-accent)', ['--plate-soft' as string]: 'var(--t-bg)' }}
            >
              <Plate art={block.art} className="absolute inset-0 m-auto h-[88%] w-[88%]" />
            </div>
            <figcaption className="font-accent text-lg italic leading-snug opacity-80">{block.caption}</figcaption>
          </figure>
        </Reveal>
      );
  }
}
