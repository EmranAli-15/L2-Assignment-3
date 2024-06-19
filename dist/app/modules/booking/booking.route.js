"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importStar(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const booking_controller_1 = require("./booking.controller");
const route = express_1.default.Router();
route.post('/bookings', (0, auth_1.default)(auth_1.userRole.user), (0, validateRequest_1.default)(booking_validation_1.bookingValidations.createBookingValidation), booking_controller_1.bookingControllers.createBooking);
route.get('/bookings', (0, auth_1.default)(auth_1.userRole.admin), booking_controller_1.bookingControllers.getAllBookingForAdminFromDB);
route.get('/bookings/user', (0, auth_1.default)(auth_1.userRole.user), booking_controller_1.bookingControllers.getBookingForUserFromDB);
route.delete('/bookings/:id', (0, auth_1.default)(auth_1.userRole.user), booking_controller_1.bookingControllers.cancelBookingFromDB);
exports.bookingRoutes = route;
