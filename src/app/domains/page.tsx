import type { Metadata } from 'next';
import Domains from '@/components/Domains';

export const metadata: Metadata = {
  title: 'Domains — AWS Student Builders Group MVJCE',
  description:
    'Explore our four core technical domains: Web Development, VLSI & Hardware, Cloud & DevOps, and AI & Emerging Technology at MVJCE.',
};

export default function DomainsPage() {
  return <Domains isStandalone />;
}

