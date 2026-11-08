'use client';

import { ArrowRight } from 'lucide-react';
import HeroVisual from '@/components/HeroVisual';
import { LinkedinIcon } from '@/components/Icons';

export default function Hero() {
  const handleScrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[#07080a] pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle Ambient Background Lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full pointer-events-none blur-[140px] opacity-15"
        style={{
          background: 'radial-gradient(circle, #ff9900 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Small AWS SBG MVJCE Identifier */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#ff9900]" />
              <span className="text-xs font-mono text-[#a1a1aa] tracking-widest uppercase">
                AWS Student Builders Group • MVJCE
              </span>
            </div>

            {/* Large Bold Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              THINK BIG.
              <br />
              <span className="text-[#ff9900]">BUILD TOGETHER.</span>
            </h1>

            {/* Concise Club Description */}
            <p className="text-base sm:text-lg text-[#9ca3af] max-w-xl leading-relaxed mb-8">
              A student-driven technology community at MVJ College of Engineering. 
              We build practical projects in Cloud, Web, AI, and Hardware through weekly hands-on collaborative sprints.
            </p>

            {/* Touch-Friendly Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <button
                onClick={handleScrollToProjects}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#ff9900] hover:bg-[#e68900] text-black font-bold text-sm tracking-wide shadow-lg shadow-[#ff9900]/20 active:scale-[0.98] transition-all min-h-[48px] cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight size={16} />
              </button>

              <a
                href="https://www.linkedin.com/company/aws-student-builder-group-mvjce"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-white font-semibold text-sm active:scale-[0.98] transition-all min-h-[48px]"
              >
                <LinkedinIcon size={16} />
                <span>Join Community</span>
              </a>
            </div>

          </div>

          {/* Right Column: High-Quality Technology Building Visual */}
          <div className="lg:col-span-5 w-full flex items-center justify-center mt-4 lg:mt-0">
            <HeroVisual />
          </div>

        </div>
      </div>
    </section>
  );
}
