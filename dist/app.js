"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./app/modules/user/user.route");
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const auth_route_1 = require("./app/modules/auth/auth.route");
const facility_route_1 = require("./app/modules/facility/facility.route");
const availability_route_1 = require("./app/modules/availability/availability.route");
const booking_route_1 = require("./app/modules/booking/booking.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// -----ROUTES START----- //
app.use('/api', user_route_1.userRoutes);
app.use('/api', auth_route_1.authRoutes);
app.use('/api', facility_route_1.facilityRoutes);
app.use('/api', availability_route_1.availabilityRoutes);
app.use('/api', booking_route_1.bookingRoutes);
// -----ROUTES END----- //
app.get('/', (req, res) => {
    res.send('WELCOME TO ASSIGNMENT --3--');
});
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Not Found",
    });
});
app.use(globalErrorHandler_1.default);
exports.default = app;
