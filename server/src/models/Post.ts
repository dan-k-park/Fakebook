import { getModelForClass, prop } from "@typegoose/typegoose";

class Posts {
  @prop({ type: () => String, required: true, minlength: 6 })
  userId!: string;

  @prop({ type: String, maxlength: 500, default: "" })
  content: string;

  @prop({ type: String, default: "" })
  imgUrl: string;

  @prop({ type: () => [Number], default: [] })
  likes: number[];
}

const PostModel = getModelForClass(Posts, {
  schemaOptions: { timestamps: true },
});

export default PostModel;
