'use client';

import { Users } from 'lucide-react';
import { LinkedinIcon } from '@/components/Icons';

const LEADERS = [
  {
    name: 'Mohammad Sahif',
    role: 'President',
    initials: 'MS',
    description: 'Leading community vision, external partnerships, and flagship builder initiatives.',
  },
  {
    name: 'C Varun',
    role: 'Vice President',
    initials: 'CV',
    description: 'Managing operational logistics, event execution, and cross-departmental coordination.',
  },
  {
    name: 'Srikar',
    role: 'Tech Lead',
    initials: 'SK',
    description: 'Guiding technical curriculum, hands-on cloud architectures, and project mentorship.',
  },
  {
    name: 'Shashank N',
    role: 'PR Lead',
    initials: 'SN',
    description: 'Directing public relations, external outreach, and media communications.',
  },
  {
    name: 'Prince Anthony',
    role: 'Core Team',
    initials: 'PA',
    description: 'Contributing to platform development, technical builds, and community workshops.',
  },
];

const TEAMS = [
  { name: 'Technical Team', focus: 'Cloud, Web, AI & Hardware engineering projects.' },
  { name: 'Community & Operations', focus: 'Event organization, outreach, and logistics.' },
  { name: 'Creative & Media', focus: 'Brand identity, photography, and documentation.' },
];

export default function Teams() {
  return (
    <section id="teams" className="py-20 sm:py-28 bg-[#090b0e] border-t border-white/[0.06] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs font-mono tracking-widest text-[#ff9900] uppercase font-semibold">
            THE PEOPLE BEHIND THE CLUB
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2 mb-4">
            Leadership & Teams.
          </h2>
          <p className="text-sm sm:text-base text-[#9ca3af]">
            Organized to give students ownership, leadership experience, and practical engineering skills.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-14">
          {LEADERS.map((leader) => (
            <div
              key={leader.name}
              className="rounded-2xl bg-[#0e1219] border border-white/[0.08] hover:border-[#ff9900]/40 p-6 flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ff9900]/10 border border-[#ff9900]/25 flex items-center justify-center font-mono font-bold text-sm text-[#ff9900] mb-4">
                  {leader.initials}
                </div>
                <h3 className="text-base font-bold text-white mb-0.5">
                  {leader.name}
                </h3>
                <p className="text-xs font-mono text-[#ff9900] mb-3">
                  {leader.role}
                </p>
                <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                  {leader.description}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#71717a]">MVJCE</span>
                <a
                  href="https://www.linkedin.com/company/aws-student-builder-group-mvjce"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#71717a] hover:text-[#ff9900] transition-colors p-1"
                  aria-label={`LinkedIn for ${leader.name}`}
                >
                  <LinkedinIcon size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Working Teams Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/[0.06]">
          {TEAMS.map((t) => (
            <div key={t.name} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <h4 className="text-sm font-bold text-white mb-1">{t.name}</h4>
              <p className="text-xs text-[#9ca3af]">{t.focus}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
