import express from 'express';
import { userControllers } from './user.controller';

const route = express.Router();

route.post('/auth/signup', userControllers.createAUser);


export const userRoutes = route;