/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";

export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(500).json({
        success: false,
        message: `Something went wrong.${err.message} from Global error Handler`,
        err,
        stack: envVars.NODE_ENV === "development" ? err.stack : null,
    });
};
