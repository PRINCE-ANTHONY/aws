'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const basePath = process.env.NODE_ENV === 'production' ? '/aws' : '';

interface IntroProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleFinish = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('aws-sbg-intro-seen', '1');
      }
    } catch {
      // Ignore sessionStorage errors
    }
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 450);
  }, [onComplete]);

  useEffect(() => {
    // 1. Reduced motion check
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      onComplete();
      return;
    }

    // 2. Play 2.0s presentation, then exit smoothly
    const exitTimer = setTimeout(() => {
      handleFinish();
    }, 2200);

    // 3. Fallback absolute safety timer (guaranteed exit after 2.8s max)
    const safetyTimer = setTimeout(() => {
      onComplete();
    }, 2800);

    // 4. Keyboard escape to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(safetyTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleFinish, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07080a] text-white transition-opacity duration-500 ease-out select-none px-4 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to AWS SBG MVJCE"
      data-html2canvas-ignore=""
      onClick={handleFinish}
    >
      {/* Soft Ambient Radial Center Glow */}
      <div
        className="absolute w-80 sm:w-[420px] h-80 sm:h-[420px] rounded-full pointer-events-none bg-[radial-gradient(circle,#ff9900_0%,transparent_70%)] opacity-35 sm:opacity-45 animate-pulse"
        style={{ animationDuration: '3s' }}
        aria-hidden="true"
      />

      {/* Microchip Center Assembly */}
      <div className="relative flex flex-col items-center text-center z-10">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-6 transition-transform duration-700 ease-out hover:scale-105">
          <Image
            src={`${basePath}/images/sbg-microchip-logo.png`}
            alt="AWS SBG MVJCE Emblem"
            width={112}
            height={112}
            priority
            className="w-full h-full object-contain drop-shadow-[0_8px_24px_rgba(255,153,0,0.4)]"
          />
        </div>

        {/* Crisp High-Contrast Typography */}
        <div className="space-y-1.5">
          <p className="text-[11px] sm:text-xs font-mono tracking-[0.28em] text-[#ff9900] uppercase font-semibold">
            MVJ COLLEGE OF ENGINEERING
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            AWS Student Builders Group
          </h1>
          <p className="text-xs sm:text-sm text-[#a1a1aa] font-mono tracking-[0.2em] uppercase">
            Think Big. Build Together.
          </p>
        </div>
      </div>

      {/* Skip Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleFinish();
        }}
        className="absolute bottom-6 right-6 px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono text-[#a1a1aa] hover:text-white transition-colors cursor-pointer min-h-[44px] min-w-[76px] flex items-center justify-center z-20"
        aria-label="Skip intro animation"
      >
        Skip →
      </button>
    </div>
  );
}
