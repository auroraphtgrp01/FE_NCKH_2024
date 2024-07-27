/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import BreadCrumbHeader from '@/components/BreadCrumbHeader'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { useToast } from '@/components/ui/use-toast'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useParams } from 'next/navigation'
import { fetchAPI } from '@/utils/fetchAPI'
import Link from 'next/link'

export default function page() {
  const [isSelectImg, setIsSelectImg] = useState(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(5)
  const [isDetail, setIsDetail] = useState(false)
  const [cart, setCart] = useState<any>([])
  const [productDetail, setProductDetail] = useState<any>()
  const [isOrderOpen, setIsOrderOpen] = useState(false)
  const [dataSupplier, setDataSupplier] = useState<any>([])
  const [dataProduct, setDataProduct] = useState<any>([])
  const { toast } = useToast()
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supplierResponse = await fetchAPI(`/suppliers/${id}`, 'GET')
        setDataSupplier(supplierResponse.data)

        const productResponse = await fetchAPI(
          `/products/find-all-by-supplier/${id}?page=${currentPage}&limit=${limit}`,
          'GET'
        )
        setDataProduct(productResponse.data.products)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [id])
  function StarIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
      </svg>
    )
  }
  function openDetailProduct(index: number) {
    setProductDetail(dataProduct[index])
    setIsDetail(true)
  }
  function isAddToCart() {
    setCart([...cart, productDetail])
    toast({
      title: 'Add to cart',
      description: 'Add product to cart successfully',
      variant: 'success'
    })
    setIsDetail(false)
  }

  // addToCart
  async function addToCart() {
    const payload = {
      supplierId: id,
      productId: productDetail.id
    }

    await fetchAPI('/orders', 'POST', payload)
      .then((res) => {
        if (res.status === 201) {
          toast({
            title: `${res.data.message}`,
            variant: 'success'
          })
          setIsDetail(false)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div>
      <header className='sticky top-0 z-30 flex h-10 items-center gap-4 border-b bg-background'>
        <div className='relative mb-3 ml-auto flex flex-1 md:grow-0'>
          <div className='flex'>
            <BreadCrumbHeader />
            <Link href='/order-list'>
              <Button
                variant={'outline'}
                className={cart.length !== 0 ? 'ms-2 font-bold text-red-600' : 'ms-2 font-bold'}
              >
                <Icons.FileCheck2Icon className='me-2 h-5 w-5' />
                Price Surveys{' '}
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <div className='mx-auto grid max-w-6xl items-start gap-6 px-4 py-6 md:grid-cols-2 lg:gap-12'>
        <div className='grid gap-4'>
          <div className='grid items-start gap-3 md:grid-cols-5'>
            <div className='hidden flex-col items-start gap-3 md:flex'>
              {dataSupplier?.images?.map((item: any, index: number) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsSelectImg(index)
                  }}
                  className='overflow-hidden rounded-lg border transition-colors hover:border-gray-900 dark:hover:border-gray-50'
                >
                  <img
                    alt='Preview thumbnail'
                    className='aspect-square object-cover'
                    height={100}
                    src={item.path}
                    width={100}
                  />
                  <span className='sr-only'>View Image 1</span>
                </button>
              ))}
            </div>
            <div className='md:col-span-4'>
              <img
                alt='Product Image'
                className='aspect-square w-full overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800'
                height={600}
                src={
                  dataSupplier.images?.length > 0
                    ? dataSupplier.images[0].path
                    : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
                }
                width={600}
              />
            </div>
          </div>
        </div>
        <div className='grid items-start gap-4 md:gap-10'>
          <div className='grid gap-4'>
            <h1 className='text-3xl font-bold lg:text-4xl'>{dataSupplier.name}</h1>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-0.5'>
                <StarIcon className='h-5 w-5 fill-black' />
                <StarIcon className='h-5 w-5 fill-black' />
                <StarIcon className='h-5 w-5 fill-black' />
                <StarIcon className='h-5 w-5 fill-black' />
                <StarIcon className='h-5 w-5 fill-muted stroke-muted-foreground' />
              </div>
              <div>
                <span className='text-sm text-gray-500 dark:text-gray-400'>4.5</span>
              </div>
            </div>
            <div className='text-sm leading-loose text-gray-500 dark:text-gray-400'>
              <p>{dataSupplier.description}</p>
              <div>
                <b className='font-bold'>Address: </b> {dataSupplier.address}
              </div>
              <div>
                <b className='font-bold'>Email: </b> {dataSupplier.email}
              </div>
              <div>
                <b className='font-bold'>Phone: </b> {dataSupplier?.User?.phoneNumber}
              </div>
              <div>
                <b className='font-bold'>TaxCode: </b> {dataSupplier?.taxCode}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-12 md:px-6'>
        <Carousel className='w-full'>
          <CarouselContent>
            {dataProduct.map((item: any, index: number) => (
              <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/4' onClick={() => openDetailProduct(index)}>
                <div className='h-full p-1'>
                  <Card
                    className='flex h-full flex-col overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105 dark:bg-zinc-800'
                    onClick={() => openDetailProduct(index)}
                  >
                    <div className='flex-shrink-0'>
                      <img
                        alt={item.name}
                        className='h-40 w-full object-cover'
                        height='300'
                        src={
                          item.images[0]
                            ? item.images[0].path
                            : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
                        }
                        style={{
                          aspectRatio: '400/300'
                        }}
                        width='400'
                      />
                    </div>
                    <div className='flex flex-grow flex-col p-4'>
                      <h3 className='mb-2 select-none text-lg font-semibold'>{item.name}</h3>
                      <p className='line-clamp-2 select-none text-gray-500 dark:text-gray-400'>{item.description}</p>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <Dialog open={isDetail} onOpenChange={setIsDetail}>
        <DialogContent className='sm:max-w-[850px]'>
          <div className='mx-auto grid max-w-6xl items-start px-2 py-4 md:grid-cols-2'>
            <div className='grid gap-6'>
              <img
                alt='Product Image'
                className='aspect-square w-full overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800'
                height={600}
                src={productDetail?.images?.[0]?.path ?? ''}
                width={600}
              />
            </div>
            <div className='ms-4 grid gap-4'>
              <div>
                <h1 className='text-3xl font-bold'>{productDetail?.name}</h1>
                <p className='mt-2 text-gray-500 dark:text-gray-400'>{productDetail?.description}</p>
              </div>
              <div className='flex flex-col'>
                <span className='text-2xl font-bold'>Estimate Price: {productDetail?.price} ETH / Unit</span>
                <Button
                  className='ml-12 mr-auto mt-5 w-[80%] items-center text-center'
                  onClick={(e) => {
                    isAddToCart
                    addToCart()
                  }}
                >
                  Add to Order
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isOrderOpen} onOpenChange={setIsOrderOpen}>
        <DialogContent className='sm:max-w-[550px]'>
          <DialogHeader>
            <DialogTitle className='text-center'>Carts Detail</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className=''>#</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Name of Product</TableHead>
                <TableHead className='text-right'>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item: any, index: number) => (
                <TableRow>
                  <TableCell className='font-medium'>{index}</TableCell>
                  <TableCell>
                    <img
                      alt='Product Image'
                      className='rounded-md object-cover'
                      height={50}
                      src={item.image}
                      style={{
                        aspectRatio: '100/100',
                        objectFit: 'cover'
                      }}
                      width={50}
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className='text-right'>
                    <Button variant={'destructive'}>X</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DialogFooter>
            <Button variant={'violet'}>Create Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
