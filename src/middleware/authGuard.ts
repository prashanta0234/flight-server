import jwt, { JwtPayload } from "jsonwebtoken";
import { TryCatch } from "./try-catch";
import { ErrorMaker } from "../utils/error-maker";
import { config } from "../utils/config";
import { UserModel } from "../modules/auth/user/model/users.model";

export type TUserRole = "ADMIN" | "USER";

export const AuthGuard = (...requiredRoles: TUserRole[]) => {
	return TryCatch(async (req, __, next) => {
		const token = req.headers.authorization;
		const jwt_secret = config.JWT_SECRET;

		if (!token) throw ErrorMaker("Invalid token", "Invalid Token Format", 401);

		const tokenParts = token.split(" ");
		if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
			throw ErrorMaker("Invalid token", "Invalid Token Format", 401);
		}

		const decodedUser = jwt.verify(tokenParts[1], jwt_secret!) as JwtPayload;

		if (!decodedUser) throw ErrorMaker("Not found.", "User Not Found", 404);

		const { id, role } = decodedUser;

		if (requiredRoles && !requiredRoles.includes(role))
			throw ErrorMaker(
				"Not permitted",
				"You are not permitted to use this service.",
				403
			);

		const userInfo = await UserModel.findOne({ _id: id });
		if (!userInfo) throw ErrorMaker("Not found.", "User Not Found", 404);

		if ("USER" === role) {
			if (userInfo.role !== "USER") {
				throw ErrorMaker(
					"Not Permitted.",
					"Sorry you are not permitted to access this.",
					401
				);
			}
			req.user = { id, role };
		} else if (role === "ADMIN") {
			if (userInfo.role !== "ADMIN") {
				throw ErrorMaker(
					"Not Permitted.",
					"Sorry you are not permitted to access this.",
					401
				);
			}
			req.user = { id, role };
		}

		next();
	});
};
