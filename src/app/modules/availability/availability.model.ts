import { Schema, model } from "mongoose";
import { TAvailability } from "./availability.interface";

const availabilitySchema = new Schema<TAvailability>({
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
});

availabilitySchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.date;
    delete user._id;
    delete user.__v;
    return user;
};

export const Availability = model<TAvailability>('Availability', availabilitySchema);