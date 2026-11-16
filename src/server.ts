import app from "@/app";
import { type Server } from "node:http";
import envConfig from "./config/env.config";
import logger from "./shared/utils/logger";

let server: Server;
const { PORT } = envConfig;

process.on("uncaughtException", (err: Error) => {
  logger.error({ err }, "UNCAUGHT EXCEPTION! Shutting down...");
  process.exit(1);
});

const startServer = () => {
  server = app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
  });
};

const gracefulShutdown = (signal: string, exitCode: number = 0) => {
  logger.info(`${signal} signal received: Initiating graceful shutdown...`);

  const forceExitTimer = setTimeout(() => {
    logger.info(
      "Could not close connections in time, forcefully shutting down...",
    );
    process.exit(exitCode);
  }, 10000);

  forceExitTimer.unref();

  if (server) {
    server.close((err) => {
      if (err) {
        logger.error({ err }, "Error while closing HTTP server");
        process.exit(1);
      }
      logger.info("HTTP server closed successfully. Exiting process.");
      process.exit(exitCode);
    });
  } else {
    process.exit(exitCode);
  }
};

process.on("unhandledRejection", (reason: unknown) => {
  logger.error({ err: reason }, "UNHANDLED REJECTION! Shutting down...");
  gracefulShutdown("unhandledRejection", 1);
});

process.on("SIGINT", () => gracefulShutdown("SIGINT", 0));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM", 0));

startServer();
