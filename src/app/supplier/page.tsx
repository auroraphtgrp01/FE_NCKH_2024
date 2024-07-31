/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import BreadCrumbHeader from '@/components/BreadCrumbHeader'
import { fetchAPI } from '@/utils/fetchAPI'
import Link from 'next/link'

export default function page() {
  const [supplierList, setSupplierList] = useState<any>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  useEffect(() => {
    fetchAPI(`/suppliers?page=${currentPage}&limit=${limit}`, 'GET').then((res) => {
      setSupplierList([...res.data.suppliers])
    })
  }, [])

  return (
    <div className='mb-14'>
      <header className='sticky top-0 z-30 flex h-10 items-center gap-4 border-b bg-background'>
        <div className='relative mb-3 ml-auto flex flex-1 md:grow-0'>
          <div className='flex'>
            <BreadCrumbHeader />
          </div>
        </div>
      </header>
      <div className='mt-4 flex justify-between px-4 drop-shadow-2xl'>
        <div></div>
        <div className='flex'>
          <Input className='mr-4 w-[300px]' placeholder='Search for supplier name...'></Input>
          <Button>Search</Button>
        </div>
      </div>
      <div className='mt-5 px-4'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {supplierList.map((item: any, index: any) => (
            <Link href={`/supplier/${item.id}`} key={index}>
              <div className='flex h-full transform flex-col overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105 dark:bg-zinc-800'>
                <div className='h-40 w-full flex-shrink-0 overflow-hidden'>
                  <img
                    alt={item.name}
                    className='h-full w-full object-cover'
                    src={
                      item?.images.length > 0
                        ? item?.images[0]?.path
                        : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
                    }
                  />
                </div>
                <div className='flex flex-grow flex-col p-4'>
                  <h3 className='mb-2 select-none text-lg font-semibold'>{item.name}</h3>
                  <p className='line-clamp-2 select-none text-gray-500 dark:text-gray-400'>{item.description}</p>
                  <p className='line-clamp-2 select-none text-gray-500 dark:text-gray-400'>Address: {item.address}</p>
                  <p className='line-clamp-2 select-none text-gray-500 dark:text-gray-400'>TaxCode: {item.taxCode}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
