import type { Metadata } from 'next';
import Projects from '@/components/Projects';

export const metadata: Metadata = {
  title: 'Projects & Builds — AWS Student Builders Group MVJCE',
  description:
    'Featured projects and engineering builds developed by student members of AWS SBG across Cloud, Web, AI, and Hardware.',
};

export default function ProjectsPage() {
  return <Projects isStandalone />;
}

