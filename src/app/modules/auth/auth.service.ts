import { User } from "../user/user.model";
import { TAuth } from "./auth.interface";
import AppError from "../../errors/AppError";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from "../../config";


const loginUser = async (payload: TAuth) => {
    const isUserExist = await User.findOne({
        email: payload?.email
    });

    if (!isUserExist) {
        throw new AppError(400, 'Could not find any user!');
    };

    // make the password in plaintext and check the password is matched or not
    const isPasswordMatched = await bcrypt.compare(payload.password, isUserExist.password);
    if (!isPasswordMatched) {
        throw new AppError(403, 'Email or password not matched!');
    };


    const jwtPayload = {
        email: isUserExist.email,
        role: isUserExist.role
    };

    const accessToken = jwt.sign(
        jwtPayload,
        config.accessToken as string,
        {
            expiresIn: "10d"
        }
    );

    return {
        accessToken,
        isUserExist
    };
};


export const authServices = {
    loginUser
};