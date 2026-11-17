import type { Prisma } from "@/generated/prisma/client";
import type { userPublicSelect } from "./user.repository";

type CreateUserData = Pick<Prisma.UserCreateInput, "name" | "email" | "hashedPassword">;
type UserPublic = Prisma.UserGetPayload<{select: typeof userPublicSelect}>;

export type { CreateUserData, UserPublic };