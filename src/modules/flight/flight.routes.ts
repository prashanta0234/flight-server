import { Router } from "express";
import { AuthGuard } from "../../middleware/authGuard";
import { ValidationHandler } from "../../middleware/validation.handler";
import CreateFlightSchema from "./schemas/createFlight.schema";
import AddFlightController from "./controllers/createFlight.controller";
import GetFlightsController from "./controllers/getFlights.controller";

export const FlightRouter = Router();

FlightRouter.post(
	"/",
	AuthGuard("ADMIN"),
	ValidationHandler(CreateFlightSchema),
	AddFlightController
);
FlightRouter.get("/", GetFlightsController);
