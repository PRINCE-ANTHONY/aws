import type { Metadata } from 'next';
import Community from '@/components/Community';

export const metadata: Metadata = {
  title: 'Community & Ethos — AWS Student Builders Group MVJCE',
  description:
    'Join our welcoming student builder community at MVJCE. Connect on Discord, share ideas, and build together.',
};

export default function CommunityPage() {
  return <Community isStandalone />;
}

