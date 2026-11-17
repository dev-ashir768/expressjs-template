import type { Prisma } from "@/generated/prisma/client";

type CreateUserData = Pick<Prisma.UserCreateInput, "name" | "email" | "hashedPassword">;
type UserPublic = {
    id: number,
    name: string,
    email: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
}

export type { CreateUserData, UserPublic };