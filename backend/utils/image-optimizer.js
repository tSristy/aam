import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const uploadDir = path.join(process.cwd(), 'uploads');

function integerEnv(name, fallback, min, max) {
  const parsed = Number.parseInt(process.env[name] || '', 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(Math.max(parsed, min), max);
}

export const IMAGE_SETTINGS = Object.freeze({
  maxWidth: integerEnv('IMAGE_MAX_WIDTH', 1920, 640, 4096),
  maxHeight: integerEnv('IMAGE_MAX_HEIGHT', 1920, 640, 4096),
  webpQuality: integerEnv('IMAGE_WEBP_QUALITY', 88, 70, 100),
  maxInputPixels: integerEnv('IMAGE_MAX_INPUT_PIXELS', 100_000_000, 10_000_000, 250_000_000)
});

export async function ensureUploadDir() {
  await fs.mkdir(uploadDir, { recursive: true });
}

function safeBaseName(originalName = 'image') {
  const ext = path.extname(originalName);
  return (
    path
      .basename(originalName, ext)
      .normalize('NFKD')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 70) || 'image'
  );
}

function optimizedFilename(originalName = 'image') {
  const uniquePart = crypto.randomBytes(6).toString('hex');
  return `${Date.now()}-${uniquePart}-${safeBaseName(originalName)}-optimized.webp`;
}

export async function optimizeImageBuffer(buffer, originalName = 'image') {
  if (!Buffer.isBuffer(buffer) || buffer.length === 0) {
    const error = new Error('Uploaded image is empty or invalid.');
    error.code = 'IMAGE_OPTIMIZATION_FAILED';
    throw error;
  }

  await ensureUploadDir();

  const filename = optimizedFilename(originalName);
  const outputPath = path.join(uploadDir, filename);
  const tempPath = `${outputPath}.tmp`;

  try {
    const inputMetadata = await sharp(buffer, {
      failOn: 'error',
      limitInputPixels: IMAGE_SETTINGS.maxInputPixels
    }).metadata();

    if (!inputMetadata.width || !inputMetadata.height || !inputMetadata.format) {
      const invalidError = new Error('The uploaded file is not a valid image.');
      invalidError.code = 'IMAGE_OPTIMIZATION_FAILED';
      throw invalidError;
    }

    // Generate the WebP bytes in memory first. Do not let Sharp infer the
    // output format from a temporary filename such as `image.webp.tmp`,
    // because that can be treated as an unknown `.tmp` output format.
    const { data: optimizedBuffer, info } = await sharp(buffer, {
      failOn: 'error',
      limitInputPixels: IMAGE_SETTINGS.maxInputPixels
    })
      // Reads EXIF orientation and writes pixels in the correct orientation.
      .rotate()
      // Never crops and never enlarges a smaller source image.
      .resize({
        width: IMAGE_SETTINGS.maxWidth,
        height: IMAGE_SETTINGS.maxHeight,
        fit: 'inside',
        withoutEnlargement: true,
        kernel: sharp.kernel.lanczos3
      })
      // High visual quality with substantially smaller web payloads.
      .webp({
        quality: IMAGE_SETTINGS.webpQuality,
        alphaQuality: Math.max(IMAGE_SETTINGS.webpQuality, 90),
        effort: 4,
        smartSubsample: true
      })
      .toBuffer({ resolveWithObject: true });

    // Write the complete encoded buffer to a temp path, then rename it so
    // clients never observe a partially-written public image.
    await fs.writeFile(tempPath, optimizedBuffer);
    await fs.rename(tempPath, outputPath);

    return {
      filename,
      path: outputPath,
      size: optimizedBuffer.length,
      width: info.width || null,
      height: info.height || null,
      format: 'webp',
      originalWidth: inputMetadata.width,
      originalHeight: inputMetadata.height,
      originalFormat: inputMetadata.format
    };
  } catch (error) {
    await fs.rm(tempPath, { force: true }).catch(() => {});
    await fs.rm(outputPath, { force: true }).catch(() => {});

    if (error.code === 'IMAGE_OPTIMIZATION_FAILED') throw error;

    const wrapped = new Error('Image could not be optimized. Please upload a valid JPG, PNG or WEBP image.');
    wrapped.code = 'IMAGE_OPTIMIZATION_FAILED';
    wrapped.cause = error;
    throw wrapped;
  }
}

export async function optimizeImageFile(filePath, originalName = path.basename(filePath)) {
  const buffer = await fs.readFile(filePath);
  return optimizeImageBuffer(buffer, originalName);
}
