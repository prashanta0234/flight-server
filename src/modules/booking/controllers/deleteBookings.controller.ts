import { TryCatch } from "../../../middleware/try-catch";
import { SendSuccessResponse } from "../../../utils/responseHelper";
import DeleteBookingService from "../services/deleteBooking.service";

const DeleteBookingController = TryCatch(async (req, res) => {
	const bookingId = req.params.id;
	const result = await DeleteBookingService(bookingId);
	SendSuccessResponse(res, {
		message: "Delete booking Successfully",
		status: 200,
		data: result,
	});
});

export default DeleteBookingController;
