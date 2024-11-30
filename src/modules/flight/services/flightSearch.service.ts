import { FlightModel } from "../models/flights.model";
import { FilterQueryParams } from "../schemas/filterFlight.schema";

const GetFilteredFlightsService = async (query: FilterQueryParams) => {
	const {
		origin,
		destination,
		date,
		minPrice,
		maxPrice,
		airline,
		page = 1,
		limit = 10,
		flight_number,
	} = query;
	const skip = (Number(page) - 1) * Number(limit);

	const filters: any = { availability: true };
	if (origin) filters.origin = origin;
	if (destination) filters.destination = destination;
	if (date) filters.date = date;
	if (airline) filters.airline = airline;
	if (flight_number) filters.flight_number = flight_number;

	if (minPrice || maxPrice)
		filters.price = {
			...(minPrice ? { $gte: minPrice } : {}),
			...(maxPrice ? { $lte: maxPrice } : {}),
		};

	const flights = await FlightModel.aggregate([
		{ $match: filters },
		{ $skip: skip },
		{ $limit: Number(limit) },
		{
			$project: {
				airline: 1,
				flight_number: 1,
				origin: 1,
				destination: 1,
				date: 1,
				time: 1,
				price: 1,
				duration: 1,
				availableSeats: 1,
			},
		},
	]);

	return {
		flights,
	};
};

export default GetFilteredFlightsService;
