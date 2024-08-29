import express from 'express';
import { authControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { authValidations } from './auth.validation';

const route = express.Router();

route.post('/auth/login', validateRequest(authValidations.loginValidation), authControllers.loginUser);
route.post('/auth/register', validateRequest(authValidations.registerValidation), authControllers.registerUser);


export const authRoutes = route;