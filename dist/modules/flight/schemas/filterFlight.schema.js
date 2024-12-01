"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterFlightQuerySchema = void 0;
var zod_1 = require("zod");
exports.FilterFlightQuerySchema = zod_1.z.object({
    origin: zod_1.z.string().optional(),
    destination: zod_1.z.string().optional(),
    date: zod_1.z.string().optional(),
    minPrice: zod_1.z.number().optional(),
    maxPrice: zod_1.z.number().optional(),
    airline: zod_1.z.string().optional(),
    page: zod_1.z.number().default(1).optional(),
    limit: zod_1.z.number().default(10).optional(),
    flight_number: zod_1.z.number().optional(),
});
