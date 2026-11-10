import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'AWS Student Builders Group — MVJCE',
  description:
    'A multidisciplinary student community at MVJ College of Engineering, Bengaluru. Sharing ideas, learning together and helping one another grow.',
  keywords: [
    'AWS',
    'Student Builders Group',
    'MVJCE',
    'MVJ College of Engineering',
    'cloud computing',
    'web development',
    'AI',
    'VLSI',
    'Bengaluru',
  ],
  openGraph: {
    title: 'AWS Student Builders Group — MVJCE',
    description: 'Think Big. Build Together.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#08090b] text-white antialiased selection:bg-[#ff9900] selection:text-black min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
