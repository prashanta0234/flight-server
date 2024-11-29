import jwt from "jsonwebtoken";
import { ErrorMaker } from "../../../../utils/error-maker";
import { UserModel } from "../model/users.model";
import { RegisterUserProps } from "../schemas/registerUser.schema";
import bcrypt from "bcrypt";
import { config } from "../../../../utils/config";

const UserRegistrationService = async (data: RegisterUserProps) => {
	const { email, gender, name, password, phone } = data;
	const isExists = await UserModel.findOne({ email });
	if (isExists) {
		throw ErrorMaker(
			"Already Exists",
			"Your given email is already exists",
			400
		);
	}
	const hashedPass = await bcrypt.hash(data.password, 10);

	await UserModel.create({
		email,
		gender,
		name,
		phone,
		password: hashedPass,
	});

	const user = await UserModel.findOne({ email });

	var token = await jwt.sign(
		{
			name: user && user.name,
			id: user && user._id,
			role: user && user.role,
		},
		config.JWT_SECRET!,
		{ expiresIn: "1h" }
	);

	return {
		token: token,
	};
};

export default UserRegistrationService;
