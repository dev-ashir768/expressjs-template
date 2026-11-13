import app from "@/app";
import envConfig from "./config/env.config";
import logger from "./shared/utils/logger";

const startServer = () => {
  app.listen(envConfig.PORT, () => {
    logger.info(`Server is running on http://localhost:${envConfig.PORT}`);
  });
};

startServer();
