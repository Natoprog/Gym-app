import { getServerSession } from 'next-auth'
import {authConfig} from '../../api/auth/[...nextauth]/route'
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await getServerSession(authConfig)

    if (!session?.user) {
        redirect("/");
    }

    const weekDays = [ "Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];

    const date = new Date().getDay();

  return (
    <main className="flex justify-center items-center w-screen h-screen gap-10">
        <p>Mamy dzisiaj: {weekDays[date]}</p>
    </main>
  );
}
