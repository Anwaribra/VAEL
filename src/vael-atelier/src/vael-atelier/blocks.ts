import type {
  BlockDropEvent,
  BlockState,
  BlockType,
  InvitationData,
  Locale,
  Template,
} from "./types";

/** Every block the builder can place, in palette order. */
export const BLOCK_TYPES: BlockType[] = [
  "names",
  "invitation-line",
  "date",
  "time",
  "venue",
  "map",
  "message",
  "photo",
  "rsvp",
  "vael-mark",
];

export function blocksForTemplate(template: Template): BlockState[] {
  return template.blockOrder.map((type) => ({ type, hidden: false }));
}

/* ------------------------------------------------------------ placement */

/** Where a block lands: before/after another block, or at the very end. */
export interface DropTarget {
  type: BlockType | "end";
  after: boolean;
}

/**
 * Place `type` at `target`. Works for new blocks (dragged from the palette,
 * or added with the keyboard) and for blocks that are already in the list.
 * Returns the new list and the index the block ended up at.
 */
export function placeBlock(
  blocks: BlockState[],
  type: BlockType,
  target: DropTarget,
): { nextBlocks: BlockState[]; insertIndex: number; block: BlockState } {
  const rest = blocks.filter((b) => b.type !== type);
  let insertIndex = rest.length;
  if (target.type !== "end") {
    const at = rest.findIndex((b) => b.type === target.type);
    if (at !== -1) insertIndex = at + (target.after ? 1 : 0);
  }
  // A block that is dropped is always visible afterwards.
  const block: BlockState = { type, hidden: false };
  const nextBlocks = [...rest.slice(0, insertIndex), block, ...rest.slice(insertIndex)];
  return { nextBlocks, insertIndex, block };
}

export function moveBlockBy(blocks: BlockState[], type: BlockType, delta: -1 | 1): BlockState[] {
  const from = blocks.findIndex((b) => b.type === type);
  const to = from + delta;
  if (from === -1 || to < 0 || to >= blocks.length) return blocks;
  const next = blocks.slice();
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export function toggleHidden(blocks: BlockState[], type: BlockType): BlockState[] {
  return blocks.map((b) => (b.type === type ? { ...b, hidden: !b.hidden } : b));
}

export function removeBlock(blocks: BlockState[], type: BlockType): BlockState[] {
  return blocks.filter((b) => b.type !== type);
}

export function availableBlocks(blocks: BlockState[]): BlockType[] {
  const used = new Set(blocks.map((b) => b.type));
  return BLOCK_TYPES.filter((t) => !used.has(t));
}

export function makeDropEvent(
  result: ReturnType<typeof placeBlock>,
): BlockDropEvent {
  return {
    block: result.block,
    insertIndex: result.insertIndex,
    nextBlocks: result.nextBlocks,
  };
}

/** Neighbours of a block, used to phrase status messages ("between Date and Venue"). */
export function neighboursOf(
  blocks: BlockState[],
  type: BlockType,
): { before?: BlockType; after?: BlockType } {
  const i = blocks.findIndex((b) => b.type === type);
  return { before: blocks[i - 1]?.type, after: blocks[i + 1]?.type };
}

/* ----------------------------------------------------------- sample data */

const SAMPLE: Record<Locale, InvitationData> = {
  en: {
    names: { partnerOne: "Amira", connector: "&", partnerTwo: "Karim" },
    "invitation-line": {
      text: "Together with their families, they invite you to celebrate their wedding.",
    },
    date: { value: "2027-04-16", showWeekday: true },
    time: { value: "19:00", label: "Ceremony at" },
    venue: { name: "The Garden Pavilion", address: "Nile Corniche, Cairo" },
    map: { url: "", label: "View on map" },
    message: { text: "Your presence is the only gift we ask for." },
    photo: { src: "", alt: "", shape: "arch" },
    rsvp: { label: "Reply", deadline: "Kindly reply by 1 April", href: "" },
    "vael-mark": { text: "Made with VAEL" },
  },
  ar: {
    names: { partnerOne: "أميرة", connector: "و", partnerTwo: "كريم" },
    "invitation-line": { text: "يتشرف أهلنا بدعوتكم لحضور حفل زفافنا." },
    date: { value: "2027-04-16", showWeekday: true },
    time: { value: "19:00", label: "الحفل في" },
    venue: { name: "قاعة الحديقة", address: "كورنيش النيل، القاهرة" },
    map: { url: "", label: "عرض على الخريطة" },
    message: { text: "حضوركم هو الهدية التي نتمناها." },
    photo: { src: "", alt: "", shape: "arch" },
    rsvp: { label: "تأكيد الحضور", deadline: "برجاء التأكيد قبل الأول من أبريل", href: "" },
    "vael-mark": { text: "صُنعت مع VAEL" },
  },
};

export function sampleData(locale: Locale = "en"): InvitationData {
  return structuredCloneSafe(SAMPLE[locale]);
}

/** Fill any missing block data with samples so a partial `initialInvitationData` is safe. */
export function withDefaults(
  partial: Partial<InvitationData> | undefined,
  locale: Locale = "en",
): InvitationData {
  const base = sampleData(locale);
  if (!partial) return base;
  const out = { ...base } as Record<string, unknown>;
  for (const key of Object.keys(base) as BlockType[]) {
    const incoming = partial[key];
    if (incoming) out[key] = { ...(base[key] as object), ...(incoming as object) };
  }
  return out as unknown as InvitationData;
}

function structuredCloneSafe<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
