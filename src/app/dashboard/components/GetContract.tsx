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
import axios from 'axios'
import { Input } from "@/components/ui/input"
import React, { useEffect, useState } from 'react'
import { GetContractBodyType, GetSmartContract } from "@/validateSchema/GetContract.validate"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useAppContext } from "@/components/ThemeProvider"

export default function GetContract() {
  const { toast } = useToast()
  const [contract, setContract] = useState({})
  const [abi, setABI] = useState([])
  const [selectedValue, setSelectedValue] = useState('')
  const [error, setError] = useState('')
  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
  }
  const { wallet, setWallet }: any = useAppContext()
  function onSubmit(values: z.infer<typeof GetSmartContract>) {
    if (abi.length == 0) {
      toast({
        title: "Error get ABI",
        description: "Please get ABI of Contract",
        variant: "destructive"
      })
    } else {
      const contractPayload = {
        ...values, abi
      }
      // goi api o day
    }
  }
  const form = useForm<GetContractBodyType>({
    resolver: zodResolver(GetSmartContract),
  })
  async function fetchABI() {
    const nameContract = selectedValue
    if (nameContract === '') {
      toast({
        title: "Error get ABI",
        description: "Please select type of contract to get ABI",
        variant: "destructive"
      })
    } else {
      axios.get(`http://localhost:3000/smart-contracts/abi?contractName=${nameContract}`).then((res) => {
        setABI(res.data.abi)
      })
        .catch((error) => {
          toast({
            title: "Error get ABI",
            description: "Error when get ABI - Please try again later",
            variant: "destructive"
          })
        })
      setError(error)
    }
  }
  function arrayObjectToJson(arr: any) {
    return arr.map((item: any) => {
      return JSON.stringify(item)
    })
  }
  useEffect(() => {
  }, [])
  useEffect(() => {

  }, [abi]);
  return (
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
                <Input placeholder="" {...field} className="w-96" readOnly value={wallet.accounts[0]} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressContract"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Contract: </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} className="w-96" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex">
          <div>
            <FormField
              control={form.control}
              name="typeContract"
              render={({ field }) => (
                <FormItem onChange={handleChange}>
                  <FormLabel>Type Contract: </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} >
                      <SelectTrigger className="w-72">
                        <SelectValue placeholder="Type of Contract" />
                      </SelectTrigger>
                      <SelectContent >
                        <SelectGroup {...field}>
                          <SelectItem value="ContractA" defaultChecked>Contract A</SelectItem>
                          <SelectItem value="ContractB">Contract B</SelectItem>
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
            <Button className="!mt-8 !ms-2" type="button" onClick={fetchABI}>GET ABI</Button>
          </div>
        </div>
        <FormItem>
          <FormLabel>ABI</FormLabel>
          <FormControl>
            <Textarea
              placeholder="ABI of Contract"
              className="resize-none"
              value={arrayObjectToJson(abi)}
              rows={10}
              readOnly
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <div className="flex justify-center">
          <Button type="submit" className="!mt-10 !px-10 ">GET CONTRACT</Button>
        </div>
      </form>
    </Form>
  )
}
