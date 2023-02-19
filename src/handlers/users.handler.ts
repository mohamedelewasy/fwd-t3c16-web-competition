import { Request as Req, Response as Res, NextFunction as Next } from "express";
import Users, { User } from "../models/users.model";

// method   :GET
// route    :/users/
export const getUsers = async (req: Req, res: Res, next: Next) => {
  try {
    const users = await Users.index();
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(400).json({ msg: "failed to connect to database" });
  }
};

// method   :GET
// route    :/users/?userId
export const getUser = async (req: Req, res: Res, next: Next) => {
  const { userId } = req.params;
  try {
    const user = await Users.show(+userId);
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(400).json({ msg: `user not found for this id=${userId}` });
  }
};

// method   :POST
// route    :/users/
export const createuser = async (req: Req, res: Res, next: Next) => {
  const { email, password } = req.body;
  try {
    const user = await Users.create({ email, password });
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(400).json({ msg: `failed to create user` });
  }
};

// method   :PUT
// route    :/users/?userId
export const updateuser = async (req: Req, res: Res, next: Next) => {
  const { userId } = req.params;
  const { email, password } = req.body;
  try {
    const user = await Users.update(+userId, { email, password });
    if (!user) res.status(400).json({ msg: `user not found for id=${userId}` });
    else res.status(200).json({ data: user });
  } catch (error) {
    res.status(400).json({ msg: `user not found for id=${userId}` });
  }
};

// method   :DELETE
// route    :/users/?userId
export const deleteuser = async (req: Req, res: Res, next: Next) => {
  const { userId } = req.params;
  try {
    const user = await Users.delete(+userId);
    if (!user) res.status(400).json({ msg: `user not found for id=${userId}` });
    else res.status(200).json({ data: user });
  } catch (error) {
    res.status(400).json({ msg: `user not found for this id=${userId}` });
  }
};
