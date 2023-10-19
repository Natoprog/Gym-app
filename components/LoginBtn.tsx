"use client"
import { signIn } from 'next-auth/react'


export default async function LoginBtn() {

  return (
    <form onSubmit={(e) => {
        e.preventDefault()
        signIn('google', { callbackUrl: 'http://localhost:3000/success'})
    }}>
        <button type="submit" className='p-2 rounded-md bg-teal-600 text-white'>Login!</button>
    </form>
  )
}