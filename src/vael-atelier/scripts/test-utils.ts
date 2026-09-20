// Run with: npm run test:utils   (Node 22.6+)
import assert from "node:assert/strict";
import {
  availableBlocks,
  moveBlockBy,
  placeBlock,
  removeBlock,
  toggleHidden,
  withDefaults,
} from "../src/vael-atelier/blocks.ts";
import type { BlockState } from "../src/vael-atelier/types.ts";

const base: BlockState[] = ["names", "date", "venue", "rsvp"].map((type) => ({
  type: type as BlockState["type"],
  hidden: false,
}));
const order = (b: BlockState[]) => b.map((x) => x.type).join(",");

// drop a new block between Date and Venue (before Venue)
let r = placeBlock(base, "photo", { type: "venue", after: false });
assert.equal(order(r.nextBlocks), "names,date,photo,venue,rsvp");
assert.equal(r.insertIndex, 2);

// drop after a block
r = placeBlock(base, "photo", { type: "date", after: true });
assert.equal(order(r.nextBlocks), "names,date,photo,venue,rsvp");

// drop at the end / unknown target falls back to the end
assert.equal(order(placeBlock(base, "photo", { type: "end", after: true }).nextBlocks), "names,date,venue,rsvp,photo");

// moving an existing block never duplicates it
r = placeBlock(base, "rsvp", { type: "date", after: false });
assert.equal(order(r.nextBlocks), "names,rsvp,date,venue");

// a dropped block is always visible
const hiddenBase = toggleHidden(base, "venue");
assert.equal(hiddenBase.find((b) => b.type === "venue")?.hidden, true);
assert.equal(placeBlock(hiddenBase, "venue", { type: "names", after: true }).block.hidden, false);

// keyboard moves clamp at the edges
assert.equal(moveBlockBy(base, "names", -1), base);
assert.equal(order(moveBlockBy(base, "date", 1)), "names,venue,date,rsvp");

// removed blocks return to the palette
assert.ok(availableBlocks(removeBlock(base, "date")).includes("date"));
assert.ok(!availableBlocks(base).includes("names"));

// partial data is completed with sample content
const d = withDefaults({ names: { partnerOne: "Sara", connector: "&", partnerTwo: "Adam" } });
assert.equal(d.names.partnerOne, "Sara");
assert.ok(d.venue.name.length > 0);

console.log("utils: all assertions passed");
