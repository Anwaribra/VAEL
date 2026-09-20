import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { IconChevronLeft, IconChevronRight } from "../icons";
import { strings, templateText } from "../i18n";
import type { Dir, InvitationData, Locale, Template } from "../types";
import { TemplateCard } from "./TemplateCard";

export interface TemplateGalleryProps {
  templates: Template[];
  data: InvitationData;
  locale: Locale;
  dir: Dir;
  initialTemplateId?: string;
  onPreview: (template: Template) => void;
  onUse: (template: Template) => void;
  onRequest: (template: Template) => void;
}

/** Horizontal editorial gallery: one design forward, its neighbours receding. */
export function TemplateGallery({
  templates,
  data,
  locale,
  dir,
  initialTemplateId,
  onPreview,
  onUse,
  onRequest,
}: TemplateGalleryProps) {
  const t = strings[locale];
  const [active, setActive] = useState(() =>
    Math.max(0, templates.findIndex((x) => x.id === initialTemplateId)),
  );
  const current = templates[active];
  const { name, description } = templateText(current, locale);
  const isFree = current.access === "free";

  const n = templates.length;
  const go = (next: number) => setActive(((next % n) + n) % n);
  /** Shortest signed distance around the loop, so the row never runs out of neighbours. */
  const wrapOffset = (i: number) => {
    let d = (((i - active) % n) + n) % n;
    if (d > n / 2) d -= n;
    return d;
  };
  // In RTL the visual left/right are swapped relative to the list order.
  const visualStep = (dirSign: 1 | -1) => go(active + (dir === "rtl" ? -dirSign : dirSign));

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      visualStep(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      visualStep(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0);
    } else if (e.key === "End") {
      e.preventDefault();
      go(templates.length - 1);
    }
  };

  /* Swipe: a horizontal drag of 50px or more changes the design. */
  const start = useRef<{ x: number; y: number } | null>(null);
  const moved = useRef(false);
  const onPointerDown = (e: PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY };
    moved.current = false;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (!start.current) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    start.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      moved.current = true;
      // dragging left reveals the next design in LTR
      visualStep(dx < 0 ? 1 : -1);
    }
  };
  const swallowClick = (e: React.MouseEvent) => {
    if (moved.current) {
      e.stopPropagation();
      e.preventDefault();
      moved.current = false;
    }
  };

  // Keep the index valid if the list changes.
  useEffect(() => {
    if (active > templates.length - 1) setActive(0);
  }, [templates.length, active]);

  const free = templates.map((x, i) => ({ x, i })).filter(({ x }) => x.access === "free");
  const premium = templates.map((x, i) => ({ x, i })).filter(({ x }) => x.access === "premium");

  const indexGroup = (label: string, items: { x: Template; i: number }[]) =>
    items.length > 0 && (
      <div className="vael-index__group">
        <h3 className="vael-index__label">{label}</h3>
        <ul>
          {items.map(({ x, i }) => (
            <li key={x.id}>
              <button
                type="button"
                className="vael-index__item"
                aria-current={i === active ? "true" : undefined}
                onClick={() => setActive(i)}
              >
                {templateText(x, locale).name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );

  return (
    <div className="vael-gallery">
      <div
        className="vael-flow"
        role="region"
        aria-roledescription="carousel"
        aria-label={t.carouselLabel}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onClickCapture={swallowClick}
      >
        {templates.map((tpl, i) => (
          <TemplateCard
            key={tpl.id}
            template={tpl}
            data={data}
            locale={locale}
            dir={dir}
            offset={wrapOffset(i)}
            index={i}
            total={templates.length}
            onActivate={() => setActive(i)}
          />
        ))}
        <button
          type="button"
          className="vael-flow__nav vael-flow__nav--prev"
          onClick={() => visualStep(-1)}
          aria-label={t.previous}
        >
          {dir === "rtl" ? <IconChevronRight /> : <IconChevronLeft />}
        </button>
        <button
          type="button"
          className="vael-flow__nav vael-flow__nav--next"
          onClick={() => visualStep(1)}
          aria-label={t.next}
        >
          {dir === "rtl" ? <IconChevronLeft /> : <IconChevronRight />}
        </button>
      </div>

      <div className="vael-meta" aria-live="polite">
        <p className="vael-meta__access">{isFree ? t.freeDesign : t.premiumDesign}</p>
        <h3 className="vael-meta__name">{name}</h3>
        <p className="vael-meta__desc">{description}</p>
        <div className="vael-meta__actions">
          <button type="button" className="vael-btn vael-btn--quiet" onClick={() => onPreview(current)}>
            {t.previewDesign}
          </button>
          {isFree ? (
            <button type="button" className="vael-btn vael-btn--solid" onClick={() => onUse(current)}>
              {t.useDesign}
            </button>
          ) : (
            <button type="button" className="vael-btn vael-btn--solid" onClick={() => onRequest(current)}>
              {t.requestDesign}
            </button>
          )}
        </div>
      </div>

      <nav className="vael-index" aria-label={t.indexLabel}>
        {indexGroup(t.free, free)}
        {indexGroup(t.premium, premium)}
      </nav>
    </div>
  );
}
