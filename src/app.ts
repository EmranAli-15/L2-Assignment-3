import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { authRoutes } from './app/modules/auth/auth.route';
const app = express();

app.use(express.json());
app.use(cors());



// -----ROUTES START----- //

app.use('/api', userRoutes);
app.use('/api', authRoutes);

// -----ROUTES END----- //



app.get('/', (req, res) => {
    res.send('WELCOME TO ASSIGNMENT --3--');
});

app.use(globalErrorHandler);

export default app;