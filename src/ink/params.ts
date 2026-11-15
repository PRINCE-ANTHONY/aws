import type { Theme } from './theme';

export interface InkParams {
  /** Seconds for the spread (before fade out). Default 1.35s */
  duration: number;
  /** Tendril reach multiplier, 0 = smooth, 1 = natural tendrils */
  tendril: number;
  /** Noise frequency multiplier: lower = bigger organic blobs */
  noiseScale: number;
  /** Frontier half-width in CSS px */
  softness: number;
  /** Speed at which shape evolves during spread */
  drift: number;
  /** Global playback rate */
  timeScale: number;
}

export const inkParams: InkParams = {
  duration: 1.35,
  tendril: 1.0,
  noiseScale: 1.0,
  softness: 1.4,
  drift: 1.0,
  timeScale: 1.0,
};

/** Pigment colour pooled at the frontier, keyed by target theme */
export const RIM_COLOR: Record<Theme, [number, number, number]> = {
  dark: [0.015, 0.015, 0.025], // deep ink pooled at front
  light: [0.98, 0.97, 0.95],   // warm bleach frontier
};

