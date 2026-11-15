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

interface HeroVisualProps {
  isMobile?: boolean;
}

export default function HeroVisual({ isMobile = false }: HeroVisualProps) {
  return (
    <div
      className={`relative w-full aspect-square mx-auto flex items-center justify-center select-none ${
        isMobile
          ? 'max-w-[250px] sm:max-w-[290px]'
          : 'max-w-[340px] sm:max-w-[420px] lg:max-w-[460px]'
      }`}
      aria-label="Multidisciplinary network converging into the AWS SBG MVJCE central microchip"
      role="img"
    >
      {/* Soft Ambient Radial Back-glow */}
      <div
        className="absolute inset-0 sm:inset-2 rounded-full blur-[35px] sm:blur-[60px] lg:blur-[95px] opacity-35 sm:opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #ff9900 0%, #ff8000 40%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle Orbital Network Ring */}
      <div
        className="absolute inset-5 sm:inset-8 lg:inset-10 rounded-full border border-white/[0.06] sm:border-white/[0.05] pointer-events-none animate-[spin_60s_linear_infinite]"
        aria-hidden="true"
      >
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#ff9900]/70 shadow-[0_0_5px_#ff9900]" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#ff9900]/70 shadow-[0_0_5px_#ff9900]" />
      </div>

      <div
        className="absolute inset-11 sm:inset-16 lg:inset-20 rounded-full border border-[#ff9900]/[0.08] pointer-events-none"
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
          <filter id="traceGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="traceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff9900" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff9900" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Base Structural Traces */}
        <g stroke="#ffffff" strokeOpacity="0.06" strokeWidth="1">
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
          strokeWidth="1.3"
          strokeDasharray="5 7"
          strokeLinecap="round"
          className="animate-[flowInward_1.8s_linear_infinite]"
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

        {/* Target dots on core boundary with subtle glow */}
        <g fill="#ff9900" filter="url(#traceGlow)">
          <circle cx="200" cy="108" r="2.2" className="animate-pulse" />
          <circle cx="268" cy="148" r="2.2" className="animate-pulse" />
          <circle cx="272" cy="248" r="2.2" className="animate-pulse" />
          <circle cx="200" cy="292" r="2.2" className="animate-pulse" />
          <circle cx="128" cy="248" r="2.2" className="animate-pulse" />
          <circle cx="132" cy="148" r="2.2" className="animate-pulse" />
        </g>
      </svg>

      {/* Central Glass Pedestal with Microchip Identity */}
      <div className="relative z-10 w-[54%] h-[54%] rounded-xl sm:rounded-2xl lg:rounded-3xl bg-gradient-to-b from-[#181d2a]/95 via-[#10141f]/95 to-[#0a0d14]/98 border border-white/[0.12] shadow-[0_12px_32px_rgba(0,0,0,0.6),0_0_30px_rgba(255,153,0,0.15)] lg:shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_40px_rgba(255,153,0,0.2)] flex items-center justify-center p-3 sm:p-5 lg:p-7 backdrop-blur-xl group transition-transform duration-500 hover:scale-[1.02]">
        
        {/* Subtle internal shine */}
        <div
          className="absolute inset-0 rounded-xl sm:rounded-2xl lg:rounded-3xl opacity-35 pointer-events-none"
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
            className="w-auto h-auto max-w-[90%] max-h-[90%] object-contain drop-shadow-[0_8px_16px_rgba(255,153,0,0.25)]"
          />
        </div>

        {/* Microchip Corner Pins */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 w-1.5 h-1.5 border-t border-l border-[#ff9900]/40 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-1.5 h-1.5 border-t border-r border-[#ff9900]/40 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-2.5 w-1.5 h-1.5 border-b border-l border-[#ff9900]/40 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 w-1.5 h-1.5 border-b border-r border-[#ff9900]/40 rounded-br-sm pointer-events-none" />
      </div>

      {/* Surrounding Multidisciplinary Connection Badges */}
      {DISCIPLINES.map((item) => (
        <div
          key={item.label}
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ left: item.x, top: item.y }}
        >
          <div
            data-discipline-tag=""
            className="hero-discipline-badge flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#0a0d14]/90 border border-white/[0.14] backdrop-blur-md shadow-sm sm:shadow-md shadow-black/40"
          >
            <span className="w-1 h-1 rounded-full bg-[#ff9900] animate-pulse" />
            <span
              className="text-[8px] sm:text-[9px] lg:text-[10px] font-mono tracking-wider sm:tracking-widest text-white font-semibold select-none"
              style={{ color: '#ffffff' }}
            >
              {item.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
