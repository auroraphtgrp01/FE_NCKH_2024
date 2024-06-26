import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppProvider, ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/Header'
import { Toaster } from '@/components/ui/toaster'
import { Footer } from '@/components/Footer'
import { Toaster as Sonner } from '@/components/ui/sonner'
import NavbarVertical from '@/components/NavbarVertical'
import { cn } from '@/lib/utils'
import { handleInstanceWeb3 } from '@/utils/web3Instance'
import { updateUserInfoFromLocalStorage } from '@/utils/updateUserInfo'
import { useEffect } from 'react'
const inter = Inter({ subsets: ['vietnamese'] })

export const metadata: Metadata = {
  title: 'Smart Contract - Supply Chain Management System',
  description: ''
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head></head>
      <body className={cn(inter.className)} suppressHydrationWarning={true}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <AppProvider>
            {/* <Header /> */}
            <div className='flex min-h-screen w-full flex-col overflow-hidden'>
              <NavbarVertical />
              <div className='flex flex-col'>
                <main className='grid flex-1 items-start'>
                  <div className='flex min-h-screen w-full flex-col'>
                    <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
                      <div className='grid auto-rows-max items-start gap-4 px-6 md:gap-8 lg:col-span-2'>
                        {children}
                        <Footer />
                      </div>
                    </div>
                    <Sonner />
                    <Toaster />
                  </div>
                </main>
              </div>
            </div>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
