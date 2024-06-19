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
exports.facilityControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const facility_service_1 = require("./facility.service");
const getAllFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_service_1.facilityServices.getAllFacilityFromDB();
    if (result.length === 0) {
        res.status(200).json({
            success: true,
            "statusCode": 404,
            message: 'No data found',
            data: result
        });
    }
    else {
        res.status(200).json({
            success: true,
            "statusCode": 200,
            message: 'Facilities retrieved successfully',
            data: result
        });
    }
}));
const createFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_service_1.facilityServices.createFacilityIntoDB(req.body);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Facility added successfully",
        data: result
    });
}));
const updateFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield facility_service_1.facilityServices.updateFacilityIntoDB(id, req.body);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Facility updated successfully",
        data: result
    });
}));
const deleteFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield facility_service_1.facilityServices.deleteFacilityFromDB(id);
    res.status(200).json({
        success: true,
        message: 'Facility deleted successfully',
        data: result
    });
}));
exports.facilityControllers = {
    getAllFacility,
    createFacility,
    updateFacility,
    deleteFacility
};
