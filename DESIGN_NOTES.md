# DESIGN_NOTES.md — VAEL Architectural & Design Specification

## Overview
VAEL has been simplified to two core offerings:
1. **Free Wedding / Engagement Invitation**: Interactive web invitation configured by the user with a single free allocation saved in client storage (`localStorage`), optional photo processed strictly on the client side (WebP <= 400KB), optional music track, live non-iframe preview, and customizable designs (`Ivory`, `Noir`, `Oud`).
2. **Custom Website Request**: Direct-to-studio commission request delivered securely via email (`anwarmousa100@gmail.com`) or optional WhatsApp.

---

## 1. Invitation Design Concepts

### Ivory
- **Concept**: A warm, tactile paper aesthetic rooted in high-contrast editorial typography and silver wax seal rituals.
- **Typography**: `Cormorant Garamond` (English display serif) + `Amiri` (Arabic classic serif).
- **Palette**: Warm ivory base (`#FAF8F5`), obsidian typography (`#1C1917`), muted stone accents (`#78716C`), hairline border (`#E7E5E4`).
- **Motion & Delight**: Silver wax seal with smooth cracking animation upon tap; photo framed in a physical paper-mat border preserving natural tone.

### Noir
- **Concept**: Near-black monolithic obsidian canvas with silver metallic typography and specular light physics.
- **Typography**: `Bodoni Moda` / `Italiana` (English high-fashion serif) + `IBM Plex Sans Arabic` (Arabic modern clean serif).
- **Palette**: Obsidian deep background (`#0B0B0E`), gleaming silver text (`#F4F4F5`), translucent charcoal hairlines (`#27272A`), metallic foil highlight (`#E4E4E7`).
- **Motion & Delight**: Obsidian-glass seal breaks into interactive shards that drift away; pointer/touch controls a dynamic specular lighting angle; photo treated with soft black-and-white grain.

### Oud
- **Concept**: Deep warm neutrals highlighted with soft gold metallic accents and procedural 8-fold Islamic geometric motifs.
- **Typography**: `Amiri` / `Aref Ruqaa` (Arabic calligraphic display) + `Cormorant Garamond` (English classic serif).
- **Palette**: Deep oud brown background (`#1C1815`), warm ivory text (`#F5F0EB`), soft matte gold accents (`#E5C396`), rich copper border (`#3D352E`).
- **Motion & Delight**: Gold calligraphic seal unboxing; procedural geometric canvas grid; photo rendered with warm tone and arched mask architecture.

---

## 2. Arabic Copy Defaults & Catalog

### Default Copy (Wedding)
- **English**: `"Together with their families, {a} & {b} request the honour of your presence at their wedding."`
- **Arabic**: `"بكل الحب والفرح، يدعوكم {a} و{b} لمشاركتهما فرحة زفافهما."`

### Default Copy (Engagement)
- **English**: `"{a} & {b} are getting engaged. Join us to celebrate."`
- **Arabic**: `"يسعد {a} و{b} دعوتكم لمشاركتهما فرحة خطوبتهما."`

### Dual-Language Mode ("Both")
- Stacked presentation: Arabic text rendered with `dir="rtl"` followed by English text rendered with `dir="ltr"`.

### Form UI Labels & Text (Arabic)
- Type toggle: `"فرح"` | `"خطوبة"`
- CTA Button (Landing Nav & Hero): `"اعمل دعوتك"`
- CTA Button (Configurator): `"اعمل دعوتي"`
- WhatsApp RSVP Label: `"رقم الواتساب لتأكيد الحضور"`
- Edit Link Warning: `"احتفظ بالرابط ده. دي الطريقة الوحيدة لتعديل أو مسح دعوتك."`
- WhatsApp Share Text: `"اتفضل دعوتك لحضور مناسبة {names}: {link}"`
- Guest RSVP Button: `"تأكيد الحضور على واتساب"`
- Made with VAEL mark: `"صُنِع بـ VAEL"`
- Sound toggle: `"الصوت يعمل"` | `"الصوت متوقف"`
- Custom Request Title: `"عايز حاجة تانية؟"`
- Custom Request Subtitle: `"موقع متفصّل على شخص واحد ولحظة واحدة. احكيلنا وهنرد عليك."`
- Zero-Storage Notice: `"مفيش بيانات بتتخزن. ده بيفتح الإيميل والرسالة جاهزة."`

---

## 3. Storage & Free-Once Soft Limit Specification

- **Free-Once Rule**: Each visitor can create 1 free invitation stored locally in `localStorage` under the key `vael_my_invitation`.
- **Structure stored in `localStorage`**:
  ```json
  {
    "slug": "abc123xyz0",
    "token": "base64url_edit_token_secret",
    "createdAt": 1726700000000
  }
  ```
- **Behavior**:
  - When visiting `/create`, if `vael_my_invitation` exists and `VITE_ALLOW_MULTIPLE` is not `'1'`, the user is shown their existing invitation link with **Open** and **Edit** buttons.
  - Testing Override: Setting environment variable `VITE_ALLOW_MULTIPLE=1` bypasses the local check for development/testing.
