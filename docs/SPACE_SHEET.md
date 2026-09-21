# SPACE_SHEET.md — VAEL Spatial Architecture & Layout Matrix Specification

## Overview
This document defines the spatial architecture, layout matrix, structural program, screen zones, density specifications, grid math, z-index hierarchy, responsive spatial breakpoints, particle container bounds, and design parameters across all views of **VAEL** (VAEL Architectural & Design Studio / Experience Invitation Platform).

---

## 1. Executive Summary & Spatial Philosophy

VAEL's spatial identity is defined by three core principles:
1. **Monolithic Spatial Continuum**: The interface operates as a continuous obsidian void (`#050507` / `#080808`). Traditional card grid fragmentation is replaced by continuous atmospheric flow, vertical rhythm, dynamic scale, and specular particle light fields.
2. **Bi-Directional Spatial Symmetry (RTL / LTR)**: Layout structures adapt seamlessly between Arabic display calligraphy (`Amiri`, `Aref Ruqaa`) and Western high-editorial typography (`Bodoni Moda`, `Cormorant Garamond`, `Plus Jakarta Sans`), adjusting alignment anchors and reading flow without breaking spatial proportions.
3. **Fluid Proportional Grid Matrix**: All spacing parameters derive from an **8px baseline system** combined with fluid CSS clamp scales (`clamp(rem, vw, rem)`) to preserve visual gravity across ultra-wide cinema displays down to mobile viewports.

---

## 2. Global Spatial Stratigraphy (Z-Index Architecture)

To maintain layer clarity and prevent z-index collision during interactive particle physics, wax seal breaking, and liquid glass navigation, spatial depth is strictly categorized into 6 elevation planes:

```
[ z-50 ]  System Floaters / Cursor Particles / Audio Toggle / Toast Notifications
[ z-40 ]  Modal Drawers / Wax Seal Breakout Canvas / Legal Dialog Overlays
[ z-30 ]  Liquid Glass Navigation Bar (`Navbar.jsx`)
[ z-20 ]  Primary Content Layer / Forms / Interactive Atelier Cards
[ z-10 ]  Section Containers & Sub-Background Layers
[ z-5  ]  Radial Vignette / Specular Lighting Overlay Gradient
[ z-0  ]  Three.js WebGL Stipple Particle Field (`particleEngine.ts`)
```

---

## 3. Screen & Zone Spatial Breakdown Matrix

| Zone ID | Section / Route | Layout Pattern | Max Container Width | Vertical Padding | Primary Spatial Focal Point |
|---|---|---|---|---|---|
| **Z-01** | Landing Hero (`/`) | Monolithic Centered Stack | `max-w-7xl` (1280px) | `py-24 md:py-36` | Three.js Stipple Particle Canvas |
| **Z-02** | Experiences Catalog (`/`) | Scroll-Driven Glass Scale Box | `max-w-[98rem]` (1568px) | `py-10 md:py-16` | Animated Collection Showcase |
| **Z-03** | Philosophy & Studio (`/`) | Dual-Column Staggered Narrative | `max-w-6xl` (1152px) | `py-20 md:py-32` | Typographic Contrast Pairings |
| **Z-04** | Capabilities & Process (`/`) | Multi-Tier Feature Matrix | `max-w-6xl` (1152px) | `py-16 md:py-24` | Step-by-Step Experience Nodes |
| **Z-05** | Invitation Atelier (`/create`) | Asymmetric Split (Configurator + Canvas) | `max-w-7xl` (1280px) | `py-12 md:py-20` | Interactive Envelope & Seal Canvas |
| **Z-06** | Guest Invitation Vault (`/i/:slug`) | Focused Isolated Sanctuary | `max-w-2xl` (672px) | `py-12 md:py-24` | Crackable Wax Seal & Unboxing |
| **Z-07** | Invitation Management (`/manage/:slug`) | Command Center Grid | `max-w-5xl` (1024px) | `py-12 md:py-20` | Analytics, RSVP & Link Controls |
| **Z-08** | Custom Studio Request (`/custom`) | Monolithic Atelier Form | `max-w-4xl` (896px) | `py-16 md:py-28` | Direct Mail / WhatsApp Action Node |
| **Z-09** | Event Experience Tools (`/table-finder`, `/album`) | Interactive Matrix & Dropzone | `max-w-5xl` (1024px) | `py-12 md:py-20` | Seating Grid / Photo Vault |

