// src/modules/auth/auth.service.ts
import bcrypt from "bcryptjs";
import { prisma } from "../../config/db";
import { LoginInput, RegisterInput } from "./auth.modal";

export const registerUser = async (input: RegisterInput) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email },
  });
  if (existingUser) throw new Error("User already exists"); 
  const hashed = await bcrypt.hash(input.password, 10); 
  const user = await prisma.user.create({
    data: {
      email: input.email,
      password: hashed,
      name: input.name,
      role: "USER",
    },
  });

  return user;
};

export const loginUser = async (input: LoginInput) => {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user) throw new Error("Invalid credentials"); 
  const isValid = await bcrypt.compare(input.password, user.password);
  if (!isValid) throw new Error("Invalid credentials"); 
  return { user };
};

export const deleteUser = async (userId: number) => {
  return await prisma.user.delete({ where: { id: userId } });
};

export const updateUserRole = async (
  userId: number,
  role: "OWNER" | "USER"
) => {
  return await prisma.user.update({ where: { id: userId }, data: { role } });
};