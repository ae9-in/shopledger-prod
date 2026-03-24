import { Router } from 'express';
import { authenticate } from '../../middleware/auth.js';
import { tenantSchema } from '../../middleware/tenantSchema.js';
import { getSummaryReport } from './reports.controller.js';

const router = Router();
router.use(authenticate);
router.use(tenantSchema);

router.get('/summary', getSummaryReport);

export default router;
