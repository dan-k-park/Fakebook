import * as mongoose from "mongoose";
import { getModelForClass, prop } from "@typegoose/typegoose";

class Messages {
  @prop({ type: () => mongoose.Types.ObjectId })
  roomId!: mongoose.Types.ObjectId;

  @prop({ type: () => mongoose.Types.ObjectId })
  sender!: mongoose.Types.ObjectId;

  @prop({ type: () => String, default: "" })
  content: string;
}

const MessageModel = getModelForClass(Messages, {
  schemaOptions: { timestamps: true },
});

export default MessageModel;
