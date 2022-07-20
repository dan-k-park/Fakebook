import * as Express from "express";
import UserModel from "../models/User";
import PostModel from "../models/Post";

const router = Express.Router();

// Create a Post
export const createPost = async (
  req: Express.Request,
  res: Express.Response
) => {
  const newPost = new PostModel(req.body);
  try {
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get a Post
export const getPost = async (req: Express.Request, res: Express.Response) => {
  try {
    const post = await PostModel.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get a User's Posts
export const getUserPosts = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    const user = await UserModel.findOne({ username: req.params.username });
    const posts = await PostModel.find({ userId: user!._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a User's Timeline
export const getTimeline = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const userPosts = await PostModel.find({ userId: user!._id });
    const tuple = <T extends any[]>(...args: T): T => args;

    // I have no idea why this is "supposed" to work lol
    const promises: any = tuple(
      user?.friends.map((friendId) => {
        return PostModel.find({ userId: friendId });
      })
    );

    const friendsPosts = await Promise.all(promises);

    res.status(200).json(userPosts.concat(...friendsPosts));
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a Post
export const updatePost = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post!.userId === req.body.userId) {
      await post!.updateOne({ $set: req.body });
      res.status(200).json("Your post has been updated.");
    } else {
      res.status(403).json("You cannot update another user's post.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a post
export const deletePost = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post!.userId === req.body.userId) {
      await post!.deleteOne({ $set: req.body });
      res.status(200).json("Your post has been deleted");
    } else {
      res.status(403).json("You cannot delete another user's post.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Like a post
export const likePost = async (req: Express.Request, res: Express.Response) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post!.likes.includes(req.body.userId)) {
      await post!.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Post liked");
    } else {
      await post!.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Post disliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export default router;
