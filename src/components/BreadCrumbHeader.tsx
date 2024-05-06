'use client'
import React, { useEffect, useState } from 'react'
import Link from "next/link"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
} from "@/components/ui/dialog"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { ModeToggle } from '@/components/DarkModeToggle'
import { useAppContext } from '@/components/ThemeProvider'
import { useToast } from '@/components/ui/use-toast'
import detectEthereumProvider from '@metamask/detect-provider'
import { fetchAPI } from '@/utils/fetchAPI'
import { Icons } from '@/components/ui/icons'
import { useRouter } from 'next/navigation'
import Web3 from 'web3'

export default function BreadCrumbHeader() {
    const { userInfo, setUserInfo }: any = useAppContext()
    const [hasProvider, setHasProvider] = useState<boolean | null>(null);
    const [isExitsAccount, setAccount] = useState<boolean | null>(null)
    const [wallet, setWallet]: any = useState()
    const Router = useRouter();
    const [isOpen, setIsOpen] = useState(false)
    const [pin, setPin] = useState<string>("")
    const { toast } = useToast()
    useEffect(() => {
        const getProvider = async () => {
            const provider = await detectEthereumProvider({ silent: true });
            setHasProvider(Boolean(provider));
        };
        setUserInfo(JSON.parse(localStorage.getItem('user-info') as string))
        getProvider();
    }, []);

    const onSubmit = async () => {
        try {
            const login = await fetchAPI('/auth/login', 'POST', {
                "addressWallet": wallet.accounts[0],
                "PIN": pin
            })
            if (login.status == 201) {
                const web3 = new Web3(window.ethereum);
                console.log(wallet.accounts[0]);
                const balance = await web3.eth.getBalance(wallet.accounts[0]);
                const balanceEth = web3.utils.fromWei(balance, 'ether');
                setUserInfo({
                    data: login.data,
                    balance: Number(balanceEth).toFixed(3)
                })
                localStorage.setItem('user-info', JSON.stringify({
                    data: login.data,
                    balance: Number(balanceEth).toFixed(3)
                }))
                
                setIsOpen(false)
                toast({
                    title: "Login success",
                    description: "You have successfully logged in",
                    variant: "success",
                    duration: 2000,
                })
            } else {
                toast({
                    title: "Login failed",
                    description: "Please check your PIN code",
                    variant: "destructive",
                    duration: 2000,
                })
            }
        } catch (error) {

        }
    }
    const checkLogin = () => {
        const isExist = JSON.parse(localStorage.getItem('user-info') as string)
        if (isExist) {
            return true
        }
        return false
    }
    const handleConnect = async () => {
        let accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        setWallet({ accounts });
        const checkAccount = await fetchAPI(`/auth/${accounts[0]}`, 'GET')
        console.log(checkAccount.data?.isExits);
        if (checkAccount.data?.isExits) {
            setIsOpen(true)
        } else {
            if (!isExitsAccount) {
                setUserInfo({ accounts: accounts[0] })
                toast({
                    title: "Account not found",
                    description: "Please register to create an account",
                    variant: "destructive",
                    duration: 2000,
                })
                Router.push('/register')
            }
        }
    };

    return (
        <div>
            <div className='flex'>
                {checkLogin() && (
                    <div className='flex'>
                        <Button variant={"outline"} type="button">
                            <Icons.login className="h-5 w-5 me-2" /> {userInfo?.data?.addressWallet}
                        </Button>
                        <Button variant={"outline"} type="button" className='ms-2'>
                            <Icons.walletMinimal className="h-5 w-5 me-2" />{userInfo?.balance} ETH
                        </Button>
                    </div>
                )}
                {!checkLogin() && (
                    <div className='flex'>
                        <Button variant={"outline"} onClick={handleConnect}>
                            <Icons.login className="h-5 w-5 me-2" /> <div className="font-semibold">  CONNECT TO METAMASK </div>
                        </Button>
                    </div>
                )}
                <div className='ms-2'>
                    <ModeToggle />
                </div>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogPortal >
                    <DialogContent onKeyDown={(e) => {
                        if (e.key === 'Enter' && pin.length == 6) {
                            onSubmit()
                        }
                    }} >
                        <DialogHeader >
                            <DialogTitle>Set your PIN to log in</DialogTitle>
                            <DialogDescription>
                                Please Set Your Pin Code to 6 Digits.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4 justify-center">
                            <InputOTP onChange={(e) => { setPin(e) }} maxLength={6} className="text-center justify-center">
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
                            <Button type='submit' onClick={onSubmit}>Submit</Button>
                        </div>
                    </DialogContent>
                </DialogPortal>
            </Dialog >
        </div >
    )
}
