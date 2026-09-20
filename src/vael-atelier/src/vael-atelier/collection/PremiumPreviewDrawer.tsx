import { useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { InvitationRenderer } from "../InvitationRenderer";
import { useBodyScrollLock, useDialogBehavior } from "../hooks";
import { IconClose, IconReplay } from "../icons";
import { strings, templateText } from "../i18n";
import type { Dir, InvitationData, Locale, Template } from "../types";

export interface PreviewDrawerProps {
  template: Template | null;
  data: InvitationData;
  locale: Locale;
  dir: Dir;
  onClose: () => void;
  onUse: (template: Template) => void;
  onRequest: (template: Template) => void;
}

/**
 * Full-size preview for any design. The primary action depends on access:
 * free designs open in the builder, premium designs send a request.
 * Nothing here takes payment or claims a purchase.
 */
export function PreviewDrawer(props: PreviewDrawerProps) {
  const { template } = props;
  if (!template || typeof document === "undefined") return null;
  return createPortal(<DrawerBody {...props} template={template} />, document.body);
}

function DrawerBody({
  template,
  data,
  locale,
  dir,
  onClose,
  onUse,
  onRequest,
}: PreviewDrawerProps & { template: Template }) {
  const t = strings[locale];
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [replay, setReplay] = useState(0);
  const { name, description } = templateText(template, locale);
  const isFree = template.access === "free";

  useBodyScrollLock(true);
  useDialogBehavior(panelRef, true, onClose, () => closeRef.current);

  const featureList = template.features.map((f) => t.featureNames[f]);
  let includes = featureList.join(", ");
  try {
    const ListFormat = (Intl as unknown as {
      ListFormat?: new (l: string, o: object) => { format: (items: string[]) => string };
    }).ListFormat;
    if (ListFormat) includes = new ListFormat(locale, { style: "long", type: "conjunction" }).format(featureList);
  } catch {
    /* older browsers: comma list is fine */
  }

  return (
    <div className="vael-atelier vael-drawer" dir={dir} data-open="true">
      <div className="vael-drawer__scrim" onClick={onClose} aria-hidden="true" />
      <div
        className="vael-drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={panelRef}
      >
        <div className="vael-drawer__stage" style={{ "--v-stage": template.stage } as React.CSSProperties}>
          <div className="vael-drawer__paper">
            <InvitationRenderer
              template={template}
              data={data}
              locale={locale}
              dir={dir}
              motion="reveal"
              replayToken={replay}
              showPlaceholders={false}
              interactive={false}
            />
          </div>
        </div>

        <div className="vael-drawer__body">
          <button ref={closeRef} type="button" className="vael-iconbtn vael-drawer__close" onClick={onClose} aria-label={t.close}>
            <IconClose />
          </button>
          <p className="vael-meta__access">{isFree ? t.freeDesign : t.premiumDesign}</p>
          <h2 id={titleId} className="vael-drawer__title">
            {name}
          </h2>
          <p className="vael-drawer__desc">{description}</p>

          <ul className="vael-swatches" aria-hidden="true">
            {Object.values(template.palette).map((c, i) => (
              <li key={i} style={{ background: c }} />
            ))}
          </ul>

          <p className="vael-drawer__includes">
            {t.includes} {includes}.
          </p>
          <p className="vael-drawer__note">{isFree ? t.drawerFreeNote : t.drawerPremiumNote}</p>

          <div className="vael-drawer__actions">
            {isFree ? (
              <button type="button" className="vael-btn vael-btn--solid" onClick={() => onUse(template)}>
                {t.useDesign}
              </button>
            ) : (
              <button type="button" className="vael-btn vael-btn--solid" onClick={() => onRequest(template)}>
                {t.requestDesign}
              </button>
            )}
            <button type="button" className="vael-btn vael-btn--quiet" onClick={() => setReplay((n) => n + 1)}>
              <IconReplay />
              {t.replay}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
