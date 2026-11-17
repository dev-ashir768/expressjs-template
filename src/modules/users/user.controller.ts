import type { Request, Response } from "express";
import type { CreateUserInput } from "./user.schema";
import userService from "./user.service";
import asyncHandler from "express-async-handler";
const userController = {
    createUser: asyncHandler(async (req: Request, res: Response) => {
        const user = await userService.createUser(req.body as CreateUserInput);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
        })

    })
}

export default userController;
