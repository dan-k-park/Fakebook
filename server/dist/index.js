"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv-safe/config");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const database_1 = __importDefault(require("./config/database"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
const posts_1 = __importDefault(require("./routes/posts"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const messages_1 = __importDefault(require("./routes/messages"));
const rooms_1 = __importDefault(require("./routes/rooms"));
require("./config/passport");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("common"));
const sessionStore = new connect_mongo_1.default({
    clientPromise: database_1.default,
    collectionName: "sessions",
});
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    },
}));
app.get("/", (req, res) => {
    console.log(req.session);
    res.send("<h1>Hello</h1>");
});
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((req, _, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
});
app.use("/api/users", users_1.default);
app.use("/api/auth", auth_1.default);
app.use("/api/posts", posts_1.default);
app.use("/api/messages", messages_1.default);
app.use("/api/rooms", rooms_1.default);
app.listen(8000, () => {
    console.log("Server running on port 8000");
});
``;
//# sourceMappingURL=index.js.map