---

## 4. Dimensional Grid & Spacing Metrics

### 4.1 Modular Base Grid (8px Scale)
- **Space-1 (`8px`)**: Micro padding, internal button gap, status dots.
- **Space-2 (`16px`)**: Standard input padding, badge margins, small card gaps.
- **Space-3 (`24px`)**: Card internal padding, stack spacing in forms.
- **Space-4 (`32px`)**: Subheader offsets, grid item gaps on desktop.
- **Space-6 (`48px`)**: Subsection margins, component section breaks.
- **Space-8 (`64px`)**: Major section padding on mobile viewports.
- **Space-12 (`96px`)**: Major section padding on desktop viewports.
- **Space-16 (`128px`)**: Hero void separation, studio footer transition.

### 4.2 Border Radius System
- `rounded-none` (`0px`): Obsidian architectural frames and obsidian-mat image displays.
- `rounded-xl` (`12px`): Input fields, sub-cards, secondary action containers.
- `rounded-2xl` / `rounded-3xl` (`16px` / `24px`): Main experience glass cards and modal dialogs.
- `rounded-[2.5rem]` to `rounded-[4.5rem]`: Scroll-driven dynamic collection wrapper (`AnimatedCollectionSection`).
- `rounded-full` (`9999px`): Wax seals, primary CTA capsule buttons, language toggle badges.

---

## 5. Responsive Spatial Transformations

```
Viewport: 375px                 768px                  1024px                1440px+
          |                       |                      |                     |
Mobile    [  Single Column Stack  ]                      |                     |
Tablet    [-------- Hybrid Grid / Scaled Padding --------]                     |
Desktop   [---------------- Dual-Column Atelier / Full Widescreen Void --------]
```

### 5.1 Mobile Viewport (`< 640px`)
- **Container Margins**: Enforced `px-4` or `px-6` horizontal safe-zone padding.
- **Touch Targets**: Minimum interactive dimension of `44px x 44px` for all buttons, toggles, and seals.
- **Configurator Layout**: Stacks the form atelier above the live preview canvas to ensure touch focus.
- **Bottom Anchor Bar**: Sticky action bar anchored to the bottom edge (`pb-safe`) for single-thumb execution.

### 5.2 Tablet Viewport (`640px - 1023px`)
- **Container Scale**: Intermediate container scale factor `scale(0.95)` for complex 3D scenes.
- **Grid Layout**: 2-column grid transformation for experience cards.

### 5.3 Widescreen Desktop (`>= 1024px`)
- **Configurator Layout**: Side-by-side asymmetric split view (40% Controls / 60% Live Canvas).
- **Particle Boundary**: Full viewport particle repulsion field with 120px interaction radius.

---

## 6. Three.js Particle Spatial Bounding Box & Physics

- **Canvas Container**: Mounted inside `<div id="particle-canvas-container" />` with `position: absolute; inset: 0; pointer-events: none;`.
- **Field Aspect Ratio**: Dynamically locked to viewport dimensions; camera FOV dynamically recalibrates between `45°` (desktop) and `60°` (mobile portrait).
- **Point Density Budget**:
  - **Desktop Widescreen**: 6,000 - 8,000 silver particles.
  - **Mobile Touch**: 2,500 - 3,500 silver particles (optimized for 60fps rendering).
- **Repulsion Mechanics**: Pointer radius `120px`, spring force constant `0.0012`, displacement damping `0.94`.

---

## 7. Concept Spatial Profiles (Ivory, Noir, Oud)

| Feature | Ivory Concept | Noir Concept | Oud Concept |
|---|---|---|---|
| **Base Color** | `#FAF8F5` Warm Ivory | `#0B0B0E` Obsidian Deep | `#1C1815` Deep Oud Brown |
| **Mat Border Width** | `12px` Tactile Paper Frame | `1px` Translucent Charcoal Hairline | `2px` Soft Matte Gold Accent |
| **Seal Spatial Size** | `72px x 72px` Silver Wax | `80px x 80px` Specular Obsidian Glass | `76px x 76px` Gold Geometric Seal |
| **Typography Spacing** | Editorial High Line Height (`1.6`) | Specular Spec Tight (`1.1`) | Calligraphic Flow (`1.8`) |

---

## Document Control
- **Version**: 1.0.0
- **Status**: Active Architecture Specification
- **Owner**: VAEL Design & Engineering Studio
