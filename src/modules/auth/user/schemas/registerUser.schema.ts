import { z } from "zod";

const RegisterUserSchema = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Invalid email format" }),
	password: z
		.string({ required_error: "Password is required" })
		.min(6, "Password must be at least 6 characters"),
	name: z.string({ required_error: "Name is required" }),
	phone: z.string({ required_error: "Phone number is required" }),
	gender: z.string({ required_error: "Gender is required" }),
});

export type RegisterUserProps = z.infer<typeof RegisterUserSchema>;
export default RegisterUserSchema;
