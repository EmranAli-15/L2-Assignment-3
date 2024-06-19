"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Availability = void 0;
const mongoose_1 = require("mongoose");
const availabilitySchema = new mongoose_1.Schema({
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
exports.Availability = (0, mongoose_1.model)('Availability', availabilitySchema);
