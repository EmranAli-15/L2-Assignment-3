"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilityValidations = void 0;
const zod_1 = require("zod");
const createFacilityValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        description: zod_1.z.string(),
        pricePerHour: zod_1.z.number(),
        location: zod_1.z.string(),
        image: zod_1.z.string(),
        isDeleted: zod_1.z.boolean().optional()
    })
});
const updateFacilityValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        pricePerHour: zod_1.z.number().optional(),
        location: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        isDeleted: zod_1.z.boolean().optional()
    })
});
exports.facilityValidations = {
    createFacilityValidation,
    updateFacilityValidation
};
