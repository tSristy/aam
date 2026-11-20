import multer from 'multer';
import { optimizeImageBuffer } from '../utils/image-optimizer.js';

const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_UPLOAD_MB = Number.parseInt(process.env.IMAGE_UPLOAD_MAX_MB || '15', 10) || 15;
const MAX_UPLOAD_BYTES = Math.min(Math.max(MAX_UPLOAD_MB, 1), 30) * 1024 * 1024;

const fileFilter = (_req, file, cb) => {
  if (!ALLOWED_IMAGE_TYPES.has(file.mimetype)) {
    return cb(new Error('Only JPG, PNG and WEBP images are allowed.'));
  }
  cb(null, true);
};

// Keep the original upload in memory only long enough to resize/encode it.
// This prevents a large unoptimized source file from becoming public first.
export const uploadImage = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: MAX_UPLOAD_BYTES,
    files: 1
  }
});

export async function optimizeUploadedImage(req, _res, next) {
  if (!req.file) return next();

  try {
    const originalSize = req.file.size;
    const optimized = await optimizeImageBuffer(req.file.buffer, req.file.originalname);

    req.file = {
      ...req.file,
      buffer: undefined,
      filename: optimized.filename,
      path: optimized.path,
      mimetype: 'image/webp',
      size: optimized.size,
      optimized: true,
      original_size: originalSize,
      width: optimized.width,
      height: optimized.height,
      original_width: optimized.originalWidth,
      original_height: optimized.originalHeight
    };

    return next();
  } catch (error) {
    return next(error);
  }
}
