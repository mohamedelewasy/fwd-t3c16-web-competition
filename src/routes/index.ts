import express from "express";
import moviesRoutes from "./movies.route";
const router = express.Router();

router.use("/movies", moviesRoutes);
export default router;
