"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
var express_1 = require("express");
var validation_handler_1 = require("../../middleware/validation.handler");
var registerUser_schema_1 = __importDefault(require("./user/schemas/registerUser.schema"));
var userRegistration_controller_1 = __importDefault(require("./user/controllers/userRegistration.controller"));
var loginUser_schema_1 = __importDefault(require("./user/schemas/loginUser.schema"));
var userLogin_controller_1 = __importDefault(require("./user/controllers/userLogin.controller"));
exports.AuthRouter = (0, express_1.Router)();
exports.AuthRouter.post("/register", (0, validation_handler_1.ValidationHandler)(registerUser_schema_1.default), userRegistration_controller_1.default);
exports.AuthRouter.post("/login", (0, validation_handler_1.ValidationHandler)(loginUser_schema_1.default), userLogin_controller_1.default);
