'use client';

import { Calendar, MapPin, ArrowRight } from 'lucide-react';

const EVENTS = [
  {
    id: 1,
    title: 'Inaugural Cloud Workshop',
    date: '24 OCT 2024',
    venue: 'Seminar Hall 2, MVJCE',
    status: 'Completed',
    description:
      'Official launch introducing AWS console basics, cloud architecture primitives, and our four engineering tracks.',
  },
  {
    id: 2,
    title: 'Project Showcase & Demos',
    date: '29 OCT 2024',
    venue: 'MVJCE Campus',
    status: 'Completed',
    description:
      'Builder teams presented first-round prototypes in web development, IoT, and cloud to peers and faculty mentors.',
  },
  {
    id: 3,
    title: 'Next Builder Sprint',
    date: 'COMING SOON',
    venue: 'MVJCE Central Campus',
    status: 'Upcoming',
    description:
      'An intensive hands-on hackathon focused on deploying serverless architectures and AI systems. Stay tuned for dates.',
  },
];

interface EventsProps {
  className?: string;
  isStandalone?: boolean;
}

export default function Events({ className = '', isStandalone = false }: EventsProps = {}) {
  return (
    <section
      id="events"
      className={`${
        isStandalone
          ? 'pt-28 sm:pt-36 pb-20 sm:pb-28'
          : 'py-20 sm:py-28 border-t border-white/[0.06]'
      } bg-[#090b0e] px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs font-mono tracking-widest text-[#ff9900] uppercase font-semibold">
            MEETINGS & SPRINTS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2 mb-4">
            Events.
          </h2>
          <p className="text-sm sm:text-base text-[#9ca3af]">
            Regular workshops, showcases, and hackathons held at MVJ College of Engineering.
          </p>
        </div>

        {/* 3 Clean Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {EVENTS.map((event) => (
            <div
              key={event.id}
              className="rounded-2xl bg-[#0e1219] border border-white/[0.08] hover:border-[#ff9900]/40 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-mono font-bold text-[#ff9900] px-2.5 py-1 rounded bg-[#ff9900]/10 border border-[#ff9900]/25 inline-flex items-center gap-1.5">
                    <Calendar size={12} className="shrink-0" />
                    <span>{event.date}</span>
                  </span>
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                      event.status === 'Upcoming'
                        ? 'bg-[#10b981]/15 text-[#10b981] font-semibold'
                        : 'text-[#71717a]'
                    }`}
                  >
                    {event.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {event.title}
                </h3>

                <div className="flex items-center gap-2 text-xs font-mono text-[#a1a1aa] mb-4">
                  <MapPin size={13} className="text-[#ff9900] shrink-0" />
                  <span>{event.venue}</span>
                </div>

                <p className="text-sm text-[#9ca3af] leading-relaxed">
                  {event.description}
                </p>
              </div>

              {event.status === 'Upcoming' && (
                <div className="pt-5 mt-6 border-t border-white/[0.06]">
                  <a
                    href="https://www.linkedin.com/company/aws-student-builder-group-mvjce"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ff9900] hover:text-[#ffb74d] transition-colors min-h-[44px]"
                  >
                    <span>Follow on LinkedIn for RSVP</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
