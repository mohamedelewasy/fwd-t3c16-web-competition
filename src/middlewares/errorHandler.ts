import { ErrorRequestHandler } from 'express';
import { DatabaseError } from 'pg';

const errorHandler: ErrorRequestHandler = (err: Error, req, res, next) => {
  if (err instanceof DatabaseError && err.code == '23505') {
    return res.status(400).json({ msg: `${err.constraint?.split('_')[1]} is already exists` });
  }
  return res.status(500).json({ msg: err.message || 'something went wrong' });
};

export default errorHandler;
