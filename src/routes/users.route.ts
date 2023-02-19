import express from "express";
import {
  createuser,
  deleteuser,
  getUser,
  getUsers,
  updateuser,
} from "./../handlers/users.handler";
const router = express.Router();
// router.route('/')

export default router;
