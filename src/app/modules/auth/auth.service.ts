import { User } from "../user/user.model";
import { TAuth } from "./auth.interface";
import AppError from "../../errors/AppError";
import bcrypt from 'bcrypt';

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
    }

    return isUserExist;
};


export const authServices = {
    loginUser
};