import { Router } from "express";
import userController from "./user.controller";
import validateRequestMiddleware from "@/shared/middlewares/validateRequest.middleware";
import userSchema from "./user.schema";
import { VALIDATION_SOURCE } from "@/shared/enums";

const router = Router();

router.post("/", validateRequestMiddleware(userSchema.createUser, VALIDATION_SOURCE.BODY), userController.createUser);

export default router;