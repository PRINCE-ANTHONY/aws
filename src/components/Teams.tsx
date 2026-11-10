'use client';

import Image from 'next/image';
import { ArrowUpRight, ShieldCheck, Terminal, Megaphone, Sparkles, ExternalLink } from 'lucide-react';
import { LinkedinIcon, DiscordIcon, GithubIcon } from '@/components/Icons';

const basePath = process.env.NODE_ENV === 'production' ? '/aws' : '';

interface Member {
  name: string;
  role: string;
  initials: string;
  description: string;
  badge?: string;
  photo?: string;
  linkedinUrl?: string;
  tags?: string[];
}

const CORE_LEADERSHIP: Member[] = [
  {
    name: 'Mohammed Sahif',
    role: 'Captain',
    initials: 'MS',
    badge: 'LEADERSHIP',
    description:
      'Leading club vision, builder culture, external community relations, and flagship builder initiatives.',
    linkedinUrl: 'https://www.linkedin.com/company/aws-student-builder-group-mvjce',
  },
  {
    name: 'C Varun',
    role: 'Vice Captain',
    initials: 'CV',
    badge: 'OPERATIONS',
    description:
      'Directing operational logistics, sprint execution, and multidisciplinary coordination across branches.',
    linkedinUrl: 'https://www.linkedin.com/company/aws-student-builder-group-mvjce',
  },
  {
    name: 'Srikar T',
    role: 'Tech Lead',
    initials: 'ST',
    badge: 'ENGINEERING',
    description:
      'Guiding technical architectures, hands-on cloud curricula, developer build sprints, and project mentorship.',
    linkedinUrl: 'https://www.linkedin.com/company/aws-student-builder-group-mvjce',
  },
  {
    name: 'Shashank N M Gowda',
    role: 'PR Lead',
    initials: 'SG',
    badge: 'OUTREACH',
    description:
      'Directing public relations, external media communications, and campus builder outreach.',
    linkedinUrl: 'https://www.linkedin.com/company/aws-student-builder-group-mvjce',
  },
];

const TECH_TEAM: Member[] = [
  {
    name: 'Prince Anthony',
    role: 'Platform Development & Technical Builds',
    initials: 'PA',
    description:
      'Contributing to core platform development, technical build systems, and hands-on workshops.',
    tags: ['Platform Dev', 'Next.js', 'Workshops', 'Cloud'],
    linkedinUrl: 'https://www.linkedin.com/company/aws-student-builder-group-mvjce',
  },
];

const PR_TEAM: Member[] = [
  {
    name: 'Mohith Lokesh',
    role: 'PR & Community Outreach',
    initials: 'ML',
    description:
      'Driving student engagement, inter-departmental outreach, and community communication across MVJCE.',
    tags: ['Outreach', 'Engagement', 'Campus PR'],
    linkedinUrl: 'https://www.linkedin.com/company/aws-student-builder-group-mvjce',
  },
  {
    name: 'Rohith S H',
    role: 'PR & Media Communications',
    initials: 'RS',
    description:
      'Managing media communications, creative assets, event documentation, and publicity channels.',
    tags: ['Media', 'Publicity', 'Documentation'],
    linkedinUrl: 'https://www.linkedin.com/company/aws-student-builder-group-mvjce',
  },
];

const DISCORD_HANDLERS: Member[] = [
  {
    name: 'Mohith Lokesh',
    role: 'Discord Handler & Community Moderator',
    initials: 'ML',
    description:
      'Coordinating server announcements, channel organization, and welcoming new builders to the digital community.',
    tags: ['Server Moderation', 'Onboarding', 'Peer Support'],
    linkedinUrl: 'https://www.linkedin.com/company/aws-student-builder-group-mvjce',
  },
  {
    name: 'Rohith S H',
    role: 'Discord Handler & Community Moderator',
    initials: 'RS',
    description:
      'Facilitating active builder conversations, tech question routing, and voice lounge study sessions.',
    tags: ['Community Channels', 'Discussions', 'Member Help'],
    linkedinUrl: 'https://www.linkedin.com/company/aws-student-builder-group-mvjce',
  },
];

interface TeamsProps {
  className?: string;
  isStandalone?: boolean;
}

