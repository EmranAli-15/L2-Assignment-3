import mongoose from "mongoose";
import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";
import AppError from "../../errors/AppError";
import { TAvailability } from "../availability/availability.interface";
import { Availability } from "../availability/availability.model";

const getAllFacilityFromDB = async () => {
    const result = await Facility.find();
    return result;
}

const createFacilityIntoDB = async (payload: TFacility) => {

    const session = await mongoose.startSession();
    try {
        const availability: Partial<TAvailability> = {};

        session.startTransaction();
        const facility = await Facility.create([payload], { session });

        if (!facility.length) {
            throw new AppError(400, 'Failed to create a facility !');
        };

        availability.date = new Date().toJSON().slice(0, 10);
        availability.startTime = "10:00";
        availability.endTime = "13:00";

        const availabilityInitialized = await Availability.create([availability], { session });

        if (!availabilityInitialized.length) {
            throw new AppError(400, 'Something happened wrong!');
        }

        await session.commitTransaction();
        await session.endSession();

        return facility;

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(400, 'Something happened wrong! please try again.');
    }

};

const updateFacilityIntoDB = async (id: string, payload: Partial<TFacility>) => {
    const result = await Facility.findOneAndUpdate({ _id: id }, payload, { new: true });

    if (!result) {
        throw new AppError(400, 'Facility not found');
    }

    return result;
};

const deleteFacilityFromDB = async (id: string) => {
    const result = await Facility.findByIdAndUpdate(id, {
        isDeleted: true
    },
        { new: true });

    if (!result) {
        throw new AppError(400, 'Facility not found');
    }

    return result;
};


export const facilityServices = {
    getAllFacilityFromDB,
    createFacilityIntoDB,
    updateFacilityIntoDB,
    deleteFacilityFromDB
};