import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight, Menu, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useApp } from '../lib/app';
import { EASE } from './Reveal';

export const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'literature', label: 'Literature' },
  { id: 'language', label: 'Language & Writing' },
  { id: 'notes', label: 'Class Notes' },
  { id: 'analysis', label: 'Analysis' },
  { id: 'reflections', label: 'Reflections' },
];

export function Nav() {
  const { scrollTo, setSearchOpen, active } = useApp();
  const [menu, setMenu] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 40);
    setHidden(v > prev && v > 600 && !menu);
  });

  useEffect(() => {
    document.documentElement.style.overflow = menu ? 'hidden' : '';
  }, [menu]);

  const go = (id: string) => {
    setMenu(false);
    setTimeout(() => scrollTo(`#${id}`), menu ? 350 : 0);
  };

  if (active) return null;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[85] mix-blend-difference"
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className={`mx-auto flex max-w-[1600px] items-center justify-between px-5 text-white transition-all duration-500 md:px-10 ${scrolled ? 'py-4' : 'py-6 md:py-8'}`}>
          <button onClick={() => go('home')} className="group flex items-baseline gap-2" data-cursor="Top" aria-label="Back to top">
            <span className="font-display text-2xl italic leading-none font-display-soft">English</span>
            <span className="font-mono text-[10px] tracking-[0.25em] opacity-70 transition-opacity group-hover:opacity-100">/12 · S1</span>
          </button>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV_ITEMS.slice(1).map((n, i) => (
              <button key={n.id} onClick={() => go(n.id)} className="group relative font-mono text-[11px] uppercase tracking-[0.2em]">
                <span className="mr-1.5 opacity-50">0{i + 1}</span>
                {n.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:origin-left group-hover:scale-x-100" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            <button onClick={() => setSearchOpen(true)} className="group flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em]" data-cursor="Search" aria-label="Search the portfolio">
              <Search size={16} strokeWidth={1.5} />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden border border-white/40 px-1.5 py-0.5 text-[9px] md:inline">⌘K</kbd>
            </button>
            <button onClick={() => setMenu(true)} className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] lg:hidden" aria-label="Open menu">
              <Menu size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="fixed inset-0 z-[95] flex flex-col overflow-hidden bg-ink text-cream grain-light"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="relative z-10 flex items-center justify-between px-5 py-6">
              <span className="font-display text-2xl italic">Contents</span>
              <button onClick={() => setMenu(false)} aria-label="Close menu" className="flex h-11 w-11 items-center justify-center border border-cream/30">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="relative z-10 flex flex-1 flex-col justify-center gap-1 px-5" aria-label="Mobile">
              {NAV_ITEMS.map((n, i) => (
                <motion.button
                  key={n.id}
                  onClick={() => go(n.id)}
                  className="group flex items-baseline gap-4 border-b border-cream/10 py-3 text-left"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.8, ease: EASE }}
                >
                  <span className="font-mono text-[11px] text-coral">0{i}</span>
                  <span className="font-display text-[clamp(2.2rem,9vw,4rem)] leading-none font-light tracking-tight">{n.label}</span>
                  <ArrowUpRight className="ml-auto self-center opacity-40" size={20} />
                </motion.button>
              ))}
            </nav>
            <motion.button
              onClick={() => {
                setMenu(false);
                setSearchOpen(true);
              }}
              className="relative z-10 m-5 flex items-center justify-between border border-cream/25 px-5 py-4 font-mono text-xs uppercase tracking-[0.2em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Search notes & topics <Search size={16} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
