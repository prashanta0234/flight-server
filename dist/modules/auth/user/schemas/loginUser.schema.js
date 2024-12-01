"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zod_1 = require("zod");
var LoginUserSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid email format" }),
    password: zod_1.z
        .string({ required_error: "Password is required" })
        .min(6, "Password must be at least 6 characters"),
});
exports.default = LoginUserSchema;
