'use client'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import Web3 from 'web3'
import GetContract, { ContractData } from '@/app/dashboard/components/GetContract'
import { log } from 'console'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
export default function Dashboard() {
  // const [dataContract, setDataContract] = useState(null)
  const [dataContract, setDataContract] = useState([])
  const [balance, setBalance] = React.useState('')
  useEffect(() => {
  }, [])


  function handleDataChange(data: any) {
    setDataContract(objectToKeyValueArray(data))
    console.log(dataContract);
  };

  function objectToKeyValueArray(data: any): any {
    if (!data || typeof data !== 'object' || data === null) {
      return [];
    }
    const modifiedKeys = Object.keys(data).map((key) => {
      return key;
    });
    return modifiedKeys.map((key) => ({ [key]: data[key] }));
  }


  return (
    <div className="flex mt-6">
      <div className="me-3">
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>Smart Contract</CardTitle>
          </CardHeader>
          <CardContent>
            <GetContract dataContract={dataContract} setDataContract={handleDataChange} />
          </CardContent>
        </Card>
      </div>
      {/* <div className="me-3">
        <Card>
      <CardHeader>
      <CardTitle className='text-2xl'>Wallet</CardTitle>
    </CardHeader>
    <CardContent>
      <p><span className='font-semibold'>ETH Balance:</span> {balance} <span className='font-semibold'>ETH</span> </p> 
      <p><span className='font-semibold'>Address Wallet:</span> {localStorage.getItem('address-wallet')}</p> 
    </CardContent>
  </Card>
    </div> */}
      <div className='me-3'>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'> Table of Contract Data </CardTitle>
            <Textarea value={JSON.stringify(dataContract)}>

            </Textarea>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>A list of your contract.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">#</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataContract.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{Object.keys(item)[0]}</TableCell>
                    <TableCell>{item[Object.keys(item)[0]]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div >
  )
}
