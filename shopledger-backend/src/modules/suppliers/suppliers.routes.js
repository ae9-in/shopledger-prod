import { Router } from 'express';
import { authenticate } from '../../middleware/auth.js';
import { tenantSchema } from '../../middleware/tenantSchema.js';
import {
  listSuppliers,
  createSupplier,
  getSupplier,
  deleteSupplier,
  getSupplierStats,
} from './suppliers.controller.js';

const router = Router();
router.use(authenticate);
router.use(tenantSchema);

router.get('/',       listSuppliers);
router.post('/',      createSupplier);
router.get('/stats',  getSupplierStats);
router.get('/:id',    getSupplier);
router.delete('/:id', deleteSupplier);

export default router;
