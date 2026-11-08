import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AWS Student Builders Group — MVJCE",
  description:
    "A community of learners, creators and builders at MVJ College of Engineering, Bengaluru. Think Big. Build Together.",
  keywords: [
    "AWS",
    "Student Builders Group",
    "MVJCE",
    "MVJ College of Engineering",
    "cloud computing",
    "web development",
    "AI",
    "VLSI",
    "Bengaluru",
  ],
  openGraph: {
    title: "AWS Student Builders Group — MVJCE",
    description: "Think Big. Build Together.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0b0b0b] text-white antialiased">{children}</body>
    </html>
  );
}
