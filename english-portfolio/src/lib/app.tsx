import Lenis from 'lenis';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { entryById, type Entry } from '../data';

interface AppState {
  active: Entry | null;
  open: (id: string) => void;
  close: () => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  scrollTo: (target: string | number) => void;
}

const Ctx = createContext<AppState | null>(null);

export const useApp = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useApp must be used inside AppProvider');
  return c;
};

const readHash = () => {
  const m = window.location.hash.match(/^#\/read\/([\w-]+)/);
  return m ? entryById.get(m[1]) ?? null : null;
};

export function AppProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [active, setActive] = useState<Entry | null>(() => readHash());
  const [searchOpen, setSearchOpen] = useState(false);

  // Smooth scrolling
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true });
    lenisRef.current = lenis;
    let id = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lock page scroll while an overlay is open
  const locked = !!active || searchOpen;
  useEffect(() => {
    const l = lenisRef.current;
    if (locked) {
      l?.stop();
      document.documentElement.style.overflow = 'hidden';
    } else {
      l?.start();
      document.documentElement.style.overflow = '';
    }
  }, [locked]);

  // Hash routing for reader pages
  useEffect(() => {
    const onHash = () => setActive(readHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const open = useCallback((id: string) => {
    const e = entryById.get(id);
    if (!e) return;
    setSearchOpen(false);
    if (window.location.hash !== `#/read/${id}`) window.location.hash = `/read/${id}`;
    setActive(e);
  }, []);

  const close = useCallback(() => {
    setActive(null);
    if (window.location.hash.startsWith('#/read/')) {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  }, []);

  const scrollTo = useCallback((target: string | number) => {
    const l = lenisRef.current;
    if (l) l.scrollTo(target as string, { duration: 1.6, offset: 0 });
    else if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' });
    else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      } else if (e.key === '/' && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const value = useMemo(() => ({ active, open, close, searchOpen, setSearchOpen, scrollTo }), [active, open, close, searchOpen, scrollTo]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
