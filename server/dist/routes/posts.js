"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Express = __importStar(require("express"));
const User_1 = __importDefault(require("../models/User"));
const Post_1 = __importDefault(require("../models/Post"));
const router = Express.Router();
router.post("/", async (req, res) => {
    const newPost = new Post_1.default(req.body);
    try {
        const post = await newPost.save();
        res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
router.get("/:id", async (req, res) => {
    try {
        const post = await Post_1.default.findById(req.params.id);
        res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User_1.default.findOne({ username: req.params.username });
        const posts = await Post_1.default.find({ userId: user._id });
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
router.get("/timeline/:userId", async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.userId);
        const userPosts = await Post_1.default.find({ userId: user._id });
        const tuple = (...args) => args;
        const promises = tuple(user === null || user === void 0 ? void 0 : user.friends.map((friendId) => {
            return Post_1.default.find({ userId: friendId });
        }));
        const friendsPosts = await Promise.all(promises);
        res.status(200).json(userPosts.concat(...friendsPosts));
    }
    catch (error) {
        res.status(500).json(error);
    }
});
router.put("/:id", async (req, res) => {
    try {
        const post = await Post_1.default.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("Your post has been updated.");
        }
        else {
            res.status(403).json("You cannot update another user's post.");
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post_1.default.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne({ $set: req.body });
            res.status(200).json("Your post has been deleted");
        }
        else {
            res.status(403).json("You cannot delete another user's post.");
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post_1.default.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("Post liked");
        }
        else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("Post disliked");
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
module.exports = router;
//# sourceMappingURL=posts.js.map