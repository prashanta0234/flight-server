import { model, Schema } from "mongoose";

const UserSchema = new Schema(
	{
		name: { type: String, required: true },
		phone: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true, index: true },
		password: { type: String, required: true },
		gender: { type: String },
		role: { type: String, default: "USER" },
	},
	{ timestamps: true }
);
export const UserModel = model("users", UserSchema);
