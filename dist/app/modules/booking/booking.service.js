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
exports.bookingServices = void 0;
const user_model_1 = require("../user/user.model");
const facility_model_1 = require("../facility/facility.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const mongoose_1 = __importDefault(require("mongoose"));
const availability_model_1 = require("../availability/availability.model");
const booking_model_1 = require("./booking.model");
const createBookingIntoDB = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const email = user.email;
    const startTime = Number(payload.startTime.split(":")[0]);
    const endTime = Number(payload.endTime.split(":")[0]);
    if (startTime > endTime || startTime > 24 || endTime > 24 || startTime === endTime) {
        throw new AppError_1.default(400, 'Your provided time is not acceptable!');
    }
    ;
    const isFacilityExist = yield facility_model_1.Facility.findById(payload.facility);
    if (!isFacilityExist) {
        throw new AppError_1.default(400, 'The facility is not exist!');
    }
    ;
    const userData = yield user_model_1.User.findOne({ email: email });
    const userId = userData === null || userData === void 0 ? void 0 : userData._id;
    const facilityData = yield facility_model_1.Facility.findOne({ _id: payload === null || payload === void 0 ? void 0 : payload.facility });
    const pricePerHour = facilityData === null || facilityData === void 0 ? void 0 : facilityData.pricePerHour;
    payload.payableAmount = (endTime - startTime) * (pricePerHour ? pricePerHour : 30);
    payload.isBooked = "confirmed";
    payload.user = userId;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const theAvailability = yield availability_model_1.Availability.findOne({
            date: payload.date,
            startTime: payload.startTime,
            endTime: payload.endTime
        });
        if (!theAvailability) {
            throw new AppError_1.default(400, 'Your schedule not matched, Please check the availability.');
        }
        ;
        const theAvailabilityId = theAvailability._id;
        const newStartTime = payload.endTime;
        const newEndTime = ((endTime + 3).toString()).concat(":00");
        const updateTheAvailability = yield availability_model_1.Availability.findByIdAndUpdate(theAvailabilityId, {
            startTime: newStartTime,
            endTime: newEndTime
        }, { session });
        if (!updateTheAvailability) {
            throw new AppError_1.default(400, 'Something wrong!');
        }
        ;
        const booking = yield booking_model_1.Booking.create([payload], { session });
        if (!booking.length) {
            throw new AppError_1.default(400, 'Something wrong please try again!');
        }
        ;
        yield session.commitTransaction();
        yield session.endSession();
        return booking;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(400, 'Something happened wrong! please try again.');
    }
});
const getAllBookingForAdminFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find().populate('user').populate('facility');
    return result;
});
const getBookingForUserFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield user_model_1.User.findOne({ email: email });
    const userId = userData === null || userData === void 0 ? void 0 : userData._id;
    const bookings = yield booking_model_1.Booking.find({ user: userId }).populate('facility').populate('user');
    return bookings;
});
const cancelBookingIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = booking_model_1.Booking.findByIdAndUpdate(id, { isBooked: "canceled" }, { new: true }).populate('facility');
    return result;
});
exports.bookingServices = {
    createBookingIntoDB,
    getAllBookingForAdminFromDB,
    getBookingForUserFromDB,
    cancelBookingIntoDB
};
