import { getServerSession } from 'next-auth'
import {authConfig} from '../api/auth/[...nextauth]/route'

export default async function In() {
    const session = await getServerSession(authConfig)

    if (!session || !session.user?.image) {
        console.log('no')
    }

    return (
        <main className='flex justify-center items-center w-screen h-screen gap-10'>
            <img src={session?.user?.image ?? ''} alt='user image' />
            <h1>Hello</h1>
        </main>
    )
}