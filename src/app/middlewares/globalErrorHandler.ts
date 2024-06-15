import { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {


    console.log(error.message)


    return res.status(400).json({
        success: false
    })
};

export default globalErrorHandler;