import type { Metadata } from 'next';
import Teams from '@/components/Teams';

export const metadata: Metadata = {
  title: 'Teams & Builders — AWS Student Builders Group MVJCE',
  description:
    'Our People. Our Builders. Meet the Core Leadership, Tech Team, PR Team, and Discord Handlers behind AWS Student Builders Group at MVJCE.',
};

export default function TeamPage() {
  return <Teams isStandalone />;
}

