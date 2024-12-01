"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    gender: { type: String },
    role: { type: String, default: "USER" },
}, { timestamps: true });
exports.UserModel = (0, mongoose_1.model)("users", UserSchema);
