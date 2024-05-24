/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import BreadCrumbHeader from "@/components/BreadCrumbHeader";
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { useToast } from "@/components/ui/use-toast";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useParams } from "next/navigation";
import { fetchAPI } from "@/utils/fetchAPI";
import Link from "next/link";
const image = [
    "https://gcs.tripi.vn/public-tripi/tripi-feed/img/473720TPB/cong-ty-cp-xi-mang-ha-tien-1-651515.jpg",
    "https://gcs.tripi.vn/public-tripi/tripi-feed/img/473720Ymu/cong-ty-co-phan-go-an-cuong-651470.jpg",
    "https://gcs.tripi.vn/public-tripi/tripi-feed/img/473720GWy/magis-stone-1176889.jpg",
    "https://gcs.tripi.vn/public-tripi/tripi-feed/img/473720ztl/cong-ty-tnhh-siam-city-cement-viet-nam-651497.jpg"
]

const dataProduct = [
    {
        id: 4,
        name: 'Xi măng Hà Tiên 1',
        image: 'https://gcs.tripi.vn/public-tripi/tripi-feed/img/473720ztl/cong-ty-tnhh-siam-city-cement-viet-nam-651497.jpg',
        description: 'Xi măng Hà Tiên 1, chất lượng cao, giá cả hợp lý, đa dạng mẫu mã, màu sắc',
    },
    {
        id: 5,
        name: 'Gạch ốp lát Viglacera',
        image: 'https://gcs.tripi.vn/public-tripi/tripi-feed/img/473720ztl/cong-ty-tnhh-siam-city-cement-viet-nam-651497.jpg',
        description: 'Gạch ốp lát Viglacera, chất lượng cao, giá cả hợp lý, đa dạng mẫu mã, màu sắc',
    },
    {
        id: 6,
        name: 'Sứ vệ sinh Viglacera',
        image: 'https://gcs.tripi.vn/public-tripi/tripi-feed/img/473720ztl/cong-ty-tnhh-siam-city-cement-viet-nam-651497.jpg',
        description: 'Sứ vệ sinh Viglacera, chất lượng cao, giá cả hợp lý, đa dạng mẫu mã, màu sắc',
    },
    {
        id: 7,
        name: 'Kính xây dựng Viglacera',
        image: 'https://gcs.tripi.vn/public-tripi/tripi-feed/img/473720ztl/cong-ty-tnhh-siam-city-cement-viet-nam-651497.jpg',
        description: 'Kính xây dựng Viglacera, chất lượng cao, giá cả hợp lý, đa dạng mẫu mã, màu sắc',
    },
    {
        id: 8,
        name: 'Gạch ngói đất sét nung Viglacera',
        image: 'https://gcs.tripi.vn/public-tripi/tripi-feed/img/473720ztl/cong-ty-tnhh-siam-city-cement-viet-nam-651497.jpg',
        description: 'Gạch ngói đất sét nung Viglacera, chất lượng cao, giá cả hợp lý, đa dạng mẫu mã, màu sắc',
    },
]


