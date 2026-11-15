import type { Theme } from './theme';

export interface Snapshot {
  theme: Theme;
  canvas: HTMLCanvasElement;
  scale: number;
  key: string;
  ms: number;
}

export const BACKGROUND: Record<Theme, string> = {
  dark: '#07080a',
  light: '#f7f6f2',
};

const isCoarsePointer = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

export function renderScale(): number {
  if (typeof window === 'undefined') return 1;
  const cap = isCoarsePointer() ? 1.5 : 2;
  return Math.min(window.devicePixelRatio || 1, cap);
}

export function documentSize(): { width: number; height: number } {
  if (typeof document === 'undefined') return { width: 1200, height: 800 };
  const el = document.documentElement;
  return { width: el.clientWidth, height: Math.max(el.scrollHeight, el.clientHeight) };
}

export function layoutKey(scale: number): string {
  const { width, height } = documentSize();
  return `${width}x${height}@${scale}`;
}

export function convertOklabToRgba(str: string): string {
  if (!str || typeof str !== 'string') return str;
  if (
    !str.includes('oklab') &&
    !str.includes('oklch') &&
    !str.includes('lab(') &&
    !str.includes('lch(') &&
    !str.includes('color(')
  ) {
    return str;
  }

  const toSRGB = (c: number): number => {
    c = Math.max(0, Math.min(1, c));
    return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  };

  // 1. oklab
  let out = str.replace(
    /oklab\(\s*([0-9.eE+-]+%?)\s+([0-9.eE+-]+%?)\s+([0-9.eE+-]+%?)(?:\s*\/\s*([0-9.%eE+-]+))?\s*\)/gi,
    (_match, lStr, aStr, bStr, alphaStr) => {
      const L = lStr.endsWith('%') ? parseFloat(lStr) / 100 : parseFloat(lStr);
      const a = aStr.endsWith('%') ? (parseFloat(aStr) * 0.4) / 100 : parseFloat(aStr);
      const b = bStr.endsWith('%') ? (parseFloat(bStr) * 0.4) / 100 : parseFloat(bStr);
      let alpha = 1;
      if (alphaStr) {
        alpha = alphaStr.endsWith('%') ? parseFloat(alphaStr) / 100 : parseFloat(alphaStr);
      }

      const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
      const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
      const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

      const l = l_ * l_ * l_;
      const m = m_ * m_ * m_;
      const s = s_ * s_ * s_;

      const r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
      const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
      const bl = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

      const R = Math.round(toSRGB(r) * 255);
      const G = Math.round(toSRGB(g) * 255);
      const B = Math.round(toSRGB(bl) * 255);

      return alpha < 1 ? `rgba(${R}, ${G}, ${B}, ${alpha})` : `rgb(${R}, ${G}, ${B})`;
    }
  );

  // 2. oklch
  out = out.replace(
    /oklch\(\s*([0-9.eE+-]+%?)\s+([0-9.eE+-]+%?)\s+([0-9.eE+-]+(?:deg|rad|turn)?)(?:\s*\/\s*([0-9.%eE+-]+))?\s*\)/gi,
    (_match, lStr, cStr, hStr, alphaStr) => {
      const L = lStr.endsWith('%') ? parseFloat(lStr) / 100 : parseFloat(lStr);
      const C = cStr.endsWith('%') ? (parseFloat(cStr) * 0.4) / 100 : parseFloat(cStr);
      let hDeg = parseFloat(hStr);
      if (hStr.endsWith('rad')) hDeg = (hDeg * 180) / Math.PI;
      else if (hStr.endsWith('turn')) hDeg = hDeg * 360;
      const hRad = (hDeg * Math.PI) / 180;
      const a = C * Math.cos(hRad);
      const b = C * Math.sin(hRad);
      let alpha = 1;
      if (alphaStr) {
        alpha = alphaStr.endsWith('%') ? parseFloat(alphaStr) / 100 : parseFloat(alphaStr);
      }

      const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
      const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
      const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

      const l = l_ * l_ * l_;
      const m = m_ * m_ * m_;
      const s = s_ * s_ * s_;

      const r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
      const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
      const bl = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

      const R = Math.round(toSRGB(r) * 255);
      const G = Math.round(toSRGB(g) * 255);
      const B = Math.round(toSRGB(bl) * 255);

      return alpha < 1 ? `rgba(${R}, ${G}, ${B}, ${alpha})` : `rgb(${R}, ${G}, ${B})`;
    }
  );

  // 3. CIE lab(L a b [/ alpha])
  out = out.replace(
    /(?<!ok)lab\(\s*([0-9.eE+-]+%?)\s+([0-9.eE+-]+%?)\s+([0-9.eE+-]+%?)(?:\s*\/\s*([0-9.%eE+-]+))?\s*\)/gi,
    (_match, lStr, aStr, bStr, alphaStr) => {
      const L = parseFloat(lStr);
      const a = parseFloat(aStr);
      const b = parseFloat(bStr);
      let alpha = 1;
      if (alphaStr) {
        alpha = alphaStr.endsWith('%') ? parseFloat(alphaStr) / 100 : parseFloat(alphaStr);
      }

      const y = (L + 16) / 116;
      const x = a / 500 + y;
      const z = y - b / 200;

      const fn = (t: number) => (t ** 3 > 0.008856 ? t ** 3 : (t - 16 / 116) / 7.787);

      const X = 0.95047 * fn(x);
      const Y = 1.00000 * fn(y);
      const Z = 1.08883 * fn(z);

      const r = +3.2406 * X - 1.5372 * Y - 0.4986 * Z;
      const g = -0.9689 * X + 1.8758 * Y + 0.0415 * Z;
      const bl = +0.0557 * X - 0.2040 * Y + 1.0570 * Z;

      const R = Math.round(toSRGB(r) * 255);
      const G = Math.round(toSRGB(g) * 255);
      const B = Math.round(toSRGB(bl) * 255);

      return alpha < 1 ? `rgba(${R}, ${G}, ${B}, ${alpha})` : `rgb(${R}, ${G}, ${B})`;
    }
  );

  // 4. CIE lch(L C H [/ alpha])
  out = out.replace(
    /(?<!ok)lch\(\s*([0-9.eE+-]+%?)\s+([0-9.eE+-]+%?)\s+([0-9.eE+-]+(?:deg|rad|turn)?)(?:\s*\/\s*([0-9.%eE+-]+))?\s*\)/gi,
    (_match, lStr, cStr, hStr, alphaStr) => {
      const L = parseFloat(lStr);
      const C = parseFloat(cStr);
      let hDeg = parseFloat(hStr);
      if (hStr.endsWith('rad')) hDeg = (hDeg * 180) / Math.PI;
      else if (hStr.endsWith('turn')) hDeg = hDeg * 360;
      const hRad = (hDeg * Math.PI) / 180;
      const a = C * Math.cos(hRad);
      const b = C * Math.sin(hRad);
      let alpha = 1;
      if (alphaStr) {
        alpha = alphaStr.endsWith('%') ? parseFloat(alphaStr) / 100 : parseFloat(alphaStr);
      }

      const y = (L + 16) / 116;
      const x = a / 500 + y;
      const z = y - b / 200;

      const fn = (t: number) => (t ** 3 > 0.008856 ? t ** 3 : (t - 16 / 116) / 7.787);

      const X = 0.95047 * fn(x);
      const Y = 1.00000 * fn(y);
      const Z = 1.08883 * fn(z);

      const r = +3.2406 * X - 1.5372 * Y - 0.4986 * Z;
      const g = -0.9689 * X + 1.8758 * Y + 0.0415 * Z;
      const bl = +0.0557 * X - 0.2040 * Y + 1.0570 * Z;

      const R = Math.round(toSRGB(r) * 255);
      const G = Math.round(toSRGB(g) * 255);
      const B = Math.round(toSRGB(bl) * 255);

      return alpha < 1 ? `rgba(${R}, ${G}, ${B}, ${alpha})` : `rgb(${R}, ${G}, ${B})`;
    }
  );

  // 5. color(srgb r g b [/ alpha])
  out = out.replace(
    /color\(srgb\s+([0-9.eE+-]+)\s+([0-9.eE+-]+)\s+([0-9.eE+-]+)(?:\s*\/\s*([0-9.%eE+-]+))?\s*\)/gi,
    (_match, rStr, gStr, bStr, aStr) => {
      const R = Math.round(Math.max(0, Math.min(1, parseFloat(rStr))) * 255);
      const G = Math.round(Math.max(0, Math.min(1, parseFloat(gStr))) * 255);
      const B = Math.round(Math.max(0, Math.min(1, parseFloat(bStr))) * 255);
      const A = aStr ? (aStr.endsWith('%') ? parseFloat(aStr) / 100 : parseFloat(aStr)) : 1;
      return A < 1 ? `rgba(${R}, ${G}, ${B}, ${A})` : `rgb(${R}, ${G}, ${B})`;
    }
  );

  return out;
}

