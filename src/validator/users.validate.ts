import { body } from 'express-validator';

import validator from '../middlewares/validator';

const signup = [
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 4 })
    .withMessage('password must be at least 4 characters')
    .isLength({ max: 32 })
    .withMessage('password must be maximum 32 characters'),
  body('passwordConfirm').custom((val, { req }) => {
    if (req.body.password === val) return Promise.resolve();
    return Promise.reject('invalid confirmation password');
  }),
  validator,
];

const login = [
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 4 })
    .withMessage('password must be at least 4 characters')
    .isLength({ max: 32 }),
  validator,
];

const updateEmail = [
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
  validator,
];

const updatePassword = [
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 4 })
    .withMessage('password must be at least 4 characters')
    .isLength({ max: 32 })
    .withMessage('password must be maximum 32 characters'),
  body('newPassword')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 4 })
    .withMessage('password must be at least 4 characters')
    .isLength({ max: 32 })
    .withMessage('password must be maximum 32 characters'),
  body('passwordConfirm').custom((val, { req }) => {
    if (req.body.newPassword === val) return Promise.resolve();
    return Promise.reject('invalid confirmation password');
  }),
  validator,
];

export default { login, signup, updateEmail, updatePassword };
