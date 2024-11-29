import { z } from "zod";

const CreateFlightSchema = z.object({
	airline: z.string().min(1, "Airline is required"),
	flight_number: z.string().min(1, "Flight number is required"),
	origin: z.string().min(1, "Origin is required"),
	destination: z.string().min(1, "Destination is required"),
	date: z.string().min(1, "Date is required"),
	time: z.string().min(1, "Time is required"),
	price: z.number().min(0, "Price must be a positive number"),
	seats: z.array(z.string()).min(1, "Seats is required."),
});

export type CreateFlightProps = z.infer<typeof CreateFlightSchema>;

export default CreateFlightSchema;
