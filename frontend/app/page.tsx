import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <p>현재 로그인한 유저</p>
      <p>이메일: {session?.user?.email}</p>
      {session?.user ? (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button type="submit">로그아웃</Button>
        </form>
      ) : (
        <Link href="/signin">로그인</Link>
      )}
    </div>
  );
}
