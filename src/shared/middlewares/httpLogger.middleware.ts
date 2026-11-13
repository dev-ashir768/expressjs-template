import PinoHttp, { type Options } from "pino-http";
import logger from "@/shared/utils/logger";

const options: Options = {
  logger,
  serializers: {
    req: (req) => ({ id: req.id, method: req.method, url: req.url }),
    res: (res) => ({ statusCode: res.statusCode }),
  },
  customLogLevel: (_req, res, err) => {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return "warn";
    } else if (res.statusCode >= 500 || err) {
      return "error";
    } else if (res.statusCode >= 200 && res.statusCode < 400) {
      return "info";
    }
    return "info";
  },
  customSuccessMessage: (req, res, responseTime) => {
    return `${req.method} ${req.url} completed with status ${res.statusCode} in ${responseTime}ms`;
  },
  customErrorMessage: (req, res, err) => {
    return `${req.method} ${req.url} failed with status ${res.statusCode} with error ${err.message ?? "Unknown Error"}`;
  },
};

const httpLoggerMiddleware = () => {
  return PinoHttp(options);
};

export default httpLoggerMiddleware;
