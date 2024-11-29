import { Router } from "express";
import { AuthRouter } from "./auth/auth.routes";
import { FlightRouter } from "./flight/flight.routes";

export const AppRouter = Router();

AppRouter.use("/", AuthRouter);
AppRouter.use("/flights", FlightRouter);
