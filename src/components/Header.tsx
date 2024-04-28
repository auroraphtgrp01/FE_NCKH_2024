'use client'

import { ModeToggle } from "@/components/DarkModeToggle"
import { MainNav } from "@/components/MainNav"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { useToast } from "@/components/ui/use-toast"
import detectEthereumProvider from "@metamask/detect-provider"
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from "react"
import NavbarItem from "@/components/NavBarItem"
import { useAppContext } from "@/components/ThemeProvider"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Header() {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const [isExitsAccount, setAccount] = useState<boolean | null>(null)
  const { wallet, setWallet }: any = useAppContext()
  const Router = useRouter();
  const { toast } = useToast()
  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));
    };

    const getAccount = async () => {
      //goi api check account
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

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="container px-0 flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
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
  )
}
