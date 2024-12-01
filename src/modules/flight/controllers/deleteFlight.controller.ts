import { TryCatch } from "../../../middleware/try-catch";
import { SendSuccessResponse } from "../../../utils/responseHelper";
import DeleteFlightService from "../services/deleteFlight.service";
const DeleteFlightController = TryCatch(async (req, res) => {
	const flightId = req.params.id;

	const result = await DeleteFlightService(flightId as string);

	SendSuccessResponse(res, {
		message: "Delete flight successfully",
		status: 200,
		data: result,
	});
});

export default DeleteFlightController;
