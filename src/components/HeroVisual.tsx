'use client';

import Image from 'next/image';

export default function HeroVisual() {
  return (
    <div className="relative w-full max-w-[420px] sm:max-w-[460px] aspect-square mx-auto flex items-center justify-center select-none">
      {/* Soft Ambient Radial Back-glow */}
      <div
        className="absolute inset-0 rounded-full blur-[80px] sm:blur-[100px] opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #ff9900 0%, #ff8000 40%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle Concentric Orbital Rings */}
      <div
        className="absolute inset-4 rounded-full border border-white/[0.04] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-12 rounded-full border border-[#ff9900]/[0.08] pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Glass Pedestal Container */}
      <div className="relative z-10 w-[82%] h-[82%] rounded-3xl bg-gradient-to-b from-[#141820]/90 via-[#0e1218]/90 to-[#090c10]/95 border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex items-center justify-center p-8 backdrop-blur-xl group transition-transform duration-500 hover:scale-[1.02]">
        
        {/* Subtle internal gradient shine */}
        <div
          className="absolute inset-0 rounded-3xl opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 30%, rgba(255, 153, 0, 0.25), transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* Club Microchip Official Emblem */}
        <div className="relative w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
          <Image
            src="/images/sbg-microchip-logo.png"
            alt="AWS Student Builders Group MVJCE Microchip Emblem"
            width={340}
            height={340}
            priority
            className="w-auto h-auto max-w-[85%] max-h-[85%] object-contain drop-shadow-[0_12px_24px_rgba(255,153,0,0.25)]"
          />
        </div>

        {/* Minimal Corner Accents */}
        <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-[#ff9900]/40 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-[#ff9900]/40 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-[#ff9900]/40 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-[#ff9900]/40 rounded-br-sm pointer-events-none" />
      </div>
    </div>
  );
}

