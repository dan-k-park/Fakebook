import { generatePassword } from "./../lib/passwordUtils";
import * as Express from "express";
import UserModel from "../models/User";

const router = Express.Router();

// Register New User
export const registerUser = async (
  req: Express.Request,
  res: Express.Response
) => {
  const { username, bio, city, from } = req.body;
  try {
    const hashedPassword = await generatePassword(req.body.password);

    const newUser = new UserModel({
      username: username,
      password: hashedPassword,
      bio: bio,
      city: city,
      from: from,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const loginUser = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const logoutUser = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json("You are now logged out.");
  });
};

export default router;
