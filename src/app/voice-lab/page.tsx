import type { Metadata } from 'next';
import VoiceLab from '@/components/VoiceLab';

export const metadata: Metadata = {
  title: 'The Voice Lab — AWS Student Builders Group MVJCE',
  description:
    'Where builders learn to speak. Developing communication, public speaking, technical debate, and presentation confidence at MVJCE.',
};

export default function VoiceLabPage() {
  return <VoiceLab isStandalone />;
}

