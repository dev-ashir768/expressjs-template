import type { Request, Response } from "express";

const healthCheck = async (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "Server is healthy and running",
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
  });
};

export default healthCheck;