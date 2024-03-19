'use client'

import { ModeToggle } from "@/components/DarkModeToggle"
import { MainNav } from "@/components/MainNav"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import detectEthereumProvider from "@metamask/detect-provider"
import { useEffect, useState } from "react"
import { Web3 } from 'web3'

export default function Header() {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
    const initialState = { accounts: [] };             
    const [wallet, setWallet] = useState(initialState);

    useEffect(() => {
        const getProvider = async () => {
            const provider = await detectEthereumProvider({ silent: true });
            setHasProvider(Boolean(provider));
        };

        getProvider();
    }, []);

    const updateWallet = async (accounts: any) => {    
        setWallet({ accounts });                       
    };                                                 

    const handleConnect = async () => {                
        let accounts = await window.ethereum.request({ 
            method: "eth_requestAccounts",             
        });                                            
        updateWallet(accounts);    
        console.log(wallet.accounts.length == 0 );
    };                    
  
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav/>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
                    {wallet.accounts.length > 0 && (            /* New */
                <div>
                 <Button variant={"outline"} onClick={handleConnect}> 
                    <Icons.login className="h-5 w-5 me-2"/> {wallet.accounts[0]}
                </Button>
                </div>
            )}
             {wallet.accounts.length == 0 && (            /* New */
                <div>
                 <Button variant={"outline"} onClick={handleConnect}> 
                    <Icons.login className="h-5 w-5 me-2"/> CONNECT TO METAMASK
                </Button>
                </div>
            )}
                    <ModeToggle/>


          </nav>
        </div>
      </div>
    </header>
  )
}
