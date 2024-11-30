import { TryCatch } from "../../../middleware/try-catch";
import { SendSuccessResponse } from "../../../utils/responseHelper";

import GetUserBookingService from "../services/getUserBooking.service";

const GetUserBookingsController = TryCatch(async (req, res) => {
	const userId = req.params.id;
	const result = await GetUserBookingService(userId);
	SendSuccessResponse(res, {
		message: "Get user booking Successfully",
		status: 200,
		data: result,
	});
});

export default GetUserBookingsController;
