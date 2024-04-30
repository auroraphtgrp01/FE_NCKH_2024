"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PIN, PINType, RegisterBody, RegisterBodyType } from "@/validateSchema/Authentication.validate"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarPicker } from "@/components/ui/calendar-picker"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useAppContext } from "@/components/ThemeProvider"
import React from "react"
import { toast, useToast } from "@/components/ui/use-toast"
import { fetchAPI } from "@/utils/fetchAPI"
import { DialogOverlay, DialogPortal } from "@radix-ui/react-dialog"
import { set } from "date-fns"
import usePreventLeave from 'react-hook-use-prevent-leave';

export default function RegisterForm() {
  const [blockPage, setBlockPage] = React.useState<boolean>(true)
  const { wallet, setWallet }: any = useAppContext()
  const [isOpen, setIsOpen] = React.useState(false)
  const [registerId, setRegisterId] = React.useState<string>("")
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
  })
  const formPIN = useForm<PINType>({
    resolver: zodResolver(PIN),
  })
  function togglePageBlock(): void {
    setBlockPage((prev) => !prev);
  }
  usePreventLeave(blockPage);
  const [date, setDate] = React.useState<Date>()
  const { toast } = useToast()
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
  function updatePIN(values: z.infer<typeof PIN>) {
    fetchAPI(`/users/pin/${registerId}`, 'PATCH', values).then((res) => {
      toast({
        title: "Register Success",
        description: "Register Success. Please login to continue.",
        variant: "default",
      })
    }).catch((err) => {
      toast({
        title: "Register Fail",
        description: `Register Fail: ${err.toString()}`,
        variant: "destructive",
      })
    })
    setIsOpen(false)
  }
  function onSubmit(values: z.infer<typeof RegisterBody>) {
    if (!date || !wallet.accounts[0]) return toast({
      title: "Empty Field",
      description: "Please fill all field to register account",
      variant: "destructive",
    })
    const payload = {
      ...values,
      dateOfBirth: date?.toISOString(),
      addressWallet: wallet.accounts[0]
    }
    fetchAPI('/auth/register', 'POST', payload).then((res) => {
      if (res.status === 201) {
        setRegisterId(res.data.id)
        setIsOpen(true);
      }
    }).catch((err) => {
      toast({
        title: "Register Fail",
        description: `Register Fail: ${err.toString()}`,
        variant: "destructive"
      })
    })
  }
  function handleSubmit(values: z.infer<typeof RegisterBody>) {

  }
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>REGISTER</CardTitle>
          <CardDescription>Register new Acoount</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, (error) => {
            })} className="space-y-2 max-w-[400px] flex-shrink-0 w-full">
              <FormField
                control={form.control}
                name="addressWallet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Wallet: </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} disabled value={wallet.accounts[0]} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email: </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="indentifyNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Indentify Number: </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number: </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name: </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex">
                <div className="me-3">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender: </FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select your Gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Gender</SelectLabel>
                                <SelectItem value="MALE">Male</SelectItem>
                                <SelectItem value="FEMALE">Female</SelectItem>
                                <SelectItem value="ANOTHER">Another</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="">
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date Of Birth: </FormLabel>
                        <FormControl>
                          <CalendarPicker onDateChange={setDate} selectedDate={date} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <Button type="submit" className="!mt-10 !px-10 ">Register</Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogPortal >
          <DialogOverlay>
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
          </DialogOverlay>
        </DialogPortal>
      </Dialog>
    </div>
  )
}