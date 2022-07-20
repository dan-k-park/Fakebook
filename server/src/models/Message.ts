import { getModelForClass, prop } from "@typegoose/typegoose";

class Messages {
  @prop({ type: () => String })
  roomId!: string;

  @prop({ type: () => String })
  sender!: string;

  @prop({ type: () => String, default: "" })
  content: string;
}

const MessageModel = getModelForClass(Messages, {
  schemaOptions: { timestamps: true },
});

export default MessageModel;
