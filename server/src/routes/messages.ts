import * as Express from "express";
import {
  createMessage,
  getRoomMessages,
} from "../controllers/messageController";
const router = Express.Router();

router.post("/", createMessage);
router.get("/:roomId", getRoomMessages);

export default router;
