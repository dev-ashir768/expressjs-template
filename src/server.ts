import app from "@/app";
import envConfig from "./config/env.config";
import logger from "./shared/utils/logger";
import { type Server } from "node:http";

const { PORT } = envConfig;
let server: Server;

process.on("uncaughtException", (err: Error) => {
  logger.error({ err }, "UNCAUGHT EXCEPTION! Closing HTTP server...");
  process.exit(1);
});

const startServer = () => {
  server = app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${envConfig.PORT}`);
  });
};

const graefulShutdown = (signal: string, exitCode = 0) => {
  logger.info(`${signal} signal received: Closing HTTP server...`);

  const forceExitTimer = setTimeout(() => {
    logger.error(
      "Could not close connections in time, forcefully shutting down",
    );
    process.exit(exitCode);
  }, 10000);

  forceExitTimer.unref();

  if (server) {
    server.close((err) => {
      if (err) {
        logger.error({ err }, "Error occurred while closing HTTP server");
        process.exit(exitCode);
      }

      logger.info("HTTP server closed successfully. Process terminating...");
      process.exit(exitCode);
    });
  } else {
    process.exit(exitCode);
  }
};

process.on("unhandledRejection", (reason: unknown) => {
  logger.error({ err: reason }, "UNHANDLED REJECTION! Closing HTTP server...");
  graefulShutdown("unhandledRejection", 1);
});

process.on("SIGINT", () => graefulShutdown("SIGINT", 0));
process.on("SIGTERM", () => graefulShutdown("SIGTERM", 0));

startServer();
