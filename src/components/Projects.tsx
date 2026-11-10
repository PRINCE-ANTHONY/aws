'use client';

import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';

const FEATURED_PROJECTS = [
  {
    id: 1,
    title: 'Cloud Cost Intelligence',
    domain: 'Cloud & DevOps',
    description:
      'A serverless dashboard leveraging AWS Cost Explorer, Lambda, and DynamoDB to detect anomalous compute surges across student projects.',
    tech: ['AWS Lambda', 'DynamoDB', 'Next.js'],
    githubUrl: 'https://github.com/PRINCE-ANTHONY/aws',
  },
  {
    id: 2,
    title: 'Automated Portfolio Engine',
    domain: 'Web Development',
    description:
      'A static site generator transforming student GitHub repositories and Markdown into production portfolios deployed to AWS Amplify.',
    tech: ['Next.js 15', 'AWS Amplify', 'Tailwind'],
    githubUrl: 'https://github.com/PRINCE-ANTHONY/aws',
  },
  {
    id: 3,
    title: 'Campus Semantic Search',
    domain: 'AI & Emerging Tech',
    description:
      'Retrieval-Augmented Generation (RAG) platform using Amazon Bedrock Titan embeddings to search campus technical events with natural language.',
    tech: ['Amazon Bedrock', 'Python', 'FastAPI'],
    githubUrl: 'https://github.com/PRINCE-ANTHONY/aws',
  },
  {
    id: 4,
    title: 'Hardware Cryptographic Core',
    domain: 'VLSI & Hardware',
    description:
      'Spartan-7 FPGA implementation of AES hardware encryption, interfaced via SPI to an ESP32 sending metrics to AWS IoT Core.',
    tech: ['Verilog', 'FPGA', 'AWS IoT Core'],
    githubUrl: 'https://github.com/PRINCE-ANTHONY/aws',
  },
];

interface ProjectsProps {
  className?: string;
  isStandalone?: boolean;
}

export default function Projects({ className = '', isStandalone = false }: ProjectsProps = {}) {
  return (
    <section
      id="projects"
      className={`${
        isStandalone
          ? 'pt-28 sm:pt-36 pb-20 sm:pb-28'
          : 'py-20 sm:py-28 border-t border-white/[0.06]'
      } bg-[#07080a] px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#ff9900] uppercase font-semibold">
              FEATURED BUILDS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2">
              Our Projects.
            </h2>
          </div>
          <p className="text-sm text-[#9ca3af] max-w-sm">
            Practical applications built by student members across our four technical tracks.
          </p>
        </div>

        {/* 4 Clean Featured Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {FEATURED_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl bg-[#0e1219] border border-white/[0.08] hover:border-[#ff9900]/40 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
            >
              <div>
                <span className="text-[11px] font-mono tracking-wider text-[#ff9900] uppercase font-semibold block mb-3">
                  {project.domain}
                </span>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-[#ff9900] transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-[#9ca3af] leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded text-xs font-mono bg-white/[0.03] border border-white/[0.06] text-[#a1a1aa]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono text-[#a1a1aa] hover:text-white transition-colors min-h-[44px]"
                >
                  <GithubIcon size={15} />
                  <span>View Repository</span>
                </a>
                <span className="text-[#ff9900] text-xs font-semibold group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center pt-2">
          <a
            href="https://github.com/PRINCE-ANTHONY/aws"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-sm text-white hover:text-[#ff9900] font-semibold transition-all min-h-[44px]"
          >
            <span>View All Projects on GitHub</span>
            <ExternalLink size={14} />
          </a>
        </div>

      </div>
    </section>
  );
}
