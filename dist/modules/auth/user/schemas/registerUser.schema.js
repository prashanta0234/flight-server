"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zod_1 = require("zod");
var RegisterUserSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid email format" }),
    password: zod_1.z
        .string({ required_error: "Password is required" })
        .min(6, "Password must be at least 6 characters"),
    name: zod_1.z.string({ required_error: "Name is required" }),
    phone: zod_1.z.string({ required_error: "Phone number is required" }),
    gender: zod_1.z.string({ required_error: "Gender is required" }),
});
exports.default = RegisterUserSchema;
