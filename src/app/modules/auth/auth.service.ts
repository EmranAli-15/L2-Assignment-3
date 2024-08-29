import { User } from "../user/user.model";
import { TAuth, TAuthRegister } from "./auth.interface";
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

const registerUser = async (payload: TAuthRegister) => {
    const role = "user";
    const data = { ...payload, role };

    const createUser = await User.create(data);

    const jwtPayload = {
        email: createUser.email,
        role: createUser.role
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
        createUser
    };
};


export const authServices = {
    loginUser,
    registerUser
};