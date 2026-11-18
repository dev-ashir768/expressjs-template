import type { Response } from "express";
import type {
  ErrorResponse,
  SuccessResponse,
  ValidationErrorItem,
} from "../types";
import envConfig from "@/config/env.config";

const successResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T,
) => {
  const response: SuccessResponse<T> = {
    success: true,
    message,
    data,
  };

  return res.status(statusCode).json(response);
};

const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  errors?: ValidationErrorItem[],
  stack?: string,
) => {
  const isDevelopment = envConfig.NODE_ENV !== "production";
  const response: ErrorResponse = {
    success: false,
    message,
    data: null,
  };

  if (errors) response.errors = errors;
  if (stack && isDevelopment) response.stack = stack;

  return res.status(statusCode).json(response);
};

export { successResponse, errorResponse };
