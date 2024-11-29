import { TryCatch } from "../../../../middleware/try-catch";
import { SendSuccessResponse } from "../../../../utils/responseHelper";
import UserRegistrationService from "../services/register.service";

const UserRegistrationController = TryCatch(async (req, res) => {
	const result = await UserRegistrationService(req.body);
	SendSuccessResponse(res, {
		message: "Signup Successfully",
		status: 200,
		data: result,
	});
});

export default UserRegistrationController;
