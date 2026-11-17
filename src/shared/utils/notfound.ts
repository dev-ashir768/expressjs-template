import type { Request, Response } from "express";
import type { ErrorResponse } from "../types";

const notFound = (req: Request, res: Response) => {
  const response: ErrorResponse = {
    success: false,
    message: `${req.method} ${req.originalUrl} not found`,
    data: null,
  }

  return res.status(404).json(response);
};

export default notFound;