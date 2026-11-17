import { hashPassword } from "@/shared/utils/password";
import type { CreateUserInput } from "./user.schema";
import userRepository from "./user.repository";
import createHttpError from "http-errors";

const userService = {
    createUser: async (input: CreateUserInput) => {
        const existingUser = await userRepository.findUserByEmail({ email: input.email });
        if (existingUser) throw createHttpError(409, "User already exists");

        const hashedPassword = await hashPassword(input.password);
        return userRepository.createUser({
            name: input.name,
            email: input.email,
            hashedPassword,
        });
    },
};

export default userService;
