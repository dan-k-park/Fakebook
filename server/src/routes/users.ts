import * as Express from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/User";

const router = Express.Router();

// Create User
router.post(
  "/register",
  async (req: Express.Request, res: Express.Response) => {
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
  }
);

// Get a User
router.get("/", async (req: Express.Request, res: Express.Response) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const user = userId
      ? await UserModel.findById(userId)
      : await UserModel.findOne({ username: username });
    console.log(user);
    const { password, updatedAt, ...other } = user!._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update User
router.put("/:id", async (req: Express.Request, res: Express.Response) => {
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
});

router.delete("/:id", async (req: Express.Request, res: Express.Response) => {
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
});

module.exports = router;
