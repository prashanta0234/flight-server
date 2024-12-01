"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var BookingSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, ref: "users", required: true },
    flightId: { type: mongoose_1.Types.ObjectId, ref: "flights", required: true },
    numberOfSeats: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true, min: 0 },
    bookingStatus: {
        type: String,
        enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
        default: "Pending",
    },
    seatsBooked: [{ type: mongoose_1.Types.ObjectId, ref: "seats" }],
    bookingDate: { type: Date, default: Date.now },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending",
    },
    cancellationDate: { type: Date, default: null },
}, { timestamps: true });
var BookingModel = (0, mongoose_1.model)("Booking", BookingSchema);
exports.default = BookingModel;
