import type { Request, Response } from "express";
import { errorResponse } from "./response";

const notFound = (req: Request, res: Response) => {
  return errorResponse(res, 404, `${req.method} ${req.originalUrl} not found`);
};

export default notFound;
