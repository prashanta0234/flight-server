import { z } from "zod";

const SeatBookingSchema = z.object({
	flightId: z.string(),
	seatNumbers: z.array(z.string()),
});

export type SeatBookingProps = z.infer<typeof SeatBookingSchema>;

export default SeatBookingSchema;
