import dotenv from 'dotenv';
import express, { ErrorRequestHandler } from 'express';

import errorHandler from './middlewares/errorHandler';
import appRoutes from './routes/index';

dotenv.config();
const app = express();

app.use(express.json());
//logger middleware
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});
// app routes
app.use(appRoutes);
// error handler
app.use(errorHandler);

export default app;
