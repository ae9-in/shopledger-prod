import { Router } from 'express';
import { authenticate } from '../../middleware/auth.js';
import { tenantSchema } from '../../middleware/tenantSchema.js';
import {
  listCashbook,
  createCashbook,
  getCashbookStats,
} from './cashbook.controller.js';

const router = Router();
router.use(authenticate);
router.use(tenantSchema);

router.get('/',      listCashbook);
router.post('/',     createCashbook);
router.get('/stats', getCashbookStats);

export default router;