export default function page() {
    const [isSelectImg, setIsSelectImg] = useState(0)
    const [isDetail, setIsDetail] = useState(false)
    const [cart, setCart] = useState<any>([])
    const [productDetail, setProductDetail] = useState<any>()
    const [isOrderOpen, setIsOrderOpen] = useState(false)
    const [dataSupplier, setDataSupplier] = useState<any>([])
    const [dataProduct, setDataProduct] = useState<any>([])
    const { toast } = useToast()
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const supplierResponse = await fetchAPI(`/suppliers/${id}`, 'GET');
                setDataSupplier(supplierResponse.data);

                const productResponse = await fetchAPI(`/products/find-all-by-supplier/${id}`, 'GET');
                setDataProduct(productResponse.data);
                console.log(productResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);
    function StarIcon(props: any) {
        return (
            <svg
                {...props}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        )
    }
    function openDetailProduct(index: number) {
        setProductDetail(dataProduct[index])
        setIsDetail(true)
        console.log(dataProduct[index]);
    }
    function isAddToCart() {
        setCart([...cart, productDetail])
        toast({
            title: "Add to cart",
            description: "Add product to cart successfully",
            variant: "success",
        })
        setIsDetail(false)
    }

    // addToCart
    async function addToCart() {
        const payload = {
            supplierId: id,
            productId: productDetail.id
        }
        console.log(payload);

        await fetchAPI("/orders", "POST", payload)
            .then((res) => {
                if (res.status === 201) {
                    toast({
                        title: `${res.data.message}`,
                        variant: "success",
                    })
                    setIsDetail(false)
                    console.log(res);

                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <div>
            <header className="sticky top-0 z-30 flex h-10 items-center gap-4 border-b bg-background">
                <div className="relative ml-auto flex-1 md:grow-0 mb-3 flex">
                    <div className='flex'>
                        <BreadCrumbHeader />
                        <Link href='/order-list'>
                            <Button variant={"outline"} className={cart.length !== 0 ? 'ms-2 text-red-600 font-bold' : 'ms-2 font-bold'}><Icons.shoppingCart className="h-5 w-5 me-2" />Carts  </Button>
                        </Link>
                    </div>
                </div>
            </header>
            <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
                <div className="grid gap-4">
                    <div className="grid md:grid-cols-5 gap-3 items-start">
                        <div className="hidden md:flex flex-col gap-3 items-start">
                            {dataSupplier?.images?.map((item: any, index: number) => (
                                <button key={index} onClick={() => {
                                    setIsSelectImg(index)
                                }}
                                    className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
                                    <img
                                        alt="Preview thumbnail"
                                        className="aspect-square object-cover"
                                        height={100}
                                        src={item.path}
                                        width={100}
                                    />
                                    <span className="sr-only">View Image 1</span>
                                </button>
                            ))}
                        </div>
                        <div className="md:col-span-4">
                            <img
                                alt="Product Image"
                                className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                                height={600}
                                src={image[isSelectImg]}
                                width={600}
                            />
                        </div>
                    </div>
                </div>
                <div className="grid gap-4 md:gap-10 items-start">
                    <div className="grid gap-4">
                        <h1 className="font-bold text-3xl lg:text-4xl">{dataSupplier.name}</h1>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-0.5">
                                <StarIcon className="w-5 h-5 fill-black" />
                                <StarIcon className="w-5 h-5 fill-black" />
                                <StarIcon className="w-5 h-5 fill-black" />
                                <StarIcon className="w-5 h-5 fill-black" />
                                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                            </div>
                            <div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">4.5</span>
                            </div>
                        </div>
                        <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
                            <p>
                                {dataSupplier.description}
                            </p>
                            <div>
                                <b className="font-bold ">Address: </b> {dataSupplier.address}
                            </div>
                            <div>
                                <b className="font-bold ">Email: </b> {dataSupplier.email}
                            </div>
                            <div>
                                <b className="font-bold">Phone: </b> {dataSupplier?.User?.phoneNumber}
                            </div>
                            <div>
                                <b className="font-bold">TaxCode: </b> {dataSupplier?.taxCode}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 md:px-6 py-12">
                <Carousel className="w-full">
                    <CarouselContent>
                        {dataProduct.map((item: any, index: number) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4 " onClick={(e) => {
                                openDetailProduct(index);
                            }}>
                                <div className="p-1">
                                    <Card className="cursor-pointer ">
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <div className=" rounded-lg shadow-md overflow-hidden dark:bg-zinc-800 h-[300px]">
                                                <img
                                                    alt="Product 1"
                                                    className="w-full h-40 object-cover select-none"
                                                    height="300"
                                                    src={item.images[0] ? item.images[0].path : ''}
                                                    style={{
                                                        aspectRatio: "400/300",
                                                        objectFit: "cover",
                                                    }}
                                                    width="400"
                                                />
                                                <div className="p-4">
                                                    <h3 className="text-lg font-semibold select-none mb-2">{item.name}</h3>
                                                    <p className="text-gray-500 select-none dark:text-gray-400 line-clamp-2">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
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
                <DialogContent className="sm:max-w-[850px]">
                    <div className="grid md:grid-cols-2 items-start max-w-6xl mx-auto py-4 px-2">
                        <div className="grid gap-6">
                            <img
                                alt="Product Image"
                                className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                                height={600}
                                src={productDetail?.images?.[0]?.path ?? ''}
                                width={600}
                            />
                        </div>
                        <div className="grid gap-4 ms-4">
                            <div>
                                <h1 className="text-3xl font-bold">{productDetail?.name}</h1>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">
                                    {productDetail?.description}
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold">Estimate Price: {productDetail?.price} ETH / Unit</span>
                                <Button className="w-[80%] items-center text-center mr-auto ml-12 mt-5" onClick={(e) => { isAddToCart; addToCart() }}>Add to Order</Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog open={isOrderOpen} onOpenChange={setIsOrderOpen}>
                <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                        <DialogTitle className="text-center">Carts Detail</DialogTitle>
                    </DialogHeader>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="">#</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Name of Product</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cart.map((item: any, index: number) => (
                                <TableRow >
                                    <TableCell className="font-medium">{index}</TableCell>
                                    <TableCell>
                                        <img
                                            alt="Product Image"
                                            className="rounded-md object-cover"
                                            height={50}
                                            src={item.image}
                                            style={{
                                                aspectRatio: "100/100",
                                                objectFit: "cover",
                                            }}
                                            width={50}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {item.name}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant={'destructive'}>X</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <DialogFooter>
                        <Button variant={'violet'}>
                            Create Order
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
