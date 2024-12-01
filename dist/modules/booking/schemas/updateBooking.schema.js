"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zod_1 = require("zod");
var UpdateBookingSchema = zod_1.z.object({
    newSeatNumbers: zod_1.z
        .array(zod_1.z.string())
        .nonempty("At least one new seat number is required."),
});
exports.default = UpdateBookingSchema;
