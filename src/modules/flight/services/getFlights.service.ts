import { FlightModel } from "../models/flights.model";

const GetAvailableFlightService = async (
	page: number = 1,
	limit: number = 10
) => {
	const skip = (page - 1) * limit;

	const flights = await FlightModel.find({ availability: true })
		.select("airline flight_number origin destination date time price")
		.skip(skip)
		.limit(limit);

	return {
		flights,
	};
};

export default GetAvailableFlightService;
