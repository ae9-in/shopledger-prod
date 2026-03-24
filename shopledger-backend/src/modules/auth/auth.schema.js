import { z } from 'zod';

export const registerSchema = z.object({
  name:     z.string().min(2, 'Shop name must be at least 2 characters'),
  email:    z.string().email('Invalid email'),
  phone:    z.string().min(10, 'Invalid phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword:     z.string().min(8),
});
