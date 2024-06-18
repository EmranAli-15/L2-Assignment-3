import { JwtPayload } from "jsonwebtoken";
import { TBooking } from "./booking.interface";
import { User } from "../user/user.model";
import { Facility } from "../facility/facility.model";
import AppError from "../../errors/AppError";
import mongoose, { ObjectId, Types } from "mongoose";
import { Availability } from "../availability/availability.model";
import { Booking } from "./booking.model";
import { Schema } from "zod";

const createBookingIntoDB = async (user: JwtPayload, payload: TBooking) => {

    const email = user.email;
    const startTime = Number(payload.startTime.split(":")[0]);
    const endTime = Number(payload.endTime.split(":")[0]);

    if (startTime > endTime || startTime > 24 || endTime > 24 || startTime === endTime) {
        throw new AppError(400, 'Your provided time is not acceptable!');
    };

    const isFacilityExist = await Facility.findById(payload.facility);
    if (!isFacilityExist) {
        throw new AppError(400, 'The facility is not exist!');
    };

    const userData = await User.findOne({ email: email });
    const userId = userData?._id;

    const facilityData = await Facility.findOne({ _id: payload?.facility });
    const pricePerHour = facilityData?.pricePerHour;




    payload.payableAmount = (endTime - startTime) * (pricePerHour ? pricePerHour : 30);
    payload.isBooked = "confirmed";
    payload.user = userId as Types.ObjectId;

    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const theAvailability = await Availability.findOne(
            {
                date: payload.date,
                startTime: payload.startTime,
                endTime: payload.endTime
            }
        );

        if (!theAvailability) {
            throw new AppError(400, 'Your schedule not matched, Please check the availability.');
        };

        const theAvailabilityId = theAvailability._id;
        const newStartTime = payload.endTime;
        const newEndTime = ((endTime + 3).toString()).concat(":00");

        const updateTheAvailability = await Availability.findByIdAndUpdate(theAvailabilityId, {
            startTime: newStartTime,
            endTime: newEndTime
        }, { session });

        if (!updateTheAvailability) {
            throw new AppError(400, 'Something wrong!');
        };

        const booking = await Booking.create([payload], { session });

        if (!booking.length) {
            throw new AppError(400, 'Something wrong please try again!');
        };

        await session.commitTransaction();
        await session.endSession();

        return booking;

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(400, 'Something happened wrong! please try again.');
    }

};

const getAllBookingForAdminFromDB = async () => {
    const result = await Booking.find().populate('user').populate('facility');
    return result;
}


export const bookingServices = {
    createBookingIntoDB,
    getAllBookingForAdminFromDB
};