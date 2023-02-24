import dotenv from 'dotenv';
import express, { ErrorRequestHandler } from 'express';

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
const errorHandler: ErrorRequestHandler = (err: Error, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('some thing went wrong');
};
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV;
app.listen(PORT, () => {
  console.log(`server runs on port=${PORT} in ${NODE_ENV} environment`);
});

export default app;
