import * as Express from "express";
import passport from "passport";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController";
const router = Express.Router();

router.post("/login", passport.authenticate("local"), loginUser); // Authenticate method looks in passport.ts and looks at the verify callback fn
router.post("/register", registerUser);
router.get("/logout", logoutUser);

export default router;
