import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/generated/prisma/client";
import envConfig from "./env.config";

const adapter = new PrismaMariaDb({
  host: envConfig.DATABASE_HOST,
  user: envConfig.DATABASE_USER,
  password: envConfig.DATABASE_PASSWORD,
  database: envConfig.DATABASE_NAME,
  connectionLimit: envConfig.DATABASE_CONNECTION_LIMIT,
});
const prisma = new PrismaClient({ adapter });

export default prisma;
