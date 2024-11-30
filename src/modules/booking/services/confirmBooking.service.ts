import BookingModel from "../model/booking.model";
import { FlightModel, SeatModel } from "../../flight/models/flights.model";
import mongoose from "mongoose";
import { SeatBookingProps } from "../schemas/bookSeats.schema";

type props = SeatBookingProps & {
	userId: string;
};

const ConfirmBookingService = async (data: props) => {
	const { userId, flightId, seatNumbers } = data;
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const seats = await SeatModel.find({
			flightId,
			seatNumber: { $in: seatNumbers },
			isBooked: true,
			bookedBy: userId,
		}).session(session);

		if (seats.length !== seatNumbers.length) {
			throw new Error("Some seats have been released or not reserved.");
		}

		const flight = await FlightModel.findById(flightId).session(session);
		if (!flight) {
			throw new Error("Flight not found.");
		}
		const seatPrice = flight.price;

		const totalPrice = seatPrice * seats.length;

		const booking = new BookingModel({
			userId,
			flightId,
			numberOfSeats: seats.length,
			totalPrice,
			seatsBooked: seats.map((seat) => seat._id),
			bookingStatus: "Confirmed",
			paymentStatus: "Paid",
		});

		await booking.save({ session });

		await SeatModel.updateMany(
			{ _id: { $in: seats.map((seat) => seat._id) } },
			{
				$set: { isBooked: true, bookedBy: userId },
			},
			{ session }
		);

		await session.commitTransaction();
		session.endSession();

		return {
			message: "Booking confirmed successfully.",
			bookingId: booking._id,
			totalPrice,
		};
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		throw error;
	}
};

export default ConfirmBookingService;
