import { useContext, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useDndContext,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { Announcements, DragEndEvent, DragMoveEvent, DragStartEvent, Modifier } from "@dnd-kit/core";
import { getEventCoordinates } from "@dnd-kit/utilities";
import { availableBlocks } from "../blocks";
import { useDialogBehavior, useMediaQuery, useStatus } from "../hooks";
import { IconClose, IconReplay } from "../icons";
import { strings, templateText } from "../i18n";
import { InvitationRenderer } from "../InvitationRenderer";
import { PreviewDrawer } from "../collection/PremiumPreviewDrawer";
import { resolveInitialTemplateId, saveSelectedTemplateId } from "../storage";
import { templates as defaultTemplates } from "../templates";
import type {
  BlockDropEvent,
  BlockState,
  BlockType,
  BuilderSnapshot,
  Dir,
  InvitationData,
  Locale,
  Template,
} from "../types";
import { BlockPalette } from "./BlockPalette";
import { DesignPanel } from "./DesignPanel";
import {
  DropHintContext,
  PREVIEW_END,
  ZONE_PREVIEW,
  invitationCollision,
  previewId,
  typeFromDropId,
} from "./dnd";
import type { DragData, DropHint } from "./dnd";
import { fileToDataUrl } from "./../image";
import { Inspector } from "./Inspector";
import { StructureList } from "./StructureList";
import { useBuilder } from "./useBuilder";
import { createInvitation } from "../../../../lib/supabase";

export interface InvitationBuilderProps {
  /** Defaults to the ten built-in designs. */
  templates?: Template[];
  /**
   * Which design to open with. If omitted, the builder uses `?template=` from the URL,
   * then the id saved by the gallery, then the first free design.
   */
  initialTemplateId?: string;
  initialBlocks?: BlockState[];
  initialInvitationData?: Partial<InvitationData>;
  locale?: Locale;
  dir?: Dir;
  /** Fires on every change to the design, structure or content. */
  onChange?: (snapshot: BuilderSnapshot) => void;
  /** Fires after a block is dropped (or added) with its exact position. */
  onBlockDrop?: (event: BlockDropEvent) => void;
  /** Fires from a premium preview's "Request this design". Route to /custom here. */
  onUsePremiumTemplate?: (template: Template) => void;
  /**
   * Opt-in draft persistence. Pass a localStorage key to keep the user's work
   * between visits. Leave undefined to manage persistence yourself with onChange.
   */
  storageKey?: string | null;
  className?: string;
}

/** Keeps the small drag chip centred on the cursor, whatever it was grabbed by. */
const CHIP_W = 176;
const CHIP_H = 40;
const centreChipOnPointer: Modifier = ({ transform, activatorEvent, draggingNodeRect }) => {
  if (!draggingNodeRect || !activatorEvent) return transform;
  const point = getEventCoordinates(activatorEvent);
  if (!point) return transform;
  return {
    ...transform,
    x: transform.x + (point.x - draggingNodeRect.left) - CHIP_W / 2,
    y: transform.y + (point.y - draggingNodeRect.top) - CHIP_H / 2,
  };
};

/* The invitation preview: each block is a drop target and a click target. */
function PreviewSlot({
  type,
  selected,
  onSelect,
  children,
}: {
  type: BlockType;
  selected: boolean;
  onSelect: (type: BlockType) => void;
  children: React.ReactNode;
}) {
  const { setNodeRef } = useDroppable({ id: previewId(type) });
  const hint = useHintFor(type);
  return (
    <div
      ref={setNodeRef}
      className={`previewBlock${selected ? " previewBlock--selected" : ""}${hint}`}
      data-preview-block={type}
      onClick={() => onSelect(type)}
    >
      {children}
    </div>
  );
}

function PreviewEnd() {
  const { setNodeRef } = useDroppable({ id: PREVIEW_END });
  const { active } = useDndContext();
  return <div ref={setNodeRef} className={`vael-preview-end${active ? " is-live" : ""}`} aria-hidden="true" />;
}

function useHintFor(type: BlockType): string {
  const hint = useContext(DropHintContext);
  if (!hint || hint.type !== type) return "";
  return hint.after ? " drop-after" : " drop-before";
}

function StageZone({ children, className }: { children: React.ReactNode; className: string }) {
  const { setNodeRef } = useDroppable({ id: ZONE_PREVIEW });
  return (
    <div ref={setNodeRef} className={className}>
      {children}
    </div>
  );
}

/**
 * Self-contained builder: elements on the left, a large live preview in the
 * middle, settings for the selected element on the right. On small screens it
 * becomes one column with a preview sheet.
 */
export function InvitationBuilder({
  templates = defaultTemplates,
  initialTemplateId,
  initialBlocks,
  initialInvitationData,
  locale = "en",
  dir = locale === "ar" ? "rtl" : "ltr",
  onChange,
  onBlockDrop,
  onUsePremiumTemplate,
  storageKey,
  className,
}: InvitationBuilderProps) {
  const t = strings[locale];
  const isMobile = useMediaQuery("(max-width: 900px)");
  const { message: status, announce } = useStatus();

  const resolvedId = useMemo(
    () =>
      initialTemplateId && templates.some((x) => x.id === initialTemplateId && x.access === "free")
        ? initialTemplateId
        : resolveInitialTemplateId(templates),
    [initialTemplateId, templates],
  );

  const b = useBuilder({
    templates,
    templateId: resolvedId,
    initialBlocks,
    initialData: initialInvitationData,
    locale,
    storageKey,
    announce,
    isMobile,
    onChange,
    onBlockDrop,
  });

  const [shareModal, setShareModal] = useState<{ slug: string; token: string } | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const result = await createInvitation({
        templateId: template.id,
        blocks: b.blocks,
        data: b.data,
      });
      setShareModal(result);
    } catch (err: any) {
      alert(err.message || (locale === "ar" ? "فشل حفظ الدعوة." : "Failed to publish invitation."));
    } finally {
      setIsPublishing(false);
    }
  };

  const [premiumPreview, setPremiumPreview] = useState<Template | null>(null);
  const [activeDrag, setActiveDrag] = useState<DragData | null>(null);
  const [hint, setHint] = useState<DropHint | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 6 } }),
    useSensor(KeyboardSensor),
  );

  /* ---------------------------------------------------------- dnd wiring */

  const resolve = (event: DragMoveEvent | DragEndEvent): DropHint | null => {
    const { active, over } = event;
    if (!over) return null;
    const target = typeFromDropId(String(over.id));
    const data = active.data.current as DragData | undefined;
    if (!target || !data) return null;
    if (target === data.type) return null; // over itself
    if (target === "end") return { type: "end", after: true };
    // Where is the pointer right now? Upper half of the target means "before it".
    const overMid = over.rect.top + over.rect.height / 2;
    const ev = event.activatorEvent as Partial<PointerEvent & TouchEvent>;
    let pointerY: number | null = null;
    if (typeof ev.clientY === "number") pointerY = ev.clientY + event.delta.y;
    else if (ev.touches && ev.touches[0]) pointerY = ev.touches[0].clientY + event.delta.y;
    if (pointerY === null) {
      // keyboard dragging has no pointer: compare the dragged item's own centre
      const moved = active.rect.current.translated;
      pointerY = moved ? moved.top + moved.height / 2 : overMid;
    }
    return { type: target, after: pointerY > overMid };
  };

  const setHintIfChanged = (next: DropHint | null) =>
    setHint((prev) =>
      prev?.type === next?.type && prev?.after === next?.after ? prev : next,
    );

  const onDragStart = (e: DragStartEvent) => setActiveDrag((e.active.data.current as DragData) ?? null);
  const onDragMove = (e: DragMoveEvent) => setHintIfChanged(resolve(e));
  const onDragEnd = (e: DragEndEvent) => {
    const drop = resolve(e);
    setActiveDrag(null);
    setHint(null);
    const data = e.active.data.current as DragData | undefined;
    if (!drop || !data) return;
    // The block lands at the drop position, is selected, its settings open and
    // its first field takes focus. All of that happens inside dropBlock.
    b.dropBlock(data.type, drop);
  };
  const onDragCancel = () => {
    setActiveDrag(null);
    setHint(null);
  };

  const announcements: Announcements = {
    onDragStart: ({ active }) => {
      const d = active.data.current as DragData | undefined;
      return d ? t.dnd.pickedUp(t.blockNames[d.type]) : undefined;
    },
    onDragOver: ({ active, over }) => {
      const d = active.data.current as DragData | undefined;
      const target = over ? typeFromDropId(String(over.id)) : null;
      if (!d || !target) return undefined;
      return t.dnd.overTarget(t.blockNames[d.type], target === "end" ? t.where.end : t.blockNames[target]);
    },
    onDragEnd: ({ active }) => {
      const d = active.data.current as DragData | undefined;
      return d ? t.dnd.dropped(t.blockNames[d.type]) : undefined;
    },
    onDragCancel: ({ active }) => {
      const d = active.data.current as DragData | undefined;
      return d ? t.dnd.cancelled(t.blockNames[d.type]) : undefined;
    },
  };

  /* ------------------------------------------------ focus after drop/add */

  const rightRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLElement | null>(null);
  const closeInspectorRef = useRef<HTMLButtonElement | null>(null);
  const closePreviewRef = useRef<HTMLButtonElement | null>(null);

  const firstField = (type: BlockType | null | undefined) =>
    type
      ? rightRef.current?.querySelector<HTMLElement>(`[data-inspector-block="${type}"] [data-first-field]`)
      : null;

  const focusReq = b.focusRequest;
  useEffect(() => {
    if (!focusReq) return;
    const id = requestAnimationFrame(() => {
      const el = firstField(focusReq.type);
      if (!el) return;
      el.focus({ preventScroll: true });
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
        try {
          el.select();
        } catch {
          /* some input types cannot select */
        }
      }
    });
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusReq]);

  /* Small screens: both sheets behave like dialogs. */
  useDialogBehavior(
    rightRef,
    isMobile && b.inspectorOpen,
    () => b.setInspectorOpen(false),
    () => firstField(b.selected) ?? closeInspectorRef.current,
  );
  useDialogBehavior(stageRef, isMobile && b.previewOpen, () => b.setPreviewOpen(false), () => closePreviewRef.current);

  /* ------------------------------------------------------------- photo */

  const onPhotoFile = async (file: File) => {
    try {
      const src = await fileToDataUrl(file);
      b.updateData("photo", { src });
      announce(t.status.photoUpdated);
    } catch {
      announce(t.status.photoError);
    }
  };

  const pickDesign = (tpl: Template) => {
    if (tpl.access === "premium") {
      setPremiumPreview(tpl);
      return;
    }
    saveSelectedTemplateId(tpl.id);
    b.changeTemplate(tpl.id);
  };

  /* --------------------------------------------------------------- view */

  const template = b.template;
  const { name: templateName } = templateText(template, locale);
  const available = availableBlocks(b.blocks);
  const sheetOpen = isMobile && (b.inspectorOpen || b.previewOpen);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={invitationCollision}
      onDragStart={onDragStart}
      onDragMove={onDragMove}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
      accessibility={{ announcements, screenReaderInstructions: { draggable: t.dnd.instructions } }}
    >
      <DropHintContext.Provider value={hint}>
        <div
          className={`vael-atelier vael-builder${className ? " " + className : ""}`}
          dir={dir}
          data-inspector-open={b.inspectorOpen}
          data-preview-open={b.previewOpen}
          style={{ "--v-stage": template.stage } as CSSProperties}
        >
          {/* ------------------------------------------------ left: elements + structure */}
          <aside className="vael-builder__left" aria-label={t.builderLabel}>
            <div className="vael-builder__design-summary">
              <p className="vael-panel__hint">{t.currentDesign}</p>
              <p className="vael-builder__design-name">{templateName}</p>
              <button
                type="button"
                className="vael-btn vael-btn--quiet"
                onClick={() => {
                  b.setTab("design");
                  b.setInspectorOpen(true);
                }}
              >
                {t.changeDesign}
              </button>
            </div>
            <BlockPalette available={available} t={t} onAdd={b.addBlock} />
            <StructureList
              blocks={b.blocks}
              selected={b.selected}
              t={t}
              onSelect={(type) => b.selectBlock(type, { focus: false })}
              onMove={b.moveBlock}
              onToggle={b.toggleHidden}
              onRemove={b.removeBlock}
            />
          </aside>

          {/* --------------------------------------------------- centre: live preview */}
          <main
            ref={stageRef}
            className="vael-builder__stage"
            data-open={b.previewOpen}
            role={isMobile ? "dialog" : "region"}
            aria-modal={isMobile && b.previewOpen ? true : undefined}
            aria-label={t.previewSheetLabel}
          >
            <div className="vael-stage__bar">
              <p className="vael-stage__name">{templateName}</p>
              <button type="button" className="vael-btn vael-btn--quiet vael-stage__replay" onClick={b.replay}>
                <IconReplay />
                {t.replay}
              </button>
              <button
                type="button"
                className="vael-btn vael-btn--solid"
                style={{ marginInlineStart: "auto", padding: "0.45rem 1.2rem", fontSize: "0.85rem", fontWeight: 600, background: "var(--vc-ink)", color: "var(--vc-paper)" }}
                onClick={handlePublish}
                disabled={isPublishing}
              >
                {isPublishing
                  ? (locale === "ar" ? "جاري الحفظ..." : "Saving...")
                  : (locale === "ar" ? "نشر ومشاركة" : "Publish & Share")}
              </button>
              <button
                ref={closePreviewRef}
                type="button"
                className="vael-iconbtn vael-sheet__close"
                onClick={() => b.setPreviewOpen(false)}
                aria-label={t.close}
              >
                <IconClose />
              </button>
            </div>
            <StageZone className="vael-stage__canvas">
              <div className="vael-stage__paper">
                <InvitationRenderer
                  template={template}
                  blocks={b.blocks}
                  data={b.data}
                  locale={locale}
                  dir={dir}
                  motion="static"
                  replayToken={b.replayToken}
                  interactive={false}
                  wrapBlock={(type, node) => (
                    <PreviewSlot
                      key={type}
                      type={type}
                      selected={b.selected === type}
                      onSelect={(tp) => b.selectBlock(tp, { focus: false })}
                    >
                      {node}
                    </PreviewSlot>
                  )}
                  endSlot={<PreviewEnd />}
                />
                {b.blocks.length === 0 && <p className="vael-stage__empty">{t.stageEmpty}</p>}
              </div>
            </StageZone>
            <div className="vael-toast" aria-hidden="true" data-show={status ? "true" : "false"}>
              {status}
            </div>
          </main>

          {/* ----------------------------------------------- right: settings for the block */}
          <aside
            ref={rightRef}
            className="vael-builder__right"
            data-open={b.inspectorOpen}
            role={isMobile ? "dialog" : "complementary"}
            aria-modal={isMobile && b.inspectorOpen ? true : undefined}
            aria-label={t.inspectorSheetLabel}
          >
            <div className="vael-inspector__tabs" role="tablist" aria-label={t.inspectorSheetLabel}>
              <button
                type="button"
                role="tab"
                id="vael-tab-block"
                aria-selected={b.tab === "block"}
                aria-controls="vael-panel-block"
                onClick={() => b.setTab("block")}
              >
                {t.block}
              </button>
              <button
                type="button"
                role="tab"
                id="vael-tab-design"
                aria-selected={b.tab === "design"}
                aria-controls="vael-panel-design"
                onClick={() => b.setTab("design")}
              >
                {t.design}
              </button>
              <button
                ref={closeInspectorRef}
                type="button"
                className="vael-iconbtn vael-sheet__close"
                onClick={() => b.setInspectorOpen(false)}
                aria-label={t.close}
              >
                <IconClose />
              </button>
            </div>
            <div
              className="vael-inspector"
              role="tabpanel"
              id={b.tab === "block" ? "vael-panel-block" : "vael-panel-design"}
              aria-labelledby={b.tab === "block" ? "vael-tab-block" : "vael-tab-design"}
            >
              {b.tab === "block" ? (
                <Inspector
                  selected={b.selected && b.blocks.some((x) => x.type === b.selected) ? b.selected : null}
                  data={b.data}
                  t={t}
                  onUpdate={b.updateData}
                  onPhotoFile={onPhotoFile}
                />
              ) : (
                <DesignPanel
                  templates={templates}
                  currentId={template.id}
                  locale={locale}
                  dir={dir}
                  onPick={pickDesign}
                />
              )}
            </div>
          </aside>

          {/* --------------------------------------------------------- small-screen bar */}
          <div className="vael-builder__bar">
            <button
              type="button"
              className="vael-btn vael-btn--ink"
              onClick={() => {
                b.setInspectorOpen(false);
                b.setPreviewOpen(true);
              }}
            >
              {t.previewInvitation}
            </button>
            <button
              type="button"
              className="vael-btn vael-btn--solid"
              onClick={handlePublish}
              disabled={isPublishing}
            >
              {isPublishing
                ? (locale === "ar" ? "جاري الحفظ..." : "Saving...")
                : (locale === "ar" ? "نشر ومشاركة" : "Publish & Share")}
            </button>
          </div>
          {sheetOpen && (
            <div
              className="vael-builder__scrim"
              aria-hidden="true"
              onClick={() => {
                b.setInspectorOpen(false);
                b.setPreviewOpen(false);
              }}
            />
          )}

          {/* one announcement channel for assistive tech */}
          <div className="vael-vh" role="status" aria-live="polite">
            {status}
          </div>
        </div>

        <PreviewDrawer
          template={premiumPreview}
          data={b.data}
          locale={locale}
          dir={dir}
          onClose={() => setPremiumPreview(null)}
          onUse={() => setPremiumPreview(null)}
          onRequest={(tpl) => {
            setPremiumPreview(null);
            onUsePremiumTemplate?.(tpl);
          }}
        />

        {shareModal && (
          <div className="vael-atelier vael-drawer" dir={dir} data-open="true" style={{ zIndex: 9999 }}>
            <div className="vael-drawer__scrim" onClick={() => setShareModal(null)} aria-hidden="true" />
            <div
              className="vael-drawer__panel"
              style={{
                maxWidth: "540px",
                margin: "auto",
                padding: "2.2rem 1.8rem",
                borderRadius: "1.8rem",
                maxHeight: "90vh",
                overflowY: "auto",
                background: "linear-gradient(180deg, #18090d 0%, #100508 100%)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "var(--vc-paper)",
                boxShadow: "0 30px 90px rgba(0,0,0,0.8)"
              }}
            >
              <button
                type="button"
                className="vael-iconbtn vael-drawer__close"
                onClick={() => setShareModal(null)}
                aria-label={t.close}
              >
                <IconClose />
              </button>

              <div style={{ textAlign: "center", marginBottom: "1.8rem" }}>
                <h2 style={{ fontFamily: "var(--vc-display)", fontSize: "1.9rem", margin: 0, fontWeight: 500 }}>
                  {locale === "ar" ? "تم حفظ ونشر دعوتك بنجاح" : "Your Invitation is Live"}
                </h2>
                <p style={{ color: "var(--vc-paper-dim)", fontSize: "0.9rem", marginTop: "0.5rem", lineHeight: 1.5 }}>
                  {locale === "ar"
                    ? "تم حفظ تصميم هذه الدعوة في قاعدة البيانات مجاناً ويمكنك مشاركتها الآن مباشرة مع الضيوف"
                    : "Saved to VAEL database. Share this link directly with your guests to view and confirm attendance."}
                </p>
              </div>

              {/* Box 1: Guest Share Link */}
              <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "1.2rem", padding: "1.2rem", marginBottom: "1.2rem", border: "1px solid rgba(255,255,255,0.12)" }}>
                <label style={{ display: "block", fontSize: "0.78rem", fontFamily: "monospace", textTransform: "uppercase", color: "var(--vc-brass-light)", marginBottom: "0.5rem", fontWeight: 600 }}>
                  {locale === "ar" ? "رابط المعازيم والضيوف (Guest Link)" : "Guest Invitation Link"}
                </label>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <input
                    type="text"
                    readOnly
                    value={`${typeof window !== "undefined" ? window.location.origin : ""}/i/${shareModal.slug}`}
                    style={{ flex: 1, padding: "0.65rem 0.8rem", borderRadius: "0.6rem", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.4)", color: "#fff", fontSize: "0.85rem", fontFamily: "monospace" }}
                  />
                  <button
                    type="button"
                    className="vael-btn vael-btn--solid"
                    style={{ padding: "0.65rem 1rem", fontSize: "0.8rem", whiteSpace: "nowrap" }}
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/i/${shareModal.slug}`);
                      setCopiedLink(true);
                      setTimeout(() => setCopiedLink(false), 3000);
                    }}
                  >
                    {copiedLink ? (locale === "ar" ? "تم النسخ" : "Copied") : (locale === "ar" ? "نسخ" : "Copy")}
                  </button>
                </div>
                <div style={{ marginTop: "1rem", display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                  <a
                    href={`/i/${shareModal.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="vael-btn vael-btn--quiet"
                    style={{ fontSize: "0.8rem", padding: "0.45rem 0.9rem" }}
                  >
                    {locale === "ar" ? "فتح رابط الضيوف" : "Open Guest Link"}
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      locale === "ar"
                        ? `ندعوكم لحضور حفلنا المميز، يسعدنا وجودكم وتأكيد الحضور عبر الرابط:\n${typeof window !== "undefined" ? window.location.origin : ""}/i/${shareModal.slug}`
                        : `We invite you to our celebration! View invitation & confirm attendance:\n${typeof window !== "undefined" ? window.location.origin : ""}/i/${shareModal.slug}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="vael-btn vael-btn--solid"
                    style={{ fontSize: "0.8rem", padding: "0.45rem 0.9rem", background: "#25D366", color: "#fff", borderColor: "#25D366" }}
                  >
                    {locale === "ar" ? "مشاركة عبر واتساب" : "Share via WhatsApp"}
                  </a>
                </div>
              </div>

              {/* Box 2: Owner Edit Link */}
              <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "1.2rem", padding: "1.1rem", border: "1px dashed rgba(255,255,255,0.15)" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontFamily: "monospace", textTransform: "uppercase", color: "#a1a1aa", marginBottom: "0.4rem" }}>
                  {locale === "ar" ? "رابط التعديل والإدارة الخاص بك" : "Secret Edit & Manage Link"}
                </label>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <input
                    type="text"
                    readOnly
                    value={`${typeof window !== "undefined" ? window.location.origin : ""}/manage/${shareModal.slug}#${shareModal.token}`}
                    style={{ flex: 1, padding: "0.55rem 0.7rem", borderRadius: "0.6rem", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#a1a1aa", fontSize: "0.75rem", fontFamily: "monospace" }}
                  />
                  <button
                    type="button"
                    className="vael-btn vael-btn--quiet"
                    style={{ padding: "0.55rem 0.8rem", fontSize: "0.75rem", whiteSpace: "nowrap" }}
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/manage/${shareModal.slug}#${shareModal.token}`);
                      alert(locale === "ar" ? "تم نسخ رابط التعديل الخاص بك!" : "Edit link copied!");
                    }}
                  >
                    {locale === "ar" ? "نسخ رابط التعديل" : "Copy Edit Link"}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        <DragOverlay dropAnimation={null} modifiers={[centreChipOnPointer]} style={{ width: CHIP_W, height: CHIP_H }}>
          {activeDrag ? (
            <div className={`vael-atelier vael-dragchip`} dir={dir}>
              {t.blockNames[activeDrag.type]}
            </div>
          ) : null}
        </DragOverlay>
      </DropHintContext.Provider>
    </DndContext>
  );
}
