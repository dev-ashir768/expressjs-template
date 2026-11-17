import envConfig from "@/config/env.config";
import type { NextFunction, Response, Request } from "express";
import type { HttpError } from "http-errors";
import type { ErrorResponse } from "../types";

const globalErrorMiddleware = (
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

  const response: ErrorResponse = {
    success: false,
    message: errorMessage,
    data: null,
  }

  if (err) response.errors = err.errors;
  if (isDevelopment && err.stack) response.stack = err.stack;

  return res.status(statusCode).json(response);
};

export default globalErrorMiddleware;