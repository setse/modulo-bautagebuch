const TARGET_BYTES = 500 * 1024;
function compressImage(image, { transparent = false } = {}) {
  const original = image.getSize();
  const maxEdge = transparent ? 1200 : 2400;
  let candidate = Math.max(original.width, original.height) > maxEdge ? image.resize(original.width >= original.height ? { width: maxEdge } : { height: maxEdge }) : image;
  for (let attempt = 0; attempt < 15; attempt++) {
    if (transparent) {
      const bytes = candidate.toPNG();
      if (bytes.length <= TARGET_BYTES) return { bytes, extension: 'png', ...candidate.getSize() };
    } else {
      for (const quality of [88, 80, 72, 64, 56]) {
        const bytes = candidate.toJPEG(quality);
        if (bytes.length <= TARGET_BYTES) return { bytes, extension: 'jpg', ...candidate.getSize() };
      }
    }
    const size = candidate.getSize();
    candidate = candidate.resize(size.width >= size.height ? { width: Math.max(1, Math.floor(size.width * 0.8)) } : { height: Math.max(1, Math.floor(size.height * 0.8)) });
  }
  throw new Error('Das Bild konnte nicht komprimiert werden.');
}
module.exports = { compressImage, TARGET_BYTES };
