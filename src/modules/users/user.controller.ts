import type { Request, Response } from "express";
import type { CreateUserInput } from "@/modules/users/user.schema";
import userService from "@/modules/users/user.service";
import type { SuccessResponse } from "@/shared/types";
import type { UserPublic } from "@/modules/users/user.types";

const userController = {
  createUser: async (req: Request, res: Response) => {
    const user = await userService.createUser(req.body as CreateUserInput);

    const response: SuccessResponse<UserPublic> = {
      success: true,
      message: "User created successfully",
      data: user,
    };

    res.status(201).json(response);
  },
};

export default userController;
