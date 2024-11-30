import { Router } from "express";
import { AuthGuard } from "../../middleware/authGuard";
import { ValidationHandler } from "../../middleware/validation.handler";
import CreateFlightSchema from "./schemas/createFlight.schema";
import AddFlightController from "./controllers/createFlight.controller";
import GetFlightsController from "./controllers/getFlights.controller";
import { QueryValidationHandler } from "../../middleware/queryValidation.handler";
import GetFilterFlightsController from "./controllers/getFilterFlights.controller";
import { FilterFlightQuerySchema } from "./schemas/filterFlight.schema";
import GetFlightsByIdController from "./controllers/getFlightById.controller";

export const FlightRouter = Router();

FlightRouter.post(
	"/",
	AuthGuard("ADMIN"),
	ValidationHandler(CreateFlightSchema),
	AddFlightController
);
FlightRouter.get("/", GetFlightsController);
FlightRouter.get(
	"/search",
	QueryValidationHandler(FilterFlightQuerySchema),
	GetFilterFlightsController
);
FlightRouter.get("/:id", GetFlightsByIdController);
