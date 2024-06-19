"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.availabilityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const availability_controller_1 = require("./availability.controller");
const route = express_1.default.Router();
route.get('/check-availability', availability_controller_1.availabilityControllers.getCheckedAvailability);
exports.availabilityRoutes = route;
