"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zod_1 = require("zod");
var UpdateFlightSchema = zod_1.z.object({
    airline: zod_1.z.string().optional(),
    flight_number: zod_1.z.string().optional(),
    origin: zod_1.z.string().optional(),
    destination: zod_1.z.string().optional(),
    date: zod_1.z.string().optional(),
    time: zod_1.z.string().optional(),
    price: zod_1.z.number().optional(),
    seats: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.default = UpdateFlightSchema;
