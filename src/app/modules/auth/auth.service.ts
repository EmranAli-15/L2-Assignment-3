import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TAuth } from "./auth.interface";

const loginUser = async (payload: TAuth) => {
    const isUserExist = User.findOne({
        id: payload?.id
    });

    if(!isUserExist){
        throw new AppError(400, 'Could not find any user!');
    };


};


export const authServices = {
    loginUser
};