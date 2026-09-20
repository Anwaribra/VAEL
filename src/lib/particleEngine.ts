/**
 * Procedural Stipple Particle Subject Generator & Canvas Engine
 * Generates particle points for shapes (envelope, wax seal, lantern, crescent, gift hands, waveform, QR)
 * with mouse disturbance, slow drift, and sealed/unlocked state transformations.
 */

export interface ParticlePoint {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export type ParticleShapeType =
  | 'torus-knot'
  | 'envelope'
  | 'wax-seal'
  | 'lantern'
  | 'crescent'
  | 'gift-hands'
  | 'waveform'
  | 'qr-grid';

export function generateShapeParticles(
  shape: ParticleShapeType,
  width: number,
  height: number,
  density: number = 800
): ParticlePoint[] {
  const points: ParticlePoint[] = [];
  const cx = width / 2;
  const cy = height / 2;
  const scale = Math.min(width, height) * 0.28;

  for (let i = 0; i < density; i++) {
    let px = 0;
    let py = 0;

    if (shape === 'envelope') {
      const u = (Math.random() - 0.5) * 2;
      const v = (Math.random() - 0.5) * 1.3;
      px = u * scale;
      py = v * scale;
      // Add diagonal crease lines
      if (Math.random() < 0.3) {
        const t = Math.random();
        px = (t - 0.5) * scale * 2;
        py = -Math.abs(px) * 0.6 + scale * 0.3;
      }
    } else if (shape === 'wax-seal') {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * scale * 0.7;
      px = Math.cos(angle) * r;
      py = Math.sin(angle) * r;
    } else if (shape === 'lantern') {
      const u = (Math.random() - 0.5) * 1.2;
      const v = (Math.random() - 0.5) * 1.8;
      px = u * scale * Math.cos(v * 0.8);
      py = v * scale;
    } else if (shape === 'crescent') {
      const angle = (Math.random() - 0.5) * Math.PI * 1.6;
      const r = scale * (0.6 + Math.random() * 0.2);
      px = Math.cos(angle) * r - scale * 0.2;
      py = Math.sin(angle) * r;
    } else if (shape === 'gift-hands') {
      const angle = Math.random() * Math.PI * 2;
      const r = (0.3 + Math.random() * 0.5) * scale;
      px = Math.cos(angle) * r;
      py = Math.sin(angle) * r * 0.7;
    } else if (shape === 'waveform') {
      const u = (i / density - 0.5) * 2;
      px = u * scale * 1.6;
      const wave = Math.sin(u * 12) * Math.cos(u * 4) * (Math.random() * 0.5 + 0.5);
      py = wave * scale * 0.8 + (Math.random() - 0.5) * 10;
    } else if (shape === 'qr-grid') {
      const step = Math.floor(Math.sqrt(density));
      const col = i % step;
      const row = Math.floor(i / step);
      px = (col / step - 0.5) * scale * 1.6;
      py = (row / step - 0.5) * scale * 1.6;
    } else {
      // Circle / torus fallback
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * scale;
      px = Math.cos(angle) * r;
      py = Math.sin(angle) * r;
    }

    points.push({
      x: cx + px,
      y: cy + py,
      originX: cx + px,
      originY: cy + py,
      vx: 0,
      vy: 0,
      size: Math.random() * 1.5 + 0.8,
      alpha: 0.3 + Math.random() * 0.6
    });
  }

  return points;
}

/**
 * Updates 2D particle points for animation frame with mouse disturbance & spring return.
 */
export function updateParticleFrame(
  points: ParticlePoint[],
  mouseX: number,
  mouseY: number,
  isCondensed: boolean = false,
  targetCx?: number,
  targetCy?: number
): void {
  const repelRadius = 120;

  for (let i = 0; i < points.length; i++) {
    const p = points[i];

    const destX = isCondensed && targetCx !== undefined ? targetCx : p.originX;
    const destY = isCondensed && targetCy !== undefined ? targetCy : p.originY;

    // Mouse repulsion
    const dx = p.x - mouseX;
    const dy = p.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < repelRadius && dist > 0) {
      const force = (repelRadius - dist) / repelRadius;
      p.vx += (dx / dist) * force * 1.2;
      p.vy += (dy / dist) * force * 1.2;
    }

    // Spring return force
    const rx = destX - p.x;
    const ry = destY - p.y;
    p.vx += rx * 0.03;
    p.vy += ry * 0.03;

    // Damping
    p.vx *= 0.88;
    p.vy *= 0.88;

    p.x += p.vx;
    p.y += p.vy;
  }
}
