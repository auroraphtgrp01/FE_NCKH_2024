'use client'
import React, { useEffect, useLayoutEffect } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Web3 from 'web3'
import { Input } from '@/components/ui/input'
import GetContract from '@/app/dashboard/components/GetContract'
export default function Dashboard() {  
    const [balance, setBalance] = React.useState('')
  const web3 = new Web3(window.ethereum);
 (web3.eth.getBalance(localStorage.getItem('address-wallet') as string)).then((bal) => {
    
    setBalance(web3.utils.fromWei(bal, "ether"))
  });
    console.log(balance);
    
  return (
    <div className="flex mt-6">
        <div className="me-3">
        <Card>
      <CardHeader>
      <CardTitle className='text-2xl'>Smart Contract</CardTitle>
    </CardHeader>
    <CardContent>
       <GetContract />
    </CardContent>
  </Card>
    </div>
    <div className="me-3">
        <Card>
      <CardHeader>
      <CardTitle className='text-2xl'>Wallet</CardTitle>
    </CardHeader>
    <CardContent>
      <p><span className='font-semibold'>ETH Balance:</span> {balance} <span className='font-semibold'>ETH</span> </p> 
      <p><span className='font-semibold'>Address Wallet:</span> {localStorage.getItem('address-wallet')}</p> 
    </CardContent>
  </Card>
    </div>
    
   </div>
  )
}
