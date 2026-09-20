import { useCallback, useEffect, useRef, useState } from "react";
import {
  blocksForTemplate,
  makeDropEvent,
  moveBlockBy,
  neighboursOf,
  placeBlock,
  removeBlock as removeFrom,
  toggleHidden as toggleIn,
  withDefaults,
} from "../blocks";
import type { DropTarget } from "../blocks";
import { strings } from "../i18n";
import { readStorage, writeStorage } from "../storage";
import type {
  BlockDropEvent,
  BlockState,
  BlockType,
  BuilderSnapshot,
  InvitationData,
  Locale,
  Template,
} from "../types";

export interface UseBuilderOptions {
  templates: Template[];
  templateId: string;
  initialBlocks?: BlockState[];
  initialData?: Partial<InvitationData>;
  locale: Locale;
  storageKey?: string | null;
  announce: (message: string) => void;
  isMobile: boolean;
  onChange?: (snapshot: BuilderSnapshot) => void;
  onBlockDrop?: (event: BlockDropEvent) => void;
}

interface Draft {
  templateId?: string;
  blocks?: BlockState[];
  data?: Partial<InvitationData>;
}

function loadDraft(key: string | null | undefined): Draft | null {
  if (!key) return null;
  const raw = readStorage(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Draft;
  } catch {
    return null;
  }
}

export type RightTab = "block" | "design";

/**
 * All builder state and every action that changes it. One shared state means
 * the preview, the structure list and the inspector can never disagree.
 */
export function useBuilder(opts: UseBuilderOptions) {
  const { templates, locale, announce, isMobile } = opts;
  const t = strings[locale];

  const [initial] = useState(() => {
    const draft = opts.initialBlocks || opts.initialData ? null : loadDraft(opts.storageKey);
    return draft;
  });

  const findTemplate = useCallback(
    (id: string) => templates.find((x) => x.id === id) ?? templates[0],
    [templates],
  );

  const [templateId, setTemplateId] = useState(opts.templateId);
  const template = findTemplate(templateId);

  const [blocks, setBlocks] = useState<BlockState[]>(
    () => opts.initialBlocks ?? initial?.blocks ?? blocksForTemplate(findTemplate(opts.templateId)),
  );
  const [data, setData] = useState<InvitationData>(() =>
    withDefaults(opts.initialData ?? initial?.data, locale),
  );

  const [selected, setSelected] = useState<BlockType | null>(null);
  const [tab, setTab] = useState<RightTab>("block");
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [focusRequest, setFocusRequest] = useState<{ type: BlockType; nonce: number } | null>(null);
  const [replayToken, setReplayToken] = useState(0);

  /* Follow the URL / gallery when the requested design changes. Data and structure stay. */
  useEffect(() => {
    setTemplateId((prev) => (prev === opts.templateId ? prev : opts.templateId));
  }, [opts.templateId]);

  /* ------------------------------------------------------------- outputs */

  const onChangeRef = useRef(opts.onChange);
  onChangeRef.current = opts.onChange;
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    onChangeRef.current?.({ templateId, blocks, data });
  }, [templateId, blocks, data]);

  useEffect(() => {
    if (!opts.storageKey) return;
    const id = window.setTimeout(() => {
      writeStorage(opts.storageKey as string, JSON.stringify({ templateId, blocks, data }));
    }, 400);
    return () => window.clearTimeout(id);
  }, [opts.storageKey, templateId, blocks, data]);

  /* ------------------------------------------------------------- helpers */

  const name = (type: BlockType) => t.blockNames[type];

  const describePosition = (list: BlockState[], type: BlockType): string => {
    const { before, after } = neighboursOf(list, type);
    if (before && after) return t.where.between(name(before), name(after));
    if (!before) return t.where.top;
    return t.where.end;
  };

  /** Select a block, show its settings and (optionally) put the cursor in its first field. */
  const selectBlock = useCallback(
    (type: BlockType, options: { focus?: boolean; open?: boolean } = {}) => {
      setSelected(type);
      setTab("block");
      if (options.open !== false) setInspectorOpen(true);
      if (isMobile) setPreviewOpen(false);
      if (options.focus) setFocusRequest({ type, nonce: Date.now() });
    },
    [isMobile],
  );

  /* ------------------------------------------------------------- actions */

  /** Drop or add: insert at the exact position, select, open, focus, announce. No Apply step. */
  const dropBlock = useCallback(
    (type: BlockType, target: DropTarget) => {
      const isNew = !blocks.some((b) => b.type === type);
      const result = placeBlock(blocks, type, target);
      setBlocks(result.nextBlocks);
      selectBlock(type, { focus: true });
      announce(
        isNew
          ? t.status.added(name(type), describePosition(result.nextBlocks, type))
          : t.status.moved(name(type), describePosition(result.nextBlocks, type)),
      );
      opts.onBlockDrop?.(makeDropEvent(result));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [blocks, selectBlock, announce, t, opts.onBlockDrop],
  );

  /** Keyboard / touch alternative to dragging: add after the selected block, or at the end. */
  const addBlock = useCallback(
    (type: BlockType) => {
      dropBlock(type, selected && blocks.some((b) => b.type === selected)
        ? { type: selected, after: true }
        : { type: "end", after: true });
    },
    [blocks, dropBlock, selected],
  );

  const moveBlock = useCallback(
    (type: BlockType, delta: -1 | 1) => {
      const next = moveBlockBy(blocks, type, delta);
      if (next === blocks) return;
      setBlocks(next);
      announce(t.status.moved(name(type), describePosition(next, type)));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [blocks, announce, t],
  );

  const toggleHidden = useCallback(
    (type: BlockType) => {
      const wasHidden = blocks.find((b) => b.type === type)?.hidden;
      setBlocks(toggleIn(blocks, type));
      announce(wasHidden ? t.status.shown(name(type)) : t.status.hidden(name(type)));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [blocks, announce, t],
  );

  const removeBlock = useCallback(
    (type: BlockType) => {
      setBlocks(removeFrom(blocks, type));
      setSelected((s) => (s === type ? null : s));
      announce(t.status.removed(name(type)));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [blocks, announce, t],
  );

  const updateData = useCallback(
    <K extends BlockType>(type: K, patch: Partial<InvitationData[K]>) => {
      setData((prev) => ({ ...prev, [type]: { ...prev[type], ...patch } }));
    },
    [],
  );

  const changeTemplate = useCallback(
    (id: string) => {
      const next = templates.find((x) => x.id === id);
      if (!next) return;
      setTemplateId(id);
      announce(t.status.template(next.name));
    },
    [templates, announce, t],
  );

  return {
    template,
    templateId,
    blocks,
    data,
    selected,
    tab,
    inspectorOpen,
    previewOpen,
    focusRequest,
    replayToken,
    setTab,
    setInspectorOpen,
    setPreviewOpen,
    replay: () => setReplayToken((n) => n + 1),
    selectBlock,
    dropBlock,
    addBlock,
    moveBlock,
    toggleHidden,
    removeBlock,
    updateData,
    changeTemplate,
  };
}
