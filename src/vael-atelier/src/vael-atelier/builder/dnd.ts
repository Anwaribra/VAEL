import { createContext } from "react";
import { closestCenter, pointerWithin } from "@dnd-kit/core";
import type { CollisionDetection } from "@dnd-kit/core";
import type { BlockType } from "../types";

/**
 * Drag ids
 *   palette:<type>   a draggable element in "Elements"
 *   row:<type>       a row in "Your invitation" (draggable handle + drop target)
 *   preview:<type>   a block inside the live preview (drop target)
 *   zone:*           the two containers, used only to catch pointers in the gaps
 */
export const paletteId = (t: BlockType) => `palette:${t}`;
export const rowId = (t: BlockType) => `row:${t}`;
export const previewId = (t: BlockType) => `preview:${t}`;
export const ROW_END = "row-end";
export const PREVIEW_END = "preview-end";
export const ZONE_ROWS = "zone:rows";
export const ZONE_PREVIEW = "zone:preview";

export interface DragData {
  kind: "palette" | "row";
  type: BlockType;
}

export interface DropHint {
  type: BlockType | "end";
  after: boolean;
}

/** The current drop position, so rows and preview blocks can draw an insertion line. */
export const DropHintContext = createContext<DropHint | null>(null);

export function typeFromDropId(id: string): BlockType | "end" | null {
  if (id === ROW_END || id === PREVIEW_END) return "end";
  if (id.startsWith("row:") || id.startsWith("preview:")) {
    return id.slice(id.indexOf(":") + 1) as BlockType;
  }
  return null;
}

/**
 * Pointer inside a row or preview block wins. A pointer in the gap between
 * blocks snaps to the nearest block of the same container. Keyboard dragging
 * (no pointer) walks the rows. Anything else is "not over the invitation",
 * so a stray drop over the inspector does nothing.
 */
export const invitationCollision: CollisionDetection = (args) => {
  if (!args.pointerCoordinates) {
    return closestCenter({
      ...args,
      droppableContainers: args.droppableContainers.filter((c) => String(c.id).startsWith("row")),
    });
  }
  const hits = pointerWithin(args);
  const inner = hits.find((c) => !String(c.id).startsWith("zone:"));
  if (inner) return [inner];
  const zone = hits.find((c) => String(c.id).startsWith("zone:"));
  if (zone) {
    const prefix = zone.id === ZONE_PREVIEW ? "preview" : "row";
    return closestCenter({
      ...args,
      droppableContainers: args.droppableContainers.filter((c) => String(c.id).startsWith(prefix)),
    });
  }
  return [];
};
