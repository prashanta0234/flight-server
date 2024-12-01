"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zod_1 = require("zod");
var CreateFlightSchema = zod_1.z.object({
    airline: zod_1.z.string().min(1, "Airline is required"),
    flight_number: zod_1.z.string().min(1, "Flight number is required"),
    origin: zod_1.z.string().min(1, "Origin is required"),
    destination: zod_1.z.string().min(1, "Destination is required"),
    date: zod_1.z.string().min(1, "Date is required"),
    time: zod_1.z.string().min(1, "Time is required"),
    price: zod_1.z.number().min(0, "Price must be a positive number"),
    seats: zod_1.z.array(zod_1.z.string()).min(1, "Seats is required."),
});
exports.default = CreateFlightSchema;
