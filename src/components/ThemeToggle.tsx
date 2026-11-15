'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/ink/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme, isReady } = useTheme();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // If keyboard triggered (detail === 0), don't pass coords so it centers on button
    if (e.detail === 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      toggleTheme({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    } else {
      toggleTheme({ x: e.clientX, y: e.clientY });
    }
  };

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={handleClick}
      data-ink-live=""
      className={`relative inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#9ca3af] hover:text-[#ff9900] hover:border-[#ff9900]/40 transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9900] shrink-0 min-w-[36px] min-h-[36px] ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-4 h-4 sm:w-[18px] sm:h-[18px] flex items-center justify-center">
        {/* Sun icon */}
        <Sun
          size={18}
          className={`absolute transition-all duration-300 transform ${
            !isReady || isDark
              ? 'opacity-0 rotate-90 scale-50 pointer-events-none'
              : 'opacity-100 rotate-0 scale-100 text-[#ff9900]'
          }`}
        />
        {/* Moon icon */}
        <Moon
          size={18}
          className={`absolute transition-all duration-300 transform ${
            isReady && !isDark
              ? 'opacity-0 -rotate-90 scale-50 pointer-events-none'
              : 'opacity-100 rotate-0 scale-100 text-[#ff9900]'
          }`}
        />
      </div>
    </button>
  );
}

