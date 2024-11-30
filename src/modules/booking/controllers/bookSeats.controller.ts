import { TryCatch } from "../../../middleware/try-catch";
import { SendSuccessResponse } from "../../../utils/responseHelper";
import BookSeatsService from "../services/bookSeats.service";

const BookSeatController = TryCatch(async (req, res) => {
	const userId = req.user.id;
	const result = await BookSeatsService({ ...req.body, userId });
	SendSuccessResponse(res, {
		message: "Booked Successfully",
		status: 200,
		data: result,
	});
});

export default BookSeatController;
