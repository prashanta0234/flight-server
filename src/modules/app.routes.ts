import { Router } from "express";
import { AuthRouter } from "./auth/auth.routes";

export const AppRouter = Router();

AppRouter.use("/", AuthRouter);
