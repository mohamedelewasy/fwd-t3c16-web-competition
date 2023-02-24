import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err: Error, req, res, next) => {
  console.log(err.message);
  res.status(500).send('some thing went wrong');
};

export default errorHandler;
