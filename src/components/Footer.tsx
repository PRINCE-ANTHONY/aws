'use client';

import { MapPin } from 'lucide-react';
import { DiscordIcon, LinkedinIcon, GithubIcon } from '@/components/Icons';

const FOOTER_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Pillars', href: '#pillars' },
  { label: 'Domains', href: '#domains' },
  { label: 'Voice Lab', href: '#voicelab' },
  { label: 'Teams', href: '#teams' },
  { label: 'Projects', href: '#projects' },
  { label: 'Events', href: '#events' },
  { label: 'Community', href: '#community' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050608] border-t border-white/[0.06] pt-16 pb-12 text-[#9ca3af] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#ff9900] flex items-center justify-center text-black font-extrabold text-sm">
                ⚡
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                AWS Student Builders Group • MVJCE
              </span>
            </div>

            <p className="text-sm text-[#71717a] max-w-sm leading-relaxed">
              A student-driven engineering community at MVJ College of Engineering, Bengaluru. 
              Learning cloud, web, AI, and hardware by building real projects.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://discord.gg/gVPMHvDaX"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#ff9900] text-[#a1a1aa] hover:text-[#ff9900] transition-colors flex items-center justify-center min-h-[44px] min-w-[44px]"
                aria-label="Discord"
              >
                <DiscordIcon size={16} />
              </a>

              <a
                href="https://www.linkedin.com/company/aws-student-builder-group-mvjce"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#ff9900] text-[#a1a1aa] hover:text-[#ff9900] transition-colors flex items-center justify-center min-h-[44px] min-w-[44px]"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={16} />
              </a>

              <a
                href="https://github.com/PRINCE-ANTHONY/aws"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#ff9900] text-[#a1a1aa] hover:text-[#ff9900] transition-colors flex items-center justify-center min-h-[44px] min-w-[44px]"
                aria-label="GitHub"
              >
                <GithubIcon size={16} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4">
            <p className="text-xs font-mono uppercase tracking-widest text-white font-semibold mb-4">
              Explore
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {FOOTER_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left py-1 text-[#71717a] hover:text-[#ff9900] transition-colors cursor-pointer min-h-[36px] flex items-center"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="md:col-span-3 space-y-2">
            <p className="text-xs font-mono uppercase tracking-widest text-white font-semibold mb-3">
              Campus Location
            </p>
            <div className="flex items-start gap-2 text-xs text-[#9ca3af]">
              <MapPin size={15} className="text-[#ff9900] shrink-0 mt-0.5" />
              <span>MVJ College of Engineering, Kadugodi, Near ITPB, Bengaluru, Karnataka 560067</span>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#71717a]">
          <p>© {new Date().getFullYear()} AWS Student Builders Group — MVJCE.</p>
          <p className="text-[#ff9900] font-semibold">THINK BIG. BUILD TOGETHER.</p>
        </div>
      </div>
    </footer>
  );
}
