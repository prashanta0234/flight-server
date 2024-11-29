import { z } from "zod";

const LoginUserSchema = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Invalid email format" }),
	password: z
		.string({ required_error: "Password is required" })
		.min(6, "Password must be at least 6 characters"),
});

export type LoginUserProps = z.infer<typeof LoginUserSchema>;
export default LoginUserSchema;
