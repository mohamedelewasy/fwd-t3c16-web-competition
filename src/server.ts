import app from './app';
import pool from './config/db';

(async () => {
  pool
    .connect()
    .then(() => {
      console.log('db connected...');
    })
    .catch(err => {
      console.log(err);
      process.exit(1);
    });
})();
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV;
app.listen(PORT, () => {
  console.log(`server runs on port=${PORT} in ${NODE_ENV} environment`);
});
