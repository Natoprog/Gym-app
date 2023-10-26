import { getServerSession } from 'next-auth'
import {authConfig} from '../../api/auth/[...nextauth]/route'
import { redirect } from "next/navigation";
import { Suspense } from 'react';


export default async function Home() {
  const session = await getServerSession(authConfig)

    if (!session?.user) {
        redirect("/");
    }

  return (
    <main className="flex justify-center items-center w-screen h-screen gap-10">
        <p>Mamy dzisiaj</p>
    </main>
  );
}
