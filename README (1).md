# VAEL atelier: collection + invitation builder

A self-contained source package for two things:

1. **`<CollectionSection />`**: a drop-in replacement for the current "The collection" section (editorial gallery of 10 designs, preview drawer, direct "Use this design").
2. **`<InvitationBuilder />`**: the `/create` experience (elements | live preview | settings, drag and drop, keyboard alternatives, mobile sheets).

Both are driven by one shared renderer (`InvitationRenderer`) and one config file (`templates.ts`).
Nothing here touches the navbar, hero, footer or any existing route.

- React 18 + TypeScript, plain CSS (no Tailwind, no CSS-in-JS, no router dependency)
- One runtime dependency beyond React: `@dnd-kit/core` (+ `@dnd-kit/utilities`)
- **No image assets.** Every material is CSS gradients or a small inline SVG generated in code
- English and Arabic (RTL) built in

---

## Run / build this package on its own

```bash
npm install
npm run dev        # http://localhost:5180   (demo host: stand-in navbar, /, /create, /custom)
npm run build      # type-check + production build
npm run typecheck
npm run test:utils # unit tests for the block-placement logic (Node 22.6+)
```

The demo host (`src/main.tsx`, `src/demo/*`, `index.html`, `vite.config.ts`) exists only to run the package
alone. **Do not copy it into VAEL.** Only the `src/vael-atelier/` folder is the deliverable.

---

## Integrate into the existing VAEL app (about 10 minutes)

### 1. Copy the folder and install the dependency

```bash
cp -r src/vael-atelier <vael-app>/src/vael-atelier
cd <vael-app>
npm install @dnd-kit/core @dnd-kit/utilities
```

