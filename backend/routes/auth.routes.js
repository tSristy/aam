import { Router } from 'express';
import { login, me } from '../controllers/auth.controller.js';
import { requireAdmin } from '../middleware/auth.js';
import { asyncHandler } from '../utils/async-handler.js';

const router = Router();

router.post('/login', asyncHandler(login));
router.get('/me', requireAdmin, asyncHandler(me));

export default router;
