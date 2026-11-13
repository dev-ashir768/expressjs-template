import envConfig from "@/config/env.config";
import type { NextFunction, Response, Request } from "express";
import type { HttpError } from "http-errors";

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

  return res.status(statusCode).json({
    success: false,
    message: errorMessage,
    ...(err.errors && { errors: err.errors }),
    ...(isDevelopment && { stack: err.stack }),
  });
};

export default globalErrorMiddleware;
