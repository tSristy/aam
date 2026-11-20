import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { Op } from 'sequelize';
import { ContentPost, sequelize } from '../models/index.js';
import { optimizeImageFile } from '../utils/image-optimizer.js';

dotenv.config();

const uploadsDir = path.join(process.cwd(), 'uploads');
const backupDir = path.join(process.cwd(), 'image-backups');
const keepBackups = process.env.KEEP_IMAGE_BACKUPS !== '0';

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function safeBackup(originalPath, originalFilename) {
  if (!keepBackups) {
    await fs.rm(originalPath, { force: true });
    return;
  }

  await fs.mkdir(backupDir, { recursive: true });
  const backupPath = path.join(backupDir, originalFilename);

  if (await exists(backupPath)) {
    const parsed = path.parse(originalFilename);
    const deduped = path.join(backupDir, `${parsed.name}-${Date.now()}${parsed.ext}`);
    await fs.rename(originalPath, deduped);
    return;
  }

  await fs.rename(originalPath, backupPath);
}

async function main() {
  await sequelize.authenticate();

  const posts = await ContentPost.findAll({
    where: {
      cover_image: { [Op.ne]: null }
    },
    order: [['id', 'ASC']]
  });

  console.log(`Found ${posts.length} content records with images.`);

  let optimizedCount = 0;
  let skippedCount = 0;
  let missingCount = 0;
  let failedCount = 0;

  for (const post of posts) {
    const filename = String(post.cover_image || '').trim();
    if (!filename) continue;

    // New uploads already use the optimized naming convention.
    if (/-optimized\.webp$/i.test(filename)) {
      skippedCount += 1;
      console.log(`[skip] #${post.id} ${filename}`);
      continue;
    }

    const originalPath = path.join(uploadsDir, filename);
    if (!(await exists(originalPath))) {
      missingCount += 1;
      console.warn(`[missing] #${post.id} ${filename}`);
      continue;
    }

    let optimized = null;

    try {
      optimized = await optimizeImageFile(originalPath, filename);

      // Update the DB only after the optimized file was written successfully.
      await post.update({ cover_image: optimized.filename });

      // Move/delete the old source only after the DB update succeeds.
      await safeBackup(originalPath, filename);

      optimizedCount += 1;
      console.log(
        `[ok] #${post.id} ${filename} -> ${optimized.filename} (${optimized.width}x${optimized.height})`
      );
    } catch (error) {
      failedCount += 1;

      // If DB update failed, remove the new file so the original remains authoritative.
      if (optimized?.path) {
        await fs.rm(optimized.path, { force: true }).catch(() => {});
      }

      console.error(`[failed] #${post.id} ${filename}: ${error.message}`);
    }
  }

  console.log('\nImage optimization complete.');
  console.log(`Optimized: ${optimizedCount}`);
  console.log(`Already optimized/skipped: ${skippedCount}`);
  console.log(`Missing source files: ${missingCount}`);
  console.log(`Failed: ${failedCount}`);

  if (keepBackups && optimizedCount > 0) {
    console.log(`Originals were moved to: ${backupDir}`);
    console.log('After you verify the website, you may archive/delete that backup folder manually.');
  }
}

main()
  .catch((error) => {
    console.error('Existing-image optimization failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await sequelize.close().catch(() => {});
  });
