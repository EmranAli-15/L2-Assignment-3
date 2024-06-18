import catchAsync from "../../utils/catchAsync";
import { facilityServices } from "./facility.service";

const getAllFacility = catchAsync(
    async (req, res) => {
        const result = await facilityServices.getAllFacilityFromDB();

        if (result.length === 0) {
            res.status(200).json({
                success: true,
                "statusCode": 404,
                message: 'No data found',
                data: result
            });
        } else {
            res.status(200).json({
                success: true,
                "statusCode": 200,
                message: 'Facilities retrieved successfully',
                data: result
            });
        }
    }
);

const createFacility = catchAsync(
    async (req, res) => {
        const result = await facilityServices.createFacilityIntoDB(req.body);

        res.status(200).json({
            success: true,
            message: 'Facility added successfully',
            data: result
        });
    }
);

const updateFacility = catchAsync(
    async (req, res) => {
        const { id } = req.params;
        const result = await facilityServices.updateFacilityIntoDB(id, req.body);

        res.status(200).json({
            success: true,
            message: 'Facility updated successfully',
            data: result
        });
    }
);

const deleteFacility = catchAsync(
    async (req, res) => {
        const { id } = req.params;
        const result = await facilityServices.deleteFacilityFromDB(id);

        res.status(200).json({
            success: true,
            message: 'Facility deleted successfully',
            data: result
        });
    }
);


export const facilityControllers = {
    getAllFacility,
    createFacility,
    updateFacility,
    deleteFacility
};