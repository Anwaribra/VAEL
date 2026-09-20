import type { CssVars, Template } from "./types";

/**
 * Materials are painted with CSS gradients and small procedurally generated
 * inline SVGs (data URIs). There are no image files, nothing is fetched, and
 * nothing is AI-generated. Each helper is deterministic, so the same template
 * always produces the same surface.
 */

function svgUrl(svg: string): string {
  return `url("data:image/svg+xml,${encodeURIComponent(svg.replace(/\s+/g, " ").trim())}")`;
}

/** Small seeded PRNG so procedural layers are stable between renders. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n: number) => Math.round(n * 10) / 10;

/* ---------------------------------------------------------------- noise */

const NOISE = svgUrl(`
<svg xmlns="http://www.w3.org/2000/svg" width="260" height="260">
  <filter id="n" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/>
    <feColorMatrix values="0 0 0 0 0.36  0 0 0 0 0.30  0 0 0 0 0.24  0 0 0 0.6 0"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#n)"/>
</svg>`);

/* -------------------------------------------------------------- lattice */

function lattice(accent: string): string {
  return svgUrl(`
<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="${accent}" stroke-width="0.7">
  <rect x="9" y="9" width="26" height="26"/>
  <rect x="9" y="9" width="26" height="26" transform="rotate(45 22 22)"/>
  <circle cx="22" cy="22" r="3"/>
</svg>`);
}

/* ---------------------------------------------------------------- fronds */

function frond(
  x0: number,
  y0: number,
  angleDeg: number,
  len: number,
  curve: number,
  fill: string,
): string {
  const a = (angleDeg * Math.PI) / 180;
  const d = [Math.cos(a), Math.sin(a)];
  const p = [-Math.sin(a), Math.cos(a)];
  const point = (t: number) => [
    x0 + d[0] * len * t + p[0] * curve * len * t * t,
    y0 + d[1] * len * t + p[1] * curve * len * t * t,
  ];
  const tangentDeg = (t: number) =>
    (Math.atan2(
      d[1] * len + p[1] * curve * len * 2 * t,
      d[0] * len + p[0] * curve * len * 2 * t,
    ) *
      180) /
    Math.PI;

  let out = "";
  const steps = 15;
  for (let i = 1; i <= steps; i++) {
    const t = 0.1 + (i / steps) * 0.9;
    const [cx, cy] = point(t);
    const base = tangentDeg(t);
    const ll = len * 0.3 * (1 - t * 0.68);
    const rx = ll / 2;
    const ry = len * 0.032 * (1 - t * 0.3);
    for (const side of [-1, 1]) {
      const ang = base + side * (58 - t * 22);
      const rad = (ang * Math.PI) / 180;
      const mx = cx + Math.cos(rad) * rx;
      const my = cy + Math.sin(rad) * rx;
      out += `<ellipse cx="${f(mx)}" cy="${f(my)}" rx="${f(rx)}" ry="${f(ry)}" transform="rotate(${f(ang)} ${f(mx)} ${f(my)})"/>`;
    }
  }
  const [ex, ey] = point(1);
  const [qx, qy] = point(0.5);
  out += `<path d="M${f(x0)} ${f(y0)} Q${f(qx)} ${f(qy)} ${f(ex)} ${f(ey)}" fill="none" stroke="${fill}" stroke-width="2.2"/>`;
  return out;
}

function leaves(tone: string): string {
  return svgUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 700" preserveAspectRatio="xMidYMid slice">
  <defs><filter id="b" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="2.4"/></filter></defs>
  <g fill="${tone}" filter="url(#b)">
    ${frond(540, -30, 122, 560, 0.22, tone)}
    ${frond(560, 140, 152, 470, 0.28, tone)}
    ${frond(-50, 760, -52, 540, -0.2, tone)}
    ${frond(-40, 560, -22, 380, -0.26, tone)}
  </g>
</svg>`);
}

/* ---------------------------------------------------------------- trees */

function trees(tone: string): string {
  const r = rng(11);
  let out = "";
  const xs = [40, 120, 210, 300, 390, 465];
  xs.forEach((x, i) => {
    const h = 230 + r() * 220;
    const w = 26 + r() * 20;
    const base = 720;
    out += `<path d="M${x} ${base} C${x - w} ${base - h * 0.45}, ${x - w * 0.55} ${base - h * 0.85}, ${x} ${base - h} C${x + w * 0.55} ${base - h * 0.85}, ${x + w} ${base - h * 0.45}, ${x} ${base}Z" opacity="${f(0.55 + (i % 2) * 0.25)}"/>`;
  });
  return svgUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 700" preserveAspectRatio="xMidYMax slice">
  <defs><filter id="b"><feGaussianBlur stdDeviation="1.2"/></filter></defs>
  <g fill="${tone}" filter="url(#b)" transform="translate(0 -20)">${out}</g>
</svg>`);
}

