import { ErrorMaker } from "../../../utils/error-maker";
import { FlightModel } from "../../flight/models/flights.model";
import BookingModel from "../model/booking.model";

const GetBookingsService = async (page: number = 1, limit: number = 10) => {
	const skip = (page - 1) * limit;

	const userBookings = await BookingModel.find()
		.skip(skip)
		.limit(limit)
		.populate({
			path: "seatsBooked",
		})
		.populate({
			path: "flightId",
			model: FlightModel,
		});

	if (!userBookings || userBookings.length === 0) {
		throw ErrorMaker("Not found", "No bookings found for this user.", 404);
	}

	return userBookings;
};

export default GetBookingsService;
