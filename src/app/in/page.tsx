import { auth } from "@/auth";
import Image from 'next/image'

export default async function In() {
    const session = await auth()

    if (!session || !session.user?.image) {
        console.log('no')
    }

    return (
        <main className='flex justify-center items-center w-screen h-screen gap-10'>
            <Image src={session?.user?.image || ""} alt='user image' width={100} height={100} priority/>
            <h1>Hello</h1>
        </main>
    )
}