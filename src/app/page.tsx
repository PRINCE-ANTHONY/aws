'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Pillars from '@/components/Pillars';
import Domains from '@/components/Domains';
import VoiceLab from '@/components/VoiceLab';
import Teams from '@/components/Teams';
import Projects from '@/components/Projects';
import Events from '@/components/Events';
import Community from '@/components/Community';
import Footer from '@/components/Footer';

// Lazy-load the intro animation so it does not block first paint
const IntroAnimation = dynamic(() => import('@/components/IntroAnimation'), {
  ssr: false,
});

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    // If intro was already seen in this session or reduced-motion is active, mark finished immediately
    if (typeof window !== 'undefined') {
      const alreadySeen = sessionStorage.getItem('aws-sbg-intro-seen');
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (alreadySeen || prefersReduced) {
        setIntroFinished(true);
      }
    }
  }, []);

  const handleIntroComplete = useCallback(() => {
    setIntroFinished(true);
  }, []);

  return (
    <>
      {/* 3-Second Cinematic Intro */}
      {!introFinished && <IntroAnimation onComplete={handleIntroComplete} />}

      {/* Main Website Experience */}
      <div
        className={`min-h-screen bg-[#08090b] text-white selection:bg-[#ff9900] selection:text-black transition-opacity duration-700 ${
          introFinished ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Pillars />
          <Domains />
          <VoiceLab />
          <Teams />
          <Projects />
          <Events />
          <Community />
        </main>
        <Footer />
      </div>
    </>
  );
}
