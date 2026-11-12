import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

/** Custom cursor: a precise dot and a lagging ring that grows and labels interactive elements. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mq.matches) return;
    setEnabled(true);
    document.body.classList.add('has-cursor');
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: Event) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor], a, button, input');
      setHovering(!!t);
      setLabel(t?.dataset.cursor ?? null);
    };
    const d = () => setDown(true);
    const u = () => setDown(false);
    window.addEventListener('pointermove', move);
    document.addEventListener('pointerover', over);
    window.addEventListener('pointerdown', d);
    window.addEventListener('pointerup', u);
    return () => {
      document.body.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', d);
      window.removeEventListener('pointerup', u);
    };
  }, [x, y]);

  if (!enabled) return null;
  const size = label ? 92 : hovering ? 54 : 34;
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] flex items-center justify-center rounded-full"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: size,
          height: size,
          scale: down ? 0.85 : 1,
          backgroundColor: label ? 'rgba(255,107,74,0.95)' : 'rgba(255,255,255,0)',
          borderColor: label ? 'rgba(255,107,74,0)' : 'rgba(255,255,255,0.9)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      >
        <div className="absolute inset-0 rounded-full border mix-blend-difference" style={{ borderColor: 'inherit' }} />
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="relative font-mono text-[10px] uppercase tracking-[0.2em] text-paper"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[201] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: label ? 0 : 1 }}
      />
    </>
  );
}
