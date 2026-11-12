import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Plate } from '../art/Plates';
import { EASE } from '../components/Reveal';
import { useApp } from '../lib/app';

function CircleText({ text, className }: { text: string; className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <defs>
        <path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
      </defs>
      <text fontFamily="var(--font-mono)" fontSize="12.5" letterSpacing="5.2" fill="currentColor">
        <textPath href="#circ">{text}</textPath>
      </text>
    </svg>
  );
}

export function Hero({ ready }: { ready: boolean }) {
  const { scrollTo } = useApp();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '45%']);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const sunY = useTransform(scrollYProgress, [0, 1], ['0%', '70%']);
  const bookY = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // pointer parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const px = (k: number) => useTransform(sx, (v) => v * k);
  const py = (k: number) => useTransform(sy, (v) => v * k);
  const p1x = px(30), p1y = py(30), p2x = px(-45), p2y = py(-45), p3x = px(18), p3y = py(18), p4x = px(-20), p4y = py(-14);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [mx, my]);

  const show = ready ? 'show' : 'hidden';
  const up = (d: number) => ({
    hidden: { y: '110%' },
    show: { y: '0%', transition: { duration: 1.3, ease: EASE, delay: d } },
  });
  const fadeIn = (d: number) => ({
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE, delay: d } },
  });

  return (
    <section ref={ref} id="home" className="relative min-h-[100svh] overflow-hidden bg-paper text-ink grain">
      {/* Background composition */}
      <motion.div style={{ y: sunY }} className="absolute inset-0">
        <motion.div
          style={{ x: p1x, y: p1y }}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={ready ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
          className="absolute right-[-18vw] top-[8vh] h-[70vw] w-[70vw] rounded-full bg-coral md:right-[6vw] md:top-[10vh] md:h-[38vw] md:w-[38vw]"
        />
        <motion.div
          style={{ x: p2x, y: p2y }}
          initial={{ scaleY: 0 }}
          animate={ready ? { scaleY: 1 } : {}}
          transition={{ duration: 1.6, ease: EASE, delay: 0.35 }}
          className="absolute left-[18vw] top-0 hidden h-[27vh] w-[5vw] origin-top bg-ink md:block"
        />
        <motion.div
          style={{ x: p3x, y: p3y }}
          initial={{ scaleX: 0 }}
          animate={ready ? { scaleX: 1 } : {}}
          transition={{ duration: 1.6, ease: EASE, delay: 0.5 }}
          className="absolute left-0 top-[38%] h-[1px] w-full origin-left bg-ink/20"
        />
        <motion.div
          style={{ x: p4x, y: p4y }}
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.8 }}
          className="absolute left-[30vw] top-[14vh] hidden h-36 w-36 bg-electric md:block"
          aria-hidden
        >
          <div className="absolute inset-3 border border-paper/40" />
          <span className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-[0.25em] text-paper">Vol. I</span>
        </motion.div>
      </motion.div>

      {/* Floating book plate */}
      <motion.div
        style={{ y: bookY, x: p2x, ['--plate-fg' as string]: '#0b1230', ['--plate-accent' as string]: '#7b5cff', ['--plate-soft' as string]: '#faf6ee' }}
        initial={{ opacity: 0, rotate: -18, scale: 0.8 }}
        animate={ready ? { opacity: 1, rotate: -8, scale: 1 } : {}}
        transition={{ duration: 1.8, ease: EASE, delay: 0.6 }}
        className="absolute right-[4vw] top-[26vh] w-[46vw] md:right-[14vw] md:top-[18vh] md:w-[26vw]"
      >
        <motion.div animate={{ y: [0, -14, 0], rotate: [0, 1.5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
          <Plate art="book" className="w-full drop-shadow-[0_30px_40px_rgba(11,18,48,0.25)]" />
        </motion.div>
      </motion.div>

      {/* Floating quote fragment */}
      <motion.figure
        style={{ x: p3x, y: p3y }}
        variants={fadeIn(1.4)}
        initial="hidden"
        animate={show}
        className="absolute left-[43vw] top-[21vh] z-10 hidden max-w-[16rem] bg-ink p-5 text-cream shadow-2xl lg:block"
      >
        <span className="font-medieval text-3xl text-goldlight">Hwæt!</span>
        <figcaption className="mt-2 font-accent text-lg italic leading-snug text-cream/80">“Listen!” The first word of the oldest poem in English.</figcaption>
        <span className="absolute -left-2 -top-2 h-4 w-4 bg-coral" />
      </motion.figure>

      {/* Meta row */}
      <div className="relative z-10 mx-auto flex max-w-[1600px] items-start justify-between px-5 pt-24 font-mono text-[10px] uppercase tracking-[0.28em] md:px-10 md:pt-32">
        <motion.div variants={fadeIn(0.9)} initial="hidden" animate={show} className="space-y-1">
          <div>Grade 12 · English</div>
          <div className="text-ink/50">Portfolio Edition</div>
        </motion.div>
        <motion.div variants={fadeIn(1)} initial="hidden" animate={show} className="hidden space-y-1 text-right md:block">
          <div>Fall Term 2026</div>
          <div className="text-ink/50">Sept — Jan</div>
        </motion.div>
      </div>

      {/* Title */}
      <motion.div style={{ y: titleY, scale: titleScale, opacity: fade }} className="relative z-10 mx-auto flex min-h-[calc(100svh-9rem)] max-w-[1600px] origin-bottom-left flex-col justify-end px-5 pb-28 md:px-10 md:pb-20">
        <h1 className="relative select-none">
          <span className="sr-only">English — First Semester</span>
          <span aria-hidden className="block overflow-hidden">
            <motion.span
              variants={up(0.15)}
              initial="hidden"
              animate={show}
              className="block font-display text-[27vw] font-light italic leading-[0.8] tracking-[-0.045em] font-display-soft md:text-[19vw]"
            >
              English
            </motion.span>
          </span>
          <span aria-hidden className="mt-2 flex items-center gap-4 overflow-hidden md:ml-[22vw] md:mt-0 md:gap-8">
            <motion.span
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.2, ease: EASE, delay: 0.7 } } }}
              initial="hidden"
              animate={show}
              className="block h-[2px] w-14 origin-left bg-coral md:h-[3px] md:w-40"
            />
            <motion.span
              variants={up(0.5)}
              initial="hidden"
              animate={show}
              className="block font-display text-[11vw] font-normal leading-[0.95] tracking-[-0.03em] md:text-[7.4vw]"
            >
              First Semester
            </motion.span>
          </span>
        </h1>

        <div className="mt-10 grid items-end gap-8 md:mt-14 md:grid-cols-12">
          <motion.p variants={fadeIn(1.1)} initial="hidden" animate={show} className="font-accent text-2xl italic leading-snug text-ink/80 md:col-span-5 md:text-3xl">
            A collection of ideas, literature, language and discovery.
          </motion.p>
          <motion.div variants={fadeIn(1.25)} initial="hidden" animate={show} className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/60 md:col-span-4 md:col-start-7">
            <span>I · Literature</span>
            <span>II · Language</span>
            <span>III · Notes</span>
            <span>IV · Analysis</span>
            <span>V · Reflections</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo('#manifesto')}
        variants={fadeIn(1.6)}
        initial="hidden"
        animate={show}
        data-cursor="Scroll"
        className="absolute bottom-6 right-5 z-20 h-24 w-24 text-ink md:bottom-10 md:right-10 md:h-32 md:w-32"
        aria-label="Scroll to explore"
      >
        <CircleText text="SCROLL TO EXPLORE · SCROLL TO EXPLORE · " className="animate-spin-slow absolute inset-0 h-full w-full" />
        <span className="absolute inset-0 m-auto flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-ink text-paper md:h-12 md:w-12">
          <motion.span animate={{ y: ['-120%', '0%', '120%'] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', times: [0, 0.5, 1] }}>
            ↓
          </motion.span>
        </span>
      </motion.button>
    </section>
  );
}
