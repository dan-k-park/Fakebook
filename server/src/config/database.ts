import mongoose from "mongoose";

const connection = mongoose
  .connect(process.env.MONGO_URL)
  .then((m) => m.connection.getClient());

export default connection;
