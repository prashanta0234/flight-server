import { z } from "zod";

export const FilterFlightQuerySchema = z.object({
	origin: z.string().optional(),
	destination: z.string().optional(),
	date: z.string().optional(),
	minPrice: z.number().optional(),
	maxPrice: z.number().optional(),
	airline: z.string().optional(),
	page: z.number().default(1).optional(),
	limit: z.number().default(10).optional(),
	flight_number: z.number().optional(),
});

export type FilterQueryParams = z.infer<typeof FilterFlightQuerySchema>;
