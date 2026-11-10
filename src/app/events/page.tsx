import type { Metadata } from 'next';
import Events from '@/components/Events';

export const metadata: Metadata = {
  title: 'Events & Sprints — AWS Student Builders Group MVJCE',
  description:
    'Workshops, project showcases, and hands-on builder sprints held at MVJ College of Engineering, Bengaluru.',
};

export default function EventsPage() {
  return <Events isStandalone />;
}

