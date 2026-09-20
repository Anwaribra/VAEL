import { useContext, useEffect, useRef } from "react";
import type { KeyboardEvent } from "react";
import { useDndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { IconClose, IconDown, IconEye, IconEyeOff, IconGrip, IconUp } from "../icons";
import type { Strings } from "../i18n";
import type { BlockState, BlockType } from "../types";
import { DropHintContext, ROW_END, ZONE_ROWS, rowId } from "./dnd";
import type { DragData } from "./dnd";

interface Props {
  blocks: BlockState[];
  selected: BlockType | null;
  t: Strings;
  onSelect: (type: BlockType) => void;
  onMove: (type: BlockType, delta: -1 | 1) => void;
  onToggle: (type: BlockType) => void;
  onRemove: (type: BlockType) => void;
}

interface RowProps extends Omit<Props, "blocks"> {
  block: BlockState;
  index: number;
  total: number;
  onKey: (e: KeyboardEvent<HTMLDivElement>, type: BlockType) => void;
}

function Row({ block, index, total, selected, t, onSelect, onMove, onToggle, onRemove, onKey }: RowProps) {
  const { type, hidden } = block;
  const label = t.blockNames[type];
  const data: DragData = { kind: "row", type };
  const drag = useDraggable({ id: rowId(type), data });
  const drop = useDroppable({ id: rowId(type) });
  const hint = useContext(DropHintContext);
  const hintClass =
    hint && hint.type === type ? (hint.after ? " drop-after" : " drop-before") : "";

  return (
    <div
      ref={(node) => {
        drop.setNodeRef(node);
        drag.setNodeRef(node);
      }}
      role="row"
      aria-selected={selected === type}
      aria-rowindex={index + 1}
      className={`vael-row${selected === type ? " is-selected" : ""}${hidden ? " is-hidden" : ""}${
        drag.isDragging ? " is-dragging" : ""
      }${hintClass}`}
      data-row={type}
      onKeyDown={(e) => onKey(e, type)}
    >
      <div role="gridcell" className="vael-row__cell">
        <button
          ref={drag.setActivatorNodeRef}
          type="button"
          className="vael-row__grip"
          aria-label={t.dragBlock(label)}
          {...drag.attributes}
          {...drag.listeners}
        >
          <IconGrip />
        </button>
      </div>
      <div role="gridcell" className="vael-row__cell vael-row__cell--main">
        <button type="button" className="vael-row__main" data-row-main={type} onClick={() => onSelect(type)}>
          <span className="vael-row__name">{label}</span>
          {hidden && <span className="vael-row__tag">{t.hiddenTag}</span>}
          <span className="vael-vh">{t.edit}</span>
        </button>
      </div>
      <div role="gridcell" className="vael-row__cell vael-row__actions">
        <button
          type="button"
          className="vael-iconbtn"
          onClick={() => onMove(type, -1)}
          disabled={index === 0}
          aria-label={`${t.moveUp}: ${label}`}
          title={t.moveUp}
        >
          <IconUp />
        </button>
        <button
          type="button"
          className="vael-iconbtn"
          onClick={() => onMove(type, 1)}
          disabled={index === total - 1}
          aria-label={`${t.moveDown}: ${label}`}
          title={t.moveDown}
        >
          <IconDown />
        </button>
        <button
          type="button"
          className="vael-iconbtn"
          onClick={() => onToggle(type)}
          aria-pressed={hidden}
          aria-label={`${hidden ? t.show : t.hide}: ${label}`}
          title={hidden ? t.show : t.hide}
        >
          {hidden ? <IconEyeOff /> : <IconEye />}
        </button>
        <button
          type="button"
          className="vael-iconbtn"
          onClick={() => onRemove(type)}
          aria-label={`${t.remove}: ${label}`}
          title={t.remove}
        >
          <IconClose />
        </button>
      </div>
    </div>
  );
}

function EndZone({ t }: { t: Strings }) {
  const { setNodeRef, isOver } = useDroppable({ id: ROW_END });
  const { active } = useDndContext();
  return (
    <div
      ref={setNodeRef}
      className={`vael-endzone${active ? " is-live" : ""}${isOver ? " is-over" : ""}`}
      aria-hidden="true"
    >
      {active ? t.dropAtEnd : null}
    </div>
  );
}

/** "Your invitation": the ordered structure, with drag, keyboard and button controls. */
export function StructureList({ blocks, selected, t, onSelect, onMove, onToggle, onRemove }: Props) {
  const { setNodeRef } = useDroppable({ id: ZONE_ROWS });
  const listRef = useRef<HTMLDivElement | null>(null);
  const refocus = useRef<BlockType | null>(null);

  // After a keyboard move React re-orders the DOM; put focus back on the moved row.
  useEffect(() => {
    if (!refocus.current) return;
    const el = listRef.current?.querySelector<HTMLElement>(`[data-row-main="${refocus.current}"]`);
    refocus.current = null;
    el?.focus({ preventScroll: true });
  });

  const focusSibling = (type: BlockType, delta: number) => {
    const i = blocks.findIndex((b) => b.type === type);
    const next = blocks[i + delta];
    if (!next) return;
    listRef.current?.querySelector<HTMLElement>(`[data-row-main="${next.type}"]`)?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>, type: BlockType) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      const delta = e.key === "ArrowUp" ? -1 : 1;
      // Only react when focus is on the row's main button, so the action buttons stay usable.
      if (!(e.target as HTMLElement).matches("[data-row-main]")) return;
      e.preventDefault();
      if (e.altKey) {
        refocus.current = type;
        onMove(type, delta);
      } else {
        focusSibling(type, delta);
      }
    } else if (e.key === "Delete" && (e.target as HTMLElement).matches("[data-row-main]")) {
      e.preventDefault();
      const i = blocks.findIndex((b) => b.type === type);
      const neighbour = blocks[i + 1] ?? blocks[i - 1];
      refocus.current = neighbour?.type ?? null;
      onRemove(type);
    }
  };

  return (
    <section className="vael-panel" aria-labelledby="vael-structure-h">
      <h2 id="vael-structure-h" className="vael-panel__title">
        {t.yourInvitation}
      </h2>
      <p className="vael-panel__hint" id="vael-structure-hint">
        {t.keyboardHint}
      </p>
      <div
        ref={(node) => {
          listRef.current = node;
          setNodeRef(node);
        }}
        role="grid"
        aria-label={t.structureLabel}
        aria-describedby="vael-structure-hint"
        className="vael-rows"
      >
        {blocks.map((b, i) => (
          <Row
            key={b.type}
            block={b}
            index={i}
            total={blocks.length}
            selected={selected}
            t={t}
            onSelect={onSelect}
            onMove={onMove}
            onToggle={onToggle}
            onRemove={onRemove}
            onKey={onKey}
          />
        ))}
        <EndZone t={t} />
      </div>
    </section>
  );
}
