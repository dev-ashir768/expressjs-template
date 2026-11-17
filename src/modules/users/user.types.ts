import type { Prisma } from "@/generated/prisma/client";

type CreateUserData = Pick<Prisma.UserCreateInput, "name" | "email" | "hashedPassword">;

export type { CreateUserData };