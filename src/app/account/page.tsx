import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import LogOutBtn from "@/src/components/Loging/LogOutBtn";

export default async function AccountPage() {
  const session = await auth();

  if (!session) {
    return (
      <main className="flex justify-center items-center h-screen gap-10 text-white">
        <p>Please sign in to view your account</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col justify-center items-center h-screen gap-10 text-white bg-[#111115]">
      <div className="flex flex-col items-center gap-4">
        <Image
          src={session.user?.image || ""}
          alt="User profile"
          width={100}
          height={100}
          className="rounded-full border-2 border-white"
        />
        <h1 className="text-2xl font-bold">{session.user?.name}</h1>
        <p className="text-gray-400">{session.user?.email}</p>
      </div>
      <LogOutBtn />
    </main>
  );
}
