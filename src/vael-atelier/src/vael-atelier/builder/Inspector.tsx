import { useId } from "react";
import type { ChangeEvent, ReactNode } from "react";
import type { Strings } from "../i18n";
import type { BlockType, InvitationData } from "../types";

interface Props {
  selected: BlockType | null;
  data: InvitationData;
  t: Strings;
  onUpdate: <K extends BlockType>(type: K, patch: Partial<InvitationData[K]>) => void;
  onPhotoFile: (file: File) => void;
}

function Field({ label, children }: { label: string; children: (id: string) => ReactNode }) {
  const id = useId();
  return (
    <div className="vael-field">
      <label htmlFor={id}>{label}</label>
      {children(id)}
    </div>
  );
}

/**
 * Settings for the selected block. Every input writes straight to the shared
 * state, so the preview changes as you type. There is no Apply button.
 * The first field of each block carries data-first-field: that is what the
 * builder focuses after a drop.
 */
export function Inspector({ selected, data, t, onUpdate, onPhotoFile }: Props) {
  if (!selected) {
    return <p className="vael-panel__empty">{t.selectBlockPrompt}</p>;
  }

  const text =
    <K extends BlockType>(type: K, key: keyof InvitationData[K] & string, first = false) =>
    (id: string) => (
      <input
        id={id}
        type="text"
        value={String((data[type] as Record<string, unknown>)[key] ?? "")}
        data-first-field={first ? "" : undefined}
        onChange={(e) => onUpdate(type, { [key]: e.target.value } as Partial<InvitationData[K]>)}
      />
    );

  const area =
    <K extends BlockType>(type: K, key: keyof InvitationData[K] & string, first = false) =>
    (id: string) => (
      <textarea
        id={id}
        rows={4}
        value={String((data[type] as Record<string, unknown>)[key] ?? "")}
        data-first-field={first ? "" : undefined}
        onChange={(e) => onUpdate(type, { [key]: e.target.value } as Partial<InvitationData[K]>)}
      />
    );

  const f = t.fields;
  let body: ReactNode = null;

  switch (selected) {
    case "names":
      body = (
        <>
          <Field label={f.partnerOne}>{text("names", "partnerOne", true)}</Field>
          <Field label={f.connector}>{text("names", "connector")}</Field>
          <Field label={f.partnerTwo}>{text("names", "partnerTwo")}</Field>
        </>
      );
      break;
    case "invitation-line":
      body = <Field label={f.text}>{area("invitation-line", "text", true)}</Field>;
      break;
    case "date":
      body = (
        <>
          <Field label={f.date}>
            {(id) => (
              <input
                id={id}
                type="date"
                value={data.date.value}
                data-first-field=""
                onChange={(e) => onUpdate("date", { value: e.target.value })}
              />
            )}
          </Field>
          <label className="vael-check">
            <input
              type="checkbox"
              checked={data.date.showWeekday}
              onChange={(e) => onUpdate("date", { showWeekday: e.target.checked })}
            />
            <span>{f.showWeekday}</span>
          </label>
        </>
      );
      break;
    case "time":
      body = (
        <>
          <Field label={f.time}>
            {(id) => (
              <input
                id={id}
                type="time"
                value={data.time.value}
                data-first-field=""
                onChange={(e) => onUpdate("time", { value: e.target.value })}
              />
            )}
          </Field>
          <Field label={f.timeLabel}>{text("time", "label")}</Field>
        </>
      );
      break;
    case "venue":
      body = (
        <>
          <Field label={f.venueName}>{text("venue", "name", true)}</Field>
          <Field label={f.address}>{text("venue", "address")}</Field>
        </>
      );
      break;
    case "map":
      body = (
        <>
          <Field label={f.mapUrl}>
            {(id) => (
              <input
                id={id}
                type="url"
                inputMode="url"
                placeholder="https://maps.google.com/…"
                value={data.map.url}
                data-first-field=""
                onChange={(e) => onUpdate("map", { url: e.target.value })}
              />
            )}
          </Field>
          <Field label={f.mapLabel}>{text("map", "label")}</Field>
        </>
      );
      break;
    case "message":
      body = <Field label={f.message}>{area("message", "text", true)}</Field>;
      break;
    case "photo": {
      const p = data.photo;
      body = (
        <>
          <div className="vael-field">
            <span className="vael-field__label">{p.src ? f.photoReplace : f.photoUpload}</span>
            <label className="vael-filebtn">
              <input
                type="file"
                accept="image/*"
                className="vael-vh"
                data-first-field=""
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) onPhotoFile(file);
                  e.target.value = "";
                }}
              />
              <span className="vael-btn vael-btn--ink">{p.src ? f.photoReplace : f.photoUpload}</span>
            </label>
            {p.src && (
              <button type="button" className="vael-btn vael-btn--quiet" onClick={() => onUpdate("photo", { src: "" })}>
                {f.photoRemove}
              </button>
            )}
          </div>
          <Field label={f.photoAlt}>{text("photo", "alt")}</Field>
          <Field label={f.photoShape}>
            {(id) => (
              <select
                id={id}
                value={p.shape}
                onChange={(e) => onUpdate("photo", { shape: e.target.value as InvitationData["photo"]["shape"] })}
              >
                <option value="arch">{f.shapes.arch}</option>
                <option value="rectangle">{f.shapes.rectangle}</option>
                <option value="oval">{f.shapes.oval}</option>
              </select>
            )}
          </Field>
        </>
      );
      break;
    }
    case "rsvp":
      body = (
        <>
          <Field label={f.rsvpLabel}>{text("rsvp", "label", true)}</Field>
          <Field label={f.rsvpDeadline}>{text("rsvp", "deadline")}</Field>
          <Field label={f.rsvpHref}>
            {(id) => (
              <input
                id={id}
                type="text"
                inputMode="url"
                placeholder="https://wa.me/… · tel:+20…"
                value={data.rsvp.href}
                onChange={(e) => onUpdate("rsvp", { href: e.target.value })}
              />
            )}
          </Field>
        </>
      );
      break;
    case "vael-mark":
      body = <Field label={f.markText}>{text("vael-mark", "text", true)}</Field>;
      break;
  }

  return (
    <div key={selected} data-inspector-block={selected} className="vael-inspector__fields">
      <h3 className="vael-inspector__title">{t.blockNames[selected]}</h3>
      {body}
    </div>
  );
}
