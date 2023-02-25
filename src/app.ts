/* eslint-disable no-console */
import dotenv from 'dotenv';
import express from 'express';

import errorHandler from './middlewares/errorHandler';
import appRoutes from './routes/index';

dotenv.config();
const app = express();
const ENV = process.env.NODE_ENV;

app.use(express.json());
//logger middleware
if (ENV == 'development')
  app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
  });
// app routes
app.use(appRoutes);
// error handler
app.use(errorHandler);

export default app;
