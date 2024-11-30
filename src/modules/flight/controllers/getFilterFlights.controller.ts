import { TryCatch } from "../../../middleware/try-catch";
import { SendSuccessResponse } from "../../../utils/responseHelper";
import { FilterQueryParams } from "../schemas/filterFlight.schema";
import GetFilteredFlightsService from "../services/flightSearch.service";

const GetFilterFlightsController = TryCatch(async (req, res) => {
	const result = await GetFilteredFlightsService(
		req.query as unknown as FilterQueryParams
	);

	SendSuccessResponse(res, {
		message: "Get flights successfully",
		status: 200,
		data: result,
	});
});

export default GetFilterFlightsController;
