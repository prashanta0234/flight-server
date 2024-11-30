import { TryCatch } from "../../../middleware/try-catch";
import { SendSuccessResponse } from "../../../utils/responseHelper";
import GetFlightById from "../services/getFlightById.service";
const GetFlightsByIdController = TryCatch(async (req, res) => {
	const flightId = req.params.id;

	const result = await GetFlightById(flightId as string);

	SendSuccessResponse(res, {
		message: "Get flights successfully",
		status: 200,
		data: result,
	});
});

export default GetFlightsByIdController;
