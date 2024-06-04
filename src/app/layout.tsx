/* eslint-disable react/jsx-no-undef */
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
import { Suspense } from 'react';
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
    < html lang='en' suppressHydrationWarning >
      <head></head>
      <body className={cn(inter.className)} suppressHydrationWarning={true}>
        <Suspense fallback={
          <div className=" fixed  top-0 left-0 right-0 bottom-0">
            <div className='absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center'>
              <div className="w-48 h-48 border-4 border-dashed rounded-full animate-spin border-black mx-auto"></div>
              <h2 className="text-zinc-900 dark:text-white mt-4 ">Loading...</h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Your adventure is about to begin
              </p>
            </div>
          </div>

        }>
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
        </Suspense>
      </body>
    </ html>
  )
}
