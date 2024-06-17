"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const facility_validation_1 = require("./facility.validation");
const facility_controller_1 = require("./facility.controller");
const route = express_1.default.Router();
route.post('/facility', (0, validateRequest_1.default)(facility_validation_1.facilityValidations.createFacilityValidation), facility_controller_1.facilityControllers.createFacility);
exports.facilityRoutes = route;
