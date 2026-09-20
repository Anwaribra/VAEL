/**
 * Tiny, fault-tolerant localStorage helpers. Every call is wrapped so private
 * mode / quota errors never break the UI.
 *
 * KEY NAMES: these are new, namespaced keys. If the existing VAEL app already
 * stores a selected template or a draft under other keys, change the constants
 * below (or pass `storageKey` to <InvitationBuilder />) so both agree.
 */

export const SELECTED_TEMPLATE_KEY = "vael:selected-template";
export const DRAFT_KEY = "vael:atelier:draft";

export function readStorage(key: string): string | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string): boolean {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function saveSelectedTemplateId(id: string): void {
  writeStorage(SELECTED_TEMPLATE_KEY, id);
}

export function readSelectedTemplateId(): string | null {
  return readStorage(SELECTED_TEMPLATE_KEY);
}

/**
 * Which template should the builder open with?
 *   1. ?template=id in the URL
 *   2. the id saved by the gallery
 *   3. the first free template
 * Premium ids are never opened directly in the builder.
 */
export function resolveInitialTemplateId(
  list: { id: string; access: "free" | "premium" }[],
  search: string = typeof window === "undefined" ? "" : window.location.search,
): string {
  const free = list.filter((t) => t.access === "free");
  const fromUrl = new URLSearchParams(search).get("template");
  const candidates = [fromUrl, readSelectedTemplateId()];
  for (const id of candidates) {
    if (id && free.some((t) => t.id === id)) return id;
  }
  return free[0]?.id ?? list[0]?.id ?? "";
}

/** `/create` + `?template=id` */
export function createUrl(path: string, templateId: string): string {
  return `${path}?template=${encodeURIComponent(templateId)}`;
}

/** `/custom` + `?template=id&templateName=Name` so the request form can prefill itself. */
export function requestUrl(path: string, template: { id: string; name: string }): string {
  const q = new URLSearchParams({ template: template.id, templateName: template.name });
  return `${path}?${q.toString()}`;
}
