"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalErrorHandler = void 0;
var responseHelper_1 = require("../utils/responseHelper");
var GlobalErrorHandler = function (err, _, res, __) {
    var status = err.status || 500;
    var message = err.message || "something went wrong";
    if (err.name === "ZodError") {
        status = 400;
        message = err.issues.reduce(function (msg, issue, index) {
            msg +=
                issue.received === "undefined"
                    ? issue.message
                    : "In ".concat(issue.path[0], " ").concat(issue.message);
            msg += index !== err.issues.length - 1 ? " || " : "";
            return msg;
        }, "");
    }
    if (err.name === "TokenExpiredError") {
        console.log(err);
        status = 401;
    }
    (0, responseHelper_1.SendErrorResponse)(res, { message: message, status: status, error: err });
};
exports.GlobalErrorHandler = GlobalErrorHandler;
