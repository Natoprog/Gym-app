// import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Exerecise() {
  //   const session = await auth();

  return (
    <main className="flex justify-center items-center w-screen h-screen gap-10 bg-[#040506] text-white">
      <Link href="/exercise/custom">Custom</Link>
      <button>Database list</button>
    </main>
  );
}
