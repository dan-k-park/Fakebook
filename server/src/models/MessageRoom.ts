import { getModelForClass, prop } from "@typegoose/typegoose";

class MessageRooms {
  @prop({ type: () => [String], default: [] })
  members: string[];
}

const MessageRoomModel = getModelForClass(MessageRooms, {
  schemaOptions: { timestamps: true },
});

export default MessageRoomModel;
