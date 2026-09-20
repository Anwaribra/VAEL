import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { InvitationRenderer } from "../InvitationRenderer";
import { strings, templateText } from "../i18n";
import type { Dir, InvitationData, Locale, Template } from "../types";

interface Props {
  template: Template;
  data: InvitationData;
  locale: Locale;
  dir: Dir;
  /** Position relative to the active card (0 = active, -1 = one to the left, ...). */
  offset: number;
  index: number;
  total: number;
  onActivate: () => void;
}

/**
 * One design on its material surface. The invitation itself is rendered by the
 * shared renderer; this component only positions it in the cover-flow.
 */
export function TemplateCard({ template, data, locale, dir, offset, index, total, onActivate }: Props) {
  const t = strings[locale];
  const active = offset === 0;
  // A card that wraps from one end to the other must not fly across the row.
  const prev = useRef(offset);
  const jump = Math.abs(offset - prev.current) > 2;
  useEffect(() => {
    prev.current = offset;
  }, [offset]);
  const abs = Math.abs(offset);
  const sign = dir === "rtl" ? -1 : 1;
  const { name } = templateText(template, locale);

  const style = {
    "--x": offset * sign,
    "--abs": abs,
    "--v-stage": template.stage,
    zIndex: 20 - abs,
  } as CSSProperties;

  return (
    <div
      className={`vael-card${active ? " is-active" : ""}${jump ? " is-jump" : ""}`}
      style={style}
      data-far={abs > 2 ? "true" : undefined}
      role="group"
      aria-roledescription="slide"
      aria-label={t.slideLabel(index + 1, total, name)}
    >
      <div className="vael-card__table">
        <div className="vael-card__paper">
          <InvitationRenderer
            template={template}
            data={data}
            locale={locale}
            dir={dir}
            motion={active ? "reveal" : "static"}
            showPlaceholders={false}
            interactive={false}
          />
        </div>
      </div>
      {!active && (
        <button type="button" className="vael-card__hit" onClick={onActivate} aria-label={t.showDesign(name)} />
      )}
    </div>
  );
}
