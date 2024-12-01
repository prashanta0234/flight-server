import { FlightModel, SeatModel } from "../models/flights.model";
import mongoose from "mongoose";
import { ErrorMaker } from "../../../utils/error-maker";

const DeleteFlightService = async (id: string) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const flight = await FlightModel.findById(id).session(session);

		if (!flight) {
			throw ErrorMaker("Not Found", "Flight not found", 404);
		}

		await SeatModel.deleteMany({ flightId: id }).session(session);

		await FlightModel.findByIdAndDelete(id).session(session);

		await session.commitTransaction();
		session.endSession();

		return { message: "Flight and associated seats deleted successfully." };
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		throw error;
	}
};

export default DeleteFlightService;
