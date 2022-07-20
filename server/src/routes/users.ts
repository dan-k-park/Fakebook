import * as Express from "express";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getFriends,
  addFriend,
  removeFriend,
} from "../controllers/userController";
const router = Express.Router();

router.post("/register", createUser);
router.get("/", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.get("/friends/:userId", getFriends);
router.put("/add-friend/:id", addFriend);
router.put("/unfriend/:id", removeFriend);

export default router;
