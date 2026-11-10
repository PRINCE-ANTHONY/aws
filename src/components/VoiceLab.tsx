'use client';

import { Mic, Presentation, MessageSquare, Award, ArrowRight } from 'lucide-react';

const ACTIVITIES = [
  {
    icon: Mic,
    title: 'Public Speaking',
    desc: 'Short, unscripted lightning talks that build stage presence and reduce communication anxiety.',
  },
  {
    icon: MessageSquare,
    title: 'Technical Debates',
    desc: 'Debating real architectural trade-offs, system design choices, and software methodologies.',
  },
  {
    icon: Presentation,
    title: 'Demo Presentations',
    desc: 'Clear, engaging slide presentations and live product walkthroughs for project showcases.',
  },
  {
    icon: Award,
    title: 'Mock Interviews',
    desc: 'Simulated technical and behavioral interviews with structured peer and mentor feedback.',
  },
];

interface VoiceLabProps {
  className?: string;
  isStandalone?: boolean;
}

export default function VoiceLab({ className = '', isStandalone = false }: VoiceLabProps = {}) {
  return (
    <section
      id="voicelab"
      className={`${
        isStandalone
          ? 'pt-28 sm:pt-36 pb-20 sm:pb-28'
          : 'py-20 sm:py-28 border-t border-white/[0.06]'
      } bg-[#07080a] px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Main Card */}
        <div className="rounded-3xl bg-gradient-to-br from-[#121620] via-[#0d1016] to-[#080a0e] border border-white/[0.08] p-8 sm:p-12 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Mission */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff9900]/10 border border-[#ff9900]/25 text-xs font-mono text-[#ff9900] uppercase font-semibold">
                <Mic size={13} />
                Distinctive Initiative
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                The Voice Lab.
              </h2>

              <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed">
                Great code is only half the battle. Through our weekly Voice Lab sessions, we help students develop 
                the verbal confidence, presentation ability, and composure needed to lead technical teams and excel in interviews.
              </p>

              <div className="pt-2">
                <a
                  href="https://www.linkedin.com/company/aws-student-builder-group-mvjce"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff9900] hover:text-[#ffb74d] transition-colors min-h-[44px]"
                >
                  <span>Attend a Session</span>
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>

            {/* Right Column: 4 Concise Activities */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ACTIVITIES.map((act) => {
                const Icon = act.icon;
                return (
                  <div
                    key={act.title}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-[#ff9900] mb-3">
                      <Icon size={18} />
                    </div>
                    <h3 className="text-base font-bold text-white mb-1.5">{act.title}</h3>
                    <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">{act.desc}</p>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
