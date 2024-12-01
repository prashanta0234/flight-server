"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatModel = exports.FlightModel = void 0;
var mongoose_1 = require("mongoose");
var FlightSchema = new mongoose_1.Schema({
    airline: { type: String, required: true },
    flight_number: { type: String, required: true, unique: true, index: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: Boolean, default: true, index: true },
}, { timestamps: true });
var SeatSchema = new mongoose_1.Schema({
    flightId: { type: mongoose_1.Types.ObjectId, ref: "flights", required: true },
    seatNumber: { type: String, required: true },
    isBooked: { type: Boolean, default: false },
    bookedBy: { type: String, default: null },
    reservedAt: { type: Date, default: null },
}, { timestamps: true });
exports.FlightModel = (0, mongoose_1.model)("flights", FlightSchema);
exports.SeatModel = (0, mongoose_1.model)("seats", SeatSchema);
