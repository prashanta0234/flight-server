import { TryCatch } from "../../../middleware/try-catch";
import { SendSuccessResponse } from "../../../utils/responseHelper";
import UpdateBookingService from "../services/updateBooking.service";

const UpdateBookingController = TryCatch(async (req, res) => {
	const bookingId = req.params.id;
	const result = await UpdateBookingService({ ...req.body, bookingId });
	SendSuccessResponse(res, {
		message: "Update booking Successfully",
		status: 200,
		data: result,
	});
});

export default UpdateBookingController;
