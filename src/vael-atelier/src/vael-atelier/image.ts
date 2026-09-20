/**
 * Reads an image file, scales it down to `max` pixels on its longest side and
 * returns a data URL. Keeps uploads small enough to store in a draft.
 */
export async function fileToDataUrl(file: File, max = 1400, quality = 0.86): Promise<string> {
  if (!/^image\//.test(file.type)) throw new Error("not-an-image");

  const bitmap = await loadBitmap(file);
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no-canvas");
  ctx.drawImage(bitmap.source, 0, 0, w, h);
  if ("close" in bitmap.source) (bitmap.source as ImageBitmap).close();

  const webp = canvas.toDataURL("image/webp", quality);
  return webp.startsWith("data:image/webp") ? webp : canvas.toDataURL("image/jpeg", quality);
}

async function loadBitmap(
  file: File,
): Promise<{ source: CanvasImageSource; width: number; height: number }> {
  if (typeof createImageBitmap === "function") {
    try {
      const b = await createImageBitmap(file);
      return { source: b, width: b.width, height: b.height };
    } catch {
      /* fall through to <img> */
    }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("decode"));
      el.src = url;
    });
    return { source: img, width: img.naturalWidth, height: img.naturalHeight };
  } finally {
    URL.revokeObjectURL(url);
  }
}
