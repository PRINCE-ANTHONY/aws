'use client';

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getInitialTheme, getTheme, applyTheme, type Theme } from './theme';
import { InkTransition, type Point } from './inkTransition';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: (point?: Point) => void;
  navigate: (href: string, point?: Point) => void;
  isReady: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggleTheme: () => {},
  navigate: () => {},
  isReady: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>('dark');
  const [isReady, setIsReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const transitionRef = useRef<InkTransition | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Sync initial theme from localStorage/DOM
      const initial = getInitialTheme();
      setTheme(initial);
      applyTheme(initial);
      setIsReady(true);
    }, 0);

    // Initialize InkTransition on canvas
    if (canvasRef.current) {
      transitionRef.current = new InkTransition(canvasRef.current, null);
    }

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: Theme }>;
      if (customEvent.detail?.theme) {
        setTheme(customEvent.detail.theme);
      } else {
        setTheme(getTheme());
      }
    };

    window.addEventListener('aws-sbg-theme-change', handleThemeChange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('aws-sbg-theme-change', handleThemeChange);
      transitionRef.current?.destroy();
      transitionRef.current = null;
    };
  }, []);

  const toggleTheme = useCallback((point?: Point) => {
    if (transitionRef.current) {
      transitionRef.current.toggle(point);
    } else {
      const next = getTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      setTheme(next);
    }
  }, []);

  const navigate = useCallback((href: string, point?: Point) => {
    const doRoutePush = (targetUrl: string) => {
      let target = targetUrl;
      if (target.startsWith('/aws/')) {
        target = target.slice(4);
      } else if (target === '/aws') {
        target = '/';
      }
      router.push(target);
    };

    if (transitionRef.current && transitionRef.current.canAnimatePage()) {
      transitionRef.current.transitionPage(href, doRoutePush, point);
    } else {
      doRoutePush(href);
    }
  }, [router]);

  // Recapture page texture whenever the route path changes
  useEffect(() => {
    if (isReady && transitionRef.current) {
      transitionRef.current.scheduleCapture(200);
    }
  }, [pathname, isReady]);

  // Global click interception for all internal links to trigger ink bleed transition
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;

      const rawHref = anchor.getAttribute('href');
      if (!rawHref) return;

      // Ignore external or non-nav links
      if (
        rawHref.startsWith('http://') ||
        rawHref.startsWith('https://') ||
        rawHref.startsWith('//') ||
        rawHref.startsWith('#') ||
        rawHref.startsWith('mailto:') ||
        rawHref.startsWith('tel:') ||
        anchor.target === '_blank' ||
        anchor.hasAttribute('download')
      ) {
        return;
      }

      let cleanHref = rawHref.split('?')[0].split('#')[0];
      if (cleanHref.startsWith('/aws/')) {
        cleanHref = cleanHref.slice(4);
      } else if (cleanHref === '/aws') {
        cleanHref = '/';
      }
      if (cleanHref.endsWith('/') && cleanHref.length > 1) {
        cleanHref = cleanHref.slice(0, -1);
      }

      let currentPath = pathname || '/';
      if (currentPath.endsWith('/') && currentPath.length > 1) {
        currentPath = currentPath.slice(0, -1);
      }

      if (cleanHref === currentPath) return;

      if (transitionRef.current && transitionRef.current.canAnimatePage()) {
        e.preventDefault();
        navigate(rawHref, { x: e.clientX, y: e.clientY });
      }
    };

    document.addEventListener('click', handleDocumentClick, { capture: true });
    return () => document.removeEventListener('click', handleDocumentClick, { capture: true });
  }, [navigate, pathname]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, navigate, isReady }}>
      {children}
      {/* Ink Canvas overlay (non-interactive, fixed over viewport, below modals/intros) */}
      <canvas
        ref={canvasRef}
        className="ink-canvas"
        aria-hidden="true"
        data-html2canvas-ignore=""
      />
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
