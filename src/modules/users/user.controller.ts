import type { Request, Response } from "express";
import type { CreateUserInput } from "./user.schema";
import userService from "./user.service";
import asyncHandler from "express-async-handler";
import type { SuccessResponse } from "@/shared/types";
import type { UserPublic } from "./user.types";
const userController = {
    createUser: asyncHandler(async (req: Request, res: Response) => {
        const user = await userService.createUser(req.body as CreateUserInput);

        const response: SuccessResponse<UserPublic> = {
            success: true,
            message: "User created successfully",
            data: user,
        };

        res.status(201).json(response);

    })
}

export default userController;
