import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.service";

const loginUser = catchAsync(
    async (req, res) => {
        const result = authServices.loginUser(req.body);

        res.status(200).json({
            success: true,
            message: 'User logged successfully',
            data: result
        });
    }
);


export const authControllers = {
    loginUser
};