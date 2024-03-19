"use client"

import { z } from "zod"
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

import React from 'react'
import { GetContractBodyType, GetSmartContract } from "@/validateSchema/GetContract.validate"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function GetContract() {
    function onSubmit(values: z.infer<typeof GetSmartContract>) {
        console.log(values)
      }
      const form = useForm<GetContractBodyType>({
        resolver: zodResolver(GetSmartContract),
      })
      return (  
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, (error) => {
          console.log(error)
        })} className="space-y-2 max-w-[400px] flex-shrink-0 w-full">
          <FormField
            control={form.control}
            name="addressContract"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Wallet: </FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} className="w-96"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex">
            <div>
            <FormField
            control={form.control}
            name="addressContract"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type Contract: </FormLabel>
                <FormControl>
                <Select>
                  <SelectTrigger className="w-72">
            <SelectValue placeholder="Type of Contract" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type of Contract</SelectLabel>
              <SelectItem value="MALE">Labor Contract</SelectItem>
              <SelectItem value="FEMALE">Supply Contract</SelectItem>
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
            <div>
            <Button type="submit" className="!mt-8 !ms-2">GET ABI</Button>
            </div>
          </div>
            <FormField
            control={form.control}
            name="abi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ABI: </FormLabel>
                <FormControl>
                <Textarea placeholder="Type your message here." disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
          <Button type="submit" className="!mt-10 !px-10 ">GET CONTRACT</Button>
          </div>
        </form>
      </Form>
  )
}
