import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserModel from "../models/User";
import { validatePassword } from "../lib/passwordUtils";

const customFields = {
  usernameField: "username",
  passwordField: "password",
};

const verifyCallback = (username: string, password: string, done: any) => {
  UserModel.findOne({ username: username })
    .then(async (user) => {
      if (!user) {
        return done(null, false);
      }

      const isValid = await validatePassword(password, user.password);

      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((error) => {
      done(error);
    });
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

// Grab user from database
// Get id of user
// Insert into req.session.passport.user property
passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  UserModel.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
