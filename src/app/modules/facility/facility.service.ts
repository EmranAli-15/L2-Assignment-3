import mongoose from "mongoose";
import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";
import AppError from "../../errors/AppError";
import { bookingServices } from "../booking/booking.service";
import { Booking } from "../booking/booking.model";
import { TBooking } from "../booking/booking.interface";

const getAllFacilityFromDB = async () => {
    const result = await Facility.find();
    return result;
}

const createFacilityIntoDB = async (payload: TFacility) => {
    // const result = await Facility.create(payload);
    // return result;

    const session = await mongoose.startSession();
    try {
        const booking: Partial<TBooking> = {};

        session.startTransaction();
        const newFacility = await Facility.create([payload], { session });

        if (!newFacility.length) {
            throw new AppError(400, 'Failed to create a facility !');
        };

        booking.facility = newFacility[0]._id;
        booking.date = new Date();
        booking.startTime = "10:00";
        booking.endTime = "13:00";
        const start = Number(booking.startTime.split(":")[0]);
        const end = Number(booking.endTime.split(":")[0]);
        booking.payableAmount = (end - start) * payload.pricePerHour;
        booking.isBooked = "unconfirmed";

        const bookingInitialized = await Booking.create([booking], { session });

        if (!bookingInitialized.length) {
            throw new AppError(400, 'Something happened wrong! please try again.');
        }

        await session.commitTransaction();
        await session.endSession();

        return newFacility;

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(400, 'Something happened wrong! please try again.');
    }

};

const updateFacilityIntoDB = async (id: string, payload: Partial<TFacility>) => {
    const result = await Facility.findOneAndUpdate({ _id: id }, payload, { new: true });
    return result;
};

const deleteFacilityFromDB = async (id: string) => {
    const result = await Facility.findByIdAndUpdate(id, {
        isDeleted: true
    },
        { new: true });
    return result;
};


export const facilityServices = {
    getAllFacilityFromDB,
    createFacilityIntoDB,
    updateFacilityIntoDB,
    deleteFacilityFromDB
};