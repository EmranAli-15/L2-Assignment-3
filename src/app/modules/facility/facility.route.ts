import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { facilityValidations } from './facility.validation';
import { facilityControllers } from './facility.controller';
import auth, { userRole } from '../../middlewares/auth';

const route = express.Router();

route.post('/facility', auth(userRole.admin), validateRequest(facilityValidations.createFacilityValidation), facilityControllers.createFacility);

route.put('/facility/:id', auth(userRole.admin), validateRequest(facilityValidations.updateFacilityValidation), facilityControllers.updateFacility);

route.delete('/facility/:id', auth(userRole.admin), facilityControllers.deleteFacility);


export const facilityRoutes = route;