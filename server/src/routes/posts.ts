import * as Express from "express";
import {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getUserPosts,
  getTimeline,
  likePost,
} from "../controllers/postController";

const router = Express.Router();

router.post("/", createPost);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

router.get("/profile/:username", getUserPosts);
router.get("/timeline/:userId", getTimeline);
router.put("/:id/like", likePost);

export default router;
