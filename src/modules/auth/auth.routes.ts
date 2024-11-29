import { Router } from "express";
import UserRegistrationController from "./user/controllers/userRegistration.controller";
import { ValidationHandler } from "../../middleware/validation.handler";
import RegisterUserSchema from "./user/schemas/registerUser.schema";

export const AuthRouter = Router();

AuthRouter.use(
	"/register",
	ValidationHandler(RegisterUserSchema),
	UserRegistrationController
);
