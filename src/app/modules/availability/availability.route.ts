import express from 'express';
import { availabilityControllers } from './availability.controller';
const route = express.Router();

route.get('/check-availability', availabilityControllers.getCheckedAvailability);


export const availabilityRoutes = route;