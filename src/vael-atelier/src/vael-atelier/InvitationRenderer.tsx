import { memo, useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { sampleData } from "./blocks";
import { strings } from "./i18n";
import { templateVars } from "./materials";
import { Seal } from "./Seal";
import type {
  BlockState,
  BlockType,
  Dir,
  InvitationData,
  Locale,
  Template,
} from "./types";

export interface InvitationRendererProps {
  template: Template;
  /** Ordered blocks. Defaults to the template's own block order. */
  blocks?: BlockState[];
  data?: InvitationData;
  locale?: Locale;
  dir?: Dir;
  /** `reveal` plays the template's opening once. `static` renders the finished card. */
  motion?: "reveal" | "static";
  /** Change this number to replay the opening. */
  replayToken?: number;
  /** Show muted hints for empty fields (builder). Turn off for a published invitation. */
  showPlaceholders?: boolean;
  /** When false, links and buttons are inert (gallery, drawer, builder). */
  interactive?: boolean;
  /** Lets the builder wrap each block (selection, drop targets) without forking the renderer. */
  wrapBlock?: (type: BlockType, node: ReactNode, index: number) => ReactNode;
  /** Rendered after the last block (builder drop zone). */
  endSlot?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

function formatDate(value: string, locale: Locale, weekday: boolean): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return value;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  try {
    return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-GB", {
      weekday: weekday ? "long" : undefined,
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
  } catch {
    return value;
  }
}

function formatTime(value: string, locale: Locale): string {
  const m = /^(\d{2}):(\d{2})$/.exec(value);
  if (!m) return value;
  const d = new Date(2000, 0, 1, Number(m[1]), Number(m[2]));
  try {
    return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-GB", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(d);
  } catch {
    return value;
  }
}

function InvitationRendererBase({
  template,
  blocks,
  data,
  locale = "en",
  dir = locale === "ar" ? "rtl" : "ltr",
  motion = "static",
  replayToken = 0,
  showPlaceholders = true,
  interactive = true,
  wrapBlock,
  endSlot,
  className,
  style,
}: InvitationRendererProps) {
  const t = strings[locale];
  const content = data ?? sampleData(locale);
  const list: BlockState[] =
    blocks ?? template.blockOrder.map((type) => ({ type, hidden: false }));
  const visible = list.filter((b) => !b.hidden);

  /* Replay: drop the playing class for two frames, then put it back. */
  const [resetting, setResetting] = useState(false);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setResetting(true);
    let a = 0;
    let b = 0;
    a = requestAnimationFrame(() => {
      b = requestAnimationFrame(() => setResetting(false));
    });
    return () => {
      cancelAnimationFrame(a);
      cancelAnimationFrame(b);
    };
  }, [replayToken]);

  const playing = motion === "reveal" && !resetting;

  const ph = (value: string, placeholder: string) => {
    if (value.trim()) return value;
    return showPlaceholders ? <span className="vael-placeholder">{placeholder}</span> : null;
  };

  const inert = interactive
    ? {}
    : {
        tabIndex: -1,
        "aria-disabled": true as const,
        onClick: (e: React.MouseEvent) => e.preventDefault(),
      };

  const renderBlock = (type: BlockType): ReactNode => {
    switch (type) {
      case "names": {
        const n = content.names;
        const empty = !n.partnerOne.trim() && !n.partnerTwo.trim();
        if (empty) {
          return showPlaceholders ? (
            <h2 className="vael-names" dir="auto">
              <span className="vael-placeholder">{t.placeholders.names}</span>
            </h2>
          ) : null;
        }
        return (
          <h2 className="vael-names" dir="auto">
            <span className="vael-names__one">{n.partnerOne}</span>
            {n.connector.trim() && <span className="vael-names__and">{n.connector}</span>}
            <span className="vael-names__two">{n.partnerTwo}</span>
          </h2>
        );
      }
      case "invitation-line":
        return <p className="vael-line" dir="auto">{ph(content["invitation-line"].text, t.placeholders.text)}</p>;
      case "date": {
        const d = content.date;
        return (
          <p className="vael-date">
            {d.value ? formatDate(d.value, locale, d.showWeekday) : ph("", t.placeholders.date)}
          </p>
        );
      }
      case "time": {
        const tm = content.time;
        return (
          <p className="vael-time" dir="auto">
            {tm.value
              ? `${tm.label ? tm.label + " " : ""}${formatTime(tm.value, locale)}`
              : ph("", t.placeholders.time)}
          </p>
        );
      }
      case "venue": {
        const v = content.venue;
        if (!v.name.trim() && !v.address.trim()) {
          return showPlaceholders ? (
            <div className="vael-venue">
              <p className="vael-venue__name" dir="auto">
                <span className="vael-placeholder">{t.placeholders.venue}</span>
              </p>
            </div>
          ) : null;
        }
        return (
          <div className="vael-venue">
            {v.name.trim() && <p className="vael-venue__name" dir="auto">{v.name}</p>}
            {v.address.trim() && <p className="vael-venue__address" dir="auto">{v.address}</p>}
          </div>
        );
      }
      case "map": {
        const m = content.map;
        if (!m.url.trim()) {
          return showPlaceholders ? (
            <p className="vael-map">
              <span className="vael-placeholder">{t.placeholders.map}</span>
            </p>
          ) : null;
        }
        return (
          <p className="vael-map">
            <a
              className="vael-link"
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              {...inert}
            >
              {m.label || m.url}
            </a>
          </p>
        );
      }
      case "message":
        return <p className="vael-message" dir="auto">{ph(content.message.text, t.placeholders.text)}</p>;
      case "photo": {
        const p = content.photo;
        return (
          <figure className={`vael-photo vael-photo--${p.shape}`}>
            {p.src ? (
              <img src={p.src} alt={p.alt} loading="lazy" decoding="async" />
            ) : showPlaceholders ? (
              <span className="vael-photo__empty">{t.placeholders.photo}</span>
            ) : null}
          </figure>
        );
      }
      case "rsvp": {
        const r = content.rsvp;
        return (
          <div className="vael-rsvp">
            <a className="vael-rsvp__button" href={r.href || undefined} {...inert}>
              {r.label || t.placeholders.rsvp}
            </a>
            {r.deadline.trim() && <p className="vael-rsvp__note" dir="auto">{r.deadline}</p>}
          </div>
        );
      }
      case "vael-mark":
        return (
          <p className="vael-mark" dir="auto">
            <span className="vael-mark__glyph" aria-hidden="true">
              V
            </span>
            {content["vael-mark"].text}
          </p>
        );
      default:
        return null;
    }
  };

  const hasSeal = template.features.includes("seal") && template.seal !== "none";
  const hasCurtain = template.features.includes("curtain");

  const classes = ["vael-inv"];
  if (playing) classes.push("is-playing");
  if (resetting) classes.push("is-reset");
  if (className) classes.push(className);

  return (
    <div
      className={classes.join(" ")}
      dir={dir}
      lang={locale}
      data-template={template.id}
      data-layout={template.layout}
      data-type={template.typography}
      data-material={template.material}
      data-motion={template.motionStyle}
      style={{ ...templateVars(template), ...style }}
    >
      {/* keyed by template so switching designs cross-fades the surface only */}
      <div className="vael-inv__material" key={template.id} aria-hidden="true">
        <div className="vael-inv__layer vael-inv__layer--a" />
        <div className="vael-inv__layer vael-inv__layer--b" />
      </div>
      <div className="vael-inv__frame" aria-hidden="true" />
      {hasSeal && <Seal kind={template.seal} />}
      <div className="vael-inv__content">
        {visible.map((b, i) => {
          const node = renderBlock(b.type);
          if (node === null) return null;
          const el = (
            <div
              key={b.type}
              className={`vael-blk vael-blk--${b.type}`}
              data-block={b.type}
              style={{ "--i": i } as CSSProperties}
            >
              {node}
            </div>
          );
          return wrapBlock ? wrapBlock(b.type, el, i) : el;
        })}
        {endSlot}
      </div>
      <div className="vael-inv__sweep" aria-hidden="true" />
      {hasCurtain && (
        <>
          <div className="vael-inv__curtain vael-inv__curtain--start" aria-hidden="true" />
          <div className="vael-inv__curtain vael-inv__curtain--end" aria-hidden="true" />
        </>
      )}
    </div>
  );
}

export const InvitationRenderer = memo(InvitationRendererBase);
