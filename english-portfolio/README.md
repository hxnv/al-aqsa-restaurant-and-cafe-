# English — First Semester

An editorial, interactive Grade 12 English portfolio (design preview with placeholder content).

## Run locally

```bash
cd english-portfolio
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Stack

React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Lenis (smooth scroll) · Lucide icons.
Fonts are bundled locally via Fontsource (Fraunces, Instrument Serif, Inter Tight, Cinzel, JetBrains Mono).
All illustrations are hand-built SVG plates (`src/art/Plates.tsx`), so there are no external images to break.

## Structure

```
src/
  data/        content: literature, language, notes, analysis, reflections (+ search index)
  art/         SVG illustration plates
  components/  Nav, Search (⌘K), Reader overlay, Cursor, ScrollProgress, Intro, Reveal helpers
  sections/    Hero, Manifesto/Contents, Literature, Language, Notes, Analysis, Reflections, Colophon
  lib/app.tsx  app state, hash routing (#/read/<id>), Lenis smooth scrolling
```

## Replacing placeholder content

Every entry lives in `src/data/*.ts` as a typed `Entry` with sections made of blocks
(`p`, `quote`, `list`, `concepts`, `table`, `callout`, `plate`). Use `**bold**` to highlight
key concepts and `*italic*` for emphasis. New entries automatically appear in search and get a reader page.
