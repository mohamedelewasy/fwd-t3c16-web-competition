import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import Users from '../models/users.model';
import { compare, hash } from '../utils/hashPassword';
import { generateToken } from '../utils/token';

// method   :POST
// route    :/auth/signup
export const createUser: RequestHandler = asyncHandler(async (req, res, next) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  const hashedPassword = hash(password);
  const user = await Users.create(email, hashedPassword);
  res.status(201).json({ data: { id: user.id, email: user.email } });
});

// method   :POST
// route    :/auth/login
export const authenticate: RequestHandler = asyncHandler(async (req, res) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  const user = await Users.getByEmail(email);
  if (!user || !compare(password, user.password)) {
    res.status(400).json({ msg: 'incorrect email or password' });
    return;
  }
  const token = generateToken(user.id);
  res.status(200).json({ token });
});

// method   :PUT
// route    :/auth/update/email
// acess    :protected
export const updateEmail: RequestHandler = asyncHandler(async (req, res) => {
  const email: string = req.body.email;
  const userId: string = res.locals.userId;
  console.log('handler user id : ', userId);
  const user = await Users.updateEmail(+userId, email);
  res.status(200).json({ data: { email: user.email } });
});

// method   :PUT
// route    :/auth/update/password
// acess    :protected
export const updatePassword: RequestHandler = asyncHandler(async (req, res) => {
  const password: string = req.body.password;
  const newPassword: string = req.body.newPassword;
  const userId: number = res.locals.userId;
  const user = await Users.show(userId);
  if (!compare(password, user.password)) {
    res.status(400).json({ msg: 'incorrect password' });
    return;
  }
  const hashedPassword = hash(newPassword);
  await Users.updatePassword(userId, hashedPassword);
  const token = generateToken(userId);
  res.status(200).json({ token });
});

// method   :GET
// route    :/auth/logout
// acess    :protected
export const logout: RequestHandler = asyncHandler(async (req, res) => {
  delete res.locals.userId;
  delete req.headers.authorization;
  res.status(204).send();
});
