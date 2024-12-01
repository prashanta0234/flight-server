import { ErrorMaker } from "../../../utils/error-maker";
import { FlightModel, SeatModel } from "../models/flights.model";
import { UpdateFlightProps } from "../schemas/updateFlight.schema";
import mongoose from "mongoose";

type props = UpdateFlightProps & {
	id: string;
};

const UpdateFlightService = async (data: props) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const flight = await FlightModel.findById({ _id: data.id });

		if (!flight) {
			throw ErrorMaker("Not Found", "Flight not found", 404);
		}

		if (
			data.airline ||
			data.flight_number ||
			data.origin ||
			data.destination ||
			data.date ||
			data.time ||
			data.price
		) {
			await FlightModel.updateOne(
				{ _id: data.id },
				{ $set: { ...data } },
				{ session }
			);
		}

		if (data.seats && data.seats.length > 0) {
			for (const seat of data.seats) {
				const existingSeat = await SeatModel.findOne({
					flightId: data.id,
					seatNumber: seat,
				}).session(session);

				if (!existingSeat) {
					await SeatModel.create(
						[
							{
								flightId: data.id,
								seatNumber: seat,
							},
						],
						{ session }
					);
				} else {
					await SeatModel.updateOne(
						{ flightId: data.id, seatNumber: seat },
						{ $set: { seatNumber: seat } },
						{ session }
					);
				}
			}
		}

		await session.commitTransaction();
		session.endSession();

		return { message: "Flight updated successfully." };
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		throw error;
	}
};

export default UpdateFlightService;
