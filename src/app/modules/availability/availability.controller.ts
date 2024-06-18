import catchAsync from "../../utils/catchAsync";
import { availabilityServices } from "./availability.service";

const getCheckedAvailability = catchAsync(
    async (req, res) => {
        const { date } = req.query;

        const autoPick = new Date().toJSON().slice(0, 10);

        const getDate = date ? date : autoPick;

        const result = await availabilityServices.checkedAvailability(getDate as string);

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
                message: 'Availability checked successfully',
                data: result
            });
        }
    }
);


export const availabilityControllers = {
    getCheckedAvailability
};