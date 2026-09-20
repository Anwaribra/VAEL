import { useId } from "react";
import type { SealId } from "./types";

const SEALS: Record<
  Exclude<SealId, "none">,
  { rim: [string, string]; face: [string, string]; letter: string; ring: string }
> = {
  silver: { rim: ["#EEF0F2", "#7F858D"], face: ["#F7F8F9", "#B4BAC1"], letter: "#646A72", ring: "#FFFFFF" },
  gold: { rim: ["#F6E3A6", "#86622A"], face: ["#F0D690", "#AC8437"], letter: "#65460F", ring: "#FFF3C8" },
  obsidian: { rim: ["#4A4A52", "#0A0A0C"], face: ["#212125", "#050506"], letter: "#CFC8B6", ring: "#8B8B93" },
  pearl: { rim: ["#FFFFFF", "#D3C4CA"], face: ["#FDFBFB", "#E2D4D9"], letter: "#93808A", ring: "#FFFFFF" },
};

/** A scalloped disc: radius wobbles slightly around the edge. */
function scalloped(r: number, bumps: number, depth: number): string {
  const pts: string[] = [];
  for (let i = 0; i <= 96; i++) {
    const a = (i / 96) * Math.PI * 2;
    const rr = r + Math.sin(a * bumps) * depth;
    pts.push(`${i ? "L" : "M"}${(50 + Math.cos(a) * rr).toFixed(2)} ${(50 + Math.sin(a) * rr).toFixed(2)}`);
  }
  return pts.join(" ") + "Z";
}

const RIM_PATH = scalloped(45, 22, 1.6);

/** Decorative, CSS-drawn seal. No images. */
export function Seal({ kind }: { kind: SealId }) {
  const uid = useId().replace(/:/g, "");
  if (kind === "none") return null;
  const c = SEALS[kind];
  return (
    <div className="vael-seal" aria-hidden="true" data-seal={kind}>
      <svg viewBox="0 0 100 100" focusable="false">
        <defs>
          <linearGradient id={`rim-${uid}`} x1="15%" y1="8%" x2="85%" y2="92%">
            <stop offset="0" stopColor={c.rim[0]} />
            <stop offset="1" stopColor={c.rim[1]} />
          </linearGradient>
          <radialGradient id={`face-${uid}`} cx="34%" cy="28%" r="80%">
            <stop offset="0" stopColor={c.face[0]} />
            <stop offset="1" stopColor={c.face[1]} />
          </radialGradient>
        </defs>
        <path d={RIM_PATH} fill={`url(#rim-${uid})`} />
        <circle cx="50" cy="50" r="35" fill={`url(#face-${uid})`} />
        <circle cx="50" cy="50" r="35" fill="none" stroke={c.ring} strokeOpacity="0.55" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="30.5" fill="none" stroke={c.letter} strokeOpacity="0.28" strokeWidth="0.6" />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="30"
          fontStyle="italic"
          fill={c.letter}
          style={{ fontFamily: "var(--v-display)" }}
        >
          V
        </text>
      </svg>
      <span className="vael-seal__glint" />
    </div>
  );
}
