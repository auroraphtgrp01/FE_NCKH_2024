"use client";

import { ModeToggle } from "@/components/DarkModeToggle";
import { MainNav } from "@/components/MainNav";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { useToast } from "@/components/ui/use-toast";
import detectEthereumProvider from "@metamask/detect-provider";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import NavbarItem from "@/components/NavBarItem";
import { useAppContext } from "@/components/ThemeProvider";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fetchAPI } from "@/utils/fetchAPI";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { DialogOverlay, DialogPortal } from "@radix-ui/react-dialog";

export default function Header() {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const [isExitsAccount, setAccount] = useState<boolean | null>(null);
  const { wallet, setWallet }: any = useAppContext();
  const Router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [pin, setPin] = useState<string>("");
  const [userInfo, setUserInfo] = useState<any>(null);
  const { toast } = useToast();
  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));
    };
    setUserInfo(JSON.parse(localStorage.getItem("user-info") as string));
    getProvider();
  }, []);

  const onSubmit = async () => {
    try {
      const login = await fetchAPI("/auth/login", "POST", {
        addressWallet: wallet.accounts[0],
        PIN: pin,
      });
      if (login.status == 201) {
        localStorage.setItem("user-info", JSON.stringify(login.data));
        setUserInfo(login.data);
        setIsOpen(false);
        toast({
          title: "Login success",
          description: "You have successfully logged in",
          variant: "default",
          duration: 2000,
        });
      } else {
        toast({
          title: "Login failed",
          description: "Please check your PIN code",
          variant: "destructive",
          duration: 2000,
        });
      }
    } catch (error) {}
  };
  const checkLogin = () => {
    const isExist = JSON.parse(localStorage.getItem("user-info") as string);
    if (isExist) {
      return true;
    }
    return false;
  };
  const handleConnect = async () => {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts);

    setWallet({ accounts });
    const checkAccount = await fetchAPI(`/auth/${accounts[0]}`, "GET");
    console.log(checkAccount.data?.isExits);
    if (checkAccount.data?.isExits) {
      setIsOpen(true);
    } else {
      if (!isExitsAccount) {
        toast({
          title: "Account not found",
          description: "Please register to create an account",
          variant: "destructive",
          duration: 2000,
        });
        Router.push("/register");
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="container px-0 flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
        <NavbarItem />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {checkLogin() && (
              <div>
                <Button variant={"outline"} type="button">
                  <Icons.login className="h-5 w-5 me-2" />{" "}
                  {userInfo?.addressWallet}
                </Button>
              </div>
            )}
            {!checkLogin() && (
              <div>
                <Button variant={"outline"} onClick={handleConnect}>
                  <Icons.login className="h-5 w-5 me-2" />{" "}
                  <div className="font-semibold"> CONNECT TO METAMASK </div>
                </Button>
                <Link href="/register">
                  <Button variant={"outline"} className="ms-2">
                    <Icons.key className="h-5 w-5 me-2" />{" "}
                    <div className="font-semibold"> REGISTER </div>
                  </Button>
                </Link>
              </div>
            )}
            <ModeToggle />
          </nav>
        </div>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogPortal>
          <DialogOverlay>
            <DialogContent
              onKeyDown={(e) => {
                if (e.key === "Enter" && pin.length == 6) {
                  onSubmit();
                }
              }}
            >
              <DialogHeader>
                <DialogTitle>Set your PIN to log in</DialogTitle>
                <DialogDescription>
                  Please Set Your Pin Code to 6 Digits.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 justify-center">
                <InputOTP
                  onChange={(e) => {
                    setPin(e);
                  }}
                  maxLength={6}
                  className="text-center justify-center"
                >
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
                <Button type="submit" onClick={onSubmit}>
                  Submit
                </Button>
              </div>
            </DialogContent>
          </DialogOverlay>
        </DialogPortal>
      </Dialog>
    </header>
  );
}
