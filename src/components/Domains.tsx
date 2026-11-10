'use client';

import { Globe, Cpu, Cloud, Brain, ArrowRight } from 'lucide-react';

const DOMAINS = [
  {
    id: 'web',
    icon: Globe,
    title: 'Web Development',
    description:
      'Build responsive, full-stack web applications, modern UI design systems, and serverless APIs using Next.js and React.',
    tags: ['React', 'Next.js', 'APIs', 'Design Systems'],
  },
  {
    id: 'vlsi',
    icon: Cpu,
    title: 'VLSI & Hardware',
    description:
      'Digital circuit design, FPGA programming with Verilog, embedded microcontrollers, and hardware-software telemetry.',
    tags: ['Verilog', 'FPGA', 'Embedded C', 'IoT'],
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud & DevOps',
    description:
      'Master AWS cloud infrastructure, serverless architectures, containerization with Docker, and automated CI/CD pipelines.',
    tags: ['AWS Lambda', 'EC2 & S3', 'Docker', 'CI/CD'],
  },
  {
    id: 'ai',
    icon: Brain,
    title: 'AI & Emerging Technology',
    description:
      'Applied machine learning models, natural language processing, computer vision, and generative AI using Amazon Bedrock.',
    tags: ['Generative AI', 'Amazon Bedrock', 'PyTorch', 'Computer Vision'],
  },
];

interface DomainsProps {
  className?: string;
  isStandalone?: boolean;
}

export default function Domains({ className = '', isStandalone = false }: DomainsProps = {}) {
  return (
    <section
      id="domains"
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
            WHAT WE EXPLORE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2 mb-4">
            Our Domains.
          </h2>
          <p className="text-sm sm:text-base text-[#9ca3af]">
            Four core technical disciplines that form the foundation of our weekly projects and workshops.
          </p>
        </div>

        {/* 4 Attractive Clean Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {DOMAINS.map((domain) => {
            const Icon = domain.icon;
            return (
              <div
                key={domain.id}
                className="rounded-2xl bg-[#0e1219] border border-white/[0.08] hover:border-[#ff9900]/40 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#ff9900]/10 border border-[#ff9900]/20 flex items-center justify-center text-[#ff9900]">
                      <Icon size={24} />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {domain.title}
                  </h3>
                  <p className="text-sm text-[#9ca3af] leading-relaxed mb-6">
                    {domain.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {domain.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.03] border border-white/[0.06] text-[#a1a1aa]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06]">
                  <a
                    href="https://www.linkedin.com/company/aws-student-builder-group-mvjce"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ff9900] hover:text-[#ffb74d] transition-colors min-h-[44px]"
                  >
                    <span>Explore Track</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
