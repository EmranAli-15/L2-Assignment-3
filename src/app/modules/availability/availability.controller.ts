import catchAsync from "../../utils/catchAsync";
import { availabilityServices } from "./availability.service";

const getCheckedAvailability = catchAsync(
    async(req, res) => {
        const {date} = req.query;
        const result = await availabilityServices.checkedAvailability(date as string);

        res.status(200).json({
            success: true,
            message: 'Availability checked successfully',
            data: result
        });
    }
);


export const availabilityControllers = {
    getCheckedAvailability
};