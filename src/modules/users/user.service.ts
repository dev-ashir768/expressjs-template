import { hashPassword } from "@/shared/utils/password";
import type { CreateUserInput } from "./user.schema";
import userRepository from "./user.repository";
import createHttpError from "http-errors";
import { Prisma } from "@/generated/prisma/client";
import type { UserPublic } from "./user.types";

const userService = {
    createUser: async (input: CreateUserInput): Promise<UserPublic> => {
        const existingUser = await userRepository.findUserByEmail({ email: input.email });
        if (existingUser) throw createHttpError(409, "User already exists");

        const hashedPassword = await hashPassword(input.password);

        try {
            return await userRepository.createUser({
                name: input.name,
                email: input.email,
                hashedPassword,
            });
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
                throw createHttpError(409, "User already exists");
            }
            throw err;
        }
    },
};

export default userService;
