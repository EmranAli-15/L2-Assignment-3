"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const facility_validation_1 = require("./facility.validation");
const facility_controller_1 = require("./facility.controller");
const auth_1 = __importStar(require("../../middlewares/auth"));
const route = express_1.default.Router();
route.get('/facility', facility_controller_1.facilityControllers.getAllFacility);
route.get('/popularFacility', facility_controller_1.facilityControllers.getPopularFacility);
route.get('/facility/:id', facility_controller_1.facilityControllers.getAFacility);
route.post('/facility', (0, auth_1.default)(auth_1.userRole.admin), (0, validateRequest_1.default)(facility_validation_1.facilityValidations.createFacilityValidation), facility_controller_1.facilityControllers.createFacility);
route.put('/facility/:id', (0, auth_1.default)(auth_1.userRole.admin), (0, validateRequest_1.default)(facility_validation_1.facilityValidations.updateFacilityValidation), facility_controller_1.facilityControllers.updateFacility);
route.delete('/facility/:id', (0, auth_1.default)(auth_1.userRole.admin), facility_controller_1.facilityControllers.deleteFacility);
exports.facilityRoutes = route;
