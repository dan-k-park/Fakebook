import * as Express from "express";
import MessageModel from "../models/Message";

const router = Express.Router();

export const createMessage = async (
  req: Express.Request,
  res: Express.Response
) => {
  const newMessage = new MessageModel(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getRoomMessages = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    const messages = await MessageModel.find({
      roomId: req.params.roomId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default router;
