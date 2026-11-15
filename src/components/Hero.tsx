'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import HeroVisual from '@/components/HeroVisual';
import { DiscordIcon } from '@/components/Icons';
import { useTheme } from '@/ink/ThemeContext';

export default function Hero() {
  const { navigate } = useTheme();
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-b from-[#111622] via-[#0a0d14] to-[#07080a] pt-24 sm:pt-32 lg:pt-36 pb-12 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Primary Warm Ambient Orange Atmosphere (Subtle on mobile, expansive on desktop) */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[560px] lg:w-[980px] h-[280px] sm:h-[420px] lg:h-[520px] rounded-full pointer-events-none blur-[80px] sm:blur-[100px] lg:blur-[130px] opacity-25 sm:opacity-35 lg:opacity-55"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255, 153, 0, 0.42) 0%, rgba(255, 153, 0, 0.14) 45%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Secondary Radiant Energy Glow Behind Desktop Visual Core Only */}
      <div
        className="hidden lg:block absolute top-1/2 right-1/4 -translate-y-1/2 w-[520px] h-[520px] rounded-full pointer-events-none blur-[110px] opacity-45"
        style={{
          background: 'radial-gradient(circle, rgba(255, 153, 0, 0.42) 0%, rgba(255, 120, 0, 0.18) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle Matrix Dot Grid Texture for Depth (Minimalist on mobile) */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px] sm:[background-size:28px_28px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,black_35%,transparent_85%)] opacity-25 sm:opacity-40 lg:opacity-70"
        aria-hidden="true"
      />

      {/* Desktop Silicon Circuit Substrate & Flowing Power Pulses (Desktop & Large Screens Only) */}
      <svg
        className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none select-none z-0 opacity-60 sm:opacity-75"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <filter id="circuitGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Base Static Silicon Substrate Tracks */}
        <g stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1.5">
          {/* Top Left Track */}
          <path d="M -40,100 L 180,100 L 260,180 L 440,180" />
          <path d="M -40,140 L 160,140 L 220,200 L 380,200" />
          
          {/* Bottom Left Track */}
          <path d="M 60,660 L 200,520 L 400,520" />
          <path d="M -20,580 L 120,580 L 180,520" />

          {/* Top Center-Right Bus */}
          <path d="M 1240,120 L 1020,120 L 920,220 L 780,220" />
          <path d="M 1240,160 L 1040,160 L 960,240 L 820,240" />

          {/* Bottom Right Track */}
          <path d="M 1240,500 L 1060,500 L 980,420 L 800,420" />
          <path d="M 1240,540 L 1100,540 L 1020,460 L 860,460" />
        </g>

        {/* Circuit Via Junction Nodes */}
        <g fill="#ff9900" fillOpacity="0.4">
          <circle cx="180" cy="100" r="3.5" />
          <circle cx="260" cy="180" r="3.5" />
          <circle cx="200" cy="520" r="3.5" />
          <circle cx="1020" cy="120" r="3.5" />
          <circle cx="920" cy="220" r="3.5" />
          <circle cx="1060" cy="500" r="3.5" />
          <circle cx="980" cy="420" r="3.5" />
        </g>

        {/* Dynamic Gliding Orange Power Packets */}
        <g stroke="#ff9900" strokeWidth="2.5" strokeLinecap="round" filter="url(#circuitGlow)">
          <path
            d="M -40,100 L 180,100 L 260,180 L 440,180"
            strokeDasharray="60 180"
            className="animate-[bgCircuitPulse_5s_ease-in-out_infinite]"
          />
          <path
            d="M 1240,500 L 1060,500 L 980,420 L 800,420"
            strokeDasharray="70 190"
            className="animate-[bgCircuitPulse_6s_ease-in-out_infinite_2s]"
          />
          <path
            d="M 60,660 L 200,520 L 400,520"
            strokeDasharray="50 170"
            className="animate-[bgCircuitPulse_5.5s_ease-in-out_infinite_1s]"
          />
          <path
            d="M 1240,120 L 1020,120 L 920,220 L 780,220"
            strokeDasharray="65 185"
            className="animate-[bgCircuitPulse_6.5s_ease-in-out_infinite_3s]"
          />
        </g>
      </svg>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Content Column (Mobile Flow & Desktop Left Column) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* 1. AWS SBG MVJCE Identifier */}
            <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-3 sm:mb-5">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#ff9900]" />
              <span className="text-[10px] sm:text-xs font-mono text-[#a1a1aa] tracking-wider sm:tracking-widest uppercase">
                AWS Student Builders Group • MVJCE
              </span>
            </div>

            {/* 2. Main Headline: DIFFERENT MINDS. ONE COMMUNITY. */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-2 sm:mb-4">
              DIFFERENT MINDS.
              <br />
              <span className="text-[#ff9900]">ONE COMMUNITY.</span>
            </h1>

            {/* 3. Supporting Statement */}
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl font-medium text-white/90 mb-3 sm:mb-4 tracking-wide">
              Ideas have no boundaries. Neither does learning.
            </p>

            {/* 4. Microchip Visual (Mobile Breakpoint Only: positioned right under supporting statement) */}
            <div className="w-full flex items-center justify-center my-4 sm:my-6 lg:hidden">
              <HeroVisual isMobile />
            </div>

            {/* 5. Short Community Description */}
            <p className="text-xs sm:text-sm lg:text-base text-[#9ca3af] max-w-xl leading-relaxed mb-3 sm:mb-4 px-1 sm:px-0">
              A community to share ideas, explore different disciplines, learn from one another and find the confidence to express what you believe in.
            </p>

            {/* Multidisciplinary Tagline */}
            <div className="mb-5 sm:mb-8">
              <p className="text-[10px] sm:text-xs lg:text-[13px] font-mono tracking-[0.12em] sm:tracking-[0.22em] text-[#ff9900] uppercase font-semibold leading-relaxed">
                CLOUD · WEB · AI · ECE · VLSI · AEROSPACE · AND BEYOND
              </p>
            </div>

            {/* 6. Primary and Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              {/* Primary CTA: Explore Our Community */}
              <Link
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/about', { x: e.clientX, y: e.clientY });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#ff9900] hover:bg-[#e68900] text-black font-bold text-sm tracking-wide shadow-md shadow-[#ff9900]/20 active:scale-[0.98] transition-all min-h-[48px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Explore Our Community</span>
                <ArrowRight size={16} />
              </Link>

              {/* Secondary CTA: Join Discord */}
              <a
                href="https://discord.gg/gVPMHvDaX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-white font-semibold text-sm active:scale-[0.98] transition-all min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9900]"
                aria-label="Join AWS SBG MVJCE Discord Community"
              >
                <DiscordIcon size={18} />
                <span>Join Discord</span>
              </a>
            </div>

          </div>

          {/* Right Column: Multidisciplinary Network & Central Microchip Visual (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-5 w-full items-center justify-center">
            <HeroVisual />
          </div>

        </div>
      </div>
    </section>
  );
}
