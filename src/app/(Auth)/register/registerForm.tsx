"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RegisterBody, RegisterBodyType } from "@/validateSchema/Authentication.validate"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarPicker } from "@/components/ui/calendar-picker"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function RegisterForm() {
    const addressWallet = localStorage.getItem('address-wallet') || ''
    const form = useForm<RegisterBodyType>({
      resolver: zodResolver(RegisterBody),
    })
    
    function onSubmit(values: z.infer<typeof RegisterBody>) {
      console.log(values)
    }
    return (  
      <Card>
  <CardHeader>
    <CardTitle>REGISTER</CardTitle>
    <CardDescription>Register new Acoount</CardDescription>
  </CardHeader>
  <CardContent>
  <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, (error) => {
        console.log(error)
      })} className="space-y-2 max-w-[400px] flex-shrink-0 w-full">
        <FormField
          control={form.control}
          name="addressWallet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Wallet: </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} disabled value={addressWallet} />
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name: </FormLabel>
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
              <Select>
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
                  <CalendarPicker/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        </div>
        <div className="flex justify-center">
        <Button type="submit" className="!mt-10 !px-10 ">LOGIN</Button>
        </div>
      </form>
    </Form>
  </CardContent>
  <CardFooter>
  </CardFooter>
</Card>

     
    )
}