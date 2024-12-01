import { TryCatch } from "../../../middleware/try-catch";
import { SendSuccessResponse } from "../../../utils/responseHelper";
import GetBookingsService from "../services/getBookings.service";

import GetUserBookingService from "../services/getUserBooking.service";

const GetBookingsController = TryCatch(async (req, res) => {
	const page = req.params.page;
	const limit = req.params.limit;

	const result = await GetBookingsService(+page, +limit);
	SendSuccessResponse(res, {
		message: "Get user booking Successfully",
		status: 200,
		data: result,
	});
});

export default GetBookingsController;
