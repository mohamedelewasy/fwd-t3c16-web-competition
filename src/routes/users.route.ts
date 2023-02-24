import express from 'express';

import { protect } from '../middlewares/protect';
import {
  authenticate,
  createUser,
  logout,
  updateEmail,
  updatePassword,
} from './../handlers/users.handler';

const router = express.Router();
router.route('/signup').post(createUser);
router.route('/login').post(authenticate);
router.route('/logout').get(protect, logout);
router.route('/update-email').put(protect, updateEmail);
router.route('/update-password').put(protect, updatePassword);

export default router;
