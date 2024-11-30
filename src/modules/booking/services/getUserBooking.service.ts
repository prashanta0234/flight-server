import BookingModel from "../model/booking.model";

const GetUserBookingService = async (userId: string) => {
	try {
		const userBookings = await BookingModel.find({ userId })
			.populate("seatsBooked")
			.exec();

		if (!userBookings || userBookings.length === 0) {
			throw new Error("No bookings found for this user.");
		}

		return userBookings;
	} catch (error) {
		console.error(`Error fetching bookings for user ${userId}:`, error);
		throw error;
	}
};

export default GetUserBookingService;
