import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.service";

const loginUser = catchAsync(
    async (req, res) => {
        const result = await authServices.loginUser(req.body);

        res.status(200).json({
            success: true,
            message: 'User logged successfully',
            token: result.accessToken,
            data: result.isUserExist
        });
    }
);


export const authControllers = {
    loginUser
};