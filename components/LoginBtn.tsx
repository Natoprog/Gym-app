"use client"
import { signIn, signOut} from 'next-auth/react'



export default async function LoginBtn() {

  return (
    <form onSubmit={(e) => {
        e.preventDefault()
        signIn('google', { callbackUrl: 'http://localhost:3000/in'})
    }}>
        <button type="submit" className='p-2 rounded-md bg-teal-600 text-white'>Login!</button>
    </form>
  )
}


export async function LoginOutBtn() {

  const handleSignOut = () => {
    signOut()
  }

  return (
    <button onClick={handleSignOut}>Sign out</button>
  )
  }