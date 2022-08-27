import * as Express from "express";
import { Session, SessionData } from "express-session";

export type Context = {
  req: Express.Request & {
    session: Session & Partial<SessionData> & { user: object };
  };
  res: Express.Response;
  next: Express.NextFunction;
};
