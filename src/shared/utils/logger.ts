import "dotenv/config";
import pino, { stdTimeFunctions, type LoggerOptions } from "pino";

const isDevelopment = process.env.NODE_ENV !== "production";

const options: LoggerOptions = {
  level: isDevelopment ? "debug" : "info",
  timestamp: stdTimeFunctions.isoTime,
  redact: ["req.headers.authorization", "req.headers.cookie", 'res.headers["set-cookie"]'],
  transport: {
    targets: [
      {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:yyyy-mm-dd hh-MM:ss tt",
          ignore: "pid,hostname",
        },
      },
      {
        target: "pino/file",
        options: {
          destination: "logs/app.log",
          mkdir: true,
        },
      },
    ],
  },
};

const logger = pino(options);

export default logger;
