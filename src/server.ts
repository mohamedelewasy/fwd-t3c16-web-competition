import app from './app';

const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV;
app.listen(PORT, () => {
  console.log(`server runs on port=${PORT} in ${NODE_ENV} environment`);
});
