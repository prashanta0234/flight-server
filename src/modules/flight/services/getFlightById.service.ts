import { ErrorMaker } from "../../../utils/error-maker";
import { FlightModel } from "../models/flights.model";
import { SeatModel } from "../models/flights.model";

const GetFlightById = async (id: string) => {
	const flight = await FlightModel.findOne({ _id: id }).lean();

	if (!flight) {
		throw ErrorMaker("Not found", "Flight not found", 404);
	}

	const seats = await SeatModel.find({ flightId: id }).lean();

	return {
		flight,
		seats,
	};
};

export default GetFlightById;
