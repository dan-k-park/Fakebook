import * as Express from "express";
import {
  createRoom,
  getRoom,
  getMutualRoom,
} from "../controllers/roomController";

const router = Express.Router();

router.post("/", createRoom);
router.get("/:userId", getRoom);
router.get("/find/:firstUserId/:secondUserId", getMutualRoom);

export default router;
