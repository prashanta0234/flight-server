import { Router } from "express";
import { ValidationHandler } from "../../middleware/validation.handler";
import SeatBookingSchema from "./schemas/bookSeats.schema";
import BookSeatController from "./controllers/bookSeats.controller";
import { AuthGuard } from "../../middleware/authGuard";
import ConfirmSeatController from "./controllers/confirmSeats.controller";
import GetUserBookingsController from "./controllers/getUserBookings.controller";
import GetBookingsController from "./controllers/getBookings.controller";
import UpdateBookingSchema from "./schemas/updateBooking.schema";
import UpdateBookingController from "./controllers/updateBookings.controller";

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

BookingRouter.get("/user/:id", AuthGuard("USER"), GetUserBookingsController);

BookingRouter.get("/", AuthGuard("ADMIN"), GetBookingsController);

BookingRouter.patch(
	"/:id",
	AuthGuard("ADMIN"),
	ValidationHandler(UpdateBookingSchema),
	UpdateBookingController
);
