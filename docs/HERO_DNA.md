# HERO_DNA.md — VAEL Visual System & Particle Language

## 1. Core Background & Atmosphere
- **Base Color**: Near-black obsidian void `#050507` (`bg-[#050507]`).
- **Radial Vignette Overlay**: `radial-gradient(ellipse at center, rgba(5,5,7,0.8) 0%, rgba(5,5,7,0.6) 50%, #050507 100%)`.
- **Continuity**: The page is one continuous dark world. No white cards, no bordered rectangular panels, no nested container boxes. Sections are separated strictly by vertical space, display scale, and particle lighting.

## 2. Typography Hierarchy
- **Display Headlines**:
  - Class: `font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[1.1]`
  - Font Family: `Plus Jakarta Sans` / `Outfit` / `Bodoni Moda`
- **Serif Contrast Phrases**:
  - Class: `<em className="font-serif italic font-normal text-white/90">`
  - Arabic Note: Enforced `font-style: normal !important` via CSS `[dir="rtl"] em, [dir="rtl"] i`.
- **Body & Subtitles**:
  - Class: `text-base sm:text-xl md:text-2xl text-zinc-300 font-light leading-relaxed`
  - Color: Muted silver `#D4D4D8` / `#A1A1AA`.
- **No Monospace Micro-Labels**: No `font-mono`, no uppercase pill badges, no numbered labels ("01"), no words like "FLAGSHIP", "BEST", "PREMIUM".

## 3. Standard Button System (Only Two Variants Allowed)
- **Primary Button (Filled White)**:
  - Class: `px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white text-black font-semibold text-xs sm:text-sm tracking-wider shadow-2xl hover:bg-zinc-200 transition-all duration-300 inline-flex items-center gap-2.5 hover:scale-105`
- **Secondary Button (Glass Hairline)**:
  - Class: `px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-white font-semibold text-xs sm:text-sm tracking-wider hover:bg-white hover:text-black transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:scale-105`
- **Rules**:
  - Sentence case text (e.g. "Explore Live Demos", "Create Invitation").
  - Icon-free or plain text navigation for tabs.

## 4. Stipple Particle Engine & Subject Language
- **Particle Render Engine**: Three.js WebGL Points (or 2D Canvas Points for lightweight scenes).
- **Particle Color**: Pure monochrome HSL silver & ice white (`hue: 0, saturation: 0, lightness: 0.65 - 1.0`).
- **Additive Blending**: `THREE.AdditiveBlending`, `transparent: true`, `opacity: 0.45 - 0.85`.
- **Pointer/Touch Interaction**: Mouse/touch repulsion field displacing points radially, with spring recall `(originalPos - currentPos) * 0.0012` and damping `0.94`.
- **Particle States & Meaning**:
  - **Sealed / Locked State**: Condensed toward a central focal point, lower opacity.
  - **Opened / Unlocked State**: Expanded into shape bounds (envelope, wax seal, lantern, crescent, gift hands, waveform, QR code), glowing bright white.
- **IntersectionObserver Guardrail**: Only ONE active particle canvas at a time; unmount/pause when offscreen.

## 5. Shared Tokens & Modules
- Reusable particle math & canvas engine extracted into `src/lib/particleEngine.ts`.
- Design tokens centralized in `src/lib/heroTokens.ts`.
