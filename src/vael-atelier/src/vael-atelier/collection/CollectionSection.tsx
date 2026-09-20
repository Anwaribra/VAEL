import { useId, useMemo, useState } from "react";
import { sampleData } from "../blocks";
import { strings } from "../i18n";
import { createUrl, requestUrl, saveSelectedTemplateId } from "../storage";
import { templates as defaultTemplates } from "../templates";
import type { Dir, InvitationData, Locale, Template } from "../types";
import { PreviewDrawer } from "./PremiumPreviewDrawer";
import { TemplateGallery } from "./TemplateGallery";

export interface CollectionSectionProps {
  /** Defaults to the ten built-in designs. */
  templates?: Template[];
  locale?: Locale;
  dir?: Dir;
  /** Sample content shown on every card. Defaults to neutral placeholder names. */
  sampleInvitation?: InvitationData;
  /** Which design starts in front. */
  initialTemplateId?: string;
  /** Anchor id, so the hero's "Explore the collection" can link to `#collection`. */
  id?: string;
  createPath?: string;
  customPath?: string;
  /**
   * Router hook. Called with `/create?template=id` (free) or
   * `/custom?template=id&templateName=Name` (premium request).
   * With react-router: `navigate={(to) => navigate(to)}`.
   */
  navigate?: (to: string) => void;
  /** Fires after the id is saved. Use it instead of `navigate` if you prefer to route yourself. */
  onUseTemplate?: (template: Template) => void;
  onRequestPremiumTemplate?: (template: Template) => void;
  className?: string;
}

/**
 * Drop-in replacement for the current Collection section.
 * Self-contained: its own background, type and spacing.
 */
export function CollectionSection({
  templates = defaultTemplates,
  locale = "en",
  dir = locale === "ar" ? "rtl" : "ltr",
  sampleInvitation,
  initialTemplateId,
  id = "collection",
  createPath = "/create",
  customPath = "/custom",
  navigate,
  onUseTemplate,
  onRequestPremiumTemplate,
  className,
}: CollectionSectionProps) {
  const t = strings[locale];
  const headingId = useId();
  const data = useMemo(() => sampleInvitation ?? sampleData(locale), [sampleInvitation, locale]);
  const [preview, setPreview] = useState<Template | null>(null);

  const use = (template: Template) => {
    // 1. remember the choice, 2. tell the host, 3. go straight to the builder.
    saveSelectedTemplateId(template.id);
    onUseTemplate?.(template);
    const to = createUrl(createPath, template.id);
    if (navigate) navigate(to);
    else if (!onUseTemplate && typeof window !== "undefined") window.location.assign(to);
    setPreview(null);
  };

  const request = (template: Template) => {
    onRequestPremiumTemplate?.(template);
    const to = requestUrl(customPath, template);
    if (navigate) navigate(to);
    else if (!onRequestPremiumTemplate && typeof window !== "undefined") window.location.assign(to);
    setPreview(null);
  };

  return (
    <section
      id={id}
      className={`vael-atelier vael-collection${className ? " " + className : ""}`}
      dir={dir}
      aria-labelledby={headingId}
    >
      <div className="vael-collection__inner">
        <header className="vael-collection__head">
          <h2 id={headingId} className="vael-collection__title">
            {t.collectionTitle}
          </h2>
          <p className="vael-collection__sub">{t.collectionSubtitle}</p>
        </header>

        <TemplateGallery
          templates={templates}
          data={data}
          locale={locale}
          dir={dir}
          initialTemplateId={initialTemplateId}
          onPreview={setPreview}
          onUse={use}
          onRequest={request}
        />
      </div>

      <PreviewDrawer
        template={preview}
        data={data}
        locale={locale}
        dir={dir}
        onClose={() => setPreview(null)}
        onUse={use}
        onRequest={request}
      />
    </section>
  );
}
