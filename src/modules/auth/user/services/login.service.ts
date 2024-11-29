import { config } from "../../../../utils/config";
import { ErrorMaker } from "../../../../utils/error-maker";
import { UserModel } from "../model/users.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginUserProps } from "../schemas/loginUser.schema";

const UserLoginService = async (data: LoginUserProps) => {
	const { email, password } = data;
	const isExists = await UserModel.findOne({ email });
	if (!isExists) {
		throw ErrorMaker("Not found", "Sorry you are not registered.", 404);
	}

	const isPasswordMatch = await bcrypt.compare(password, isExists.password);

	if (!isPasswordMatch) {
		throw ErrorMaker(
			"Not match",
			"Sorry you`r given password not matched.",
			400
		);
	}

	var token = await jwt.sign(
		{
			name: isExists && isExists.name,
			id: isExists && isExists._id,
			role: isExists && isExists.role,
		},
		config.JWT_SECRET!,
		{ expiresIn: "1h" }
	);

	return {
		token: token,
	};
};

export default UserLoginService;
