import BookingModel from "../model/booking.model";
import { SeatModel } from "../../flight/models/flights.model";
import mongoose from "mongoose";

const DeleteBookingService = async (id: string) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const booking = await BookingModel.findById(id).populate("seatsBooked");

		if (!booking) {
			throw new Error("Booking not found.");
		}

		await SeatModel.updateMany(
			{ _id: { $in: booking.seatsBooked.map((seat) => seat._id) } },
			{ $set: { isBooked: false, bookedBy: null } },
			{ session }
		);

		await BookingModel.deleteOne({ _id: id }, { session });

		await session.commitTransaction();
		session.endSession();

		return { message: "Booking deleted." };
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		throw error;
	}
};

export default DeleteBookingService;
