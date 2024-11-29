import { TryCatch } from "../../../../middleware/try-catch";
import { SendSuccessResponse } from "../../../../utils/responseHelper";
import UserLoginService from "../services/login.service";

const UserLoginController = TryCatch(async (req, res) => {
	const result = await UserLoginService(req.body);
	SendSuccessResponse(res, {
		message: "Login Successfully",
		status: 200,
		data: result,
	});
});

export default UserLoginController;
