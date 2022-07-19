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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Express = __importStar(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const router = Express.Router();
router.post("/register", async (req, res) => {
    const { username, bio, city, from } = req.body;
    try {
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(req.body.password, salt);
        const newUser = new User_1.default({
            username: username,
            password: hashedPassword,
            bio: bio,
            city: city,
            from: from,
        });
        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? await User_1.default.findById(userId)
            : await User_1.default.findOne({ username: username });
        console.log(user);
        const _a = user._doc, { password, updatedAt } = _a, other = __rest(_a, ["password", "updatedAt"]);
        res.status(200).json(other);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt_1.default.genSalt(10);
                req.body.password = await bcrypt_1.default.hash(req.body.password, salt);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        }
        try {
            await User_1.default.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Your account has been updated.");
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    else {
        return res.status(401).json("You cannot update another user's account.");
    }
});
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User_1.default.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    else {
        return res.status(401).json("You cannot delete another user's account.");
    }
});
module.exports = router;
//# sourceMappingURL=users.js.map