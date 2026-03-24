import { Router } from 'express';
import cookieParser from 'cookie-parser';
import { validate }     from '../../middleware/validate.js';
import { authenticate } from '../../middleware/auth.js';
import {
  registerSchema,
  loginSchema,
  changePasswordSchema,
} from './auth.schema.js';
import {
  register,
  login,
  refresh,
  logout,
  changePassword,
} from './auth.controller.js';
import { adminLogin } from './admin.auth.controller.js';

const router = Router();
router.use(cookieParser());

router.post('/register',        validate(registerSchema),        register);
router.post('/login',           validate(loginSchema),           login);
router.post('/admin/login',                                      adminLogin);
router.post('/refresh',                                          refresh);
router.post('/logout',                                           logout);
router.post('/change-password', authenticate,
                                validate(changePasswordSchema),  changePassword);

export default router;
