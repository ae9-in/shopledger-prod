import { Router } from 'express';
import { authenticate } from '../../middleware/auth.js';
import * as shopController from './shops.controller.js';

const router = Router();

router.use(authenticate);

router.get('/profile',  shopController.getProfile);
router.patch('/profile', shopController.updateProfile);
router.get('/sessions', shopController.getSessions);
router.delete('/sessions/:sessionId', shopController.revokeSession);
router.delete('/me',     shopController.deleteShop);

export default router;
