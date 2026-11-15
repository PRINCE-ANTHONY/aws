export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'aws-sbg-theme';

export function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {}
  return 'dark'; // Dark is default for first-time visitors
}

export function getTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export function otherTheme(theme: Theme): Theme {
  return theme === 'dark' ? 'light' : 'dark';
}

/** Instantly applies theme to DOM, localStorage, and toggle button ARIA */
export function applyTheme(theme: Theme, toggle?: HTMLElement | null): void {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {}
  if (toggle) {
    toggle.setAttribute('aria-pressed', String(theme === 'dark'));
    toggle.setAttribute('data-theme-current', theme);
  }
  // Dispatch custom event for React components that need to sync without re-renders
  window.dispatchEvent(new CustomEvent('aws-sbg-theme-change', { detail: { theme } }));
}

