import BookingModel from "../model/booking.model";
import { SeatModel } from "../../flight/models/flights.model";
import mongoose from "mongoose";
import { ErrorMaker } from "../../../utils/error-maker";

type UpdateBookingProps = {
	bookingId: string;
	newSeatNumbers: string[];
};

const UpdateBookingService = async (data: UpdateBookingProps) => {
	const { bookingId, newSeatNumbers } = data;
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const booking = await BookingModel.findById(bookingId).populate<{
			seatsBooked: { _id: mongoose.Types.ObjectId }[];
		}>("seatsBooked");

		if (!booking) {
			throw ErrorMaker("Not found", "Booking not found.", 404);
		}

		await SeatModel.updateMany(
			{
				_id: { $in: booking.seatsBooked.map((seat) => seat._id) },
				isBooked: true,
			},
			{ $set: { isBooked: false, bookedBy: null } },
			{ session }
		);

		const newSeats = await SeatModel.find({
			seatNumber: { $in: newSeatNumbers },
			flightId: booking.flightId,
			isBooked: false,
		}).session(session);

		if (newSeats.length !== newSeatNumbers.length) {
			throw ErrorMaker(
				"Unavailable",
				"Some of the new seats are already booked or unavailable.",
				400
			);
		}

		await SeatModel.updateMany(
			{ _id: { $in: newSeats.map((seat) => seat._id) } },
			{ $set: { isBooked: true, bookedBy: booking.userId } },
			{ session }
		);

		booking.seatsBooked = newSeats.map((seat) => seat._id);
		booking.numberOfSeats = newSeats.length;
		await booking.save({ session });

		await session.commitTransaction();
		session.endSession();

		return booking;
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		throw error;
	}
};

export default UpdateBookingService;
