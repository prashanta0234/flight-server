import { ErrorMaker } from "../../../utils/error-maker";
import { FlightModel, SeatModel } from "../models/flights.model";
import { CreateFlightProps } from "../schemas/createFlight.schema";

const CreateFlightService = async (data: CreateFlightProps) => {
	const {
		airline,
		date,
		destination,
		flight_number,
		origin,
		price,
		time,
		seats,
	} = data;

	const isExists = await FlightModel.findOne({ flight_number });

	if (isExists) {
		throw ErrorMaker(
			"Already Exists",
			"Your given flight number already exists",
			400
		);
	}

	const flight = await FlightModel.create({
		airline,
		date,
		destination,
		flight_number,
		origin,
		price,
		time,
	});

	const seatDocuments = seats.map((seatNumber) => ({
		flightId: flight._id,
		seatNumber,
	}));

	await SeatModel.insertMany(seatDocuments);

	return { flight, seats: seatDocuments };
};

export default CreateFlightService;
