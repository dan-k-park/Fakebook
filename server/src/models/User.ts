import { getModelForClass, prop, ReturnModelType } from "@typegoose/typegoose";

class Users {
  @prop({
    type: () => String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
  })
  username!: string;

  @prop({ type: () => String, required: true, minlength: 6 })
  password!: string;

  @prop({ type: () => String, default: "" })
  profilePicture: string;

  @prop({ type: () => String, default: "" })
  coverPicture: string;

  @prop({ type: () => [String], default: [] })
  friends: string[];

  @prop({ type: Boolean, default: false })
  isAdmin: boolean;

  @prop({ type: String, maxlength: 160, default: "" })
  bio: string;

  @prop({ type: () => String, default: "Not Available" })
  city: string;

  @prop({ type: () => String, default: "Not Available" })
  from: string;
}

const UserModel: ReturnModelType<typeof Users> = getModelForClass(Users, {
  schemaOptions: { timestamps: true },
});

export default UserModel;
