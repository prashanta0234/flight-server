import { model, Schema, Types } from "mongoose";

const BookingSchema = new Schema(
	{
		userId: { type: Types.ObjectId, ref: "users", required: true },
		flightId: { type: Types.ObjectId, ref: "flights", required: true },
		numberOfSeats: { type: Number, required: true, min: 1 },
		totalPrice: { type: Number, required: true, min: 0 },
		bookingStatus: {
			type: String,
			enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
			default: "Pending",
		},
		seatsBooked: [{ type: Types.ObjectId, ref: "seats" }],
		bookingDate: { type: Date, default: Date.now },
		paymentStatus: {
			type: String,
			enum: ["Pending", "Paid", "Failed"],
			default: "Pending",
		},
		cancellationDate: { type: Date, default: null },
	},
	{ timestamps: true }
);

const BookingModel = model("Booking", BookingSchema);

export default BookingModel;
