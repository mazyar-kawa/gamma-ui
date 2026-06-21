"use client"

import { useEffect, useRef } from "react"
import type { ReactNode } from "react"

/**
 * AuroraGlass
 * A shimmering background of colorful glass tiles, rendered with raw WebGL2.
 *
 * A handful of broad directional ripple layers sweep across the whole tile
 * lattice in one continuous field (sampled per-fragment in grid-space), so
 * the highlight band flows smoothly from tile to tile rather than each tile
 * animating independently. Each tile's rounded-rect bevel normal warps the
 * sample point near its edges, giving a refraction-like bend as the band
 * crosses every tile.
 *
 * Props
 * ----------------------------------------------------------------------
 * width            string | number   "100%"     Container width
 * height           string | number   "100%"     Container height
 * className        string            ""         Additional CSS classes
 * children         ReactNode         undefined  Content rendered above the effect
 * speed            number            1          Animation speed multiplier (0-3)
 * tileDensity      number            4          Tiles across the surface (1-16)
 * rippleLayers     number            6          Stacked ripple layers (1-8)
 * warpStrength     number            0.33       Per-tile inverse-distance warp (0-0.6)
 * bandSharpness    number            3          Highlight peak sharpness (0.5-10)
 * chromaticSpread  number            0          Per-channel separation (0-1)
 * colorA           string            "#1E00FF"  Gradient stop (deep color)
 * colorB           string            "#D765E6"  Gradient stop (bright color)
 * backgroundColor  string            "#FFFFFF"  Fill where the field is dark
 * opacity          number            1          Master alpha (0-1)
 * dpr              number            1.5        Max device pixel ratio (1-3)
 *
 * Usage
 *   <AuroraGlass colorA="#1E00FF" colorB="#D765E6" tileDensity={6}>
 *     <h1>Your content, rendered above the effect</h1>
 *   </AuroraGlass>
 */

const MAX_RIPPLE_LAYERS = 8

const VERTEX_SRC = `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const FRAGMENT_SRC = `#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_speed;
uniform float u_tileDensity;
uniform int u_rippleLayers;
uniform float u_warpStrength;
uniform float u_bandSharpness;
uniform float u_chromaticSpread;
uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform vec3 u_backgroundColor;
uniform float u_opacity;

out vec4 fragColor;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec2 hash22(vec2 p) {
  float n = hash21(p);
  float n2 = hash21(p + 17.13);
  return vec2(n, n2);
}

