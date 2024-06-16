import { ErrorRequestHandler } from "express";
import validatorError from "../errors/validatorError";
import mongoServerError from "../errors/mongoServerError";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    let handledErrors;
    let status = 400;

    if (error.name === 'ValidationError') {
        const simplifiedErrors = validatorError(error);
        handledErrors = simplifiedErrors.handledErrors;
        status = simplifiedErrors.status;
    }
    else if (error.name === 'MongoServerError') {
        const simplifiedErrors = mongoServerError(error);
        handledErrors = simplifiedErrors.handledErrors;
        status = simplifiedErrors.status;
    }


    res.status(status).json({
        success: handledErrors?.success,
        message: handledErrors?.message,
        errorSources: handledErrors?.errorMessages,
        stack: handledErrors?.stack
    });
};

export default globalErrorHandler;