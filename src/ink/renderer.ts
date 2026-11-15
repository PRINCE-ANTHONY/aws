import type { Snapshot } from './capture';
import type { Theme } from './theme';
import { createProgram, type Program } from './program';
import { createNoiseTexture } from './noiseTexture';
import { inkParams, RIM_COLOR } from './params';
import { FULLSCREEN_VERT, INK_FRAG } from './shaders';

interface ThemeTexture {
  texture: WebGLTexture;
  width: number;
  height: number;
  scale: number;
  key: string;
}

interface CompositeTexture {
  texture: WebGLTexture;
  framebuffer: WebGLFramebuffer;
  width: number;
  height: number;
  scrollX: number;
  scrollY: number;
}

export type InkSource = Theme | 'composite';

export interface InkFrame {
  mode?: 0 | 1;
  from: InkSource;
  to: Theme;
  center: { x: number; y: number };
  progress: number;
  radius: number;
  cleanup: number;
  maxDist: number;
  time: number;
  seed: { x: number; y: number; angle: number };
  scrollX?: number;
  scrollY?: number;
}

interface Sampler {
  texture: WebGLTexture;
  width: number;
  height: number;
  ratio: number;
  offsetX: number;
  offsetY: number;
  flipY: boolean;
}

export class InkRenderer {
  readonly canvas: HTMLCanvasElement;
  readonly maxTextureSize: number;

  private gl: WebGL2RenderingContext;
  private program!: Program;
  private vao!: WebGLVertexArrayObject;
  private noise!: WebGLTexture;
  private textures = new Map<Theme, ThemeTexture>();
  private composites: CompositeTexture[] = [];
  private activeComposite = -1;
  private canvasScale = 1;
  private lost = false;

  static create(canvas: HTMLCanvasElement): InkRenderer | null {
    if (typeof window === 'undefined') return null;
    try {
      const gl = canvas.getContext('webgl2', {
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
        powerPreference: 'high-performance',
      });
      if (!gl) return null;
      return new InkRenderer(canvas, gl);
    } catch (err) {
      console.warn('[InkRenderer] WebGL2 initialization failed:', err);
      return null;
    }
  }

  private constructor(canvas: HTMLCanvasElement, gl: WebGL2RenderingContext) {
    this.canvas = canvas;
    this.gl = gl;
    this.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
    this.init();
  }

  private init(): void {
    const gl = this.gl;
    this.program = createProgram(gl, FULLSCREEN_VERT, INK_FRAG);
    const vao = gl.createVertexArray();
    if (!vao) throw new Error('createVertexArray failed');
    this.vao = vao;
    this.noise = createNoiseTexture(gl);
    this.composites = [];
    this.activeComposite = -1;
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  }

