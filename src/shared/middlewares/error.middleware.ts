import envConfig from "@/config/env.config";
import type { NextFunction, Response, Request } from "express";
import type { HttpError } from "http-errors";
import { errorResponse } from "../utils/response";

const errorMiddleware = (
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const isDevelopment = envConfig.NODE_ENV !== "production";
  const statusCode =
    err.status || err.statusCode || (err.name === "ZodError" ? 400 : 500);
  const errorMessage =
    !isDevelopment && statusCode >= 500
      ? "Internal Server Error"
      : err.message || "Something went wrong";

  return errorResponse(res, statusCode, errorMessage, err.errors, err.stack);
};

export default errorMiddleware;
