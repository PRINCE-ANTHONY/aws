import gsap from 'gsap';
import { capturePage, layoutKey, renderScale } from './capture';
import { inkParams } from './params';
import { InkRenderer, type InkFrame, type InkSource } from './renderer';
import { applyTheme, getTheme, otherTheme, type Theme } from './theme';

export interface Point {
  x: number;
  y: number;
}

const EASE = 'power3.out';
const FADE_OUT = 0.15;
const RESIZE_DEBOUNCE_MS = 250;
const CSS_FADE_S = 0.45;

export const SPREAD = { growth: 0.7, cleanupFrom: 0.45, cleanupReach: 0.4, cleanupPow: 2 };

type ActiveFrame = Omit<InkFrame, 'progress' | 'radius' | 'time' | 'cleanup'>;

export class InkTransition {
  private readonly renderer: InkRenderer | null;
  private readonly toggleButton: HTMLElement | null;
  private readonly state = { progress: 0, time: 0 };
  private tween: gsap.core.Tween | null = null;
  private fade: gsap.core.Tween | null = null;
  private frame: ActiveFrame | null = null;
  private cssFadeTimer = 0;

  private captureGen = 0;
  private capturing = false;
  private captureQueued = false;
  private resizeTimer = 0;
  private destroyed = false;
  private resizeObserver: ResizeObserver | null = null;
  private handleResizeBound: () => void;
  private handleReducedMotionBound: () => void;
  private mediaQuery: MediaQueryList | null = null;

