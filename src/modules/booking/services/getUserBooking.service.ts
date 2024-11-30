import { FlightModel } from "../../flight/models/flights.model";
import BookingModel from "../model/booking.model";

const GetUserBookingService = async (userId: string) => {
	const userBookings = await BookingModel.find({ userId })
		.populate({
			path: "seatsBooked",
			select: "seatNumber",
		})
		.populate({
			path: "flightId",
			model: FlightModel,
			select: "destination region airline flight_number date time price",
		});

	if (!userBookings || userBookings.length === 0) {
		throw new Error("No bookings found for this user.");
	}

	return userBookings;
};

export default GetUserBookingService;