float sdRoundRect(vec2 p, vec2 halfSize, float r) {
  vec2 q = abs(p) - halfSize + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

// Height field for the tile surface: flat in the middle, with a wide
// rounded bevel that rises toward the border -- like a slightly domed pane
// of glass set in a frame. d is the rounded-rect SDF (negative inside, 0 at
// the border). Near the border height is highest; deep inside it flattens.
float tileHeight(float d, float r) {
  float bevelWidth = r * 4.0;
  float distFromEdge = clamp(-d / bevelWidth, 0.0, 1.0);
  float bevel = 1.0 - distFromEdge;
  return bevel * bevel * (3.0 - 2.0 * bevel);
}

// One directional ripple band. Layer 0-2 are broad, slow, coherent sweeps
// (the main visible "ribbons"); layers beyond that add progressively finer,
// dimmer secondary detail so increasing rippleLayers enriches the texture
// without diluting the primary bands.
float rippleLayer(vec2 guv, float t, int i) {
  float fi = float(i);
  float dirAngle = 0.55 + fi * 0.7;
  vec2 dir = vec2(cos(dirAngle), sin(dirAngle));
  vec2 perp = vec2(-dir.y, dir.x);

  float freqBase = 0.16 + fract(fi * 0.31) * 0.1;
  float freq = freqBase * (1.0 + fi * 0.22);
  float speedVar = 0.35 + fract(fi * 0.53) * 0.35;
  float phase = fi * 2.7;
  float bow = 1.6 + fract(fi * 0.19) * 1.4;

  float along = dot(guv, dir);
  float across = dot(guv, perp);

  float bend = sin(along * freq + t * speedVar + phase) * bow
             + cos(t * speedVar * 0.5 + phase * 1.3) * 1.2;
  float d = abs(across - bend);

  float sharpness = 6.0 + fi * 1.5;
  float core = exp(-d * d * sharpness);
  float halo = exp(-d * d * 1.1) * 0.15;

  float weight = 1.0 / (1.0 + fi * 0.55);

  return (core + halo) * weight;
}

// Sum of N ripple layers sampled at this grid-space position. The field is
// continuous across the whole grid (not per-tile), so highlights flow
// smoothly from one tile into its neighbor.
float lightField(vec2 guv, float t) {
  float field = 0.0;
  for (int i = 0; i < ${MAX_RIPPLE_LAYERS}; i++) {
    if (i >= u_rippleLayers) break;
    field += rippleLayer(guv, t, i);
  }
  return field;
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  vec2 res = u_resolution;

  // tileDensity = how many tile cells fit across the SHORTER side of the
  // surface, so density reads consistently regardless of aspect ratio.
  float shortSide = min(res.x, res.y);
  float cell = shortSide / max(u_tileDensity, 1.0);
  float gap = cell * 0.06;

  vec2 gridPos = fragCoord / cell;
  vec2 cellId = floor(gridPos);
  vec2 localUv = fract(gridPos) - 0.5;
  vec2 localPx = localUv * cell;

  float tileHalf = (cell - gap) * 0.5;
  float radius = tileHalf * 0.32;

  float d = sdRoundRect(localPx, vec2(tileHalf), radius);

  if (d > 0.0) {
    fragColor = vec4(u_backgroundColor, u_opacity);
    return;
  }

  vec2 rnd = hash22(cellId);

  // --- Always-on ambient bevel shading ---
  // A true 3D surface normal derived from a domed height field, lit by a
  // fixed upper-left studio light. This runs on EVERY tile regardless of
  // the colorful streak, so dark tiles still read as curved glass rather
  // than flat black squares.
  float epsH = 1.2;
  float dCx1 = sdRoundRect(localPx + vec2(epsH, 0.0), vec2(tileHalf), radius);
  float dCx0 = sdRoundRect(localPx - vec2(epsH, 0.0), vec2(tileHalf), radius);
  float dCy1 = sdRoundRect(localPx + vec2(0.0, epsH), vec2(tileHalf), radius);
  float dCy0 = sdRoundRect(localPx - vec2(0.0, epsH), vec2(tileHalf), radius);
  float hR = tileHeight(dCx1, radius);
  float hL = tileHeight(dCx0, radius);
  float hU = tileHeight(dCy1, radius);
  float hD = tileHeight(dCy0, radius);
  vec2 heightGrad = vec2(hR - hL, hU - hD) / (2.0 * epsH);
  vec3 surfaceNormal = normalize(vec3(-heightGrad * 4.0, 1.0));

  vec3 lightDir = normalize(vec3(-0.45, 0.55, 0.7));
  vec3 viewDir = vec3(0.0, 0.0, 1.0);
  vec3 halfDir = normalize(lightDir + viewDir);

  float diffuse = max(dot(surfaceNormal, lightDir), 0.0);
  float specular = pow(max(dot(surfaceNormal, halfDir), 0.0), 14.0);

  // Tinted by the background color rather than neutral gray, so it reads as
  // a hint of glass curvature rather than a separate plastic/keycap layer.
  vec3 ambientBevel = u_backgroundColor * diffuse * 0.16
                     + mix(u_backgroundColor, vec3(0.7, 0.65, 0.78), 0.5) * specular * 0.22;

  // Bevel normal from the rounded-rect SDF gradient, used only to bend
  // (warp) the light sample point near tile edges -- a refraction cue.
  float eps = 1.5;
  float dx = sdRoundRect(localPx + vec2(eps, 0.0), vec2(tileHalf), radius)
           - sdRoundRect(localPx - vec2(eps, 0.0), vec2(tileHalf), radius);
  float dy = sdRoundRect(localPx + vec2(0.0, eps), vec2(tileHalf), radius)
           - sdRoundRect(localPx - vec2(0.0, eps), vec2(tileHalf), radius);
  vec2 gradDir = vec2(dx, dy) / (2.0 * eps);
  float rim = smoothstep(-radius * 1.6, 0.0, d);

  // Per-tile inverse-distance warp: the closer to the tile edge, the more
  // the sample point bends, like light refracting through curved glass.
  float distFromCenter = length(localPx) / max(tileHalf, 0.001);
  float invDist = 1.0 / max(1.0 - distFromCenter * 0.85, 0.15);
  vec2 warpOffset = gradDir * rim * u_warpStrength * invDist * 0.4;

  float t = u_time * u_speed;
  vec2 sampleUv = gridPos + warpOffset;

  float fieldR = lightField(sampleUv + vec2(u_chromaticSpread * 0.6, 0.0), t);
  float fieldG = lightField(sampleUv, t);
  float fieldB = lightField(sampleUv - vec2(u_chromaticSpread * 0.6, 0.0), t);

  float shaped = pow(clamp(fieldG, 0.0, 1.6), u_bandSharpness);
  float shapedR = pow(clamp(fieldR, 0.0, 1.6), u_bandSharpness);
  float shapedB = pow(clamp(fieldB, 0.0, 1.6), u_bandSharpness);

  float variance = mix(0.75, 1.15, rnd.y);
  shaped *= variance;
  shapedR *= variance;
  shapedB *= variance;

  vec3 gradColor = mix(u_colorA, u_colorB, clamp(shaped, 0.0, 1.0));

  vec3 lit = gradColor * shaped;
  float chromaMix = clamp(u_chromaticSpread * 3.0, 0.0, 1.0);
  lit.r = mix(lit.r, gradColor.r * shapedR, chromaMix);
  lit.b = mix(lit.b, gradColor.b * shapedB, chromaMix);

  vec3 color = u_backgroundColor * 0.03 + ambientBevel + lit;

  // Soft recessed contact shadow right at the rounded border
  float innerEdge = smoothstep(-2.5, 0.0, d);
  color *= (1.0 - innerEdge * 0.55);

  fragColor = vec4(color, u_opacity);
}
`

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string
): WebGLShader {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error("Shader compile error: " + info)
  }
  return shader
}

function createProgram(
  gl: WebGL2RenderingContext,
  vertexSrc: string,
  fragmentSrc: string
): WebGLProgram {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vertexSrc)
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSrc)
  const program = gl.createProgram()!
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program)
    gl.deleteProgram(program)
    throw new Error("Program link error: " + info)
  }
  gl.deleteShader(vs)
  gl.deleteShader(fs)
  return program
}

function hexToRgb(hex: string) {
  const clean = (hex || "#000000").replace("#", "")
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean
  const bigint = parseInt(full, 16) || 0
  const r = ((bigint >> 16) & 255) / 255
  const g = ((bigint >> 8) & 255) / 255
  const b = (bigint & 255) / 255
  return [r, g, b]
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

interface AuroraGlassProps {
  width?: string | number
  height?: string | number
  className?: string
  children?: ReactNode
  speed?: number
  tileDensity?: number
  rippleLayers?: number
  warpStrength?: number
  bandSharpness?: number
  chromaticSpread?: number
  colorA?: string
  colorB?: string
  backgroundColor?: string
  opacity?: number
  dpr?: number
}

export default function AuroraGlass({
  width = "100%",
  height = "100%",
  className = "",
  children,
  speed = 1,
  tileDensity = 4,
  rippleLayers = 6,
  warpStrength = 0.33,
  bandSharpness = 3,
  chromaticSpread = 0,
  colorA = "#1E00FF",
  colorB = "#D765E6",
  backgroundColor = "#FFFFFF",
  opacity = 1,
  dpr = 1.5,
}: AuroraGlassProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef(0)

  // Keep the latest prop values in a ref so the render loop (started once)
  // always reads current values without needing to be torn down and
  // rebuilt on every prop change.
  interface PropsSnapshot {
    speed: number
    tileDensity: number
    rippleLayers: number
    warpStrength: number
    bandSharpness: number
    chromaticSpread: number
    colorA: string
    colorB: string
    backgroundColor: string
    opacity: number
  }
  const propsRef = useRef<PropsSnapshot>({} as PropsSnapshot)
  propsRef.current = {
    speed,
    tileDensity: clamp(tileDensity, 1, 16),
    rippleLayers: Math.round(clamp(rippleLayers, 1, MAX_RIPPLE_LAYERS)),
    warpStrength: clamp(warpStrength, 0, 0.6),
    bandSharpness: clamp(bandSharpness, 0.5, 10),
    chromaticSpread: clamp(chromaticSpread, 0, 1),
    colorA,
    colorB,
    backgroundColor,
    opacity: clamp(opacity, 0, 1),
  }

  const dprRef = useRef(clamp(dpr, 1, 3))
  dprRef.current = clamp(dpr, 1, 3)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl2", { antialias: true, alpha: true })
    if (!gl) {
      console.warn(
        "WebGL2 is not supported in this browser; AuroraGlass cannot render."
      )
      return
    }

    let program: WebGLProgram
    try {
      program = createProgram(gl, VERTEX_SRC, FRAGMENT_SRC)
    } catch (err) {
      console.error(err)
      return
    }
    gl.useProgram(program)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    )
    const positionLoc = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(positionLoc)
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)

    const u: Record<string, WebGLUniformLocation | null> = {}
    ;[
      "u_resolution",
      "u_time",
      "u_speed",
      "u_tileDensity",
      "u_rippleLayers",
      "u_warpStrength",
      "u_bandSharpness",
      "u_chromaticSpread",
      "u_colorA",
      "u_colorB",
      "u_backgroundColor",
      "u_opacity",
    ].forEach((name) => {
      u[name] = gl.getUniformLocation(program, name)
    })

    let w = 0
    let h = 0

    function resize() {
      const cv = canvas!
      const parent = cv.parentElement
      const rect = parent
        ? parent.getBoundingClientRect()
        : cv.getBoundingClientRect()
      const ratio = dprRef.current
      w = Math.max(1, Math.floor(rect.width * ratio))
      h = Math.max(1, Math.floor(rect.height * ratio))
      if (cv.width !== w || cv.height !== h) {
        cv.width = w
        cv.height = h
      }
      gl!.viewport(0, 0, w, h)
    }

    const resizeObserver = new ResizeObserver(resize)
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement)
    resize()

    const start = performance.now()

    function frame(now: number) {
      const t = (now - start) / 1000
      const p = propsRef.current
      const g = gl!

      g.useProgram(program)
      g.clearColor(0, 0, 0, 0)
      g.clear(g.COLOR_BUFFER_BIT)

      g.uniform2f(u.u_resolution, w, h)
      g.uniform1f(u.u_time, t)
      g.uniform1f(u.u_speed, p.speed)
      g.uniform1f(u.u_tileDensity, p.tileDensity)
      g.uniform1i(u.u_rippleLayers, p.rippleLayers)
      g.uniform1f(u.u_warpStrength, p.warpStrength)
      g.uniform1f(u.u_bandSharpness, p.bandSharpness)
      g.uniform1f(u.u_chromaticSpread, p.chromaticSpread)
      g.uniform3fv(u.u_colorA, hexToRgb(p.colorA))
      g.uniform3fv(u.u_colorB, hexToRgb(p.colorB))
      g.uniform3fv(u.u_backgroundColor, hexToRgb(p.backgroundColor))
      g.uniform1f(u.u_opacity, p.opacity)

      g.drawArrays(g.TRIANGLES, 0, 3)
      rafRef.current = requestAnimationFrame(frame)
    }

    rafRef.current = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(rafRef.current)
      resizeObserver.disconnect()
      gl.deleteProgram(program)
      gl.deleteBuffer(positionBuffer)
    }
    // Render loop is started once; per-frame values are read from propsRef
    // and dprRef so prop changes don't require tearing down the GL context.
  }, [])

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width,
        height,
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
      {children != null && (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {children}
        </div>
      )}
    </div>
  )
}
