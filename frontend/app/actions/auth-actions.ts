"use server";

import { saltAndHashPassword } from "@/lib/password-utils";
import { signIn } from "next-auth/react";
import { prisma } from "@/prisma";

export async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return { success: false, message: "이미 존재하는 이메일입니다." };
    }

    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword: saltAndHashPassword(password),
      },
    });

    if (user) {
      return { success: true, message: "회원가입이 완료되었습니다." };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "회원가입에 실패했습니다." };
  }
}
