import { Router } from 'express';
import { authenticate } from '../../middleware/auth.js';
import { tenantSchema } from '../../middleware/tenantSchema.js';
import {
  listTransactions,
  createTransaction,
} from './transactions.controller.js';

const router = Router();
router.use(authenticate);
router.use(tenantSchema);

router.get('/',  listTransactions);
router.post('/', createTransaction);

export default router;
