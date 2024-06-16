import mongoose from "mongoose";
import { errorsType } from "../interface/error.interface";

const validatorError = (error: mongoose.Error.ValidationError) => {

    const keys = Object.keys(error.errors);
    type errArr = string[]

    const errArr = keys.map((key) => {
        return error.errors[key];
    }).map((data) => {
        return {
            path: data.path,
            message: data.message
        }
    });

    const handledErrors: errorsType = {
        success: false,
        message: error.message,
        errorMessages: errArr,
        stack: error?.stack ? error.stack : ''
    };

    const responseError = {
        handledErrors,
        status: 400
    }
    return responseError;
};

export default validatorError;