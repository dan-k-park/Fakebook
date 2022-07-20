"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv-safe/config");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const messageRoute = require("./routes/messages");
const roomRoute = require("./routes/rooms");
const app = (0, express_1.default)();
mongoose_1.default.connect(process.env.MONGO_URL, () => {
    console.log("Connected to MongoDB");
});
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("common"));
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/messages", messageRoute);
app.use("/api/rooms", roomRoute);
app.listen(8000, () => {
    console.log("Server running on port 8000");
});
``;
//# sourceMappingURL=index.js.map