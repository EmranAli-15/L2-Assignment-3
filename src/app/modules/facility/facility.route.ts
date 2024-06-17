import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { facilityValidations } from './facility.validation';
import { facilityControllers } from './facility.controller';

const route = express.Router();

route.post('/facility', validateRequest(facilityValidations.createFacilityValidation), facilityControllers.createFacility);


export const facilityRoutes = route;