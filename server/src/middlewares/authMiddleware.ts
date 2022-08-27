import { Context } from "./../types/index.d";
import * as Express from "express";

export const isAuth = (context: Context) => {
  if (context.req.isAuthenticated()) {
    context.next();
  } else {
    context.res
      .status(401)
      .json("You are not authorized to view this resource.");
  }
};

export const isAdmin = () => {};
