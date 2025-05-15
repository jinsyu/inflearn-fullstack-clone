"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useActionState } from "react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "이메일 형식이 올바르지 않습니다." }),
  password: z.string().min(8, { message: "비밀번호는 8자 이상이어야 합니다." }),
});

export default function SignIn() {
  const handleSignin = async (_: any, formData: FormData) => {
    const parsedFormData = formSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!parsedFormData.success) {
      return { error: parsedFormData.error.flatten().fieldErrors };
    }

    const { email, password } = parsedFormData.data;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return {
        signInError: "이메일과 비밀번호를 확인해주세요.",
      };
    }

    redirect("/");
  };

  const [state, formAction, isPending] = useActionState(handleSignin, null);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-3xl font-bold">로그인</h1>
      <p className="text-gray-700">인프런 계정으로 로그인 할 수 있어요.</p>
      <form action={formAction} className="flex flex-col gap-6 min-w-[300px]">
        <div className="flex flex-col gap-1">
          <Label htmlFor="email">이메일</Label>
          <Input type="email" name="email" id="email" placeholder="이메일" />
          {state?.error?.email && (
            <p className="text-red-500 text-sm">{state.error.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="비밀번호"
          />
          {state?.error?.password && (
            <p className="text-red-500 text-sm">{state.error.password}</p>
          )}
        </div>
        {state?.signInError && (
          <p className="text-red-500 text-sm">{state.signInError}</p>
        )}
        <div className="flex flex-col gap-1">
          <Button type="submit" disabled={isPending}>
            {isPending ? "로그인 중..." : "로그인"}
          </Button>
          <Link href="/signup" className="text-center">
            <Button variant="link" className="cursor-pointer">
              회원가입
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
