import express, { type Application } from "express";
import corsMiddleware from "./shared/middlewares/cors.middleware";
import helmet from "helmet";
import httpLoggerMiddleware from "./shared/middlewares/httpLogger.middleware";
import notFound from "./shared/utils/notfound";
import apiRoutes from "@/router/index";
import envConfig from "./config/env.config";
import globalErrorMiddleware from "./shared/middlewares/globalError.middleware";

const app: Application = express();

app.use(httpLoggerMiddleware());
app.use(helmet());
app.use(corsMiddleware());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

app.use(envConfig.API_PREFIX, apiRoutes);

app.use(notFound);
app.use(globalErrorMiddleware);
export default app;
