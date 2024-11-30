import { TryCatch } from "../../../middleware/try-catch";
import { SendSuccessResponse } from "../../../utils/responseHelper";
import BookSeatsService from "../services/bookSeats.service";
import ConfirmBookingService from "../services/confirmBooking.service";

const ConfirmSeatController = TryCatch(async (req, res) => {
	const userId = req.user.id;
	const result = await ConfirmBookingService({ ...req.body, userId });
	SendSuccessResponse(res, {
		message: "Confirm Successfully",
		status: 200,
		data: result,
	});
});

export default ConfirmSeatController;
