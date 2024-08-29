import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
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
    },
    user: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    facility: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Facility'
    },
    payableAmount: {
        type: Number,
        required: false
    },
    isBooked: {
        type: String,
        enum: ["confirmed", "unconfirmed", "canceled"],
        required: false,
        default: "confirmed"
    }
},
{
    timestamps: true
});


export const Booking = model<TBooking>('Booking', bookingSchema);