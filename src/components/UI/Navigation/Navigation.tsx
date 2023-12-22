import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { CgGym } from "react-icons/cg";
import { IoCalendarOutline } from "react-icons/io5";
import { RiAccountCircleFill } from "react-icons/ri";

export default function Navigation() {
  return (
    <nav className="w-full h-24 sticky bottom-0 left-0 flex justify-center gap-10 items-center p-5 bg-slate-700 text-white">
      <Link href="/home" className="flex flex-col items-center">
        <CgGym size={25} />
        <span>Trening</span>
      </Link>
      <Link href="/plan" className="flex flex-col items-center">
        <IoCalendarOutline size={25} />
        <span>Plan</span>
      </Link>
      <Link href="#" className="flex flex-col items-center">
        <RiAccountCircleFill size={25} />
        <span>Konto</span>
      </Link>
    </nav>
  );
}
