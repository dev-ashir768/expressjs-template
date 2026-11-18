import type { Request, Response } from "express";
import { successResponse } from "./response";

const healthCheck = async (_req: Request, res: Response) => {
  return successResponse(res, 200, "Server is healthy and running", {
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
  });
};

export default healthCheck;
