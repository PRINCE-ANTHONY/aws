'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface IntroProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroProps) {
  const [phase, setPhase] = useState<'enter' | 'reveal' | 'exit'>('enter');

  useEffect(() => {
    // 1. Check reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      onComplete();
      return;
    }

    // 2. Check session storage (play once per browser session)
    if (typeof window !== 'undefined' && sessionStorage.getItem('aws-sbg-intro-seen')) {
      onComplete();
      return;
    }

    // Short 2.5s sequence
    const t1 = setTimeout(() => setPhase('reveal'), 700);
    const t2 = setTimeout(() => {
      setPhase('exit');
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('aws-sbg-intro-seen', '1');
      }
      setTimeout(onComplete, 500);
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('aws-sbg-intro-seen', '1');
    }
    setPhase('exit');
    setTimeout(onComplete, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#07080a] text-white transition-opacity duration-500 ease-out select-none px-4 ${
        phase === 'exit' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to AWS SBG MVJCE"
    >
      {/* Soft Ambient Radial Center Glow */}
      <div
        className={`absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full pointer-events-none transition-all duration-1000 ${
          phase === 'reveal'
            ? 'opacity-30 scale-110 bg-[radial-gradient(circle,#ff9900_0%,transparent_70%)]'
            : 'opacity-10 scale-90 bg-[radial-gradient(circle,#ff9900_0%,transparent_70%)]'
        }`}
        aria-hidden="true"
      />

      {/* Microchip Center Assembly */}
      <div className="relative flex flex-col items-center text-center">
        <div
          className={`relative w-24 h-24 sm:w-28 sm:h-28 mb-6 transition-all duration-700 ease-out ${
            phase === 'enter'
              ? 'scale-75 opacity-0'
              : 'scale-100 opacity-100'
          }`}
        >
          <Image
            src="/images/sbg-microchip-logo.png"
            alt="AWS SBG MVJCE Emblem"
            width={112}
            height={112}
            priority
            className="w-full h-full object-contain drop-shadow-[0_8px_20px_rgba(255,153,0,0.35)]"
          />
        </div>

        {/* Crisp Typography */}
        <div
          className={`transition-all duration-700 delay-150 ${
            phase === 'reveal' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <p className="text-[11px] sm:text-xs font-mono tracking-[0.25em] text-[#ff9900] uppercase mb-1.5 font-semibold">
            MVJ COLLEGE OF ENGINEERING
          </p>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
            AWS Student Builders Group
          </h1>
          <p className="text-xs sm:text-sm text-[#9ca3af] font-mono tracking-widest uppercase">
            Think Big. Build Together.
          </p>
        </div>
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-6 right-6 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-[#a1a1aa] hover:text-white transition-colors cursor-pointer min-h-[44px] min-w-[70px] flex items-center justify-center"
        aria-label="Skip intro animation"
      >
        Skip →
      </button>
    </div>
  );
}
