import type { CSSProperties } from "react";

export type Access = "free" | "premium";
export type Locale = "en" | "ar";
export type Dir = "ltr" | "rtl";

/** One entry per element that can appear on an invitation. The type doubles as the block id. */
export type BlockType =
  | "names"
  | "invitation-line"
  | "date"
  | "time"
  | "venue"
  | "map"
  | "message"
  | "photo"
  | "rsvp"
  | "vael-mark";

export type TypographyId =
  | "editorial-serif"
  | "didone"
  | "humanist-serif"
  | "modern-grotesk"
  | "script-accent";

export type LayoutId = "classic" | "minimal" | "framed" | "arch" | "cinematic";
export type SealId = "silver" | "gold" | "obsidian" | "pearl" | "none";

/** CSS-only material treatments. No raster assets are used anywhere. */
export type MaterialId =
  | "paper"
  | "obsidian"
  | "sand-geometry"
  | "linen-line"
  | "pearl"
  | "moonlit"
  | "palm-shadow"
  | "velvet"
  | "celestial"
  | "azure";

export type MotionStyle =
  | "paper-reveal"
  | "quiet-fade"
  | "geometry-draw"
  | "ink-fade"
  | "pearl-glow"
  | "moon-rise"
  | "botanical-shadow"
  | "curtain-open"
  | "star-drift"
  | "liquid-reveal";

export type TemplateFeature =
  | "seal"
  | "map"
  | "rsvp"
  | "photo"
  | "message"
  | "curtain"
  | "animated-background";

export interface Palette {
  background: string;
  surface: string;
  foreground: string;
  muted: string;
  accent: string;
}

export interface Template {
  id: string;
  name: string;
  access: Access;
  description: string;
  /** Short theme key, useful for analytics or host-side theming. */
  theme: string;
  palette: Palette;
  typography: TypographyId;
  layout: LayoutId;
  seal: SealId;
  /** How the invitation surface is painted (pure CSS / inline SVG). */
  material: MaterialId;
  /** The surface the invitation rests on in the gallery, drawer and builder stage. */
  stage: string;
  motionStyle: MotionStyle;
  blockOrder: BlockType[];
  features: TemplateFeature[];
  /** Optional Arabic copy. Falls back to the English fields. */
  i18n?: { ar?: { name?: string; description?: string } };
}

export interface BlockState {
  type: BlockType;
  hidden: boolean;
}

export interface InvitationData {
  names: { partnerOne: string; connector: string; partnerTwo: string };
  "invitation-line": { text: string };
  date: { value: string; showWeekday: boolean };
  time: { value: string; label: string };
  venue: { name: string; address: string };
  map: { url: string; label: string };
  message: { text: string };
  photo: { src: string; alt: string; shape: "arch" | "rectangle" | "oval" };
  rsvp: { label: string; deadline: string; href: string };
  "vael-mark": { text: string };
}

export interface BuilderSnapshot {
  templateId: string;
  blocks: BlockState[];
  data: InvitationData;
}

export interface BlockDropEvent {
  block: BlockState;
  insertIndex: number;
  nextBlocks: BlockState[];
}

export type CssVars = CSSProperties & Record<`--${string}`, string | number | undefined>;
