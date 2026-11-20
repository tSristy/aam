import { Router } from 'express';
import {
  createContent,
  deleteContent,
  getPublicContent,
  listAdminContent,
  listPublicContent,
  updateContent
} from '../controllers/content.controller.js';
import { requireAdmin } from '../middleware/auth.js';
import { asyncHandler } from '../utils/async-handler.js';
import { optimizeUploadedImage, uploadImage } from '../middleware/upload.js';

const router = Router();

router.get('/content', asyncHandler(listPublicContent));
router.get('/content/:idOrSlug', asyncHandler(getPublicContent));

router.get('/admin/content', requireAdmin, asyncHandler(listAdminContent));
router.post('/admin/content', requireAdmin, uploadImage.single('image'), optimizeUploadedImage, asyncHandler(createContent));
router.put('/admin/content/:id', requireAdmin, uploadImage.single('image'), optimizeUploadedImage, asyncHandler(updateContent));
router.delete('/admin/content/:id', requireAdmin, asyncHandler(deleteContent));

export default router;
