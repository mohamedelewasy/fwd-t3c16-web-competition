import express from "express";
import dotenv from "dotenv";
import appRoutes from "./routes/index";

dotenv.config();
const app = express();

app.use(express.json());
// app routes
app.use(appRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server runs on port=${PORT}`);
});

export default app;
