import * as Express from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/User";

const router = Express.Router();

// Create User
export const createUser = async (
  req: Express.Request,
  res: Express.Response
) => {
  const { username, bio, city, from } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new UserModel({
      username: username,
      password: hashedPassword,
      bio: bio,
      city: city,
      from: from,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get a User
export const getUser = async (req: Express.Request, res: Express.Response) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const user = userId
      ? await UserModel.findById(userId)
      : await UserModel.findOne({ username: username });
    console.log(user);
    const { password, updatedAt, ...other } = (user as any)!._doc; // doing this to avoid type error
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update User
export const updateUser = async (
  req: Express.Request,
  res: Express.Response
) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    try {
      await UserModel.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Your account has been updated.");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(401).json("You cannot update another user's account.");
  }
};

export const deleteUser = async (
  req: Express.Request,
  res: Express.Response
) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await UserModel.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(401).json("You cannot delete another user's account.");
  }
};

export const getFriends = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const tuple = <T extends any[]>(...args: T): T => args;

    const promises: any = tuple(
      user?.friends.map((friendId) => {
        return UserModel.findById(friendId);
      })
    );

    const friends = await Promise.all(promises);
    let friendList: any = [];

    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addFriend = async (
  req: Express.Request,
  res: Express.Response
) => {
  if (req.body.userId !== req.params.id) {
    try {
      const newFriend = await UserModel.findById(req.params.id);
      const currentUser = await UserModel.findById(req.body.id);

      if (!newFriend?.friends.includes(req.body.userId)) {
        await newFriend?.updateOne({ $push: { friends: req.body.userId } });
        await currentUser?.updateOne({ $push: { friends: req.body.userId } });
        res.status(200).json("You are now friends");
      } else {
        res.status(403).json("You are already friends");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You cannot add yourself as a friend");
  }
};

export const removeFriend = async (
  req: Express.Request,
  res: Express.Response
) => {
  if (req.body.userId !== req.params.id) {
    try {
      const friendToRemove = await UserModel.findById(req.params.id);
      const currentUser = await UserModel.findById(req.body.id);

      if (!friendToRemove?.friends.includes(req.body.userId)) {
        await friendToRemove?.updateOne({
          $pull: { friends: req.body.userId },
        });
        await currentUser?.updateOne({ $pull: { friends: req.body.userId } });
        res.status(200).json("You are no longer friends");
      } else {
        res.status(403).json("You were not friends with this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You cannot unfriend yourself");
  }
};

export default router;
