import type { ZodType } from "zod";
import type { Request, Response, NextFunction } from "express";
import { VALIDATION_SOURCE } from "@/shared/enums";
import createHttpError from "http-errors";

const validateRequestMiddleware = (schema: ZodType, source: VALIDATION_SOURCE) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const result = schema.safeParse(req[source]);

        if (!result.success) {
            return next(createHttpError(400, "Validation Error", {
                errors: result.error.issues.map((issue) => ({
                    path: issue.path.join("."),
                    message: issue.message
                }))
            }))
        }

        if (source === VALIDATION_SOURCE.BODY) {
            req.body = result.data;
        } else {
            Object.assign(req[source], result.data)
        }

        next();
    }
}

export default validateRequestMiddleware;