import { z } from "zod";

const UpdateFlightSchema = z.object({
	airline: z.string().optional(),
	flight_number: z.string().optional(),
	origin: z.string().optional(),
	destination: z.string().optional(),
	date: z.string().optional(),
	time: z.string().optional(),
	price: z.number().optional(),
	seats: z.array(z.string()).optional(),
});

export type UpdateFlightProps = z.infer<typeof UpdateFlightSchema>;

export default UpdateFlightSchema;
