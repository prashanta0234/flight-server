import { z } from "zod";

const UpdateBookingSchema = z.object({
	newSeatNumbers: z
		.array(z.string())
		.nonempty("At least one new seat number is required."),
});

export default UpdateBookingSchema;
