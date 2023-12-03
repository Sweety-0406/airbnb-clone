import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar/Navbar'
import RegisterModel from './components/modals/RegisterModal'
import ClientOnly from './components/ClientOnly'
import RentModal from './components/modals/RegisterModal'
import RegisterModal from './components/modals/RegisterModal'
import LoginModel from './components/modals/LoginModal'
import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './action/getCurrentUser'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Holidays Homes & Apartment Rentals - Airbnb',
  description: 'Airbnb Clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser=await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <RegisterModel />
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <LoginModel/>
         <RegisterModal/>
        <Navbar currentUser={currentUser}/>  
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
