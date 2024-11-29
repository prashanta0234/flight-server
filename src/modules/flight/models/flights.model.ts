import { model, Schema, Types } from "mongoose";

const FlightSchema = new Schema(
	{
		airline: { type: String, required: true },
		flight_number: { type: String, required: true, unique: true, index: true },
		origin: { type: String, required: true },
		destination: { type: String, required: true },
		date: { type: String, required: true },
		time: { type: String, required: true },
		price: { type: Number, required: true },
		availability: { type: Boolean, default: true, index: true },
	},
	{ timestamps: true }
);

const SeatSchema = new Schema({
	flightId: { type: Types.ObjectId, ref: "flights", required: true },
	seatNumber: { type: String, required: true },
	isBooked: { type: Boolean, default: false },
	bookedBy: { type: String, default: null },
});

export const FlightModel = model("flights", FlightSchema);
export const SeatModel = model("seats", SeatSchema);