`package.json` change in VAEL: add these two lines under `dependencies`
(use the versions already in this package's `package.json`, currently `^6.3.1` and `^3.2.2`).
React 18 is assumed. No other dependency is added.

Import the stylesheet once. `src/vael-atelier/index.ts` already does `import "./styles/atelier.css"`,
so importing anything from `vael-atelier` pulls the CSS in. If your build prefers explicit CSS imports,
import `src/vael-atelier/styles/atelier.css` from your root layout instead.

### 2. Replace the Collection section on the landing page

```tsx
import { CollectionSection } from "@/vael-atelier";   // or a relative path
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

<CollectionSection
  locale={isArabic ? "ar" : "en"}          // your existing language state
  navigate={(to) => navigate(to)}          // gets /create?template=id  or  /custom?template=id&templateName=Name
/>
```

Only the old Collection section is removed. The section has its own background and spacing.
The hero's secondary action ("Explore the collection") can link to `#collection` (the default `id`).

Next.js: `navigate={(to) => router.push(to)}`.

### 3. Mount the builder on `/create`

```tsx
import { InvitationBuilder } from "@/vael-atelier";

<InvitationBuilder
  locale={isArabic ? "ar" : "en"}
  storageKey="vael:atelier:draft"                       // optional draft persistence, see "localStorage"
  onChange={({ templateId, blocks, data }) => { /* sync with VAEL's existing invitation state */ }}
  onUsePremiumTemplate={(t) => navigate(`/custom?template=${t.id}&templateName=${encodeURIComponent(t.name)}`)}
/>
```

- The design opens already applied. With no `initialTemplateId`, the builder reads `?template=` from the URL,
  then the id the gallery saved, then falls back to the first free design. Premium ids are never opened directly.
- Give the builder the navbar height so it fits under it: set `--vael-builder-offset: 72px` (your real height)
  on any ancestor, for example `.vael-builder { --vael-builder-offset: 72px }` in your own CSS.

### 4. `/custom` receives the premium request

The gallery and builder send `/custom?template=velvet-archive&templateName=Velvet%20Archive`.
Read those two query params in the existing custom form and pre-fill/hidden-post them.
**Nothing here takes payment, shows pricing or claims a purchase.**

---

## What Antigravity must reconcile with the existing app

| Topic | Detail |
|---|---|
| **localStorage** | New keys only: `vael:selected-template` (id saved by "Use this design") and, if you pass `storageKey`, one draft key (`{templateId, blocks, data}`). Constants live in `storage.ts`. If VAEL already stores the selected template or a draft under other keys, change the constants or map `onChange` into your store. |
| **Free invitation rule** | Not enforced in this package (it has no knowledge of your accounts). Enforce it where the invitation is *saved or published*, using the `onChange` snapshot. |
| **Existing invitation data** | Pass it via `initialInvitationData` (partial is fine; missing blocks get sample content) and `initialBlocks`. Data shape is `InvitationData` in `types.ts`. Block data is keyed by block type, so removing and re-adding a block restores its content. |
| **Guest invitation page** | Render published invitations with `<InvitationRenderer template blocks data locale showPlaceholders={false} motion="reveal" />`. Same component, so guests see exactly what the builder showed. |
| **Existing Arabic switch** | Pass `locale` / `dir`. Strings are in `i18n.ts`. |
| **Fonts** | Components use `Cormorant Garamond`, `Bodoni Moda`, `EB Garamond`, `Jost`, `Amiri`, `Noto Naskh Arabic` when present and fall back to Georgia / system-ui otherwise. The demo `index.html` has an optional Google Fonts link (all SIL OFL). To use VAEL's own fonts instead, set `--vael-font-editorial`, `--vael-font-didone`, `--vael-font-humanist`, `--vael-font-grotesk`, `--vael-font-arabic`, `--vael-font-ui`, `--vael-font-ui-display` on `:root`. |
| **Global CSS** | Everything is namespaced (`.vael-*`, `.previewBlock*`). Resets are wrapped in `:where()` (zero specificity), so a host rule like `h2 { margin: ... }` can still win. If a heading or button looks off, check for host element selectors. |

---

## Files

```
src/vael-atelier/
  index.ts                  public exports (+ imports the CSS)
  types.ts                  Template, BlockType, InvitationData, ...
  templates.ts              the 10 designs (5 free, 5 premium): the only place to add/edit designs
  blocks.ts                 block order logic (placeBlock, moveBlockBy, ...) and sample content
  materials.ts              CSS/SVG material generators (noise, lattice, fronds, stars, waves), no assets
  InvitationRenderer.tsx    ONE renderer for every design, gallery card, drawer and builder canvas
  Seal.tsx                  the drawn seal (silver, gold, obsidian, pearl)
  i18n.ts                   English + Arabic strings
  storage.ts                localStorage helpers, resolveInitialTemplateId, URL builders
  hooks.ts, icons.tsx, image.ts   media query / status line / dialog behaviour, icons, photo downscaling
  collection/
    CollectionSection.tsx   the section; owns "Use this design" / "Request" logic
    TemplateGallery.tsx     cover-flow, keyboard, swipe, index
    TemplateCard.tsx        one design on its material surface
    PremiumPreviewDrawer.tsx  full-size preview (free and premium)
  builder/
    InvitationBuilder.tsx   layout + DndContext + drop handling + mobile sheets
    useBuilder.ts           all state and actions
    BlockPalette.tsx, StructureList.tsx, Inspector.tsx, DesignPanel.tsx
    dnd.ts                  drag ids, collision rules, insertion-line context
  styles/
    atelier.css (imports) · base.css · invitation.css · collection.css · builder.css
scripts/test-utils.ts       unit tests for block placement
docs/screenshots/           captures from the verification run
```

## Components: props

**`CollectionSection`**: `locale`, `dir`, `templates`, `sampleInvitation`, `initialTemplateId`, `id` (default `collection`),
`createPath` (`/create`), `customPath` (`/custom`), `navigate(to)`, `onUseTemplate(template)`, `onRequestPremiumTemplate(template)`.
"Use this design" (free): saves the id, calls `onUseTemplate`, then `navigate('/create?template=id')`. No modal, no second selection.
If neither `navigate` nor `onUseTemplate` is given it falls back to `window.location.assign`.
Premium: "Preview design" opens the full preview; "Request this design" calls `onRequestPremiumTemplate` and navigates to `/custom?...`.

**`InvitationBuilder`**: `templates`, `initialTemplateId`, `initialBlocks`, `initialInvitationData`, `locale`, `dir`, `storageKey`,
`onChange({templateId, blocks, data})`, `onBlockDrop({block, insertIndex, nextBlocks})`, `onUsePremiumTemplate(template)`.

**`InvitationRenderer`**: `template`, `blocks`, `data`, `locale`, `dir`, `motion` (`reveal` | `static`), `replayToken`,
`showPlaceholders`, `interactive`, `wrapBlock`, `endSlot`.

## Drop behaviour (builder)

Drop from "Elements" (or a row, or straight onto the preview): the block is inserted at the exact position
(upper half of the target = before it, lower half = after it), the preview updates in the same render, the block is selected,
the settings panel switches to it, its first field takes focus, and a small status line appears (`Photo added between Time and Venue.`).
No Apply or Add step, no remount of the renderer. Keyboard/touch alternative: the **+** button on each element inserts after the selected block
and runs the same flow. Row controls: move up, move down, hide/show, remove; `Alt+↑/↓` moves the focused row, `Delete` removes it.
Everything is announced through an `aria-live` region.

## Motion

Only material, light and surrounding layers move. Text fades and shifts by a few pixels; it never scales, blurs or warps.
Each design has a `motionStyle`: paper-reveal, quiet-fade, geometry-draw, ink-fade, pearl-glow, moon-rise, botanical-shadow,
curtain-open (Velvet Archive), star-drift, liquid-reveal (Azure Tide). The reveal plays when a card comes to the front and in the
preview drawer, and never continuously in the builder (use "Replay the opening"). `prefers-reduced-motion: reduce` removes the
curtain, collapses all animation/transition durations to ~0 and leaves the finished card. The video was used as a reference for mood
and timing only. No frame or footage from it is used.

## Verified (headless Chromium 153, real pointer/keyboard input)

30 scripted checks pass with zero console errors: direct `/create?template=id` with the design already active and its id saved;
drag from Elements to an exact position; insertion line while dragging; drop straight onto the preview; drag to reorder a row;
selection + settings + focus on the upload control after a drop; toast text; photo upload into the preview; typing updates the
preview instantly; `+` button focus; `Alt+↑`, move buttons, hide, show, remove; design switch keeps all content; premium opens a
preview dialog (Escape closes, focus returns) and never becomes the active design; draft restored on reload; mobile (390px):
no horizontal overflow, swipe, preview sheet, settings sheet, focus after add; Arabic RTL layout mirrored, no overflow;
reduced motion; gallery arrow keys and wrap-around. `npm run build` succeeds.

## Not verified / known limitations

- Not tested in Safari or Firefox, on a physical touch device, or with a screen reader (VoiceOver/NVDA). Container-query units,
  `color-mix()` and `overflow: clip` need current browsers (roughly 2023+).
- The sandbox blocked Google Fonts, so all checks ran with the fallback serif. Letter-fit was not checked with Cormorant/Bodoni/Jost. Re-check long names once the real fonts load.
- Not run inside the real VAEL project. The localStorage keys, free-invitation rule and `/custom` prefill are integration points listed above.
- Drag and drop with a keyboard uses dnd-kit's default keyboard sensor (works, coarse). The `+` button and row controls are the reliable keyboard path.
- Photos are downscaled to 1400px WebP/JPEG and stored as a data URL. Fine for a draft; upload to storage before publishing.
- Touch dragging uses a short press-and-hold (180 ms). If a device does not trigger it, the `+` button covers the same flow.
- Template names are English in both locales (only descriptions are translated). Add `i18n.ar.name` per template to localize them.
- Premium designs cannot be edited in the builder by design: they open a preview and route to `/custom`.
