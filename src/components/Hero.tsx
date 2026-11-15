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
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-b from-[#111622] via-[#0a0d14] to-[#07080a] pt-28 sm:pt-36 lg:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Primary Warm Ambient Orange Atmosphere */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] sm:w-[980px] h-[440px] sm:h-[520px] rounded-full pointer-events-none blur-[90px] sm:blur-[130px] opacity-50 sm:opacity-55"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255, 153, 0, 0.36) 0%, rgba(255, 153, 0, 0.12) 45%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Secondary Radiant Energy Glow Behind the Visual Core */}
      <div
        className="absolute top-[75%] lg:top-1/2 left-1/2 lg:left-auto lg:right-1/4 -translate-x-1/2 lg:translate-x-0 -translate-y-1/2 w-[380px] sm:w-[520px] h-[380px] sm:h-[520px] rounded-full pointer-events-none blur-[80px] sm:blur-[110px] opacity-45 sm:opacity-45"
        style={{
          background: 'radial-gradient(circle, rgba(255, 153, 0, 0.36) 0%, rgba(255, 120, 0, 0.14) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle Matrix Dot Grid Texture for Depth */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px] sm:[background-size:28px_28px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_45%,black_40%,transparent_85%)] opacity-55 sm:opacity-70"
        aria-hidden="true"
      />

      {/* Mobile Silicon Circuit Substrate (< md) - Clean, Minimalist Side Rail Architecture */}
      <svg
        className="md:hidden absolute inset-0 w-full h-full pointer-events-none select-none z-0 opacity-60"
        viewBox="0 0 390 950"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <filter id="circuitGlowMobile" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Minimalist Structural Bus Rails (Left & Right Margins - Framed Cleanly Outside Text) */}
        <g stroke="#ffffff" strokeOpacity="0.10" strokeWidth="1.2">
          {/* Left Vertical Architectural Rail */}
          <path d="M 18,70 L 18,190 L 32,218 L 32,380 L 18,408 L 18,640 L 55,695 L 95,695" />
          <path d="M 18,640 L 18,860 L 45,895 L 120,895" />

          {/* Right Vertical Architectural Rail */}
          <path d="M 372,80 L 372,180 L 358,208 L 358,360 L 372,388 L 372,630 L 335,685 L 295,685" />
          <path d="M 372,630 L 372,850 L 345,885 L 270,885" />
        </g>

        {/* Minimalist Circuit Via Nodes */}
        <g fill="#ff9900" fillOpacity="0.5">
          <circle cx="18" cy="190" r="2.2" />
          <circle cx="32" cy="218" r="2.2" />
          <circle cx="32" cy="380" r="2.2" />
          <circle cx="18" cy="408" r="2.2" />
          <circle cx="55" cy="695" r="2.2" />
          <circle cx="95" cy="695" r="2.2" />
          <circle cx="45" cy="895" r="2.2" />
          
          <circle cx="372" cy="180" r="2.2" />
          <circle cx="358" cy="208" r="2.2" />
          <circle cx="358" cy="360" r="2.2" />
          <circle cx="372" cy="388" r="2.2" />
          <circle cx="335" cy="685" r="2.2" />
          <circle cx="295" cy="685" r="2.2" />
          <circle cx="345" cy="885" r="2.2" />
        </g>

        {/* Minimalist Gliding Orange Power Pulses along Left & Right Margin Rails */}
        <g stroke="#ff9900" strokeWidth="1.6" strokeLinecap="round" filter="url(#circuitGlowMobile)">
          <path
            d="M 18,70 L 18,190 L 32,218 L 32,380 L 18,408 L 18,640 L 55,695 L 95,695"
            strokeDasharray="40 180"
            className="animate-[bgCircuitPulse_7s_ease-in-out_infinite]"
          />
          <path
            d="M 372,80 L 372,180 L 358,208 L 358,360 L 372,388 L 372,630 L 335,685 L 295,685"
            strokeDasharray="40 180"
            className="animate-[bgCircuitPulse_8s_ease-in-out_infinite_3.5s]"
          />
        </g>
      </svg>

      {/* Desktop Silicon Circuit Substrate & Flowing Power Pulses (>= md) */}
      <svg
        className="hidden md:block absolute inset-0 w-full h-full pointer-events-none select-none z-0 opacity-60 sm:opacity-75"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Multidisciplinary Community Narrative & Actions */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Small AWS SBG MVJCE Identifier */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-5">
              <span className="w-2 h-2 rounded-full bg-[#ff9900]" />
              <span className="text-xs font-mono text-[#a1a1aa] tracking-widest uppercase">
                AWS Student Builders Group • MVJCE
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-4">
              DIFFERENT MINDS.
              <br />
              <span className="text-[#ff9900]">ONE COMMUNITY.</span>
            </h1>

            {/* Supporting Statement */}
            <p className="text-base sm:text-lg xl:text-xl font-medium text-white/90 mb-3 tracking-wide">
              Ideas have no boundaries. Neither does learning.
            </p>

            {/* Community Description */}
            <p className="text-sm sm:text-base text-[#9ca3af] max-w-xl leading-relaxed mb-5">
              A community to share ideas, explore different disciplines, learn from one another and find the confidence to express what you believe in.
            </p>

            {/* Multidisciplinary Line */}
            <div className="mb-8">
              <p className="text-xs sm:text-[13px] font-mono tracking-[0.16em] sm:tracking-[0.22em] text-[#ff9900] uppercase font-semibold leading-relaxed">
                CLOUD · WEB · AI · ECE · VLSI · AEROSPACE · AND BEYOND
              </p>
            </div>

            {/* Touch-Friendly Action Buttons (>= 44px touch target) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              {/* Button 1: Explore Our Community -> links to /about */}
              <Link
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/about', { x: e.clientX, y: e.clientY });
                }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#ff9900] hover:bg-[#e68900] text-black font-bold text-sm tracking-wide shadow-lg shadow-[#ff9900]/20 active:scale-[0.98] transition-all min-h-[48px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Explore Our Community</span>
                <ArrowRight size={16} />
              </Link>

              {/* Button 2: Join Discord -> links to https://discord.gg/gVPMHvDaX */}
              <a
                href="https://discord.gg/gVPMHvDaX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-white font-semibold text-sm active:scale-[0.98] transition-all min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9900]"
                aria-label="Join AWS SBG MVJCE Discord Community"
              >
                <DiscordIcon size={18} />
                <span>Join Discord</span>
              </a>
            </div>

          </div>

          {/* Right Column: Multidisciplinary Network & Central Microchip Visual */}
          <div className="lg:col-span-5 w-full flex items-center justify-center mt-4 lg:mt-0">
            <HeroVisual />
          </div>

        </div>
      </div>
    </section>
  );
}
