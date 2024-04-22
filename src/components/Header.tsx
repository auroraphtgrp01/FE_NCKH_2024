'use client'

import { ModeToggle } from "@/components/DarkModeToggle"
import { MainNav } from "@/components/MainNav"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { useToast } from "@/components/ui/use-toast"
import detectEthereumProvider from "@metamask/detect-provider"
import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useEffect, useState } from "react"
import NavbarItem from "@/components/NavBarItem"
import { useAppContext } from "@/components/ThemeProvider"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { fetchAPI } from "@/utils/fetchAPI"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { useForm } from "react-hook-form"
import { PIN, PINType } from "@/validateSchema/Authentication.validate"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

export default function Header() {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const [isExitsAccount, setAccount] = useState<boolean | null>(null)
  const { wallet, setWallet }: any = useAppContext()
  const [isOpen, setIsOpen] = React.useState(false)
  const Router = useRouter();
  function isBlockClose() {
    setIsOpen(true)
    toast({
      title: "Update your PIN",
      description: "Please update your PIN to continue with this action.",
      variant: "destructive",
    })
    setTimeout(() => {
      setIsOpen(true)
    }, 100);
  }
  const formPIN = useForm<PINType>({
    resolver: zodResolver(PIN),
  })
  const { toast } = useToast()
  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));
    };

    const getAccount = async () => {

      if (true) {
        setAccount(true)
      } else {
        setAccount(false)
      }
    }

    getAccount()
    getProvider();
  }, []);



  const updateWallet = async (accounts: any) => {
    setWallet({ accounts });
  };

  const handleConnect = async () => {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(window.ethereum);

    // localStorage.setItem('address-wallet', accounts[0])
    updateWallet(accounts);
    const payload = {
      addressWallet: accounts[0],
      PIN: '002322'
    }
    fetchAPI('/auth/login', 'POST', payload).then((res) => {

    }).catch((err) => {
      if (err.response.status === 404) {
        toast({
          title: "Account not found",
          description: "Please register to create an account",
          variant: "destructive",
          duration: 2000,
        })
        Router.push('/register')
      }
      if (err.response.status === 401) {
        setIsOpen(true)
      }
    })


    if (!isExitsAccount) {
      toast({
        title: "Account not found",
        description: "Please register to create an account",
        variant: "destructive",
        duration: 2000,
      })
      Router.push('/register')
    }
  };

  function updatePIN(values: z.infer<typeof PIN>) {
    console.log(wallet);

    const payload = {
      addressWallet: wallet.accounts[0],
      PIN: values.PIN
    }
    fetchAPI('/auth/login', 'POST', payload).then((res) => {
      setIsOpen(false)
      toast({
        title: "Login success",
        description: "You have successfully logged in",
        variant: "default",
        duration: 2000,
      })
    }).catch((err) => {
      if (err.response.status === 404) {
        toast({
          title: "Account not found",
          description: "Please register to create an account",
          variant: "destructive",
          duration: 2000,
        })
        Router.push('/register')
      }
      if (err.response.status === 401) {
        toast({
          title: "Dang ky",
          description: "nhap dung pin",
          variant: "destructive",
          duration: 2000,
        })
      }
      setIsOpen(false)
    })
  }


  return (
    <div>
      <header className="sticky top-0 z-40 w-full border-b backdrop-blur">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <MainNav />
          <NavbarItem />
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              {wallet.accounts.length > 0 && (
                <div>
                  <Button variant={"outline"} onClick={handleConnect}>
                    <Icons.login className="h-5 w-5 me-2" /> {wallet.accounts[0]}
                  </Button>
                </div>
              )}
              {wallet.accounts.length == 0 && (
                <div>
                  <Button variant={"outline"} onClick={handleConnect}>
                    <Icons.login className="h-5 w-5 me-2" /> <div className="font-semibold">  CONNECT TO METAMASK </div>
                  </Button>
                  <Link href="/register">
                    <Button variant={"outline"} className="ms-2">
                      <Icons.key className="h-5 w-5 me-2" /> <div className="font-semibold"> REGISTER </div>
                    </Button>
                  </Link>
                </div>
              )}
              <ModeToggle />
            </nav>
          </div>
        </div>

      </header>
      <div className="z-50">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogPortal >
            <DialogContent onInteractOutside={isBlockClose} className="sm:max-w-[425px]" onKeyDown={(e) => {
              if (e.key === 'Escape') {
                e.preventDefault();
              }
            }}>
              <DialogHeader >
                <DialogTitle>Set your PIN to log in</DialogTitle>
                <DialogDescription>
                  Please Set Your Pin Code to 6 Digits.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 justify-center">
                <Form {...formPIN}>
                  <form onSubmit={formPIN.handleSubmit(updatePIN)} className="space-y-6 text-center">
                    <FormField
                      control={formPIN.control}
                      name="PIN"
                      render={({ field }) => (
                        <FormItem className="text-center justify-center">
                          <FormControl className="text-center justify-center">
                            <InputOTP maxLength={6} {...field} className="text-center justify-center">
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                              </InputOTPGroup>
                              <InputOTPSeparator />
                              <InputOTPGroup>
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                              </InputOTPGroup>
                              <InputOTPSeparator />
                              <InputOTPGroup>
                                <InputOTPSlot index={4} />  
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormDescription>
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
    </div>
  )

}