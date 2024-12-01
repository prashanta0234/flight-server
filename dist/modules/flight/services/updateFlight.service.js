"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var error_maker_1 = require("../../../utils/error-maker");
var flights_model_1 = require("../models/flights.model");
var mongoose_1 = __importDefault(require("mongoose"));
var UpdateFlightService = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var session, flight, _i, _a, seat, existingSeat, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
            case 1:
                session = _b.sent();
                session.startTransaction();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 14, , 16]);
                return [4 /*yield*/, flights_model_1.FlightModel.findById({ _id: data.id })];
            case 3:
                flight = _b.sent();
                if (!flight) {
                    throw (0, error_maker_1.ErrorMaker)("Not Found", "Flight not found", 404);
                }
                if (!(data.airline ||
                    data.flight_number ||
                    data.origin ||
                    data.destination ||
                    data.date ||
                    data.time ||
                    data.price)) return [3 /*break*/, 5];
                return [4 /*yield*/, flights_model_1.FlightModel.updateOne({ _id: data.id }, { $set: __assign({}, data) }, { session: session })];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5:
                if (!(data.seats && data.seats.length > 0)) return [3 /*break*/, 12];
                _i = 0, _a = data.seats;
                _b.label = 6;
            case 6:
                if (!(_i < _a.length)) return [3 /*break*/, 12];
                seat = _a[_i];
                return [4 /*yield*/, flights_model_1.SeatModel.findOne({
                        flightId: data.id,
                        seatNumber: seat,
                    }).session(session)];
            case 7:
                existingSeat = _b.sent();
                if (!!existingSeat) return [3 /*break*/, 9];
                return [4 /*yield*/, flights_model_1.SeatModel.create([
                        {
                            flightId: data.id,
                            seatNumber: seat,
                        },
                    ], { session: session })];
            case 8:
                _b.sent();
                return [3 /*break*/, 11];
            case 9: return [4 /*yield*/, flights_model_1.SeatModel.updateOne({ flightId: data.id, seatNumber: seat }, { $set: { seatNumber: seat } }, { session: session })];
            case 10:
                _b.sent();
                _b.label = 11;
            case 11:
                _i++;
                return [3 /*break*/, 6];
            case 12: return [4 /*yield*/, session.commitTransaction()];
            case 13:
                _b.sent();
                session.endSession();
                return [2 /*return*/, { message: "Flight updated successfully." }];
            case 14:
                error_1 = _b.sent();
                return [4 /*yield*/, session.abortTransaction()];
            case 15:
                _b.sent();
                session.endSession();
                throw error_1;
            case 16: return [2 /*return*/];
        }
    });
}); };
exports.default = UpdateFlightService;
