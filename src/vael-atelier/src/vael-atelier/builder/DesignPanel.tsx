import { useMemo } from "react";
import { sampleData } from "../blocks";
import { InvitationRenderer } from "../InvitationRenderer";
import { strings, templateText } from "../i18n";
import type { Dir, Locale, Template } from "../types";

interface Props {
  templates: Template[];
  currentId: string;
  locale: Locale;
  dir: Dir;
  onPick: (template: Template) => void;
}

/** Switch designs without leaving the builder. Premium designs open a preview instead. */
export function DesignPanel({ templates, currentId, locale, dir, onPick }: Props) {
  const t = strings[locale];
  const data = useMemo(() => sampleData(locale), [locale]);
  const group = (label: string, list: Template[]) =>
    list.length > 0 && (
      <div className="vael-design__group">
        <h3 className="vael-design__label">{label}</h3>
        <ul className="vael-design__grid">
          {list.map((tpl) => {
            const current = tpl.id === currentId;
            const { name } = templateText(tpl, locale);
            return (
              <li key={tpl.id} className={`vael-design__tile${current ? " is-current" : ""}`}>
                <span className="vael-design__thumb" style={{ background: tpl.stage }} aria-hidden="true">
                  <InvitationRenderer
                    template={tpl}
                    data={data}
                    locale={locale}
                    dir={dir}
                    showPlaceholders={false}
                    interactive={false}
                  />
                </span>
                <button
                  type="button"
                  className="vael-design__name"
                  aria-pressed={current}
                  onClick={() => onPick(tpl)}
                >
                  {name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );

  return (
    <div className="vael-design">
      <h3 className="vael-inspector__title">{t.designHeading}</h3>
      {group(t.designFree, templates.filter((x) => x.access === "free"))}
      {group(t.designPremium, templates.filter((x) => x.access === "premium"))}
      <p className="vael-panel__hint">{t.designPremiumNote}</p>
    </div>
  );
}
