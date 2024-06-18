import express from 'express';
import auth, { userRole } from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { bookingValidations } from './booking.validation';
import { bookingControllers } from './booking.controller';
const route = express.Router();

route.post('/bookings', auth(userRole.user), validateRequest(bookingValidations.createBookingValidation), bookingControllers.createBooking);


export const bookingRoutes = route;