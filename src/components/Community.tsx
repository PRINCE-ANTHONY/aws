'use client';

import { ArrowRight, Users, Sparkles } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/Icons';

const SPOTLIGHTS = [
  {
    role: 'Cloud Track',
    quote: 'AWS SBG helped me understand real cloud deployments rather than just following mock tutorials.',
  },
  {
    role: 'Voice Lab',
    quote: 'Presenting our project architectures every week gave me the verbal confidence I needed for internship interviews.',
  },
  {
    role: 'Hardware & Web',
    quote: 'Collaborating across disciplines allowed us to connect FPGA circuits directly into live web dashboards.',
  },
];

export default function Community() {
  return (
    <section id="community" className="py-20 sm:py-28 bg-[#07080a] border-t border-white/[0.06] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs font-mono tracking-widest text-[#ff9900] uppercase font-semibold">
            COMMUNITY & ETHOS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2 mb-4">
            Built by people who show up.
          </h2>
          <p className="text-sm sm:text-base text-[#9ca3af]">
            AWS SBG MVJCE is an inclusive student community for anyone eager to learn, contribute, and grow.
          </p>
        </div>

        {/* Member Spotlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {SPOTLIGHTS.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-[#0e1219] border border-white/[0.08] flex flex-col justify-between"
            >
              <p className="text-sm text-[#d1d5db] leading-relaxed italic mb-6">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-[#ff9900]">
                {item.role} • MVJCE
              </div>
            </div>
          ))}
        </div>

        {/* Uncluttered Final Join Us CTA */}
        <div className="rounded-3xl bg-gradient-to-br from-[#121620] via-[#0d1016] to-[#080a0e] border border-white/[0.08] p-8 sm:p-14 text-center max-w-4xl mx-auto">
          <span className="text-xs font-mono tracking-widest text-[#ff9900] uppercase font-semibold block mb-3">
            GET INVOLVED
          </span>

          <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to build with us?
          </h3>

          <p className="text-sm sm:text-base text-[#9ca3af] max-w-xl mx-auto leading-relaxed mb-8">
            Whether you are just getting started with code or already deploying complex architectures, 
            there is a place for you in AWS SBG MVJCE. Join our LinkedIn group and attend our next session.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.linkedin.com/company/aws-student-builder-group-mvjce"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#ff9900] hover:bg-[#e68900] text-black font-bold text-sm tracking-wide shadow-lg shadow-[#ff9900]/20 min-h-[48px] active:scale-[0.98] transition-all"
            >
              <LinkedinIcon size={16} />
              <span>Join on LinkedIn</span>
              <ArrowRight size={15} />
            </a>

            <a
              href="https://github.com/PRINCE-ANTHONY/aws"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-white font-semibold text-sm min-h-[48px] active:scale-[0.98] transition-all"
            >
              <GithubIcon size={16} />
              <span>View GitHub</span>
            </a>
          </div>

          <p className="text-xs font-mono text-[#71717a] mt-6">
            MVJ College of Engineering, Kadugodi, Bengaluru
          </p>
        </div>

      </div>
    </section>
  );
}
