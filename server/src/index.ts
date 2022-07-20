import "dotenv-safe/config";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const messageRoute = require("./routes/messages");
const roomRoute = require("./routes/rooms");

const app = express();

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Connected to MongoDB");
});

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/messages", messageRoute);
app.use("/api/rooms", roomRoute);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
``;
