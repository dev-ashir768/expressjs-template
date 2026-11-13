import envConfig from "@/config/env.config";
import { Router } from "express";
import userRouter from "@/modules/users/user.routes";

const router = Router();

router.use(envConfig.API_VERSION + "/users", userRouter);

export default router;