  constructor(canvas: HTMLCanvasElement, toggleButton?: HTMLElement | null, opts: { webgl?: boolean } = {}) {
    this.toggleButton = toggleButton ?? null;

    this.renderer = opts.webgl === false ? null : InkRenderer.create(canvas);
    if (!this.renderer) {
      if (typeof document !== 'undefined') {
        document.documentElement.dataset.ink = 'css';
      }
    } else {
      if (typeof document !== 'undefined') {
        document.documentElement.dataset.ink = 'webgl';
      }
      this.renderer.resize(renderScale());
      this.renderer.watchContext(
        () => this.cancel(),
        () => this.scheduleCapture(0),
      );
    }

    this.handleResizeBound = () => {
      this.renderer?.resize(renderScale());
      if (this.frame) this.draw();
      this.scheduleCapture(RESIZE_DEBOUNCE_MS);
    };

    this.handleReducedMotionBound = () => {
      this.scheduleCapture(0);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.handleResizeBound);
      this.mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.mediaQuery.addEventListener('change', this.handleReducedMotionBound);

      if (typeof ResizeObserver !== 'undefined' && document.body) {
        this.resizeObserver = new ResizeObserver(() => this.scheduleCapture(RESIZE_DEBOUNCE_MS));
        this.resizeObserver.observe(document.body);
      }

      if (document.fonts?.ready) {
        void document.fonts.ready.then(() => {
          if (!this.destroyed) this.scheduleCapture(0);
        });
      } else {
        this.scheduleCapture(100);
      }
    }
  }

  get isWebGL(): boolean {
    return this.renderer !== null;
  }

  get isAnimating(): boolean {
    return this.frame !== null;
  }

  canAnimatePage(): boolean {
    if (this.destroyed) return false;
    const renderer = this.renderer;
    if (!renderer || renderer.isLost) return false;
    if (this.mediaQuery?.matches ?? false) return false;
    return renderer.hasTexture(getTheme());
  }

  transitionPage(href: string, routerPush: (url: string) => void, point?: Point): void {
    if (this.destroyed) {
      routerPush(href);
      return;
    }

    const renderer = this.renderer;
    const scale = renderScale();
    const reducedMotion = this.mediaQuery?.matches ?? false;
    const current = getTheme();

    if (!renderer || renderer.isLost || reducedMotion || !renderer.hasTexture(current)) {
      routerPush(href);
      if (renderer && !reducedMotion) this.scheduleCapture(0);
      return;
    }

    this.cancel();

    const center = point ?? {
      x: typeof window !== 'undefined' ? window.innerWidth / 2 : 400,
      y: typeof window !== 'undefined' ? window.innerHeight / 2 : 300,
    };
    const maxDist = farthestCorner(center);
    const frameSeed = randomSeed();
    const scrollX = typeof window !== 'undefined' ? window.scrollX : 0;
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;

    this.frame = {
      mode: 1,
      from: current,
      to: current,
      center,
      maxDist,
      seed: frameSeed,
      scrollX,
      scrollY,
    };
    this.state.progress = 0;
    this.state.time = 0;

    renderer.resize(scale);
    this.draw();

    gsap.set(renderer.canvas, { opacity: 1 });
    renderer.canvas.classList.add('is-active');

    // Perform page navigation underneath
    routerPush(href);

    const duration = 0.75;
    this.tween = gsap.to(this.state, {
      progress: 1,
      duration,
      ease: EASE,
      onUpdate: () => {
        this.state.time = this.tween?.time() ?? 0;
        this.draw();
      },
      onComplete: () => {
        this.finish();
        this.scheduleCapture(150);
      },
    });
    this.tween.timeScale(inkParams.timeScale);
  }

  toggle(point?: Point): void {
    if (this.destroyed) return;
    const to = otherTheme(getTheme());
    const renderer = this.renderer;
    const scale = renderScale();
    const key = layoutKey(scale);
    const interrupting = this.frame !== null;
    const reducedMotion = this.mediaQuery?.matches ?? false;

    const canAnimate =
      renderer !== null &&
      !renderer.isLost &&
      !reducedMotion &&
      renderer.hasValid(to, key) &&
      (interrupting || renderer.hasValid(getTheme(), key));

    if (!canAnimate || !renderer) {
      this.cancel();
      this.crossFade(to);
      if (renderer && !reducedMotion) this.scheduleCapture(0);
      return;
    }

    let from: InkSource = getTheme();
    if (interrupting) {
      this.tween?.kill();
      this.fade?.kill();
      this.tween = this.fade = null;
      renderer.resize(scale);
      const frozen = this.currentFrame();
      from = frozen && renderer.freeze(frozen) ? 'composite' : getTheme();
    }

    const center = point ?? this.toggleCenter();
    const maxDist = farthestCorner(center);
    const frameSeed = randomSeed();
    this.frame = { from, to, center, maxDist, seed: frameSeed };
    this.state.progress = 0;
    this.state.time = 0;

    renderer.resize(scale);
    this.draw();

    gsap.set(renderer.canvas, { opacity: 1 });
    renderer.canvas.classList.add('is-active');
    applyTheme(to, this.toggleButton);

    const duration = inkParams.duration;

    this.tween = gsap.to(this.state, {
      progress: 1,
      duration,
      ease: EASE,
      onUpdate: () => {
        this.state.time = this.tween?.time() ?? 0;
        this.draw();
      },
      onComplete: () => this.finish(),
    });
    this.tween.timeScale(inkParams.timeScale);
  }

  destroy(): void {
    this.destroyed = true;
    this.cancel();
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResizeBound);
      this.mediaQuery?.removeEventListener('change', this.handleReducedMotionBound);
    }
    this.resizeObserver?.disconnect();
    this.renderer?.destroy();
  }

  private currentFrame(): InkFrame | null {
    if (!this.frame) return null;
    const { progress, time } = this.state;
    const { maxDist } = this.frame;
    const duration = this.frame.mode === 1 ? 0.75 : inkParams.duration;
    const linear = Math.min(1, time / duration);
    const ramp = Math.max(0, (linear - SPREAD.cleanupFrom) / (1 - SPREAD.cleanupFrom));
    const cleanup =
      ramp ** SPREAD.cleanupPow * maxDist * SPREAD.cleanupReach + Math.max(0, (linear - 0.97) / 0.03) * maxDist;
    return { ...this.frame, progress, time, radius: progress * maxDist * SPREAD.growth, cleanup };
  }

  private draw(): void {
    const frame = this.currentFrame();
    if (this.renderer && frame) this.renderer.draw(frame);
  }

  private finish(): void {
    const canvas = this.renderer?.canvas;
    this.tween = null;
    if (!canvas) return;
    this.fade = gsap
      .to(canvas, { opacity: 0, duration: FADE_OUT, ease: 'none', onComplete: () => this.hide() })
      .timeScale(inkParams.timeScale);
  }

  private hide(): void {
    this.fade = null;
    this.frame = null;
    this.renderer?.canvas.classList.remove('is-active');
    if (this.captureQueued) this.scheduleCapture(0);
  }

  private cancel(): void {
    if (!this.frame) return;
    this.tween?.kill();
    this.fade?.kill();
    this.tween = null;
    this.hide();
  }

  private crossFade(to: Theme): void {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.classList.add('theme-fade');
    root.style.setProperty('--theme-fade', `${CSS_FADE_S}s`);
    applyTheme(to, this.toggleButton);

    window.clearTimeout(this.cssFadeTimer);
    this.cssFadeTimer = window.setTimeout(() => {
      root.classList.remove('theme-fade');
      if (this.captureQueued) this.scheduleCapture(0);
    }, CSS_FADE_S * 1000 + 50);
  }

  private toggleCenter(): Point {
    const r = this.toggleButton?.getBoundingClientRect();
    if (!r || typeof window === 'undefined') return { x: 400, y: 300 };
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }

  scheduleCapture(delay: number): void {
    if (typeof window === 'undefined' || this.destroyed) return;
    window.clearTimeout(this.resizeTimer);
    this.resizeTimer = window.setTimeout(() => void this.captureAll(), delay);
  }

  private async captureAll(): Promise<void> {
    const renderer = this.renderer;
    if (!renderer || renderer.isLost || (this.mediaQuery?.matches ?? false) || this.destroyed) return;

    if (this.capturing || this.frame || (typeof document !== 'undefined' && document.documentElement.classList.contains('theme-fade'))) {
      this.captureQueued = true;
      return;
    }

    const scale = renderScale();
    const key = layoutKey(scale);
    const current = getTheme();
    const themes: Theme[] = [current, otherTheme(current)].filter((t) => !renderer.hasValid(t, key));
    this.captureQueued = false;
    if (themes.length === 0) return;

    const gen = ++this.captureGen;
    this.capturing = true;
    try {
      for (const theme of themes) {
        const snap = await capturePage(theme, scale, renderer.maxTextureSize);
        if (gen !== this.captureGen || this.destroyed) return;
        renderer.upload(snap);
        console.log(`[ink] captured ${theme} snapshot in ${snap.ms.toFixed(0)}ms (${snap.canvas.width}x${snap.canvas.height})`);
      }
    } catch (err) {
      console.error('[ink] capture error:', err);
    } finally {
      this.capturing = false;
    }
    if (this.captureQueued && !this.destroyed) this.scheduleCapture(RESIZE_DEBOUNCE_MS);
  }
}

function farthestCorner(p: Point): number {
  if (typeof document === 'undefined') return 1000;
  const w = document.documentElement.clientWidth;
  const h = document.documentElement.clientHeight;
  return Math.max(Math.hypot(p.x, p.y), Math.hypot(w - p.x, p.y), Math.hypot(p.x, h - p.y), Math.hypot(w - p.x, h - p.y)) + 4;
}

function randomSeed(): InkFrame['seed'] {
  return { x: Math.random() * 64 - 32, y: Math.random() * 64 - 32, angle: Math.random() * Math.PI * 2 };
}
