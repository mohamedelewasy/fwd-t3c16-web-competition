import express from 'express';

import { protect } from '../middlewares/protect';
import validate from '../validator/users.validate';
import {
  authenticate,
  createUser,
  logout,
  updateEmail,
  updatePassword,
} from './../handlers/users.handler';

const router = express.Router();
router.route('/signup').post(validate.signup, createUser);
router.route('/login').post(validate.login, authenticate);
router.route('/logout').get(protect, logout);
router.route('/update-email').put(protect, validate.updateEmail, updateEmail);
router.route('/update-password').put(protect, validate.updatePassword, updatePassword);

export default router;
