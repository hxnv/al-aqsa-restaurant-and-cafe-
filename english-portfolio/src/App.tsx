import { useState } from 'react';
import { Cursor } from './components/Cursor';
import { Intro } from './components/Intro';
import { Nav } from './components/Nav';
import { Reader } from './components/Reader';
import { ScrollProgress } from './components/ScrollProgress';
import { Search } from './components/Search';
import { AppProvider } from './lib/app';
import { Analysis } from './sections/Analysis';
import { Colophon } from './sections/Colophon';
import { Hero } from './sections/Hero';
import { Language } from './sections/Language';
import { Literature } from './sections/Literature';
import { Contents, Manifesto } from './sections/Manifesto';
import { Notes } from './sections/Notes';
import { Reflections } from './sections/Reflections';

export default function App() {
  const deepLink = typeof window !== 'undefined' && window.location.hash.startsWith('#/read/');
  const [ready, setReady] = useState(deepLink);

  return (
    <AppProvider>
      {!deepLink && <Intro onDone={() => setReady(true)} />}
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero ready={ready} />
        <Manifesto />
        <Contents />
        <Literature />
        <Language />
        <Notes />
        <Analysis />
        <Reflections />
      </main>
      <Colophon />
      <Reader />
      <Search />
    </AppProvider>
  );
}
