import catchAsync from "../../utils/catchAsync";
import { bookingServices } from "./booking.service";

const createBooking = catchAsync(
    async(req, res) => {
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
    async(req, res) => {
        const result = await bookingServices.getAllBookingForAdminFromDB();

        res.status(200).json({
            success: true,
            message: 'Bookings retrieved successfully',
            data: result
        });
    }
);


export const bookingControllers = {
    createBooking,
    getAllBookingForAdminFromDB
};