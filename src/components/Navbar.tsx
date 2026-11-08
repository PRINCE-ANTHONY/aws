'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  sectionId: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#hero', sectionId: 'hero' },
  { label: 'About', href: '#about', sectionId: 'about' },
  { label: 'Domains', href: '#domains', sectionId: 'domains' },
  { label: 'Our Work', href: '#projects', sectionId: 'projects' },
  { label: 'Community', href: '#community', sectionId: 'community' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeHash, setActiveHash] = useState<string>('hero');

  // Handle scroll state for navbar background blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
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

  // Support Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.sectionId);
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveHash(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0.1,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 w-full ${
        scrolled
          ? 'bg-[#07080a]/92 backdrop-blur-md border-b border-white/[0.06] py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-11">
          
          {/* Logo Brand Identifier */}
          <button
            onClick={() => handleNavClick('#hero')}
            className="flex items-center gap-2.5 group text-left cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9900] rounded-lg p-1 min-h-[44px] min-w-[44px]"
            aria-label="AWS Student Builders Group MVJCE - Return to Top"
          >
            <div className="w-8 h-8 rounded-lg bg-[#ff9900] flex items-center justify-center text-black font-extrabold text-sm shadow-sm group-hover:scale-105 transition-transform shrink-0">
              ⚡
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-tight leading-none">
                AWS SBG
              </span>
              <span className="text-[10px] font-mono text-[#ff9900] font-semibold leading-none mt-1">
                MVJCE
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08]"
            aria-label="Primary Desktop Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeHash === item.sectionId;
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-3.5 py-1.5 text-xs font-mono tracking-wide rounded-full transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9900] min-h-[36px] ${
                    isActive
                      ? 'bg-[#ff9900] text-black font-bold shadow-sm'
                      : 'text-[#9ca3af] hover:text-white hover:bg-white/[0.05]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-3">
            {/* Prominent Discord CTA Button */}
            <a
              href="https://discord.gg/gVPMHvDaX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-[#ff9900] hover:bg-[#e68900] text-black font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-[#ff9900]/20 min-h-[44px] transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Join AWS SBG MVJCE Discord Server"
            >
              <span>Join Discord</span>
              <ArrowUpRight size={15} />
            </a>

            {/* Mobile Hamburger Menu Toggle Button (Touch Target >= 44px) */}
            <button
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#9ca3af] hover:text-white hover:border-white/[0.16] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9900]"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
          className="md:hidden fixed inset-x-0 top-[60px] sm:top-[68px] bottom-0 bg-[#07080a]/98 backdrop-blur-2xl border-t border-white/[0.08] px-6 py-6 flex flex-col justify-between overflow-y-auto max-w-full"
        >
          <nav className="flex flex-col gap-2 w-full" aria-label="Mobile Nav Items">
            {NAV_ITEMS.map((item) => {
              const isActive = activeHash === item.sectionId;
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl text-base font-medium tracking-wide transition-all min-h-[48px] flex items-center justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9900] ${
                    isActive
                      ? 'bg-[#ff9900] text-black font-bold'
                      : 'text-[#d1d5db] hover:bg-white/[0.04] hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Drawer Bottom CTA */}
          <div className="pt-6 border-t border-white/[0.08] mt-6 w-full">
            <a
              href="https://discord.gg/gVPMHvDaX"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#ff9900] hover:bg-[#e68900] text-black font-bold text-sm tracking-wide shadow-lg shadow-[#ff9900]/20 min-h-[48px] transition-all active:scale-[0.98]"
              aria-label="Join AWS SBG MVJCE Discord Server"
            >
              <span>Join Discord</span>
              <ArrowUpRight size={16} />
            </a>
            <p className="text-center text-xs font-mono text-[#71717a] mt-3">
              MVJ College of Engineering • Bengaluru
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
