import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
    date: {
        type: Date,
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
        type: Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    facility: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Facility'
    },
    payableAmount: {
        type: Number,
        required: true
    },
    isBooked: {
        type: String,
        enum: ["confirmed", "unconfirmed", "canceled"],
        required: false,
        default: "unconfirmed"
    }
});


export const Booking = model<TBooking>('Booking', bookingSchema);