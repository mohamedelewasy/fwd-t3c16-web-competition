import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import { verifyToken } from '../utils/token';

export const protect: RequestHandler = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ msg: 'please login first' });
    return;
  }
  const userId = verifyToken(token);
  res.locals.userId = userId;
  next();
});
