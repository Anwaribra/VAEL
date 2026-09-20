import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

/** Reactive matchMedia. Safe on the server (returns `fallback`). */
export function useMediaQuery(query: string, fallback = false): boolean {
  const subscribe = useCallback(
    (cb: () => void) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    [query],
  );
  const get = () =>
    typeof window === "undefined" ? fallback : window.matchMedia(query).matches;
  return useSyncExternalStore(subscribe, get, () => fallback);
}

/** A short-lived, non-blocking status line that is also announced to screen readers. */
export function useStatus(duration = 3200) {
  const [message, setMessage] = useState("");
  const timer = useRef<number | undefined>(undefined);

  const announce = useCallback(
    (text: string) => {
      setMessage(text);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setMessage(""), duration);
    },
    [duration],
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);
  return { message, announce };
}

/** Prevents the page behind a dialog from scrolling. Restores the previous value. */
export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Minimal modal behaviour: Escape closes, Tab is kept inside `ref`,
 * focus moves in on open and returns to the trigger on close.
 */
export function useDialogBehavior(
  ref: React.RefObject<HTMLElement | null>,
  open: boolean,
  onClose: () => void,
  initialFocus?: () => HTMLElement | null | undefined,
) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const trigger = document.activeElement as HTMLElement | null;
    const root = ref.current;
    const first = initialFocus?.() ?? root?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !ref.current) return;
      const items = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (!items.length) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      trigger?.focus?.({ preventScroll: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
}
