import { getServerSession } from 'next-auth'
import {authConfig} from './api/auth/[...nextauth]/route'
import LogOutBtn  from '@/src/components/Loging/LogOutBtn'
import Link from 'next/link'


export default async function Index() {

  const session = await getServerSession(authConfig)

  return (
    <main className='flex justify-center items-center w-screen h-screen gap-10'>
      {session ? (<h1>Zalogowano jako: {session?.user?.name}</h1>) : null}
      {session ? <LogOutBtn /> : null}
      {session ? <Link href='/home'>Przejdź do strony głównej</Link> : null}
      {!session ? <Link href='/signin'>Przejdź do logowania</Link> : null}
    </main>
  )
}