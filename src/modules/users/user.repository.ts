import prisma from "@/config/db.config";
import type { Prisma } from "@prisma/client";
import type { CreateUserData } from "@/modules/users/user.types";

export const userPublicSelect = {
  id: true,
  name: true,
  email: true,
  isActive: true,
  isDeleted: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
} satisfies Prisma.UserSelect;

const userRepository = {
  createUser: async (data: CreateUserData) => {
    return prisma.user.create({
      data,
      select: userPublicSelect,
    });
  },
  findUserByEmail: (data: { email: string }) => {
    return prisma.user.findUnique({
      where: { email: data.email },
      select: userPublicSelect,
    });
  },
  findUserById: (data: { id: number }) => {
    return prisma.user.findFirst({
      where: { id: data.id, isDeleted: false },
      select: userPublicSelect,
    });
  },
};

export default userRepository;
