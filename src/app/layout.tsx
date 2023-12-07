import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '../components/UI/Navigation/Navigation'


const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
        <body className={inter.className}>
            {children}
            <Navigation />
        </body>
    </html>
  )
}
