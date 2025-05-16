"use client";

import signUp from "@/app/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useActionState } from "react";
import { z } from "zod";

const formSchema = z
  .object({
    email: z.string().email({ message: "이메일 형식이 올바르지 않습니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." }),
    confirmPassword: z.string().min(8, {
      message: "비밀번호 확인은 8자 이상이어야 합니다.",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
  });

export default function SignUp() {
  const handleSignup = async (_: any, formData: FormData) => {
    const parsedFormData = formSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    if (!parsedFormData.success) {
      return { error: parsedFormData.error.flatten().fieldErrors };
    }

    const { email, password } = parsedFormData.data;

    const result = await signUp({
      email,
      password,
    });

    if (result?.success) {
      redirect("/signin");
    } else {
      alert(result?.message);
    }
  };

  const [state, formAction, isPending] = useActionState(handleSignup, null);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <Card className="">
        <CardHeader>
          <CardTitle className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">회원가입</h1>
            <p className="text-gray-500">
              인프런에서 다양한 학습의 기회를 얻고 성장하세요.
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={formAction}
            className="flex flex-col gap-6 min-w-[350px]"
          >
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">이메일</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="이메일"
              />
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
            <div className="flex flex-col gap-1">
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="비밀번호 확인"
              />
              {state?.error?.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {state.error.confirmPassword}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Button
                disabled={isPending}
                type="submit"
                className="cursor-pointer"
              >
                {isPending ? "회원가입 중..." : "회원가입"}
              </Button>
              <Link href="/signin" className="text-center">
                <Button variant="link" className="cursor-pointer">
                  로그인
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
