import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useApp } from '../lib/app';
import { NAV_ITEMS } from './Nav';

export function useActiveSection() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const els = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const active = useActiveSection();
  const { scrollTo } = useApp();
  const [pct, setPct] = useState(0);
  useEffect(() => scrollYProgress.on('change', (v) => setPct(Math.round(v * 100))), [scrollYProgress]);

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-[90] h-[3px] origin-left bg-gradient-to-r from-electric via-violet to-coral" style={{ scaleX }} />
      <div className="pointer-events-none fixed right-5 top-1/2 z-[80] hidden -translate-y-1/2 flex-col items-end gap-3 mix-blend-difference lg:flex">
        {NAV_ITEMS.map((n, i) => {
          const on = active === n.id;
          return (
            <button
              key={n.id}
              onClick={() => scrollTo(`#${n.id}`)}
              className="group pointer-events-auto flex items-center gap-3 text-white"
              aria-label={`Go to ${n.label}`}
            >
              <span className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-500 ${on ? 'opacity-100' : 'translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-70'}`}>
                {n.label}
              </span>
              <span className={`block h-px bg-white transition-all duration-500 ${on ? 'w-10' : 'w-4 opacity-50 group-hover:w-6'}`} />
              <span className="w-4 text-right font-mono text-[10px] opacity-70">{String(i).padStart(2, '0')}</span>
            </button>
          );
        })}
        <span className="mt-4 font-mono text-[10px] tracking-[0.2em] text-white/70">{String(pct).padStart(3, '0')}%</span>
      </div>
    </>
  );
}
