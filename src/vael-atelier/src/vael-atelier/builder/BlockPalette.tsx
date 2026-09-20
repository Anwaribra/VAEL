import { useDraggable } from "@dnd-kit/core";
import { IconGrip, IconPlus } from "../icons";
import type { Strings } from "../i18n";
import type { BlockType } from "../types";
import { paletteId } from "./dnd";
import type { DragData } from "./dnd";

interface Props {
  available: BlockType[];
  t: Strings;
  onAdd: (type: BlockType) => void;
}

function PaletteItem({ type, t, onAdd }: { type: BlockType; t: Strings; onAdd: (type: BlockType) => void }) {
  const data: DragData = { kind: "palette", type };
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, isDragging } = useDraggable({
    id: paletteId(type),
    data,
  });
  const label = t.blockNames[type];
  return (
    <li ref={setNodeRef} className={`vael-pal${isDragging ? " is-dragging" : ""}`}>
      <button
        ref={setActivatorNodeRef}
        type="button"
        className="vael-pal__drag"
        aria-label={t.dragBlock(label)}
        {...attributes}
        {...listeners}
      >
        <IconGrip />
        <span>{label}</span>
      </button>
      <button
        type="button"
        className="vael-iconbtn"
        onClick={() => onAdd(type)}
        aria-label={t.addBlock(label)}
        title={t.addBlock(label)}
      >
        <IconPlus />
      </button>
    </li>
  );
}

/** "Elements": everything that is not on the invitation yet. */
export function BlockPalette({ available, t, onAdd }: Props) {
  return (
    <section className="vael-panel" aria-labelledby="vael-elements-h">
      <h2 id="vael-elements-h" className="vael-panel__title">
        {t.elements}
      </h2>
      <p className="vael-panel__hint">{t.elementsHint}</p>
      {available.length === 0 ? (
        <p className="vael-panel__empty">{t.allPlaced}</p>
      ) : (
        <ul className="vael-pal-list">
          {available.map((type) => (
            <PaletteItem key={type} type={type} t={t} onAdd={onAdd} />
          ))}
        </ul>
      )}
    </section>
  );
}
