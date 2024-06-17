import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { facilityValidations } from './facility.validation';
import { facilityControllers } from './facility.controller';
import auth, { userRole } from '../../middlewares/auth';

const route = express.Router();

route.post('/facility', auth(userRole.admin), validateRequest(facilityValidations.createFacilityValidation), facilityControllers.createFacility);


export const facilityRoutes = route;