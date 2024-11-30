import { Router } from "express";
import { AuthRouter } from "./auth/auth.routes";
import { FlightRouter } from "./flight/flight.routes";
import { BookingRouter } from "./booking/booking.routes";

export const AppRouter = Router();

AppRouter.use("/", AuthRouter);
AppRouter.use("/flights", FlightRouter);
AppRouter.use("/bookings", BookingRouter);
