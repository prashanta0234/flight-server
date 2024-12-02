"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = require("./utils/config");
var dbConnection_1 = require("./utils/dbConnection");
var global_error_validation_1 = require("./middleware/global-error-validation");
var app_routes_1 = require("./modules/app.routes");
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
var port = config_1.config.PORT;
app.use("/api", app_routes_1.AppRouter);
app.get("/", function (req, res) {
    res.send("Hello from Flight server!");
});
app.use(global_error_validation_1.GlobalErrorHandler);
(0, dbConnection_1.connectDB)().then(function () {
    app.listen(port, function () {
        console.log("Server is running at ".concat(port));
    });
});
