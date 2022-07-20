import * as Express from "express";
import RoomModel from "../models/Room";

const router = Express.Router();

// Create a new message room with another user
export const createRoom = async (
  req: Express.Request,
  res: Express.Response
) => {
  const newRoom = new RoomModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedRoom = await newRoom.save();
    res.status(200).json(savedRoom);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get a message room a user belongs to
export const getRoom = async (req: Express.Request, res: Express.Response) => {
  try {
    const room = await RoomModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMutualRoom = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    const room = await RoomModel.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default router;
