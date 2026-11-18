import type { Request, Response } from "express";
import type { CreateUserInput } from "@/modules/users/user.schema";
import userService from "@/modules/users/user.service";
import { successResponse } from "@/shared/utils/response";
import type { UserPublic } from "./user.types";

const userController = {
  createUser: async (req: Request, res: Response) => {
    const user = await userService.createUser(req.body as CreateUserInput);

    return successResponse<UserPublic>(
      res,
      201,
      "User created successfully",
      user,
    );
  },
};

export default userController;
