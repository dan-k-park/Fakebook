import { getModelForClass, prop } from "@typegoose/typegoose";

class Rooms {
  @prop({ type: () => [String], default: [] })
  members: string[];
}

const RoomModel = getModelForClass(Rooms, {
  schemaOptions: { timestamps: true },
});

export default RoomModel;
