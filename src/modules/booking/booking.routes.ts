import { Router } from "express";
import { ValidationHandler } from "../../middleware/validation.handler";
import SeatBookingSchema from "./schemas/bookSeats.schema";
import BookSeatController from "./controllers/bookSeats.controller";
import { AuthGuard } from "../../middleware/authGuard";
import ConfirmSeatController from "./controllers/confirmSeats.controller";

export const BookingRouter = Router();

BookingRouter.post(
	"/",
	AuthGuard("USER"),
	ValidationHandler(SeatBookingSchema),
	BookSeatController
);

BookingRouter.post(
	"/confirm",
	AuthGuard("USER"),
	ValidationHandler(SeatBookingSchema),
	ConfirmSeatController
);
