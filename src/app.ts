import express, { type Application } from "express";
import corsMiddleware from "@/shared/middlewares/cors.middleware";
import helmet from "helmet";
import httpLoggerMiddleware from "@/shared/middlewares/httpLogger.middleware";
import notFound from "@/shared/utils/notfound";
import apiRoutes from "@/router/index";
import envConfig from "@/config/env.config";
import errorMiddleware from "./shared/middlewares/error.middleware";
import healthCheck from "@/shared/utils/healthcheck";
import { isDevelopment } from "./shared/constants";

const app: Application = express();

if (!isDevelopment) {
  app.set("trust proxy", 1);
}

app.use(httpLoggerMiddleware());
app.use(helmet());
app.use(corsMiddleware());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

app.use(envConfig.API_PREFIX, apiRoutes);

app.use("/health", healthCheck);
app.use(notFound);
app.use(errorMiddleware);
export default app;
