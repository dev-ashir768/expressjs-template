import app from "@/app";
import envConfig from "./config/env.config";
import logger from "./shared/utils/logger";

const startServer = () => {
  const server = app.listen(envConfig.PORT, () => {
    logger.info(`Server is running on http://localhost:${envConfig.PORT}`);
  });
  process.on("SIGTERM", () => {
    logger.debug("SIGTERM signal received: closing HTTP server");
    server.close(() => {
      logger.info("HTTP server closed");
    });
  });
};

startServer();
