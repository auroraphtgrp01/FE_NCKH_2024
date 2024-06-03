'use client';

import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import {
  GetContractBodyType,
  GetSmartContract,
} from '@/validateSchema/GetContract.validate';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useAppContext } from '@/components/ThemeProvider';
import Web3 from 'web3';
import { Icons } from '@/components/ui/icons';
import { fetchAPI } from '@/utils/fetchAPI';
import { ethers } from 'ethers';

export interface ContractData {
  dataContract: any | undefined;
  setDataContract: (data: any) => void;
}

export default function GetContract({
  dataContract,
  setDataContract,
}: ContractData) {
  const { toast } = useToast();
  const [contract, setContract] = useState({});
  const [abi, setABI] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [addressContract, setAddressContract] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
  };
  const [payload, setPayload] = useState({
    abi: [],
    addressContract: '',
    addressWallet: '',
    methodCall: '',
  });
  const { wallet, setWallet }: any = useAppContext();
  function onSubmit(values: z.infer<typeof GetSmartContract>) {
    if (abi.length == 0) {
      toast({
        title: 'Error get ABI',
        description: 'Please get ABI of Contract',
        variant: 'destructive',
      });
    } else {
      const contractPayload: any = {
        ...values,
        abi,
      };
      setPayload(contractPayload);
      getContract().then((res) => {
        setDataContract(res);
      });
      // goi api o day
    }
  }
  async function getContract(): Promise<any> {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      payload.abi,
      '0x26b5e6146C96239700156d3f466CB0a3476cF61c'
    );
    try {
      const result: any = await contract.methods
        .getContractInformation()
        .call();
      // console.log(">>", JSON.parse(refactorTest(result)))
      // console.log(">>");
    } catch (error) {
      console.error('Error:', error);
    }
  }
  function refactorTest(jsonData: any) {
    const data = ethers.toUtf8String(jsonData[0]);
    return data;
  }

  async function fetchABI() {
    const nameContract = selectedValue;
    if (false) {
      toast({
        title: 'Error get ABI',
        description: 'Please select type of contract to get ABI',
        variant: 'destructive',
      });
    } else {
      fetchAPI('/smart-contracts/abi', 'GET')
        .then((res) => {
          setABI(res.data.abi.abi);
        })
        .catch((error) => {
          toast({
            title: 'Error get ABI',
            description: 'Error when get ABI - Please try again later',
            variant: 'destructive',
          });
        });
      setError(error);
    }
  }
  function arrayObjectToJson(arr: any) {
    return arr.map((item: any) => {
      return JSON.stringify(item);
    });
  }
  function arrayToObject(arr: string[]): { [key: string]: string } {
    const obj: { [key: string]: string } = {};
    for (let i = 0; i < arr.length; i += 2) {
      if (i + 1 < arr.length) {
        obj[arr[i]] = arr[i + 1];
      }
    }
    return obj;
  }
  const form = useForm<GetContractBodyType>({
    resolver: zodResolver(GetSmartContract),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (error) => {})}
        className='w-full max-w-[400px] flex-shrink-0 space-y-2'
      >
        <FormField
          control={form.control}
          name='addressWallet'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Wallet: </FormLabel>
              <FormControl>
                <Input placeholder='' {...field} className='w-96' readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='addressContract'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Contract: </FormLabel>
              <FormControl>
                <Input placeholder='' {...field} className='w-96' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='methodCall'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Method call: </FormLabel>
              <FormControl>
                <Input placeholder='' {...field} className='w-96' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex'>
          <div>
            <FormField
              control={form.control}
              name='typeContract'
              render={({ field }) => (
                <FormItem onChange={handleChange}>
                  <FormLabel>Type Contract: </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className='w-72'>
                        <SelectValue placeholder='Type of Contract' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup {...field}>
                          <SelectItem value='ContractA' defaultChecked>
                            Contract A
                          </SelectItem>
                          <SelectItem value='ContractB'>Contract B</SelectItem>
                          <SelectItem value='ANOTHER'>Another</SelectItem>
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
            <Button className='!ms-2 !mt-8' type='button' onClick={fetchABI}>
              GET ABI
            </Button>
          </div>
        </div>
        <FormItem>
          <FormLabel>ABI</FormLabel>
          <FormControl>
            <Textarea
              placeholder='ABI of Contract'
              className='resize-none'
              rows={10}
              readOnly
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <div className='flex justify-center'>
          <Button type='submit' className='!mt-10 !px-10'>
            GET CONTRACT
          </Button>
        </div>
      </form>
    </Form>
  );
}
