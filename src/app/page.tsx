'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight, Lightbulb, BookOpen, Mic, Globe, Cpu, Cloud, Brain, Users, Calendar, FolderGit2 } from 'lucide-react';
import Hero from '@/components/Hero';
import { DiscordIcon } from '@/components/Icons';

// Lazy-load the intro animation so it does not block first paint
const IntroAnimation = dynamic(() => import('@/components/IntroAnimation'), {
  ssr: false,
});

const HIGHLIGHTS = [
  {
    icon: Lightbulb,
    title: 'Share Ideas',
    desc: 'Bring perspectives from different disciplines and explore ideas beyond your branch.',
  },
  {
    icon: BookOpen,
    title: 'Learn & Teach',
    desc: 'Exchange knowledge, help others and discover new interests together.',
  },
  {
    icon: Mic,
    title: 'Find Your Voice',
    desc: 'Weekly introductions, speaking sessions, and event organization build confidence.',
  },
];

const DOMAIN_PREVIEWS = [
  {
    icon: Globe,
    title: 'Web Development',
    tags: ['React', 'Next.js', 'Design Systems'],
  },
  {
    icon: Cpu,
    title: 'VLSI & Hardware',
    tags: ['Verilog', 'FPGA', 'Embedded IoT'],
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    tags: ['AWS Lambda', 'Docker', 'CI/CD'],
  },
  {
    icon: Brain,
    title: 'AI & Emerging Tech',
    tags: ['Amazon Bedrock', 'PyTorch', 'Vision'],
  },
];

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    // If intro was already seen in this session or reduced-motion is active, mark finished immediately
    if (typeof window !== 'undefined') {
      const alreadySeen = sessionStorage.getItem('aws-sbg-intro-seen');
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (alreadySeen || prefersReduced) {
        const timer = setTimeout(() => {
          setIntroFinished(true);
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleIntroComplete = useCallback(() => {
    setIntroFinished(true);
  }, []);

  return (
    <>
      {/* 3-Second Cinematic Intro */}
      {!introFinished && <IntroAnimation onComplete={handleIntroComplete} />}

      {/* Main Website Experience */}
      <div
        className={`transition-opacity duration-700 ${
          introFinished ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Approved Hero Section */}
        <Hero />

        {/* 1. About Preview Section */}
        <section className="py-20 sm:py-24 bg-[#090b0e] border-t border-white/[0.06] px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff9900]" />
                  <span className="text-xs font-mono tracking-widest text-[#ff9900] uppercase font-semibold">
                    About The Club
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  A community where ideas grow and people find their voice.
                </h2>

                <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed">
                  The AWS Student Builders Group at MVJ College of Engineering is a multidisciplinary student community built around sharing ideas, learning together and helping one another grow.
                </p>

                <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed">
                  We believe great ideas can come from anywhere — Cloud, Web Development, AI, ECE, VLSI, Aerospace and beyond. What matters is the curiosity to explore, the willingness to learn and the confidence to share what you know.
                </p>

                <div className="pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-white hover:text-[#ff9900] font-semibold text-sm transition-all min-h-[44px]"
                  >
                    <span>Read Full Story & Values</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                {HIGHLIGHTS.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#ff9900]/10 border border-[#ff9900]/25 flex items-center justify-center shrink-0 mt-0.5 text-[#ff9900]">
                        <Icon size={18} />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-white tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </section>

        {/* 2. Domains Preview Section */}
        <section className="py-20 sm:py-24 bg-[#07080a] border-t border-white/[0.06] px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#ff9900] uppercase font-semibold">
                  WHAT WE EXPLORE
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
                  Our Domains.
                </h2>
              </div>
              <Link
                href="/domains"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ff9900] hover:text-[#ffb74d] transition-colors min-h-[44px]"
              >
                <span>Explore all 4 tracks</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {DOMAIN_PREVIEWS.map((domain) => {
                const Icon = domain.icon;
                return (
                  <div
                    key={domain.title}
                    className="p-6 rounded-2xl bg-[#0e1219] border border-white/[0.08] hover:border-[#ff9900]/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-11 h-11 rounded-xl bg-[#ff9900]/10 border border-[#ff9900]/20 flex items-center justify-center text-[#ff9900] mb-5">
                        <Icon size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-3">
                        {domain.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {domain.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] border border-white/[0.06] text-[#a1a1aa]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. The Voice Lab Distinctive Feature Spotlight */}
        <section className="py-20 sm:py-24 bg-[#090b0e] border-t border-white/[0.06] px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-3xl bg-gradient-to-br from-[#121620] via-[#0d1016] to-[#080a0e] border border-white/[0.08] p-8 sm:p-12">
              <div className="max-w-3xl space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff9900]/10 border border-[#ff9900]/25 text-xs font-mono text-[#ff9900] uppercase font-semibold">
                  <Mic size={13} />
                  Distinctive Initiative
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  The Voice Lab.
                </h2>

                <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed">
                  Great code is only half the battle. Through our weekly Voice Lab sessions, we help students develop the verbal confidence, presentation ability, and composure needed to lead technical teams, deliver demos, and excel in interviews.
                </p>

                <div className="pt-2">
                  <Link
                    href="/voice-lab"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ff9900] hover:bg-[#e68900] text-black font-bold text-sm tracking-wide shadow-md shadow-[#ff9900]/20 min-h-[44px] transition-all"
                  >
                    <span>Discover The Voice Lab</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Projects & Events Dual Preview */}
        <section className="py-20 sm:py-24 bg-[#07080a] border-t border-white/[0.06] px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Projects Teaser Card */}
              <div className="rounded-2xl bg-[#0e1219] border border-white/[0.08] p-7 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#ff9900] mb-4">
                    <FolderGit2 size={20} />
                  </div>
                  <span className="text-xs font-mono tracking-widest text-[#ff9900] uppercase font-semibold block mb-1">
                    FEATURED BUILDS
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Projects & Initiatives
                  </h3>
                  <p className="text-sm text-[#9ca3af] leading-relaxed mb-6">
                    Real solutions built by students across Cloud cost optimization, portfolio engines, semantic campus search, and hardware cryptography.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/[0.06]">
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ff9900] hover:text-[#ffb74d] transition-colors min-h-[44px]"
                  >
                    <span>View all projects</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Events Teaser Card */}
              <div className="rounded-2xl bg-[#0e1219] border border-white/[0.08] p-7 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#ff9900] mb-4">
                    <Calendar size={20} />
                  </div>
                  <span className="text-xs font-mono tracking-widest text-[#ff9900] uppercase font-semibold block mb-1">
                    COMMUNITY SESSIONS
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Events & Sprints
                  </h3>
                  <p className="text-sm text-[#9ca3af] leading-relaxed mb-6">
                    Inaugural cloud architecture workshops, prototype showcase demos, and upcoming builder hackathons at MVJCE campus.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/[0.06]">
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ff9900] hover:text-[#ffb74d] transition-colors min-h-[44px]"
                  >
                    <span>View upcoming events</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 5. Team & Community Final Callout */}
        <section className="py-20 sm:py-24 bg-[#090b0e] border-t border-white/[0.06] px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-3xl bg-gradient-to-br from-[#121620] via-[#0d1016] to-[#080a0e] border border-white/[0.08] p-8 sm:p-12 text-center max-w-4xl mx-auto">
              <span className="text-xs font-mono tracking-widest text-[#ff9900] uppercase font-semibold block mb-3">
                JOIN THE COMMUNITY
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Ready to build with us?
              </h2>

              <p className="text-sm sm:text-base text-[#9ca3af] max-w-xl mx-auto leading-relaxed mb-8">
                Whether you are just getting started with code or already deploying cloud systems, there is a place for you in AWS SBG MVJCE.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://discord.gg/gVPMHvDaX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#ff9900] hover:bg-[#e68900] text-black font-bold text-sm tracking-wide shadow-lg shadow-[#ff9900]/20 min-h-[48px] active:scale-[0.98] transition-all"
                  aria-label="Join AWS SBG MVJCE on Discord"
                >
                  <DiscordIcon size={18} />
                  <span>Join on Discord</span>
                  <ArrowRight size={15} />
                </a>

                <Link
                  href="/team"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-white font-semibold text-sm min-h-[48px] active:scale-[0.98] transition-all"
                >
                  <Users size={16} />
                  <span>Meet The Team</span>
                </Link>

                <Link
                  href="/community"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-white font-semibold text-sm min-h-[48px] active:scale-[0.98] transition-all"
                >
                  <span>Community Ethos</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
