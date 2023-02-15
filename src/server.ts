import express from "express";
import dotenv from "dotenv";
import db from "./config/db";
import appRoutes from "./routes/index";

dotenv.config();
const app = express();

app.use(express.json());
// app routes
app.use(appRoutes);

//setup database
db.connect()
  .then(() => console.log("db connected..."))
  .catch((err) => console.log(err));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server runs on port=${PORT}`);
});

export default app;