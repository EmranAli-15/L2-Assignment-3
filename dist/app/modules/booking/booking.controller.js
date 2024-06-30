"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const booking_service_1 = require("./booking.service");
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield booking_service_1.bookingServices.createBookingIntoDB(user, req.body);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Booking created successfully",
        data: result[0]
    });
}));
const getAllBookingForAdminFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.bookingServices.getAllBookingForAdminFromDB();
    if (result.length === 0) {
        res.status(200).json({
            success: true,
            "statusCode": 404,
            message: 'No data found',
            data: result
        });
    }
    else {
        res.status(200).json({
            success: true,
            "statusCode": 200,
            message: 'Bookings retrieved successfully',
            data: result
        });
    }
}));
const getBookingForUserFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const result = yield booking_service_1.bookingServices.getBookingForUserFromDB(email);
    if (result.length === 0) {
        res.status(200).json({
            success: true,
            "statusCode": 404,
            message: 'No data found',
            data: result
        });
    }
    else {
        res.status(200).json({
            success: true,
            "statusCode": 200,
            message: 'Bookings retrieved successfully',
            data: result
        });
    }
}));
const cancelBookingFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield booking_service_1.bookingServices.cancelBookingIntoDB(id);
    res.status(200).json({
        success: true,
        "statusCode": 200,
        message: 'Booking cancelled successfully',
        data: result
    });
}));
exports.bookingControllers = {
    createBooking,
    getAllBookingForAdminFromDB,
    getBookingForUserFromDB,
    cancelBookingFromDB
};
