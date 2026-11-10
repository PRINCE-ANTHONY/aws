import type { Metadata } from 'next';
import About from '@/components/About';
import Pillars from '@/components/Pillars';

export const metadata: Metadata = {
  title: 'About — AWS Student Builders Group MVJCE',
  description:
    'The story, multidisciplinary purpose, and core pillars of the AWS Student Builders Group at MVJ College of Engineering.',
};

export default function AboutPage() {
  return (
    <>
      <About isStandalone />
      <Pillars />
    </>
  );
}

