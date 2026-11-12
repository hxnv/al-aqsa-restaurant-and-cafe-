import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { EASE } from './Reveal';

/** Opening curtain: a counting folio number and the title set in type, then the page lifts. */
export function Intro({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 1500;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / dur);
      setCount(Math.round((1 - Math.pow(1 - k, 3)) * 100));
      if (k < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setShow(false), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const letters = 'English'.split('');

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col justify-between overflow-hidden bg-ink p-6 text-cream grain-light md:p-10"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className="relative z-10 flex justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60">
            <span>Grade 12 · Portfolio</span>
            <span>Vol. I</span>
          </div>
          <div className="relative z-10 flex items-end justify-center overflow-hidden">
            {letters.map((l, i) => (
              <motion.span
                key={i}
                className="font-display text-[22vw] leading-[0.85] font-light italic font-display-soft md:text-[15vw]"
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 0.1 + i * 0.06, duration: 1, ease: EASE }}
              >
                {l}
              </motion.span>
            ))}
          </div>
          <div className="relative z-10 flex items-end justify-between">
            <span className="max-w-[16rem] font-sans text-xs leading-relaxed text-cream/60">A collection of ideas, literature, language and discovery.</span>
            <span className="font-display text-6xl font-light tabular-nums md:text-8xl">
              {String(count).padStart(3, '0')}
            </span>
          </div>
          <motion.div
            className="absolute bottom-0 left-0 z-10 h-[3px] bg-coral"
            style={{ width: `${count}%` }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
