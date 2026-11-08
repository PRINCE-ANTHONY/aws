'use client';

import { Cpu, Mic, Users } from 'lucide-react';

const PILLARS_DATA = [
  {
    icon: Cpu,
    title: 'Technical Innovation',
    description:
      'Hands-on engineering across AWS Cloud services, modern web frameworks, AI applications, and embedded hardware design.',
    badge: 'BUILD',
  },
  {
    icon: Mic,
    title: 'Communication & Growth',
    description:
      'Learning to articulate technical concepts clearly through lightning talks, stage demos, mock interviews, and pitch sessions.',
    badge: 'GROW',
  },
  {
    icon: Users,
    title: 'Collaborative Community',
    description:
      'A welcoming environment where beginners and seniors pair-program, share knowledge, and build portfolio projects together.',
    badge: 'BELONG',
  },
];

export default function Pillars() {
  return (
    <section id="pillars" className="py-20 sm:py-28 bg-[#07080a] border-t border-white/[0.06] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs font-mono tracking-widest text-[#ff9900] uppercase font-semibold">
            OUR FOUNDATION
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2 mb-4">
            The Three Pillars.
          </h2>
          <p className="text-sm sm:text-base text-[#9ca3af]">
            Everything we do revolves around empowering students to belong, build, and grow into confident engineers.
          </p>
        </div>

        {/* Three Clean Columns on Desktop, Vertically Stacked on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PILLARS_DATA.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-2xl bg-[#0d1016] border border-white/[0.08] hover:border-[#ff9900]/40 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#ff9900] group-hover:scale-105 transition-transform">
                      <Icon size={22} />
                    </div>
                    <span className="text-[11px] font-mono tracking-widest text-[#a1a1aa] uppercase px-2.5 py-1 rounded bg-white/[0.03]">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#9ca3af] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
