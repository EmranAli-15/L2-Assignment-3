import { errorsType } from "../interface/error.interface";

const mongoServerError = (error: any) => {
    const errObg = {
        path: "",
        message: error.message
    }

    const handledErrors: errorsType = {
        success: false,
        message: 'Duplicate Data',
        errorMessages: [errObg],
        stack: error?.stack ? error.stack : ''
    };

    const responseError = {
        handledErrors,
        status: 400
    }
    return responseError;

};

export default mongoServerError;