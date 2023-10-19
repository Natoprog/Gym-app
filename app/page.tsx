import { getServerSession } from 'next-auth'
import { getXataClient } from '../utils/xata'
import Nextauth from '@/pages/api/auth/[...nextauth]'
import LoginBtn from '@/components/LoginBtn'


export default async function Home() {

  const session = await getServerSession(Nextauth)

  return (
    <main className='flex justify-center items-center w-screen h-screen gap-10'>
      {session ? (<h1>Logged in as </h1>) : (<LoginBtn/>)}
      <h1>Hello</h1>
    </main>
  )
}