export async function capturePage(theme: Theme, scale: number, maxTextureSize: number): Promise<Snapshot> {
  const t0 = performance.now();
  const key = layoutKey(scale);
  const { width, height } = documentSize();

  const safeScale = Math.min(scale, maxTextureSize / width, maxTextureSize / height);

  // Wrap window.getComputedStyle to ensure any oklab/oklch colors from Tailwind v4
  // are converted to rgb/rgba before html2canvas tries to parse them
  const origWindowGetComputedStyle = typeof window !== 'undefined' ? window.getComputedStyle : null;

  const wrapComputedStyle = (win: Window) => {
    const orig = win.getComputedStyle;
    win.getComputedStyle = function (el: Element, pseudoElt?: string | null) {
      const cs = orig.call(this, el, pseudoElt);
      const origGetPropertyValue = cs.getPropertyValue.bind(cs);

      return new Proxy(cs, {
        get(target, prop) {
          if (prop === 'getPropertyValue') {
            return (propertyName: string) => {
              const val = origGetPropertyValue(propertyName);
              return convertOklabToRgba(val);
            };
          }
          const val = Reflect.get(target, prop, target);
          if (typeof val === 'string') {
            return convertOklabToRgba(val);
          }
          return typeof val === 'function' ? val.bind(target) : val;
        },
      });
    };
  };

  if (typeof window !== 'undefined') {
    wrapComputedStyle(window);
  }

  try {
    const { default: html2canvas } = await import('html2canvas');
    const canvas = await html2canvas(document.body, {
      scale: safeScale,
      backgroundColor: BACKGROUND[theme],
      x: 0,
      y: 0,
      width,
      height,
      scrollX: 0,
      scrollY: 0,
      windowWidth: width,
      windowHeight: document.documentElement.clientHeight,
      logging: false,
      useCORS: true,
      onclone: (doc) => {
        doc.documentElement.dataset.theme = theme;

        if (doc.defaultView) {
          wrapComputedStyle(doc.defaultView);
        }

        // Hide live toggle so no ghost copy appears on snapshot
        doc.querySelectorAll<HTMLElement>('[data-ink-live]').forEach((el) => {
          el.style.visibility = 'hidden';
        });
        // Also ensure ink canvas itself and ignored overlays are hidden
        doc.querySelectorAll<HTMLElement>('.ink-canvas, [data-html2canvas-ignore]').forEach((el) => {
          el.style.display = 'none';
        });
      },
    });

    return { theme, canvas, scale: safeScale, key, ms: performance.now() - t0 };
  } finally {
    if (typeof window !== 'undefined' && origWindowGetComputedStyle) {
      window.getComputedStyle = origWindowGetComputedStyle;
    }
  }
}
