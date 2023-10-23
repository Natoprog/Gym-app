import { getServerSession } from 'next-auth'
import {authConfig} from './api/auth/[...nextauth]/route'
import LoginBtn from '@/components/LoginBtn'
import { LoginOutBtn } from '@/components/LoginBtn'



export default async function Home() {

  const session = await getServerSession(authConfig)

  return (
    <main className='flex justify-center items-center w-screen h-screen gap-10'>
      {session ? (<h1>Logged in as {session?.user?.name}</h1>) : (<LoginBtn/>)}
      <h1>Hello</h1>
      {session ? <LoginOutBtn/>: null}
    </main>
  )
}