export default function Teams({ className = '', isStandalone = false }: TeamsProps = {}) {
  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-[#0e121a] via-[#090b10] to-[#07080a] ${
        isStandalone ? 'pt-28 sm:pt-36 lg:pt-36' : 'py-20 sm:py-28'
      } pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${className}`}
    >
      {/* Subtle Ambient Background Lighting */}
      <div
        className="absolute top-24 left-1/2 -translate-x-1/2 w-[720px] sm:w-[960px] h-[480px] rounded-full pointer-events-none blur-[140px] opacity-25"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255, 153, 0, 0.28) 0%, rgba(255, 153, 0, 0.08) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Cybernetic Matrix Dot Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black_40%,transparent_90%)] opacity-60"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10 space-y-20 sm:space-y-24">
        
        {/* Section A: Page Introduction */}
        <header className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff9900]" />
            <span className="text-xs font-mono text-[#ff9900] tracking-widest uppercase font-semibold">
              THE TEAMS OF AWS SBG
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-5">
            OUR PEOPLE. <span className="text-[#ff9900]">OUR BUILDERS.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#9ca3af] leading-relaxed">
            Different skills, different perspectives, one community. Meet the people who make AWS SBG happen.
          </p>
        </header>

        {/* Section B: Core Team (4 Prominent Profile Cards) */}
        <section aria-labelledby="core-team-heading" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-white/[0.06]">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <ShieldCheck size={16} className="text-[#ff9900]" />
                <span className="text-xs font-mono tracking-widest text-[#ff9900] uppercase font-semibold">
                  CORE TEAM
                </span>
              </div>
              <h2 id="core-team-heading" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Core Leadership.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#9ca3af] max-w-md">
              Guiding club direction, student initiatives, technical curricula, and campus partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_LEADERSHIP.map((leader) => (
              <article
                key={leader.name}
                className="relative rounded-2xl bg-gradient-to-b from-[#161c28]/95 via-[#10141f]/95 to-[#0b0e14]/98 border border-white/[0.1] hover:border-[#ff9900]/50 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-[#ff9900]/5 group backdrop-blur-xl"
              >
                {/* Precision Corner Pin Accents */}
                <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 border-t border-l border-[#ff9900]/40 rounded-tl-sm pointer-events-none group-hover:border-[#ff9900] transition-colors" />
                <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 border-t border-r border-[#ff9900]/40 rounded-tr-sm pointer-events-none group-hover:border-[#ff9900] transition-colors" />
                <div className="absolute bottom-2.5 left-2.5 w-1.5 h-1.5 border-b border-l border-[#ff9900]/40 rounded-bl-sm pointer-events-none group-hover:border-[#ff9900] transition-colors" />
                <div className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 border-b border-r border-[#ff9900]/40 rounded-br-sm pointer-events-none group-hover:border-[#ff9900] transition-colors" />

                <div>
                  {/* Avatar with Initials Fallback */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1c2434] to-[#0f141e] border border-[#ff9900]/30 flex items-center justify-center font-mono font-extrabold text-xl text-[#ff9900] shadow-[0_0_20px_rgba(255,153,0,0.15)] group-hover:scale-105 group-hover:border-[#ff9900]/60 transition-all shrink-0 overflow-hidden">
                      {leader.photo ? (
                        <Image
                          src={`${basePath}${leader.photo}`}
                          alt={leader.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{leader.initials}</span>
                      )}
                    </div>
                    {leader.badge && (
                      <span className="text-[10px] font-mono tracking-widest text-[#a1a1aa] uppercase px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.06]">
                        {leader.badge}
                      </span>
                    )}
                  </div>

                  {/* Leader Info */}
                  <h3 className="text-xl font-bold text-white mb-1 tracking-tight group-hover:text-[#ff9900] transition-colors">
                    {leader.name}
                  </h3>

                  <div className="inline-block px-2.5 py-0.5 rounded-md bg-[#ff9900]/10 border border-[#ff9900]/25 text-xs font-mono text-[#ff9900] font-semibold mb-3.5">
                    {leader.role}
                  </div>

                  <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                    {leader.description}
                  </p>
                </div>

                {/* Footer with MVJCE Chapter & LinkedIn */}
                <div className="pt-4 mt-6 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#71717a] uppercase">MVJCE · Bengaluru</span>
                  {leader.linkedinUrl && (
                    <a
                      href={leader.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#71717a] hover:text-[#ff9900] transition-colors p-1"
                      aria-label={`LinkedIn profile for ${leader.name}`}
                    >
                      <LinkedinIcon size={15} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section C: Tech Team */}
        <section aria-labelledby="tech-team-heading" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-white/[0.06]">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Terminal size={16} className="text-[#ff9900]" />
                <span className="text-xs font-mono tracking-widest text-[#ff9900] uppercase font-semibold">
                  TECHNICAL WING
                </span>
              </div>
              <h2 id="tech-team-heading" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Tech Team.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#9ca3af] max-w-md">
              Building club digital platforms, hands-on cloud labs, and collaborative architecture prototypes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TECH_TEAM.map((member) => (
              <article
                key={member.name}
                className="rounded-2xl bg-[#0e1219] border border-white/[0.08] hover:border-[#ff9900]/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#181e2b] via-[#11141e] to-[#0b0e14] border border-white/[0.1] flex items-center justify-center font-mono font-bold text-base text-white group-hover:text-[#ff9900] group-hover:border-[#ff9900]/40 transition-all shrink-0 overflow-hidden">
                      {member.photo ? (
                        <Image
                          src={`${basePath}${member.photo}`}
                          alt={member.name}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{member.initials}</span>
                      )}
                    </div>

                    <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.06] text-[#ff9900]">
                      Tech Team
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#ff9900] transition-colors">
                    {member.name}
                  </h3>

                  <p className="text-xs font-mono text-[#a1a1aa] mb-3">
                    {member.role}
                  </p>

                  <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed mb-4">
                    {member.description}
                  </p>

                  {member.tags && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {member.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] border border-white/[0.06] text-[#a1a1aa]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#71717a]">MVJCE · Tech Team</span>
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#71717a] hover:text-[#ff9900] transition-colors p-1"
                      aria-label={`LinkedIn for ${member.name}`}
                    >
                      <LinkedinIcon size={14} />
                    </a>
                  )}
                </div>
              </article>
            ))}

            {/* Technical Track Open Collaboration Card */}
            <article className="rounded-2xl bg-gradient-to-br from-[#121622]/90 via-[#0e121a]/90 to-[#080b10]/95 border border-white/[0.08] p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#ff9900] mb-4">
                  <GithubIcon size={20} />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">
                  Student Builders & Contributors
                </h3>

                <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed mb-4">
                  AWS SBG MVJCE welcomes student developers across all years and departments. Pair-program on active builds, contribute to open-source tools, or lead a cloud workshop.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] border border-white/[0.06] text-[#a1a1aa]">
                    Web Development
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] border border-white/[0.06] text-[#a1a1aa]">
                    Cloud Infrastructure
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] border border-white/[0.06] text-[#a1a1aa]">
                    AI & ML
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] border border-white/[0.06] text-[#a1a1aa]">
                    VLSI & Hardware
                  </span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/[0.06]">
                <a
                  href="https://github.com/PRINCE-ANTHONY/aws"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ff9900] hover:text-[#ffb74d] transition-colors min-h-[36px]"
                >
                  <span>Explore Open Source Builds</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </article>
          </div>
        </section>

        {/* Section D: PR Team */}
        <section aria-labelledby="pr-team-heading" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-white/[0.06]">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Megaphone size={16} className="text-[#ff9900]" />
                <span className="text-xs font-mono tracking-widest text-[#ff9900] uppercase font-semibold">
                  COMMUNICATIONS & OUTREACH
                </span>
              </div>
              <h2 id="pr-team-heading" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                PR Team.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#9ca3af] max-w-md">
              Connecting our builder community with MVJCE departments, event participants, and technical mentors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PR_TEAM.map((member) => (
              <article
                key={member.name}
                className="rounded-2xl bg-[#0e1219] border border-white/[0.08] hover:border-[#ff9900]/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#181e2b] via-[#11141e] to-[#0b0e14] border border-white/[0.1] flex items-center justify-center font-mono font-bold text-base text-white group-hover:text-[#ff9900] group-hover:border-[#ff9900]/40 transition-all shrink-0 overflow-hidden">
                      {member.photo ? (
                        <Image
                          src={`${basePath}${member.photo}`}
                          alt={member.name}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{member.initials}</span>
                      )}
                    </div>

                    <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.06] text-[#ff9900]">
                      PR Team
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#ff9900] transition-colors">
                    {member.name}
                  </h3>

                  <p className="text-xs font-mono text-[#a1a1aa] mb-3">
                    {member.role}
                  </p>

                  <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed mb-4">
                    {member.description}
                  </p>

                  {member.tags && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {member.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] border border-white/[0.06] text-[#a1a1aa]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#71717a]">MVJCE · PR Team</span>
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#71717a] hover:text-[#ff9900] transition-colors p-1"
                      aria-label={`LinkedIn for ${member.name}`}
                    >
                      <LinkedinIcon size={14} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section E: Discord Handlers (Distinct Highlight Section) */}
        <section
          aria-labelledby="discord-handlers-heading"
          className="rounded-3xl bg-gradient-to-br from-[#111425] via-[#0c0f1c] to-[#080910] border border-[#5865F2]/25 p-7 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl backdrop-blur-xl"
        >
          {/* Subtle Discord Blurple Ambient Glow */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] opacity-15 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, #5865F2 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 space-y-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5865F2]/10 border border-[#5865F2]/25 mb-3.5">
                <DiscordIcon size={14} className="text-[#5865F2]" />
                <span className="text-xs font-mono text-[#8ea1ff] tracking-widest uppercase font-semibold">
                  COMMUNITY OPERATORS
                </span>
              </div>

              <h2 id="discord-handlers-heading" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2.5">
                Discord Handlers.
              </h2>

              <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                Managing our server architecture, facilitating real-time builder discussions, welcoming newcomers, and keeping communication fluid across all departments.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {DISCORD_HANDLERS.map((handler) => (
                <article
                  key={handler.name}
                  className="rounded-2xl bg-[#090b14]/80 border border-[#5865F2]/20 hover:border-[#5865F2]/50 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg group"
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#181d38] via-[#111428] to-[#0b0d1b] border border-[#5865F2]/30 flex items-center justify-center font-mono font-bold text-base text-[#8ea1ff] shadow-[0_0_20px_rgba(88,101,242,0.18)] group-hover:scale-105 group-hover:border-[#5865F2]/60 transition-all shrink-0 overflow-hidden">
                        {handler.photo ? (
                          <Image
                            src={`${basePath}${handler.photo}`}
                            alt={handler.name}
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span>{handler.initials}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#5865F2]/10 border border-[#5865F2]/25">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5865F2] animate-pulse" />
                        <span className="text-[10px] font-mono text-[#8ea1ff] font-semibold">
                          Server Moderator
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-[#8ea1ff] transition-colors">
                      {handler.name}
                    </h3>

                    <p className="text-xs font-mono text-[#a1a1aa] mb-3">
                      {handler.role}
                    </p>

                    <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed mb-4">
                      {handler.description}
                    </p>

                    {handler.tags && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {handler.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] border border-white/[0.06] text-[#a1a1aa]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#71717a]">AWS SBG Discord</span>
                    <a
                      href="https://discord.gg/gVPMHvDaX"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8ea1ff] hover:text-white transition-colors text-xs font-mono inline-flex items-center gap-1"
                    >
                      <span>Connect</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {/* Section CTA */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#5865F2]/10 border border-[#5865F2]/25 flex items-center justify-center text-[#5865F2] shrink-0">
                  <Sparkles size={18} />
                </div>
                <p className="text-xs sm:text-sm text-[#d1d5db]">
                  Have a question or want to collaborate with our teams? Join our active Discord server.
                </p>
              </div>

              <a
                href="https://discord.gg/gVPMHvDaX"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-[#5865F2]/20 min-h-[44px] transition-all active:scale-[0.98] shrink-0"
              >
                <DiscordIcon size={16} />
                <span>Join Discord Server</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
