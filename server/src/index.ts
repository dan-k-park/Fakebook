import "dotenv-safe/config";
import express from "express";
import helmet from "helmet";
import connection from "./config/database";
import session from "express-session";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import passport from "passport";
import postRouter from "./routes/posts";
import authRouter from "./routes/auth";
import userRouter from "./routes/users";
import messageRouter from "./routes/messages";
import roomRouter from "./routes/rooms";
require("./config/passport");

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const sessionStore = new MongoStore({
  clientPromise: connection,
  collectionName: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Happen on every single route request
app.use(passport.initialize());
app.use(passport.session());

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req.session);
    console.log(req.user);
    next();
  }
);

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/messages", messageRouter);
app.use("/api/rooms", roomRouter);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
