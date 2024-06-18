import { TBooking } from "./booking.interface";

const bookingInitialization = async (payload: Partial<TBooking>) => {
    console.log(payload, 'JJJ');

    // booking.facility = newFacility[0]._id;

    // const start = Number(booking.startTime.split(":")[0]);
    // const end = Number(booking.endTime.split(":")[0]);
    // booking.payableAmount = (end - start) * payload.pricePerHour;
    // booking.isBooked = "unconfirmed";

    // const bookingInitialized = await Booking.create([booking], { session });

    // if (!bookingInitialized.length) {
    //     throw new AppError(400, 'Something happened wrong! please try again.');
    // }

}


export const bookingServices = {
    bookingInitialization
};