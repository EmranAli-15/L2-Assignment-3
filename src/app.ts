import express from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.route';
const app = express();

app.use(express.json());
app.use(cors());



// -----ROUTES START----- //

app.use('/api', userRoutes);

// -----ROUTES END----- //



app.get('/', (req, res) => {
    res.send('WELCOME TO ASSIGNMENT --3--');
});

export default app;