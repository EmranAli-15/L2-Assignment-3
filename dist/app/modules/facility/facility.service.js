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
exports.facilityServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const facility_model_1 = require("./facility.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const availability_model_1 = require("../availability/availability.model");
const getAllFacilityFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.find();
    return result;
});
const createFacilityIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        const availability = {};
        session.startTransaction();
        const facility = yield facility_model_1.Facility.create([payload], { session });
        if (!facility.length) {
            throw new AppError_1.default(400, 'Failed to create a facility !');
        }
        ;
        availability.date = new Date().toJSON().slice(0, 10);
        availability.startTime = "10:00";
        availability.endTime = "13:00";
        const availabilityInitialized = yield availability_model_1.Availability.create([availability], { session });
        if (!availabilityInitialized.length) {
            throw new AppError_1.default(400, 'Something happened wrong!');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return facility;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(400, 'Something happened wrong! please try again.');
    }
});
const updateFacilityIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.findOneAndUpdate({ _id: id }, payload, { new: true });
    if (!result) {
        throw new AppError_1.default(400, 'Facility not found');
    }
    return result;
});
const deleteFacilityFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.findByIdAndUpdate(id, {
        isDeleted: true
    }, { new: true });
    if (!result) {
        throw new AppError_1.default(400, 'Facility not found');
    }
    return result;
});
exports.facilityServices = {
    getAllFacilityFromDB,
    createFacilityIntoDB,
    updateFacilityIntoDB,
    deleteFacilityFromDB
};
