'use client'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import Web3 from 'web3'
import GetContract from '@/app/contract/detail/[typeContract]/[address]/components/GetContract'
export default function Dashboard() {
  const [data, setData] = useState({})
  const getData = (dataFromChild: any) => {
    setData(dataFromChild)
  }
  const [balance, setBalance] = React.useState('')
  useEffect(() => {
    const web3 = new Web3(window.ethereum)
    web3.eth.getBalance(localStorage.getItem('address-wallet') as string).then((bal) => {
      setBalance(web3.utils.fromWei(bal, 'ether'))
    })
  }, [])
  return (
    <div className='mt-6 flex'>
      <div className='me-3'>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>Smart Contract</CardTitle>
          </CardHeader>
          <CardContent>
            <GetContract />
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
      {/* <div className='me-3'>
                <Card>
                    <CardHeader>
                        <CardTitle className='text-2xl'> Table of Contract Data </CardTitle>
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
                                <TableRow>
                                    <TableCell className="font-medium">001</TableCell>
                                    <TableCell>nameA</TableCell>
                                    <TableCell>Le Minh Tuan</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div> */}
    </div>
  )
}