/* ---------------------------------------------------------------- stars */

function stars(tone: string): string {
  const r = rng(7);
  let dots = "";
  for (let i = 0; i < 110; i++) {
    const x = r() * 500;
    const y = r() * 700;
    const big = r() > 0.93;
    const rad = big ? 1.5 + r() : 0.35 + r() * 0.7;
    dots += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rad)}" opacity="${f(0.35 + r() * 0.6)}"/>`;
    if (big) {
      dots += `<path d="M${f(x)} ${f(y - 7)} L${f(x + 1)} ${f(y - 1)} L${f(x + 7)} ${f(y)} L${f(x + 1)} ${f(y + 1)} L${f(x)} ${f(y + 7)} L${f(x - 1)} ${f(y + 1)} L${f(x - 7)} ${f(y)} L${f(x - 1)} ${f(y - 1)}Z" opacity=".55"/>`;
    }
  }
  // A quiet constellation: six hand-placed points joined by a hairline.
  const line: [number, number][] = [
    [96, 120],
    [170, 96],
    [236, 150],
    [300, 128],
    [372, 190],
    [430, 160],
  ];
  const path = line.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
  const marks = line.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.2"/>`).join("");
  return svgUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 700" preserveAspectRatio="xMidYMid slice">
  <g fill="${tone}">${dots}${marks}</g>
  <path d="${path}" fill="none" stroke="${tone}" stroke-width="0.6" opacity="0.45"/>
</svg>`);
}

/* ---------------------------------------------------------------- waves */

function waves(tone: string): string {
  let out = "";
  for (let i = 0; i < 9; i++) {
    const y = 330 + i * 40;
    const amp = 10 + i * 2.4;
    const ph = i * 0.9;
    let d = `M-20 ${y}`;
    for (let x = -20; x <= 540; x += 20) {
      d += ` L${x} ${f(y + Math.sin(x / 42 + ph) * amp)}`;
    }
    out += `<path d="${d}" opacity="${f(0.16 + i * 0.03)}"/>`;
  }
  return svgUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 700" preserveAspectRatio="xMidYMid slice">
  <g fill="none" stroke="${tone}" stroke-width="0.9">${out}</g>
</svg>`);
}

/* ------------------------------------------------------------ public API */

const cache = new Map<string, CssVars>();

/**
 * Everything the stylesheet needs to paint a template: palette tokens plus the
 * generated SVG layers for its material. Memoised per template id.
 */
export function templateVars(template: Template): CssVars {
  const hit = cache.get(template.id);
  if (hit) return hit;

  const { palette: p } = template;
  const vars: CssVars = {
    "--v-bg": p.background,
    "--v-surface": p.surface,
    "--v-fg": p.foreground,
    "--v-muted": p.muted,
    "--v-accent": p.accent,
    "--v-stage": template.stage,
    "--v-noise": NOISE,
  };

  switch (template.material) {
    case "sand-geometry":
      vars["--v-lattice"] = lattice(p.accent);
      break;
    case "palm-shadow":
      vars["--v-leaves"] = leaves("#26301a");
      break;
    case "moonlit":
      vars["--v-trees"] = trees("#040a0b");
      break;
    case "celestial":
      vars["--v-stars"] = stars("#F3EFD8");
      break;
    case "azure":
      vars["--v-waves"] = waves("#FFFFFF");
      break;
    default:
      break;
  }

  cache.set(template.id, vars);
  return vars;
}
