"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    facility: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true
});
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);
