'use client';

import Image from 'next/image';

const basePath = process.env.NODE_ENV === 'production' ? '/aws' : '';

const DISCIPLINES = [
  { label: 'CLOUD', x: '50%', y: '4%', lineEnd: { x: '50%', y: '24%' } },
  { label: 'AI', x: '88%', y: '22%', lineEnd: { x: '75%', y: '34%' } },
  { label: 'ECE', x: '92%', y: '68%', lineEnd: { x: '76%', y: '65%' } },
  { label: 'VLSI', x: '50%', y: '95%', lineEnd: { x: '50%', y: '76%' } },
  { label: 'AEROSPACE', x: '8%', y: '68%', lineEnd: { x: '24%', y: '65%' } },
  { label: 'WEB', x: '12%', y: '22%', lineEnd: { x: '25%', y: '34%' } },
];

export default function HeroVisual() {
  return (
    <div
      className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] aspect-square mx-auto flex items-center justify-center select-none"
      aria-label="Multidisciplinary network converging into the AWS SBG MVJCE central microchip"
      role="img"
    >
      {/* Soft Ambient Radial Back-glow */}
      <div
        className="absolute inset-0 sm:inset-2 rounded-full blur-[75px] sm:blur-[95px] opacity-35 sm:opacity-45 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #ff9900 0%, #ff8000 40%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle Orbital Network Ring */}
      <div
        className="absolute inset-8 sm:inset-10 rounded-full border border-white/[0.04] pointer-events-none motion-safe:animate-[spin_60s_linear_infinite]"
        aria-hidden="true"
      >
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#ff9900]/40" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#ff9900]/40" />
      </div>

      <div
        className="absolute inset-16 sm:inset-20 rounded-full border border-[#ff9900]/[0.06] pointer-events-none"
        aria-hidden="true"
      />

      {/* SVG Connection Traces from Disciplines to Central Core */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="traceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff9900" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ff9900" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Base Structural Traces (Dim) */}
        <g stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1.5">
          <line x1="200" y1="36" x2="200" y2="108" />
          <line x1="332" y1="102" x2="268" y2="148" />
          <line x1="344" y1="268" x2="272" y2="248" />
          <line x1="200" y1="364" x2="200" y2="292" />
          <line x1="56" y1="268" x2="128" y2="248" />
          <line x1="68" y1="102" x2="132" y2="148" />
        </g>

        {/* Active Flowing Orange Power Current Paths */}
        <g
          stroke="url(#traceGrad)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          strokeLinecap="round"
          className="motion-safe:animate-[flowInward_1.6s_linear_infinite]"
        >
          {/* Top: Cloud */}
          <line x1="200" y1="36" x2="200" y2="108" />
          {/* Top-Right: AI */}
          <line x1="332" y1="102" x2="268" y2="148" />
          {/* Bottom-Right: ECE */}
          <line x1="344" y1="268" x2="272" y2="248" />
          {/* Bottom: VLSI */}
          <line x1="200" y1="364" x2="200" y2="292" />
          {/* Bottom-Left: Aerospace */}
          <line x1="56" y1="268" x2="128" y2="248" />
          {/* Top-Left: Web */}
          <line x1="68" y1="102" x2="132" y2="148" />
        </g>

        {/* Small target dots on core boundary */}
        <circle cx="200" cy="108" r="2.5" fill="#ff9900" className="animate-pulse" />
        <circle cx="268" cy="148" r="2.5" fill="#ff9900" className="animate-pulse" />
        <circle cx="272" cy="248" r="2.5" fill="#ff9900" className="animate-pulse" />
        <circle cx="200" cy="292" r="2.5" fill="#ff9900" className="animate-pulse" />
        <circle cx="128" cy="248" r="2.5" fill="#ff9900" className="animate-pulse" />
        <circle cx="132" cy="148" r="2.5" fill="#ff9900" className="animate-pulse" />
      </svg>

      {/* Central Glass Pedestal with Microchip Identity */}
      <div className="relative z-10 w-[54%] h-[54%] rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#181d2a]/95 via-[#10141f]/95 to-[#0a0d14]/98 border border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_40px_rgba(255,153,0,0.2)] flex items-center justify-center p-5 sm:p-7 backdrop-blur-xl group transition-transform duration-500 hover:scale-[1.02]">
        
        {/* Subtle internal shine */}
        <div
          className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-35 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 30%, rgba(255, 153, 0, 0.35), transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* Club Microchip Emblem */}
        <div className="relative w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
          <Image
            src={`${basePath}/images/sbg-microchip-logo.png`}
            alt="AWS Student Builders Group Central Microchip"
            width={240}
            height={240}
            priority
            className="w-auto h-auto max-w-[90%] max-h-[90%] object-contain drop-shadow-[0_10px_20px_rgba(255,153,0,0.28)]"
          />
        </div>

        {/* Microchip Corner Pins */}
        <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 border-t border-l border-[#ff9900]/40 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 border-t border-r border-[#ff9900]/40 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-2.5 left-2.5 w-1.5 h-1.5 border-b border-l border-[#ff9900]/40 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 border-b border-r border-[#ff9900]/40 rounded-br-sm pointer-events-none" />
      </div>

      {/* Surrounding Multidisciplinary Connection Badges */}
      {DISCIPLINES.map((item) => (
        <div
          key={item.label}
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ left: item.x, top: item.y }}
        >
          <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full bg-[#0a0d14]/90 border border-white/[0.08] backdrop-blur-md shadow-md shadow-black/40">
            <span className="w-1 h-1 rounded-full bg-[#ff9900] animate-pulse" />
            <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#d1d5db] font-semibold">
              {item.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
