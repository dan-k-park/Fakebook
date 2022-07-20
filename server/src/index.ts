import "dotenv-safe/config";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import postRouter from "./routes/posts";
import userRouter from "./routes/users";
import messageRouter from "./routes/messages";
import roomRouter from "./routes/rooms";

const app = express();

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Connected to MongoDB");
});

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/messages", messageRouter);
app.use("/api/rooms", roomRouter);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
``;
