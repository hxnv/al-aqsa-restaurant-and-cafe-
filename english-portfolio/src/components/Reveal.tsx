import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'span' | 'p';
}) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

/** Line-by-line masked text reveal for large headings. */
export function SplitHeading({
  lines,
  className,
  lineClassName = '',
  delay = 0,
  stagger = 0.09,
  immediate = false,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}) {
  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } };
  const line: Variants = {
    hidden: { y: '110%', rotate: 2 },
    show: { y: '0%', rotate: 0, transition: { duration: 1.1, ease: EASE } },
  };
  return (
    <motion.span
      className={`block ${className ?? ''}`}
      variants={container}
      initial="hidden"
      {...(immediate ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } })}
    >
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span className={`block origin-bottom-left ${lineClassName}`} variants={line}>
            {l}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Word-by-word fade for paragraphs / statements. */
export function WordReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.025 } } }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{ hidden: { opacity: 0.12, y: 8, filter: 'blur(4px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } } }}
        >
          {w}&nbsp;
        </motion.span>
      ))}
    </motion.span>
  );
}

export { EASE };
