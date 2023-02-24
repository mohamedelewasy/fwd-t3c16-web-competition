import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

const validator: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
};

export default validator;
