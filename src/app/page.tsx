import { auth } from "@/auth";
import LogOutBtn from "@/src/components/Loging/LogOutBtn";
import Link from "next/link";

export default async function Index() {
  const session = await auth();

  return (
    <main className="w-auto h-[calc(100vh-6rem)] gap-10 bg-[#111115] text-white">
      <div className="w-auto flex justify-center pt-10 pb-10 bg-blue-700 rounded-b-full">
        <h2 className="text-3xl">Muscule Log</h2>
      </div>
      <div className="w-100 flex flex-col p-10">
        <h3 className="text-2xl">Welcome</h3>
        {session ? <p>{session?.user?.name}</p> : null}
        {!session ? <Link href="/signin">Sign in to continue</Link> : null}
        <LogOutBtn />
      </div>
    </main>
  );
}
