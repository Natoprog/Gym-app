import { Inter } from 'next/font/google'
import './globals.css'
import Provider from '../context/client-provider'


const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
        <body className={inter.className}><Provider>{children}</Provider></body>
    </html>
  )
}
