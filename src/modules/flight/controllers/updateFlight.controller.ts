import { TryCatch } from "../../../middleware/try-catch";
import { SendSuccessResponse } from "../../../utils/responseHelper";
import UpdateFlightService from "../services/updateFlight.service";

const UpdateFlightController = TryCatch(async (req, res) => {
	const id = req.params.id;
	const result = await UpdateFlightService({ ...req.body, id });
	SendSuccessResponse(res, {
		message: "Update flight Successfully",
		status: 200,
		data: result,
	});
});

export default UpdateFlightController;
