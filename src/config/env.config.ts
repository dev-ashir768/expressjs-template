import z from "zod";
import "dotenv/config";
import logger from "@/shared/utils/logger";

const envSchema = z.object({
  PORT: z.coerce
    .number({ message: "Port is required" })
    .min(1, { message: "Port must be greater than 0" })
    .int({ message: "Post must be positive integer" }),
  NODE_ENV: z.enum(["development", "production", "test"], {
    message:
      "Node Environment must be one of this 'development', 'production', 'test'",
  }),
  ALLOWED_ORIGINS: z
    .string({ message: "Allowed Origins is required" })
    .min(1, { message: "Allowed Origins is required" })
    .transform((val) => val.split(",").map((origin) => origin.trim())),
  API_PREFIX: z
    .string({ message: "Api Prefix is required" })
    .min(1, { message: "Api Prefix is required" })
    .trim(),
  API_VERSION: z
    .string({ message: "Api Version is required" })
    .min(1, { message: "Api Version is required" })
    .trim(),
  DATABASE_URL: z
    .string({ message: "Database Url is required" })
    .min(1, { message: "Database Url is required" })
    .trim(),
  DATABASE_USER: z
    .string({ message: "Database User is required" })
    .min(1, { message: "Database User is required" })
    .trim(),
  DATABASE_PASSWORD: z
    .string({ message: "Database Password is required" })
    .min(6, { message: "Database Password must be 6 character" })
    .trim(),
  DATABASE_NAME: z
    .string({ message: "Database Name is required" })
    .min(1, { message: "Database Name is required" })
    .trim(),
  DATABASE_HOST: z
    .string({ message: "Database Host is required" })
    .min(1, { message: "Database Host is required" })
    .trim(),
  DATABASE_PORT: z.coerce
    .number({ message: "Database Port is required" })
    .min(1, { message: "Database Port must be greater than 0" })
    .int({ message: "Database Post must be positive integer" }),
  DATABASE_CONNECTION_LIMIT: z.coerce
    .number({ message: "Database Connection Limit is required" })
    .min(1, { message: "Database Connection Limit must be greater than 0" })
    .int({ message: "Database Connection Limit must be positive integer" }),
});

export type EnvSchemaInput = z.infer<typeof envSchema>;

const result = envSchema.safeParse(process.env);

if (!result.success) {
  const errorMessage = result.error.issues
    .map((issue) => issue.path.join(".") + ": " + issue.message)
    .join("\n");
  const errorCount = result.error.issues.length;

  logger.error(`Invalid Environment Variable${errorCount > 1 ? "s" : ""}!`);
  logger.error(errorMessage);
  logger.error("Application startup aborted. Exiting with code 1.");
  process.exit(1);
}

const envConfig: EnvSchemaInput = result.data;
logger.info("Environment Variables Loaded Successfully!");

export default envConfig;
