import { TBooking } from "./booking.interface";

const bookingInitialization = async (payload: Partial<TBooking>) => {
    console.log(payload, 'JJJ');
}


export const bookingServices = {
    bookingInitialization
};