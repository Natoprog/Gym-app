import getServerSession from 'next-auth'
import {authOptions} from '../../api/auth/authOptions'


export default async function Home() {
  const session = await getServerSession(authOptions)


    const weekDays = [ "Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];

    const date = new Date().getDay();

  return (
    <main className="flex justify-center items-center w-screen h-screen gap-10">
        <p>Mamy dzisiaj: {weekDays[date]}</p>
    </main>
  );
}
