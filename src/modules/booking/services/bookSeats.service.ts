import { SeatModel } from "../../flight/models/flights.model";
import mongoose from "mongoose";
import { SeatBookingProps } from "../schemas/bookSeats.schema";
import { ErrorMaker } from "../../../utils/error-maker";

type props = SeatBookingProps & {
	userId: string;
};

const BookSeatsService = async (data: props) => {
	const { seatIds, userId } = data;
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const seats = await SeatModel.find({
			_id: { $in: seatIds },
			isBooked: false,
		}).session(session);

		if (seats.length !== seatIds.length) {
			throw ErrorMaker(
				"Unavailable",
				"Some seats are already booked or unavailable.",
				400
			);
		}

		await SeatModel.updateMany(
			{ _id: { $in: seats.map((seat) => seat._id) } },
			{
				$set: {
					isBooked: true,
					bookedBy: userId,
					reservedAt: new Date(),
				},
			},
			{ session }
		);

		await session.commitTransaction();
		session.endSession();

		setTimeout(async () => {
			try {
				const reservationExpiryTime = 2 * 60 * 1000; // 2 minutes
				const expiredSeats = await SeatModel.updateMany(
					{
						_id: { $in: seats.map((seat) => seat._id) },
						reservedAt: { $lt: new Date(Date.now() - reservationExpiryTime) },
						isBooked: true,
						bookedBy: userId,
					},
					{
						$set: {
							isBooked: false,
							bookedBy: null,
							reservedAt: null,
						},
					}
				);

				if (expiredSeats.matchedCount > 0) {
					console.log(
						`Released ${expiredSeats.matchedCount} expired seats for user ${userId}`
					);
				} else {
					console.log("No expired seats to release.");
				}
			} catch (error) {
				console.error("Error releasing expired seats:", error);
			}
		}, 2 * 60 * 1000);

		return {
			message: "Seats reserved successfully. Complete payment to confirm.",
		};
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		throw error;
	}
};

export default BookSeatsService;
