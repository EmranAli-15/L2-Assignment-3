import catchAsync from "../../utils/catchAsync";
import { bookingServices } from "./booking.service";

const createBooking = catchAsync(
    async (req, res) => {
        const user = req.user;
        const result = await bookingServices.createBookingIntoDB(user, req.body);

        res.status(200).json({
            success: true,
            message: 'Booking created successfully',
            data: result
        });
    }
);

const getAllBookingForAdminFromDB = catchAsync(
    async (req, res) => {
        const result = await bookingServices.getAllBookingForAdminFromDB();

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
                message: 'Bookings retrieved successfully',
                data: result
            });
        }
    }
);


export const bookingControllers = {
    createBooking,
    getAllBookingForAdminFromDB
};