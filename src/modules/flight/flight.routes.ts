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
import UpdateFlightController from "./controllers/updateFlight.controller";
import UpdateFlightSchema from "./schemas/updateFlight.schema";

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

FlightRouter.patch(
	"/:id",
	AuthGuard("ADMIN"),
	ValidationHandler(UpdateFlightSchema),
	UpdateFlightController
);
