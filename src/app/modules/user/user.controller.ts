import catchAsync from "../../utils/catchAsync";
import { userServices } from "./uesr.service";

const createAUser = catchAsync(
    async (req, res) => {
        const body = req.body;
        const result = await userServices.createUserIntoDB(body);

        res.status(200).json({
            success: true,
            message: 'User created successfully !',
            data: result
        });
    }
);

export const userControllers = {
    createAUser,
};