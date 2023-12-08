import {auth} from "@/auth";


export default async function Home() {
  const session = await auth()


    const weekDays = [ "Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];

    const date = new Date().getDay();

  return (
    <main className="flex justify-center items-center w-screen h-screen gap-10">
        <p>Mamy dzisiaj: {weekDays[date]}</p>
    </main>
  );
}
