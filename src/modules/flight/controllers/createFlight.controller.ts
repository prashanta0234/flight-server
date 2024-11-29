import { TryCatch } from "../../../middleware/try-catch";
import { SendSuccessResponse } from "../../../utils/responseHelper";
import CreateFlightService from "../services/createFlight.service";

const AddFlightController = TryCatch(async (req, res) => {
	const result = await CreateFlightService(req.body);
	SendSuccessResponse(res, {
		message: "Create flight Successfully",
		status: 200,
		data: result,
	});
});

export default AddFlightController;
