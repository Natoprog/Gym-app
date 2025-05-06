import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { CgGym } from "react-icons/cg";
import { IoCalendarOutline } from "react-icons/io5";
import { RiAccountCircleFill } from "react-icons/ri";
import Image from "next/image";
import { auth } from "@/auth";

export default async function Navigation() {
  const session = await auth();

  const date = new Date();

  return (
    <nav className="w-full h-24 sticky bottom-0 left-0 flex justify-center gap-10 items-center p-5 bg-[#111115] text-white">
      <Link
        href={`/workout/${date.getFullYear()}/${
          date.getMonth() + 1
        }/${date.getDate()}`}
        className="flex flex-col items-center"
      >
        <CgGym size={25} />
        <span>Workout</span>
      </Link>
      {/* <Link href="/exercise" className="flex flex-col items-center">
        <AiFillHome size={25} />
        <span>Exercise</span>
      </Link> */}
      <Link href="/calendar" className="flex flex-col items-center">
        <IoCalendarOutline size={25} />
        <span>Plan</span>
      </Link>
      <Link href="/account" className="flex flex-col items-center">
        {!session ? (
          <RiAccountCircleFill size={25} />
        ) : (
          <Image
            src={session?.user?.image || ""}
            alt="user image"
            width={25}
            height={25}
            priority
            className="rounded-full border-gray-50 border-solid border"
          />
        )}
        <span>Account</span>
      </Link>
    </nav>
  );
}
