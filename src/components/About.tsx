'use client';

import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const HIGHLIGHTS = [
  'Weekly hands-on engineering workshops and building sprints.',
  'Real-world cloud architectures, web apps, and silicon systems.',
  'Portfolio-grade deliverables ready for technical interviews.',
];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#090b0e] border-t border-white/[0.06] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono tracking-widest text-[#ff9900] uppercase font-semibold">
              ABOUT THE CLUB
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              A community for students who want to build real things.
            </h2>

            <p className="text-base sm:text-lg text-[#9ca3af] leading-relaxed">
              The AWS Student Builders Group at MVJ College of Engineering is a student-led collective in Bengaluru. 
              We move beyond textbook theory by learning cloud infrastructure, web development, AI platforms, and hardware 
              systems through hands-on collaboration.
            </p>

            <div className="space-y-3 pt-2">
              {HIGHLIGHTS.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#ff9900] shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-[#d1d5db]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Meaningful Editorial Visual */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-[#141822] to-[#0c0f15] border border-white/[0.08] p-6 sm:p-8 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-[#ff9900]/10 border border-[#ff9900]/25 flex items-center justify-center text-[#ff9900] text-xl font-bold mb-6">
                ⚡
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                MVJCE Engineering Chapter
              </h3>
              <p className="text-sm text-[#9ca3af] leading-relaxed mb-6">
                Established at MVJ College of Engineering, Kadugodi, Bengaluru. We unite curious minds across all branches to build, deploy, and share technology.
              </p>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-[#a1a1aa]">
                <span>LOCATION: BENGALURU</span>
                <span className="text-[#ff9900] font-semibold">WEEKLY SESSIONS</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
