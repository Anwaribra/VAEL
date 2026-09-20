/**
 * Client-side image resizer and metadata stripper.
 * Accepts JPEG, PNG, or WebP up to 8MB.
 * Resizes to max 1600px on the long edge and re-encodes to WebP (quality 0.82) targeting <= 400KB.
 */
export async function processPhotoFile(file: File): Promise<Blob> {
  const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds 8MB limit.');
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Only JPEG, PNG, and WebP images are allowed.');
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      let { width, height } = img;
      const MAX_DIM = 1600;

      if (width > MAX_DIM || height > MAX_DIM) {
        if (width > height) {
          height = Math.round((height * MAX_DIM) / width);
          width = MAX_DIM;
        } else {
          width = Math.round((width * MAX_DIM) / height);
          height = MAX_DIM;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas 2D context unavailable.'));
        return;
      }

      // Draw image onto canvas (this inherently strips EXIF/GPS metadata)
      ctx.drawImage(img, 0, 0, width, height);

      let quality = 0.82;
      const attemptEncode = (q: number) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to encode image to WebP format.'));
              return;
            }

            // Target <= 400KB
            if (blob.size > 400 * 1024 && q > 0.4) {
              attemptEncode(q - 0.1);
            } else {
              resolve(blob);
            }
          },
          'image/webp',
          q
        );
      };

      attemptEncode(quality);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Invalid image file.'));
    };

    img.src = url;
  });
}
