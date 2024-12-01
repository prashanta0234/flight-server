"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zod_1 = require("zod");
var SeatBookingSchema = zod_1.z.object({
    flightId: zod_1.z.string(),
    seatNumbers: zod_1.z.array(zod_1.z.string()),
});
exports.default = SeatBookingSchema;
