import dotenv from 'dotenv';
import express, { ErrorRequestHandler } from 'express';

import appRoutes from './routes/index';

dotenv.config();
const app = express();

app.use(express.json());
// app routes
app.use(appRoutes);
const errorHandler: ErrorRequestHandler = (err: Error, req, res, next) => {
  console.log(err.message);
  res.status(500).send('some thing went wrong');
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server runs on port=${PORT}`);
});

export default app;
