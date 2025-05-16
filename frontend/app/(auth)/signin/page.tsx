"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useActionState } from "react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="">
        <CardHeader>
          <CardTitle className="flex flex-col gap-2 items-center">
            <h1 className="text-3xl font-bold">로그인</h1>
            <p className="text-gray-700">인프런 계정으로 로그인해보세요</p>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form
            action={formAction}
            className="flex flex-col gap-4 min-w-[350px]"
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
            {state?.signInError && (
              <p className="text-red-500 text-sm">{state.signInError}</p>
            )}
            {/* <div className="text-center text-gray-700 text-sm">또는</div> */}

            <div className="flex flex-col gap-1">
              <Button
                type="submit"
                disabled={isPending}
                className="cursor-pointer"
              >
                {isPending ? "로그인 중..." : "로그인"}
              </Button>
              <div className="flex items-center justify-center gap-1 text-sm text-gray-700">
                <span className="">인프런 계정이 없으신가요?</span>
                <Link
                  href="/signup"
                  className="text-center flex items-center justify-center text-sm underline underline-offset-2"
                >
                  회원가입
                </Link>
              </div>
            </div>
          </form>
          <div className="flex gap-3 items-center">
            <div className="flex-1 h-[1px] bg-gray-300"></div>
            <div className="text-gray-500">간편 로그인</div>
            <div className="flex-1 h-[1px] bg-gray-300"></div>
          </div>

          <div className="flex flex-col justify-center gap-2">
            <button className="w-full py-2 px-6 bg-[#FFE500] flex gap-8 items-center rounded cursor-pointer">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="comment"
                className="svg-inline--fa fa-comment size-6 text-[rgb(44,46,51)]"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"

                // style="font-size: 20px; color: rgb(44, 46, 51);"
              >
                <path
                  fill="currentColor"
                  d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"
                ></path>
              </svg>
              <span className="font-bold">카카오 로그인</span>
            </button>
            <button className="w-full px-6 py-2 bg-[#F5F5F5] flex gap-8 items-center rounded cursor-pointer hover:bg-[#F5F5F5]/80 transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                className="size-6"
              >
                <path
                  fill="#4285F4"
                  d="M17.785 9.169c0-.738-.06-1.276-.189-1.834h-8.42v3.328h4.942c-.1.828-.638 2.073-1.834 2.91l-.016.112 2.662 2.063.185.018c1.694-1.565 2.67-3.867 2.67-6.597z"
                ></path>
                <path
                  fill="#34A853"
                  d="M9.175 17.938c2.422 0 4.455-.797 5.94-2.172l-2.83-2.193c-.758.528-1.774.897-3.11.897-2.372 0-4.385-1.564-5.102-3.727l-.105.01-2.769 2.142-.036.1c1.475 2.93 4.504 4.943 8.012 4.943z"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M4.073 10.743c-.19-.558-.3-1.156-.3-1.774 0-.618.11-1.216.29-1.774l-.005-.119L1.254 4.9l-.091.044C.555 6.159.206 7.524.206 8.969c0 1.445.349 2.81.957 4.026l2.91-2.252z"
                ></path>
                <path
                  fill="#EB4335"
                  d="M9.175 3.468c1.684 0 2.82.728 3.468 1.335l2.531-2.471C13.62.887 11.598 0 9.175 0 5.667 0 2.638 2.013 1.163 4.943l2.9 2.252c.727-2.162 2.74-3.727 5.112-3.727z"
                ></path>
              </svg>
              <span className="font-bold">구글 로그인</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
