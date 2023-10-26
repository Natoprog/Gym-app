"use client"
import LogInForm from "@/src/components/Loging/LogInForm";
import {useSession} from "next-auth/react"
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const {data: session} = useSession()

  const router = useRouter()

  if (session?.user) {
    router.push('/')
  }

  return (
    <main className="flex justify-center items-center w-screen h-screen gap-10">
      {!session ? <LogInForm /> : null}
    </main>
  );
}