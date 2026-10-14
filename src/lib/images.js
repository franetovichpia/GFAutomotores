// Achica las fotos antes de guardarlas (las del celular pesan varios MB).
export async function compressImage(file, maxSize = 1600, quality = 0.8) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('No se pudo procesar la imagen'))), 'image/jpeg', quality)
  );
}

export const blobToDataURL = (blob) =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(blob);
  });

// Item que maneja el PhotoUploader: { id, url, file? }. Si tiene file, todavía no se subió.
export const fileToItem = (file) => ({
  id: crypto.randomUUID(),
  url: URL.createObjectURL(file),
  file,
});

export const urlToItem = (url) => ({ id: crypto.randomUUID(), url });
