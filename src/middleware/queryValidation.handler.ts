import { AnyZodObject } from "zod";
import { TryCatch } from "./try-catch";

export const QueryValidationHandler = (schema: AnyZodObject) => {
	return TryCatch(async (req, _, next) => {
		console.log(req.body);
		const payload = await schema.parseAsync(req.params);
		req.params = payload;
		next();
	});
};