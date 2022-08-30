import * as Express from "express";
import UserModel from "../models/User";

// Pass this in to any route we want to protect
export const isAuth = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json("You are not authorized to view this resource.");
  }
};

export const isAdmin = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  if (req.isAuthenticated()) {
    const user = await UserModel.findOne({ username: req.body.username });
    if (user!.isAdmin) {
      next();
    }
  } else {
    res
      .status(401)
      .json(
        "You are not authorized to view this resource because you are not an admin."
      );
  }
};
