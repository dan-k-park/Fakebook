"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("@typegoose/typegoose");
class Users {
}
__decorate([
    (0, typegoose_1.prop)({
        type: () => String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
    }),
    __metadata("design:type", String)
], Users.prototype, "username", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => String, required: true, minlength: 6 }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => String, default: "" }),
    __metadata("design:type", String)
], Users.prototype, "profilePicture", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => String, default: "" }),
    __metadata("design:type", String)
], Users.prototype, "coverPicture", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [String], default: [] }),
    __metadata("design:type", Array)
], Users.prototype, "friends", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Users.prototype, "isAdmin", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, maxlength: 160, default: "" }),
    __metadata("design:type", String)
], Users.prototype, "bio", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => String, default: "Not Available" }),
    __metadata("design:type", String)
], Users.prototype, "city", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => String, default: "Not Available" }),
    __metadata("design:type", String)
], Users.prototype, "from", void 0);
const UserModel = (0, typegoose_1.getModelForClass)(Users, {
    schemaOptions: { timestamps: true },
});
exports.default = UserModel;
//# sourceMappingURL=User.js.map