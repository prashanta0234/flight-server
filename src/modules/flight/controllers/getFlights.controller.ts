import { TryCatch } from "../../../middleware/try-catch";
import { SendSuccessResponse } from "../../../utils/responseHelper";
import GetAvailableFlightService from "../services/getFlights.service";
const GetFlightsController = TryCatch(async (req, res) => {
	const { page = 1, limit = 10 } = req.query;

	const result = await GetAvailableFlightService(Number(page), Number(limit));

	SendSuccessResponse(res, {
		message: "Get flights successfully",
		status: 200,
		data: result,
	});
});

export default GetFlightsController;
