import envConfig from "@/config/env.config";
import cors, { type CorsOptions } from "cors";

const options: CorsOptions = {
  origin: envConfig.ALLOWED_ORIGINS,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

const corsMiddleware = () => {
  return cors(options);
};

export default corsMiddleware;
