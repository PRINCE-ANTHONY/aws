'use client';

import { Lightbulb, BookOpen, Mic } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Lightbulb,
    title: 'Share Ideas',
    description:
      'Bring perspectives from different disciplines and explore ideas beyond your branch.',
  },
  {
    icon: BookOpen,
    title: 'Learn and Teach',
    description:
      'Exchange knowledge, help others and discover new interests.',
  },
  {
    icon: Mic,
    title: 'Find Your Voice',
    description:
      'Weekly introductions, random-topic speaking, team event organization and future debates help members develop communication confidence.',
  },
];

const DISCIPLINES = [
  'CLOUD',
  'WEB DEV',
  'AI',
  'ECE',
  'VLSI',
  'AEROSPACE',
  '& BEYOND',
];

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-28 py-20 sm:py-28 bg-[#090b0e] border-t border-white/[0.06] px-4 sm:px-6 lg:px-8"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Left Column: Editorial Narrative & Highlights */}
          <div className="lg:col-span-7 space-y-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff9900]" />
              <span className="text-xs font-mono tracking-widest text-[#ff9900] uppercase font-semibold">
                About The Club
              </span>
            </div>

            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]"
            >
              A community where ideas grow and people find their voice.
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#9ca3af] leading-relaxed">
              <p>
                The AWS Student Builders Group at MVJ College of Engineering is a multidisciplinary student community built around sharing ideas, learning together and helping one another grow.
              </p>
              <p>
                We believe great ideas can come from anywhere — Cloud, Web Development, AI, ECE, VLSI, Aerospace and beyond. What matters is the curiosity to explore, the willingness to learn and the confidence to share what you know.
              </p>
              <p>
                Through weekly meetups, collaborative activities and community events, we create opportunities for students to learn from each other, teach others and turn ideas into conversations.
              </p>
            </div>

            {/* Three Three Distinct Pillars / Highlights */}
            <div className="space-y-3.5 pt-2">
              {HIGHLIGHTS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] transition-colors hover:border-white/[0.1] hover:bg-white/[0.03]"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#ff9900]/10 border border-[#ff9900]/25 flex items-center justify-center shrink-0 mt-0.5 text-[#ff9900]">
                      <Icon size={16} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Polished Multidisciplinary Community Container */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#141822]/90 via-[#0e1218]/90 to-[#080b0f]/95 border border-white/[0.08] p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
              
              {/* Corner Pin Accents */}
              <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-[#ff9900]/40 rounded-tl-sm pointer-events-none" />
              <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-[#ff9900]/40 rounded-tr-sm pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-[#ff9900]/40 rounded-bl-sm pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-[#ff9900]/40 rounded-br-sm pointer-events-none" />

              {/* Container Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff9900] animate-pulse" />
                  <span className="text-xs font-mono tracking-widest text-[#d1d5db] uppercase font-semibold">
                    Multidisciplinary Hub
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#71717a] uppercase">MVJCE · Bengaluru</span>
              </div>

              {/* Club Ethos Quote */}
              <div className="my-6">
                <p className="text-lg sm:text-xl font-medium text-white tracking-tight leading-snug">
                  &ldquo;Ideas have no boundaries. Neither does learning.&rdquo;
                </p>
                <p className="text-xs font-mono text-[#ff9900] mt-2 font-medium tracking-wide">
                  — AWS SBG Community Ethos
                </p>
              </div>

              {/* Disciplines Chips */}
              <div className="pt-2 pb-6">
                <p className="text-[11px] font-mono tracking-wider text-[#9ca3af] uppercase mb-3 font-semibold">
                  Disciplines Connecting Here
                </p>
                <div className="flex flex-wrap gap-2">
                  {DISCIPLINES.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-[11px] font-mono tracking-wider text-[#d1d5db] bg-white/[0.04] border border-white/[0.08] rounded-md"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Community Traits */}
              <div className="pt-5 border-t border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#9ca3af]">Weekly Gatherings</span>
                  <span className="text-white font-medium">Idea Sharing & Speaking</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#9ca3af]">Community Access</span>
                  <span className="text-[#ff9900] font-semibold">Open to All Branches</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#9ca3af]">Core Approach</span>
                  <span className="text-[#d1d5db]">Learn, Teach & Build</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
