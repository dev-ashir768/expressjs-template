import { hashPassword } from "@/shared/utils/password";
import type { CreateUserInput } from "./user.schema";
import userRepository from "./user.repository";
import createHttpError from "http-errors";

const userService = {
    createUser: async (input: CreateUserInput) => {
        const hashedPassword = await hashPassword(input.password);

        const existingUser = await userRepository.findUserByEmail({ email: input.email });

        if (existingUser) {
            createHttpError(404, "User already exists");
        }

        return userRepository.createUser({
            name: input.name,
            email: input.email,
            hashedPassword,
        });
    },
};

export default userService;
