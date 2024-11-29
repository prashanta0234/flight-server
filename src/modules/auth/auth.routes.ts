import { Router } from "express";
import { ValidationHandler } from "../../middleware/validation.handler";
import RegisterUserSchema from "./user/schemas/registerUser.schema";
import UserRegistrationController from "./user/controllers/userRegistration.controller";
import LoginUserSchema from "./user/schemas/loginUser.schema";
import UserLoginController from "./user/controllers/userLogin.controller";

export const AuthRouter = Router();

AuthRouter.post(
	"/register",
	ValidationHandler(RegisterUserSchema),
	UserRegistrationController
);

AuthRouter.post(
	"/login",
	ValidationHandler(LoginUserSchema),
	UserLoginController
);
