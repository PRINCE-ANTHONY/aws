'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Pillars', href: '#pillars' },
  { label: 'Domains', href: '#domains' },
  { label: 'Voice Lab', href: '#voicelab' },
  { label: 'Teams', href: '#teams' },
  { label: 'Projects', href: '#projects' },
  { label: 'Events', href: '#events' },
  { label: 'Community', href: '#community' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.replace('#', ''));
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveHash(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '-20% 0px -70% 0px',
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07080a]/90 backdrop-blur-md border-b border-white/[0.06] py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <button
            onClick={() => handleNavClick('#hero')}
            className="flex items-center gap-2.5 group text-left cursor-pointer select-none"
            aria-label="AWS SBG MVJCE - Home"
          >
            <div className="w-8 h-8 rounded-lg bg-[#ff9900] flex items-center justify-center text-black font-extrabold text-sm shadow-sm group-hover:scale-105 transition-transform">
              ⚡
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-tight leading-none">
                AWS SBG
              </span>
              <span className="text-[10px] font-mono text-[#ff9900] font-semibold leading-none mt-0.5">
                MVJCE
              </span>
            </div>
          </button>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08]" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const id = item.href.replace('#', '');
              const isActive = activeHash === id;
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-3 py-1 text-xs font-mono rounded-full transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#ff9900] text-black font-bold'
                      : 'text-[#9ca3af] hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/company/aws-student-builder-group-mvjce"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#ff9900] hover:bg-[#e68900] text-black font-bold text-xs tracking-wide shadow-md shadow-[#ff9900]/20 min-h-[44px]"
            >
              <span>Join Us</span>
              <ArrowUpRight size={14} />
            </a>

            {/* Mobile Menu Button (44px min touch target) */}
            <button
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#9ca3af] hover:text-white transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Full-Screen/Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bottom-0 bg-[#07080a]/98 backdrop-blur-2xl border-t border-white/[0.08] px-6 py-6 flex flex-col justify-between overflow-y-auto">
          <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => {
              const id = item.href.replace('#', '');
              const isActive = activeHash === id;
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-left px-4 py-3 rounded-xl text-base font-medium transition-all min-h-[48px] flex items-center ${
                    isActive
                      ? 'bg-[#ff9900] text-black font-bold'
                      : 'text-[#d1d5db] hover:bg-white/[0.04]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-white/[0.08] mt-6">
            <a
              href="https://www.linkedin.com/company/aws-student-builder-group-mvjce"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#ff9900] text-black font-bold text-sm tracking-wide shadow-lg shadow-[#ff9900]/20 min-h-[48px]"
            >
              <span>Join Community on LinkedIn</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