  watchContext(onLost: () => void, onRestored: () => void): void {
    this.canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      this.lost = true;
      this.textures.clear();
      this.composites = [];
      this.activeComposite = -1;
      onLost();
    });
    this.canvas.addEventListener('webglcontextrestored', () => {
      this.lost = false;
      this.init();
      onRestored();
    });
  }

  get isLost(): boolean {
    return this.lost;
  }

  resize(scale: number): void {
    const rect = this.canvas.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width * scale));
    const h = Math.max(1, Math.round(rect.height * scale));
    if (this.canvas.width !== w) this.canvas.width = w;
    if (this.canvas.height !== h) this.canvas.height = h;
    this.canvasScale = rect.width > 0 ? w / rect.width : scale;
  }

  upload(snapshot: Snapshot): void {
    if (this.lost) return;
    const gl = this.gl;
    let entry = this.textures.get(snapshot.theme);
    if (!entry) {
      entry = { texture: this.createTexture(), width: 0, height: 0, scale: 0, key: '' };
      this.textures.set(snapshot.theme, entry);
    }
    gl.bindTexture(gl.TEXTURE_2D, entry.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, snapshot.canvas);
    entry.width = snapshot.canvas.width;
    entry.height = snapshot.canvas.height;
    entry.scale = snapshot.scale;
    entry.key = snapshot.key;
  }

  hasValid(theme: Theme, key: string): boolean {
    return !this.lost && this.textures.get(theme)?.key === key;
  }

  hasTexture(theme: Theme): boolean {
    return !this.lost && this.textures.has(theme);
  }

  freeze(frame: InkFrame): boolean {
    if (this.lost) return false;
    const gl = this.gl;
    const index = this.activeComposite === 0 ? 1 : 0;
    const target = this.ensureComposite(index);
    gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer);
    const ok = this.render(frame);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    if (!ok) return false;
    target.scrollX = window.scrollX;
    target.scrollY = window.scrollY;
    this.activeComposite = index;
    return true;
  }

  draw(frame: InkFrame): void {
    if (this.lost) return;
    this.render(frame);
  }

  destroy(): void {
    this.lost = true;
    const gl = this.gl;
    try {
      this.textures.forEach((t) => gl.deleteTexture(t.texture));
      this.textures.clear();
      this.composites.forEach((c) => {
        gl.deleteTexture(c.texture);
        gl.deleteFramebuffer(c.framebuffer);
      });
      this.composites = [];
      if (this.noise) gl.deleteTexture(this.noise);
      if (this.vao) gl.deleteVertexArray(this.vao);
    } catch {}
  }

  private createTexture(): WebGLTexture {
    const gl = this.gl;
    const texture = gl.createTexture();
    if (!texture) throw new Error('createTexture failed');
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return texture;
  }

  private ensureComposite(index: number): CompositeTexture {
    const gl = this.gl;
    const { width, height } = this.canvas;
    let c = this.composites[index];
    if (!c) {
      const framebuffer = gl.createFramebuffer();
      if (!framebuffer) throw new Error('createFramebuffer failed');
      c = { texture: this.createTexture(), framebuffer, width: 0, height: 0, scrollX: 0, scrollY: 0 };
      this.composites[index] = c;
    }
    if (c.width !== width || c.height !== height) {
      gl.bindTexture(gl.TEXTURE_2D, c.texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.bindFramebuffer(gl.FRAMEBUFFER, c.framebuffer);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, c.texture, 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      c.width = width;
      c.height = height;
    }
    return c;
  }

  private sampler(source: InkSource, frame?: InkFrame): Sampler | null {
    const scrollX = frame?.scrollX ?? (typeof window !== 'undefined' ? window.scrollX : 0);
    const scrollY = frame?.scrollY ?? (typeof window !== 'undefined' ? window.scrollY : 0);

    if (source === 'composite') {
      const c = this.composites[this.activeComposite];
      if (!c) return null;
      return {
        texture: c.texture,
        width: c.width,
        height: c.height,
        ratio: 1,
        offsetX: Math.round((scrollX - c.scrollX) * this.canvasScale),
        offsetY: Math.round((scrollY - c.scrollY) * this.canvasScale),
        flipY: true,
      };
    }
    const t = this.textures.get(source);
    if (!t) return null;
    return {
      texture: t.texture,
      width: t.width,
      height: t.height,
      ratio: t.scale / this.canvasScale,
      offsetX: Math.floor(scrollX * t.scale + 0.5),
      offsetY: Math.floor(scrollY * t.scale + 0.5),
      flipY: false,
    };
  }

  private render(frame: InkFrame): boolean {
    const from = this.sampler(frame.from, frame);
    const to = this.sampler(frame.to, frame);
    if (!from || !to) return false;

    const gl = this.gl;
    const { program, uniform } = this.program;
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.useProgram(program);
    gl.bindVertexArray(this.vao);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, from.texture);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, to.texture);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, this.noise);

    gl.uniform1i(uniform('uFrom'), 0);
    gl.uniform1i(uniform('uTo'), 1);
    gl.uniform1i(uniform('uNoise'), 2);
    gl.uniform1i(uniform('uMode'), frame.mode ?? 0);
    gl.uniform2f(uniform('uFromSize'), from.width, from.height);
    gl.uniform2f(uniform('uToSize'), to.width, to.height);
    gl.uniform4f(uniform('uFromMap'), from.ratio, from.offsetX, from.offsetY, from.flipY ? 1 : 0);
    gl.uniform4f(uniform('uToMap'), to.ratio, to.offsetX, to.offsetY, to.flipY ? 1 : 0);
    gl.uniform1f(uniform('uCanvasScale'), this.canvasScale);
    gl.uniform2f(uniform('uRes'), this.canvas.width, this.canvas.height);
    gl.uniform2f(uniform('uCenter'), frame.center.x, frame.center.y);
    gl.uniform1f(uniform('uRadius'), frame.radius);
    gl.uniform1f(uniform('uCleanup'), frame.cleanup);
    gl.uniform1f(uniform('uTime'), frame.time);
    gl.uniform1f(uniform('uRef'), Math.max(this.canvas.width, this.canvas.height) / this.canvasScale);
    gl.uniform2f(uniform('uSeed'), frame.seed.x, frame.seed.y);
    const cos = Math.cos(frame.seed.angle);
    const sin = Math.sin(frame.seed.angle);
    gl.uniformMatrix2fv(uniform('uSeedRot'), false, [cos, sin, -sin, cos]);

    gl.uniform1f(uniform('uTendril'), inkParams.tendril);
    gl.uniform1f(uniform('uNoiseScale'), inkParams.noiseScale);
    gl.uniform1f(uniform('uSoftness'), inkParams.softness);
    gl.uniform1f(uniform('uDrift'), inkParams.drift);
    const rimColor = frame.mode === 1 ? [1.0, 0.6, 0.0] : RIM_COLOR[frame.to];
    gl.uniform3fv(uniform('uRimColor'), rimColor);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
    return true;
  }
}

