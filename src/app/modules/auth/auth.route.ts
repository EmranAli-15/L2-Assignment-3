import express from 'express';
import { authControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { authValidations } from './auth.validation';

const route = express.Router();

route.post('/auth/login', validateRequest(authValidations.loginValidation), authControllers.loginUser);


export const authRoutes = route;