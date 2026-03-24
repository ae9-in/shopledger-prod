import { Router } from 'express';
import { authenticate } from '../../middleware/auth.js';
import { tenantSchema } from '../../middleware/tenantSchema.js';
import {
  listCustomers,
  createCustomer,
  getCustomer,
  deleteCustomer,
  getCustomerStats,
} from './customers.controller.js';

const router = Router();
router.use(authenticate);
router.use(tenantSchema);

router.get('/',       listCustomers);
router.post('/',      createCustomer);
router.get('/stats',  getCustomerStats);
router.get('/:id',    getCustomer);
router.delete('/:id', deleteCustomer);

export default router;
