import { fail } from '../utils/apiResponse.js';

export const validate = schema => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const errorList = result.error.issues || result.error.errors || [];
    const errors = errorList.map(e => e.message).join(', ');
    return fail(res, errors, 422);
  }
  req.body = result.data;
  next();
};
